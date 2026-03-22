export interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  type: "single" | "multiple" | "range";
  options?: { value: string; label: string; icon: string; description: string }[];
  range?: { min: number; max: number; step: number; labels: string[] };
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "budget",
    question: "What's your budget?",
    subtitle: "Choose a price range that works for you",
    type: "single",
    options: [
      { value: "budget", label: "Under $600", icon: "💰", description: "Great phones without breaking the bank" },
      { value: "mid", label: "$600 - $999", icon: "💎", description: "Premium features at a reasonable price" },
      { value: "flagship", label: "$1000 - $1300", icon: "👑", description: "The very best money can buy" },
      { value: "ultra", label: "$1300+", icon: "🚀", description: "No limits, give me everything" },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    subtitle: "Pick up to 3 priorities",
    type: "multiple",
    options: [
      { value: "photography", label: "Camera Quality", icon: "📸", description: "Take stunning photos and videos" },
      { value: "battery", label: "Battery Life", icon: "🔋", description: "Last all day and beyond" },
      { value: "performance", label: "Performance", icon: "⚡", description: "Speed for gaming and multitasking" },
      { value: "design", label: "Design & Build", icon: "✨", description: "Premium look and feel" },
      { value: "display", label: "Display Quality", icon: "🖥️", description: "Vibrant, smooth screen" },
      { value: "value", label: "Value for Money", icon: "🏷️", description: "Best specs for the price" },
    ],
  },
  {
    id: "ecosystem",
    question: "Which ecosystem do you prefer?",
    subtitle: "This determines which apps and services work best",
    type: "single",
    options: [
      { value: "ios", label: "Apple (iOS)", icon: "🍎", description: "iMessage, AirDrop, seamless Apple devices" },
      { value: "android", label: "Android", icon: "🤖", description: "Customizable, Google services, wide choice" },
      { value: "no-preference", label: "No Preference", icon: "🤷", description: "Open to either platform" },
    ],
  },
  {
    id: "size",
    question: "What size phone do you prefer?",
    subtitle: "Think about one-hand use vs screen real estate",
    type: "single",
    options: [
      { value: "compact", label: "Compact", icon: "📱", description: "Easy one-hand use (under 6.3\")" },
      { value: "medium", label: "Medium", icon: "📲", description: "Good balance (6.3\" - 6.7\")" },
      { value: "large", label: "Large", icon: "🖥️", description: "Maximum screen space (6.7\"+)" },
      { value: "foldable", label: "Foldable", icon: "📂", description: "Phone + tablet in one" },
    ],
  },
  {
    id: "usage",
    question: "How do you primarily use your phone?",
    subtitle: "Pick up to 3 main uses",
    type: "multiple",
    options: [
      { value: "social", label: "Social Media", icon: "📱", description: "Instagram, TikTok, Twitter/X" },
      { value: "gaming", label: "Gaming", icon: "🎮", description: "Mobile games and cloud gaming" },
      { value: "work", label: "Work & Productivity", icon: "💼", description: "Email, docs, video calls" },
      { value: "content", label: "Content Creation", icon: "🎬", description: "Photos, videos, editing" },
      { value: "streaming", label: "Streaming", icon: "🎥", description: "Netflix, YouTube, music" },
      { value: "basic", label: "Calls & Texting", icon: "📞", description: "Essential communication" },
    ],
  },
  {
    id: "special",
    question: "Any must-have features?",
    subtitle: "Select all that apply",
    type: "multiple",
    options: [
      { value: "stylus", label: "Stylus / S Pen", icon: "✏️", description: "For notes and drawings" },
      { value: "wireless-charging", label: "Wireless Charging", icon: "🔌", description: "Drop-and-charge convenience" },
      { value: "5g", label: "5G Connectivity", icon: "📡", description: "Fastest mobile data speeds" },
      { value: "water-resistant", label: "Water Resistance", icon: "💧", description: "Survive splashes and rain" },
      { value: "ai-features", label: "AI Features", icon: "🤖", description: "Smart assistance built in" },
      { value: "fast-charging", label: "Fast Charging", icon: "⚡", description: "Quick top-ups on the go" },
    ],
  },
];
