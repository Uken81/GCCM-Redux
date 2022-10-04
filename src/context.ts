import { User } from 'firebase/auth';
import React, { createContext } from 'react';

export interface UserContextInterface {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextInterface | null>(null);
