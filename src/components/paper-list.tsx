// src/components/papers/paper-list.tsx
import { PaperInfo } from "@/types/api"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Trash2Icon, GithubIcon, FileTextIcon, FileIcon } from "lucide-react"
import { deletePaper } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface PaperListProps {
  papers?: PaperInfo[] | null
  onPaperDeleted: (paperName: string) => void
}

export function PaperList({ papers, onPaperDeleted }: PaperListProps) {
  const { toast } = useToast()

  // Ensure papers is an array
  const papersList = Array.isArray(papers) ? papers : []

  const handleDelete = async (paperName: string) => {
    try {
      await deletePaper(paperName)
      onPaperDeleted(paperName)
      toast({
        title: "Success",
        description: `Deleted paper: ${paperName}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete paper",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-80 border-r bg-muted/10">
      <div className="p-4 font-semibold">Generated Papers ({papersList.length})</div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-2 p-4">
          {papersList.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No papers generated yet.</p>
          ) : (
            papersList.map((paper) => (
              <div
                key={paper.name}
                className="group rounded-lg border p-3 hover:bg-muted/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium truncate">{paper.name}</div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(paper.name)}
                      className="opacity-0 group-hover:opacity-100 h-8 w-8"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {paper.has_md && <FileTextIcon className="h-4 w-4" />}
                  {paper.has_tex && <FileIcon className="h-4 w-4" />}
                  {paper.github_url && (
                    <a
                      href={paper.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto hover:text-foreground transition-colors"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
