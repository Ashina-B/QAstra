import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateProjectComponnet } from './create-project';

describe('CreateProjectComponnet', () => {
  let component: CreateProjectComponnet;
  let fixture: ComponentFixture<CreateProjectComponnet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectComponnet, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjectComponnet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
