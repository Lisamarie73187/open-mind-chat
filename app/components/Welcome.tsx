'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { User, useUser } from '../hooks/useUser';
import { BodyText, Button, Header, PageLayout } from './ui';
import VerticalContainer from './ui/Containers/VerticalContainer';


interface Props {
	user: User;
};

const Welcome: React.FC<Props> = ({ user }) => {
	const router = useRouter();
	const { user: userGlobal } = useUser();

	const handleChatNavigation = () => {
		router.push('/chat');
	};

	console.log({ userGlobal })
	return (
		<PageLayout>
			<VerticalContainer align='start'>
				<Header text={`Welcome ${user.name}, How are you feeling today?`} className='text-right' />
				<BodyText text={''} />
				<div className="text-2xl text-cyan-900 max-w-2xl mb-20">
					<p className="mb-6">
						Welcome to Open Mind Chat, your personal companion for moments of
						connection and self-discovery. Whether you&apos;re seeking a moment of
						peace, a compassionate listener, or a safe space to express your
						thoughts, you&apos;re in the right place.
					</p>
					<p>
						<span className="font-bold">Ami</span> is here to listen and offer
						support.
					</p>
				</div>
				<Button
					onClick={handleChatNavigation}
					text="Let’s Chat"
					className="w-56 mx-auto"
				/>
			</VerticalContainer>
		</PageLayout>
	)
};

export default Welcome;
