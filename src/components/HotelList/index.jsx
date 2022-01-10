import React from 'react';
import moment from "moment";
import _isEmpty from 'lodash/isEmpty';
import 'moment/locale/es';
import Hotel from '../Hotel';

function getDateString(date) {
    const longDay = moment(date).format('dddd');
    const longDate = moment(date).format('LL');
    return `${longDay}, ${longDate}`;
}

function HotelList({ dataFiltered }) {
    return (
        <div className="HotelMaster">
            {
                !_isEmpty(dataFiltered) && dataFiltered.map((hotel, index) => {
                    const availabilityFrom = getDateString(hotel.availabilityFrom);
                    const availabilityTo = getDateString(hotel.availabilityTo);

                    return (
                        <Hotel availabilityFrom={availabilityFrom}
                            availabilityTo={availabilityTo}
                            description={hotel.description}
                            country={hotel.country}
                            rooms={hotel.rooms}
                            price={hotel.price}
                            photo={hotel.photo}
                            name={hotel.name}
                            city={hotel.city}
                            key={index} />
                    );
                })
            }
          </div>
    );
}

export default HotelList;
