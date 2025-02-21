// src/app/page.tsx
"use client"

import { PaperList } from "@/components/papers/paper-list"
import { ChatInterface } from "@/components/chat/chat-interface"
import { usePapers } from "@/lib/hooks/use-papers"

export default function Home() {
  const { papers, isLoading, refetch } = usePapers()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex h-screen">
      <PaperList papers={papers} onPaperDeleted={refetch} />
      <ChatInterface onPaperGenerated={refetch} />
    </main>
  )
}
