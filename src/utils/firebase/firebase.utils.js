import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyClaePnOwNv7xQe174WhBfU3uzqU4O4oJw",
	authDomain: "akira-clothing.firebaseapp.com",
	projectId: "akira-clothing",
	storageBucket: "akira-clothing.appspot.com",
	messagingSenderId: "377744171327",
	appId: "1:377744171327:web:1c3c179e21970764c2738a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Google Auth
const googleProvider = new GoogleAuthProvider();

// Initialize provider behaviour
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
