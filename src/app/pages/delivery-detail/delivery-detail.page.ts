import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoManagementService } from '../../commons/services/info-management.service';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.page.html',
  styleUrls: ['./delivery-detail.page.scss'],
})
export class DeliveryDetailPage implements OnInit {

  preTitle            : string = "DETALLE DE ";
  deliveryIdCurrent   : string;
  statusIdCurrent     : string;
  titleDetailType     : string;
  nameCustomer        : string;
  phoneCustomer       : string;

  orderDateString     : string;
  confirmDateString   : string;
  preparingDateString : string;
  onWayDateString     : string;
  assignDateString    : string;
  deliveryDateString  : string;

  orderDate           : Date    = null;
  confirmDate         : Date    = null;
  preparingDate       : Date    = null;
  assignDate          : Date    = null;
  onWayDate           : Date    = null;
  deliveryDate        : Date    = null;

  totalAmount         : string;

  dataOfStatusBar     : any ={
    deliveryIdCurrent : ""
    , currentStatus   : ""
    , customerName    : ""
    , customerPhone   : ""
    , orderDate     : null
    , confirmDate   : null
    , preparingDate : null
    , assignDate    : null
    , onWayDate     : null
    , deliveryDate  : null
  }

  constructor(private router        : Router
    , private route                 : ActivatedRoute
    , private infoManagementService : InfoManagementService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        const deliveryId        : string        = String(params.get("deliveryId"));
        const statusId          : string        = String(params.get("statusId"));
        const nameCustomerB64   : string        = String(params.get("nameCustomer"));
        const phoneCustomerB64  : string        = String(params.get("phoneCustomer"));
        const orderDate         : string        = String(params.get("orderDate"));
        const confirmDate       : string        = String(params.get("confirmDate"));
        const preparingDate     : string        = String(params.get("preparingDate"));
        const assignDate        : string        = String(params.get("assignDate"));
        const onWayDate         : string        = String(params.get("onWayDate"));
        const deliveryDate      : string        = String(params.get("deliveryDate"));
        const totalAmountS      : string        = String(params.get("totalAmount"));
          
        this.deliveryIdCurrent                  = deliveryId;
        this.statusIdCurrent                    = statusId;
        this.nameCustomer                       = nameCustomerB64;
        this.phoneCustomer                      = phoneCustomerB64;
          
        this.orderDateString                    = orderDate;
        this.confirmDateString                  = confirmDate;
        this.preparingDateString                = preparingDate;
        this.assignDateString                   = assignDate;
        this.onWayDateString                    = onWayDate;
        this.deliveryDateString                 = deliveryDate;
          
        this.totalAmount                        = totalAmountS;
          
        this.orderDate                          = params.get("orderDate")!=='null'?new Date(params.get("orderDate")):null;
        this.confirmDate                        = params.get("confirmDate")!=='null'?new Date(params.get("confirmDate")):null;
        this.preparingDate                      = params.get("preparingDate")!=='null'?new Date(params.get("preparingDate")):null;
        this.assignDate                         = params.get("assignDate")!=='null'?new Date(params.get("assignDate")):null;
        this.onWayDate                          = params.get("onWayDate")!=='null'?new Date(params.get("onWayDate")):null;
        this.deliveryDate                       = params.get("deliveryDate")!=='null'?new Date(params.get("deliveryDate")):null;

        this.dataOfStatusBar.deliveryIdCurrent  = this.deliveryIdCurrent;
        this.dataOfStatusBar.currentStatus      = this.statusIdCurrent;
        this.dataOfStatusBar.customerName       = this.nameCustomer;
        this.dataOfStatusBar.customerPhone      = this.phoneCustomer;
        this.dataOfStatusBar.orderDate          = this.orderDate;
        this.dataOfStatusBar.confirmDate        = this.confirmDate;
        this.dataOfStatusBar.preparingDate      = this.preparingDate;
        this.dataOfStatusBar.assignDate         = this.assignDate;
        this.dataOfStatusBar.onWayDate          = this.onWayDate;
        this.dataOfStatusBar.deliveryDate       = this.deliveryDate;
        
        }
    );

    this.infoManagementService.detailTypeTitle.subscribe(
      title => {
        this.titleDetailType = title;
      }
    );

  }

}
