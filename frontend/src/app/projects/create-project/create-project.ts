import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProjectsService } from '../../services/projects';
import { AlertComponent } from '../../shared_components/alert/alert.component';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-create-project',
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './create-project.html',
  styleUrl: './create-project.css'
})
export class CreateProjectComponnet {
  createProjectForm!:FormGroup;
  errorMessage!:string;
  isSubmitting:boolean = false;
  isVisible: boolean = false;
  project: any;
  @ViewChild(AlertComponent) appAlert!: AlertComponent;
  @Output() projectCreated = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private projectsService: ProjectsService
  ){}

  ngOnInit(): void{
    this.isSubmitting = false;
    this.createProjectForm = this.formBuilder.group({
      projectName: new FormControl('', [Validators.required]),
      projectDescription: new FormControl('')
    })
  }

  displayForm(){
    this.isVisible=true
  }

  closeForm(){
    this.isVisible=false
  }

  onSubmit(){
    this.isSubmitting = true;
    this.project = {
      name : this.createProjectForm.get('projectName')?.value,
      description : this.createProjectForm.get('projectDescription')?.value,
      created_by: this.authService.getUserId()
    }

    this.projectsService.createProject(this.project).subscribe({
      next: (response) => {
        this.isSubmitting = false
        this.appAlert.showAlert(
          "Success",
          response.message,
          "success"
        );
        this.projectCreated.emit()
        this.createProjectForm.reset();
      },
      error: (error) => {
        this.isSubmitting = false
        this.appAlert.showAlert(
          "Failed",
          error?.error?.message,
          "error"
        );
      }
    })
  }

}
