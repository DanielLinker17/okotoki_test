import { CodiconSearch } from "../CodiconSearch";
import "./Search.css";
type SearchProps = {
  searching: boolean;
  handleSearching: () => void;
};

export const Search: React.FC<SearchProps> = ({
  handleSearching,
  searching,
}) => {
  return (
    <div className={`search ${searching && "search-active"}`}>
      {!searching ? (
        <div className="search-inactive">
          <CodiconSearch className="search__icon" />
          <button onClick={handleSearching} className="search__button">
            Search for a coin
          </button>
        </div>
      ) : (
        <span className="search__text">Searching...</span>
      )}
    </div>
  );
};
