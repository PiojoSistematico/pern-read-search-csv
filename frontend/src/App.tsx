import { useEffect, useState } from "react";
import Form from "./components/Form";
import CustomTable from "./components/CustomTable";
import Search from "./components/Search";

function App() {
  const [data, setData] = useState<Record<string, string>[]>([]);

  return (
    <>
      <main>
        <h1>Upload and Search CSV</h1>
        <Form setData={setData}></Form>
        <Search data={data} setData={setData}></Search>
        <CustomTable data={data}></CustomTable>
      </main>
    </>
  );
}

export default App;
