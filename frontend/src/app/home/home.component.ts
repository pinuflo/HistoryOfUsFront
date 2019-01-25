import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loggedIn : boolean = false;


  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getCurrentUser().subscribe(
      (successData) =>
      {
          console.log(successData);
          if(successData){
            this.loggedIn = true;
          }
          
          
      },
      (errorData) =>
      {
        console.log(errorData);
      }
        
    );

  
  }

  logout()
  {
    this.userService.logout();
    location.reload();
  }

  
}
