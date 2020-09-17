import React, { lazy, Suspense } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Loader from './components/Loader';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const FormPage = lazy(() => import('./pages/FormPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const NotFound = lazy(() => import('./components/NotFound'));



const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: { errorPolicy: 'ignore' },
  },
});

function App() {
  const location = useLocation()

  return (
    <ApolloProvider client={client}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
            <Route component={FormPage} path="/:id([a-zA-Z0-9]{6})" exact />
            <Route component={AboutPage} path="/about" exact />
            <Route path="/login" exact render={() => {
              window.location.href = `${process.env.REACT_APP_DASHBOARD_URL}login`
              return null
            }} />
            <Route path="/register" exact render={() => {
              window.location.href = `${process.env.REACT_APP_DASHBOARD_URL}register`
              return null
            }} />
            <Route path="/" exact component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
}

export default App;
