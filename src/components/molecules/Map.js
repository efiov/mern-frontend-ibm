import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

export default function Map({ events }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(21.225);
  const [lat] = useState(45.755);
  const [zoom] = useState(8);
  const [API_KEY] = useState("jQqzZEGiQunWVOX9bhaN");

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([lng, lat])
      .addTo(map.current);

    if (events && events.length > 0) {
      events.forEach((event) => {
        const { latitude, longitude } = event;
        if (latitude && longitude) {
          new maplibregl.Marker({ color: "#00FF00" })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }
      });
    }
  }, [API_KEY, lng, lat, zoom, events]);

  return (
    <div className="row">
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
}
