import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrdersPageRoutingModule } from './my-orders-routing.module';

import { MyOrdersPage } from './my-orders.page';
import { CommonsModule } from '../../commons/commons.module';
import { HttpClientModule } from '@angular/common/http';
import { DeliveryManagementService } from '../../services/delivery-management.service';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , MyOrdersPageRoutingModule
    , HttpClientModule
    , CommonsModule
  ], declarations: [
    MyOrdersPage
    , DeliveryListComponent
  ], providers:[
    DeliveryManagementService
  ]
})
export class MyOrdersPageModule {}
