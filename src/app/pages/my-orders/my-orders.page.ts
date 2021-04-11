import { Component, OnInit } from '@angular/core';
import { StatusDelivery } from '../../commons/enums/status-delivery.enum';
import { InfoManagementService } from '../../commons/services/info-management.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  splitData             : string[];
  titleMain             : string = "MIS ORDENES";
  titleSecondary        : string = "";
    
  countPendingStatus    : number = 0;
  countConfirmedStatus  : number = 0;
  countCanceledStatus   : number = 0;
  countPreparingStatus  : number = 0;
  countAssignedStatus   : number = 0;
  countOnWayStatus      : number = 0;
  countCompleteStatus   : number = 0;
  countFailtStatus      : number = 0;

  iconPendingStatus    : string = StatusDelivery.DELIVERY_PENDING.toString();
  iconConfirmedStatus  : string = StatusDelivery.DELIVERY_CONFIRMED.toString();
  iconCanceledStatus   : string = StatusDelivery.DELIVERY_CANCELED.toString();
  iconPreparingStatus  : string = StatusDelivery.DELIVERY_PREPARING.toString();
  iconAssignedStatus   : string = StatusDelivery.DELIVERY_ASSIGNED.toString();
  iconOnWayStatus      : string = StatusDelivery.DELIVERY_ONWAY.toString();
  iconCompleteStatus   : string = StatusDelivery.DELIVERY_COMPLETE.toString();
  iconFailtStatus      : string = StatusDelivery.DELIVERY_FAIL.toString();
  
  constructor(private infoManagementService : InfoManagementService) { }

  ngOnInit() {

    this.infoManagementService.statusTitle.subscribe(
      statusTitle =>  this.titleSecondary = statusTitle
    );

    this.infoManagementService.countAllStatus.subscribe(
      countAllStatus => {
        this.countPendingStatus   = countAllStatus.countPendingStatus;
        this.countConfirmedStatus = countAllStatus.countConfirmedStatus;
        this.countCanceledStatus  = countAllStatus.countCanceledStatus;
        this.countPreparingStatus = countAllStatus.countPreparingStatus;
        this.countAssignedStatus  = countAllStatus.countAssignedStatus;
        this.countOnWayStatus     = countAllStatus.countOnWayStatus;
        this.countCompleteStatus  = countAllStatus.countCompleteStatus;
        this.countFailtStatus     = countAllStatus.countFailtStatus;
      }
    );

    

  }

}
