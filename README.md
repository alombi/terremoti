# Latest erathquakes in Italy 🌍 🇮🇹
<a href="https://ingv.alombi.xyz">Live app</a> | <a href="http://www.ingv.it/">Source</a>

This project is a web application for monitoring latest earthquakes in Italy, and showing them in an interactive and well-looking map.

## API
The backend folder contains an API endpoint which fetches and parses the INGV public api, since its particular format (QuakeML).
## Web App
The web app is a Svelte website built with Leaflet maps for showing and exploring all the data fetched from the API.