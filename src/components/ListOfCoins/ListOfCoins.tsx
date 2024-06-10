import React, { useEffect, useRef, useState } from "react";
import { getCoins } from "../../services/utils/httpCliet";
import "./ListOfCoins.css";

type ListOfCoinsProps = {
  handleSearching: () => void;
};

export const ListOfCoins: React.FC<ListOfCoinsProps> = ({
  handleSearching,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>("All Coins");
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visibleCoins, setVisibleCoins] = useState<string[]>([]);

  useEffect(() => {
    getCoins().then((result) => setCoins(result));
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleSearching();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleSearching();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSearching]);

  useEffect(() => {
    setVisibleCoins(coins);
  }, [coins]);

  const handleFavorites = (coin: string) => {
    if (favorites.includes(coin)) {
      const newFavorite = favorites.filter((favorite) => favorite !== coin);
      setFavorites(newFavorite);
      if (filter === "Favorites") {
        setVisibleCoins(newFavorite);
      }
    } else {
      setFavorites([...favorites, coin]);
    }
  };

  const handleFilter = (filter: string) => {
    if (filter === "All Coins") {
      setVisibleCoins(coins);
      setFilter("All Coins");
    } else {
      setVisibleCoins(favorites);
      setFilter("Favorites");
    }
    setSearch("");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.trim());
    if (filter === "All Coins") {
      setVisibleCoins(
        coins.filter((coin) =>
          coin.toLowerCase().includes(event.target.value.trim().toLowerCase())
        )
      );
    } else {
      setVisibleCoins(
        favorites.filter((coin) =>
          coin.toLowerCase().includes(event.target.value.trim().toLowerCase())
        )
      );
    }
  };

  const isItemFavorite = (coin: string) => {
    return favorites.includes(coin) ? "favorite__item" : "";
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.preventDefault();
  };

  return (
    <div className="list-of-coins" ref={wrapperRef}>
      <button className="list-of-coins__close-btn" onClick={handleSearching}>
        X
      </button>
      <input
        autoFocus
        className="list-of-coins__input"
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for coins"
      />
      <div className="list-of-coins__table-container">
        {visibleCoins.length === 0 && (
          filter === 'Favorites' && favorites.length === 0? <h2>There is no items yet</h2> : <h2>Nothing found</h2>
        )}
        <tbody className="list-of-coins__table">
          {visibleCoins.map((coin: string, index: number) => (
            <tr
              className="single__coin"
              key={index}
              onDoubleClick={handleDoubleClick}
            >
              <td>{coin}</td>
              <button
                className="favorite__button"
                onClick={() => handleFavorites(coin)}
              >
                <span
                  role="img"
                  aria-label="star"
                  className={isItemFavorite(coin).toString()}
                >
                  ★
                </span>
              </button>
            </tr>
          ))}
        </tbody>
      </div>
      <div className="list-of-coins__filter">
        <button
          className={filter === "All Coins" ? "active__filter" : ""}
          onClick={() => handleFilter("All Coins")}
        >
          All Coins
        </button>
        <button
          className={filter === "Favorites" ? "active__filter" : ""}
          disabled={filter === "Favorites"}
          onClick={() => handleFilter("Favorites")}
        >
          ★ Favorites
        </button>
      </div>
    </div>
  );
};
