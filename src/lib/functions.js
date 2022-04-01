import { events } from './stores'

export async function getData() {
   const url = 'https://ingv.alombi.xyz/latest'
   let req = await fetch(url)
   let json = await req.json()
   console.log(json)
   json = json.events
   events.set(json)
}