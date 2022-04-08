import { events, refreshed } from '../stores/events';

export async function getData(isRefresh) {
   const url = 'https://ingv.alombi.xyz/latest'
   let req = await fetch(url)
   let json = await req.json()
   console.log(json)
   json = json.events
   events.set(json)
   if (isRefresh) {
      refreshed.set(true)
   }
}