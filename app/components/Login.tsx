'use client';

import { useState, useCallback, useMemo } from 'react';
import PageLayout from './ui/Containers/PageLayout';
import BoxContainer from './ui/Containers/BoxContainer';
import Form from './ui/Form';
import Button from './ui/Buttons/Button';
import Header from './ui/Text/Header';
import Input from './ui/Input';
import BodyText from './ui/Text/BodyText';
import LinkButton from './ui/Buttons/LinkButton';
import HorizontalContainer from './ui/Containers/HorizontalContainer';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [isSigningUp, setIsSigningUp] = useState(false);
	// const { setUser } = useUser();
	const { signUp, signIn } = useAuth();

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}, []);

	const handleAuthAction = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (isSigningUp) {
				await signUp(formData);
			} else {
				await signIn(formData);
			}
		},
		[formData, isSigningUp, signIn, signUp],
	);

	const { switchAuthText, switchText, authActionText } = useMemo(() => {
		return isSigningUp
			? {
					switchAuthText: 'Sign Up',
					switchText: "Don' have an account?",
					authActionText: 'Log in',
				}
			: {
					switchAuthText: 'Log In',
					switchText: 'Already have an account?',
					authActionText: 'Sign up',
				};
	}, [isSigningUp]);

	return (
		<PageLayout className="min-h-fit mt-[20vh]">
			<BoxContainer>
				<Form onSubmit={handleAuthAction}>
					<Header
						text={`${authActionText} to Open Mind Chat`}
						className="mb-3"
					/>
					<Input
						name="name"
						placeholder="Name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<Input
						name="email"
						type="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<Input
						name="password"
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<Button text={authActionText} />
				</Form>
				<HorizontalContainer>
					<BodyText text={switchText} />
					<LinkButton
						onClick={() => setIsSigningUp((prev) => !prev)}
						text={switchAuthText}
					/>
				</HorizontalContainer>
		  </BoxContainer>
		</PageLayout>
	);
};

export default Login;
