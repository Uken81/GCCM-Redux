import { User } from 'firebase/auth';
import React, { createContext, RefObject } from 'react';

export interface UserContextInterface {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface ComponentRefContextInterface {
  componentRef: RefObject<HTMLDivElement> | null;
  setComponentRef: any;
}

export const UserContext = createContext<UserContextInterface | null>(null);
export const ComponentRefContext = createContext<ComponentRefContextInterface | null>(null);
