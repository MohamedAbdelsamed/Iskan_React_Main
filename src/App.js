import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import LoginPage from './components/Login.jsx';
import Layout from './components/Layout-page.jsx';
import Home from './components/Home.jsx';
import TreeReact from './components/TreeReact.jsx';

import { DataProvider, useData } from './components/DataContext.js';

// Lazy-load microfrontends
const MicroFrontend1 = React.lazy(() => import('microfrontend1/App'));
const MicroFrontend2 = React.lazy(() => import('microfrontend2/App'));
const MicroFrontend3 = React.lazy(() => import('microfrontend3/SecondChild'));
const MicroFrontend4 = React.lazy(() => import('microfrontend4/Employee'));

const AppRoutes = () => {
  console.log("process.env",process.env.REACT_APP_ENV)
  const { message } = useData();
const location = useLocation();


  return (
    <Routes location={location} key={location.pathname}> {/* force route remount */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="Processing_Requests"
          element={
            <Suspense fallback={<div>Loading Child 1...</div>}>
              <MicroFrontend1 user={message} />
            </Suspense>
          }
        />
        <Route
          path="Engineering_Department"
          element={
            <Suspense fallback={<div>Loading Child 2...</div>}>
              <MicroFrontend2 />
            </Suspense>
          }
        />
        <Route
          path="Finance_Department"
          element={
            <Suspense fallback={<div>Loading Child 3...</div>}>
              <MicroFrontend3 />
            </Suspense>
          }
        />
        <Route
          path="Admin"
          element={
            <Suspense fallback={<div>Loading Child 4...</div>}>
              <MicroFrontend4 />
            </Suspense>
          }
        />
          <Route
          path="permissions"
          element={ <TreeReact />}
        />
      </Route>
    </Routes>
  );
};

const App = () => {
  const { i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  // Optionally update document direction for entire app
  React.useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <DataProvider>
      <Router>
        <div dir={direction}>
          <AppRoutes />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
