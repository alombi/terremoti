<script>
	import {LeafletMap, TileLayer, Circle} from 'svelte-leafletjs';
    import { events } from '../stores/events';

	const mapOptions = {
		 center: [42, 13],
		 zoom: 6,
	};
	const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const tileLayerOptions = {
		 minZoom: 5,
		 maxZoom: 12,
		 maxNativeZoom: 19,
	};

	let leafletMap;
</script>

<div class="example" style="width: 100%; height: 85%;">
	<LeafletMap bind:this={leafletMap} options={mapOptions}>
		 <TileLayer url={tileUrl} options={tileLayerOptions}/>
         {#each $events as event}
            <Circle latLng={[event.lat, event.long]} radius={20} color="#ff0000" fillColor="#ff0000">
            </Circle>
         {/each}
	</LeafletMap>
</div>

<style>
    .example{
        z-index: 1 !important;
    }
</style>