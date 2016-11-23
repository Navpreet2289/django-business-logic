import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { BaseService } from "../../services/base.service";

@Component({
  selector: 'version',
  template: `
            <breadcrumb [params]="params"></breadcrumb>
            
            <div class="ui container segment">
              <div class="ui relaxed divided list">
                  <div class="item" *ngFor="let version of versions" (click)="onSelect(version)">
                    <div class="content">
                        <a class="header">{{version.title}}</a>
                        <div class="description">{{version.description}}</div>
                    </div>
                  </div>
              </div>
            </div>`
})

export class VersionComponent{
  private versions;
  private params: any = {
    "Interface": 'Interface',
    "Program": 'Program',
    "Version": 'Version'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: BaseService){

  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.base.fetchAll( +params["interfaceID"], +params["programID"] ).subscribe(() => {
        this.versions = this.base.versions.getCollection();

        this.params["Interface"] = this.base.programInterfaces.getCurrent().getTitle();
        this.params["Program"] = this.base.programs.getCurrent().getTitle();
      });

    });



  }

  onSelect(version: any) {
    this.base.versions.setCurrent(version);
    this.router.navigate([this.base.versions.getCurrent().getID()], { relativeTo: this.route });

  }
}
