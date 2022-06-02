import { Command } from '../../interfaces'

export const slash: Command = {
  name: 'ping',
  description: 'Calculates the latency of the bot',
  testOnly: false,
  run: ({ interaction }) => {
    return interaction.followUp({
      content: `Pong! Latency is ${interaction.client.ws.ping}ms`
    })
  }
}
