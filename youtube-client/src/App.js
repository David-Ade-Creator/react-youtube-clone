import React from 'react';
import './App.css';
import ResponsiveDrawer from './components/navbar';
import Router from './components/Router';


function App() {
  return (
    <div>
      <ResponsiveDrawer/>
      <Router/>
    </div>
  );
}

export default App;
