import { useState } from "react";
import Form from "./components/Form";
import CustomTable from "./components/CustomTable";

function App() {
  const [data, setData] = useState<Record<string, string>[]>([]);

  console.log(data);

  return (
    <>
      <main>
        <h1>Upload and Search CSV</h1>
        <Form setData={setData}></Form>
        <CustomTable data={data}></CustomTable>
      </main>
    </>
  );
}

export default App;
