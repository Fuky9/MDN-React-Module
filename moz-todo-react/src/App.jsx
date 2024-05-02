import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {
    // You should always pass a unique key to anything you render with iteration
    const taskList = props.tasks?.map((task) => (
    <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    />
    ));

    return(
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form />
            <div className="filters btn-group stack-exception">
                    <FilterButton />
                    <FilterButton />
                    <FilterButton />
            </div>
            <h2 id="list-heading">3 tasks remaining</h2>
            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                {/* <Todo name="Eat" id="todo-0" completed />
                <Todo name="Sleep" id="todo-1"/>
                <Todo name="Repeat" id="todo-2"/> */}
                {taskList}
            </ul>
        </div>
  );
}

export default App;