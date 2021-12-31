const GaiaGps = require('../index');

run()

async function run() {
  gaiaGps = new GaiaGps();
  myTracks = await gaiaGps.getTracks('fLF1cWTxghN1sVBIEjJiyHkm', {start:'12-02-2021',end:'12-29-2021'})
  console.log(myTracks);
  myTracks.forEach(async (myTrack) => {
    const res = await myTrack.gpx()
    console.log(res)
  })
}
