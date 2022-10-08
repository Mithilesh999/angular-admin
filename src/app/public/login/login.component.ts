
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./../public.component.css']
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:'',
      password:''
    })
  }

  submit(): void{
    this.authService.login(this.form.getRawValue())
    .subscribe( ()=>this.route.navigate(['/']));
  }

}
