<script>
	import { Modals, closeModal } from 'svelte-modals'
	import { getData } from './lib/functions/fetchData';
	import Navbar from './lib/components/Navbar.svelte';
	import Map from './lib/components/Map.svelte';

	let loading = getData()
</script>


<Navbar />
{#await loading}
		<p>aa</p>
	{:then loading} 
		<h1>Earthquakes map</h1>
		<Map />
{/await}
<Modals>
	<div
	  slot="backdrop"
	  class="backdrop"
	  on:click={closeModal}
	/>
</Modals>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0,0,0,0.50)
  }
</style>