<script>
// @ts-nocheck
   import { RadioTower } from "lucide-svelte";
   import { Badge } from "$lib/components/ui/badge/index.ts";
</script>

<div class="navbar-container">
   <nav>
      <div class="left-block">
         <p><a class="nav-title" href="/"><span><RadioTower size={20} /></span>terremoti v3</a></p>
      </div>
      <div class="right-block">
         <p><a href="https://github.com/alombi/terremoti">codice</a></p>
      </div>
   </nav>
</div>

<style>
   .text-icon > svg{
  margin-top:-6px;
  margin-right: 2px;
}
   .navbar-container{
      padding-bottom: 40px;
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
      z-index: 3;

      font-size: 16px;
   }
   .right-block > p > a:hover, .left-block > p > a:hover{
      color: #FFEA00 !important;
   }
   a{
      text-decoration: underline;
   }
   .right-block{
      display: flex;
      gap: 1em;
   }
   nav > div{
      margin-left: 50px;
      margin-right: 50px;
   }
   @media (max-width: 768px){
      nav > div{
         margin-left: 10px;
         margin-right: 10px;
      }
   }
   .nav-title{
      font-weight: 600;
      display: flex;
      gap: 0.25em;
      align-items: center;
   }
</style>