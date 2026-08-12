import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from './Logo.jsx';


export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

function handleSubmit(e) {
    e.preventDefault();
    if (username.trim() !== 'usuario' || password !== '12345') {
      setError('Usuario o contraseña incorrectos.');
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
        </p>
      </div>
    </div>
  );
}
