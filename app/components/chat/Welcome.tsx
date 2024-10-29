"use client";
import React from "react";

export default function Welcome() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-custom p-8 text-center">
        <h1 className="text-4xl font-bold text-cyan-900 mb-4">Hello Daniel</h1>
        
        <h2 className="text-2xl text-cyan-900 mb-6">How are you feeling today?</h2>
        
        <p className="text-sm text-cyan-900 max-w-md">
          Whether you're in need of calm, a compassionate listener, or a safe place to reflect, Ami is here to listen.
        </p>
      </div>
    );
  }
  