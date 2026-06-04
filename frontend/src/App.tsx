import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import QuadLock from './pages/QuadLock';
import Cookbook from './pages/Cookbook';
import MyKitchen from './pages/MyKitchen';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import { AuthProvider, useAuth } from './utils/auth';

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* Login page without header — redirect to home if already logged in */}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />}
      />

      {/* Pages with header navigation — require auth */}
      <Route
        element={isLoggedIn ? <Layout showHeader={true} /> : <Navigate to="/login" replace />}
      >
        <Route path="/home" element={<Home />} />
        <Route path="/quad-lock" element={<QuadLock />} />
        <Route path="/cookbook" element={<Cookbook />} />
        <Route path="/kitchen" element={<MyKitchen />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to={isLoggedIn ? '/home' : '/login'} replace />} />
      <Route path="*" element={<Navigate to={isLoggedIn ? '/home' : '/login'} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;