mapboxgl.accessToken = 'pk.eyJ1IjoidG9tYXJhdmk3IiwiYSI6ImNrems2ZG94ODBkbGMybnRhN2tnZGlsb3cifQ.UH7MohV8XWRwA4-FmdhpLw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
  center: [76.6598,30.5161],
  zoom: 9
});
//bounds that map sticks to in the starting
const bounds = [
  [68.14712, 23.63936], // Southwest coordinates
  [97.34466,28.20453] // Northeast coordinates
];


//Full Screen Option
map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');

//map-controls
map.addControl(new mapboxgl.NavigationControl(),'bottom-right');

// Add the control to the map.
// map.addControl(
//   new mapboxgl({
//   accessToken: mapboxgl.accessToken,
//   mapboxgl: mapboxgl
//   })
// );

//Get user location manually
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true
}), 'bottom-right');

// get location automatically
function markUserLocation(){
  console.log("Getting location")
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    latitude=crd.latitude
    longitude=crd.longitude
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  //default marker on User
  const hm = document.createElement('div');
  hm.className = 'marker';
  hm.style.backgroundImage = `url('/img/icons/location.png')`;
  // console.log(latitude," + ",longitude)
  const marker1 = new mapboxgl.Marker(hm).setLngLat([crd.longitude,crd.latitude]).addTo(map);
  }
  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
  
}
window.onload=markUserLocation()



const coordinatesGeocoder = function (query) {
  // Match anything which looks like
  // decimal degrees coordinate pair.
  const matches = query.match(
  /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
  );
  if (!matches) {
  return null;
  }
  function coordinateFeature(lng, lat) {
    return {
    center: [lng, lat],
    geometry: {
    type: 'Point',
    coordinates: [lng, lat]
    },
    place_name: 'Lat: ' + lat + ' Lng: ' + lng,
    place_type: ['coordinate'],
    properties: {},
    type: 'Feature'
    };
    }
     
    const coord1 = Number(matches[1]);
    const coord2 = Number(matches[2]);
    const geocodes = [];
     
    if (coord1 < -90 || coord1 > 90) {
    // must be lng, lat
    geocodes.push(coordinateFeature(coord1, coord2));
    }
     
    if (coord2 < -90 || coord2 > 90) {
    // must be lat, lng
    geocodes.push(coordinateFeature(coord2, coord1));
    }
     
    if (geocodes.length === 0) {
    // else could be either lng, lat or lat, lng
    geocodes.push(coordinateFeature(coord1, coord2));
    geocodes.push(coordinateFeature(coord2, coord1));
    }
     
    return geocodes;
    };
// search bar
map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  localGeocoder: coordinatesGeocoder,
  zoom: 12,
  placeholder: 'SEARCH',
  mapboxgl: mapboxgl,
  reverseGeocode: true
  }),'bottom-left'
  );