import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedPropertiesService {
  private messageSource = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(sharedEmail: string) {
    this.messageSource.next(sharedEmail)
  }

  private registerMessage = new BehaviorSubject("");
  regMessage = this.registerMessage.asObservable();


  changeRegisterMessage(sharedEmail: string) {
    this.registerMessage.next(sharedEmail)
  }

  

}
