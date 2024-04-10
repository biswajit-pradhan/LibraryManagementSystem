import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import ReactLoading from "react-loading";
import { toast, ToastContainer } from "react-toastify";

//apiData: It is the link to be fetched
//accessorData: It is the accessorData
//changeInResponse: It will check if we need to get any extra data after fetching data
const LmsTable = ({ apiData, accessorData, changeInResponse }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiData);
        changeInResponse
          ? setData(response.data[changeInResponse])
          : setData(response.data);
        console.log(data);
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(() => accessorData, []);

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "bolder",
        fontSize: "20px",
        color: "black",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        backgroundColor: "aliceblue",
        color: "black",
      },
    },
  });

  return loading ? (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
      <MaterialReactTable table={table} />
    </>
  );
};

export default LmsTable;
