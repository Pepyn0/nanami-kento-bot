import { Interaction, CommandInteractionOptionResolver } from 'discord.js'
import { IEvent, IExtendedInteraction } from '../interfaces'

export const event: IEvent = {
  name: 'interactionCreate',
  run: async (client, interaction: Interaction) => {
    if (interaction.isCommand()) {
      await interaction.deferReply()
      const command = client.commands.get(interaction.commandName)

      if (!command) {
        return interaction.reply('Command not found')
      }

      command.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as IExtendedInteraction
      })
    }
  }
}
