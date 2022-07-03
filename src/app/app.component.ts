import { Component } from '@angular/core';
import { ElectronService } from './services/electronService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private electronService : ElectronService)
  {

  }

  onClick(){
    this.electronService.navigateDirectory("eden");
  }
  //constructor(_electr)
  title = 'proj';
  
}
