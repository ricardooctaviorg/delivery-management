import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoManagementService } from '../../commons/services/info-management.service';
import { StorageService } from '../../commons/services/storage.service';
import { PizzaDelivery } from '../../commons/interfaces/pizza-delivery';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.page.html',
  styleUrls: ['./delivery-detail.page.scss'],
})
export class DeliveryDetailPage implements OnInit {

  preTitle            : string = "";
  titleDetailType     : string;

  delivery            : PizzaDelivery;

  constructor(private router        : Router
    , private route                 : ActivatedRoute
    , private infoManagementService : InfoManagementService
    , private storageService        : StorageService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        const deliveryId        : string        = String(params.get("deliveryId"));
        this.delivery                           = this.storageService.getPizzaDeliveryByDeliveryId(deliveryId);
        }
    );

    this.infoManagementService.detailTypeTitle.subscribe(
      title => {
        this.titleDetailType = title;
      }
    );

    this.router.navigate(['delivery-detail', this.delivery.deliveryId,'detailLocation', this.delivery.deliveryId]);

  }

}
