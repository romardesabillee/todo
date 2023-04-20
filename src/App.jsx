import { useState } from "react";

function App() {
	const [todo, setTodo] = useState({
		title: '',
		description: '',
		isEditing: -1,
	});
	const [todos, setTodos] = useState([]);

	function handleTodoChange(e){
		setTodo({...todo, [e.target.name]: e.target.value });
	}

	function handleAddTodo(){
		setTodos([...todos, todo]);
		setTodo({ title: '', description: '', isEditing: -1 });
	}

	function handleEdit(todo, index){
		setTodo({...todo, isEditing: index});
	}

	function handleUpdateTodo(){
		const newTodo = todos.map((t, index) => {
			if(index === todo.isEditing){
				return todo;
			}
			return t;
		})
		setTodos(newTodo);
		setTodo({ title: '', description: '', isEditing: -1 })
	}

	function handleDelete(index){
		const newTodo = todos.filter((t, i) => i !== index);
		setTodos(newTodo);
	}

	return(
		<div>
			<h1>Todos</h1>
			Editing Index: {todo.isEditing}
			<br/>
			Title: &nbsp;
			<input 
				name="title"
				onChange={handleTodoChange}
				value={todo.title}
				type="text" />
			<br/>
			Description: &nbsp;
			<input 
				name="description"
				onChange={handleTodoChange}
				value={todo.description}
				type="text" />
			<br/>
			Title: {todo.title} <br/>
			Description: {todo.description} <br/>
			<br/>
			{todo.isEditing < 0 && <button onClick={handleAddTodo}>Add</button>}
			{todo.isEditing >= 0 && <button onClick={handleUpdateTodo}>Update</button>}
			{todo.isEditing >= 0 && 
				<button onClick={() => setTodo({title: '', description: '', isEditing: -1})}>Cancel</button>
			}
			<div>
				<h2>Todo list:</h2>
				{todos.map((t, index) => {
					return(
						<div key={index}>
							<div>Index: {index}</div>
							<div>Title: {t.title}</div>
							<div>Description: {t.description}</div>
							{todo.isEditing < 0 && <button onClick={() => handleEdit(t, index)}>Edit</button>}
							{todo.isEditing < 0 && <button onClick={() => handleDelete(index)}>Delete</button>}
							<br/><br/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default App
