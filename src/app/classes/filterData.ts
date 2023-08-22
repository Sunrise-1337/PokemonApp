import { Result } from "./result";

export class FilterData{
    sector: string;
    unit: Result;

    constructor(sector: string, name: string, url: string) {
        this.sector = sector;
        this.unit = {
            name,
            url
        }
    }
}