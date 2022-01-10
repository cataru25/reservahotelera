import React from 'react';
import qs from 'qs';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import _reduce from 'lodash/reduce';
import Header from '../../components/Header';
import Filters from '../../components/Filters';
import HotelList from '../../components/HotelList';
import { countriesDB } from '../../DB/countries';
import { pricesDB } from '../../DB/prices';
import { roomsDB } from '../../DB/rooms';
import './Layout.scss';

function Layout({ dataFiltered, reset, setReset, navigate, search, pathname }) {

    const onReset = () => {
      setReset(true);
      navigate({ pathname, search: '' });
    }

    const handleDate = (name, dateSelected) => {
        const date = new Date(dateSelected);
        date.setDate(date.getDate() + 1);
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
        navigate({ pathname, search: newSearchString });
    };

    const handleFilter = (selected) => {
      const { type, value } = selected;
      const newSearch = { ...search, [type]: value };
      const newSearchString = qs.stringify(newSearch, {
        addQueryPrefix: true
      });
      navigate({ pathname, search: newSearchString });
    };

    return (
        <section>
            <Header />
            <Filters handleDate={handleDate}
                handleFilter={handleFilter}
                countries={countriesDB}
                handleReset={onReset}
                setReset={setReset}
                prices={pricesDB}
                rooms={roomsDB}
                search={search}
                reset={reset} />
            <HotelList dataFiltered={dataFiltered} />
        </section>
    );
}

export default Layout;
