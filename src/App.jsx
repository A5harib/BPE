import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Discovery from "./pages/Discovery"
import OverSight from "./pages/OverSight"
import Monitoring from "./pages/Monitoring"
import Manufacturing from "./pages/Manufacturing"   
import SupplyChain from "./pages/SupplyChain"
import Quality from "./pages/Quality"
import Surveillance from "./pages/Surveillance"
import Sales from "./pages/Sales"
import Introduction from "./pages/Introduction"
import Education from "./pages/Education"
function App() {
  return (
    <div className="App">

      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/oversight" element={<OverSight />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/supply-chain" element={<SupplyChain />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/surveillance" element={<Surveillance />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </div>
  )
}

export default App
