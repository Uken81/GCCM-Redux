import React, { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { User } from 'firebase/auth';
import SignInAndSignUp from './Pages/SignInAndSignUp/SignInAndSignUpPage';
import { UserContext } from './context';
import LandingPage from './Pages/LandingPage/LandingPage';
import GuestPage from './Pages/GuestPage/GuestPage';
import CreateOrManage from './Pages/CreateOrManagePage/CreateOrManagePage';
import CreateNewCharacterPage from './Pages/CreateNewCharacterPage/NewCharacterPage';
import ManageCharactersPage from './Pages/ManageCharactersPage/ManageCharactersPage';
import EditCharacterPage from './Pages/EditCharacterPage/EditCharacterPage';
import ResetPasswordPage from './Pages/ResetPage/ResetPasswordPage';

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
    </UserContext.Provider>
  );
};
