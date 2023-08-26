import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public loaderService = inject(LoaderService);

  private subjectsService = inject(SubjectsService)
  private cdRef = inject(ChangeDetectorRef)

  ngOnInit(): void {
    // TODO
    // Check Change Detection
    // this.subjectsService.updateViewNotificationSignal.subscribe(res => this.cdRef.markForCheck())
  }
}
