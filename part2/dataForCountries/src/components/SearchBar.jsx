const SearchBar = ({ searchBar, handleSetSearchBar }) => {
  return (
    <div>
      <p>
        find countries <input value={searchBar} onChange={handleSetSearchBar} />
      </p>
    </div>
  );
};

export default SearchBar;
