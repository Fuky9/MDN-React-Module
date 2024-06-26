import { useState } from "react";

const Todo = (props) => {
    //Hooks for defining states
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");

    // Functions for event handling in edit mode

    // Function for handling new input value
    const handleChange = (e) => setNewName(e.target.value);

    // Function for handling edit form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);

    }
    // Template for editing task
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input id={props.id} type="text" className="todo-text" onChange={handleChange}/>
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
                    Cancel <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn_primary todo-edit">
                    Save <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    // Template for viewing tasks
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}/>
                <label className="todo-label" htmlFor={props.id}>{props.name}</label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn" onClick={() => setEditing(true)}>Edit<span className="visually-hidden">{props.name}</span>
                </button>
                <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    )

    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
}

export default Todo;