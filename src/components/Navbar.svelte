<script>
   import feather from 'feather-icons';
   import { openModal } from 'svelte-modals';
   import Modal from './Modal.svelte'

   function openAbout(){
      openModal(Modal, {title:"About the project", message:"A web app for checking latest earthquakes in Italy, with interactive maps.<br>Created by <a href=\"https:alombi.xyz\" target=\"_blank\">alombi</a>, and open source on <a target=\"_blank\" href=\"https://github.com/alombi/earthquakes\">GitHub</a>"})
   }
</script>

<div class="fake"></div>
<nav>
   <div class="left-block">
      <a class="nav-title button" href="/">Earthquakes v2</a>
   </div>
  <div class="rigth-block">
      <a on:click={openAbout} href="/#" class="button-icon">{@html feather.icons.info.toSvg()}</a>
      <a href="https://github.com/alombi/earthquakes" target="_blank" class="button-icon">{@html feather.icons.github.toSvg()}</a>
  </div>
</nav>


<style>
   a{
      color:white;
      text-decoration: none;
   }
   .fake{
      position: fixed;
      top:0;
      left:0;
      width: 100%;
      height:50px;
      background-color: #333333;
      z-index: 2;
      opacity: .6;
   }
   nav {
      position: fixed;
      top:0;
      left:0;
      width: 100%;
      height:50px;
      display:flex;
      align-items: center;
      justify-content:space-between;
      z-index: 2;
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px)
   }
   nav > div{
      margin-left: 10px;
      margin-right: 10px;
   }
   .nav-title{
      font-weight: 600;
   }
</style>

