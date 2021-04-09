import { Pipe, PipeTransform } from '@angular/core';
import { StatusDelivery } from '../enums/status-delivery.enum';

@Pipe({
  name: 'statusDeliveryTitle'
})
export class StatusDeliveryTitlePipe implements PipeTransform {

  transform(value: any): string {
    let response: string;
    switch(value){
      case StatusDelivery.DELIVERY_PENDING:
        response = ' NUEVAS ';
      break;
      case StatusDelivery.DELIVERY_CONFIRMED:
        response = ' CONFIRMADAS ';
      break;
      case StatusDelivery.DELIVERY_CANCELED:
        response = ' CANCELADAS ';
      break;
      case StatusDelivery.DELIVERY_PREPARING:
        response = ' EN PREPARACIÓN ';
      break;
      case StatusDelivery.DELIVERY_PREPARING:
        response = ' EN PREPARACIÓN ';
      break;
      case StatusDelivery.DELIVERY_ASSIGNED:
        response = ' ASIGNADAS A REPARTIDOR ';
      break;
      case StatusDelivery.DELIVERY_ONWAY:
        response = ' EN CAMINO ';
      break;
      case StatusDelivery.DELIVERY_COMPLETE:
        response = ' ENTREGADAS ';
      break;
      case StatusDelivery.DELIVERY_FAIL:
        response = ' FALLIDAS ';
      break;
    }
    return response;
  }

}
