mapboxgl.accessToken = 'pk.eyJ1IjoidG9tYXJhdmk3IiwiYSI6ImNrems2ZG94ODBkbGMybnRhN2tnZGlsb3cifQ.UH7MohV8XWRwA4-FmdhpLw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
  zoom: 11
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
var long;
var lat;
// get location automatically
function markUserLocation() {
  console.log("Getting location");
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    lat = latitude = crd.latitude;
    long = longitude = crd.longitude;
    console.log(`Latitude : ${lat}`);
    console.log(`Longitude: ${long}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    localStorage.setItem("coordinate", JSON.stringify([long,lat]));
    //default marker on User
    const hm = document.createElement("div");
    hm.className = "marker";
    hm.style.backgroundImage = `url('/img/icons/location.png')`;
    // console.log(latitude," + ",longitude)
    const marker1 = new mapboxgl.Marker(hm)
      .setLngLat([crd.longitude, crd.latitude])
      .addTo(map);
    map.flyTo({
      center: [longitude, latitude],
      zoom: 13,
      projection: "globe",
    });
  }
  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}
window.onload = markUserLocation();
// map.on("load", function () {
//   console.log("maploaded");
//   console.log(
//     "in mapinit outside longitude : ",
//     JSON.parse(localStorage.getItem("coordinate")),
//   );
// });

// // search bar
map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  zoom: 12,
  mapboxgl: mapboxgl,
  reverseGeocode: true
  }),'bottom-left'
);