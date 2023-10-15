import React, { useEffect } from "react";
import Select from "react-select";

import "./StandardDropDown.css";
import axios from "axios";
import { API } from "../../../Constants";
function StandardDropDown(props) {
  const [selectedCollaborators, setSelectedCollaborators] = React.useState([]);

  const [collaboratorsOptions, setCollaboratorsOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const handleCollaboratorsChange = (selectedOptions) => {
    setSelectedCollaborators(selectedOptions);
    // Call the parent's function to handle collaborator changes
    props.onCollaboratorsChange(selectedOptions);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      const apiURL = `/api/users/search?username=${inputValue}`;
      axios
        .get(apiURL, {
          headers: {
            "X-API-KEY": API.key,
          },
        })
        .then((response) => {
          const JSONFormat = JSON.stringify(response.data.responseObject);
          const object = JSON.parse(JSONFormat);
          const mappedData = object.map((item) => ({
            value: item.userId,
            label: item.username,
          }));
          setCollaboratorsOptions(mappedData);

          console.log(collaboratorsOptions);
        })
        .catch((error) => {
          // Handle API call error
          console.error("API request error:", error);
        });
    }
    /** Call API Search /api/users/search?username= */
  };

  const DropDownStyles = {
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    control: (provided, state) => ({
      ...provided,
      height: "calc(7vmin)",
      width: "calc(38vmin)",
      overflowY: "auto",
      borderRadius: "calc(1vmin)",
      border: state.isFocused
        ? "solid var(--Black1) calc(0.31vmin)"
        : "solid var(--Gray1) calc(0.31vmin)",
      paddingLeft: "calc(2.5vmin)",
      paddingRight: "calc(2.5vmin)",
      fontFamily: '"Inter Regular"',
      fontSize: "calc(1.65vmin)",
      outline: "none",
      boxShadow: "none",
      "&:hover": {
        borderColor: state.isFocused ? "var(--Black1)" : "var(--Gray1)",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontFamily: '"Inter Regular"',
      fontSize: "calc(1.65vmin)",
    }),
    input: (provided) => ({
      ...provided,
      fontFamily: '"Inter Regular"',
      fontSize: "calc(1.65vmin)",
    }),
    multiValue: (provided) => ({
      ...provided,
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: "calc(12.5vmin)",
      overflowY: "auto",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      fontSize: "calc(1.65vmin)",
    }),
  };

  useEffect(() => {
    setInputValue("");
  }, [selectedCollaborators]);

  return (
    <>
      {props.isCollaboratorDropdown ? (
        <Select
          isMulti={props.isMulti}
          name={props.name}
          value={selectedCollaborators}
          onChange={handleCollaboratorsChange}
          options={collaboratorsOptions}
          placeholder={props.placeholder}
          styles={DropDownStyles}
          className={`${props.className} StandardDropDown`}
          onInputChange={(value) => setInputValue(value)}
          onKeyDown={handleInputKeyDown}
        />
      ) : (
        <Select
          isMulti={props.isMulti}
          name={props.name}
          value={selectedCollaborators}
          onChange={handleCollaboratorsChange}
          options={collaboratorsOptions}
          placeholder={props.placeholder}
          styles={DropDownStyles}
          className={`${props.className} StandardDropDown`}
        />
      )}
    </>
  );
}

export default StandardDropDown;
