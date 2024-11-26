import React from 'react';
import Welcome from './Welcome';
import { useUser } from '../context/userContext';

const Home: React.FC = () => {
    const user = useUser();
    return (
        <div>
            {user.user?.newUser ? <Welcome/> : <h1>Home</h1>}
        </div>
    );
};

export default Home;