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
	import { weekly } from './weekly.js';
	import { specialEvent } from './specialEvent.js'
	import { Route, router } from 'tinro';
	import Footer from './components/Footer.svelte';
	import Weekly from './components/Weekly.svelte';
	router.mode.memory();
	let data = [];
	let sort;
	let promise, promise2, updatingList;
	async function getData(){
		var request = await fetch('https://ingv.alombi.xyz/latest')
		var response = await request.json()
		data = response.events
		events.set(data)
		var special = response.specialEvent
		specialEvent.set(special)

		return data 
	}
	async function getSecondaryData(){
		// Retrieving weekly too
		var weeklyRequest = await fetch('https://ingv.alombi.xyz/weekly')
		var weeklyResponse = await weeklyRequest.json()
		weekly.set(weeklyResponse)
		
		var data2 = weeklyResponse;
		return data2
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
	promise2 = getSecondaryData()
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
		<br>
	{/await}
	{#await promise2}
		<span></span>
	{:then}
		<span id="weekly"><br><br></span>
		<h2>Weekly report</h2>
		<p>The most important and notable events of the week.</p>
		<Weekly />
	{/await}
		<Footer />
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