import { useEffect, useState } from "react";
import Form from "./components/Form";
import CustomTable from "./components/CustomTable";
import Search from "./components/Search";

function App() {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [search, setSearch] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/users?q=${search}`)
      .then((res) => res.json())
      .then((info) => setData(info.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [search]);

  return (
    <>
      <main>
        <h1>Upload and Search CSV</h1>
        <Form setData={setData}></Form>
        <Search search={search} setSearch={setSearch}></Search>
        <CustomTable data={data}></CustomTable>
      </main>
    </>
  );
}

export default App;
