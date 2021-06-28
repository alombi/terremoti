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
      // if (event != null){
      //    setSpecialEvent()
      // }
   }
   onMount(()=>{
      initialize()
   })

   function scrollToWeekly(){
      document.getElementById('weekly').scrollIntoView({behavior: 'smooth'});
   }
</script>

<div class="fake"></div>
<div class="navbar">
   <a on:click={initialize} id="logo" href="/">🌍 Earthquakes</a>
   <div id="options">
      <a on:click={refresh} href={window.location.href}>
         <ion-icon name="refresh"></ion-icon>
      </a>
      <a on:click={scrollToWeekly}>Weekly</a>
      <a href="/about">About</a>
   </div>
</div>

<style>
   a{
      font-size:15px;
   }
   ion-icon{
      margin:-4px;
   }
</style>