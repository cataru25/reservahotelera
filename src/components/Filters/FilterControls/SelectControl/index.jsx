import React, { memo } from 'react';
import Select from '../../../Select';
import _isEmpty from 'lodash/isEmpty';
import _isFunction from 'lodash/isFunction';

function SelectControl({
    filterOptions = [],
    handleFilter = null,
    setReset = null,
    selected = null,
    reset=false
}) {
    const isFilterOptionsNotEmpty = !_isEmpty(filterOptions);
    const isHandleFilterFunction = _isFunction(handleFilter);
    const isSetResetFunction = _isFunction(setReset);

    if (isFilterOptionsNotEmpty && isHandleFilterFunction) {
        return (
            <Select data={filterOptions}
                handleFilter={handleFilter}
                reset={reset}
                selected={selected}
                setReset={() => isSetResetFunction && setReset(false)} />
        );
    }
    return null;
}

export default memo(SelectControl);
