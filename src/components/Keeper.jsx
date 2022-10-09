import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import AddNote from "./AddNote";
import axios from "axios";

function Keeper() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  function addNote(note) {
    setNotes((preValue) => {
      return [...preValue, note];
    });
  }

  function deleteNote(id) {
    setNotes((preValue) => {
      return preValue.filter((note, index) => {
        return index !== id;
      });
    });
  }

  useEffect(() => {
    const getUser = () => {
    const configuration = {
      method: "get",
      url: "http://localhost:5000/keeper",
      withCredentials: true
    }

    axios(configuration)
    .then((result) => {
      console.log(result);
      
    })
    .catch((error) => {
      console.log(error);
    })
  }
  getUser();
  },[])
  return (
    <>
      <Header show={true} />
      <AddNote onAdd={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDel={deleteNote}
          />
        );
      })}
    </>
  );
}

export default Keeper;
