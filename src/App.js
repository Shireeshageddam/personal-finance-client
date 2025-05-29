import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TransactionsList from "./pages/TransactionsList";
import PrivateRoute from "./components/PrivateRoute";
import NavigationBar from "./components/NavigationBar";


function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <TransactionsList />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
         <ScrollToTop />
         <Toaster position="top-right" />
        <NavigationBar />
         <div className="p-4">
        <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
