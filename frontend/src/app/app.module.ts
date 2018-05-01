import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DocsListComponent } from './docs-list/docs-list.component';
import { DocsListItemComponent } from './docs-list-item/docs-list-item.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '',
    component: DocsListComponent,
    data: { }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DocsListComponent,
    DocsListItemComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
