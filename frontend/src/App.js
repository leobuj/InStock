import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MyItems from "./screens/MyItems/MyItems";
import AboutUs from "./screens/AboutUs/AboutUs";
import "react-datepicker/dist/react-datepicker.css"; // Necessary HERE for some reason https://stackoverflow.com/questions/71203422/react-datepicker-no-working-in-next-js-because-of-css-import

import MyOrders from "./screens/MyOrders/MyOrders";

import DashboardPage from "./screens/DashboardPage/DashboardPage";
import MyShipments from "./screens/MyShipments/MyShipments";
import ProfilePage from "./screens/ProfilePage/ProfilePage";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUs />}/>
        <Route path="/myitems" element={<MyItems />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/myshipments" element={<MyShipments />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </main>

    <Footer />
  </BrowserRouter>
);

export default App;
