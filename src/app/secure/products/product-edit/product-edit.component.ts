import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  form!: UntypedFormGroup;
  id!: number;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title:'',
      description:'',
      image:'',
      price:''
    });

    this.id = this.route.snapshot.params['id'];
    this.productService.get(this.id).subscribe(
      product=>this.form.patchValue(product)
    );
  }

  submit(): void{
    this.productService.update(this.id, this.form.getRawValue())
    .subscribe(()=>this.router.navigate(['/products']));
  }

}
