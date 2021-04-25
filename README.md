# Latest earthquakes in Italy 🌍 🇮🇹
<a href="https://ingv.alombi.xyz">Live app</a> | <a href="http://www.ingv.it/">Source</a>

This project is a web application for monitoring latest earthquakes in Italy, and showing them in an interactive and well-looking map.

## Project structure
### API
The `backend` folder contains an API endpoint which fetches and parses the INGV public api, since its particular format (QuakeML). 

### Web application
In the `frontend` folder lives a Svelte web application built with Leaflet maps for showing and exploring all the data fetched from the API.

The website uses [tinro](https://github.com/AlexxNB/tinro) as router and [leaflet-svelte](https://github.com/anoram/leaflet-svelte) as Leaflet wrapper.

## iOS and iPadOS widget
Yep I've also written a small iOS widget that show the latest event right in your home screen. Find it here [https://github.com/alombi/ios-scripting/blob/master/earthquake.js](https://github.com/alombi/ios-scripting/blob/master/earthquake.js)

**Note: requires iOS 14 or newer and the Scriptable app.**
### How to setup 
1. Download the [Scriptable](https://scriptable.app) on your device
2. Copy the widget's code from the link above
3. Create a new script in the Scriptable app
4. Paste the code you just copied
5. Rename the script to "Earthquakes" (optional)
6. Go to home screen, add a Scriptable widget and from the widget configurator select Script > Earthquakes
