import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

type searchProps = {
  setData: React.Dispatch<React.SetStateAction<any>>;
  data: Record<string, string>[];
};

const DEBOUNCE = 300;

const Search: React.FunctionComponent<searchProps> = ({ data, setData }) => {
  const [search, setSearch] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });
  const debouncedSearch = useDebounce(search, DEBOUNCE);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users?q=${debouncedSearch}`)
      .then((res) => res.json())
      .then((info) => {
        console.log(info.data);
        setData(info.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [debouncedSearch, data]);

  useEffect(() => {
    const pathName = search == "" ? window.location.pathname : `?q=${search}`;

    window.history.replaceState({}, "", pathName);
  }, [search]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(search);
    setSearch(e.target.value);
  }

  return (
    <>
      <form action="">
        <input
          type="search"
          placeholder="Type here to filter the csv rows"
          onChange={handleChange}
          /* value={search} */
        />
      </form>
    </>
  );
};

export default Search;
