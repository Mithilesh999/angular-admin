import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/interfaces/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  form!: UntypedFormGroup;
  roles: Role[] = [];
  id!: number;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
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

    this.id = this.route.snapshot.params['id'];

    this.userService.get(this.id).subscribe(
      user=>{
        this.form.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role_id: user.role.id 
        })
      }
    )
  }


  submit(): void{
    this.userService.update(this.id,this.form.getRawValue())
    .subscribe(()=> this.router.navigate(['/users']));
  }

}
