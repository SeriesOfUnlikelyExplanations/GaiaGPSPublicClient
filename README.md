# GaiaGPSPublicClient
An unofficial NodeJs client to read tracks from a public GaiaGps profile. Getting this from the 


## API documentation:


### Items API:

https://www.gaiagps.com/api/objects/items/public/{profile-id}/

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
    "id": "d55d3e2395c6ee1ad7ca6c664f9b9144c35940f0",
    "updated_date": "2021-12-22T21:49:39Z",
    "time_created": "2021-12-22T17:35:33Z",
    "last_updated_on_server": "2021-12-27T14:04:10.083",
    "deleted": false,
    "title": "Williams lake",
    "notes": "",
    "public": true,
    "folder": "",
    "folder_name": "",
    "path": "track",
    "distance": 7403.849900964678,
    "total_ascent": 381.5990220811623,
    "total_time": 15216,
    "activities": [
      ""
    ]
  },
  {...}
]
```


### Tracks API
https://www.gaiagps.com/api/objects/track/<track-id>/
Query parameters: Unknown
Response:
