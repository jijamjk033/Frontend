import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { fetchUserProfileAPI } from '../../store/profile/profile.action';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Profile } from '../../store/user';
import { AuthService } from '../../../services/auth.service';
import { profileSelectorData } from '../../store/profile/profile.selector';
import { HeaderComponent } from '../header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    AsyncPipe,
    CommonModule,
    HeaderComponent]
})
export class ProfileComponent {
  profile$!: Observable<Profile[]>;
  image$!: string | undefined;
  isImage: boolean = false;
  showAlert: boolean = false;
  alertData: { title: string; message: string } = { title: '', message: '' };
  
  imageForm: FormGroup;

  constructor(
    private store: Store<{ profile: Profile[] }>,
    private userServices: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {this.imageForm = this.fb.group({
    image: [null, [Validators.required, this.validateImage]],
  });}

  get imageFormControl() {
    return this.imageForm.get('image') as FormControl;
  }


  ngOnInit(): void {
    this.store.dispatch(fetchUserProfileAPI());
    this.profile$ = this.store.select(profileSelectorData);
    this.profile$.subscribe((data: any) => {
      //console.log(data)
      this.image$ = data[0].image;
      console.log(this.image$);
      if (this.image$) {
        this.isImage = true;
      }
    });
  }

  onFileSelected(event: any) {
    const file = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file.name);
    const userId = localStorage.getItem('userId');
    this.userServices.profileUpload(formData, userId).subscribe(() => {
      this.store.dispatch(fetchUserProfileAPI());
    });
  }

  // onFileSelected(event: any) {
  //   const file = <File>event.target.files[0];

  //   if (this.imageFormControl.valid) {
  //     const formData = new FormData();
  //     formData.append('image', file, file.name);
  //     const userId = localStorage.getItem('userId');
  //     this.userServices.profileUpload(formData, userId).subscribe(() => {
  //       this.store.dispatch(fetchUserProfileAPI());
  //     });
  //   }else if(!this.imageFormControl.valid){
  //     alert("Invalid Image")
  //   }
  // }


  // removeImage() {
  //   const sure = confirm("Are you sure!")
  //   if (sure) {
  //     const id = localStorage.getItem('userId')
  //       console.log(this.image$);
  //     this.userServices.profileDelete(id).subscribe((response:any) => {
  //       alert("Image Removed")
  //       this.isImage = false
  //       this.store.dispatch(fetchUserProfileAPI())
  //     })
  //   }
  // }
  removeImage() {
    const id = localStorage.getItem('userId');
    console.log(this.image$);
    this.userServices.profileDelete(id).subscribe((response: any) => {
      //alert('Image Removed');
      this.isImage = false;
      this.store.dispatch(fetchUserProfileAPI());
    });
  }

  openConfirmationDialog(): void {
    this.showAlert = true;
    this.alertData = {
      title: 'Are you sure?',
      message: 'This action cannot be undone.',
    };
  }

  onAlertNoClick(): void {
    this.showAlert = false;
  }

  onAlertConfirmClick(): void {
    this.showAlert = false;
    this.removeImage(); // Or any other action you want to perform on confirmation
  }



  private validateImage(control: FormControl): { [key: string]: any } | null {
    const file = control.value as File;
  
    if (file && file.name) {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const extension = file.name.split('.').pop()?.toLowerCase();
  
      return allowedExtensions.includes(extension || '') ? null : { invalidImage: true };
    }
  
    return null;
  }
  
}
