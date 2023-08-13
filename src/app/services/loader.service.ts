import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoaderVisible: WritableSignal<boolean> = signal(false)

  count: number = 0;

  toShowLoader(){
    this.count++
    this.isLoaderVisible.set(true)
  }

  
  toHideLoader(){
    this.count--
    if (this.count === 0) this.isLoaderVisible.set(false)
  }
}