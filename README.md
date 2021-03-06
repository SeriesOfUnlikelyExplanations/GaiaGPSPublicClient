# GaiaGPSPublicClient
An unofficial NodeJs client to read tracks from a public GaiaGps profile. I don't like putting usernames/passwords in code, so this client doesn't use a username/password since it only gets a users public profile. It should be fully working - please open an issue if you have any questions or run into any problems!


## How to use it:
```
const myTracks = await gaiaGps({PROFILE_ID}, {start:'12-21-2021',end:'12-29-2021'}) // PROFILE_ID can be found using the steps below. The timeframe parameter is optional.

myTracks.forEach(async (myTrack) => {
  const geoJSON = await myTrack.geoJSON()
  console.log(geoJSON)
  const gpx = await myTrack.gpx()
  console.log(gpx)
  const gpx = await myTrack.kml()
  console.log(kml)
})
```

## Retrieving  your PROFILE_ID
1. go to https://www.gaiagps.com/profile/?utm_source=header&utm_campaign=profile
1. sign-in, if you haven't already
1. Click on "Preview Profile" --> "View Sharable Profile"
1. Your profile ID is part of the url, right after the "public" path - https://www.gaiagps.com/profile/public/{PROFILE_ID}/{PROFILE_NAME}/

 
## API documentation:

### Items API:
This API allows you to get all the tracks (or other items?) for a particular profile. This includes private tracks, but you can filter them out with a query parameter (or by looking at the public element in the JSON response.

https://www.gaiagps.com/api/objects/items/public/{PROFILE_ID}/

Query parameters:
- sort_key=time_created
- sort_field=create_date
- sort_direction=desc
- show_waypoints=false
- show_areas=false
- show_archived=false
- include_track_photos=true
- show_private=true

Response:

```
[
  {
    "id": "{TRACK_ID}",
    "updated_date": "2021-12-22T21:49:39Z",
    "time_created": "2021-12-22T17:35:33Z",
    "last_updated_on_server": "2021-12-27T14:04:10.083",
    "deleted": false,
    "title": "This is the name of my track",
    "notes": "Whatever notes I added to the track",
    "public": true, #This needs to be true in order to call the tracks api below.
    "folder": "{folder-id}",
    "folder_name": "Name of my folder",
    "path": "track",
    "distance": 7403.849900964678, #meters
    "total_ascent": 381.5990220811623, #meters
    "total_time": 15216, #seconds
    "activities": [
      "hiking"
    ]
  },
  {...}
]
```


### Tracks API
This api allows you to get details about a specific track ID. 

https://www.gaiagps.com/api/objects/track/{track-id}/

Query parameters: Unknown

Response:

```
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "{track-id}",
      "properties": {
        "id": "{track-id}",
        "updated_date": "2021-12-22T21:49:39Z",
        "time_created": "2021-12-22T17:35:33Z",
        "last_updated_on_server": "2021-12-27T20:07:49.769",
        "db_insert_date": "2021-12-22T21:49:39Z",
        "deleted": false,
        "title": "This is the name of my track",
        "public": true,
        "color": "#0498FF",
        "hexcolor": "#0498FF",
        "is_active": true,
        "revision": 1640635669,
        "notes": "Whatever notes I added to the track",
        "track_type": "",
        "routing_mode": "",
        "uploaded_gpx_to_osm": null,
        "flag": null,
        "source": "Android google Pixel 4A",
        "cover_photo_id": null,
        "distance": 7403.849900964678, #meters
        "total_ascent": 381.5990220811623, #meters
        "total_descent": 268.03825141058996,
        "stopped_time": 6028.273809194565, #seconds
        "total_time": 15216, #seconds
        "average_speed": 0.486583195384114,
        "moving_time": 9187.726190805435,
        "moving_speed": 0.8058413743733503,
        "activities": [
          "hiking"
        ],
        "imported": false,
        "folder": null,
        "preferred_link": "/public/saxODwWWlKKlU4Cg3UNLWyyg",
        "user_displayname": "My Name",
        "username": "user.name",
        "user_email": "Me@gmail.com",
        "user_id": 130827,
        "created_by": {
          "id": 130827,
          "displayName": "My Name",
          "link": "/profile/XXX/my-name/",
          "image": "https://www.gaiagps.com/profile/XXX/photo/"
        },
        "favorite_count": 0,
        "is_favorite": false,
        "comment_count": 0,
        "comments": [],
        "user_photo_count": 0,
        "latitude": 36.571375292947266, #looks like the center lat/long for the map
        "longitude": -105.43613696394767,
        "writable": false
      },
      "style": {
        "stroke": "#0498FF"
      },
      "geometry": {
        "type": "MultiLineString",
        "coordinates": [
          [
            [
              -105.44224, #longitude
              36.584047, #lattitude
              2989.599853515625, #elevation in meters
              1640194531 # No idea what this is. It seems to increment througout the track - so maybe some kind of track point id?
            ],
            [
              ...
            ]
          ]
        ]
      }
    }
  ],
  "id": "{track-id}"
}
```
