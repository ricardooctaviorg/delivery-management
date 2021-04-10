import { Pipe, PipeTransform } from '@angular/core';
import { StatusDelivery } from '../enums/status-delivery.enum';

@Pipe({
  name: 'statusDeliveryIcon'
})
export class StatusDeliveryIcon implements PipeTransform {

  transform(value: string): string {
    let response: string;
    switch(value){
      case StatusDelivery.DELIVERY_PENDING.toString():
        response = 'storefront-outline';
      break;
      case StatusDelivery.DELIVERY_CANCELED.toString():
        response = 'alert-circle-outline';
      break;
      case StatusDelivery.DELIVERY_CONFIRMED.toString():
        response = 'thumbs-up-outline';
      break;
      case StatusDelivery.DELIVERY_PREPARING.toString():
        response = 'bonfire-outline';
      break;
      case StatusDelivery.DELIVERY_ASSIGNED.toString():
        response = 'bag-add-outline';
      break;
      case StatusDelivery.DELIVERY_ONWAY.toString():
        response = 'rocket-outline';
      break;
      case StatusDelivery.DELIVERY_COMPLETE.toString():
        response = 'bag-check-outline';
      break;
      case StatusDelivery.DELIVERY_FAIL.toString():
        response = 'thumbs-down-outline';
      break;

    }
    return response;
  }

}