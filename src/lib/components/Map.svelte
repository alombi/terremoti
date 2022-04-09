<script>
	const months = ['Gennaio' ,'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
	import { LeafletMap, TileLayer, Circle, Popup } from 'svelte-leafletjs';
    import { events } from '../stores/events';

	const mapOptions = {
		 center: [42, 13],
		 zoom: 6,
	};
	const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		className:'map-tiles-container'
	};

	let leafletMap;
	const colors = {
		red:'#ff0000',
		orange:'#FF8F33',
		yellow:'#FEC309'
	}
	function tap(event){
		leafletMap.getMap().flyTo([event.lat, event.long], 10	);
		radius = 5000
	}
	let radius = 9000;
</script>

<div id="map" style="width: 100%; height: 80%;">
	<LeafletMap bind:this={leafletMap} options={mapOptions}>
		 <TileLayer url={tileUrl} options={tileLayerOptions}/>
         {#each $events as event}
            <Circle events={['click']} on:click={()=>{tap(event)}} latLng={[event.lat, event.long]} radius={radius} color={colors[event.color]} weight="2" fillOpacity="0.6" fillColor={colors[event.color]}>
					<Popup>
						<b>{event.mag} Mg</b> - {event.region}<br>
						<span>{new Date(event.time).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} {months[new Date(event.time).getMonth()]} {new Date(event.time).getFullYear()} - {new Date(event.time).getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{new Date(event.time).getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} - Depth: {Number(event.depth) / 1000} Km</span>
					</Popup>
				</Circle>
         {/each}
	</LeafletMap>
</div>