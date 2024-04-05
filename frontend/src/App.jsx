import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/ui/AppLayout";
import Meta from "./components/ui/Meta";
import HomeScreen from "./components/pages/HomeScreen";
import ProductScreen from "./components/pages/ProductScreen";
import CartScreen from "./components/pages/CartScreen";
import LoginScreen from "./components/pages/LoginScreen";
import SignupScreen from "./components/pages/SignupScreen";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import ProfileScreen from "./components/pages/ProfileScreen";
import ResetPasswordScreen from "./components/pages/ResetPasswordScreen";
import BookingScreen from "./components/pages/BookingScreen";
import WishListScreen from "./components/pages/WishListScreen";
import TopSellingScreen from "./components/pages/TopSellingScreen";
import LandingScreen from "./components/pages/LandingScreen";

function App() {
  return (
    <>
      <Meta />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/app" index={true} element={<HomeScreen />} />
            <Route path="/app/search/:keyword" element={<HomeScreen />} />

            <Route path="app/product/:productId" element={<ProductScreen />} />
            <Route path="app/cart" element={<CartScreen />} />
            <Route
              path="app/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route path="app/my-bookings" element={<BookingScreen />} />
            <Route path="app/my-wishlist" element={<WishListScreen />} />
            <Route path="app/top-5-best" element={<TopSellingScreen />} />
          </Route>

          <Route path="login" element={<LoginScreen />} />
          <Route path="signup" element={<SignupScreen />} />
          <Route
            path="/users/resetPassword/:token"
            element={<ResetPasswordScreen />}
          />

          <Route path="*" element={<h1>Page not found.</h1>} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#ffff",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
