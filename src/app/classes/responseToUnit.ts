import { getPokemonLink } from "../helpers/helper";
import { OnePokemonResponse } from "../interfaces/one-pokemon-response";

export class ResponseToUnit{
    name: string;
    url: string;

    constructor(responseModel: OnePokemonResponse){
        this.name = responseModel.name;
        this.url = getPokemonLink(responseModel.id)
    }
}