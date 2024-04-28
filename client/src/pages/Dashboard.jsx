import React, { useState, useEffect } from "react";
import TodoForm from "../components/todoForm";
const TodoList = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };
  return (
    <div className="todo-list">
      <button onClick={handleLogout}>Logout</button>
      <TodoForm />
    </div>
  );
};

export default TodoList;
