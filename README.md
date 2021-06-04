# Latest earthquakes in Italy 🌍 🇮🇹
<a href="https://ingv.alombi.xyz">Live app</a> | <a href="http://www.ingv.it/">Source</a>

A web application for easily and quickly monitoring latest earthquakes in Italy, and showing them in an interactive and well-looking map.

The project is now stable, and further development - both improvements and features - is planned.

## Goals
The goal is to make easy and quick checking for earthquakes or seismic events on the Italian territory. The API is intended to be used only in this project.

## Project
The `api` folder contains an API endpoint which fetches and parses the INGV public api, since its particular format (QuakeML). 

The rest of the project is a Svelte web application built with Leaflet maps for showing and exploring all the data fetched from the API. The website uses [tinro](https://github.com/AlexxNB/tinro) as router and [leaflet-svelte](https://github.com/anoram/leaflet-svelte) as Leaflet wrapper.

### Contributing
Any ideas or pull request is always welcome. If you have a bug to report, please open an issue.

## iOS and iPadOS widget
I've also written a small iOS widget that show the latest event right in your home screen. Find it here [https://github.com/alombi/ios-scripting/blob/master/earthquake.js](https://github.com/alombi/ios-scripting/blob/master/earthquake.js)

**Note: requires iOS 14 or newer and the Scriptable app.**
### How to setup 
1. Download the [Scriptable](https://scriptable.app) app on your device
2. Copy the widget's code from the link above
3. Create a new script in the Scriptable app
4. Paste the code you just copied
5. Rename the script to "Earthquakes" (optional)
6. Go to home screen, add a Scriptable widget and from the widget configurator select Script > Earthquakes
