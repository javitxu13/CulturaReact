import {useState,useEffect} from 'react';
import  './css/style.css';


const EventTypeList =({handleClick,selectedType}) => {
    const [eventTypes, setEventTypes] = useState([]);

    useEffect( () => {
        fetch('https://api.euskadi.eus/culture/events/v1.0/eventType')
        .then(response => response.json())
        .then(data => {
            setEventTypes(data);
        }); 
    },[]);
    
    return (
        <div>
            <h2 class="eventos">Tipos de eventos</h2>
            <ul class="nombre">
            <li className={selectedType === 0 ? "selected card" : "card"} onClick={()=>handleClick(0)}>Todos</li>
                {eventTypes.map(eventType => (
                    <li className={selectedType === eventType.id ? "selected card" : "card"} key={eventType.id} onClick={()=>handleClick(eventType.id)}> {eventType.nameEs}</li>
                    
                ))}
            </ul>
        </div>
    );
}

export default EventTypeList;

    