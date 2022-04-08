<script>
	import Notifications from 'svelte-notifications';
	import { BarLoader } from 'svelte-loading-spinners'
	import { Modals, closeModal } from 'svelte-modals'
	import { getData } from './lib/functions/fetchData';
	import Navbar from './lib/components/Navbar.svelte';
	import Map from './lib/components/Map.svelte';

	let loading = getData(false)
</script>

<Notifications>
<Navbar />
{#await loading}
	<div class="loader"><BarLoader size="60" color="#aaa" unit="px" duration="1s"></BarLoader></div>
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
</Notifications>

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