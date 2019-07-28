import React, {} from 'react';

import './App.scss';
import Profile from './profile/Profile';
import Header from './common/Header';
import Footer from './common/Footer';
import ErrorBoundary from "./common/ErrorBoundary";
import Error from "./common/Error";

const App: React.FC = () => {
  return (
    <ErrorBoundary fallbackUI={<Error/>}>
      <Header />
      <main className="app"><Profile /></main>
      <Footer />
    </ErrorBoundary>
  );
};

export default App;
