"use client"
import { useAuth } from "@/src/hooks/useAuth";
import Image from "next/image";

export default function Home() {
  useAuth("test@gmail.com")
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Hello, LumiRexAI
    </div>
  );
}
