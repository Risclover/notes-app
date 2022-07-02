import React, { useState } from "react";
import Navigation from "./firstversion/Navigation";

import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const date = new Date();
const n = date.toDateString();
const time = date.toLocaleTimeString();

export default function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [notesCount, setNotesCount] = useState(0);
  const [activeId, setActiveId] = useState();
  const [currentDate, setCurrentDate] = useState(n + " " + time);
  const [isHovering, setIsHovering] = useState(false);

  // First view: List of notes (so, navigation)
  // Second view: Add note

  const handleNavClick = (e) => {
    const submitBtn = document.querySelector(".submit");
    const noteTitle = document.querySelector(".note-title");
    const noteText = document.querySelector(".type-note");
    for (let i = 0; i < notes.length; i++) {
      if (e.target.id === `nav-${notes[i].id}`) {
        submitBtn.textContent = "Edit Note";
        if (notes[i].title === "") {
          noteTitle.value = "";
        } else {
          noteTitle.value = notes[i].title;
        }
        noteText.value = notes[i].text;
        console.log(notes[i].id);
        setActiveId(notes[i].id);
        setCurrentDate(notes[i].date);
        console.log(activeId);
      }
    }
  };

  const handleDelete = (e) => {
    const newList = notes.filter(
      (note) =>
        `nav-${note.id}` !==
        e.target.parentNode.parentNode.parentNode.children[0].id
    );
    setNotes(newList);
    console.log(notes);
  };

  const handleMouseEnter = (e) => {
    setIsHovering(true);
  };

  const handleMouseLeave = (e) => {
    setIsHovering(false);
  };

  localStorage.setItem("notes", JSON.stringify(notes));
  return (
    <div className="App">
      <Navigation>
        <ul className="notes-nav">
          {notes.map((note) => {
            return (
              <li
                className="nav-item"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="nav-text"
                  onClick={handleNavClick}
                  id={"nav-" + note.id}
                >
                  {note.title === "" ? note.text : note.title}
                </div>
                <div className="nav-delete">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-note"
                    onClick={handleDelete}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Navigation>
    </div>
  );
}
