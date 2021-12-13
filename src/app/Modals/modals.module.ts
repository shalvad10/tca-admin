import { NgModule } from '@angular/core';
import { AppModalComponent } from './app-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { InfoComponent } from './panels/info/info.component';
import { ConfirmComponent } from './panels/confirm/confirm.component';
import { DeletionComponent } from './panels/deletion/deletion.component';
import { AddUserModal } from './panels/add-user/add-user.component';
import { KonsultantebiComponent } from './panels/konsultantebi/konsultantebi.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  declarations: [
    AppModalComponent,
    InfoComponent,
    ConfirmComponent,
    DeletionComponent,
    AddUserModal,
    KonsultantebiComponent
  ],
  imports: [ NgSelectModule, FormsModule, BrowserModule, ComponentsModule ],
  exports: [
    AppModalComponent,
    InfoComponent,
    ConfirmComponent,
    DeletionComponent,
    AddUserModal,
    KonsultantebiComponent
  ]
})

export class ModalsModule {}
