import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { AvatarCatalog } from '../../commons/interfaces/avatar-catalog';
import { UserDelivery } from '../../commons/interfaces/user-delivery';
import { StorageService } from '../../commons/services/storage.service';
import { SecurityService } from '../../services/security.service';
import { UtilService } from '../../commons/services/util.service';
import { NgForm } from '@angular/forms';

const SUCCESS_TRUE                = true;
const SUCCESS_FALSE               = false;

const MANAGEMENTUPDATE_SUCCESS         = "¡ Actualización correcta !";
const MANAGEMENTUPDATE_FAIL            = "No se puedo actulizar";
const MANAGEMENTUPDATE_REQUIRED        = "Favor de completar los datos solicitados";

@Component({
  selector: 'app-my-configuration',
  templateUrl: './my-configuration.page.html',
  styleUrls: ['./my-configuration.page.scss'],
})
export class MyConfigurationPage implements OnInit {

  darkMode            : boolean;
  avatartCatalogList  : AvatarCatalog[] = new Array();
  avatarIdCurrent     : string = "";

  managementDeliveryCurrent: UserDelivery={
    name: ""
    , phone: ""
    , avatar: ""
    , password: ""
  }

  avatarSlide = {
    slidesPerView: 10
    , centeredSlides: true
  };

  @ViewChild('aSlides') aSlides: IonSlides;

  constructor(private storageService  : StorageService
    , private securityService         : SecurityService
    , private utilService             : UtilService
    , public toastController          : ToastController) { }

    async ngOnInit() {
      await this.consumeGetAvatarCatalog();
      this.managementDeliveryCurrent = this.securityService.getAgentDeliveryCurrent();
      this.selectAvatarBySource(this.managementDeliveryCurrent.avatar);
      if(this.storageService.getDarkTheme()== 'F'){
        this.darkMode = false;
        document.body.classList.remove('dark');
      }else if(this.storageService.getDarkTheme() == 'T'){
        this.darkMode = true;
        document.body.classList.add('dark');
      }
     
      /*const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      if(!prefersDark.matches)
        this.darkModeSystem = false;*/
    }
  
    consumeGetAvatarCatalog() {
      return new Promise(
        resolve => {
          this.utilService.getAvatarCatalog().subscribe(
            data => {
              this.avatartCatalogList = data as AvatarCatalog[];
              resolve(true);
            }
          );
        }
      );
  
    }
  
    switch(){
      if(!this.darkMode){
        document.body.classList.remove('dark');
        this.storageService.updateDarkTheme('F');
      }else if(this.darkMode){
        document.body.classList.add('dark');
        this.storageService.updateDarkTheme('T');
      }
  
    }
  
    async managementUpdate(formManagementUpdate: NgForm) {
  
      if (formManagementUpdate.invalid)
        this.utilService.showManagementUpdateStatus(MANAGEMENTUPDATE_REQUIRED, SUCCESS_FALSE);
      else {
        const updateStatus = await this.securityService.updateManagementDelivery(this.managementDeliveryCurrent);
        if (updateStatus)
          this.utilService.showManagementUpdateStatus(MANAGEMENTUPDATE_SUCCESS, SUCCESS_TRUE);
        else
          this.utilService.showManagementUpdateStatus(MANAGEMENTUPDATE_FAIL, SUCCESS_FALSE);
      }
    }
  
    selectAvatar(avatar: AvatarCatalog) {
      this.avatartCatalogList.forEach(
        av => {
          av.selected = false;
        });
      avatar.selected = true;
      this.managementDeliveryCurrent.avatar = avatar.avatarUrl;
      this.avatarIdCurrent = avatar.avatarId;
    }
  
    selectAvatarBySource(avatarSrc: string) {
      let a = 0;
      this.avatartCatalogList.forEach(
        av => {
          a++;
          av.selected = false;
          if( av.avatarUrl === avatarSrc){
            av.selected = true;
            this.aSlides.slideTo(a-1, 1500);
            this.managementDeliveryCurrent.avatar = av.avatarUrl;
            this.avatarIdCurrent = av.avatarId;
          } 
        });
    }

}
