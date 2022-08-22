import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { DropdownService } from './services/dropdown.service';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent
  ],
  providers: [DropdownService],
})
export class SharedModule { }
