<script>
   function removeSpecialEvent(){
      document.getElementsByClassName('navbar')[0].style.top = "0px";
      document.getElementsByTagName('body')[0].style.paddingTop = "0px";
   }
   removeSpecialEvent()
</script>

<div>
   <h1 class="title">About</h1>
	<p>This web app fetches latest earthquakes happened in Italy and displays them in an interactive map. All the data is fetched from the <a href="http://www.ingv.it/" target="_blank">INGV</a> public api, and the map is created with <a href="https://leafletjs.com" target="_blank">Leaflet</a>.</p>
   <p>The project is completely open source at <a href="https://github.com/alombi/earthquakes" target="_blank">https://github.com/alombi/earthquakes</a></p>
</div>