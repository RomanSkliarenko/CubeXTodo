import React from "react";
import todoListItemSublistForm from "./todoListItemSublistForm";

import shortid from "../../node_modules/shortid";

const TodolistItem = (
  item,
  swapBtn,
  updateTodoListItem,
  sublistInputValue,
  updateSublistInputValue
) => {
  const id = shortid.generate();
  return (
    <li key={id}>
      {item.content ? item.content : null}
      <button
        type="button"
        name="up"
        onClick={() => {
          swapBtn("up", item.id);
        }}
      >
        UP
      </button>
      <button
        type="button"
        name="down"
        onClick={() => {
          swapBtn("down", item.id);
        }}
      >
        DOWN
      </button>
      <button
        type="button"
        name="delete"
        onClick={() => {
          swapBtn("delete", item.id);
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

      {item.sublistMenu ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            className="todoInput"
            name="sublistInput"
            onChange={updateSublistInputValue}
            value={sublistInputValue}
          ></input>
          <button type="submit">ADD SUB</button>
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
}
export default TodolistItem;
