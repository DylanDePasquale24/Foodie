import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginToolbarComponent } from '../login-toolbar/login-toolbar.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        HttpClientTestingModule,
        FormsModule, 
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ 
        LoginComponent,  
        LoginToolbarComponent,
        MatToolbar,
        MatFormField,
        MatLabel
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error message if email is missing', () => {
    component.email = null;
    component.password = 'testPassword';
    component.Submit();
    expect(component.showErrorFlag).toBeTrue();
    expect(component.errorMessage).toBe('Please enter a value for all required fields. Please try again.');
  });

  it('should throw error message if password is missing', () => {
    component.email = 'testEmail@email.com';
    component.password = null;
    component.Submit();
    expect(component.showErrorFlag).toBeTrue();
    expect(component.errorMessage).toBe('Please enter a value for all required fields. Please try again.');
  });

  it('should make a POST request to the server and navigate to home', () => {
    const testResponse: any = { jwt: 'testToken' };
    component.email = 'testEmail';
    component.password = 'testPassword';
    spyOn(router, 'navigate');
    component.Submit();

    const req = httpTestingController.expectOne('http://localhost:8080/login');
    expect(req.request.method).toBe('POST');
    req.flush(testResponse);

    expect(component.loadingSpinner).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['home']);

    // Check that the token was stored in local storage (FAILS HERE)
    expect(localStorage.getItem('token')).toBe(testResponse.jwt);
  });

  it('should set error message and clear form fields on error', () => {
    spyOn(console, 'log');
    component.email = 'testEmail@email.com';
    component.password = 'wrongPassword';
    component.Submit();

    const req = httpTestingController.expectOne('http://localhost:8080/login');
    expect(req.request.method).toBe('POST');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(component.loadingSpinner).toBeFalse();
    expect(component.showErrorFlag).toBeTrue();
    expect(component.errorMessage).toBe('Username or Password is Incorrect! Please try again.');
    expect(component.email).toBeNull();
    expect(component.password).toBeNull();
    expect(console.log).toHaveBeenCalled();
  });


  it('should navigate to register page', () => {
    spyOn(router, 'navigate');
    component.GoTo();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

});
