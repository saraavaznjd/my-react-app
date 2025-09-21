import {useSelector, useDispatch} from 'react-redux'
import { increment, decrement, addBy } from "./counter/counterSlice";


export const Counter = () => {
    const value = useSelector( state => state.counter.value)
    const dispatch = useDispatch()

    return (
    <div>
      <h2>Counter: {value}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(addBy(5))}>+5</button>
    </div>
  );
}