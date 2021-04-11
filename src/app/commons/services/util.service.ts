import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MenuOpt } from '../interfaces/menu-opt';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { StatusDelivery } from '../enums/status-delivery.enum';
import { ToastController } from '@ionic/angular';
import { StatusDeliveryIcon } from '../enums/status-delivery-icon.enum';

const PATH_MAINMENU_OPTIONS       = "/assets/json/mainMenu.json";
const TOAST_DURATION              = 5000;
const TOAST_TRANSLUCENT           = false;
const TOAST_POSITION              = "bottom";
const TOAST_COLOR_SUCCESS_TRUE    = "tertiary";
const TOAST_COLOR_SUCCESS_FALSE   = "danger";
const TOAST_KEYBOARD_CLOSE        = false;
const TOAST_ICON_SUCCESS_TRUE     = "happy";
const TOAST_ICON_SUCCESS_FALSE    = "alert";

const GATEWAY_VALUE         = environment.gateway;
const AVATAR_RESOURCE       = environment.avatarResource;
const TYPEFAIL_RESOURCE     = environment.typeFailResource;

const GETAVATARS = GATEWAY_VALUE
  + AVATAR_RESOURCE
  + "/getByType";

const GETTYPEFAILS = GATEWAY_VALUE
  + TYPEFAIL_RESOURCE;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private httpClient    : HttpClient
    , public toastController        : ToastController) { }

  public getMainMunuOptions(){
    return this.httpClient.get<MenuOpt[]>(PATH_MAINMENU_OPTIONS);
  }

  public getAvatarCatalog(): Observable<any> {
    const params = new HttpParams()
      .set('avatarType', 'agent')

    const httpOptionsX =
    {
      params
    };
    return this.httpClient.get<any>(`${GETAVATARS}`, httpOptionsX);
  }

  public getTypeFailsDelivery(): Observable<any> {
    return this.httpClient.get<any>(`${GETTYPEFAILS}`);
  }

  async showAgentRegisterStatus(notice: string, success: boolean) {

    var typeAlert       : string = TOAST_COLOR_SUCCESS_FALSE;
    var iconToast       : string = TOAST_ICON_SUCCESS_FALSE;

    if (success){
      typeAlert = TOAST_COLOR_SUCCESS_TRUE;
      iconToast = TOAST_ICON_SUCCESS_TRUE;
    }

    const toast = await this.toastController.create({
      message           : notice
      , duration        : TOAST_DURATION
      , color           : typeAlert
      , keyboardClose   : TOAST_KEYBOARD_CLOSE
      , position        : TOAST_POSITION
      , translucent     : TOAST_TRANSLUCENT
      , buttons         : [
        {
          side: 'start',
          icon: iconToast,
        },{
          side: 'end',
          text: 'CERRAR',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async showAgentUpdateStatus(notice: string, success: boolean) {
    
    var typeAlert       : string = TOAST_COLOR_SUCCESS_FALSE;
    var iconToast       : string = TOAST_ICON_SUCCESS_FALSE;

    if (success){
      typeAlert = TOAST_COLOR_SUCCESS_TRUE;
      iconToast = TOAST_ICON_SUCCESS_TRUE;
    }

    const toast = await this.toastController.create({
      message           : notice
      , duration        : TOAST_DURATION
      , color           : typeAlert
      , keyboardClose   : TOAST_KEYBOARD_CLOSE
      , position        : TOAST_POSITION
      , translucent     : TOAST_TRANSLUCENT
      , buttons         : [
        {
          side: 'start',
          icon: iconToast,
        },{
          side: 'end',
          text: 'CERRAR',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });
    toast.present();

  }

  async showStatus(status: string, success: boolean) {

    var messageCurrent  : string = "";
    var typeAlert       : string = TOAST_COLOR_SUCCESS_FALSE;
    var iconToast       : string = TOAST_ICON_SUCCESS_FALSE;

    if (success)
      typeAlert = TOAST_COLOR_SUCCESS_TRUE;

      switch (status) {
        case StatusDelivery.DELIVERY_PENDING.toString():
          if (success){
            messageCurrent  = "Se ha reactivado el pedido";
            iconToast       = StatusDeliveryIcon.DELIVERY_PENDING.toString();
          }
          else
            messageCurrent = "No se ha podido reactivar el pedido";
          break;
        case StatusDelivery.DELIVERY_CANCELED.toString():
          if (success){
            messageCurrent  = "Se ha cancelado el pedido";
            iconToast       = StatusDeliveryIcon.DELIVERY_CANCELED.toString();
          }
          else
            messageCurrent = "No se ha podido cancelar el pedido";
          break;
        case StatusDelivery.DELIVERY_CONFIRMED.toString():
          if (success){
            messageCurrent  = "Se ha confirmado el pedido";
            iconToast       = StatusDeliveryIcon.DELIVERY_CONFIRMED.toString();
          }
          else
            messageCurrent = "Se ha confirmado el pedido";
          break;
        case StatusDelivery.DELIVERY_PREPARING.toString():
          if (success){
            messageCurrent  = "El pedido se ha enviado a preparación";
            iconToast       = StatusDeliveryIcon.DELIVERY_PREPARING.toString();
          }
          else
            messageCurrent = "El pedido no se ha podido enviar a preparación";
          break;
        case StatusDelivery.DELIVERY_ASSIGNED.toString():
          if (success){
            messageCurrent  = "El pedido se ha asignado al Repartidor";
            iconToast       = StatusDeliveryIcon.DELIVERY_ASSIGNED.toString();
          }
          else
            messageCurrent = "No se ha podido asignar el pedido al Repartidor";
          break;
      }

    const toast = await this.toastController.create({
      message         : messageCurrent
      , duration      : TOAST_DURATION
      , color         : typeAlert
      , keyboardClose : TOAST_KEYBOARD_CLOSE
      , position      : TOAST_POSITION
      , translucent   : TOAST_TRANSLUCENT
      , buttons       : [
        {
          side: 'start',
          icon: iconToast,
        },{
          side: 'end',
          text: 'CERRAR',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });
    await toast.present();
  }

  async showAssignAgent(success: number) {

    var messageCurrent  : string = "No se ha podido asignar al repartidor";
    var typeAlert       : string = "danger";

        if (success){
          typeAlert       = "success";
          messageCurrent  = "El repartidor se ha asignado correctamente";
        }
        
        const toast = await this.toastController.create({
          message: messageCurrent
          , duration: 3000
          , color: typeAlert
          , keyboardClose: true
          , position: "top"
          , translucent: false
        });
        toast.present();
  }

}
