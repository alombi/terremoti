<script>
   import feather from 'feather-icons';
   import { sidebar, weekly } from '../stores/layout';
   let isOpen = false
   $:{
      console.log($sidebar)
      isOpen = $sidebar
   }
   function goHome(){
      weekly.set(false)
      sidebar.set(false)
   }
   function goWeekly(){
      weekly.set(true)
      sidebar.set(false)
   }
</script>

<div id="sidebar" class="sidebar" class:isOpen>
   <div class="sidebar-content">
      <p class="sidebarHeader">
         <span>Earthquakes v2</span>
       </p>
      <div class="headerLinks">
         <a on:click={goHome} class="icon" href="/#">{@html feather.icons.map.toSvg()} Home</a>
         <a on:click={goWeekly} class="icon" href="/#">{@html feather.icons.calendar.toSvg()} Report settimanale</a>
         <a class="icon" href="https://github.com/alombi/earthquake-widget" target="_blank">{@html feather.icons.grid.toSvg()} iOS Widget</a>
       </div>

       <p class="sidebarHeader">
         <span>Sul progetto</span>
       </p>
       <div class="headerLinks">
         <a class="icon" href="https://github.com/alombi/earthquakes" target="_blank">{@html feather.icons.github.toSvg()} Codice sorgente</a>
         <a class="icon" href="https://alombi.xyz" target="_blank">{@html feather.icons.user.toSvg()} Informazioni</a>
       </div>
   </div>
</div>
<div class="sidebar-fake" class:isOpen></div>


<style>
   .sidebar, .sidebar-fake{
      transition: left 0.3s ease-in-out
   }
</style>