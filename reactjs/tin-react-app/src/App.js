import React from "react";
import Header from "./components/fragments/header";
import Navigation from "./components/fragments/navigation";
import MainContent from "./components/other/mainContent";
import Footer from "./components/fragments/footer";

function App() {
  return ( // "return" has to return one component, so we pack things in a "div"
      <div>
        <Header />
        <Navigation />
        <MainContent />
        <Footer />
      </div>
  );
}

export default App;
