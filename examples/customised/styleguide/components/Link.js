import React from "react";

function Link({ children, ...props }) {
  return (
    <a {...props} className="link">
      {children}
    </a>
  );
}

export default Link;
