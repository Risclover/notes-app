import React from "react";

export default function Navigation(props) {
  return (
    <div>
      <h2 className="notes-nav-title">Navigation</h2>
      {props.children}
    </div>
  );
}
