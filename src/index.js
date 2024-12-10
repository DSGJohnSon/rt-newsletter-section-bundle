import React from "react";
import { createRoot } from "react-dom/client";
import MapRetailers from "./components/MapRetailers";
import ListRetailers from "./components/ListRetailers";

const App = () => {
  const [retailers, setRetailers] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState("");

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleCitySelectAndScroll = (city) => {
    setSelectedCity(city);
  };

  React.useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await fetch(
          "https://rt-backoffice.vercel.app/api/webflow/retailers"
        );
        const data = await response.json();
        setRetailers(data);
      } catch (error) {
        console.error("Error fetching retailers:", error);
      }
    };

    fetchRetailers();
    console.log(retailers);
  }, []);

  return (
    <>
      <MapRetailers
        retailers={retailers}
        selectedCity={selectedCity}
        setSelectedCity={handleCitySelect}
        handleCitySelectAndScroll={handleCitySelectAndScroll}
      />
      <ListRetailers
        retailers={retailers}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </>
  );
};

const container = document.getElementById("rt-retailers");
const root = createRoot(container);
root.render(<App />);
