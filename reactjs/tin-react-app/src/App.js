import React from "react";
import Header from "./components/fragments/header";
import Navigation from "./components/fragments/navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/footer";
import ProductModelList from "./components/productModel/ProductModelList";
import ProductModelDetails from "./components/productModel/ProductModelDetails";

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
                <Route exact path="/" element={<MainContent />} />
                <Route exact path="/ProductModel" element={<ProductModelList />} />
                <Route exact path="/ProductModel/details/:IDproduct" element={< ProductModelDetails />  } />
            </Routes>
            <Footer />
        </div>
      </Router>
  );
}

export default App;
