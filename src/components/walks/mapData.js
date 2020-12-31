export const location = {
    lat: 48.130926,
    lng: 11.580103,
}

export const imageArray = [
  {image: 'images/schlachthof4-hp.jpg', index: 0},
  {image: 'images/Brüdermuhl Grafiti 1024px.jpg', index: 3},
  {image: 'images/IMG_20180330_220107.jpg', index: 2},
  {image: 'images/Eagle Grafiti 1024px.jpg', index: 1},
  {image: 'images/endzeit-landscape.jpg', index: 4}
];

export const grafData = [
    {
        id: 1,
        name: 'The Schlachthof',
        lat: 48.122847,
        lng: 11.554482,
        image: 'images/schlachthof4-hp.jpg'
    },
    {
        id: 2,
        name: 'Brudermühl Bridge',
        lat: 48.112684,
        lng: 11.560598,
        image: 'images/Eagle Grafiti 1024px.jpg',
       // images/Brüdermuhl Grafiti 1024px.jpg',
               // './]
    },
    {
        id: 3,
        name: 'Ludwigsbrücke',
        lat: 48.131438,
        lng: 11.587447,
        image: 'images/IMG_20180330_220107.jpg',
    },
    {
        id: 4,
        name: 'Endzeit',
        lat: 48.097470,
        lng: 11.527639,
        image: 'images/endzeit-image.jpg'
    }
  ]




export const mapStyle = [
    { elementType: "geometry", stylers: [{ color: "#2a5443" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#2a3452" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#1a4f3c" }],
    },

    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
    stylers: ['hide' /*{ color: "#d59563" }*/],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [ 'hide' /*{ color: "#263c3f" }*/],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#615f54" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: ['hide' /*{ color: "#9ca5b3" }*/],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: ['hide'/*{ color: "#746855" }*/],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: ['hide'/*{ color: "#f3d19c" }*/],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#11165c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];