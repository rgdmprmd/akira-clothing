import { createContext, useEffect, useState } from "react";
import { createUserDocument, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
	setCurrentUser: () => null,
	currentUser: null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			// if user obj come through, save this into firestore
			if (user) createUserDocument(user);

			// Set the current user based on the authListener (if sign out will be null, if sign in will be user obj)
			setCurrentUser(user);
		});

		// Stop the listener when component is unmount
		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
