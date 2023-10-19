import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function Selects({ chose, data, selectData }) {
  const [selectedOption, setSelectedOption] = useState(null);
    console.log(selectedOption);
  

  if (selectedOption && data) {
     selectData(selectedOption.value);
  } else {
    selectData('')
  }
 

  const options = [{ value: "<- select - >", label: "<- select - >" }];
    if (data) {
      data.forEach((el) => {
        options.push({ value: el, label: el });
      });
    } 

  return (
    <div className="select-menu">
      <label style={{ fontSize: "13px"}}>
        {" "}
        <span style={{color: "white"}}>{chose}</span>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "grey" : "white",
              width: "180px",
            }),
          }}
          menuPosition="fixed"
          menuPlacement="auto"
          defaultValuevalue={"<- select - >"} //data ? selectedOption: 
          onChange={setSelectedOption}
          isClearable={false}
          options={options}
        />
      </label>
    </div>
  );
}
