<script>
	import { Modals, closeModal } from 'svelte-modals'
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
	import Footer from './components/Footer.svelte';
	import Weekly from './components/Weekly.svelte';
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
<Navbar />
<main>
	<h1>Website is under maintenance. Version 2.0 is coming soon.</h1>
</main>
</Notifications>
<Modals>
	<div
	  slot="backdrop"
	  class="backdrop"
	  on:click={closeModal}
	/>
</Modals>

<style>
	main{
		padding-top:40px;
	}
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0,0,0,0.50)
  }
</style>