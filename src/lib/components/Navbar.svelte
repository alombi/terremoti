<script>
   import feather from 'feather-icons';
   import { openModal } from 'svelte-modals';
   import Modal from './Modal.svelte'

   function openAbout(){
      openModal(Modal, {title:"About the project", message:"A web app for checking latest earthquakes in Italy, with interactive maps.<br>Created by <a href=\"https://alombi.xyz\" target=\"_blank\">alombi</a>, and open source on <a target=\"_blank\" href=\"https://github.com/alombi/earthquakes\">GitHub</a>"})
   }
</script>

<div class="navbar-container">
   <div class="fake"></div>
   <nav>
      <div class="left-block">
         <a class="nav-title button nav-link icon" href="/">{@html feather.icons.activity.toSvg()} Earthquakes v2</a>
      </div>
   <div class="rigth-block">
         <a on:click={openAbout} href="/#" class="button-icon nav-link icon">{@html feather.icons.info.toSvg()}</a>
         <a href="https://github.com/alombi/earthquakes" target="_blank" class="button-icon nav-link icon">{@html feather.icons.github.toSvg()}</a>
   </div>
   </nav>
</div>

<style>
   .navbar-container{
      padding-bottom: 40px;
   }
</style>