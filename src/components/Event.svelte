<script>
   import { events } from '../events.js';
   import { weekly } from '../weekly.js';
   import Map from '@anoram/leaflet-svelte';   
   export let id;
   let event;
   for(var i = 0; i < $events.length; i++){
      if($events[i].eventID == id){
         event = $events[i]
      }
   }
   if(event == undefined){
      for(var i = 0; i < $weekly.length; i++){
         if($weekly[i].eventID == id){
            event = $weekly[i]
         }
      }
   }
   let options = {
      attributionControl:false,
      center: [event.lat,event.long],
      zoom:10,
      controls:{
         zoomControl:true
      },
      scrollWheelZoom: true,
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
   function removeSpecialEvent(){
      document.getElementsByClassName('navbar')[0].style.top = "0px";
      document.getElementsByTagName('body')[0].style.paddingTop = "0px";
   }
   removeSpecialEvent()
</script>

<h1 class="title">{event.mag} Magnitude  | {event.time.split('.')[0].replace('T', ' at ')}</h1>
<div class="map">
   <Map {options} />
 </div>
<h2>More info</h2>
<ul>
   <li>Type: {event.type}</li>
   <li>Depth: {Number(event.depth) / 1000} Km</li>
   <li>Location: {event.region}</li>
   <li>Magnitude uncertainty: {event.magUncertainty}</li>
</ul>


<style>
   .title{
      text-align: center;
      font-size: 25px
   }
   .map{
      height: 350px;
   }
   ul{
      margin-left:-15px;
   }
</style>