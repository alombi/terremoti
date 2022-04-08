<script>
	import {LeafletMap, TileLayer, Circle} from 'svelte-leafletjs';
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
	};

	let leafletMap;
	const colors = {
		red:'#ff0000',
		orange:'#FF8F33',
		yellow:'#FEC309'
	}
</script>

<div id="map" style="width: 100%; height: 80%;">
	<LeafletMap bind:this={leafletMap} options={mapOptions}>
		 <TileLayer url={tileUrl} options={tileLayerOptions}/>
         {#each $events as event}
            <Circle latLng={[event.lat, event.long]} radius={7000} color={colors[event.color]} weight="2" fillOpacity="0.6" fillColor={colors[event.color]}>
            </Circle>
         {/each}
	</LeafletMap>
</div>