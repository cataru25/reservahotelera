import { hotelsData } from "../../DB/data";
import { useState } from "react";
import { countries, prices, rooms } from "../../DB/dataFilters";
import Header from "../Header/index";
import HotelMaster from "../HotelMaster/index";
import Option from "../Option/index";
import Select from "../Select/index";

function Filter() {
  /*const [country, setCountry] = useState("todos");
  const [price, setPrice] = useState(0);
  const [room, setRoom] = useState("todos");

  const handleSelectCountry = (e) => {
    const countrySelected = e.target.value;
    setCountry(countrySelected);
  };

  const handleSelectPrice = (e) => {
    const priceSelected = e.target.value;
    setPrice(priceSelected);
  };

  const handleSelectRooms = (e) => {
    const roomsSelected = e.target.value;
    setRoom(roomsSelected);
  };
*/
  const [dataFiltered, setDataFiltered] = useState(hotelsData);

  const handleFilter = (selected) => {
    console.log("selected", typeof selected);
    const hotelsFilter = hotelsData.filter(
      (hotel) => hotel.country === selected
    );
    setDataFiltered(
      selected === countriesDB[0].value ? hotelsData : hotelsFilter
    );
  };

  return (
    <section className="Filter">
      {/*<Header country={country} price={price} room={room} />*/}

      <Select data={countriesDB} handleFilter={handleFilter} />
      <Select data={pricesDB} handleFilter={handleFilter} />
      <Select data={roomsDB} handleFilter={handleFilter} />

      {/*<select value={country} onChange={handleSelectCountry} name="" id="">
        {countries.map((country, index) => {
          return (
            <Option value={country.value} option={country.option} key={index} />
          );
        })}
      </select>
      <select value={price} onChange={handleSelectPrice} name="" id="">
        {prices.map((price, index) => {
          return (
            <Option value={price.value} option={price.option} key={index} />
          );
        })}
      </select>
      <select value={room} onChange={handleSelectRooms} name="" id="">
        {rooms.map((room, index) => {
          return <Option value={room.value} option={room.option} key={index} />;
        })}
      </select>*/}
    </section>
  );
}

export default Filter;
