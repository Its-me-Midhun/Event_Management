import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { useParams } from 'react-router-dom';

const mapStyles = {
  width: '100%',
  height: '50%',
};

const MapContainer = (props) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showingInfoWindow, setshowingInfoWindow] = useState(false);
  const [activeMarker, setactiveMarker] = useState({});
  const [selectedPlace, setselectedPlace] = useState({});
  const [markerPosition, setMarkerPosition] = useState(null);

  const onMapClick = (mapProps, map, clickEvent) => {
    const latitude = clickEvent.latLng.lat();
    const longitude = clickEvent.latLng.lng();
    setLatitude(latitude);
    setLongitude(longitude);
    setMarkerPosition({ lat: latitude, lng: longitude });
    const geocoder = new props.google.maps.Geocoder();
    const latLng = new props.google.maps.LatLng(latitude, longitude);
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const addressComponents = results[0].address_components;
          const city = addressComponents.find((component) =>
            component.types.includes('locality')
          )?.long_name;
          const state = addressComponents.find((component) =>
            component.types.includes('administrative_area_level_1')
          )?.long_name;
          const country = addressComponents.find((component) =>
            component.types.includes('country')
          )?.long_name;
          const postalCode = addressComponents.find((component) =>
            component.types.includes('postal_code')
          )?.long_name;

          setselectedPlace({
            city: `${city}`,
            state: `${state}`,
            country: `${country}`,
            pincode: `${postalCode}`,
          });
          console.log('selectedPlace', selectedPlace);
          setshowingInfoWindow(true);
        } else {
          console.log('No results found');
        }
      } else {
        console.log(`Geocoder failed due to: ${status}`);
      }
      props.values({ latitude, longitude, selectedPlace });
    });
    console.log('latitude:', latitude, 'longitude:', longitude);
  };

  const onMarkerClick = (props, marker, e) => {
    setshowingInfoWindow(true);
    setactiveMarker(marker);
    setselectedPlace(props);
  };
  const onClose = () => {
    if (showingInfoWindow) {
      setshowingInfoWindow(false);
      setactiveMarker(null);
    }
  };
  return (
    <div>
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: props.latitude,
          lng: props.longitude,
        }}
        streetView={true}
        onClick={onMapClick}
      >
        <Marker position={markerPosition} onClick={onMarkerClick} />
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1n-Lml-bCOkTnNZs3uZNqq5IEyo7VQRY',
})(MapContainer);
