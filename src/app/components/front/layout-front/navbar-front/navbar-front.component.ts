import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/front/navbar.service';

NavbarService
@Component({
  selector: 'app-navbar-front',
  templateUrl: './navbar-front.component.html',
  styleUrls: ['./navbar-front.component.css']
})

export class NavbarFrontComponent implements OnInit {
  navbar2:boolean = false;
  categories:any[] = [];
  categoryModalShow:boolean = false;
  constructor(
    public router:Router,
    private navbarS:NavbarService,
    ) { }

  ngOnInit(): void {

  this.getNav();
  }

  getNav()
{
  this.navbarS.navbar().subscribe( (data:any) => {
    this.categories = data.categories;
    console.log(data);

  })


}



  isRouteAdmin(){
    if(window.location.href.includes('/administrar/')){
      return true;
    }
    return false;
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e:any) {
    // ovultar dropdown
    let dropdown:any = document.querySelector('.dropdown-menu');

    dropdown.classList.remove("show");
    // mostrar o no navbar 2
      if (this.isRouteAdmin() == false){
        let element:any = document.querySelector('.navbar-front');

        if (window.pageYOffset > element.clientHeight) {
           this.navbar2 = true;
        } else {
          this.navbar2 = false;
        }
      }

    }
}
