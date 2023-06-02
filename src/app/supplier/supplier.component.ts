import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplier: Supplier[] = [];
  isEditing: boolean = false;
  formGroupSupplier: FormGroup;
  submitted: boolean = false;

  constructor(private supplierService: SupplierService,
    private formBuilder: FormBuilder) {
    this.formGroupSupplier = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadSupplier();
  }

  loadSupplier() {
    this.supplierService.getSupplier().subscribe(
      {
        next: data => this.supplier = data
      }
    );
  }

  save() {
    if (this.formGroupSupplier.valid) {
      if (this.isEditing) {
        this.supplierService.update(this.formGroupSupplier.value).subscribe({
          next: () => {
            this.loadSupplier();
            this.formGroupSupplier.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        });
      }
      else {
        this.supplierService.save(this.formGroupSupplier.value).subscribe({
          next: data => {
            this.supplier.push(data);
            this.formGroupSupplier.reset();
            this.submitted = false;
          }
        });
      }
    }
  }

  clear() {
    this.formGroupSupplier.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  edit(supplier: Supplier) {
    this.isEditing = true;
    this.formGroupSupplier.setValue(supplier);
    this.supplierService.update(supplier).subscribe({
      next: () => this.loadSupplier()
    })
  }

  delete(supplier: Supplier) {
    this.supplierService.delete(supplier).subscribe({
      next: () => this.loadSupplier()
    })
  }

  get name(): any {
    return this.formGroupSupplier.get("name");
  }
  get email(): any {
    return this.formGroupSupplier.get("email");
  }
  get phone(): any {
    return this.formGroupSupplier.get("phone");
  }
}
