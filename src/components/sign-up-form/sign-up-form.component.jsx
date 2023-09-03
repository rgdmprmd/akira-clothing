import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocument } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// 1. Confrim the password match
		if (password !== confirmPassword) {
			alert("Password do not match");
			return;
		}

		// 2. Confirm the user is exists or not
		try {
			// 1. Store to firebase Auth
			const { user } = await createAuthUserWithEmailAndPassword(email, password);

			// 2. Store to firestore
			const response = await createUserDocument(user, { displayName });

			// 3. Clear the form fields
			if (response) resetFormFields();
		} catch (error) {
			// Check the error
			if (error.code === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			} else {
				console.log("User creation encountered an error", error);
			}
		}

		// 3. If not exists then store in firestore
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
				<FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
				<FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
				<FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
