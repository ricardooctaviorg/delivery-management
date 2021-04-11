import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { UtilService } from './commons/services/util.service';
import { CommonsModule } from './commons/commons.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ AppComponent
  ],entryComponents: [

  ],imports: [ BrowserModule
    , IonicModule.forRoot()
    , AppRoutingModule
    , HttpClientModule
    , CommonsModule
  ],providers: [ UtilService
    , { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],bootstrap: [AppComponent],
})
export class AppModule {}
