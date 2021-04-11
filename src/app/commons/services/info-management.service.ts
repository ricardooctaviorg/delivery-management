import { EventEmitter, Injectable, Output } from '@angular/core';
import { StatusDeliveryTitlePipe } from '../pipes/status-delivery-title.pipe';

@Injectable({
  providedIn: 'root'
})
export class InfoManagementService {

  managementInfo = {
    name: ""
    , avatarId: ""
  }

  detailTitleType       : string = "";
  countAllStatusAny     : any;
  statusTitleString     : string = "";

  @Output() change              : EventEmitter<any> = new EventEmitter();
  @Output() detailTypeTitle     : EventEmitter<any> = new EventEmitter();

  @Output() countAllStatus      : EventEmitter<any> = new EventEmitter();
  @Output() statusTitle         : EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendManagementInfo(managementInfo: any) {
    this.managementInfo = managementInfo;
    this.change.emit(this.managementInfo);
  }

  sendDetailTypeTltle(title: string) {
    this.detailTitleType = title;
    this.detailTypeTitle.emit(this.detailTitleType);
  }

  sendCountAllStatus(countAllStatus: any) {
    this.countAllStatusAny = countAllStatus;
    this.countAllStatus.emit(this.countAllStatusAny);
  }

  sendStatusTitle(statusTitle: string) {
    this.statusTitleString = statusTitle;
    this.statusTitle.emit(this.statusTitleString);
  }

}
