import { Result } from "./result"

export interface AllResultsResponse {
    count: number
    next?: string | null
    previous?: string | null
    results: Result[]
}