// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CabList from './components/CabList';
import CabDetails from './components/CabDetails';
import Checkout from './components/Checkout';
import UserDetailsForm from './components/UserDetailsForm'; // Import UserDetailsForm

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CabList />} />
            <Route path="/cab/:id" element={<CabDetails />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/user-details" index={true} element={<UserDetailsForm />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
