import React from "react";
import Header from "./components/fragments/header";
import Navigation from "./components/fragments/navigation";
import MainContent from "./components/other/mainContent";
import Footer from "./components/fragments/footer";
import productModelList from "./components/productModel/productModelList";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"


function App() {
  return ( // "return" has to return one component, so we pack things in a "div"
      <Router>
          <div>
            <Header />
            <Navigation />
            <Routes>
                <Route exact path="/" element={MainContent} />
                <Route exact path="/productModel" element={productModelList} />
            </Routes>
            <Footer />
        </div>
      </Router>
  );
}

export default App;
