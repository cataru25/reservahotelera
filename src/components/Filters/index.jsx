import React, { memo, useEffect, useState } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isFunction from 'lodash/isFunction';
import FilterControls from './FilterControls';

const MILLISECONDS_IN_A_SECOND = 1000;

function Filters({
    handleDate = null,
    handleFilter = null,
    handleReset = null,
    setReset = null,
    search='',
    reset=false,
    countries = [],
    prices = [],
    rooms = []
}) {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [country, setCountry] = useState("Todos los países");
    const [price, setPrice] = useState("Cualquier precio");
    const [room, setRoom] = useState("0");
    const isCountriesNotEmpty = !_isEmpty(countries);
    const isPricesNotEmpty = !_isEmpty(prices);
    const isRoomsNotEmpty = !_isEmpty(rooms);
    const isHandleDateFunction = _isFunction(handleDate);
    const isHandleFilterFunction = _isFunction(handleFilter);
    const isHandleResetFunction = _isFunction(handleReset);
    const isThereAFilterList = isCountriesNotEmpty || isPricesNotEmpty || isRoomsNotEmpty;
    const canRenderAtLeastOneFilter = (isHandleFilterFunction && isThereAFilterList);
    const canRenderAtLeastOneDateFilter = (isHandleDateFunction && isHandleResetFunction);

    useEffect(() => {
        const availabilityFrom = _get(search, 'availabilityFrom', '');
        const availabilityTo = _get(search, 'availabilityTo', '');
        const country = _get(search, 'country', 'Todos los países');
        const price = _get(search, 'price', 'Cualquier precio');
        const room = _get(search, 'rooms', '0');
        if (availabilityFrom) {
            const availabilityFromNum = parseInt(availabilityFrom, 10);
            const availabilityFromObj = new Date(availabilityFromNum);
            const availabilityFromStr = availabilityFromObj.toISOString();
            const tIndex = availabilityFromStr.lastIndexOf('T');
            const availabilityFromStrShort = availabilityFromStr.substring(0, tIndex);
            setFrom(availabilityFromStrShort);
        } else {
            setFrom('');
        }
        if (availabilityTo) {
            const availabilityToNum = parseInt(availabilityTo, 10);
            const availabilityToObj = new Date(availabilityToNum);
            const availabilityToStr = availabilityToObj.toISOString();
            const tIndex = availabilityToStr.lastIndexOf('T');
            const availabilityToStrShort = availabilityToStr.substring(0, tIndex);
            setTo(availabilityToStrShort);
        } else {
            setTo('');
        }
        setCountry(country);
        setPrice(price);
        setRoom(room);
    }, [search]);

    if (canRenderAtLeastOneDateFilter || canRenderAtLeastOneFilter) {
        return (
            <section className="FilterBar">
                <FilterControls.DateControl name={"from"} handleDate={handleDate} reset={reset} selected={from} />
                <FilterControls.DateControl name={"to"} handleDate={handleDate} reset={reset} selected={to} />
                <FilterControls.SelectControl filterOptions={countries} handleFilter={handleFilter} setReset={setReset} reset={reset} selected={country} />
                <FilterControls.SelectControl filterOptions={prices} handleFilter={handleFilter} setReset={setReset} reset={reset} selected={price} />
                <FilterControls.SelectControl filterOptions={rooms} handleFilter={handleFilter} setReset={setReset} reset={reset} selected={room} />
                <button className="buttonBar" onClick={handleReset}>LIMPIAR</button>
            </section>
        );
    }
    return null;
}

export default memo(Filters);
