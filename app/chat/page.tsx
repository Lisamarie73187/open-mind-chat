import Chat from "../components/chat/Chat";
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '800'],
});

export default function Home() {
  return (
  <div className="bg-custom grid grid-rows-[auto_1fr_auto] min-h-screen gap-4 font-[family-name:var(--font-geist-sans)]">
    <div className="p-2 self-start w-full text-left">
      <div className={`${openSans.className} font-bold text-[20px] px-2 text-cyan-900`}>
        + Open Mind Chat
      </div>
      <div className={`italic text-[16px] px-2 text-cyan-900`}>
        A Space for Mindful Conversations
      </div>
    </div>
    <main className="flex flex-row gap-8 row-start-2 items-center w-full px-40">
      <div className="w-full">
        <Chat />
      </div>
    </main>
    <footer className="flex justify-center w-full p-4">
    <div className="text-cyan-900 text-xs">
      Lisa Marie Herzberg ©2024
    </div>
  </footer>
</div>

  );
}

