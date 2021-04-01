<script>
   function removeSpecialEvent(){
      document.getElementsByClassName('navbar')[0].style.top = "0px";
      document.getElementsByTagName('body')[0].style.paddingTop = "0px";
   }
   removeSpecialEvent()
</script>

<div>
   <h1 class="title">About</h1>
	<p>This project fetches latest earthquakes happened in Italy and displays them in an interactive map. All the data is fetched from the <a href="http://www.ingv.it/">INGV</a> public api, and the map is created with <a href="https://leafletjs.com">Leaflet</a></p>
</div>