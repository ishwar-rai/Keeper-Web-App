import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
    return (
        <div className="note">
            <p>{props.title}</p>
            <p>{props.content}</p>
            <button onClick={() => {
                props.onDel(props.id);
            }}><DeleteIcon /></button>
        </div>
    )
}

export default Note;