import React, { useState } from "react";
import ListItem from "./listItem";
import shortid from "../../node_modules/shortid";

export function Todo({list = []}) {
  const [todoList, setTodoList] = useState([ ...list]);
  const [todoInputValue, setTodoInputValue] = useState("");


  const addTodo = (todoTitle) => {
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
  }
// ----------- для кнопок up/down/delete
  const updateTodo = (id) => {
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
// -------------------------------------
  const addTodoSublist = (id,sublistTitle) => {
    setTodoList((todoList) =>
      todoList.map((elem) => {
        if (elem.id !== id) {
          return elem;
        } else
          return {
            ...elem,
            // sublistMenu: !elem.sublistMenu,
            sublist: [...elem.sublist, {
              id: shortid.generate(),
              content: sublistTitle,
              sublistMenu: false,
              sublist: [],
            }],
          };
      })
    );
  }

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
    <div className="todoContainer">
      <form
        className="todoForm"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(todoInputValue)
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
          <ListItem
            key={shortid.generate()}
            item={item} /**елемент todo который раскладывается в listItem */
            todoListItemBtn={todoListItemBtn} /*кнопки UP / DOWN / DELETE */
            updateTodo={updateTodo} /*флаг в todo для работы кнопок UP / DOWN / DELETE*/
            addTodoSublist={addTodoSublist} /**добавление sublist в todo */
          />
        ))}
      </ul>
    </div>
  );
}
export default Todo;
