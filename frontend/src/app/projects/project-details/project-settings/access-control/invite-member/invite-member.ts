import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { ProjectsService } from '../../../../../services/projects';
import { AlertComponent } from '../../../../../shared_components/alert/alert.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invite-member',
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './invite-member.html',
  styleUrl: './invite-member.css'
})
export class InviteMemberComponent {
  inviteMemberForm!:FormGroup;
  errorMessage!:string;
  isSubmitting:boolean = false;
  isVisible: boolean = false;
  user_id: string | null = null;
  user: any;
  @ViewChild(AlertComponent) appAlert!: AlertComponent;
  @Output() memberInvited = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private projectsService: ProjectsService
  ){}

  ngOnInit(): void{
    this.user_id = this.authService.getUserId();
    this.isSubmitting = false;
    this. inviteMemberForm= this.formBuilder.group({
      emailAddress: new FormControl('', [Validators.required])
    })
  }

  displayForm(){
    this.isVisible=true;
  }

  closeForm(){
    this.isVisible=false;
  }

  onSubmit(){
    this.isSubmitting = true;
    this.user = {
      email : this.inviteMemberForm.get('emailAddress')?.value
    }

    console.log(this.user);

    this.memberInvited.emit();


    // this.projectsService.createProject(this.project).subscribe({
    //   next: (response) => {
    //     this.isSubmitting = false
    //     this.appAlert.showAlert(
    //       "Success",
    //       response.message,
    //       "success"
    //     );
    //     this.projectCreated.emit()
    //     this.inviteMemberForm.reset();
    //   },
    //   error: (error) => {
    //     this.isSubmitting = false
    //     this.appAlert.showAlert(
    //       "Failed",
    //       error?.error?.message,
    //       "error"
    //     );
    //   }
    // })
  }
}
