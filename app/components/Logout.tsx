import React, { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useRouter } from 'next/navigation';

const Logout: React.FC = () => {
    const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, []);

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 px-4 py-2 text-sm bg-customLime hover:bg-customLimeHover rounded"
    >
      Logout
    </button>
  );
};

export default Logout;
