import React from "react";
import "./MapRetailers.css";

export default function MapRetailers({
  retailers,
  selectedCity,
  setSelectedCity,
  handleCitySelectAndScroll,
}) {
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
    if (!acc[retailer.slug]) {
      acc[retailer.slug] = [];
    }
    acc[retailer.slug].push(retailer);
    return acc;
  }, {});

  const uniqueRetailers = Object.values(
    retailers.reduce((acc, retailer) => {
      const city = retailer.slug;
      if (!acc[city]) {
        acc[city] = retailer;
      }
      return acc;
    }, {})
  ).sort((a, b) => a.slug.localeCompare(b.slug));

  return (
    <div className="map-container" onClick={() => setSelectedCity(null)}>
      <img src="./images/world-map.svg" alt="World Map" className="map-image" />

      {uniqueRetailers.map((retailer, index) => (
        <div
          key={index}
          className="city-point"
          style={{
            left: `${retailer.xRatio * 100}%`,
            top: `${retailer.yRatio * 100}%`,
          }}
          onClick={(event) => {
            event.stopPropagation();
            setSelectedCity(retailer.slug);
          }}>
          <div
            className={`tooltip ${
              selectedCity === retailer.slug ? "activated" : ""
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
            <p className="title">{retailer.city}</p>
            <p className="retailer-count">
              {groupedRetailers[retailer.slug].length}{" "}
              {language === "fr" ? "détaillant" : "retailer"}
              {groupedRetailers[retailer.slug].length > 1 ? "s" : ""}
            </p>
            <a
              href={`#${retailer.slug}`}
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
