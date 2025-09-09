import { inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class RoutesMetaTagsService {
  private meta = inject(Meta)
  
  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  updateKeywords(key: string) {
    this.meta.updateTag({ name: 'keywords', content: key });
  }
}