<script>
   import { events } from '../events.js';
   import EventBox from './EventBox.svelte';
   // import { focus } from '../focusEvent';
   // function focusOnEvent(e){
   //    var id = e.srcElement.id
   //    focus.set(id)
   // }
</script>

<div class="splittedList">
   <div>
      {#each $events as event}
         <EventBox event={event} zoom=7 />
         <!-- <a href="/event/{event.eventID}">
         <div class="splittedEvent" id={event.eventID}>
            <h3 id={event.eventID}>{event.region}</h3>
         </div>
         </a> -->
      {/each}
   </div>
</div>