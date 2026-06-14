import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TripsListPage from "./components/TripsListPage";
import TripDetailsPage from "./components/TripDetailsPage";
import NotificationsPanel from "./components/NotificationsPanel";
import NotificationsBellPage from "./components/NotificationsBellPage";
import UsersPage from "./components/UsersPage";
import ActivityLogPage from "./components/ActivityLogPage";
import SettingsPage from "./components/SettingsPage";
import RewardsPage from "./components/RewardsPage";
import ClientsPage from "./components/ClientsPage";
import SupportPage from "./components/SupportPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout><TripsListPage /></Layout>} path="/trips" />
        <Route element={<Layout><TripDetailsPage /></Layout>} path="/trips/:tripId" />
        <Route element={<Layout><NotificationsPanel /></Layout>} path="/notifications" />
        <Route element={<Layout><NotificationsBellPage /></Layout>} path="/alerts" />
        <Route element={<Layout><UsersPage /></Layout>} path="/users" />
        <Route element={<Layout><ActivityLogPage /></Layout>} path="/activity" />
        <Route element={<Layout><SettingsPage /></Layout>} path="/settings" />
        <Route element={<Layout><RewardsPage /></Layout>} path="/rewards" />
        <Route element={<Layout><ClientsPage /></Layout>} path="/clients" />
        <Route element={<Layout><SupportPage /></Layout>} path="/support" />
        <Route element={<Layout><TripsListPage /></Layout>} path="/*" />
      </Routes>
    </BrowserRouter>
  );
}
