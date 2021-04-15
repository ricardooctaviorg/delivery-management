import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { StatusDeliveryTitlePipe } from './pipes/status-delivery-title.pipe';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StatusDeliveryIcon } from './pipes/status-delivery-icon.pipe';
import { TypeFailTitlePipe } from './pipes/type-fail-title.pipe';
import { PrettyPhonePipe } from './pipes/pretty-phone.pipe';
import { DetailTypeTitlePipe } from './pipes/detail-type-title.pipe';
import { StatusDeliveryLabelPipe } from './pipes/status-delivery-label.pipe';

@NgModule({
  declarations: [ 
    HeaderMenuComponent
    , StatusDeliveryTitlePipe
    , HeaderComponent
    , StatusDeliveryIcon
    , TypeFailTitlePipe
    , PrettyPhonePipe
    , DetailTypeTitlePipe
    , StatusDeliveryLabelPipe
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
    , TypeFailTitlePipe
    , PrettyPhonePipe
    , DetailTypeTitlePipe
    , StatusDeliveryLabelPipe
  ]
})

export class CommonsModule { }
