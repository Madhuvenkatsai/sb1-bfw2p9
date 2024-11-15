import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { ProfileForm } from './components/ProfileForm';
import { ProfileCard } from './components/ProfileCard';
import { MedicineCard } from './components/MedicineCard';
import { AddDiseaseModal } from './components/AddDiseaseModal';
import { Stethoscope, Plus } from 'lucide-react';
import { UserProfile, Disease } from './types';
import { medicines } from './data';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showAddDisease, setShowAddDisease] = useState(false);

  const handleProfileSubmit = (profileData: Partial<UserProfile>) => {
    setProfile({
      id: '1',
      allergies: [],
      conditions: [],
      ...profileData
    } as UserProfile);
  };

  const handleAddDisease = (disease: Disease) => {
    if (profile) {
      setProfile({
        ...profile,
        conditions: [...profile.conditions, disease]
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        {showRegister ? (
          <ProfileForm onSubmit={(data) => {
            handleProfileSubmit(data);
            setIsLoggedIn(true);
          }} />
        ) : (
          <LoginForm
            onLogin={() => setIsLoggedIn(true)}
            onShowRegister={() => setShowRegister(true)}
          />
        )}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <ProfileForm onSubmit={handleProfileSubmit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Stethoscope className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MediCare Plus</h1>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileCard profile={profile} />
            <button
              onClick={() => setShowAddDisease(true)}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Medical Condition</span>
            </button>
          </div>
          
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended Medicines</h2>
              <p className="text-gray-600">Based on your medical conditions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {medicines.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {showAddDisease && (
        <AddDiseaseModal
          onClose={() => setShowAddDisease(false)}
          onAdd={handleAddDisease}
        />
      )}
    </div>
  );
}

export default App;