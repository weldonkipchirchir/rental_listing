import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import { Suspense } from "react";
import Error from "./components/Error";
import Layout from "./components/Layout";
import Bookmarks from "./pages/Bookmarks";
import AboutUsPage from "./pages/AboutUs";
import RentalBooks from "./pages/Bookings";
import Payment from "./components/Payment";
import SIgnUpUser from "./pages/SignUpUser";
import StatsPage from "./pages/admin/Stats";
import SIgnInUser from "./pages/SignInUser";
import SettingsPage from "./pages/UserSetting";
import Settings from "./pages/admin/setting";
import Completion from "./components/Completion";
import VerifyEmailPage from "./pages/VerifyEmail";
import LandingPage from "./components/LandingPage";
import { ProtectedRoute } from "./pages/Protected";
import SingleProperty from "./pages/SingleProperty";
import SIgnInAdmin from "./pages/admin/SignInAdmin";
import LandingSignIn from "./components/LandingSignIn";
import EditListingPage from "./pages/admin/UpdateListing";
import CreateListingPage from "./pages/admin/CreateListing";
import SendNotificationPage from "./pages/admin/Notifications";
import Listing, { Loader as listingLoader } from "./pages/Listing";
import ReviewPage from "./pages/Review";
import Dashboard, {
  loader as adminDashboardLoader,
} from "./pages/admin/Dashboard";
import AdminRentalListing, {
  loader as adminListingLoader,
} from "./pages/admin/Listing";
import AdminBookings, {
  loader as adminBookingLoader,
} from "./pages/admin/AdminBookings";
import CreateBooking from "./pages/CreateBooking";
import NotFound from "./components/NotFound";
import Notifications from "./pages/Notifications";
import SendUserNotificationPage from "./pages/NotificationsUser";
import NotificationsAdmin from "./pages/admin/NotificationsAdmin";
import AdminPaymentRecords from "./pages/admin/PaymentRecords";
import UserPaymentRecords from "./pages/PaymentRecords";
import { ForgotPassword } from "./components/ForgotPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="/sign-up" element={<SIgnUpUser />} />
      <Route path="/signin-admin" element={<SIgnInAdmin />} />
      <Route path="/sign-in" element={<SIgnInUser />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/landing-signin" element={<LandingSignIn />} />
      <Route path="/verify" element={<VerifyEmailPage />} />
      <Route path="/rentals" element={<Listing />} loader={listingLoader} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/rentals/:id" element={<SingleProperty />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/create-booking" element={<CreateBooking />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/bookings" element={<RentalBooks />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/create-notification" element={<SendUserNotificationPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/payments" element={<UserPaymentRecords />} />
        <Route path="/user-settings" element={<SettingsPage />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
          loader={adminDashboardLoader}
        />
        <Route
          path="/listing"
          element={<AdminRentalListing />}
          loader={adminListingLoader}
        />
        <Route path="/create-listing" element={<CreateListingPage />} />
        <Route path="/edit-listing" element={<EditListingPage />} />
        <Route path="/admin-settings" element={<Settings />} />
        <Route
          path="/admin-bookings"
          element={<AdminBookings />}
          loader={adminBookingLoader}
        />
        <Route path="/notification" element={<SendNotificationPage />} />
        <Route path="/notification-msg" element={<NotificationsAdmin />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/payment-records" element={<AdminPaymentRecords />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <div className="dark:bg-gray-900">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <l-pinwheel
              size="35"
              stroke="3.5"
              speed="0.9"
              color="black"
            ></l-pinwheel>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
