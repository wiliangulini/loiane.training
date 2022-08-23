import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { DropdownService } from './services/dropdown.service';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
  ],
  providers: [DropdownService],
})
export class SharedModule { }
