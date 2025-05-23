import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import './styles/Form.css';

function App() {
  const [currentView, setCurrentView] = useState('form');
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (data) => {
    setUserData(data);
    setCurrentView('details');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
    setUserData(null);
  };

  return (
    <div className="App">
      {currentView === 'form' ? (
        <UserForm onSubmit={handleFormSubmit} />
      ) : (
        <UserDetails userData={userData} onBack={handleBackToForm} />
      )}
    </div>
  );
}

export default App;