<script>
   //import { events } from '../events.js';
   import Map from '@anoram/leaflet-svelte';   
   export let event;
   // function checkId(event){
   //    return event.eventID == id 
   // }
   // const event = $events.filter(checkId)[0]
   let options = {
      attributionControl:false,
      center: [event.lat,event.long],
      zoom:10,
      controls:{
         zoomControl:true
      },
      scrollWheelZoom: false,
      dragging:false,
      circles: [{
        lat: event.lat,
        lng: event.long,
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 550,
        tooltip:{
           text:`${event.region}`,
           direction:'top'
        }
      },],
      mapID: "map"
	}
</script>

<a class="event" href="/event/{event.eventID}">
   <div>
      <div class="map">
         <Map {options} />
      </div>
      <h4>{event.region} - {event.mag} Mg</h4>
   </div>
</a>

<style>
   .map{
      height: 200px;
   }
</style>