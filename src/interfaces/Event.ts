import { ClientEvents } from 'discord.js'
import Client from '../client'

interface IRun {
  (client: Client, ...args: any[]): any
}

export interface IEvent {
  name: keyof ClientEvents
  run: IRun
}
