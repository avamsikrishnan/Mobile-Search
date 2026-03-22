# MobileMatch — Find Your Perfect Phone

A modern, AI-powered mobile phone discovery portal built with Next.js, TypeScript, and Tailwind CSS.

## Unique Features

### 1. "Best For Me" Quiz
Answer 6 interactive questions about your budget, priorities, ecosystem preference, phone size, usage patterns, and must-have features. Our scoring engine matches you with the perfect phone and explains *why* each phone fits your needs.

### 2. Side-by-Side Comparison
Add up to 3 phones to a comparison tray and view every spec side-by-side. The comparison highlights which phone wins in each category (battery, camera, price, etc.) with visual indicators.

### 3. AI Follow-up Chat
An intelligent chat assistant that understands phone specs, can compare phones, make recommendations, and answer detailed questions about cameras, batteries, displays, and more. Context-aware — link directly from a phone page to ask about that specific device.

## Other Features

- **Phone Search & Browse** — Filter by brand, price range, rating. Sort by price, rating, name, or release date.
- **Detailed Phone Pages** — Full specs, pros & cons, and top reviews from YouTube and the web.
- **Review Integration** — Curated expert reviews with video/article tags and rating scores.
- **Responsive Design** — Beautiful on desktop, tablet, and mobile.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Context** for compare state management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Homepage with hero, search, featured phones
│   ├── phones/
│   │   ├── page.tsx        # Browse & filter all phones
│   │   └── [id]/page.tsx   # Phone detail page with specs, reviews, pros/cons
│   ├── quiz/page.tsx       # "Best For Me" interactive quiz
│   ├── compare/page.tsx    # Side-by-side comparison tool
│   └── chat/page.tsx       # AI follow-up chat
├── components/
│   ├── Navbar.tsx           # Navigation with compare badge
│   ├── Footer.tsx           # Site footer
│   ├── PhoneCard.tsx        # Reusable phone card component
│   └── PhoneImage.tsx       # Brand-colored phone illustration
├── data/
│   ├── phones.ts            # Phone database (10 phones with full specs)
│   └── quiz.ts              # Quiz questions and options
├── lib/
│   ├── CompareContext.tsx    # React Context for compare functionality
│   ├── quizEngine.ts        # Quiz scoring and matching algorithm
│   └── chatEngine.ts        # AI chat response generation
└── types/
    └── phone.ts             # TypeScript interfaces
```
