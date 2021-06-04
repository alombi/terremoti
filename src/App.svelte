<script>
	import Navbar from './components/Navbar.svelte';
	import MainMap from './components/MainMap.svelte';
	import MainList from './components/MainList.svelte';
	import Event from './components/Event.svelte';
	import About from './components/About.svelte';
	import SplitView from './components/SplitView.svelte';
	import SpecialEventBar from './components/SpecialEventBar.svelte';
	import { Jumper } from 'svelte-loading-spinners'
	import Notifications from 'svelte-notifications';
	import { events } from './events.js';
	import { specialEvent } from './specialEvent.js'
	import { Route, router } from 'tinro';
	import Footer from './components/Footer.svelte';
	router.mode.memory();
	let data = [];
	let sort;
	let promise, updatingList;
	async function getData(){
		let request = await fetch('https://ingv.alombi.xyz/latest')
		let response = await request.json()
		data = response.events
		events.set(data)
		var special = response.specialEvent
		specialEvent.set(special)
		return data 
	}
	async function changeSort(){
		var sorting = document.getElementById('sort').value;
		if(sorting == "important"){
			var newData = data.sort((a, b) => {
    			return a.mag - b.mag;
			});
			updatingList = new Promise(function(resolve, reject) {
   			resolve()
			});
			events.set(newData.reverse())
		}else{
			var newData = await getData()
			updatingList = new Promise(function(resolve, reject) {
   			resolve()
			});
		}
	}
	promise = getData()
	// Detecting screen width and deciding if splitView needs to be applied
	let splitView = false;
	if(window.innerWidth > 900){
		splitView = true
	}
</script>

<Notifications>
<main>
	{#await promise}
		<p></p>
	{:then}
		<!-- <SpecialEventBar /> -->
		<Navbar/>
	{/await}
	<Route path="/">
	{#await promise}
		<div class="spinner">
			<Jumper size="60" color="#FFFFFF" unit="px" duration="1s"></Jumper>
		</div>
	{:then data}
		<h1 class="title">Latest earthquakes <span id="desktop_only">in Italy</span></h1> 
		{#if !splitView}
			<MainMap />
			<br><hr>
			<div id="list_title_div">
				<h2 id="list_title">Earthquakes list</h2>
				<!-- svelte-ignore a11y-no-onchange -->
				<select name="sort" id="sort" bind:value={sort} on:change={changeSort}>
					<option value="latest">Sort per latest</option>
					<option value="important">Sort per importance</option>
				</select>
			</div>	
			{#await updatingList}
				<span></span>
			{:then}
				<MainList />
			{/await}
		{:else}
			<div class="splitSelector">
				<span></span>
				<span></span>
				<p id="did">Scroll down and tap one event to focus</p>
				<!-- svelte-ignore a11y-no-onchange -->
				<select name="sort" id="sort" bind:value={sort} on:change={changeSort}>
					<option value="latest">Sort per latest</option>
					<option value="important">Sort per importance</option>
				</select>
			</div>
			{#await updatingList}
				<span></span>
			{:then}	
				<SplitView />
			{/await}
		{/if}
		<Footer />
	{/await}
	</Route>
	<Route path="event/:id" let:meta>
		<Event id={meta.params.id} />
	</Route>
	<Route path="/about">
		<About />
	</Route>
</main>
</Notifications>

<style>
	#list_title{
		padding-left: 5px;
	}
</style>