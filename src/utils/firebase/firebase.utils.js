import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

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
initializeApp(firebaseConfig);

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

// 7. AUTH - Sign Out user
export const signOutUser = () => signOut(auth);

// 8. AUTH - Sign in Sign out listener from firebase
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// 9. SEEDER - utility to import our own json into firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("done");

	// HOW TO RUN THIS - setup some useEffect that will run in the first load, and after run, delete the useEffect.
	// EXAMPLE - look at product.context
};

// 10. GETTER - utility to get our categories data from firestore
export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;

		return acc;
	}, {});

	return categoryMap;
};
