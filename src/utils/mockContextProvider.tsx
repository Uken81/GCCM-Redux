import React, { ReactNode, useMemo, useState } from 'react';
import { UserContext } from 'context';
import { IdTokenResult, User } from 'firebase/auth';

export const initialUserValue: User = {
  emailVerified: false,
  isAnonymous: false,
  metadata: {
    creationTime: 'Thu, 12 May 2022 06:56:54 GMT',
    lastSignInTime: 'Fri, 27 Jan 2023 07:05:43 GMT'
  },
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getIdToken: function (): Promise<string> {
    throw new Error('Function not implemented.');
  },
  getIdTokenResult: function (): Promise<IdTokenResult> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (): object {
    throw new Error('Function not implemented.');
  },
  displayName: null,
  email: 'testUser@gmail.com',
  phoneNumber: null,
  photoURL: null,
  providerId: 'firebase',
  uid: '1234567890'
};

type Props = {
  children: ReactNode;
};

export const UserContextProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(initialUserValue);
  const userValue = useMemo(
    () => ({
      user,
      setUser
    }),
    [user, setUser]
  );

  return <UserContext.Provider value={userValue}>{props.children}</UserContext.Provider>;
};
