import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  {
    path: 'modal-select-agent',
    loadChildren: () => import('./pages/modal-select-agent/modal-select-agent.module').then( m => m.ModalSelectAgentPageModule)
  },
  {
    path: 'delivery-detail/:deliveryId/:statusId/:nameCustomer/:phoneCustomer/:orderDate/:confirmDate/:preparingDate/:assignDate/:onWayDate/:deliveryDate/:totalAmount',
    loadChildren: () => import('./pages/delivery-detail/delivery-detail.module').then( m => m.DeliveryDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
