import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  form!: UntypedFormGroup;
  roles: Role[] = [];
  

  constructor(
    private formBuilder: UntypedFormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      role_id: ''
    });

    this.roleService.all().subscribe(
      roles=> this.roles = roles
    );
  }

  submit(): void {
    this.userService.create(this.form.getRawValue()).subscribe(
      ()=>this.router.navigate(['/users'])
    );
  }

}
