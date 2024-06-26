import { useState } from "react";

const Form = (props) => {
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Using Callback props(callback function) to send data from child to parent
        props.addTask(name);
        setName("");
        }

    const handleChange = (event) => {
        setName(event.target.value);
    }
    return(
            <form onSubmit={handleSubmit}>
                <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                        What needs to be done?
                    </label>
                </h2>
                <input type="text" id="new-todo-input" className="input input__lg"
                name="text" autoComplete="off" value={name} onChange={handleChange} />
                <button type="submit" className="btn btn__primary btn__lg">
                    Add
                </button>
            </form>
    )
}

export default Form;