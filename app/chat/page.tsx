import Chat from "../components/chat/Chat";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_0px] items-center justify-items-center min-h-screen p-8 px-20 gap-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row gap-8 row-start-1 items-center sm:items-start w-full">
        <div className="w-full">
          <Chat/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center w-full">
          <div className="text-cyan-900 text-sm">
            Lisa Marie Herzberg ©2024
          </div>
      </footer>
    </div>
  );
}

