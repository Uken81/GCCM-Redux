import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { User } from 'firebase/auth';
import SignInAndSignUp from './Pages/SignInAndSignUp/SignInAndSignUpPage';
import { useState } from 'react';
import { UserContext } from './context';
import { useMemo } from 'react';
import LandingPage from 'Pages/LandingPage/LandingPage';
import GuestPage from './Pages/GuestPage';
import CreateOrManage from './Pages/CreateOrManagePage';
import CreateNewCharacterPage from './Pages/CreateNewCharacterPage';
import ManageCharactersPage from './Pages/ManageCharactersPage';
import EditCharacterPage from './Pages/EditCharacterPage';
import ResetPasswordPage from './Pages/ResetPage/ResetPasswordPage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const userValue = useMemo(
    () => ({
      user,
      setUser
    }),
    [user, setUser]
  );

  return (
    <UserContext.Provider value={userValue}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guest-page" element={<GuestPage />} />
        <Route path="/sign-in-and-sign-up" element={<SignInAndSignUp />} />
        <Route path="/reset-password-page" element={<ResetPasswordPage />} />
        <Route path="/create-or-manage-page" element={<CreateOrManage />} />
        <Route path="/edit-character-page" element={<EditCharacterPage />} />
        <Route path="/create-new-character-page" element={<CreateNewCharacterPage />} />
        <Route path="/manage-characters-page" element={<ManageCharactersPage />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
