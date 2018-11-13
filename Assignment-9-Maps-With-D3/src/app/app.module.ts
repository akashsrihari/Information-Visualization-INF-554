import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorldProportionalSymbolComponent } from './world-proportional-symbol/world-proportional-symbol.component';
import { ChloroplethComponent } from './chloropleth/chloropleth.component';
import { LaChloroplethComponent } from './la-chloropleth/la-chloropleth.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldProportionalSymbolComponent,
    ChloroplethComponent,
    LaChloroplethComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
