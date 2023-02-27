import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterComponent } from './register.component';
import { LoginToolbarComponent } from '../login-toolbar/login-toolbar.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule, 
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule 
      ],
      declarations: [ 
        RegisterComponent,
        LoginToolbarComponent,
        MatToolbar,
        MatFormField
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page on click of "Already have an account?" button', () => {
    spyOn(router, 'navigate');
    component.GoTo();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should return true for a valid email', () => {
    const email = 'email.test@example.com';
    const result = component.isValidEmail(email);
    expect(result).toBeTruthy();
  });

  it('should return false for an invalid email', () => {
    const email = 'email.test.example.com';
    const result = component.isValidEmail(email);
    expect(result).toBeFalsy();
  });
});