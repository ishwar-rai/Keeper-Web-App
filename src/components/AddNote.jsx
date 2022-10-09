import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import { style } from "@mui/system";

function AddNote(props) {
  const [Note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isClicked, setClicked] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    props.onAdd(Note);
    setNote({
      title: "",
      content: "",
    });
  }

  const handleClick = () => {
    setClicked(true);
  };
  return (
    <div >
      <form onSubmit={handleSubmit} className="create-note">
        <input
          onChange={handleChange}
          onClick={handleClick}
          name="title"
          placeholder="Title"
          value={Note.title}
        />
        {isClicked && (
          <textarea
            onChange={handleChange}
            name="content"
            placeholder="Take a note..."
            value={Note.content}
            rows="3"
          />
        )}
        {/* <button> */}
          <Zoom in={isClicked}>
            <Fab type="submit">
              <AddIcon />
            </Fab>
          </Zoom>
        {/* </button> */}
      </form>
    </div>
  );
}

export default AddNote;
