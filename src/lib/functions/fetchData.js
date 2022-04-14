import { events, refreshed, weeklyEvents } from '../stores/events';

export async function getData(isRefresh) {
   const url = 'https://ingv.alombi.xyz/latest'
   let req = await fetch(url)
   let json = await req.json()
   json = json.events
   events.set(json)
   if (isRefresh) {
      refreshed.set(true)
   }  
}

export async function getLazyData() {
   const url2 = 'https://ingv.alombi.xyz/weekly'
   let req2 = await fetch(url2)
   let json2 = await req2.json()
   weeklyEvents.set(json2)
}