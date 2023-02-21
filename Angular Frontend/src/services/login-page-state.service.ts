import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginPageStateService {

  private onLoginPageSource = new BehaviorSubject<boolean>(true);
  onLoginPage$ = this.onLoginPageSource.asObservable();

  setOnLoginPage(value: boolean) {
    this.onLoginPageSource.next(value);
  }

}
