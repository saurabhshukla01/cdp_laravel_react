import React from "react";

export default function Logo() {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <img
        className="animation__shake"
        src="%PUBLIC_URL%/admin/dist/img/AdminLTELogo.png"
        alt="AdminLTELogo"
        height="60"
        width="60"
      />
    </div>
  );
}
