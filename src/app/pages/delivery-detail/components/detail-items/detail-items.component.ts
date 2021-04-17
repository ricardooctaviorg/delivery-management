import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../commons/services/storage.service';
import { PizzaDelivery } from '../../../../commons/interfaces/pizza-delivery';
import { InfoManagementService } from '../../../../commons/services/info-management.service';

const CURRENT_TITLE   = "order";

@Component({
  selector: 'app-detail-items',
  templateUrl: './detail-items.component.html',
  styleUrls: ['./detail-items.component.scss'],
})
export class DetailItemsComponent implements OnInit {

  pizzaDeliverys  : PizzaDelivery[] = new Array();
  ordersCurrent   : any[]= new Array();
  amountCurrent   : number;

  constructor(private storageService  : StorageService
    , private route                   : ActivatedRoute
    , private infoManagementService   : InfoManagementService) { }

  ngOnInit() {
    this.pizzaDeliverys =  this.storageService.getPizzaDeliverys() as PizzaDelivery[];
    this.route.paramMap.subscribe(
      params => {
        let deliveryIdCurrent: string = String(params.get("deliveryId"));
        deliveryIdCurrent = deliveryIdCurrent.replace(',','');
        for(let a of this.pizzaDeliverys)
          if(a.deliveryId == deliveryIdCurrent){
            this.ordersCurrent = a.orders;
            this.amountCurrent = a.totalAmount;
          }
          this.infoManagementService.sendDetailTypeTltle(CURRENT_TITLE);
      }
    );

    

  }

}
