import { ResultModel } from "./result.model";

export class FilterDataModel {
    sector: string;
    unit: ResultModel;

    constructor(sector: string, name: string, url: string) {
        this.sector = sector;
        this.unit = {
            name,
            url
        }
    }
}