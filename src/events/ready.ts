import { IEvent } from '../interfaces'

export const event: IEvent = {
  name: 'ready',
  run: async (client) => {
    console.log(`[CLIENT] ${client.user?.username} is online`)
  }
}
