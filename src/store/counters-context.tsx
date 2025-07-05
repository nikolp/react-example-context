import { type ReactNode, createContext, useContext, useState } from 'react';

export type CounterData = {
    name: string;
    value: number;
}

// Actual state
type CounterState = {
    counters: CounterData[];
}

// To above state, add methods to minipulate state
type CountersContextValue = CounterState & {
    addCounter: (counterData: CounterData) => void;
}

const CountersContext = createContext<CountersContextValue | null>(null);

// Above CountersContext is initially null
// To placate TypeScript in components that actually use the context
// where it will always not be null, do the null check here
export function useCountersContext() {
    const ctx = useContext(CountersContext)
  
    if (ctx === null) {
      throw new Error('CountersContext is null - that should not be the case!');
    }
  
    return ctx;
  }

// What the provider will "wrap" when used
// Since it will wrap other nodes, which are then allowed to use it,
// it had better take them is a prop so it can output them
type CountersContextProviderProps = {
    children: ReactNode;
  };
  
export default function CountersContextProvider({ children }: CountersContextProviderProps) {
    const [countersState, setCountersState] = useState<CounterState>(
        {counters: []});
    
    // here is the context, fully created
    // link it to the stateful state so they are the same
    const ctx: CountersContextValue = {
      counters: countersState.counters,
      addCounter(counterData: CounterData) {
        // Remember when your state depends on previous state,
        // do not manipulate it directly.
        // Instead pass a function that takes in current state
        // and produces a copy
        setCountersState(prevState => {
            return {
                counters: [...prevState.counters, counterData]
            };
        })
      },
    };
    // Now dump it into "value" for things to work
    // And re-output everything that was "wrapped"
    return (
      <CountersContext.Provider value={ctx}>{children}</CountersContext.Provider>
    );
  }