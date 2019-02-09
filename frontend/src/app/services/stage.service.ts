import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  constructor(private http: HttpClient) { 

  }

  getStages() : Observable<any>
  {
    return this.http.get<any>(`${environment.backend_url}/api/stages/`);
  }
  
}
