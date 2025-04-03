import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import SupplierView from "./components/SupplierView";
import OwnerView from "./components/OwnerView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/supplier-dashboard" element={<SupplierView />} />
        <Route path="/store-dashboard" element={<OwnerView />} />
      </Routes>
    </Router>
  );
}

export default App;