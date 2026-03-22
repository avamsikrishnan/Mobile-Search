"use client";

import React, { useState } from "react";
import Link from "next/link";
import { quizQuestions } from "@/data/quiz";
import { calculateQuizResults } from "@/lib/quizEngine";
import PhoneImage from "@/components/PhoneImage";
import { useCompare } from "@/lib/CompareContext";

interface Answers {
  [key: string]: string | string[];
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const { addToCompare } = useCompare();

  const totalSteps = quizQuestions.length;
  const currentQuestion = quizQuestions[step];
  const progress = ((step + (showResults ? 1 : 0)) / totalSteps) * 100;

  const handleSingleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    if (step < totalSteps - 1) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleMultiSelect = (value: string) => {
    const current = (answers[currentQuestion.id] as string[]) || [];
    const maxSelections = currentQuestion.id === "priority" || currentQuestion.id === "usage" ? 3 : 6;
    let updated: string[];
    if (current.includes(value)) {
      updated = current.filter((v) => v !== value);
    } else if (current.length < maxSelections) {
      updated = [...current, value];
    } else {
      return;
    }
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: updated }));
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "multiple") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const results = calculateQuizResults(answers);
    const topResults = results.slice(0, 5);
    const topScore = topResults[0]?.score || 1;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Quiz Complete
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Your Perfect Phone Matches
          </h1>
          <p className="text-gray-500 text-lg">
            Based on your answers, here are the phones that best match your needs
          </p>
        </div>

        <div className="space-y-6">
          {topResults.map((result, index) => {
            const matchPercent = Math.round((result.score / topScore) * 100);
            return (
              <div
                key={result.phone.id}
                className={`glass-card overflow-hidden ${
                  index === 0 ? "ring-2 ring-blue-400 ring-offset-2" : ""
                }`}
              >
                {index === 0 && (
                  <div className="gradient-bg px-4 py-2 text-white text-sm font-bold text-center">
                    #1 Best Match For You
                  </div>
                )}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                  <div className="sm:w-1/4 flex items-center justify-center">
                    <PhoneImage phone={result.phone} className="w-32 h-32" />
                  </div>
                  <div className="sm:w-3/4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-400">#{index + 1}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-600">
                            {result.phone.brand}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{result.phone.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold gradient-text">${result.phone.price}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-600">{result.phone.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-500">Match Score</span>
                        <span className="text-sm font-bold text-blue-600">{matchPercent}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full gradient-bg transition-all duration-1000"
                          style={{ width: `${matchPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Reasons */}
                    {result.reasons.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.reasons.map((reason, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {reason}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Link
                        href={`/phones/${result.phone.id}`}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => addToCompare(result.phone)}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        Add to Compare
                      </button>
                      <Link
                        href={`/chat?phone=${result.phone.id}`}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                      >
                        Ask AI About It
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Retake Quiz
          </button>
          <Link
            href="/compare"
            className="px-6 py-3 rounded-xl font-medium gradient-bg text-white hover:opacity-90 transition-opacity"
          >
            Compare Your Matches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {step + 1} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full gradient-bg transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-10 animate-fade-in" key={step}>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {currentQuestion.question}
        </h1>
        <p className="text-gray-500">{currentQuestion.subtitle}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-slide-up" key={`opts-${step}`}>
        {currentQuestion.options?.map((option) => {
          const isSelected =
            currentQuestion.type === "multiple"
              ? ((answers[currentQuestion.id] as string[]) || []).includes(option.value)
              : answers[currentQuestion.id] === option.value;

          return (
            <button
              key={option.value}
              onClick={() =>
                currentQuestion.type === "multiple"
                  ? handleMultiSelect(option.value)
                  : handleSingleSelect(option.value)
              }
              className={`p-5 rounded-2xl border-2 text-left transition-all hover-lift ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{option.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{option.description}</div>
                </div>
                {isSelected && (
                  <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back
        </button>

        {currentQuestion.type === "multiple" && (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {step === totalSteps - 1 ? "See Results" : "Next"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
