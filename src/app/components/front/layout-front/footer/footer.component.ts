import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  isRouteAdmin(){
    if(window.location.href.includes('/administrar/')){
      return true;
    }
    return false;
  }

}
