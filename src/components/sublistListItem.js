import React, { useState } from "react";
import shortid from "../../node_modules/shortid";
import Todo from "./todoForm";

const TodolistItem = ({
  item,
  todoListItemBtn,
  updateTodo,
  addTodoSublist,
  // addTodo
}) => {
  const [sublistInputValue, setSublistInputValue] = useState("");
  const [sublists, setSublists] = useState([{
    id: shortid.generate(),
    content: "1st sublist",
    sublistMenu: false,
    sublist: [],
  }]);
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
  }

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
      {/* {item.sublist ? (
        <ul>
          {item.sublist.map((sublistItem) => {
            return (
              <li key={shortid.generate()}>
                {sublistItem}
                <button onClick={(e) => {
                  // e.target.parentNode.append(----)
                }}>
                  ADD SUBLIST
                </button>
              </li>
            );
          })}
        </ul>
      ) : null} */}
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
              // setSublists([...sublists, {
              //   id: shortid.generate(),
              //   content: "sub item",
              //   sublistMenu: false,
              //   sublist: [],
              // }])
              // console.log(sublists)
            }}
          >
            X
          </button>
        </form>
      ) : null}
      {/* <Todo list={sublists}/> */}
      {item.sublist.map(
        (sub)=>(
          <TodolistItem
            key={shortid.generate()}
            item={sub}
            todoListItemBtn={todoListItemBtn}
            updateTodo={updateTodo}
            addTodoSublist={addTodoSublist}
            // addTodo={addTodo}
          />
        )
      )}
    </li>
  );
};
export default TodolistItem;
