import React, { useState } from "react";

import Navigation from "./Navigation";
import Notepad from "./Notepad";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const date = new Date();
const n = date.toDateString();

function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [notesCount, setNotesCount] = useState(0);
  const [activeId, setActiveId] = useState();
  const [currentDate, setCurrentDate] = useState(n);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddNote = (e) => {
    const mainContent = document.querySelector(".main-content");
    const navigation = document.querySelector(".navigation");
    const noteTitle = document.querySelector(".note-title");
    const noteText = document.querySelector(".type-note");
    e.preventDefault();

    if (e.target.textContent === "Edit Note") {
      for (const note of notes) {
        if (note.id === activeId) {
          note.title = noteTitle.value;
          note.text = noteText.value;
          note.date = n;
          e.target.textContent = "Add Note";
          noteTitle.value = "";
          noteText.value = "";
        }
      }
      setNotes([...notes]);
      navigation.style.display = "block";
      mainContent.style.display = "none";
    } else if (e.target.textContent === "Save Note") {
      mainContent.style.display = "none";
      navigation.style.display = "block";
      if (noteTitle.value === "") {
        if (noteText.value !== "") {
          const newNote = {
            title: "",
            text: noteText.value,
            id: "note-" + Number(notesCount),
            date: n,
          };
          setNotes([...notes, newNote]);
        }
      } else {
        if (noteText.value !== "") {
          const newNote = {
            title: noteTitle.value,
            text: noteText.value,
            id: "note-" + Number(notesCount),
            date: n,
          };
          setNotes([...notes, newNote]);
        }
      }
      e.target.textContent = "Add Note";
      setNotesCount(notesCount + 1);
    } else if (e.target.textContent === "Add Note") {
      mainContent.style.display = "block";
      navigation.style.display = "none";
      e.target.textContent = "Save Note";
    }
    setCurrentDate(n);
    noteText.value = "";
    noteTitle.value = "";
    console.log(notes);
  };

  const handleDelete = (e) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const newList = notes.filter(
        (note) =>
          `nav-${note.id}` !==
          e.target.parentNode.parentNode.parentNode.children[0].id
      );
      setNotes(newList);
      console.log(notes);
    }
  };

  const handleNavClick = (e) => {
    const mainContent = document.querySelector(".main-content");
    const navigation = document.querySelector(".navigation");
    const submitBtn = document.querySelector(".add-note-btn");
    const noteTitle = document.querySelector(".note-title");
    const noteText = document.querySelector(".type-note");

    mainContent.style.display = "block";
    navigation.style.display = "none";

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
      <main>
        <h1 className="app-title">Notes App</h1>
        <p className="author">
          by{" "}
          <a href="https://risclover.github.io/" target="_blank">
            Risclover
          </a>
        </p>
        <Navigation>
          <input
            type="text"
            placeholder="Search..."
            className="searchbar"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />

          <ul className="notes-nav">
            {notes
              .filter((note) => {
                if (searchTerm === "") {
                  return note;
                } else if (
                  note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  note.text.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  if (note.title === "") {
                    return note.text;
                  } else {
                    return note.title;
                  }
                }
              })
              .map((note) => {
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
          <Notepad>
            <form className="add-note">
              <div className="note-date">{currentDate}</div>
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
            </form>
          </Notepad>
        </div>
        <button className="add-note-btn" onClick={handleAddNote}>
          Add Note
        </button>
      </main>
    </div>
  );
}

export default App;
