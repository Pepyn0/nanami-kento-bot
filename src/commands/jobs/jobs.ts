import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { Command } from '../../interfaces'
import { Data } from '../../data'

export const slash: Command = {
  name: 'jobs',
  description: 'View a list of jobs',
  testOnly: false,
  run: ({ interaction }) => {
    const data = new Data()
    const jobs = data.getJob(2)

    const message = new MessageEmbed()
    message.setColor('#0099ff')
      .setDescription(`
        🧑🏽 - ${jobs.type.map(job => `\`${job}\``).join(', ')}\n
        💻 - ${jobs.tags.map(tag => `\`${tag}\``).join(', ')}\n
        🌎 - ${jobs.region}\n
        💰 - ${jobs.price}\n
        🔗 - ${jobs.link}`
      )
      .setTitle(`${jobs.title}`)

    const buttons = new MessageActionRow()

    buttons.addComponents(
      new MessageButton()
        .setCustomId('prev')
        .setEmoji('⬅')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('next')
        .setEmoji('➡')
        .setStyle('PRIMARY')
    )

    return interaction.followUp({
      content: '2/10',
      embeds: [
        message
      ],
      ephemeral: true,
      components: [
        buttons
      ]
    })
  }
}
