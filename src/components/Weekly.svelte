<script>
   import EventBox from './EventBox.svelte';
   import { weekly } from '../weekly.js'
</script>

<div class="list" id="weekly">
   {#each $weekly as event}
      <EventBox event={event} zoom=10 />
   {/each}
</div>