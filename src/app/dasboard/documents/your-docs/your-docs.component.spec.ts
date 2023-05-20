import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourDocsComponent } from './your-docs.component';

describe('YourDocsComponent', () => {
  let component: YourDocsComponent;
  let fixture: ComponentFixture<YourDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
