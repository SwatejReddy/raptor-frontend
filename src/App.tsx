import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Home } from "./pages/Home"
import { Index } from "./pages/Index"
import { Rapt } from "./pages/Rapt"
import { CreateRapt } from "./pages/CreateRapt"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rapt/:id" element={<Rapt />} />
          <Route path="/new-rapt" element={<CreateRapt />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
