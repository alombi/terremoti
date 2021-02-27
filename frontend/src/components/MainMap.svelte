<script>
	import Map from '@anoram/leaflet-svelte';   
   import { onMount } from 'svelte';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { events } from '../events.js';
   let data = $events
   let markers = [];
   for(var i = 0; i < data.length; i++){
      var lat = Number(data[i].lat);
      var long = Number(data[i].long);
      var obj = {
         'lat':lat,
         'lng':long,
         'icon':{
         'iconUrl':`/assets/${data[i].color}.png`,
         tooltipAnchor: [-4, 10],
         iconSize: [32, 32],
         iconAnchor: [20, 23],
         },
         tooltip:{
            isOpen:false,
            interactive:true,
            direction: "top",
            permanent:false,
            text:`<a href="/event/${data[i].eventID}">${data[i].region}</a>`
         }
      }
      markers.push(obj);
      markers = markers;
   }
	let options = {
      attributionControl:false,
      center: [42,13],
      zoom:6,
      controls:{
         zoomControl:true
      },
      scrollWheelZoom: true,
      dragging:false,
      markers: markers,
      mapID: "map"
	}
   onMount(()=>{
      let isRefreshed = sessionStorage.getItem('refresh');
      if(isRefreshed == 'true'){
         sessionStorage.removeItem('refresh')
         addNotification({ text: 'Refreshed!', position: 'top-center', type:'success', removeAfter: 2000 })
      }
   })
	</script>
	<div class="map">
	  <Map {options} />
	</div>