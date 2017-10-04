import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomCalendarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
