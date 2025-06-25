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
      <nav className="bg-indigo-800 text-white p-4 w-full">
        <ul className="flex space-x-4">
          <li><a href="/">Home</a></li>
          <li><a href="/discovery">Discovery</a></li>
          <li><a href="/surveillance">Surveillance</a></li>
          <li><a href="/education">Education</a></li>
          <li><a href="/introduction">Introduction</a></li>
          <li><a href="/sales">Sales</a></li>
          <li><a href="/oversight">OverSight</a></li>
          <li><a href="/monitoring">Monitoring</a></li>
          <li><a href="/manufacturing">Manufacturing</a></li>
          <li><a href="/supply-chain">Supply Chain</a></li>
          <li><a href="/quality">Quality</a></li>
        </ul>
      </nav>

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
