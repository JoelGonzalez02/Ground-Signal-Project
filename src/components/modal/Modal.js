import React, { memo } from "react";
import { Modal as AntModal, Button } from "antd";
import PinIcon from "../../assets/icon-pin.svg";

import "./Modal.css";

const Modal = ({ location, onClose }) => {
  return (
    <AntModal
      visible={!!location}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      {location && (
        <div className="modal-content">
          <div className="header">
            <div className="pin-icon">
              <img src={PinIcon} alt="Pin Icon" />
            </div>
            <div className="location-info">
              <div>
                <h2>{location.name}</h2>
                <div className="sub-text">
                  {location.location.lat}, {location.location.lng}
                </div>
              </div>
              <div className="header-button">
                <Button size="large" type="primary">
                  Visit Website
                </Button>
              </div>
            </div>
          </div>
          <div className="divider" />
          <div className="bottom-content">
            <p>{location.details.description}</p>
            <div className="images">
              {location.images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </AntModal>
  );
};

export default memo(Modal);
