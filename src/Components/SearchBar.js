import "./searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

const SearchBar = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [userInput, setUserInput] = useState();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setUserInput(searchWord);
    const newFilter = data.filter((value) => {
      return value.name
        .toLowerCase()
        .normalize("NFD") //.normalize and .replace help by ignoring diacriticals from the data field
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchWord.toLowerCase());
    });
    // to avoid displaying results even after the search bar has been cleared:
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    // to remove everything from the filtered array and to clear the input text:
  };
  const clearInput = () => {
    setFilteredData([]);
    setUserInput("");
  };
  return (
    <div className="search">
      <h1>Search Bar</h1>
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={userInput}
          onChange={handleFilter}
        />{" "}
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 ? (
        <div className="dataResult">
          {/* .slice is used here to limit the amount of results */}
          {filteredData.slice(0, 5).map((value, key) => {
            return (
              <a className="dataItem" href="./">
                <p>{value.name}</p>
              </a>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
