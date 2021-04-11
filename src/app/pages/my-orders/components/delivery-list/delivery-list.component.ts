import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IonRefresher } from '@ionic/angular';
import { PizzaDelivery } from '../../../../commons/interfaces/pizza-delivery';
import { StorageService } from '../../../../commons/services/storage.service';
import { DeliveryManagementService } from '../../../../services/delivery-management.service';
import { StatusDelivery } from '../../../../commons/enums/status-delivery.enum';
import { InfoManagementService } from '../../../../commons/services/info-management.service';

const PAGE_SIZE       = 10;
const ORDERDATE_DESC  = "orderDate,-1";



@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements OnInit {

  iconPendingStatus       : string = StatusDelivery.DELIVERY_PENDING.toString();
  iconConfirmedStatus     : string = StatusDelivery.DELIVERY_CONFIRMED.toString();
  iconCanceledStatus      : string = StatusDelivery.DELIVERY_CANCELED.toString();
  iconPreparingStatus     : string = StatusDelivery.DELIVERY_PREPARING.toString();
  iconAssignedStatus      : string = StatusDelivery.DELIVERY_ASSIGNED.toString();
  iconOnWayStatus         : string = StatusDelivery.DELIVERY_ONWAY.toString();
  iconCompleteStatus      : string = StatusDelivery.DELIVERY_COMPLETE.toString();
  iconFailtStatus         : string = StatusDelivery.DELIVERY_FAIL.toString();

  pizzaDeliveriesCurrent  : PizzaDelivery[] = new Array();
  pizzaDeliveries         : PizzaDelivery[] = new Array();
  pizzaDelivery           : PizzaDelivery;
  dataResponse            : any;
  pageData                : any;
  pageCurrent             : number  = 1;
  statusDelivery          : string[];
  countPendingOrders      : number  = 0;
  countFinalyOrders       : number  = 0;
  showStatusTitle         : string  = "";
  emptyGroup              : string  = "";

  today   = new Date();
  dd      = String(this.today.getDate()).padStart(2, '0');;
  mm      = String(this.today.getMonth() + 1).padStart(2, '0');
  yyyy    = String(this.today.getFullYear());

  todayStringInit: Date = new Date(Number(this.today.getFullYear()), Number(this.today.getMonth()), Number(this.today.getDate()), 0, 0, 0);
  todayStringEnd: Date = new Date(Number(this.today.getFullYear()), Number(this.today.getMonth()), Number(this.today.getDate()), 23, 59, 59);

  @ViewChild(IonInfiniteScroll) infiniteScroll  : IonInfiniteScroll;
  @ViewChild(IonRefresher) ionRefresher         : IonRefresher;

  constructor(private deliveryManagementService : DeliveryManagementService
    , private route                             : ActivatedRoute
    , private storageService                    : StorageService
    , public modalController                    : ModalController
    , private infoManagementService             : InfoManagementService) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const statusDelivery: string = String(params.get("statusDelivery"));
        this.statusDelivery = statusDelivery.split(",");  
        this.cleanDeliveries();
        this.consumeData(this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      }
    );
  }

  private consumeData(statusId  : string[]
    , startDate                 : Date
    , endDate                   : Date
    , page                      : string
    , size                      : string
    , sort                      : string): void {
    this.deliveryManagementService.findByStatusDelivery(statusId, startDate, endDate, page, size, sort)
      .subscribe(
        data => 
        {
          if (data.success) {
            this.infoManagementService.sendStatusTitle(statusId[0]);

            this.pizzaDeliveriesCurrent = data.deliveries as PizzaDelivery[];
            this.pizzaDeliveries.push(... this.pizzaDeliveriesCurrent);
            this.storageService.setPizzaDeliverys(this.pizzaDeliveries);
            this.pageData = data.page;
            
            this.deliveryManagementService.countAllStatus(startDate, endDate).subscribe(
              data => this.infoManagementService.sendCountAllStatus(data)
            );
          }
        }
      );
  }

  loadData(event) {
    setTimeout(() => {
      this.pageCurrent++;
      this.consumeData(this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      this.infiniteScroll.complete();
    }, 500);
    
  }

  async doRefresh(event) {
    await this.cleanDeliveries();    
    setTimeout(() => {
      this.consumeData(this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      this.ionRefresher.complete();
    }, 1000);
  }

  async cleanDeliveries() {
    this.pizzaDeliveries      = [];
    this.countPendingOrders   = 0;
    this.countFinalyOrders    = 0;
    this.pageCurrent          = 1;
    await this.storageService.setPizzaDeliverys(this.pizzaDeliveries);
  }

}

