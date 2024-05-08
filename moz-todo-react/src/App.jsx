import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

import { useState } from "react";
import { nanoid } from "nanoid";

import propTypes from "prop-types";

// Filter object
const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

// Names of filters
const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = (props) => {
    // Hooks for state defining
    const[tasks, setTasks] = useState(props.tasks);
    const[filter, setFilter] = useState("All")

    // Function for adding task to our Todo list
    const addTask = (name) => {
        const newTask = {id:`todo-${nanoid()}`, name, completed: false};
        setTasks([...tasks, newTask]);
    }

    // Function to change completed property of checkboxes, based on checked/not checked
    const toggleTaskCompleted = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return {...task, completed: !task.completed}
            } return task;
        });
        setTasks(updatedTasks);
    }

    // Function for deleting tasks
    const deleteTask = (id) => {
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }

    //Function for editing tasks
    const editTask = (id, newName) => {
        const editedTaskList = tasks.map((task) => {
            if (id === task.id) {
                return {...task, name: newName}
            }
            return task;
        })
        setTasks(editedTaskList);
    }
    // Creating a list of Todos
    // You should always pass a unique key to anything you render with iteration
    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask ={editTask}
    />
    ));

    const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
         />
    ));

    // Taking care of right number of tasks
    const taskNoun = taskList.length !==1 ? "tasks" : "task";
    const headingText = `${taskList.length} ${taskNoun} remaining`;

    return(
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">{headingText}</h2>
            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                {/* <Todo name="Eat" id="todo-0" completed />
                <Todo name="Sleep" id="todo-1"/>
                <Todo name="Repeat" id="todo-2"/> */}
                {taskList}
            </ul>
        </div>
  );
}
// It is considered good practice to define proptypes
App.propTypes = {
    tasks: propTypes.array.isRequired,
};

export default App;