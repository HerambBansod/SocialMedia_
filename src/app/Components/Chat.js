'use client';

import React, { useEffect, useState } from 'react';
import {
    getAuth,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { app, db } from '../firebase';

export default function ChatPage() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, []);

    const handleSend = async () => {
        if (message.trim() === '') return;

        try {
            await addDoc(collection(db, 'messages'), {
                text: message,
                email: user.email,
                timestamp: serverTimestamp()
            });
            setMessage('');
        } catch (error) {
            console.error('Send Message Error:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };

    const handleClearChats = async () => {
        const confirm = window.confirm('Are you sure you want to delete all chats?');
        if (!confirm) return;

        try {
            const q = query(collection(db, 'messages'));
            const snapshot = await getDocs(q);

            const deletions = snapshot.docs.map((docSnap) =>
                deleteDoc(doc(db, 'messages', docSnap.id))
            );

            await Promise.all(deletions);
        } catch (error) {
            console.error('Clear Chats Error:', error);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <header className="bg-[#fb8500] text-white p-4 flex flex-wrap justify-between items-center text-base sm:text-xl font-bold">
                <span className="mb-2 sm:mb-0">ChatBase</span>
                {user && (
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-normal">
                        <span className="bg-white text-[#fb8500] px-3 py-1 rounded-full max-w-[140px] truncate">
                            {user.email}
                        </span>
                        <button
                            onClick={handleClearChats}
                            className="bg-white text-[#fb8500] px-3 py-1 rounded hover:bg-gray-100 transition-all"
                        >
                            Clear Chats
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-[#fb8500] px-3 py-1 rounded hover:bg-gray-100 transition-all"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </header>

            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`text-left max-w-[90%] sm:max-w-[70%] ${msg.email === user?.email ? 'ml-auto text-[#fb8500]' : 'mr-auto text-gray-600'
                            }`}
                    >
                        <p className="text-xs font-medium mb-1">{msg.email}</p>
                        <p className="bg-gray-100 p-3 rounded-lg text-black text-sm break-words">
                            {msg.text}
                        </p>
                    </div>
                ))}
            </div>

            <footer className="bg-gray-100 p-3 flex flex-col sm:flex-row gap-2 border-t">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-black border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#fb8500]"
                />
                <button
                    onClick={handleSend}
                    className="bg-[#fb8500] text-white px-4 py-2 rounded hover:bg-[#e07e00]"
                >
                    Send
                </button>
            </footer>
        </main>
    );
}
