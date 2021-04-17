import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagCloudModule } from 'angular-tag-cloud-module';
import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    Page1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TagCloudModule,
    HttpClientModule,
    AgWordCloudModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      { path: 'page1', component: Page1Component }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
