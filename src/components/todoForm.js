import React, { useState } from "react";
import ListItem from "./listItem";
import shortid from "../../node_modules/shortid";

export function Todo({ list = [] }) {
  const [todoList, setTodoList] = useState([...list]);
  const [todoInputValue, setTodoInputValue] = useState("");

  const addTodo = (todoTitle) => {
    const updateTitle = todoTitle.split(" ")
    console.log(updateTitle)
    if (todoTitle !== "") {
      setTodoList([
        ...todoList,
        {
          id: shortid.generate(),
          content: todoTitle,
          sublistMenu: false,
          sublist: [],
        },
      ]);
      setTodoInputValue("");
    } else {
      alert("Write something in field! :)")
    }
  };
  const todoListItemBtn = (name, id) => {
    let todoIndex = todoList.findIndex((el) => {
      if (el.id === id) {
        return el;
      } else {
        return null;
      }
    });
    const currentTodo = todoList.find((el) => el.id === id);
    if (name === "up") {
      let newTodoList = todoList.filter((elem) => elem.id !== id);
      newTodoList.splice(todoIndex - 1, 0, currentTodo);
      setTodoList(newTodoList);
    } else if (name === "down") {
      let newTodoList = todoList.filter((elem) => elem.id !== id);
      newTodoList.splice(todoIndex + 1, 0, currentTodo);
      setTodoList(newTodoList);
    } else if (name === "delete") {
      let newTodoList = todoList.filter((elem) => elem.id !== id);
      setTodoList(newTodoList);
    }
  };
  const updateTodoInputValue = (event) => {
    setTodoInputValue(event.target.value);
  };

  return (
    <>
    <div className="wrapper">
        <input
        placeholder="type what you want todo"
          type="text"
          className="todoInput"
          name="addTodoInputValue"
          onChange={updateTodoInputValue}
          value={todoInputValue}
        ></input>
        <button
          type="button"
          className="button"
          onClick={() => {
            addTodo(todoInputValue);
          }}
        >
          ➕
        </button>
        </div>
      <ul className="todoList">
        {todoList.map((item) => (
          <ListItem
            key={shortid.generate()}
            item={item}
            todoListItemBtn={todoListItemBtn}
          />
        ))}
      </ul>
      </>
  );
}
export default Todo;
