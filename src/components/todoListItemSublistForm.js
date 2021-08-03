// import React, { useState } from "react";
// import shortid from "../../node_modules/shortid";

function TodoListItemSublistForm() {
//   const [sublistInputValue, setSublistInputValue] = useState("");
//   const updateSublistInputValue = (event) => {
//     setSublistInputValue(event.target.value);
//   };

  return (
    <form>
      <input
        type="text"
        className="todoInput"
        name="sublistInput"
        // onChange={updateSublistInputValue}
        // value={sublistInputValue}
      ></input>
      <button type="submit" className="todoButton">
        ADD SUBLIST
      </button>
    </form>
  );
}
export default TodoListItemSublistForm;
