import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryDetailPage } from './delivery-detail.page';
import { DetailLocationComponent } from './components/detail-location/detail-location.component';
import { DetailItemsComponent } from './components/detail-items/detail-items.component';
import { DetailCustomerComponent } from './components/detail-customer/detail-customer.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryDetailPage
    , children:[
      {
        path: 'detailLocation/:deliveryId'
        , component:DetailLocationComponent
      }, 
     {
      path: 'detailItems/:deliveryId'
      , component:DetailItemsComponent
     }, 
     {
      path: 'detailCustomer/:deliveryId'
      , component:DetailCustomerComponent
     }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryDetailPageRoutingModule {}
