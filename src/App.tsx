import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Home } from "./pages/Home"
import { Index } from "./pages/Index"
import { Rapt } from "./pages/Rapt"
import { CreateRapt } from "./pages/CreateRapt"
import { SearchedRapts } from "./components/SearchedRapts"
import { ProfilePage } from "./pages/ProfilePage"
import { EditRapt } from "./pages/EditRapt"
import { Settings } from "./pages/Settings"


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
          <Route path="/edit-rapt/:id" element={<EditRapt />} />
          <Route path="/search" element={<SearchedRapts />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
