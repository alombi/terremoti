<script>
   import feather from 'feather-icons';
   import { getData } from '../functions/fetchData';
   import { refreshed } from '../stores/events';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { sidebar, icon } from '../stores/layout';
   $:{
      console.log($refreshed)
      if($refreshed){
         addNotification({text:'Data refreshed!', position:'top-center', type:'default', removeAfter: '2000'})
         refreshed.set(false)
      }
   }
   function switchMode(){
      if(!document.getElementsByClassName('map-tiles-container')[0].classList.contains('map-tiles')){
         document.getElementsByClassName('map-tiles-container')[0].classList.add('map-tiles')
         $icon = 'sun'
         window.localStorage.setItem('mode', 'moon')
      }else{
         document.getElementsByClassName('map-tiles-container')[0].classList.remove('map-tiles')
         $icon = 'moon'
         window.localStorage.setItem('mode', 'sun')
      }
   }
   
   function openMenu(){
      if($sidebar){
         sidebar.set(false)
      }else{
         sidebar.set(true)
      }
   }
</script>

<div class="navbar-container">
   <div class="fake"></div>
   <nav>
      <div class="left-block">
         <a on:click={openMenu} class="nav-title button nav-link icon" href="/#">{@html feather.icons.menu.toSvg()}</a>
         <a class="nav-title button nav-link icon" href="/">{@html feather.icons.activity.toSvg()} v2.0</a>
      </div>
      <div class="rigth-block">
         <a on:click={switchMode} href="/#" class="button-icon nav-link icon" >{@html feather.icons[$icon].toSvg()}</a>
         <a on:click={()=>{getData(true)}} href="/#" class="button-icon nav-link icon" >{@html feather.icons['refresh-cw'].toSvg()}</a>
         <a href="https://github.com/alombi/earthquakes" target="_blank" class="button-icon nav-link icon">{@html feather.icons.github.toSvg()}</a>
      </div>
   </nav>
</div>

<style>
   .navbar-container{
      padding-bottom: 40px;
   }
</style>