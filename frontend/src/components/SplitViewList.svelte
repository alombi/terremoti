<script>
   import { events } from '../events.js';
   import { focus } from '../focusEvent';
   function focusOnEvent(e){
      var id = e.srcElement.id
      focus.set(id)
   }
</script>

<div class="splittedList">
   <div>
      {#each $events as event}
         <div class="splittedEvent" id={event.eventID} on:click={focusOnEvent}>
            <h3 id={event.eventID}>{event.region}</h3>
         </div>
      {/each}
   </div>
</div>
<span></span>
<p id="did">Scroll down and tap one event to focus</p>