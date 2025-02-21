// src/types/api.ts
export interface PaperInfo {
  name: string
  local_path: string
  has_md: boolean
  has_tex: boolean
  has_pdf: boolean
  github_url: string
  github_status: "active" | "pending" | "error"
}

export interface PaperListResponse {
  papers: PaperInfo[]
  total: number
}

export interface PaperRequest {
  prompt: string
  create_markdown?: boolean
  create_latex?: boolean
}

export interface PaperResponse {
  paper_name: string
  repo_url?: string
  project_dir: string
}
