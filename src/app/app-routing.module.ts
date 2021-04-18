import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ManagementDeliveryGuard } from './guards/management-delivery.guard';

const routes: Routes = [
  {
    path: ''
    , pathMatch: 'full'
    , redirectTo: 'login'
  },{
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },{
    path: 'my-orders',
    loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
    , canLoad: [
      ManagementDeliveryGuard
    ]
  },{
    path: 'delivery-detail/:deliveryId',
    loadChildren: () => import('./pages/delivery-detail/delivery-detail.module').then( m => m.DeliveryDetailPageModule)
    , canLoad: [
      ManagementDeliveryGuard
    ]
  },{
    path: 'modal-select-agent',
    loadChildren: () => import('./pages/modal-select-agent/modal-select-agent.module').then( m => m.ModalSelectAgentPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
