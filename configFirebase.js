// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { addDoc, collection, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAqRA-0UZRi7XONijLaxxmar5cwVvslwF4",
    authDomain: "manager-user-10f6d.firebaseapp.com",
    databaseURL: "https://manager-user-10f6d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "manager-user-10f6d",
    storageBucket: "manager-user-10f6d.firebasestorage.app",
    messagingSenderId: "788072335235",
    appId: "1:788072335235:web:bbd343faee66ddfc7318b6",
    measurementId: "G-PQL63WX7HR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export async function LoginWithProvider(provider) {
    try {
        let result;
        if (provider === "google") {
            result = await signInWithPopup(auth, providerGoogle);
        } else if (provider === "facebook") {
            result = await signInWithPopup(auth, providerFacebook);
        }
        const users = await getUsers();
        const user = users.find(user => user.email === result.user.email);
        if (user) {
            return user;
        } else {
            const newUser = {
                fullName: result.user.displayName,
                email: result.user.email,
                age: null,
                createdAt: new Date()
            }
            await createUser(newUser);
            return newUser;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createUser(user) {
    try {
        const userRef = await addDoc(collection(db, "users"), user);
        return userRef;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateUser(user) {
    try {
        const userRef = await updateDoc(doc(db, "users", user.email), user);
        return userRef;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function handleLogin(email, password) {
    try {
        const users = await getUsers();
        return users.find(user => (user.email === email && user.password === password));
    } catch (error) {
        console.log(error);
        throw error;
    }
}