import "./header.scss";

function Header({ country, price, room }) {
  return (
    <section className="Header">
      <div className="Header__container">
        {country && <p>{country}</p>}
        {price && <p>{price}</p>}
        {room && <p>{room}</p>}
      </div>
    </section>
  );
}

export default Header;
