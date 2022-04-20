import "./main.css";
import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import Card from "./components/Card";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newInput, setNewInput] = useState("");
  const [currentActiveCard, setCurrentActiveCard] = useState("");

  useEffect(() => {
    if (localStorage.getItem("dnd-data")) {
      setTasks(JSON.parse(localStorage.getItem("dnd-data")));
    } else {
      let data = [
        {
          id: "1",
          title: "1",
          status: "Not Started",
        },
        {
          id: "2",
          title: "2",
          status: "Not Started",
        },
        {
          id: "3",
          title: "3",
          status: "In Progress",
        },
        {
          id: "4",
          title: "4",
          status: "In Progress",
        },
        {
          id: "5",
          title: "5",
          status: "Completed",
        },
        {
          id: "6",
          title: "6",
          status: "Completed",
        },
      ];
      localStorage.setItem("dnd-data", JSON.stringify(data));
      setTasks(data);
    }
  }, []);

  const handleNewInputChange = (e) => {
    setNewInput(e.target.value);
  };

  const filterTaks = (status) => {
    let filteredData = tasks.filter((task) => task.status === status);
    return filteredData;
  };

  const handleActiveCard = (boardStatus) => {
    setNewInput("");
    setCurrentActiveCard(boardStatus);
  };

  const addTask = (status) => {
    let data = {
      id: uuidv4(),
      title: newInput,
      status: status,
    };

    localStorage.setItem("dnd-data", JSON.stringify([...tasks, data]));
    setTasks([...tasks, data]);

    setNewInput("");
    handleActiveCard("");
  };

  const addNewCard = (status) => {
    return (
      <>
        {currentActiveCard === status ? (
          <div className="new-card">
            <input
              className="input"
              value={newInput}
              onChange={handleNewInputChange}
              placeholder="Enter Task Title"
              type="text"
              name="title"
            />
            <button className="btn" onClick={() => addTask(status)}>
              Save
            </button>
          </div>
        ) : null}
      </>
    );
  };

  const boardHeader = (status) => {
    return (
      <div className="header">
        <div className="header-1">
          <span
            style={{
              backgroundColor:
                status == "Not Started"
                  ? "lightpink"
                  : status == "In Progress"
                  ? "lemonchiffon"
                  : "lightgreen",
            }}
          >
            {status}
          </span>
          <span>{tasks.filter((task) => task.status === status).length}</span>
        </div>
        <div className="header-2">
          <span onClick={() => handleActiveCard(status)}> + </span>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h3 className="heading"># Internship Assignment - Frontend</h3>
      <main className="flexbox">
        <Board id="board-1" className="board" tasks={tasks}>
          {boardHeader("Not Started")}
          {filterTaks("Not Started").map((task) => (
            <Card id={`card-${task.id}`} className="card" draggable="true">
              <p>{task.title}</p>
            </Card>
          ))}
          {addNewCard("Not Started")}
        </Board>

        <Board id="board-2" className="board" tasks={tasks}>
          {boardHeader("In Progress")}
          {filterTaks("In Progress").map((task) => (
            <Card id={`card-${task.id}`} className="card" draggable="true">
              <p>{task.title}</p>
            </Card>
          ))}
          {addNewCard("In Progress")}
        </Board>

        <Board id="board-3" className="board" tasks={tasks}>
          {boardHeader("Completed")}
          {filterTaks("Completed").map((task) => (
            <Card id={`card-${task.id}`} className="card" draggable="true">
              <p>{task.title}</p>
            </Card>
          ))}
          {addNewCard("Completed")}
        </Board>
      </main>
    </div>
  );
}

export default App;
