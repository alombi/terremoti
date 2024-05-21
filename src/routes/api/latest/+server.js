// @ts-nocheck
import { redirect, json } from '@sveltejs/kit';
import parseString from 'xml2js'
import moment from 'moment';

function getToday() {
  // Get date
  var now = new Date();
  var dd = now.getDate();
  if(dd < 9){
    dd = "0" + String(dd)
  }
  var mm = now.getMonth()+1; 
  if(mm < 9){
    mm = "0" + String(mm)
  }
  var yyyy = now.getFullYear();
  let today = `${yyyy}-${mm}-${dd}`;
  return today
}

let type, region, lat, long, depth, time, magnitudo, magnitudoUncertainty, color;

async function getLast37(){
    let last37 = {
      events:[]
    }
    let url = 'https://webservices.ingv.it/fdsnws/event/1/query';
    let request = await fetch(url)
    let response = await request.text()
    let responseFormatted;
    parseString.parseString(response, function(err, result){
      responseFormatted = result['q:quakeml'].eventParameters[0].event;
    })
    console.log(responseFormatted)

    for(var i = 0; i < responseFormatted.length; i++){
      type = responseFormatted[i].type[0];
      region = responseFormatted[i].description[0].text[0];
      lat = responseFormatted[i].origin[0].latitude[0].value[0];
      long = responseFormatted[i].origin[0].longitude[0].value[0];
      depth = responseFormatted[i].origin[0].depth[0].value[0];
      time = responseFormatted[i].origin[0].time[0].value[0];
      magnitudo = responseFormatted[i].magnitude[0].mag[0].value[0];
      // Checking color
      if(Number(magnitudo) > 3.9){
        color = 'red'
      }else if(Number(magnitudo) > 1.9){
        color = 'orange'
      }else{
        color = 'yellow'
      }
      try {
        magnitudoUncertainty = responseFormatted[i].magnitude[0].mag[0].uncertainty[0]
      } catch (err) {
        magnitudoUncertainty = null
      }
      let eventID = responseFormatted[i].$.publicID.replace('smi:webservices.ingv.it/fdsnws/event/1/query?eventId=', '')
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
      minute: 'numeric'
      };
      let timeToDate = new Date(time)
      let timeString = timeToDate.toLocaleString('it-IT', options)
      var event = {
        'type':type,
        'region':region,
        'lat':lat,
        'long':long,
        'depth':depth,
        'time':time,
        'mag':magnitudo,
        'magUncertainty':magnitudoUncertainty,
        'color':color,
        'eventID':eventID,
        'latitude': Number(lat),
        'longitude': Number(long),
        'timeString': timeString
      };
      last37.events.push(event)
    }
    return last37
}

export async function GET({ url }){
    let last37 = await getLast37();
    return json({last37})
}


// Non più usato
function detectSpecialEvent(data) {
    let candidates = [];
    let specialEvent;
    let today = getToday()
    for (var i = 0; i < data.events.length; i++){
      if (Number(data.events[i].mag) > 4.9 && today == data.events[i].time.split('T')[0]) {
        candidates.push(data.events[i]);
      }
    }
    if (candidates.length == 0) {
      specialEvent = null;
    } else if (candidates.length == 1) {
      specialEvent = candidates[0];
    } else {
      let maxMag = Number(candidates[0].mag);
      specialEvent = candidates[0]
      candidates.forEach(function (event) {
        if (Number(event.mag) > maxMag) {
          maxMag = Number(event.mag)
          specialEvent = event
        }
      })
    }
    return specialEvent
}