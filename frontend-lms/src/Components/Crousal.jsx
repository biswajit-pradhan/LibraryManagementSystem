import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import ReactLoading from "react-loading";
import { toast, ToastContainer } from "react-toastify";

const Crousal = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(props.link);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div
        className="container"
        style={{
          maxWidth: "600px",
          overflow: "hidden",
          touchAction: "manipulation",
        }}
      >
        <Carousel style={{ width: "100%" }} interval={1500}>
          {data.map((imageData, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  src={imageData.bookLink}
                  style={{ height: "30vh", width: "100vh" }}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};
export default Crousal;
