import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { BookingProvider } from './context/BookingContext.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';

function AppRouter() {
  const { user } = useAuth();
  return user ? <Home /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BookingProvider>
          <AppRouter />
        </BookingProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
