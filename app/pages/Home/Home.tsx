import React from 'react';
import Welcome from '../../components/Welcome';
import { useUser } from '../../context/userContext';
import Logout from '../../components/Logout';
import Chat from '../../chat/page';

const Home: React.FC = () => {
	const user = useUser();
	return (
		<div>
			<Logout />
			{user.user?.newUser ? <Welcome /> : <Chat />}
		</div>
	);
};

export default Home;
