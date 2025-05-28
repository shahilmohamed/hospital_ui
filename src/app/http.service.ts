import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private url : string = "http://localhost:8080";

  signup(obj:any)
  {
    return (this.http.post(`${this.url}/signup`,obj));
  }

  login(obj:any)
  {
    return (this.http.post(`${this.url}/login`,obj));
  }

  addNewPatient(obj:any, id:string)
  {
    return (this.http.post(`${this.url}/addPatient/${id}`,obj));
  }

}
