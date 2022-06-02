import { Client, Collection, ApplicationCommandDataResolvable } from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'

import dotenv from 'dotenv'

import { Command, IEvent, RegisterCommandsOptions } from '../interfaces'

dotenv.config()

export default class Bot extends Client {
  public commands: Collection<string, Command> = new Collection()
  public events: Collection<string, IEvent> = new Collection()
  public aliases: Collection<string, Command> = new Collection()
  public config = process.env

  constructor () {
    super({
      intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_WEBHOOKS',
        'GUILD_MEMBERS'
      ],
      partials: [
        'MESSAGE',
        'CHANNEL',
        'REACTION',
        'GUILD_MEMBER',
        'USER'
      ]
    })
  }

  async importFile (filePath: string) {
    return (await import(filePath))?.slash
  }

  async registerCommands ({ guildID, commands }: RegisterCommandsOptions) {
    if (guildID) {
      this.guilds.cache.get(guildID)?.commands.set(commands)
      console.log(`[${guildID}] Registered commands`)
    } else {
      this.application?.commands.set(commands)
      console.log('[GLOBAL] Registered commands')
    }
  }

  async registerModules () {
    const slashCommands: ApplicationCommandDataResolvable[] = []

    const commandPath = path.join(__dirname, '..', 'commands')

    readdirSync(commandPath).forEach(dir => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith('.ts'))
      commands.forEach(async (file) => {
        const command: Command = await this.importFile(path.join(commandPath, dir, file))
        console.log(`[${dir}] Registered command: ${command.name}`)

        if (!command.name) return

        this.commands.set(command.name, command)
        slashCommands.push(command)
      })
    })

    this.on('ready', () => {
      this.registerCommands({
        commands: slashCommands,
        guildID: `${this.config.TEST_SERVER}`
      })
    })
  }

  public async init () {
    this.login(this.config.TOKEN)
    this.registerModules()

    if (!this.config.TEST_SERVER) console.log('[GLOBAL] No test server specified')

    const eventPath = path.join(__dirname, '..', 'events')

    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(path.join(eventPath, file))
      console.log(`[${file}] Registered event`)
      this.events.set(event.name, event)
      this.on(event.name, event.run.bind(null, this))
    })
  }
}
