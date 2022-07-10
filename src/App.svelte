<script>
	import Notifications from 'svelte-notifications';
	import { BarLoader } from 'svelte-loading-spinners'
	import { Modals, closeModal } from 'svelte-modals'
	import { getData, getLazyData } from './lib/functions/fetchData';
	import { weekly } from './lib/stores/layout';
	import Navbar from './lib/components/Navbar.svelte';
	import Map from './lib/components/Map.svelte';
	import Sidebar from './lib/components/Sidebar.svelte';
	import List from './lib/components/List.svelte';
	getLazyData()
	let loading = getData(false)
</script>

<Notifications>
<Sidebar />
<Navbar/>
{#await loading}
	<div class="loader"><BarLoader size="60" color="#aaa" unit="px" duration="1s"></BarLoader></div>
	{:then loading} 
		{#if !$weekly}
		<h1>Ultimi movimenti sismici</h1>
			<Map />
		{:else}
		<h1>Report settimanale</h1>
			<List />
		{/if}
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