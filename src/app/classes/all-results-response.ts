import { Result } from "../classes/result"

export class AllResultsResponse {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Result[];

    constructor(count: number, results: Result[]) {
        this.count = count;
        this.results = JSON.parse(JSON.stringify(results));
    }
}