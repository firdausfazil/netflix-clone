
import { initializeApp } from "firebase/app";
import  { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDRfQmOMik65UGiv_ZGJyOCQ-6DcJbNzLI",
  authDomain: "auth-all-34a14.firebaseapp.com",
  projectId: "auth-all-34a14",
  storageBucket: "auth-all-34a14.firebasestorage.app",
  messagingSenderId: "704500956714",
  appId: "1:704500956714:web:aad898aca378c6c5d30d53"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split("/")[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}