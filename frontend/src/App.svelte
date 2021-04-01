<script>
	import Navbar from './components/Navbar.svelte';
	import MainMap from './components/MainMap.svelte';
	import MainList from './components/MainList.svelte';
	import Event from './components/Event.svelte';
	import { Jumper } from 'svelte-loading-spinners'
	import Notifications from 'svelte-notifications';
	import { events } from './events.js';
	import { Route, router } from 'tinro';
	router.mode.memory();
	let data = [];
	let promise;
	async function getData(){
		let request = await fetch('https://ingv.vercel.app/latest')
		let response = await request.json()
		data = response.events
		events.set(data)
		return data 
	}
	promise = getData()
</script>

<Notifications>
<main>
	<Navbar />
	<Route path="/">
	<h1 class="title">Latest earthquakes <span id="desktop_only">in Italy</span></h1>
	{#await promise}
		<div class="spinner">
			<Jumper size="60" color="#FFFFFF" unit="px" duration="1s"></Jumper>
		</div>
	{:then data} 
		<MainMap />
		<br><hr>
		<h2 id="list_title">Earthquakes list</h2>
		<MainList />
	{/await}
	</Route>
	<Route path="event/:id" let:meta>
		<Event id={meta.params.id} />
	</Route>
	<Route path="/about">
		<h1 class="title">About</h1>
		<p>This project fetches latest earthquakes happened in Italy and displays them in an interactive map. All the data is fetched from the <a href="http://www.ingv.it/">INGV</a> public api, and the map is created with <a href="https://leafletjs.com">Leaflet</a></p>
	</Route>
</main>
</Notifications>

<style>
	#list_title{
		padding-left: 5px;
	}
</style>