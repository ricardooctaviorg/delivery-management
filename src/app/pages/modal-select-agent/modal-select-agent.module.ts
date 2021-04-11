import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSelectAgentPageRoutingModule } from './modal-select-agent-routing.module';

import { ModalSelectAgentPage } from './modal-select-agent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSelectAgentPageRoutingModule
  ],
  declarations: [ModalSelectAgentPage]
})
export class ModalSelectAgentPageModule {}
