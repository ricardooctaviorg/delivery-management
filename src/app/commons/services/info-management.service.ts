import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoManagementService {

  managementInfo = {
    name: ""
    , avatarId: ""
  }

  detailTitleType       : string = "";
  statusTitleAndCountS  : string = "";

  @Output() change              : EventEmitter<any> = new EventEmitter();
  @Output() detailTypeTitle     : EventEmitter<any> = new EventEmitter();
  @Output() statusTitleAndCount : EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendManagementInfo(managementInfo: any) {
    this.managementInfo = managementInfo;
    this.change.emit(this.managementInfo);
  }

  sendDetailTypeTltle(title: string) {
    this.detailTitleType = title;
    this.detailTypeTitle.emit(this.detailTitleType);
  }

  sendStatusTitleAndCount(statusTitleAndCount: string) {
    this.statusTitleAndCountS = statusTitleAndCount;
    this.statusTitleAndCount.emit(this.statusTitleAndCountS);
  }

}
