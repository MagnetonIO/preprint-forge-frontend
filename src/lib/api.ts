// src/lib/api.ts
import { PaperRequest, PaperResponse, PaperList } from '@/types/api'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function generatePaper(request: PaperRequest): Promise<PaperResponse> {
  const response = await fetch(`${API_BASE}/api/v1/papers/`, { // Fixed incorrect endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to generate paper')
  }

  return response.json()
}

export async function listPapers(showGithub = true): Promise<PaperList> {
  const response = await fetch(`${API_BASE}/api/v1/papers/?show_github=${showGithub}`) // Fixed incorrect endpoint

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Error Fetching Papers:", errorText)
    throw new Error(`Failed to fetch papers: ${errorText}`)
  }

  return response.json()
}

export async function deletePaper(paperName: string, deleteRepo = true): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/api/v1/papers/${paperName}/`, { // Fixed incorrect endpoint
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ delete_repo: deleteRepo }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to delete paper')
  }

  return response.json()
}
