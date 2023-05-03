import logo from './logo.svg';
import './App.css';
import EventTypeList from './components/EventTypeList';
import EventList from './components/EventList';
import {useState,createContext,useRef} from 'react';

export const LanguajeContext = createContext();

function App() {
  const [eventType,setEventType] = useState(0);
  const [languaje,setLanguaje] = useState('eu');

  const titulo = {
    "eu": "Eventuak Bizkaian",
    "es": "Eventos en Vizcaya"
  };

  const refTo = useRef(null);

  return (
    <LanguajeContext.Provider value={languaje}>
    <div className="App">
      <header ref={refTo}>

        <section>
              <button className={'language ' + (languaje==="es" ? "selected" : "")} onClick={() => setLanguaje('es')}>es</button>
              |
              <button className='but' style={{ display: 'none' }}>0</button>

              
              <button className={'language ' + (languaje==="eu" ? "selected" : "")} onClick={() => setLanguaje('eu')}>eu</button>

              <h1 class="header">{titulo[languaje]}</h1>
        </section>

      </header>
      <main>
        <EventTypeList handleClick={setEventType} selectedType={eventType}/>
        <EventList eventType={eventType} refTo={refTo}/>
      </main>
    </div>
    </LanguajeContext.Provider>
  );
}

export default App;
