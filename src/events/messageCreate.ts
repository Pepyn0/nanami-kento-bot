import { Message, MessageEmbed, Permissions } from 'discord.js'
import dotenv from 'dotenv'
import { IEvent } from '../interfaces'
dotenv.config()

export const event: IEvent = {
  name: 'messageCreate',
  run: async (client, message: Message) => {
    if (message.channel.type === 'DM') return

    if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/)
    const cmd = args.shift()?.toLowerCase()

    message.reply('Tests!')
  }
}
