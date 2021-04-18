import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController, NavController, MenuController } from '@ionic/angular';
import { UserDelivery } from '../../commons/interfaces/user-delivery';
import { AvatarCatalog } from '../../commons/interfaces/avatar-catalog';
import { SecurityService } from '../../services/security.service';
import { UtilService } from '../../commons/services/util.service';
import { StorageService } from '../../commons/services/storage.service';
import { NgForm } from '@angular/forms';

const AVATAR_DEFAULT                    = "https://www.gravatar.com/userimage/198148610/b33d524a0f57ca40fcbaaf29543baffc?size=120";

const MANAGEMENT_REGISTER_SUCCESS            = "¡ Registro correcto !";
const MANAGEMENT_REGISTER_FAIL               = "No se pudo registrar";
const MANAGEMENT_REGISTER_REQUIRED           = "Favor de completar los datos solicitados";
const MANAGEMENT_REGISTER_SAMEPASS           = "Las contraseñas deben coincidir";
const MANAGEMENT_REGISTER_AGENTIDEXIST       = "Ya existe el nombre de usuaio";
const MANAGEMENT_REGISTER_REQUIRED_AVATAR    = "Favor de Seleccionar un avatar";

const LOGIN_ERROR                       = "Usuario o contraseña invalidos";
const ROLE_MANAGEMENT                   = "management"

const DARK_THEME                        = "dark";

const SUCCESS_TRUE                      = true;
const SUCCESS_FALSE                     = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('mSlides') mSlides: IonSlides;

  myManagementDelivery: UserDelivery = {
    avatar: AVATAR_DEFAULT
    , role: ROLE_MANAGEMENT
  };

  loginManagementDelivery = {
    userId: ''
    , password: ''
  };

  avatar              : string = AVATAR_DEFAULT;
  passwordTmp         : string = "";
  avatartCatalogList  : AvatarCatalog[] = new Array();
  avatarIdCurrent     : string = "";

  avatarSlide = {
    slidesPerView: 10
    , centeredSlides: true
  };

  constructor(private securityService: SecurityService
    , private utilService: UtilService
    , public toastController: ToastController
    , private storageService: StorageService
    , private navController: NavController
    , private menuController: MenuController) { }

    ngOnInit() {
      this.disableMenu();
      this.consumeGetAvatarCatalog();
  
      if(this.storageService.getDarkTheme() == 'T')
        document.body.classList.add(DARK_THEME);
      else if(this.storageService.getDarkTheme() == 'F')
        document.body.classList.remove(DARK_THEME);
    }
  
    ngAfterViewInit() {
      this.mSlides.lockSwipes(true);
    }


  consumeGetAvatarCatalog(): void {
    this.utilService.getAvatarCatalog().subscribe(
      data => {
        this.avatartCatalogList = data as AvatarCatalog[];
      }
    );
  }

  async login(formLogin: NgForm) {
    if (formLogin.invalid)
      this.utilService.showManagementRegisterStatus(MANAGEMENT_REGISTER_REQUIRED, SUCCESS_FALSE);

    const exist = await this.securityService.login(this.loginManagementDelivery.userId, this.loginManagementDelivery.password);
    if(exist)
      this.navController.navigateRoot('my-orders', {
        animated:true
      });
    else
      this.utilService.showManagementRegisterStatus(LOGIN_ERROR, SUCCESS_FALSE);

  }

  async managementRegister(formAgentRegister: NgForm) {
    this.myManagementDelivery.createDate = new Date();
    console.log(formAgentRegister);
    if (formAgentRegister.valid)
      if (this.avatarIdCurrent !== "")
        if (this.myManagementDelivery.password === this.passwordTmp){
          const exist = await this.securityService.registerAgent(this.myManagementDelivery);
          if ( exist == 1 ) {
            this.utilService.showManagementRegisterStatus(MANAGEMENT_REGISTER_SUCCESS, SUCCESS_TRUE);
            formAgentRegister.reset();

            this.navController.navigateRoot('my-orders', {
              animated:true
            });
          }
          else if( exist == 0 )
            this.utilService.showManagementRegisterStatus(MANAGEMENT_REGISTER_AGENTIDEXIST, SUCCESS_FALSE);
          else if( exist == -1 )
            this.utilService.showManagementRegisterStatus(MANAGEMENT_REGISTER_FAIL, SUCCESS_FALSE);
        } 
        else
          this.utilService.showManagementRegisterStatus(MANAGEMENT_REGISTER_SAMEPASS, SUCCESS_FALSE);
      else
        this.utilService.showManagementRegisterStatus(MANAGEMENT_REGISTER_REQUIRED_AVATAR, SUCCESS_FALSE);
    else
      this.utilService.showManagementRegisterStatus(MANAGEMENT_REGISTER_REQUIRED, SUCCESS_FALSE);
  }

  selectAvatar(avatar: AvatarCatalog) {
    this.avatartCatalogList.forEach(
      av => {
        av.selected = false;
      });
    avatar.selected = true;
    this.myManagementDelivery.avatar = avatar.avatarUrl;
    this.avatarIdCurrent = avatar.avatarId;
  }

  showLogin() {
    this.mSlides.lockSwipes(false);
    this.mSlides.slideTo(0);
    this.mSlides.lockSwipes(true);
  }

  showReg() {
    this.mSlides.lockSwipes(false);
    this.mSlides.slideTo(1);
    this.mSlides.lockSwipes(true);
  }

  disableMenu()
  {
    this.menuController.enable(false);
  }

}
