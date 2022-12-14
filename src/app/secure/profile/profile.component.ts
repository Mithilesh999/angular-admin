import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Auth } from 'src/app/classes/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  infoForm!: UntypedFormGroup;
  passwordForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.infoForm =  this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: ''
    });

    this.passwordForm =  this.formBuilder.group({
      password: '',
      password_confirm: ''
    });

    Auth.userEmitter.subscribe(user=>{
      this.infoForm.patchValue(user);
    });

  }

  infoSubmit(): void{
    this.authService.updateInfo(this.infoForm.getRawValue()).subscribe(
      user=> Auth.userEmitter.emit(user)
    );
  }

  passwordSubmit(): void{
    this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe(
      res=>console.log(res)
    );
  }
}
