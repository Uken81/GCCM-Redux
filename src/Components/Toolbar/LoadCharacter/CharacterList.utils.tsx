import { getUsersSavedCharactersList } from 'Components/Firebase/firebase.utils';
import { User } from 'firebase/auth';

export const CreateCharactersList = async (user: User | null) => {
  if (user) {
    const savedCharacters = await getUsersSavedCharactersList(user.uid);
    console.log('Saved Characters', savedCharacters);
    return savedCharacters;
  } else {
    return null;
  }
};
