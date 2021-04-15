import { Pipe, PipeTransform } from '@angular/core';
import { StatusDelivery } from '../enums/status-delivery.enum';

@Pipe({
  name: 'statusDeliveryLabel'
})
export class StatusDeliveryLabelPipe implements PipeTransform {

  transform(value: any): string {
    let response: string;
    switch(value){
      case StatusDelivery.DELIVERY_PENDING:
        response = ' PENDIENTE ';
      break;
      case StatusDelivery.DELIVERY_CONFIRMED:
        response = ' CONFIRMADA ';
      break;
      case StatusDelivery.DELIVERY_CANCELED:
        response = ' CANCELADA ';
      break;
      case StatusDelivery.DELIVERY_PREPARING:
        response = ' PREPARANDO ';
      break;
      case StatusDelivery.DELIVERY_ASSIGNED:
        response = ' ASIGNADA  ';
      break;
      case StatusDelivery.DELIVERY_ONWAY:
        response = ' EN CAMINO ';
      break;
      case StatusDelivery.DELIVERY_COMPLETE:
        response = ' ENTREGADA ';
      break;
      case StatusDelivery.DELIVERY_FAIL:
        response = ' FALLIDA ';
      break;
    }
    return response;
  }

}
