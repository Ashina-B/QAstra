import { Component, ViewChild, viewChild } from '@angular/core';
import { AlertComponent } from '../../../../shared_components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../../services/projects';
import { UsersService } from '../../../../services/users.service';
import { InviteMemberComponent } from './invite-member/invite-member';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-access-control',
  standalone: true, 
  imports: [CommonModule, AlertComponent, InviteMemberComponent],
  templateUrl: './access-control.html',
  styleUrl: './access-control.css'
})
export class AccessControl {
  @ViewChild(InviteMemberComponent) inviteMember!: InviteMemberComponent;
  projectId: string | undefined;
  projects: any;
  project: any;
  user_id: string | null = null;
  errorMessage!:string;
  isSubmitting:boolean = false;
  isVisible: boolean = false;
  // authService: any;
  error_message: string | null = null;
  

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
    public usersService: UsersService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.route.parent?.paramMap.subscribe(params => {
        this.projectId = params.get('projectId')!;
      });
      if (this.projectId){
      this.projectsService.getProjectDetails(this.projectId).subscribe( {
        next: (response: any) => {
          this.project = response;
        },
        error: (error) => {
          this.errorMessage = error.error.message
        }
      });
    }
    });

    this.isSubmitting = false;
  }

  goToGeneralSetting(){
    this.router.navigate([`project/${this.projectId}/settings/general`]);
  }

  onMemberinvited() {
    this.user_id = this.authService.getUserId();
    if (this.user_id) {
      console.log("success")
    }
  }

  open_invite_member(){
    this.inviteMember.displayForm();
  }

}
