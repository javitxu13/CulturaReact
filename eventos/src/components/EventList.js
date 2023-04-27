import { useState,useEffect } from "react";
import './css/style.css';
import EventModal  from "./EventModal";


const EventList = ({eventType}) => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect (() => {
        setPage(1);
    },[eventType]);
    
    useEffect( () => {
        const type = eventType !== 0 ? `&type=${eventType}` : '';
        fetch(`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48${type}`)
        .then(response => response.json())
        .then(data => {
            setEvents(data.items);
            setTotalPages(data.totalPages);
        }); 
    },[page,eventType]);

    const nextPage = () => {
        if(page < totalPages) {
            setPage(page + 1);
        }
    }

    const prevPage = () => {
        if(page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <section className="event-list">
            <h2 class="EventosAbajo">Eventos</h2>
            <h3 class= "totalPagina" >Página {page} de {totalPages}</h3>
                {page > 1 && <button class="botonPrev" onClick={prevPage}>Anterior</button>}
                {page < totalPages && <button class="botonNext" onClick={nextPage}>Siguiente</button>}
            <ul class="u">
                {events.map(event => (
                    <li key={event.id} className="card" onClick={() => setSelectedEvent(event.id)}>
                        {event.images.length > 0 ? <img src={event.images[0].imageUrl} alt={event.images[0].imageFileName} /> : null}
                        <h3 class="name">{event.nameEs}</h3>
                        <p class="date">{event.startDate}</p>
                        <p>{event.priceEs}</p>
                        <p class="hour">{event.openingHoursEs}</p>
                        <EventModal event={event} className={selectedEvent === event.id ? "show" : " "}close={()=>setSelectedEvent(0)}/>
                    </li>
                ))}
            </ul>
        </section>
                    
    );
}

export default EventList;
