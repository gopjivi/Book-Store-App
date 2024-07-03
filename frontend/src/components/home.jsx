import Header from "./header";
import Footer from "./footer";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <div className="hero_area">
        <Header></Header>
      </div>
      <Footer></Footer>
    </React.Fragment>
  );
}
