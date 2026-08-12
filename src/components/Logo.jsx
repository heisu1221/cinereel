import { useState } from 'react';

function PlaceholderMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <circle cx="20" cy="8.5" r="2" fill="currentColor" />
      <circle cx="29.5" cy="14.5" r="2" fill="currentColor" />
      <circle cx="29.5" cy="25.5" r="2" fill="currentColor" />
      <circle cx="20" cy="31.5" r="2" fill="currentColor" />
      <circle cx="10.5" cy="25.5" r="2" fill="currentColor" />
      <circle cx="10.5" cy="14.5" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ onClick }) {
  const [broken, setBroken] = useState(false);

  return (
    <button type="button" className="logo-btn" onClick={onClick} aria-label="Ir al inicio">
      {!broken ? (
        <img src="/logo.png" alt="Logo" className="logo-img" onError={() => setBroken(true)} />
      ) : (
        <span className="logo-mark" aria-hidden="true">
          <PlaceholderMark />
        </span>
      )}
    </button>
  );
}
