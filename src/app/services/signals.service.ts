import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { OnePokemonResponse } from '../interfaces/one-pokemon-response';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {
  pageToBeOpenedOnInit: WritableSignal<number> = signal(1)

  pokemonSignal: WritableSignal<OnePokemonResponse | undefined> = signal(undefined)

  constructor() {}
}
