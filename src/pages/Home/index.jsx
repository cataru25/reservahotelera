import React, { useState, useEffect, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import _reduce from 'lodash/reduce';
import 'moment/locale/es';
import qs from 'qs';
import { dateFilter, equalityFilter, roomsRangeFilter } from '../../components/HotelMaster/hotelMaster.helpers';
import hotelsData from './../../DB/hotels';
import Layout from './Layout';

function Home() {
    const [dataFiltered, setDataFiltered] = useState(hotelsData);
    const [searchParams, setSearchParams] = useState({});
    const [reset, setReset] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = _get(location, 'pathname', '/');
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });

    useEffect(() => {
      if (!_isEqual(search, searchParams)) {
        setSearchParams(search);
      }
    }, [search]);

    useEffect(() => {
      if (!_isEmpty(searchParams)) {
        onFilter();
      } else {
        setDataFiltered(hotelsData);
      }
    }, [searchParams]);

    const onFilter = () => {
      const clonedHotelsData = hotelsData.map((hotel) => {
        return { ...hotel };
      });
      const filteredData = _reduce(searchParams, (acc, value, key) => {
          if (key.includes("availability")) {
            acc = [...dateFilter(acc, key, value)];
          }
          if (!key.includes("availability") && !key.includes("rooms")) {
            acc = [...equalityFilter(acc, key, value)];
          }
          if (key.includes("rooms")) {
            acc = [...roomsRangeFilter(acc, key, value)];
          }
          return acc;
        },
        clonedHotelsData
      );
      setDataFiltered(filteredData);
    };

    return (
        <Layout dataFiltered={dataFiltered}
            pathname={pathname}
            setReset={setReset}
            navigate={navigate}
            search={search}
            reset={reset} />
    );
}

export default memo(Home);

