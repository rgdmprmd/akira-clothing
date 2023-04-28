import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

// Config the authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Initialize Firestore
export const db = getFirestore();

export const createUserDocument = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid); // Search the specific doc
	const userSnapshot = await getDoc(userDocRef); // Fetch the doc

	// Check if doc does not exists? create the userdata
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (err) {
			console.error(`Error creating the user ${err.message}`);
		}
	}

	// Check if userdata exists? do nothing
	return userDocRef;
};
