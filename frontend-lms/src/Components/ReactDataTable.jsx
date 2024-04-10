import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const ReactDataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
  ];
  return (
    <div className="container mt-5">
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default ReactDataTable;
