import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from './Logo.jsx';

// Nota: esta es una autenticación simulada (front-end only), suficiente para el
// alcance del prototipo académico. No hay backend ni verificación de credenciales
// reales; solo valida que se hayan completado ambos campos. Ver README.md.
export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Completa usuario y contraseña para continuar.');
      return;
    }
    setError('');
    login(username.trim());
  }

  return (
    <div className="login-screen">
      <div className="auth-card">
        <div className="auth-card__brand">
          <Logo onClick={undefined} />
          <p className="auth-card__tagline">Tu próxima función te espera</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary">
            Iniciar sesión
          </button>
        </form>

        <p className="login-hint">
          Prototipo académico: cualquier usuario y contraseña no vacíos te dan acceso.
        </p>
      </div>
    </div>
  );
}
