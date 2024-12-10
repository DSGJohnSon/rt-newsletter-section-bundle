import React from "react";
import "./MapRetailers.css";
import { LuLoaderCircle } from "react-icons/lu";

export default function MapRetailers({
  retailers,
  selectedCity,
  setSelectedCity,
  handleCitySelectAndScroll,
}) {
  //TEMP
  const [xRatioForTest, setXRatioForTest] = React.useState(0);
  const [yRatioForTest, setYRatioForTest] = React.useState(0);

  const imageWorldMapPath = `${process.env.REACT_APP_BASE_URL}/images/world-map.svg`;

  // Function to detect language from URL
  const detectLanguage = () => {
    const path = window.location.pathname;
    if (path.startsWith("/fr")) {
      return "fr";
    }
    return "en";
  };

  const language = detectLanguage();

  const groupedRetailers = retailers.reduce((acc, retailer) => {
    if (!acc[retailer.city.city_slug]) {
      acc[retailer.city.city_slug] = [];
    }
    acc[retailer.city.city_slug].push(retailer);
    return acc;
  }, {});

  const uniqueRetailers = Object.values(
    retailers.reduce((acc, retailer) => {
      const citySlug = retailer.city.city_slug;
      if (!acc[citySlug]) {
        acc[citySlug] = retailer;
      }
      return acc;
    }, {})
  ).sort((a, b) => a.city.city_slug.localeCompare(b.city.city_slug));

  return (
    <div
      className={`map-container ${retailers.length == 0 ? "is-loading" : ""}`}
      onClick={() => setSelectedCity(null)}>
      <input
        type="number"
        min={0}
        max={1}
        step={0.01}
        onChange={() => {
          setXRatioForTest(event.target.value);
        }}
      />
      <input
        type="number"
        min={0}
        max={1}
        step={0.01}
        onChange={() => {
          setYRatioForTest(event.target.value);
        }}
      />
      <img src={imageWorldMapPath} alt="World Map" className="map-image" />
      <div
        className="city-point"
        style={{
          top: `${xRatioForTest * 100}%`,
          left: `${yRatioForTest * 100}%`,
        }}></div>
      <LuLoaderCircle className="loader-map" />

      {uniqueRetailers.map((retailer, index) => (
        <div
          key={index}
          className="city-point"
          style={{
            top: `${retailer.city.x * 100}%`,
            left: `${retailer.city.y * 100}%`,
          }}
          onClick={(event) => {
            event.stopPropagation();
            setSelectedCity(retailer.city.city_slug);
          }}>
          <div
            className={`tooltip ${
              selectedCity === retailer.city.city_slug ? "activated" : ""
            }`}>
            <div
              className="cross"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedCity(null);
              }}>
              <span className="cross-left"></span>
              <span className="cross-right"></span>
            </div>
            <p className="title">
              {language === "fr"
                ? retailer.city.name_fr
                : retailer.city.name_en}
            </p>
            <p className="retailer-count">
              {groupedRetailers[retailer.city.city_slug].length}{" "}
              {language === "fr" ? "détaillant" : "retailer"}
              {groupedRetailers[retailer.city.city_slug].length > 1 ? "s" : ""}
            </p>
            <a
              href={`#${retailer.city.city_slug}`}
              onClick={(event) => {
                event.stopPropagation();
                handleCitySelectAndScroll(retailer.slug);
              }}
              className="link-popup">
              {language === "fr" ? "Voir les retailers" : "See retailers"}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
