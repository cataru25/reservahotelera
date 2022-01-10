import "./hotel.scss";

function Hotel({
  name,
  photo,
  country,
  city,
  availabilityFrom,
  availabilityTo,
  description,
  rooms,
  price
}) {
  return (
    <section className="Hotel">
      <div className="Hotel__container item">
        {photo && name && <img src={photo} alt={name} height="222px" />}
        {name && <p className="item--name">{name}</p>}
        {availabilityFrom && (
          <p className="item--availabilityFrom">Desde el {availabilityFrom}</p>
        )}
        {availabilityTo && (
          <p className="item--availabilityTo">Hasta el {availabilityTo}</p>
        )}
        {description && <p className="item--description">{description}</p>}
        <div className="item--location info">
          <img
            alt="icono_ubicacion"
            className="info--icon"
            src="https://img.icons8.com/dotty/80/000000/place-marker.png"
          />
          {country && city && (
            <span>
              {city}, {country}
            </span>
          )}
        </div>
        <div className="item--rooms info">
          <img
            alt="icono_habitacion"
            className="info--icon"
            src="https://img.icons8.com/ios/50/000000/hotel-information.png"
          />
          {rooms && <span>{rooms} Habitaciones</span>}
          <div className="info--price">{price && <span>{price}</span>}</div>
        </div>
        <button className="item--button">Reservar</button>
      </div>
    </section>
  );
}

export default Hotel;
