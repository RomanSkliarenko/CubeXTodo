import React, { useState } from "react";
import shortid from "../../node_modules/shortid";

const TodolistItem = ({
  item,
  todoListItemBtn,
  updateTodoListItem,
  formSubmit,
  // createItem,
}) => {
  const [sublistInputValue, setSublistInputValue] = useState("");
  const updateSublistInputValue = (event) => {
    setSublistInputValue(event.target.value);
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
            updateTodoListItem(item.id);
          }}
        >
          ADD SUBLIST
        </button>
      ) : null}
      {item.sublist ? <ul>
        {item.sublist.map((sublistItem)=>{
          return (
            <li key={shortid.generate()}>{sublistItem}</li>
          )
        })}
      </ul>:null}
      {item.sublistMenu ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            formSubmit(item.id, sublistInputValue);
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
          <button type="submit" >ADD SUB</button>
          <button
            type="button"
            onClick={() => {
              updateTodoListItem(item.id);
            }}
          >
            X
          </button>
         </form>
      ) : null}
    </li>
  );
};
export default TodolistItem;
