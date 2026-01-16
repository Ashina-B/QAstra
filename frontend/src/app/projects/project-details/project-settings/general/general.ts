import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../../services/projects';
import { AlertComponent } from '../../../../shared_components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-general',
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './general.html',
  styleUrl: './general.css'
})
export class General {
  projectId: string | undefined;
  editProjectForm!:FormGroup;
  errorMessage!:string;
  isSubmitting:boolean = false;
  isVisible: boolean = false;
  project: any;
  @ViewChild(AlertComponent) appAlert!: AlertComponent;
  @Output() projectUpdated = new EventEmitter<any>();
  payload: any;

  constructor(
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
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

          console.log(this.project)
          
          this.editProjectForm.patchValue({
            projectName: this.project[0].project.name,
            projectDescription: this.project[0].project.description
          });
        },
        error: (error) => {
          this.errorMessage = error.error.message
        }
      });
    }
    });

    this.isSubmitting = false;
    this.editProjectForm = this.formBuilder.group({
      projectName: new FormControl('', [Validators.required]),
      projectDescription: new FormControl('')
    })
  }

  goToAccesControlSetting(){
    this.router.navigate([`project/${this.projectId}/settings/access-control`]);
  }

  onSubmit(){
    this.errorMessage = '';
    if(this.editProjectForm.valid){
      this.isSubmitting = true;
      this.payload = {
        name: this.editProjectForm.get('projectName')?.value,
        description: this.editProjectForm.get('projectDescription')?.value
      }

      console.log(this.payload)

      if (this.projectId){
        this.projectsService.updateProjectDetails(this.projectId, this.payload).subscribe({
          next: (response) => {
            this.isSubmitting = false
            this.appAlert.showAlert(
              "Success",
              response.message,
              "success"
            );
            this.projectUpdated.emit();
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
  }
}
