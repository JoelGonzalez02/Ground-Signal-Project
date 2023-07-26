import React, { useState, useCallback, memo } from "react";
import GoogleMapReact from "google-map-react";
import { Input } from "antd";
import { sampleData } from "../../sample-data";
import SearchIcon from "../searchIcon/SearchIcon";
import Marker from "../marker/Marker";
import PinIcon from "../../assets/icon-pin.svg";
import Modal from "../modal/Modal";

import "./Map.css";

const Map = () => {
  const [center, setCenter] = useState({ lat: 42.345, lng: -71.047585 });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLoaction] = useState(null);
  const [modalOpen, setModaOpen] = useState(false);

  const handleSearchChange = useCallback((event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredResults = sampleData.filter((location) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, []);

  const handleResultClick = (location) => {
    const clickedLocation = {
      lat: location.location.lat,
      lng: location.location.lng,
    };
    setCenter(clickedLocation);
    setSelectedLoaction(location);
  };

  const handleMarkerClick = () => {
    setModaOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setModaOpen(false);
  }, []);

  return (
    <div className="map-container">
      <div className="search-container">
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          prefix={<SearchIcon />}
          className="search-input"
        />
        <div className="results-container">
          {searchResults.length === 0
            ? "No results found"
            : searchResults.length === 1
            ? `Found 1 result:`
            : `Found ${searchResults.length} results:`}
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {searchResults.map((result) => (
            <li
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="result-item"
            >
              <img
                style={{
                  position: "absolute",
                  left: 50,
                }}
                className="pin-icon"
                src={PinIcon}
                alt="Pin Icon"
              />
              {result.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBf-DJB6F6KknlvR5As9ymgNXWEF2zjyAQ",
            libraries: ["places"],
          }}
          center={center}
          zoom={14}
        >
          <Marker
            lat={center.lat}
            lng={center.lng}
            text="You are here"
            onClick={handleMarkerClick}
          />
        </GoogleMapReact>

        {modalOpen && (
          <Modal location={selectedLocation} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default memo(Map);
