<script>
   import { onMount } from 'svelte';
   import { specialEvent } from '../specialEvent.js'
   
   function refresh(){
      sessionStorage.setItem('refresh', true)
   }
   function setSpecialEvent(){
      document.getElementsByClassName('navbar')[0].style.top = "50px";
      document.getElementsByTagName('body')[0].style.paddingTop = "50px";
   }
   function initialize(){
      let event = $specialEvent;
      if (event != null){
         setSpecialEvent()
      }
   }
   onMount(()=>{
      initialize()
   })
</script>

<div class="fake"></div>
<div class="navbar">
   <a on:click={initialize} id="logo" href="/">🌍 Earthquakes</a>
   <div id="options">
      <a on:click={refresh} href={window.location.href}>Refresh</a>
      <a href="/about">About</a>
   </div>
</div>

<style>
   a{
      font-size:15px;
   }
</style>