import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { InviteMemberComponent } from './invite-member';

describe('InviteMember', () => {
  let component: InviteMemberComponent;
  let fixture: ComponentFixture<InviteMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteMemberComponent],
      providers: [ provideHttpClient() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
