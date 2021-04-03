<script>
   import EventBox from './EventBox.svelte';
   import { events } from '../events.js';
   let data = $events;
</script>

<div class="list">
   {#each data as event}
      <EventBox id={event.eventID} />
   {/each}
</div>