import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { User } from 'firebase/auth';
import SignInAndSignUp from './Pages/SignInAndSignUp/SignInAndSignUpPage';
import { useState } from 'react';
import { UserContext } from './context';
import { useMemo } from 'react';
import LandingPage from 'Pages/LandingPage/LandingPage';
import GuestPage from './Pages/GuestPage/GuestPage';
import CreateOrManage from './Pages/CreateOrManagePage';
import CreateNewCharacterPage from './Pages/CreateNewCharacterPage';
import ManageCharactersPage from './Pages/ManageCharactersPage';
import EditCharacterPage from './Pages/EditCharacterPage';
import ResetPasswordPage from './Pages/ResetPage/ResetPasswordPage';

// const LandingPage = () => <div>You are home</div>;
// const GuestPage = () => <div>You are on the about page</div>;
// const NoMatch = () => <div>No match</div>

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

export const App = () => {
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
      <LocationDisplay />
    </UserContext.Provider>
  );
};
