import './App.css'
import CountersContextProvider from './store/counters-context'
import CounterList from './components/CounterList'
import AddCounter from './components/AddCounter';

function App() {
  return (
    <>
      <h1>Simple project</h1>
      <CountersContextProvider>
        <AddCounter/>
        <div className="card">
          <CounterList/>
        </div>
      </CountersContextProvider>
    </>
  );
}

export default App
