import React, { memo, useState } from "react";
import PinIcon from "../../assets/icon-pin.svg";
import { Marker } from "@react-google-maps/api";
import "./Marker.css";

const MarkerComponent = ({ text, onClick, lat, lng }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMarkerClick = () => {
    onClick();
  };

  return (
    <>
      <Marker
        position={{ lat, lng }}
        onClick={handleMarkerClick}
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
      >
        {isHovering && <div className="marker-text">{text}</div>}
      </Marker>
      <img
        src={PinIcon}
        alt="Pin Icon"
        className="pin-icon"
        style={{
          position: "absolute",
          left: "-8px",
          top: "-32px",
          width: "24px",
          height: "32px",
          cursor: "pointer",
        }}
        onClick={handleMarkerClick}
      />
    </>
  );
};

export default memo(MarkerComponent);
