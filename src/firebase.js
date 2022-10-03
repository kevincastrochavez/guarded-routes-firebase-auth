import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState, useEffect, useContext, createContext } from 'react';

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAKQn7WHG1Pl2sw_BAHhpQNAdUYSgJ40eA',
  authDomain: 'practice-be146.firebaseapp.com',
  databaseURL: 'https://practice-be146-default-rtdb.firebaseio.com',
  projectId: 'practice-be146',
  storageBucket: 'practice-be146.appspot.com',
  messagingSenderId: '1004727432627',
  appId: '1:1004727432627:web:74e87d9238d99732a207c6',
});

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsusbcribe = onAuthStateChanged(getAuth(), setUser, setError);

    return () => unsusbcribe();
  }, []);

  return <AuthContext.Provider value={{ user, error }} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);

  return { ...auth, isAuthenticated: auth.user != null };
};
