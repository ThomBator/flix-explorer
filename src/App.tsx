import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import Home from "./components/Home/Home";
import SearchResultsPage from "./components/SearchResultsPage/SearchResultsPage";
import CategoryResultsPage from "./components/CategoryResultsPage/CategoryResultsPage";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <HeaderMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/category/:name" element={<CategoryResultsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
