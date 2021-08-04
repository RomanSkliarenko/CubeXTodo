import React, { useState } from "react";
import shortid from "shortid";
import Todo from "./todoForm";

const ListItem = ({ item, todoListItemBtn, updateTodo, addTodoSublist }) => {
  const [sublistInputValue, setSublistInputValue] = useState("");
  const [sublists, setSublists] = useState([...item.sublist]);
  const updateSublistInputValue = (event) => {
    setSublistInputValue(event.target.value);
  };
  const updateSubItem = (id) => {
    setSublists((sublists) =>
      sublists.map((elem) => {
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
  const addItemSublist = (sublistsItem) => {
    setSublists([
      ...sublists,
      {
        id: shortid.generate(),
        content: sublistsItem,
        sublistMenu: false,
        sublist: [],
      },
    ]);
    setSublistInputValue("");
  };
  

  const id = shortid.generate();
  return (
    <li key={id}>
      {item.content ? item.content : null}
      <button
        type="button"
        name="up"
        onClick={() => {
          todoListItemBtn("up", item.id);
        }}
      >
        UP
      </button>
      <button
        type="button"
        name="down"
        onClick={() => {
          todoListItemBtn("down", item.id);
        }}
      >
        DOWN
      </button>
      <button
        type="button"
        name="delete"
        onClick={() => {
          todoListItemBtn("delete", item.id);
        }}
      >
        DELETE
      </button>
      {!item.sublistMenu ? (
        <button
          type="button"
          name="addSublist"
          onClick={() => {
            updateTodo(item.id);
          }}
        >
          ADD SUBLIST
        </button>
      ) : null}
      {item.sublistMenu ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addTodoSublist(item.id, sublistInputValue);
          }}
        >
          <input
            type="text"
            className="todoInput"
            name="sublistInput"
            autoFocus={true}
            onChange={updateSublistInputValue}
            value={sublistInputValue}
          ></input>
          <button type="submit">ADD SUB</button>
          <button
            type="button"
            onClick={() => {
              updateTodo(item.id);
            }}
          >
            X
          </button>
        </form>
      ) : null}
            {!!sublists.length && 
      <Todo list={sublists}/>   
      }
      
    </li>
  );
};
export default ListItem;
