import React, { useState } from "react";

import Navigation from "./Navigation";
import Notepad from "./Notepad";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const date = new Date();
const n = date.toDateString();
const time = date.toLocaleTimeString();

function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [notesCount, setNotesCount] = useState(0);
  const [activeId, setActiveId] = useState();
  const [currentDate, setCurrentDate] = useState(n + " " + time);

  const handleAddNote = (e) => {
    const noteTitle = document.querySelector(".note-title");
    const noteText = document.querySelector(".type-note");
    e.preventDefault();

    if (e.target.textContent === "Edit Note") {
      setCurrentDate(n + " " + time);
      for (const note of notes) {
        if (note.id === activeId) {
          note.title = noteTitle.value;
          note.text = noteText.value;
          e.target.textContent = "Add Note";
          noteTitle.value = "";
          noteText.value = "";
        }
      }
      setNotes([...notes]);
    } else if (e.target.textContent === "Add Note") {
      const noteInput = document.querySelector(".type-note");
      const noteTitle = document.querySelector(".note-title");
      if (noteTitle.value === "") {
        if (noteInput.value !== "") {
          const newNote = {
            title: "",
            text: noteInput.value,
            id: "note-" + Number(notesCount),
            date: n + " " + time,
          };
          setNotesCount(notesCount + 1);
          setNotes([...notes, newNote]);
          noteInput.value = "";
          noteTitle.value = "";
          console.log(notes);
        }
      } else {
        if (noteInput.value !== "") {
          const newNote = {
            title: noteTitle.value,
            text: noteInput.value,
            id: "note-" + Number(notesCount),
            date: n + " " + time,
          };
          setNotesCount(notesCount + 1);
          setNotes([...notes, newNote]);
          noteInput.value = "";
          noteTitle.value = "";
          console.log(notes);
        }
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

  localStorage.setItem("notes", JSON.stringify(notes));

  return (
    <div className="App">
      <h1 className="app-title">Notes App</h1>
      <main>
        <Navigation>
          <ul className="notes-nav">
            {notes.map((note) => {
              return (
                <li className="nav-item">
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
        <div className="main-content">
          <h2 className="add-notes-title">Add Note</h2>
          <Notepad>
            <form className="add-note">
              <div className="note-date">{currentDate}</div>
              <label for="add-title" className="title-label">
                Title:
              </label>
              <input
                type="text"
                placeholder="Title"
                className="note-title"
                id="note-title"
              />
              <textarea
                placeholder="Type a note here."
                className="type-note"
              ></textarea>
              <button type="submit" className="submit" onClick={handleAddNote}>
                Add Note
              </button>
            </form>
          </Notepad>
        </div>
      </main>
    </div>
  );
}

export default App;
