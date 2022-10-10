import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../context';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { GetCharacterReference } from '../../Firebase/firebase.utils';
import { deleteDoc } from '@firebase/firestore';
import { useNavigate } from 'react-router';
import { useAppSelector } from 'Components/CustomHooks/reduxHooks';

interface Props {
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAlert = ({ setShowAlert }: Props) => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const [isDeleting, setIsDeleting] = useState(false);

  const characterName = useAppSelector((state) => state.character.name);
  const characterId = useAppSelector((state) => state.character.id);

  const navigate = useNavigate();
  const deleteCharacter = async () => {
    if (user) {
      setIsDeleting(true);
      const docRef = await GetCharacterReference(user?.uid, characterId);
      await deleteDoc(docRef)
        .then(() => {
          console.log('****Current character has been removed from database');
          setIsDeleting(false);
          navigate('/create-or-manage-page');
        })
        .catch(() => {
          alert('Unable to delete character from database please try again later');
          setIsDeleting(false);
        });
    }
  };

  return (
    <div className="delete-alert">
      {!isDeleting ? (
        <Alert variant="warning">
          <Alert.Heading>Confirm to Delete {characterName}</Alert.Heading>
          <p>
            You are attempting to delete {characterName}. This can not be undone. Are you sure you
            wish to continue?
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShowAlert(false)}>Cancel</Button>
            <Button onClick={deleteCharacter} variant="outline-success">
              Confirm
            </Button>
          </div>
        </Alert>
      ) : (
        <Alert variant="warning">
          <p>Deleting {characterName}....</p>
          <hr />
        </Alert>
      )}
    </div>
  );
};

export default DeleteAlert;
