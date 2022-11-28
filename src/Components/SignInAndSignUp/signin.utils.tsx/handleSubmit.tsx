import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

const handleSubmit = async (auth: Auth, email: string, password: string) => {
  //   const navigate = useNavigate();
  return await signInWithEmailAndPassword(auth, email, password);
  // .then(() => {
  //   console.log('pass');
  //   //   navigate('/create-or-manage-page');
  // })

  // .catch((error) => {
  //   console.log('catch');
  //   const errorCode = error.code;
  //   if (errorCode === 'auth/user-not-found') {
  //     console.log('emailllll', errorCode);
  //     //   setShowEmailAlert(true);
  //   }
  // });
};

export default handleSubmit;
