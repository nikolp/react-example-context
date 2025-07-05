import { useCountersContext } from "../store/counters-context";
import Counter from "./Counter";

export default function CounterList() {
    // descructure only the piece we need from the context
    const {counters} = useCountersContext();
    return (
        <ul>
            {counters.map(counter => {
                return <li key={counter.name}>
                    <Counter name={counter.name} value={counter.value} />
                </li>;
            })}
        </ul>

    );
}