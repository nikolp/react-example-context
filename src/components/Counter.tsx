import type { CounterData } from "../store/counters-context";

export default function Counter({name, value} : CounterData) {
    return (
        <div>
            <h1>{name}</h1>
            <h2>{value}</h2>
        </div>
    );
}