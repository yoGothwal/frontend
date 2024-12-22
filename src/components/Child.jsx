import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { UserContext } from "../App.jsx";

const Child = forwardRef((props, ref) => {
  const { user } = useContext(UserContext);
  console.log(JSON.stringify(user));

  useImperativeHandle(ref, () => ({
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
    getCount: () => count,
  }));
  const [count, setCount] = useState(0);
  return (
    <div>
      count is :{count} and user is {user ? user.name : "No one"}
    </div>
  );
});

export default Child;
