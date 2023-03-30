/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from '@firebase/auth';
import React, { useContext, useEffect } from 'react';

import 'Pages/hubPages.styles.scss';

import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserProfileDocument } from '../../Components/Firebase/firebase.utils';
import Header from '../../Components/Header/Header.component';
import { UserContext } from '../../context';
import { Unsubscribe } from 'firebase/firestore';
import LoadCharacter from '../../Components/Toolbar/LoadCharacter/LoadCharacter';
import { useAppDispatch } from 'features/reduxHooks';
import { resetCharacter } from 'features/characterSlice';

const CreateOrManage = () => {
  const dispatch = useAppDispatch();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;

  dispatch(resetCharacter());

  const navigate = useNavigate();
  useEffect(() => {
    let unsubscribeFromAuth: Unsubscribe | null = null;
    unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      await createUserProfileDocument(userAuth);
      if (userAuth) {
        setUser?.(userAuth);
      } else {
        setUser?.(userAuth);
        dispatch(resetCharacter());
        console.log('User has logged out');
        navigate('/');
      }
      return () => {
        if (unsubscribeFromAuth) {
          unsubscribeFromAuth();
        }
      };
    });
  }, [user]);

  return (
    <div className="hub-container">
      <Header />
      <div className="title-container">
        <h1 className="main-title"> G.C.C.M </h1>
      </div>
      <div className="links-container">
        <Link to="/create-new-character-page">
          <Button className="button" size="lg" variant="outline-primary">
            New Character
          </Button>
        </Link>
        <LoadCharacter />
      </div>
    </div>
  );
};

export default CreateOrManage;
