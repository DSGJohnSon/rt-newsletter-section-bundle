import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import text from "./text.json";

const App = () => {
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [formSucessMessage, setFormSucessMessage] = useState("");

  const [langue, setLangue] = useState("en");
  const availableLangues = ["en", "fr", "jp"];

  useEffect(() => {
    //Récupérer la valeurs de chaine de caractères du deuxième élément de l'url :
    const url = window.location.href;
    const urlArray = url.split("/");
    const langue = urlArray[3];

    if (availableLangues.includes(langue) === false) {
      setLangue("en");
    } else {
      setLangue(langue);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input").value;
    const rtApiKey = "qyV2DRBfoK7C2vJQgiXDGhQvYBtmpu0h";

    try {
      const response = await fetch(
        "https://rt-personal-space.vercel.app/api/hubspot-link/add-email-to-hubspot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            rtApiKey: rtApiKey,
          }),
        }
      );

      console.log(response);
      if (response.ok) {
        setFormSucessMessage(`${text[langue].success}`);
      } else {
        const errorData = await response.json();
        setFormErrorMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      setFormErrorMessage(`${text[langue].error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full lg:px-16">
      <p className="w-full text-center text-[#f4f4ef] font-marcellus text-3xl mb-3">
        {text[langue].title}
      </p>
      <p className="w-full text-center text-[#f4f4ef] text-lg mb-6">
        {text[langue].accroche}
      </p>
      <div className="md:flex items-center gap-8 w-full">
        <input
          type="email"
          placeholder={text[langue].placeholder}
          id="email"
          required
          className="relative flex self-stretch z-20 mb-0 px-[20px] border-[1px] border-[#92684d] bg-[#161010] shadow-[0_0_50px_5px_rgba(171,119,86,0.1)] text-[#92684d] placeholder:text-[#92684d]/50 focus:outline-none focus:shadow-[0_0_50px_5px_rgba(171,119,86,0.4)] transition-all w-full"
        />
        <button
          type="submit"
          className="flex items-center justify-center px-[28px] py-[14px] bg-[#965a42] shadow-[0_0_110px_-15px_#92684d] whitespace-nowrap">
          {text[langue].button}
        </button>
      </div>
      {formErrorMessage ? (
        <div
          id="formNewsletterMessageError"
          className="bg-red-200 text-red-700 p-2 w-full mt-8 flex items-center gap-2">
          <span>{formErrorMessage}</span>
        </div>
      ) : null}
      {formSucessMessage ? (
        <div
          id="formNewsletterMessageError"
          className="bg-emerald-200 text-emerald-700 p-2 w-full mt-8 flex items-center gap-2">
          <span>{formSucessMessage}</span>
        </div>
      ) : null}
    </form>
  );
};

const root = createRoot(document.getElementById("rt-newsletter"));
root.render(<App />);
