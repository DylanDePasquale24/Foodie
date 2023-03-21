import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LandingComponent } from './landing.component';
import { LoginToolbarComponent } from '../login-toolbar/login-toolbar.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        MatToolbarModule,
        RouterTestingModule
      ],
      declarations: [ 
        LandingComponent,
        LoginToolbarComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should navigate to login page', () => {
    spyOn(router, 'navigate');
    component.goToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should navigate to register page', () => {
    spyOn(router, 'navigate');
    component.goToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should have text elements', () => {
    const element = fixture.nativeElement;
    expect(element.querySelector('h1').textContent).toContain('Foodie');
  });
});
