import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { ToolbarComponent } from './toolbar.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        MatIconModule,
        MatMenuModule,
        MatDialogModule
      ],
      declarations: [
      ToolbarComponent, 
      MatToolbar
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
