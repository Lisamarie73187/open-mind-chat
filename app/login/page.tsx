'use client';

import { useState, useCallback, useMemo } from 'react';
import {
	PageLayout,
	BoxContainer,
	Form,
	Button,
	Header,
	Input,
	BodyText,
	LinkButton,
	HorizontalContainer,
} from '../components/ui';

import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [isSigningUp, setIsSigningUp] = useState(false);
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
				switchAuthText: 'Log In',
				switchText: 'Already have an account?',
				authActionText: 'Sign Up',
			}
			: {
				switchAuthText: 'Sign Up',
				switchText: 'Don\'t have an account?',
				authActionText: 'Log In',
			};
	}, [isSigningUp]);

	return (
		<PageLayout>
			<BoxContainer>
				<Form onSubmit={handleAuthAction}>
					<Header
						text={`${authActionText} to Open Mind Chat`}
						className="mb-3"
					/>
					{isSigningUp &&
						<Input
							name="name"
							placeholder="Name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					}

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
					<Button text={authActionText} type="submit" />
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
