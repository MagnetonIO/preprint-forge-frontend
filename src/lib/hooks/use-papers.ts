// src/lib/hooks/use-papers.ts
import { useState, useEffect } from "react"
import { PaperInfo } from "@/types/api"
import { listPapers } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export function usePapers() {
  const [papers, setPapers] = useState<PaperInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchPapers = async () => {
    try {
      setIsLoading(true)
      const paperList = await listPapers()
      setPapers(paperList)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch papers",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPapers()
  }, [])

  return {
    papers,
    isLoading,
    refetch: fetchPapers,
  }
}
