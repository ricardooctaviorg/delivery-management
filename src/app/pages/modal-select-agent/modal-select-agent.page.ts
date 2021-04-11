import { Component, OnInit, Input } from '@angular/core';
import { UserDelivery } from 'src/app/commons/interfaces/user-delivery';
import { PizzaDelivery } from '../../commons/interfaces/pizza-delivery';
import { DeliveryManagementService } from '../../services/delivery-management.service';
import { SecurityService } from '../../services/security.service';
import { StorageService } from '../../commons/services/storage.service';
import { UtilService } from '../../commons/services/util.service';
import { ModalController } from '@ionic/angular';

const ROLE_AGENT      = "agent";

const SUCCESS_TRUE    = true;
const SUCCESS_FALSE   = false;

@Component({
  selector: 'app-modal-select-agent',
  templateUrl: './modal-select-agent.page.html',
  styleUrls: ['./modal-select-agent.page.scss'],
})
export class ModalSelectAgentPage implements OnInit {

  agents                : UserDelivery[] = new Array();
  pizzaDelivery         : PizzaDelivery;
  success               : boolean = false;
  pizzaDeliveryUpdated  : PizzaDelivery;

  @Input() deliveryId   : string;

  constructor(private deliveryManagementService : DeliveryManagementService
    , private securityService                   : SecurityService
    , private storageService                    : StorageService
    , private utilService                       : UtilService
    , public modalController                    : ModalController ) { }

  ngOnInit() {
    this.securityService.getUsersByRole(ROLE_AGENT).subscribe(
      data => this.agents = data as UserDelivery[]
    );
  }

  assignAgentToDelivery(agent: UserDelivery, deliveryId: string){
    this.pizzaDelivery                = this.storageService.getPizzaDeliveryByDeliveryId(deliveryId);
    this.pizzaDelivery.agent.agentId  = agent.userId;
    this.pizzaDelivery.agent.name     = agent.name;
    this.pizzaDelivery.agent.phone    = agent.phone;

    this.deliveryManagementService.updateDelivery(this.pizzaDelivery).subscribe(
      data => {
        this.success = true;
        this.pizzaDeliveryUpdated = data.delivery as PizzaDelivery;
        this.utilService.showAssignAgent(SUCCESS_TRUE);
        this.dismissModalAgent();
      }, err => {
        this.utilService.showAssignAgent(SUCCESS_FALSE);
      }
    );
  }

  dismissModalAgent() {
    this.modalController.dismiss({
      'dismissed'               : true
      , 'success'               : this.success
      , 'pizzaDeliveryUpdated'  : this.pizzaDeliveryUpdated
    });
  }

}
