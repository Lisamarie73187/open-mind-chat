import React from 'react';
import { Open_Sans } from 'next/font/google';


const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['300', '800'],
});

const HeaderBanner: React.FC = () => {
    return (
        <div className="p-2 self-start w-full flex justify-between items-center">
            <div>
                <div className={`${openSans.className} font-bold text-[20px] px-2 text-cyan-900`}>
                    + Open Mind Chat
                </div>
                <div className="italic text-[16px] px-2 text-cyan-900">
                    A Space for Mindful Conversations
                </div>
            </div>
        </div>
    );
};

export default HeaderBanner;
