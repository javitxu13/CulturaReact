import "./css/EventModal.css";
import {useState,useEffect} from "react";

const EventModal = ({ event,className,close }) => {
    const [currentClassname,setCurrentClassname] = useState(null);

    useEffect(() => {
        setCurrentClassname(className,);
    },[className]);

    const closeModal = () => {
        setCurrentClassname(null);
        close()
    }

    

    return (

        <article className={"modal " + currentClassname}>
            <h1>{event.nameEs}</h1>
            <p>{event.startDate}</p>
            <p>{event.priceEs}</p>
            <p>{event.openingHoursEs}</p>
            {event.images.length > 0 ? <img src={event.images[0].imageUrl} alt={event.images[0].imageFileName} /> : null}
            <div dangerouslySetInnerHTML={{__html:event.descriptionEs}}></div>
            <button class="cerrar" onClick={closeModal}>Cerrar</button>

        </article>
    )
}

export default EventModal; 

