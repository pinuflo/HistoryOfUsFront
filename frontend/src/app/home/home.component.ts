import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../services/user.service';
import { StageService } from '../services/stage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loggedIn : boolean = false;
  stages : StageService[];

  constructor(private userService: UserService,
              private stageService: StageService) { }

  ngOnInit() {
    if(this.userService.getCurrentUserToken() )
    {
        this.userService.getCurrentUser().subscribe(
          (successData) =>
          {
              console.log(successData);
              if(successData){
                this.loggedIn = true;
                this.getStages()
              }
          },
          (errorData) =>
          {
            console.log(errorData);
          }
        );
    }
 
  }

  getStages(){
    this.stageService.getStages().subscribe(
      (successData) =>
        {
          console.log(successData);
          if(successData)
          {
            this.stages = successData.data;
            console.log('exito');
          }
      },
      (errorData) =>
      {
        console.log(errorData);
      });
    }

  logout()
  {
    this.userService.logout();
    location.reload();
  }

  
}
