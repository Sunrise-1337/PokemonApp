import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { SubjectsNotificationService } from 'src/app/services/signals-notification.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit {
  public loaderService = inject(LoaderService);

  private subjectsService = inject(SubjectsNotificationService)
  private cdRef = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.subjectsService.updateLoaderNotificationSubject
      .subscribe(() => {
        this.cdRef.detectChanges()
      })
  }
}
