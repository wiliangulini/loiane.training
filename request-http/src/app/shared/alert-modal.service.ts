import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AlertModalComponent} from "./alert-modal/alert-modal.component";

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  private showAlert(message: string, type: AlertTypes) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  constructor(private modalService: BsModalService) {}

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }
  showAlertSuccessr(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS);
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if(okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }

    if(cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;

  }
}
