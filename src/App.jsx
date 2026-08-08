import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GradeSalt from "./pages/GradeSalt";
import PriceIndex from "./pages/PriceIndex";
import Roadmap from "./pages/Roadmap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grade" element={<GradeSalt />} />
        <Route path="/price" element={<PriceIndex />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;