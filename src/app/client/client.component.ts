import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client: Client[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;
  submitted: boolean = false;

  constructor(private clientService: ClientService,
    private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClient().subscribe(
      {
        next: data => this.client = data
      }
    );
  }

  save() {
    if (this.formGroupClient.valid) {
      if (this.isEditing) {
        this.clientService.update(this.formGroupClient.value).subscribe({
          next: () => {
            this.loadClients();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        });
      }
      else {
        this.clientService.save(this.formGroupClient.value).subscribe({
          next: data => {
            this.client.push(data);
            this.formGroupClient.reset();
            this.submitted = false;
          }
        });
      }
    }
  }

  clear() {
    this.formGroupClient.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  edit(client: Client) {
    this.isEditing = true;
    this.formGroupClient.setValue(client);
    this.clientService.update(client).subscribe({
      next: () => this.loadClients()
    })
  }

  delete(client: Client) {
    this.clientService.delete(client).subscribe({
      next: () => this.loadClients()
    })
  }

  get name(): any {
    return this.formGroupClient.get("name");
  }
  get email(): any {
    return this.formGroupClient.get("email");
  }
  get phone(): any {
    return this.formGroupClient.get("phone");
  }
  get genre(): any {
    return this.formGroupClient.get("genre");
  }
}
