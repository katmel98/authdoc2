import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DocsListComponent } from './docs-list/docs-list.component';
import { FormsModule } from '@angular/forms';

import { Logger } from './logger.service';
import { DocumentationService } from './documentation.service';
import { DocumentationResolver } from './documentation-resolver.service';

const appRoutes: Routes = [
  { path: '',
    component: DocsListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DocsListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [
    Logger,
    DocumentationService,
    DocumentationResolver
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
