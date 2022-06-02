import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  GuildMember,
  ApplicationCommandData,
  CommandInteractionOptionResolver
} from 'discord.js'

import Client from '../client'

export interface IExtendedInteraction extends CommandInteraction {
  member: GuildMember
}

interface IRunOptions {
  client: Client
  interaction: IExtendedInteraction
  args: CommandInteractionOptionResolver
}

type Run = (options: IRunOptions) => any

export type Command = ApplicationCommandData & {
  name: string
  description: string
  testOnly?: boolean
  run: Run
} & ChatInputApplicationCommandData
