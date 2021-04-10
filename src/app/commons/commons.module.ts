import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { StatusDeliveryTitlePipe } from './pipes/status-delivery-title.pipe';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StatusDeliveryIcon } from './pipes/status-delivery-icon.pipe';

@NgModule({
  declarations: [ 
    HeaderMenuComponent
    , StatusDeliveryTitlePipe
    , HeaderComponent
    , StatusDeliveryIcon
  ],
  imports: [
    CommonModule
    , IonicModule
  ],
  exports:[
    HeaderMenuComponent
    , StatusDeliveryTitlePipe
    , HeaderComponent
    , StatusDeliveryIcon
  ]
})

export class CommonsModule { }
