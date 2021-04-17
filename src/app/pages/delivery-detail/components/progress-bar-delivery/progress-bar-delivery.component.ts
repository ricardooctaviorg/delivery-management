import { Component, OnInit, Input } from '@angular/core';
import { StatusDelivery } from '../../../../commons/enums/status-delivery.enum';
import { StatusDeliverySuccess } from '../../../../commons/enums/status-delivery-success.enum';
import { StatusDeliveryFailed } from '../../../../commons/enums/status-delivery-failed.enum';
import { PizzaDelivery } from '../../../../commons/interfaces/pizza-delivery';

const VALUE_OF_INCREMENTS   = 0.16666666
const COLOR_COMPLETE        = "success";
const COLOR_IN_PROGRESS     = "tertiary";
const COLOR_FAIL            = "danger";

const COLOR_DISABLED_STATUS = "medium";

@Component({
  selector: 'app-progress-bar-delivery',
  templateUrl: './progress-bar-delivery.component.html',
  styleUrls: ['./progress-bar-delivery.component.scss'],
})
export class ProgressBarDeliveryComponent implements OnInit {

  @Input() dataOfStatusBar: PizzaDelivery;

  statusBarValue          : string;
  statusBarValueBuffer    : string;
  colorOfStatusBar        : string;

  iconPendingStatus       : string = StatusDelivery.DELIVERY_PENDING.toString();
  iconConfirmedStatus     : string = StatusDelivery.DELIVERY_CONFIRMED.toString();
  iconCanceledStatus      : string = StatusDelivery.DELIVERY_CANCELED.toString();
  iconPreparingStatus     : string = StatusDelivery.DELIVERY_PREPARING.toString();
  iconAssignedStatus      : string = StatusDelivery.DELIVERY_ASSIGNED.toString();
  iconOnWayStatus         : string = StatusDelivery.DELIVERY_ONWAY.toString();
  iconCompleteStatus      : string = StatusDelivery.DELIVERY_COMPLETE.toString();
  iconFailtStatus         : string = StatusDelivery.DELIVERY_FAIL.toString();

  arrayStatusColors       : string[] = new Array();
  arrayOfStatus           : string[] = new Array();

  constructor() { }

  ngOnInit() {
    
    this.colorOfStatusBar     = this.getColorStatusBar(this.dataOfStatusBar.status.statusId)
    this.statusBarValueBuffer = this.getStatusBarValue(this.dataOfStatusBar.status.statusId);
    this.statusBarValue       = this.statusBarValueBuffer;
    this.arrayStatusColors    = this.getArrayOfColors(this.dataOfStatusBar.status.statusId);
    this.arrayOfStatus        = this.populateLabelStatus(this.dataOfStatusBar.status.statusId);
  }

  populateLabelStatus(currentStatus: string):string[]{
    let arrayOfStatus           : string[] = new Array();
    let numberOfBreak           : number   = 0;

    numberOfBreak = this.getNumberOfBreak(currentStatus);

    console.log('numberOfBreak', numberOfBreak);

    for(var a = 0; a <6 ; a++){
      arrayOfStatus.push("");
    }

    for(var a = 0; a <=numberOfBreak ; a++)
      switch(a)
      {
        case 0:
          arrayOfStatus[a]  = StatusDelivery.DELIVERY_PENDING.toString();
        break;
        case 1:
          arrayOfStatus[a] = StatusDelivery.DELIVERY_CONFIRMED.toString();
          if(currentStatus == StatusDelivery.DELIVERY_CANCELED.toString())
            arrayOfStatus[a] = StatusDelivery.DELIVERY_CANCELED.toString();
        break;
        case 2:
          arrayOfStatus[a] = StatusDelivery.DELIVERY_PREPARING.toString();
        break;
        case 3:
          arrayOfStatus[a] = StatusDelivery.DELIVERY_ASSIGNED.toString();
        break;
        case 4:
          arrayOfStatus[a] = StatusDelivery.DELIVERY_ONWAY.toString();
        break;
        case 5:
          arrayOfStatus[a] = StatusDelivery.DELIVERY_COMPLETE.toString();
          if(currentStatus == StatusDelivery.DELIVERY_FAIL.toString())
            arrayOfStatus[a] = StatusDelivery.DELIVERY_FAIL.toString();
        break;
      }
    return arrayOfStatus;
  }

  getStatusBarValue(currentStatus: string):string{

    switch(currentStatus)
    {
      case StatusDelivery.DELIVERY_PENDING.toString():
        return String(VALUE_OF_INCREMENTS * 1);
      case StatusDelivery.DELIVERY_CONFIRMED.toString():
      case StatusDelivery.DELIVERY_CANCELED.toString():
        return String(VALUE_OF_INCREMENTS * 2);
      case StatusDelivery.DELIVERY_PREPARING.toString():
        return String(VALUE_OF_INCREMENTS * 3);
      case StatusDelivery.DELIVERY_ASSIGNED.toString():
        return String(VALUE_OF_INCREMENTS * 4);
      case StatusDelivery.DELIVERY_ONWAY.toString():
        return String(VALUE_OF_INCREMENTS * 5);
      case StatusDelivery.DELIVERY_COMPLETE.toString():
      case StatusDelivery.DELIVERY_FAIL.toString():
        return String(VALUE_OF_INCREMENTS * 6);
      default:
        return String(VALUE_OF_INCREMENTS * 0);
    }
  }

  getColorStatusBar(currentStatus: string):string{
    switch(currentStatus)
    {
      case StatusDelivery.DELIVERY_CANCELED.toString():
      case StatusDelivery.DELIVERY_FAIL.toString():
        return COLOR_FAIL;
      case StatusDelivery.DELIVERY_COMPLETE.toString():
        return COLOR_COMPLETE;
      default:
        return COLOR_IN_PROGRESS;
    }
  }

  getArrayOfColors(currentStatus: string):string[]{
 
    let arrayOfColors: string[] = new Array();
    let numberOfBreak: number   = 0;

    for(var a = 0; a <6 ; a++){
      arrayOfColors.push(COLOR_DISABLED_STATUS);
    }

    numberOfBreak = this.getNumberOfBreak(currentStatus);

    for(var a = 0; a <6 ; a++){
      arrayOfColors[a] = COLOR_COMPLETE;
      if(a == numberOfBreak )
        return arrayOfColors;
    }
    return arrayOfColors;
  }

  getNumberOfBreak(currentStatus: string):number{
    let numberOfBreak: number   = 0;

    switch(currentStatus)
    {
      case StatusDelivery.DELIVERY_PENDING.toString():
        numberOfBreak = StatusDeliverySuccess.DELIVERY_PENDING;
      break;
      case StatusDelivery.DELIVERY_CONFIRMED.toString():
        numberOfBreak = StatusDeliverySuccess.DELIVERY_CONFIRMED;
      break;
      case StatusDelivery.DELIVERY_CANCELED.toString():
        numberOfBreak = StatusDeliveryFailed.DELIVERY_CANCELED;
      break;
      case StatusDelivery.DELIVERY_PREPARING.toString():
        numberOfBreak = StatusDeliverySuccess.DELIVERY_PREPARING;
      break;
      case StatusDelivery.DELIVERY_ASSIGNED.toString():
        numberOfBreak = StatusDeliverySuccess.DELIVERY_ASSIGNED;
      break;
      case StatusDelivery.DELIVERY_ONWAY.toString():
        numberOfBreak = StatusDeliverySuccess.DELIVERY_ONWAY;
      break;
      case StatusDelivery.DELIVERY_COMPLETE.toString():
        numberOfBreak = StatusDeliverySuccess.DELIVERY_COMPLETE;
      break;
      case StatusDelivery.DELIVERY_FAIL.toString():
        numberOfBreak = StatusDeliveryFailed.DELIVERY_FAIL;
      break;
    }

    return numberOfBreak;
  }

}
