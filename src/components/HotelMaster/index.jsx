import { useState, useEffect, memo } from "react";
import moment from "moment";
import qs from "qs";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import _reduce from "lodash/reduce";
import "moment/locale/es";
import { useLocation, useNavigate } from "react-router-dom";
import hotelsData from "../../DB/data";
import { countriesDB } from "../../DB/countries";
import { pricesDB } from "../../DB/prices";
import { roomsDB } from "../../DB/rooms";
import Hotel from "../Hotel/index";
import Header from "../Header";
import Filters from "../Filters";
import { dateFilter, equalityFilter } from "./hotelMaster.helpers";
import "./hotelMaster.scss";

function HotelMaster() {
  const location = useLocation();
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });
  const navigate = useNavigate();
  const [dataFiltered, setDataFiltered] = useState(hotelsData);
  const [searchParams, setSearchParams] = useState({});
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (!_isEqual(search, searchParams)) {
      setSearchParams(search);
    }
    // onFilter();
  }, [search]);

  useEffect(() => {
    if (!_isEmpty(searchParams)) {
      onFilter();
    } else {
      setDataFiltered(hotelsData);
    }
  }, [searchParams]);

  const onReset = () => {
    console.log("@onReset:");
    setReset(true);
    navigate({ pathname: '/', search: '' });
  }

  const onFilter = () => {
    const clonedHotelsData = hotelsData.map((hotel) => {
      return { ...hotel };
    });
    const filteredData = _reduce(
      searchParams,
      (acc, value, key) => {
        // console.log("@acc:", acc);
        // console.log("@value:", value);
        // console.log("@key:", key);
        if (key.includes("availability")) {
          acc = [...dateFilter(acc, key, value)];
        }
        if (!key.includes("availability") && !key.includes("rooms")) {
          acc = [...equalityFilter(acc, key, value)];
        }
        return acc;
      },
      clonedHotelsData
    );
    setDataFiltered(filteredData);
  };

  const handleDate1 = (name, dateSelected) => {
    console.log("@handleDate1:");
    console.log("@dateSelected:", dateSelected);
    const date = new Date(dateSelected);
    const timeStamp = date.getTime();
    const newSearch = { ...search };
    if (name === "from") {
      newSearch.availabilityFrom = timeStamp;
    } else {
      newSearch.availabilityTo = timeStamp;
    }
    const newSearchString = qs.stringify(newSearch, {
      addQueryPrefix: true
    });
    navigate({ pathname: "/", search: newSearchString });
  };

  const handleFilter = (selected) => {
    const { type, value } = selected;
    const newSearch = { ...search, [type]: value };
    const newSearchString = qs.stringify(newSearch, {
      addQueryPrefix: true
    });
    navigate({ pathname: "/", search: newSearchString });
  };

  // console.log("@dataFiltered: ", dataFiltered);

  return (
    <section>
      <div>
        <Header />
        <Filters handleDate={handleDate1}
          handleFilter={handleFilter}
          handleReset={onReset}
          setReset={setReset}
          reset={reset}
          countries={countriesDB}
          prices={pricesDB}
          rooms={roomsDB} />
      </div>
      <div className="HotelMaster">
        {dataFiltered.map((hotel, index) => {
          const availabilityFrom = `${moment(hotel.availabilityFrom).format("dddd")}, ${moment(hotel.availabilityFrom).format("LL")}`;
          const availabilityTo = `${moment(hotel.availabilityTo).format("dddd")}, ${moment(hotel.availabilityTo).format("LL")}`;
          return (
            <Hotel
              name={hotel.name}
              photo={hotel.photo}
              country={hotel.country}
              city={hotel.city}
              availabilityFrom={availabilityFrom}
              availabilityTo={availabilityTo}
              description={hotel.description}
              rooms={hotel.rooms}
              price={hotel.price}
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
}

export default memo(HotelMaster);
