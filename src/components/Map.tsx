import React, { useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript
} from '@react-google-maps/api';
import mapStyles from '../lib/mapStyles.json';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 19.14,
  lng: 72.92
};

export default function ProjectMap({ projects }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [selectedProject, setSelectedProject] = useState(null);

  const options = {
    styles: mapStyles,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const markers = projects.map((proj) => ({
    ...proj,
    lat: Number(proj.location.lat),
    lng: Number(proj.location.lon)
  }));

  console.log(markers);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={11}
      options={options}
      onClick={() => setSelectedProject(null)}
    >
      {markers.map((proj) => (
        <Marker
          key={proj.id || `${proj.lat}_${proj.lng}`}
          position={{ lat: proj.lat, lng: proj.lng }}
          title={proj.name}
          onClick={() => setSelectedProject(proj)}
        />
      ))}

      {selectedProject && (
        <InfoWindow
          position={{
            lat: selectedProject.lat + 0.02,
            lng: selectedProject.lng
          }}
          onCloseClick={() => setSelectedProject(null)}
        >
          <div style={{ maxWidth: '300px' }}>
            <div
              style={{ backgroundImage: `url(${selectedProject.image})` }}
              className='w-[200px] h-[150px] bg-center bg-cover bg-no-repeat'
            />
            <div className='font-semibold text-slate-600 text-[13px] mt-1 flex flex-col'>
              <p>{selectedProject.name}</p>
              <p className='font-normal'>{selectedProject.city}</p>
              <p className='font-normal'>{`${selectedProject.area} sq.mt.`}</p>
            </div>
            <a
              href={`/portfolio/${selectedProject.slug}`}
              className='text-red-600 font-semibold text-xs mt-2 block'
            >
              GO TO PROJECT PAGE
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
