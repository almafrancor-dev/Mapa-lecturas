import React, { useState } from "react";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import metroMap from "../MAPA_MI_3V.png"; // ajusta la ruta si es necesario

function MapView() {
  const [uploadedImages, setUploadedImages] = useState([]);

  // Manejar subida de múltiples imágenes
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Agregar una imagen y ponerla en una posición "default" (centro de CDMX)
        setUploadedImages((prev) => [
          ...prev,
          {
            src: reader.result,
            position: [19.4326, -99.1332],
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Coordenadas del overlay
  const bounds = [
    [19.50, -99.30], // esquina superior izquierda
    [19.10, -98.90], // esquina inferior derecha
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1000,
          background: "white"
        }}
      />

      <MapContainer
        center={[19.43, -99.13]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <ImageOverlay url={metroMap} bounds={bounds} />

        {uploadedImages.map((img, i) => (
          <Marker key={i} position={img.position}>
            <Popup>
              <img
                src={img.src}
                alt={`lectura-${i}`}
                style={{ width: "120px", borderRadius: "8px" }}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
