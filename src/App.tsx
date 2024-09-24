import { useState } from "react";
import "./App.css";
import axios from "axios";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { ColDef, ICellRendererParams } from "ag-grid-community";

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};

function App() {
  const [keyword, setKeyword] = useState("");
  const [repodata, setRepodata] = useState<Repository[]>([]);

  const [columnDefs] = useState<ColDef[]>([
    { field: "id", sortable: true, filter: true, flex: 1 },
    { field: "full_name", sortable: true, filter: true, flex: 1 },
    {
      field: "html_url",
      flex: 2,
      sortable: true,
      filter: true,
      cellRenderer: (params: ICellRendererParams) => (
        <a href={params.value}>{params.value}</a>
      ),
    },
    {
      headerName: "Actions",
      field: "full_name",
      flex: 1,
      cellRenderer: (params: ICellRendererParams) => (
        <button onClick={() => alert(params.value)}>Press me</button>
      ),
    },
  ]);
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 25, 50, 100];

  const handleClick = async () => {
    try {
      const response = await axios.get<{ items: Repository[] }>(
        `https://api.github.com/search/repositories?q=${keyword}`
      );

      setRepodata(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleClick}>Fetch</button>
      <div
        className="ag-theme-material-dark"
        style={{ height: 600, width: 850, marginTop: 20 }}
      >
        <AgGridReact
          rowData={repodata}
          columnDefs={columnDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </>
  );
}

export default App;
