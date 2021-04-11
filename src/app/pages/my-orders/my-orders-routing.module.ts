import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOrdersPage } from './my-orders.page';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';

const routes: Routes = [
  {
    path: '',
    component: MyOrdersPage
    , children:[
      {
        path: 'deliveryList/:statusDelivery'
        , component: DeliveryListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrdersPageRoutingModule {}
