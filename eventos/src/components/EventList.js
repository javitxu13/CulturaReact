import { useState,useEffect,useRef,useContext } from "react";
import './css/style.css';
import EventModal  from "./EventModal";
import { LanguajeContext } from "../App";


const EventList = ({eventType,refTo}) => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchWord, setSearchWord] = useState('');
    const titleRef = useRef(null);
    const language = useContext(LanguajeContext);

    useEffect (() => {
        setEvents([]);
        setPage(1);
    },[eventType]);

    useEffect( () => {
        const search = searchWord.length < 3 ? '' : `&description=${searchWord}`;
        const type = eventType !== 0 ? `&type=${eventType}` : '';
        fetch(`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48${type}${search}`)
        .then(response => response.json())
        .then(data => {
            setEvents([...events,...data.items]); // ...events, para que no se borren los eventos anteriores al hacer scroll infinito
            setTotalPages(data.totalPages);
        }); 
    },[page]);

    useEffect( () => {
        getData()
        .then(data => {
            setEvents(data.items); // ...events, para que no se borren los eventos anteriores al hacer scroll infinito
            setTotalPages(data.totalPages);
        }); 
    },[eventType]);

    useEffect( () => {

        if (searchWord.length < 3 && searchWord !== '')  {
            return;
        }
       getData ()        
       .then(data => {
            setEvents(data.items); // ...events, para que no se borren los eventos anteriores al hacer scroll infinito
            setTotalPages(data.totalPages);
        }); 
    },[searchWord]);


    const getData = () => {
        const type = eventType !== 0 ? `&type=${eventType}` : '';
        const search = searchWord.length < 3 && searchWord.length > 0 ? " ": `&description=${searchWord}`;
        return new Promise((resolve,reject) => {
            fetch(`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48${type}${search}`)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
                

    const nextPage = () => {
        if(page < totalPages) {
            setPage(page + 1);
        }
    }


    const scrollToTop = () => {
        refTo.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <section className="event-list">
            <h2 ref={titleRef} class="EventosAbajo">Eventos</h2>
            
            <h3 class="EventosArriba">Buscar Eventos</h3>
            <input type="text" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} placeholder="Buscar evento" />

            <ul class="u">
                {events.map(event => {

                    const translation = {
                        name: {
                            "es": event.nameEs,
                            "eu": event.nameEu
                        },
                        description: {
                            "es": event.descriptionEs,
                            "eu": event.descriptionEu
                        },
                        price: {
                            "es": event.priceEs,
                            "eu": event.priceEu
                        },
                        openingHours: {
                            "es": event.openingHoursEs,
                            "eu": event.openingHoursEu
                        }
                    }

                    return <li key={event.id} className="card" onClick={() => setSelectedEvent(event.id)}>
                        {event.images.length > 0 ? <img src={event.images[0].imageUrl} alt={event.images[0].imageFileName} /> : null}
                        <h3>{translation.name[language]}</h3>
                        <h4>{translation.price[language]}</h4>
                        <h5>{translation.openingHours[language]}</h5>
                        <EventModal event={event} className={selectedEvent === event.id ? "show" : " "}close={()=>setSelectedEvent(0)}/>
                    </li>
                })}

            </ul>
            {page < totalPages && <button onClick={nextPage}>Mostrar mas</button>}
            <button onClick={scrollToTop}>^</button>
            <h3 class= "totalPagina" >Página {page} de {totalPages}</h3>
        </section>

    );
}

export default EventList;
