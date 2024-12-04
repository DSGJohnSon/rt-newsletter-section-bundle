import React from "react";
import { createRoot } from "react-dom/client";
import MapRetailers from "./components/MapRetailers";
import ListRetailers from "./components/ListRetailers";

const App = () => {
  const retailers = [
    {
      slug: "dubai",
      name: "Perpétuel Gallery Limited",
      city: "Dubai - United Arab Emirates",
      adress: "GV01,Podium Level, Gate Village - DIFC",
      xRatio: 0.6192,
      yRatio: 0.5,
      website: "https://perpetuel.com/",
      mail: "info@perpetuel.com",
      logo: "/images/perpetuel.png",
    },
    {
      slug: "hongkong",
      name: "The Lavish Attic",
      city: "Hong Kong",
      adress: "101, First Floor Central Building 1, 3 Pedder St, Central",
      xRatio: 0.7923,
      yRatio: 0.5151,
      website: "https://www.thelavishattic.com/",
      phone: "+85225290226",
      logo: "/images/lavish_atic.png",
    },
    {
      slug: "london",
      name: "Swiss Gallery",
      city: "London - United Kingdom",
      adress: "JW Marriot Grosvenor House, Park Ln, London W1K 7TN",
      xRatio: 0.47,
      yRatio: 0.3216,
      website: "https://swissgallery.co.uk/",
      phone: "+442073551000",
      logo: "/images/swiss_gallery.png",
    },
    {
      slug: "newyork",
      name: "Cellini",
      city: "New York - United States of America",
      adress: "430 Park Ave New York, N.Y. 10022",
      xRatio: 0.27,
      yRatio: 0.405,
      website: "https://www.cellinijewelers.com/",
      phone: "+12128880505",
      mail: "contact@cellinijewelers.com",
      logo: "/images/cellini.png",
    },
    {
      slug: "denver",
      name: "OSTER",
      city: "Denver - United States of America",
      adress: "251 Steele St, 101 Denver, CO 80206",
      xRatio: 0.185,
      yRatio: 0.41,
      website: "https://www.osterjewelers.com",
      phone: "+1 303-572-1111",
      logo: "/images/oster.png",
    },
    {
      slug: "taipei",
      name: "Maison Swiss Prestige 葳鑠時計光廊",
      city: "Taipei - Taiwan",
      adress: "No. 202-3, Section 1, Da'an Rd, Da'an District",
      xRatio: 0.812,
      yRatio: 0.5,
      phone: "+886 2 2700 8927 ",
      logo: "/images/maison-swiss-prestige.png",
    },
    {
      slug: "london",
      name: "Maison Swiss Prestige 葳鑠時計光廊",
      city: "Taipei - Taiwan",
      adress: "No. 202-3, Section 1, Da'an Rd, Da'an District",
      xRatio: 0.1,
      yRatio: 0.1,
      phone: "+886 2 2700 8927 ",
      logo: "/images/maison-swiss-prestige.png",
    },
  ];

  const [selectedCity, setSelectedCity] = React.useState(retailers[0].slug);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleCitySelectAndScroll = (city) => {
    setSelectedCity(city);
  };

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
