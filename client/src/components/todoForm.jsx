import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoForm = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define API endpoints (adjust if different)
  const FETCH_TODOS_URL = "/";
  const ADD_TODO_URL = "/add";
  const UPDATE_TODO_URL = (id) => `/${id}`;
  const DELETE_TODO_URL = (id) => `/${id}`;
  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(DELETE_TODO_URL(todoId));
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error(error);
      alert("Error deleting todo! Please check the console for details.");
    }
  };
  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!newTodoTitle || !newTodoDescription) {
      alert("Please enter both title and description!");
      return;
    }

    try {
      console.log(newTodoDescription);
      const response = await axios.post(ADD_TODO_URL, {
        title: newTodoTitle,
        description: newTodoDescription,
        completed: false,
      });
      setTodos([response.data, ...todos]);
      setNewTodoTitle("");
      setNewTodoDescription("");
    } catch (error) {
      console.error(error);
      alert("Error adding todo! Please check the console for details.");
    }
  };
  const handleToggleCompleted = async (todoId) => {
    try {
      const updatedTodo = await axios.put(UPDATE_TODO_URL(todoId), {
        completed: !todos.find((todo) => todo._id === todoId).completed,
      });
      setTodos(
        todos.map((todo) => (todo._id === todoId ? updatedTodo.data : todo))
      );
    } catch (error) {
      console.error(error);
      alert(
        "Error updating todo status! Please check the console for details."
      );
    }
  };
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/fetch");
        setTodos(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);
  return (
    <div className="todo-app p-6">
      <div className="add-todo p-5 rounded-md bg-gray-100 shadow-md text-center mb-5">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Add Todo</h2>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="Title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-sm mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-sm mt-3"
          >
            Add Todo
          </button>
        </form>
      </div>

      <div className="todo-list mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Todo List</h2>
        {isLoading && <p className="text-gray-600">Loading todos...</p>}
        {error && (
          <p className="text-red-600">Error fetching todos: {error.message}</p>
        )}

        <div className="todo-items-container flex flex-wrap gap-4 justify-center items-center">
          {!isLoading && !error && todos && (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className={`todo-item h-[15rem] w-[20rem] gap-2 p-8 rounded-md shadow-md sticky-note flex flex-col justify-between ${
                    todo.completed ? "bg-green-200" : "bg-yellow-200" // Example colors
                  }`}
                >
                  <h3 className="text-lg font-medium text-gray-800">
                    {todo.title}
                  </h3>
                  <p className="text-gray-600">{todo.description}</p>
                  <p className="mt-2 flex">
                    Status:
                    <span
                      className={`px-3 py-1 rounded-full font-semibold text-sm ${
                        todo.completed
                          ? "bg-green-500 text-white"
                          : "bg-orange-500 text-white"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </span>
                  </p>
                  <button
                    onClick={() => handleToggleCompleted(todo._id)}
                    className="ml-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-sm"
                  >
                    {todo.completed ? "Mark as Pending" : "Mark as Completed"}
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="ml-3 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
