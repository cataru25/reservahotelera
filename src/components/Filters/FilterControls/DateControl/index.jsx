import React, { memo } from 'react';
import _isFunction from 'lodash/isFunction';
import DatePicker from '../../../DataPicker';

function DateControl({ handleDate = null, reset = false, name, selected }) {
    const isHandleDateFunction = _isFunction(handleDate);

    if (isHandleDateFunction) {
        return (<DatePicker name={name} onChange={handleDate} selected={selected} reset={reset} />);
    }
    return null;
}

export default memo(DateControl);
