
import { initializeApp } from "firebase/app";

import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";

import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
    
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBpu3B4uzZ4ukkGO1NTV3CBE2FUC3zHmOM",
  authDomain: "netflix-clone-b6e42.firebaseapp.com",
  projectId: "netflix-clone-b6e42",
  storageBucket: "netflix-clone-b6e42.appspot.com",
  messagingSenderId: "604134618986",
  appId: "1:604134618986:web:960ed5eeb4844a0192d713"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=> {

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const user =  res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async(email, password)=> {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=> {
    signOut(auth);
}

export {auth, db, login, signup, logout}