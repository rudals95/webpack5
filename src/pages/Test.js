import React from "react";
import dog2 from "../images/logo.jpg";
import cat from "../images/cat.svg";

const Test = () => {
  return (
    <>
      <div className="dog"></div>
      <div className="cat"></div>
      <div className="dog2"></div>
      <div className="cat2"></div>
      <div className="phone"></div>
      <img width="40px" src={dog2} alt="" />
      <img width="40px" src={cat} alt="" />
    </>
  );
};

export default Test;
