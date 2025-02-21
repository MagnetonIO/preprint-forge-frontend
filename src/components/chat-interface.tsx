// src/components/chat-interface.tsx
import { useState } from "react"
import { PaperResponse, PaperRequest } from "@/types/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { generatePaper } from "@/lib/api"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  onPaperGenerated: (paper: PaperResponse) => void
}

export function ChatInterface({ onPaperGenerated }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const paperRequest: PaperRequest = {
        prompt: input,
        create_markdown: true,
        create_latex: true,
      }

      const paper = await generatePaper(paperRequest)
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Successfully generated paper "${paper.paper_name}"! You can find it at ${paper.repo_url}`,
        },
      ])
      
      onPaperGenerated(paper)
      
      toast({
        title: "Success",
        description: "Paper generated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate paper",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "assistant"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your research topic or question..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </form>
    </div>
  )
}
