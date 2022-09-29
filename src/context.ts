import { User } from 'firebase/auth';
import React, { createContext, ReactInstance, RefObject } from 'react';

export interface UserContextInterface {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface ComponentRefContextInterface {
  componentRef: // | React.MutableRefObject<ReactInstance | null>
  // | React.MutableRefObject<HTMLDivElement | null | undefined>
  RefObject<HTMLDivElement> | null;
  // RefObject<any> | null;

  // RefObject<ReactInstance | null>;
  // RefObject<any>;
  setComponentRef: any;
}

export const UserContext = createContext<UserContextInterface | null>(null);
export const ComponentRefContext = createContext<ComponentRefContextInterface | null>(null);
