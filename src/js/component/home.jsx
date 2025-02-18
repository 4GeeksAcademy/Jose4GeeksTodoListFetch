// Home.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faTrashRestore } from "@fortawesome/free-solid-svg-icons";


const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  
  const API_BASE_URL = "https://curly-system-5gq94v5pj9vv2ppgp-3000.app.github.dev";

  useEffect(() => {
   
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const data = await response.json();
      setTodos(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    try {
      await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: inputValue }),
      });
      
      fetchTasks();
      setInputValue("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const cleanAllTasks = async () => {
    try {
      // Send a DELETE request to delete all tasks on the server
      await fetch(`${API_BASE_URL}/tasks`, {
        method: "DELETE",
      });
      
      // Update the frontend by resetting the todos state to an empty array
      setTodos([]);
    } catch (error) {
      console.error("Error cleaning all tasks:", error);
    }
  };
  
  return (
    <div className="container">
      <h1>todos</h1>
      <div className="shadow">
        <ul>
          <li className="textBox">
            <input
              type="text"
              placeholder="What do you need to do?"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setTodos(todos.concat(inputValue));
                  setInputValue("");
                }
              }}
            />
          </li>
          {todos.map((item, index) => (
            <li key={index}>
              {item}
              <FontAwesomeIcon
                icon={faX}
                onClick={() =>
                  setTodos(
                    todos.filter((t, currentIndex) => index !== currentIndex)
                  )
                }
                style={{ color: "#ff0000" }}
                className="faIcon delete"
              />
            </li>
          ))}
        </ul>
        <div className="task">{todos.length} tasks left</div>
      </div>
      
      <div className="page"></div>
        <div className="page2"></div>
        <button onClick={cleanAllTasks} className="CleanAll btn btn-secondary">Clean All Tasks<FontAwesomeIcon icon={faTrashRestore} className="faIcon recycle" /></button>
    </div>
  );
};

export default Home;
