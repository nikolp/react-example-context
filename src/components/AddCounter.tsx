import { useCountersContext, type CounterData } from "../store/counters-context";

export default function AddCounter() {
    // descructure only the piece we need from the context
    const {addCounter} = useCountersContext();

    function addCounterHandler() {
        const rnd = Math.floor(Math.random() * 1000);
        const data : CounterData= {
            name: "a",
            value: rnd
        }
        addCounter(data);
    }

    return (
        <button onClick={addCounterHandler}>Add Random Counter</button>
    );
}