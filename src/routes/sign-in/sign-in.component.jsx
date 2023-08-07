import React from "react";
import { getRedirectResult } from "firebase/auth";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocument } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocument(user);
		console.log(userDocRef);
	};

	const logGoogleUserRedirect = async () => {
		const { user } = await signInWithGoogleRedirect();
		console.log(user);
	};

	return (
		<div>
			<h1>Sign in</h1>
			<button onClick={logGoogleUser}>Sing in with Google</button>
			<button onClick={logGoogleUserRedirect}>Sing in with Google Redirect</button>
		</div>
	);
};

export default SignIn;
