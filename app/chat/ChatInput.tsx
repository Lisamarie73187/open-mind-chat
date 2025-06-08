'use client';
import React from 'react';

interface ChatInputProps {
	message: string;
	onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSendMessage: () => void;
	isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
	message,
	onMessageChange,
	onSendMessage,
	isLoading,
}) => (
	<footer className="bg-white p-3 shadow-md flex items-center rounded-xl">
		<input
			type="text"
			value={message}
			onChange={onMessageChange}
			onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
			placeholder="Type your message..."
			className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:border-cyan-500"
		/>
		<button
			onClick={onSendMessage}
			disabled={isLoading}
			className={`${
				isLoading ? 'bg-gray-500' : 'bg-cyan-500 hover:bg-cyan-700'
			} text-white px-4 py-2 rounded-lg`}
		>
			Send
		</button>
	</footer>
);

export default ChatInput;
