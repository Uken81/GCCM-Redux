import { User } from 'firebase/auth';
import React, { createContext, RefObject } from 'react';

export interface UserContextInterface {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface ComponentRefContextInterface {
  componentRef: // | React.MutableRefObject<ReactInstance | null | undefined>
  // | React.MutableRefObject<HTMLDivElement | null | undefined>
  RefObject<any>;
  // RefObject<ReactInstance | null>;
  // RefObject<any>;
  setComponentRef: any;
}

export const UserContext = createContext<UserContextInterface | null>(null);
export const ComponentRefContext = createContext<ComponentRefContextInterface | null>(null);
