<script>
   function refresh(){
      sessionStorage.setItem('refresh', true)
   }
</script>

<div class="navbar">
   <a id="logo" href="/">🌍 Earthquakes</a>
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