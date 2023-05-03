import {useState,useEffect,useContext} from 'react';
import  './css/style.css';
import { LanguajeContext } from "../App";

const EventTypeList =({handleClick,selectedType}) => {
    const [eventTypes, setEventTypes] = useState([]);
    const language = useContext(LanguajeContext);

    useEffect( () => {
        fetch('https://api.euskadi.eus/culture/events/v1.0/eventType')
        .then(response => response.json())
        .then(data => {
            setEventTypes(data);
        }); 
    },[]);

    const allName = {
        "es": "Todos",
        "eu": "Guztiak"
    };
    
    return (
        <div>
            <h2 class="eventos">Tipos de eventos</h2>
            <ul class="nombre">
            <li className={selectedType === 0 ? "selected card" : "card"} onClick={()=>handleClick(0)}>Todos</li>
                {eventTypes.map(eventType => {
                    const name = {
                        "es": eventType.nameEs,
                        "eu": eventType.nameEu
                    };

                   return <li className={selectedType === eventType.id ? "selected card" : "card"} key={eventType.id} onClick={()=>handleClick(eventType.id)}> {name[language]}</li>
            })}
            </ul>
        </div>
    );
}

export default EventTypeList;

    