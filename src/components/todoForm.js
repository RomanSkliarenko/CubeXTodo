import React, { useState } from "react";
import TodolistItem from "./todoListItem";
import shortid from "../../node_modules/shortid";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [todoInputValue, setTodoInputValue] = useState("");

  const formSubmit = (id, sublistItem) => {
    setTodoList((todoList) =>
      todoList.map((elem) => {
        if (elem.id !== id) {
          return elem;
        } else
          return {
            ...elem,
            sublistMenu: !elem.sublistMenu,
            sublist: [...elem.sublist, sublistItem],
          };
      })
    );
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

  const updateTodoListItem = (id) => {
    setTodoList((todoList) =>
      todoList.map((elem) => {
        if (elem.id !== id) {
          return elem;
        } else
          return {
            ...elem,
            sublistMenu: !elem.sublistMenu,
          };
      })
    );
  };

  // const createItem = (event, item) => {
  //   console.log(item);
  //   return (
  //     <TodolistItem
  //       key={shortid.generate()}
  //       item={item}
  //       todoListItemBtn={todoListItemBtn}
  //       updateTodoListItem={updateTodoListItem}
  //       formSubmit={formSubmit}
  //     />
  //   );
  // };

  return (
    <div className="todoContainer">
      <form
        className="todoForm"
        onSubmit={(event) => {
          event.preventDefault();
          setTodoList([
            ...todoList,
            {
              id: shortid.generate(),
              content: todoInputValue,
              sublistMenu: false,
              sublist: [],
            },
          ]);
          setTodoInputValue("");
        }}
      >
        <input
          type="text"
          className="todoInput"
          name="addTodoInputValue"
          onChange={updateTodoInputValue}
          value={todoInputValue}
        ></input>
        <button type="submit" className="todoButton">
          ADD task
        </button>
      </form>
      <ul className="todoList">
        {todoList.map((item) => (
          <TodolistItem
            key={shortid.generate()}
            item={item}
            todoListItemBtn={todoListItemBtn}
            updateTodoListItem={updateTodoListItem}
            formSubmit={formSubmit}
            // createItem={createItem}
            todoListItem={TodolistItem}
          />
        ))}
      </ul>
    </div>
  );
}
export default Todo;
