import "./App.css";
import SearchBar from "./Components/SearchBar";
import ProductData from "./data.json";
// data can also be from an api request
function App() {
  return (
    <div className="App">
      <SearchBar placeholder="enter product" data={ProductData} />
    </div>
  );
}

export default App;
