import { Injectable, WritableSignal, signal } from '@angular/core';
import { OnePokemonResponse } from '../interfaces/one-pokemon-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {
  pageToBeOpenedOnInit: WritableSignal<number> = signal(1)

  isDialogCardClosedOnGoingToFullPage: WritableSignal<boolean> = signal(true);

  pokemonSignal: WritableSignal<OnePokemonResponse | undefined> = signal(undefined)

  constructor() {}
}
