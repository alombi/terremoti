const fetch = require('node-fetch')
var parseString = require('xml2js').parseString;

let type, region, lat, long, depth, time, magnitudo, magnitudoUncertainty, color;

async function getLatest(){
  // Get date
  var today = new Date();
  var dd = today.getDate();
  if(dd < 9){
    dd = "0" + String(dd)
  }
  var mm = today.getMonth()+1; 
  if(mm < 9){
    mm = "0" + String(mm)
  }
  var yyyy = today.getFullYear();
  let url = 'http://webservices.ingv.it/fdsnws/event/1/query?starttime=' + `${yyyy}-${mm}-${dd}&limit=1`
  // Fetch the api
  let latestRequest = await fetch(url)
  let latestXML = await latestRequest.text()
  // Parse the QuakeML data (XML like)
  let latestJSON;
  parseString(latestXML, function (err, result) {
    latestJSON = result['q:quakeml'].eventParameters[0].event[0];
  });
  type = latestJSON.type[0];
  region = latestJSON.description[0].text[0];
  lat = latestJSON.origin[0].latitude[0].value[0];
  long = latestJSON.origin[0].longitude[0].value[0];
}

async function getLast37(){
  let last37 = {
    events:[]
  }
  let url = 'https://webservices.ingv.it/fdsnws/event/1/query';
  let request = await fetch(url)
  let response = await request.text()
  let responseFormatted;
  parseString(response, function(err, result){
    responseFormatted = result['q:quakeml'].eventParameters[0].event;
  })
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
      color = 'green'
    }
    magnitudoUncertainty = responseFormatted[i].magnitude[0].mag[0].uncertainty[0]
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
    last37.events.push(event)
  }
  return last37
}

module.exports = async (req, res) => {
  let data = await getLast37()
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-type', 'application/json')
  res.json(data)
}