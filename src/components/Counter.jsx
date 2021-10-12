import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../reducers/counter.reducer";

function Counter() {
  let count = useSelector(state => state.counter.value);
  let dispatch = useDispatch();

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button className="count-btn" onClick={() => dispatch(increment())}>+</button>
      <button className="count-btn" onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default Counter;