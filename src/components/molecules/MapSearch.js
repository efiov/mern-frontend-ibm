import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import * as turf from "@turf/turf";

export default function MapSearch({ onSelectLocation, long, lati }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [longitude, setLongitude] = useState(21.225);
  const [latitude, setLatitude] = useState(45.755);
  const [zoom] = useState(11.5);
  const [API_KEY] = useState("jQqzZEGiQunWVOX9bhaN");
  const [mapController, setMapController] = useState();
  const [selectedCoordinates, setSelectedCoordinates] = useState(null); // State to hold the selected coordinates

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [longitude, latitude],
      zoom: zoom,
    });
    map.current.on("load", () => {
      map.current.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
    });

    setLatitude(map.current.getCenter().lat);
    setLongitude(map.current.getCenter().lng);
    console.log(longitude, latitude);

    setMapController(createMapLibreGlMapController(map.current, maplibregl));

    setLatitude(lati);
    setLongitude(long);
  }, [API_KEY, longitude, latitude, zoom]);

  const handleGeosearchResult = (result) => {
    const { geometry } = result;
    const { coordinates } = geometry;

    setSelectedCoordinates(coordinates);

    if (onSelectLocation) {
      onSelectLocation(coordinates[1], coordinates[0]);
    }
  };
  console.log(selectedCoordinates);

  return (
    <div className="map-wrap">
      <div className="geocoding">
        <GeocodingControl
          apiKey={API_KEY}
          mapController={mapController}
          onGeosearchResult={handleGeosearchResult}
        />
      </div>
      <div ref={mapContainer} className="map" />
      {selectedCoordinates && (
        <div>
          Selected Coordinates: {selectedCoordinates[1]},{" "}
          {selectedCoordinates[0]}
        </div>
      )}
    </div>
  );
}
