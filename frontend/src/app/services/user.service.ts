import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }

  getCurrentUserToken() : string
  {
      let currentUserToken = JSON.parse(localStorage.getItem(environment.env_key + 'currentUserToken'));
      if(currentUserToken)
      {
          return currentUserToken;
      }
      else
      {
          return null;
      }
  }

  register(username: string, password: string, name: string, email: string) {
        
    let trimmedEmail = email.trim();

    console.log("..Registrando paso1");
    return this.http.post<any>(`${environment.backend_url}/auth/registration`, { 'username': username, 'password': password, 'name': name, 'email': trimmedEmail })
        .pipe(map(serverResponse => 
            {
              console.log("..Registrando paso2");
                if(!("success" in serverResponse))
                {
                  console.error("Server incompatible, no ha retornado respuesta correcta");
                  return null
                }
                  
                if(serverResponse.success == true)
                {
                    let data = serverResponse.data;
                    if (data && data.token) 
                    {
                        localStorage.setItem(environment.env_key + 'currentUserToken', JSON.stringify(data));
                    }
                    return serverResponse;
                }
                else
                {
                    return serverResponse;
                }


            })
        );
  }


  login(username: string, password: string) {

    return this.http.post<any>(`${environment.backend_url}/api-token-auth`, { username, password })
        .pipe(map(serverResponse => 
            {
                if(serverResponse.success == true)
                {
                    console.log(serverResponse);
                    let data = serverResponse.data;
                    if (data && data.token) 
                    {
                        localStorage.setItem(environment.env_key + 'currentUserToken', JSON.stringify(data));
                    }
                    return serverResponse;
                }
                else
                {
                    return serverResponse;
                }
            })
        );
  }

  logout() {
    localStorage.removeItem(environment.env_key + 'currentUserToken');
  }

}