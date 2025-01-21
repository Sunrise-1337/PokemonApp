import { Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { filter, map, mergeMap } from 'rxjs';
import { RoutesMetaTagsService } from './services/routes-meta-tags.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, LoaderComponent, FooterComponent]
})
export class AppComponent{
    private router = inject(Router)
    private activatedRoute = inject(ActivatedRoute)
    private routMeta = inject(RoutesMetaTagsService)


    ngOnInit() {
        this.router.events
            .pipe(
                filter((event: any) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route) => route.outlet === "primary"),
                mergeMap((route) => route.data)
            )
            .subscribe((event: any) => {
                this.routMeta.updateDescription(event["description"]);
                this.routMeta.updateKeywords(event["keywords"]);
            });
    }
}
