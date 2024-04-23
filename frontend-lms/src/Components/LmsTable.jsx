import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

// props:{apiToFetch, columns, changeInResponse, jwtToken};

const LmsTable = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${props.jwtToken}`,
          },
        };
        const response = await axios.get(props.apiToFetch, config);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const columns = [
  //   {
  //     name: "ID",
  //     selector: (row) => row.id,
  //     sortable: true,
  //   },
  // {
  //   name: "Information",
  //   cell: (row) => (
  //     <button className="btn" onClick={() => handleInfo(row.id)}>
  //       <i className="material-icons" style={{ color: "green" }}>
  //         info
  //       </i>
  //     </button>
  //   ),
  // },
  // ];

  const handleFilter = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredResult = data.filter((item) => {
      return Object.values(item).some(
        (value) =>
          value !== null && value.toString().toLowerCase().includes(keyword)
      );
    });
    setFilteredData(filteredResult);
  };

  const conditionalRowStyles = [
    {
      when: (row) => true,
      style: (row) => ({
        // backgroundColor: row.id % 2 === 0 ? "#f2f2f2" : "",
        // cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f2f2f2",
          fontSize: "14px",
        },
      }),
    },
  ];

  return loading ? (
    <>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <ReactLoading type="spin" color="black" height={"5%"} width={"5%"} />
      </div>
    </>
  ) : (
    <>
      <div className="container-fluid mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={handleFilter}
          />
        </div>
        <DataTable
          columns={props.columns}
          data={filteredData}
          // selectableRows
          fixedHeader
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[20, 30]}
          conditionalRowStyles={conditionalRowStyles}
          className="table table-info"
        />
      </div>
    </>
  );
};

export default LmsTable;
