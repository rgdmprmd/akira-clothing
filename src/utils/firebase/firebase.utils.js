import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// 1. INITIALIZE - Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyClaePnOwNv7xQe174WhBfU3uzqU4O4oJw",
	authDomain: "akira-clothing.firebaseapp.com",
	projectId: "akira-clothing",
	storageBucket: "akira-clothing.appspot.com",
	messagingSenderId: "377744171327",
	appId: "1:377744171327:web:1c3c179e21970764c2738a",
};

// 1. INITIALIZE - Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// 2.AUTH - Initialize Google Auth
const googleProvider = new GoogleAuthProvider();

// 2. AUTH - Initialize provider behaviour
googleProvider.setCustomParameters({
	prompt: "select_account",
});

// 2. AUTH - Config the authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// 3. INITIALIZE DB - Initialize Firestore
export const db = getFirestore();

// 4. STORE AUTH - Store a user if not exist
export const createUserDocument = async (userAuth, additionalInformation) => {
	// First protection layer
	if (!userAuth) return;

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
				...additionalInformation,
			});
		} catch (err) {
			console.error(`Error creating the user ${err.message}`);
		}
	}

	// Check if userdata exists? do nothing
	return userDocRef;
};

// 5. AUTH - Sign up with email and password method
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

// 6. AUTH - Sign in with email and password method
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};
