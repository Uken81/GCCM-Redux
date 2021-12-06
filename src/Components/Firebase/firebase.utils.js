import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { doc, setDoc, getDoc, getDocs, addDoc, where, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrT2lwJTWbo8bNE7Ws_taXrMQbtV-IjD0',
  authDomain: 'gccm-40940.firebaseapp.com',
  projectId: 'gccm-40940',
  storageBucket: 'gccm-40940.appspot.com',
  messagingSenderId: '96522224544',
  appId: '1:96522224544:web:2f2ee9b539f198daebdac5'
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const createUserProfileDocument = async (userAuth) => {
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
      console.log('docSnap exist: ', docSnap.exists());
      console.log('docData: ', docSnap.data());
      console.log('UID: ', userAuth.uid);
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const auth = getAuth(firebaseApp);

const google = async () => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(`${user.email} has signed in with google pop-up.`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      alert(errorMessage);
    });
};

const addNewCharacterForUser = async (userId, newCharacter) => {
  const userCharactersRef = collection(db, 'users', userId, 'characters');

  try {
    const newCharacterRef = await addDoc(userCharactersRef, newCharacter);
    return newCharacterRef;
  } catch (error) {
    console.log('**** Something Went wrong: ', error);
  }
};

const getMatchingCharacterForUser = async (userId, characterName) => {
  const userCharactersRef = collection(db, 'users', userId, 'characters');
  const q = query(userCharactersRef, where('name', '==', characterName));
  try {
    const matchingCharactersSnapshot = await getDocs(q);
    const matchingCharacters = [];
    matchingCharactersSnapshot.forEach((doc) => matchingCharacters.push(doc.data()));
    return matchingCharacters;
  } catch (error) {
    console.log('**** Something Went wrong: ', error);
  }
};

const getUsersSavedCharactersList = async (userId) => {
  const userCharactersRef = collection(db, 'users', userId, 'characters');
  const charactersList = await getDocs(userCharactersRef);
  const usersCharactersList = [];

  charactersList.forEach((doc) => usersCharactersList.push(doc.data().name));
  return usersCharactersList;
};

const GetCharacterReference = async (userId, currentCharacterId) => {
  const userCharactersRef = collection(db, 'users', userId, 'characters');
  console.log('userCharacterRef: ', userCharactersRef);

  const docRef = doc(userCharactersRef, currentCharacterId);

  console.log('docRef: ', docRef);

  return docRef;
};

const SaveChangesToCharacter = async (
  characterRef,
  selectedAdvantagesList,
  selectedDisadvantagesList
) => {
  setDoc(
    characterRef,
    {
      advantages: selectedAdvantagesList.map(({ title }) => title),
      disadvantages: selectedDisadvantagesList.map(({ title }) => title)
    },
    { merge: true }
  );
};

export {
  signInWithPopup,
  google,
  auth,
  db,
  firebaseApp,
  createUserProfileDocument,
  addNewCharacterForUser,
  getMatchingCharacterForUser,
  getUsersSavedCharactersList,
  GetCharacterReference,
  SaveChangesToCharacter
};
