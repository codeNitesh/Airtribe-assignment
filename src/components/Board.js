import React, {useEffect} from "react";

function Board(props) {

  useEffect(() => {
   
  }, [props.tasks])
  
  const drop = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);

    const main_id = card_id.substring(5);
    const board_id = parseInt(props.id.substring(6));
    const objIndex = props.tasks.findIndex((obj) => obj.id === main_id);

    if (board_id === 1) {
      props.tasks[objIndex].status = "Not Started";
    } else if (board_id === 2) {
      props.tasks[objIndex].status = "In Progress";
    } else if (board_id === 3) {
      props.tasks[objIndex].status = "Completed";
    }

    card.style.display = "block";

    // e.target.appendChild(card);
    props.setTasks([...props.tasks])

    localStorage.setItem("dnd-data", JSON.stringify(props.tasks));
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      id={props.id}
      className={props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}

export default Board;
