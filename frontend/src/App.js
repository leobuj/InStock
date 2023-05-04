import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MyItems from "./screens/MyItems/MyItems";
import MyOrders from "./screens/MyOrders/MyOrders";
import MyShipments from "./screens/MyShipments/MyShipments";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/myitems" element={<MyItems />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/myshipments" element={<MyShipments />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </main>

    <Footer />
  </BrowserRouter>
);

export default App;
