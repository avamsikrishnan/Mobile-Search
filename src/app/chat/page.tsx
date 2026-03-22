"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { generateResponse } from "@/lib/chatEngine";
import { getPhoneById } from "@/data/phones";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}

function ChatPageContent() {
  const searchParams = useSearchParams();
  const phoneContext = searchParams.get("phone") || undefined;
  const contextPhone = phoneContext ? getPhoneById(phoneContext) : undefined;

  const [messages, setMessages] = useState<Message[]>(() => {
    const welcome: Message = {
      id: "welcome",
      role: "assistant",
      content: contextPhone
        ? `Hi there! I see you're interested in the **${contextPhone.name}**. I know everything about this phone — ask me anything! You can ask about its camera, battery, how it compares to other phones, or whether it's the right choice for you.`
        : "Welcome to MobileMatch AI Chat! 🤖\n\nI'm your personal phone expert. I can help you with:\n\n• **Phone recommendations** based on your needs\n• **Detailed comparisons** between any phones\n• **Spec breakdowns** for cameras, batteries, displays\n• **Buying advice** to help you decide\n\nWhat would you like to know?",
      timestamp: new Date(),
    };
    return [welcome];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

    const response = generateResponse(text, phoneContext);

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = contextPhone
    ? [
        `What are the pros and cons of the ${contextPhone.name}?`,
        `How's the camera on the ${contextPhone.name}?`,
        `Compare ${contextPhone.name} with its closest rival`,
        `Is the ${contextPhone.name} worth the price?`,
      ]
    : [
        "What's the best camera phone?",
        "Best phone under $600?",
        "Compare iPhone 16 Pro Max vs Galaxy S25 Ultra",
        "Best phone for gaming?",
      ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Phone Expert</h1>
            <p className="text-sm text-gray-500">Ask anything about phones — I&apos;m here to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${
                msg.role === "user"
                  ? "bg-gray-900 text-white rounded-br-md"
                  : "glass-card rounded-bl-md"
              }`}
            >
              <div
                className={`text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "assistant" ? "prose prose-sm max-w-none" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.role === "assistant"
                    ? formatMarkdown(msg.content)
                    : msg.content,
                }}
              />
              <div
                className={`text-xs mt-2 ${
                  msg.role === "user" ? "text-gray-400" : "text-gray-400"
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="glass-card rounded-2xl rounded-bl-md px-5 py-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => {
                setInput(q);
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <div className="absolute -inset-0.5 gradient-bg rounded-2xl opacity-10 blur" />
        <div className="relative flex items-center bg-white rounded-2xl border border-gray-200 shadow-sm">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about any phone..."
            className="flex-1 px-5 py-4 bg-transparent outline-none text-sm"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="m-2 w-10 h-10 rounded-xl gradient-bg text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(/## (.*?)(\n|$)/g, '<h3 class="text-base font-bold text-gray-900 mb-2 mt-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n• /g, '<br/><span class="inline-block ml-2">• </span>')
    .replace(/\n- /g, '<br/><span class="inline-block ml-2">- </span>')
    .replace(/\n\|/g, "<br/>|")
    .replace(/\n(\d+)\. /g, '<br/><span class="inline-block ml-2">$1. </span>')
    .replace(/\n/g, "<br/>");
}
