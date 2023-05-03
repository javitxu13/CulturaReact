import "./css/EventModal.css";
import {useState,useEffect,useContext} from "react";
import { LanguajeContext } from "../App";

const EventModal = ({ event,className,close }) => {
    const [currentClassname,setCurrentClassname] = useState(null);
    const language = useContext(LanguajeContext);

    useEffect(() => {
        setCurrentClassname(className,);
    },[className]);

    const closeModal = (event) => {
        event.stopPropagation();
        setCurrentClassname(null);
        close()
    }

    const name = {
        "eu": event.nameEu,
        "es": event.nameEs
    };

    const description = {
        "eu": event.descriptionEu,
        "es": event.descriptionEs
    };

    const closeMessage = {
        "eu": "Itxi",
        "es": "Cerrar"
    }

    const openingHours = {
        "eu": event.openingHoursEu,
        "es": event.openingHoursEs
    }




    return (
    <div>
       {<section className={"modal-background " + currentClassname} onClick={closeModal}></section>}
        <article className={"modal " + currentClassname}>
            
        <h1>{name[language]}</h1>
            <p>{event.startDate}</p>
            <p>{event.priceEs}</p>
            <p>{openingHours[language]}</p>
            {event.images.length > 0 ? <img src={event.images[0].imageUrl} alt={event.images[0].imageFileName} /> : null}
            <div class="parrafo" dangerouslySetInnerHTML={{__html:description[language]}}></div>
            <button onClick={closeModal}>{closeMessage[language]}</button>

        </article>
    </div>
    )
}

export default EventModal; 

