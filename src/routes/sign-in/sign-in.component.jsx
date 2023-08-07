import React from "react";
import { signInWithGooglePopup, createUserDocument } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocument(user);
		console.log(userDocRef);
	};

	return (
		<div>
			<h1>Sign in</h1>
			<button onClick={logGoogleUser}>Sing in with Google</button>

			<SignUpForm />
		</div>
	);
};

export default SignIn;
