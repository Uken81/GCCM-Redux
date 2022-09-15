import React from 'react';
import { useContext } from 'react';
import { UserContext, UserContextInterface } from '../../../context';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { GetCharacterReference } from '../../Firebase/firebase.utils';
import { deleteDoc } from '@firebase/firestore';
import { useCharacterStore } from '../../../Global State/store';
import { useNavigate } from 'react-router';

interface Props {
  setShowAlert : React.Dispatch<React.SetStateAction<boolean>>;
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAlert = ({ setShowAlert, isDeleting, setIsDeleting }: Props) => {
  const { user } = useContext(UserContext) as UserContextInterface;

  const characterName = useCharacterStore((state) => state.character.name);
  const currentCharacterId = useCharacterStore((state) => state.character.currentCharacterId);

  const navigate = useNavigate();
  const deleteCharacter = async () => {
    const docRef = await GetCharacterReference(user?.uid, currentCharacterId);
    setIsDeleting(true);
    await deleteDoc(docRef)
      .then(() => {
        console.log('****Current character has been removed from database');
        navigate('/create-or-manage-page');
      })
      .catch(() => {
        alert('Unable to delete character from database please try again later');
      });
    setIsDeleting(false);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="delete-alert">
      <Alert variant="warning">
        <Alert.Heading>{isDeleting ? '' : `Confirm to Delete ${characterName}`}</Alert.Heading>
        <p>
          {isDeleting
            ? `Deleting ${characterName}....`
            : `You are attempting to delete ${characterName}. This can not be undone. Are you sure you wish to continue?`}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={hideAlert}>Cancel</Button>
          <Button onClick={deleteCharacter} variant="outline-success">
            Confirm
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default DeleteAlert;
