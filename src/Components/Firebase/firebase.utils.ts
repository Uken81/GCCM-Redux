import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  QuerySnapshot,
  DocumentData,
  DocumentReference,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  where,
  query
} from 'firebase/firestore';
import { NewCharacterStatsObj } from '../../../types';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSENGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const createUserProfileDocument = async (userAuth: User | null) => {
  if (!userAuth) return;
  const userRef = doc(db, `users/${userAuth.uid}`);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        email,
        createdAt
      });
      console.log('CreateUserProfileDocument/FireBase.Utils');
      console.log('userRef: ', userRef);
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(firebaseApp);

export const google = async () => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(`${user.email} has signed in with google pop-up.`);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const ResetPassword = (email: string) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('reset request sent');
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const addNewCharacter = async (userId: string, newCharacter: NewCharacterStatsObj) => {
  const userCharactersRef = collection(db, 'users', userId, 'characters');
  try {
    const newCharacterRef = await addDoc(userCharactersRef, newCharacter);
    const characterId = newCharacterRef.id;
    await setDoc(newCharacterRef, { id: characterId }, { merge: true });
  } catch (error) {
    return;
  }
};

const convertSnapshotToList = async (snapShotObj: QuerySnapshot<DocumentData>) => {
  const docs = snapShotObj.docs;
  const characterNamesList: string[] = docs.map((doc) => doc.data().name);
  return characterNamesList;
};

export const getUsersSavedCharacterList = async (userId: string) => {
  const usersCharactersRef = collection(db, 'users', userId, 'characters');
  const savedCharactersDoc = await getDocs(usersCharactersRef);
  const usersCharactersList = await convertSnapshotToList(savedCharactersDoc);

  return usersCharactersList;
};

const convertSnapshotToObj = async (snapShotObj: QuerySnapshot<DocumentData>) => {
  const doc = snapShotObj.docs[0];
  const characterObj = doc.data();
  return characterObj;
};

export const getMatchingCharacterForUser = async (userId: string, characterName: string) => {
  const charactersRef = collection(db, 'users', userId, 'characters');
  const nameQuery = query(charactersRef, where('name', '==', characterName));
  try {
    const matchingCharacterSnapshot = await getDocs(nameQuery);
    const matchingCharacter = await convertSnapshotToObj(matchingCharacterSnapshot);
    return matchingCharacter;
  } catch (error) {
    console.log('**** Something Went wrong: ', error);
    return null;
  }
};

export const GetCharacterReference = async (userId: string, currentCharacterId: string) => {
  const userCharactersRef = collection(db, 'users', userId, 'characters');
  const characterDocRef = doc(userCharactersRef, currentCharacterId);
  return characterDocRef;
};

export const SaveChangesToCharacter = async (
  characterRef: DocumentReference<DocumentData>,
  selectedAdvantagesList: string[],
  selectedDisadvantagesList: string[],
  name: string
) => {
  setDoc(
    characterRef,
    {
      advantages: selectedAdvantagesList.map((title) => title),
      disadvantages: selectedDisadvantagesList.map((title) => title),
      name: name
    },
    { merge: true }
  );
};
