import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { PizzaDelivery } from '../../../../commons/interfaces/pizza-delivery';
import { StorageService } from '../../../../commons/services/storage.service';
import { InfoManagementService } from '../../../../commons/services/info-management.service';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { environment } from '../../../../../environments/environment.local';

const DELIVERY_LOCATION   = "location";
const MAPID_LIGTH         = environment.MapIdLigth;
const MAPID_DARK          = environment.MapIdDark;
const MAP_ZOOM            = 18;

@Component({
  selector: 'app-detail-location',
  templateUrl: './detail-location.component.html',
  styleUrls: ['./detail-location.component.scss'],
})
export class DetailLocationComponent implements OnInit {

  @ViewChild(MapInfoWindow, {static: true}) infoWindow: MapInfoWindow;

  pizzaDeliverys    : PizzaDelivery[] = new Array();
  addressCurrent    : any;
  destination       : string;
  toLat             : string;
  toLng             : string;
  markerPositions   : google.maps.LatLngLiteral[] = new Array();
  center            : any ={};
  optionsMap        : any = {
    mapId: MAPID_DARK
  }
  
  markerOptions = {
    draggable: false
    , icon: 'https://www.gravatar.com/userimage/198148610/ce12f241dc0f98f30cef454f0f50ba53?size=120'
    
  };
  zoom          = MAP_ZOOM;
  
  constructor(private storageService  : StorageService
    , private route                   : ActivatedRoute
    , public actionSheetController    : ActionSheetController
    , private infoManagementService   : InfoManagementService) { }

  ngOnInit() {
    this.pizzaDeliverys =  this.storageService.getPizzaDeliverys() as PizzaDelivery[];
    this.route.paramMap.subscribe(
      params => {
        let deliveryIdCurrent: string = String(params.get("deliveryId"));
        deliveryIdCurrent = deliveryIdCurrent.replace(',','');
        for(let a of this.pizzaDeliverys)
          if(a.deliveryId == deliveryIdCurrent)
            this.addressCurrent = a.address;
        this.toLat = this.addressCurrent.lat;
        this.toLng = this.addressCurrent.lng;
        this.destination = this.toLat + ',' + this.toLng;
        this.infoManagementService.sendDetailTypeTltle(DELIVERY_LOCATION);
        this.center           = {lat: Number(this.toLat), lng: Number(this.toLng)};
        this.markerPositions.push(this.center);
      }
    );
  }

  onClick(){
    this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Abrir con:',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Waze',
        icon: '',
        handler: () => {
          window.open("https://waze.com/ul?ll="+this.destination+"&navigate=yes&z=10");
        }
      }, {
        text: 'Google Maps',
        icon: '',
        handler: () => {
          window.open("https://www.google.com/maps/search/?api=1&query="+this.destination)
        }
      }]
    });
    await actionSheet.present();
  }

}
