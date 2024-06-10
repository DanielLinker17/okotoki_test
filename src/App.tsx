import { useState } from "react";
import { Search } from "./components/Search/Search";
import { ListOfCoins } from "./components/ListOfCoins/ListOfCoins";

function App() {
  const [searching, setSearching] = useState(false);

  const handleSearching = () => {
    setSearching((prevState) => !prevState);
  };

  return (
    <div className="app">
      <div className="container">
        <Search handleSearching={handleSearching} searching={searching} />
        {searching && <ListOfCoins handleSearching={handleSearching} />}
      </div>
    </div>
  );
}

export default App;
