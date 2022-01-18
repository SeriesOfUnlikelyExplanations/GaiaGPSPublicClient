/**
 * @license gaiagps.js v1.0.0 12/27/2021
 *
 * Copyright (c) 2021, tom Woodard 
 * Licensed under the MIT license.
 **/
 
const https = require('https');
const Qs = require('qs');

apiHost = 'www.gaiagps.com';

class GaiaGps {
  constructor() {
    this.apiHost = apiHost
    this.itemsScope = '/api/objects/items/public'
  }
  async getTracks(profileId, timeframe = {}) {
    this.profileId = profileId;
    var tracksResponse = await handleRequest(this.apiHost, this.itemsScope, this.profileId, {showPrivate: false})
    if ('start' in timeframe) {
      tracksResponse = tracksResponse.filter(({time_created}) => new Date(time_created) > new Date(timeframe.start))
    }
    if ('end' in timeframe) {
      tracksResponse = tracksResponse.filter(({time_created}) => new Date(time_created) < new Date(timeframe.end))
    }
    const response = []
    tracksResponse.forEach(trackResponse => {
      response.push(new track(trackResponse))
    });
    return response
  }
}

class track {
  constructor(track) {
    this.apiHost = apiHost
    this.trackScope = '/api/objects/track'
    for (const [key, value] of Object.entries(track)) {
      this[key] = value
    }
  }
  async geoJSON() {
    var response = await handleRequest(this.apiHost, this.trackScope, this.id+'.geoJson')
    return response
  }
  async gpx() {
    var response = await handleRequest(this.apiHost, this.trackScope, this.id+'.gpx')
    return response
  }
  async kml() {
    var response = await handleRequest(this.apiHost, this.trackScope, this.id+'.kml')
    return response
  }
}
  
async function handleRequest(host, scope, id, queryParameters = {}, method = 'GET') {
  // Define request options
  queryParameters.ie = (new Date()).getTime();
  queryParameters.show_archived = false
  var options = {
    hostname: host,
    port: 443,
    path: `${scope}/${id}?${Qs.stringify(queryParameters)}`,
    method: method,
    headers:{'Cache-Control':'no-cache'}
  }
  console.log(options);
  return new Promise(function(resolve, reject) {
    var req = https.request(options, function(res) {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('statusCode=' + res.statusCode));
      }
      var body = [];
      res.on('data', function(chunk) {
        body.push(chunk);
      });
      res.on('end', function() {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch(e) {
          try {
            body = Buffer.concat(body).toString();
          } catch(e) {
            reject(e);
          }
        }
        resolve(body);
      });
    });
    req.on('error', function(err) {
      reject(err);
    });
    req.end();
  });
}
module.exports = GaiaGps;
