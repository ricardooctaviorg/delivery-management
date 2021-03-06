import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PizzaDelivery } from '../commons/interfaces/pizza-delivery';
import { StorageService } from '../commons/services/storage.service';
import { environment } from '../../environments/environment';

const GATEWAY_VALUE       = environment.gateway;
const DELIVERY_RESOURCE   = environment.deliveryResource;

const FINDBYSTATUSDELIVERY = GATEWAY_VALUE
  + DELIVERY_RESOURCE
  + '/findByStatusDelivery';

const UPDATEDELIVERY = GATEWAY_VALUE
  + DELIVERY_RESOURCE;

const COUNTALLSTATUS = GATEWAY_VALUE
  + DELIVERY_RESOURCE
  + '/countAllStatus';

@Injectable({
  providedIn: 'root'
})

export class DeliveryManagementService {


  constructor(private httpClient  : HttpClient
    , private storageService      : StorageService) { }

  public findByStatusDelivery(
    statusId: string[]
    , startDate: Date
    , endDate: Date
    , page: string
    , size: string
    , sort: string): Observable<any> {

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());
    const params = new HttpParams()
      .set('statusId', statusId.toString())
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString())
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    const httpOptionsX =
    {
      headers
      , params
    };
    return this.httpClient.get<any>(`${FINDBYSTATUSDELIVERY}`, httpOptionsX);
  }

  public updateDelivery(delivery: PizzaDelivery): Observable<any> {

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());
    const httpOptionsX =
    {
      headers
    };
    return this.httpClient.post<any>(`${UPDATEDELIVERY}/`, delivery, httpOptionsX)
  }

  public countAllStatus(
    startDate: Date
    , endDate: Date): Observable<any> {

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    const httpOptionsX =
    {
      headers
      , params
    };
    return this.httpClient.get<any>(`${COUNTALLSTATUS}`, httpOptionsX);
  }


}
