import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuOpt } from './commons/interfaces/menu-opt';
import { UtilService } from './commons/services/util.service';
import { InfoManagementService } from './commons/services/info-management.service';
import { SecurityService } from './services/security.service';
import { StorageService } from './commons/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menuOpts  :Observable<MenuOpt[]>;
  nameAgent : string = "";

  managementInfoCurrent = {
    name: ""
    , avatar: ""
  }
  constructor(private utilService       : UtilService
    , private infoManagementService     : InfoManagementService
    , private securityService           : SecurityService
    , private storageService            : StorageService) {

      this.menuOpts = this.utilService.getMainMunuOptions();
      if(this.storageService.getDarkTheme() === 'T' 
      || this.storageService.getDarkTheme() === ''
      || this.storageService.getDarkTheme() === null
      || this.storageService.getDarkTheme() === undefined){
        document.body.classList.add('dark');
        this.storageService.updateDarkTheme('T');
      }
      else if(this.storageService.getDarkTheme() == 'F'){
        document.body.classList.remove('dark');
        this.storageService.updateDarkTheme('F');
      }

      this.infoManagementService.managementInfoMenu.subscribe(
        managementInfo => {
          this.managementInfoCurrent = managementInfo;
        }
      );
    }

    logOut(){
      this.securityService.logOut();
    }
}
