<script>
   import EventBox from './EventBox.svelte';
   import { events } from '../events.js';
</script>

<div class="list">
   {#each $events as event}
      <EventBox event={event} zoom=10 />
   {/each}
</div>