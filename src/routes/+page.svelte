<script>
// @ts-nocheck
    import Navbar from "$lib/components/Navbar.svelte";
    import Map from "$lib/components/Map.svelte";
    export let data
    const events = data.data.events
</script>


<Navbar />
<Map {events} />

<style>

</style>