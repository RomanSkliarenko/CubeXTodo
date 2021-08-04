import React, { useState } from "react";
import shortid from "shortid";
import Todo from "./todoForm";

const ListItem = ({ item, todoListItemBtn }) => {
  const [sublists, setSublists] = useState([...item.sublist]);
  const id = shortid.generate();
  return (
    <li key={id} className="item">
      {item.content ? item.content : null}
      <button
        type="button"
        className="button"
        name="up"
        onClick={() => {
          todoListItemBtn("up", item.id);
        }}
      >
        ⇧
      </button>
      <button
        type="button"
        className="button"
        name="down"
        onClick={() => {
          todoListItemBtn("down", item.id);
        }}
      >
        ⇩
      </button>
      <button
        type="button"
        className="button"
        name="delete"
        onClick={() => {
          todoListItemBtn("delete", item.id);
        }}
      >
        ❌
      </button>
      <Todo list={sublists} />
    </li>
  );
};
export default ListItem;
