import React from "react";

export default function Note(props) {
  return (
    <div className="note" id={props.id}>
      <div className="note-content">
        <div className="title">{props.title}</div>
        <div className="note-text">{props.note}</div>
      </div>
      {props.children}
      
    </div>
  );
}
