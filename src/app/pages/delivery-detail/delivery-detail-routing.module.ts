import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryDetailPage } from './delivery-detail.page';
import { DetailLocationComponent } from './components/detail-location/detail-location.component';
import { DetailItemsComponent } from './components/detail-items/detail-items.component';

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
     } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryDetailPageRoutingModule {}
