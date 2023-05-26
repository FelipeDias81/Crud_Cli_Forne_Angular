import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/client";
}
