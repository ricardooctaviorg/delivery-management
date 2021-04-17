import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../commons/services/storage.service';
import { PizzaDelivery } from '../../../../commons/interfaces/pizza-delivery';
import { InfoManagementService } from '../../../../commons/services/info-management.service';

const CURRENT_TITLE   = "info";

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
})
export class DetailCustomerComponent implements OnInit {

  pizzaDelivery  : PizzaDelivery;

  constructor(private route                   : ActivatedRoute
            , private storageService          : StorageService
            , private infoManagementService   : InfoManagementService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let deliveryIdCurrent: string = String(params.get("deliveryId"));
        deliveryIdCurrent = deliveryIdCurrent.replace(',','');
        this.pizzaDelivery = this.storageService.getPizzaDeliveryByDeliveryId(deliveryIdCurrent);
        this.infoManagementService.sendDetailTypeTltle(CURRENT_TITLE);
      }
    );
  }

}
