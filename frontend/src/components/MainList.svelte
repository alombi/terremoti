<script>
   import { events } from '../events.js';
   let data = $events;
</script>

<div class="list">
   {#each data as event}
      <a class="event" href="/event/{event.eventID}">
      <div >
         <h4>{event.region}</h4>
      </div>
      </a>
   {/each}
</div>