import React, { useState, useEffect } from "react";
import "./ListRetailers.css";

export default function ListRetailers({
  retailers,
  selectedCity,
  setSelectedCity,
}) {
  const [openCity, setOpenCity] = useState(selectedCity);

  useEffect(() => {
    setOpenCity(selectedCity);
  }, [selectedCity]);

  const handleCityClick = (city) => {
    setOpenCity(openCity === city ? null : city);
  };

  const groupedRetailers = retailers.reduce((acc, retailer) => {
    if (!acc[retailer.slug]) {
      acc[retailer.slug] = [];
    }
    acc[retailer.slug].push(retailer);
    return acc;
  }, {});

  return (
    <div className="list-container" id="list-container">
      <div className="list-element">
        <div className="list-content">
          {Object.keys(groupedRetailers).map((slug, index) => (
            <div
              key={index}
              className={`city-container ${
                openCity === slug ? "selected" : ""
              }`}>
              {/* Offset element */}
              <div
                id={`${slug}`}
                className="city-offset"
                style={{ height: "1px", marginTop: "-100px" }}></div>

              <div
                className={`city-name ${openCity === slug ? "selected" : ""}`}
                onClick={() => handleCityClick(slug)}>
                {groupedRetailers[slug][0].city}
              </div>
              {openCity === slug && (
                <div className="retailer-details">
                  {groupedRetailers[slug].map((retailer, index) => (
                    <div key={index} className="retailer-info">
                      <div className="retailer-logo">
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}${retailer.logo}`}
                          alt={retailer.name}
                          width={retailer.logoWidth}
                          height={retailer.logoHeight}
                        />
                      </div>
                      <div className="retailer-infos">
                        <div className="retailer-name">{retailer.name}</div>
                        <div className="retailer-adress">{retailer.adress}</div>
                        <div className="retailer-contact">
                          {retailer.phone && (
                            <a href={`tel:${retailer.phone}`}>
                              {retailer.phone}
                            </a>
                          )}
                          {retailer.website && (
                            <a
                              href={retailer.website}
                              target="_blank"
                              rel="noreferrer">
                              {retailer.website}
                            </a>
                          )}
                          {retailer.mail && (
                            <a href={`mailto:${retailer.mail}`}>
                              {retailer.mail}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
