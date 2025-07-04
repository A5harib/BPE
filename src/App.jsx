import { Link, Route, Routes } from "react-router-dom"
import { SignedIn, SignedOut, RedirectToSignIn, UserButton, SignInButton } from "@clerk/clerk-react"
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
    <div className="App min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      {/* Header */}
      <nav className="bg-indigo-800 text-white px-6 py-4 shadow w-full">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-2xl tracking-tight text-white">BPE</span>
            <span className="hidden sm:inline-block text-indigo-200 font-light text-sm">Pfizer Dashboard</span>
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-2 sm:space-x-4 text-sm sm:text-base">
            <Link className="hover:text-indigo-300 transition" to="/">Home</Link>
            <Link className="hover:text-indigo-300 transition" to="/discovery">Discovery</Link>
            <Link className="hover:text-indigo-300 transition" to="/surveillance">Surveillance</Link>
            <Link className="hover:text-indigo-300 transition" to="/education">Education</Link>
            <Link className="hover:text-indigo-300 transition" to="/introduction">Introduction</Link>
            <Link className="hover:text-indigo-300 transition" to="/sales">Sales</Link>
            <Link className="hover:text-indigo-300 transition" to="/oversight">OverSight</Link>

            <Link className="hover:text-indigo-300 transition" to="/supply-chain">Supply Chain</Link>
            <Link className="hover:text-indigo-300 transition" to="/quality">Quality</Link>
          </div>
          {/* Profile or Sign In */}
          <div className="flex items-center space-x-2">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white text-indigo-800 font-semibold px-4 py-2 rounded shadow hover:bg-indigo-100 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discovery" element={
          <>
            <SignedIn>
              <Discovery />
            </SignedIn>
            <SignedOut>
              <HomePage />
            </SignedOut>
          </>
        } />
        <Route path="/oversight" element={
          <>
            <SignedIn>
              <OverSight />
            </SignedIn>
            <SignedOut>
              <HomePage />
            </SignedOut>
          </>
        } />
        <Route path="/monitoring" element={
          <>
            <SignedIn>
              <Monitoring />
            </SignedIn>
            <SignedOut>
              <HomePage />
            </SignedOut>
          </>
        } />
        <Route path="/manufacturing" element={
          <>
            <SignedIn>
              <Manufacturing />
            </SignedIn>
            <SignedOut>
              <HomePage />
            </SignedOut>
          </>
        } />
        <Route path="/supply-chain" element={
          <>
            <SignedIn>
              <SupplyChain />
            </SignedIn>
            <SignedOut>
              <HomePage />
            </SignedOut>
          </>
        } />
        <Route path="/quality" element={
          <>
            <SignedIn>
              <Quality />
            </SignedIn>
            <SignedOut>
              <HomePage />
            </SignedOut>
          </>
        } />
        <Route path="/surveillance" element={
          <>
            <SignedIn>
              <Surveillance />
            </SignedIn>
            <SignedOut>
              <HomePage />
            </SignedOut>
          </>
        } />
        <Route path="/sales" element={
          <>
            <SignedIn>
              <Sales />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/introduction" element={
          <>
            <SignedIn>
              <Introduction />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/education" element={
          <>
            <SignedIn>
              <Education />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
