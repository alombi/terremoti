<script>
// @ts-nocheck
    import { env } from '$env/dynamic/public'
    import { onMount } from "svelte";
    import mapboxgl from "mapbox-gl";
    export let events;
  	const months = ['Gennaio' ,'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    let colors = {
      "yellow": "#FFEA00",
      "orange": "#FF7518",
      "red": "#DC143C"
    }
  
    let mapElement;
    let map = null;
    let accessToken = env.PUBLIC_MAPBOX_KEY;
    let viewState = {
      longitude: 14,
      latitude: 41.7,
      zoom: 5.6,
      pitch: 30,
      bearing: -3,
    };
  
    onMount(() => {
      createMap();
    });
  
    function createMap() {
      map = new mapboxgl.Map({
        accessToken: accessToken,
        container: mapElement,
        interactive: true,
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        pitch: viewState.pitch,
        bearing: viewState.bearing,
        style: 'mapbox://styles/mapbox/dark-v11'
      });
      
      events.forEach(element => {
        console.log(element);
        const popup = new mapboxgl.Popup({ offset: 15, closeButton: false }).setHTML(`
          ${element.mag} Magnitudo <br>
          ${element.region} <br> 
          <span class="date">${new Date(element.time).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} ${months[new Date(element.time).getMonth()]} ${new Date(element.time).getFullYear()}, alle ${new Date(element.time).getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${new Date(element.time).getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>` );
        const marker = new mapboxgl.Marker({
          color: colors[element.color],
        })
        .setLngLat([element.long, element.lat])
        .setPopup(popup)
        .addTo(map)      
      });
      
      
    }

  </script>
  
  <div id="map" bind:this={mapElement}></div>
  
  
  <style>
    #map { position: absolute; bottom: 0; width: 100vw; height: 95vh; }
  </style>