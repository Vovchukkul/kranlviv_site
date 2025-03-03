import React from "react";
import "./CallButton.scss";
import { FiPhoneCall } from "react-icons/fi"; // 📞 Іконка телефону

export const CallButton: React.FC = () => {
  return (
    <a href="tel:+380999197042" className="call-button">
      <FiPhoneCall size={28} />
    </a>
  );
};
