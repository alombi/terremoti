<script>
   import { specialEvent } from '../specialEvent.js'
   let event = $specialEvent;

</script>

<div class="special_event_bar">
   <a href="/event/{event.eventID}">Highlighted event: {event.region.split('[')[0]} - {event.mag} Mg</a>
</div>

<style>
   div{
      background-color: yellow;
      text-align: center;
   }
   a{
      color:black;
      font-weight: 600;
      text-decoration: none;
   }
</style>