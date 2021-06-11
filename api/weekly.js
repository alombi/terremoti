const fetch = require('node-fetch')
const parseString = require('xml2js').parseString;
const moment = require('moment');

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

function createArray(responseFormatted) {
  let weekly = {
    events:[]
  }
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
    eventID = responseFormatted[i].$.publicID.replace('smi:webservices.ingv.it/fdsnws/event/1/query?eventId=', '')
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
      'eventID':eventID
    };
    weekly.events.push(event)
  }

  return weekly

}

async function getWeekly(date) {
  let url = 'https://webservices.ingv.it/fdsnws/event/1/query?starttime=' + date
  let request = await fetch(url)
  let response = await request.text()
  let responseFormatted;
  parseString(response, function(err, result){
    responseFormatted = result['q:quakeml'].eventParameters[0].event;
  })
  let weekly = createArray(responseFormatted)
  var newData = weekly.events.sort((a, b) => {
    return a.mag - b.mag;
});
  return newData.reverse()
}

module.exports = async (req, res) => {
  let oneWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD')
  let eventsSorted = await getWeekly(oneWeekAgo)
  let weekly = eventsSorted.slice(0, 12)
  res.setHeader('Content-type', 'application/json')
  res.json(weekly)
}