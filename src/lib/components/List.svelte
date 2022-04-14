<script>
   const months = ['Gennaio' ,'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
   import { weeklyEvents } from '../stores/events';
   $weeklyEvents.forEach(event => {
      if(event.region.indexOf('[') != -1){
         event.region = event.region.split('[')[0]
      }
   });
</script>

<div class="list">
   {#each $weeklyEvents as event}
      <div class="event">
         <p class="event-title">{event.region} - {event.mag} Mg</p>
         <p>{new Date(event.time).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} {months[new Date(event.time).getMonth()]} {new Date(event.time).getFullYear()}, at {new Date(event.time).getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{new Date(event.time).getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</p>
      </div>
   {/each}
</div>


<style>
   .list{
      display:grid;
      grid-template-columns: repeat(2, 50%);
      gap:10px;
   }
   .event{
      padding:10px 15px;
      border-radius:6px;
      background-color: #333;
   }
   .event-title{
      font-weight: 700;
   }
   @media(max-width:550px){
      .list{
         grid-template-columns: repeat(1, 100%);
      }
   }
</style>