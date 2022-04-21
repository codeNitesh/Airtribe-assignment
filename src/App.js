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
          title: "Task 1",
          status: "Not Started",
        },
        {
          id: "2",
          title: "Task 2",
          status: "Not Started",
        },
        {
          id: "3",
          title: "Task 3",
          status: "In Progress",
        },
        {
          id: "4",
          title: "Task 4",
          status: "In Progress",
        },
        {
          id: "5",
          title: "Task 5",
          status: "Completed",
        },
        {
          id: "6",
          title: "Task 6",
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
    if(newInput == "") return
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
          <form className="new-card" onSubmit={() => addTask(status)}>
            <input
              className="input"
              value={newInput}
              onChange={handleNewInputChange}
              placeholder="Enter Task Title"
              type="text"
              name="title"
            />
            <span className="small">Press enter to add!</span>
            {/* <button className="btn" type="submit">
              Save
            </button> */}
          </form>
        ) : <p onClick={()=> handleActiveCard(status)} className="add-new">+ New</p>}
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

  const deleteCard = (id)=>{
    const main_id = id.substring(5);
    let newData = tasks.filter((task)=> task.id !== main_id)
    localStorage.setItem('dnd-data', JSON.stringify(newData))
    setTasks([...newData])
  }

  return (
    <div className="App">
      <h3 className="heading"># Internship Assignment - Frontend</h3>
      <main className="flexbox">
        <Board id="board-1" className="board" tasks={tasks} setTasks={setTasks}>
          {boardHeader("Not Started")}
          {filterTaks("Not Started").map((task) => (
            <Card id={`card-${task.id}`} className="card" draggable="true" deleteCard={deleteCard}>
              <p>{task.title}</p>
            </Card>
          ))}
          {addNewCard("Not Started")}
        </Board>

        <Board id="board-2" className="board" tasks={tasks} setTasks={setTasks}>
          {boardHeader("In Progress")}
          {filterTaks("In Progress").map((task) => (
            <Card id={`card-${task.id}`} className="card" draggable="true" deleteCard={deleteCard}>
              <p>{task.title}</p>
            </Card>
          ))}
          {addNewCard("In Progress")}
        </Board>

        <Board id="board-3" className="board" tasks={tasks} setTasks={setTasks}>
          {boardHeader("Completed")}
          {filterTaks("Completed").map((task) => (
            <Card id={`card-${task.id}`} className="card" draggable="true" deleteCard={deleteCard}>
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
