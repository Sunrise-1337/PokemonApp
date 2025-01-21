import { ResultModel } from "./result.model"

export class AllResultsResponseModel {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: ResultModel[];

    constructor(count: number, results: ResultModel[]) {
        this.count = count;
        this.results = JSON.parse(JSON.stringify(results));
    }
}