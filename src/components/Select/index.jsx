import { memo, useEffect } from "react";
import "./select.scss";

function Select({ data, handleFilter, reset, setReset, selected }) {

  useEffect(() => {
    if (reset) {
      setReset(false);
    };
  }, [reset]);

  const handleSelect = (e) => {
    const currentType = data.find((item) => e.target.value === item.value);
    handleFilter(currentType);
  };

  return (
    <select onChange={handleSelect}
      value={selected}
      className="Select">
      {
        data.map((item, index) => (
          <option value={item.value} key={item.id || index}>
            {item.description}
          </option>
        ))
      }
    </select>
  );
}

export default memo(Select);
