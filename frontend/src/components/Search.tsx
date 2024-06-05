import { useEffect, useState } from "react";

type SearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Search: React.FunctionComponent<SearchProps> = ({
  search,
  setSearch,
}) => {
  useEffect(() => {
    const pathName = search == "" ? window.location.pathname : `?q=${search}`;

    window.history.replaceState({}, "", pathName);
  }, [search]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(Search);
    setSearch(e.target.value);
  }

  return (
    <>
      <form action="">
        <input
          type="search"
          placeholder="Type here to filter the csv rows"
          onChange={handleChange}
          value={search}
        />
      </form>
    </>
  );
};

export default Search;
