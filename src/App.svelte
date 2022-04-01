<script>
	import { getData } from './lib/functions';
	import { events, weekly, specialEvent } from './lib/stores';
	import { Modals, closeModal } from 'svelte-modals'
	import Notifications from 'svelte-notifications';
	import Navbar from './components/Navbar.svelte';
	
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