import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/test">Test</Link>
    </nav>
  );
}