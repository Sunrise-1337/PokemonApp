import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, WritableSignal, inject } from '@angular/core';
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

  toShow: WritableSignal<boolean> = this.loaderService.isLoaderVisible

  ngOnInit(): void {
    this.subjectsService.updateLoaderNotificationSubject
      .subscribe(res => {
        console.log('loader subscription activated')
        this.cdRef.detectChanges()
      })
  }
}