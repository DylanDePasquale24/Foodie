import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSpinner } from '@angular/material/progress-spinner';

import { OverlayModule } from '@angular/cdk/overlay';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { FooterComponent } from 'src/app/footer/footer.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule,
        HttpClientTestingModule,
        OverlayModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatRippleModule,
        ReactiveFormsModule,
        MatAutocompleteModule
      ],
      declarations: [ 
        HomeComponent, 
        ToolbarComponent,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatAutocomplete,
        FooterComponent,
        MatSpinner
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MAT_SELECT_SCROLL_STRATEGY, useValue: () => () => {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add Unit Test for Home Page here
});
