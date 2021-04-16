import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryDetailPageRoutingModule } from './delivery-detail-routing.module';

import { DeliveryDetailPage } from './delivery-detail.page';
import { CommonsModule } from '../../commons/commons.module';
import { DetailItemsComponent } from './components/detail-items/detail-items.component';
import { DetailLocationComponent } from './components/detail-location/detail-location.component';
import { ProgressBarDeliveryComponent } from './components/progress-bar-delivery/progress-bar-delivery.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , DeliveryDetailPageRoutingModule
    , CommonsModule
    , GoogleMapsModule
  ],
  declarations: [DeliveryDetailPage
  , DetailItemsComponent
  , DetailLocationComponent
  , ProgressBarDeliveryComponent ]
})
export class DeliveryDetailPageModule {}
