import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

const errorMessage = () => {
  const styles = { color:'black' }
  return <h2 style={styles}>Ops, um erro aconteceu, tente atualizar a página</h2>
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={errorMessage}>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);