import { User } from 'firebase/auth';
import { createContext } from 'react';

interface UserContextInterface {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface ComponentRefContextInterface {
<<<<<<< HEAD
  componentRef: HTMLDivElement | null;
=======
  componentRef: ComponentRefContextInterface | HTMLDivElement | null;
>>>>>>> telmo
  setComponentRef: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}

export const ComponentRefContext = createContext<ComponentRefContextInterface | null>(null);
export const UserContext = createContext<UserContextInterface | null>(null);
