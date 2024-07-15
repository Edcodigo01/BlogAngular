import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/admin/auth.service';
import { UserModel } from '../../../../../../../formularios/src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  userAuth:UserModel;
  constructor(private AuthS:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.userAuth = this.AuthS.getAuth();
  }

  sendLogout(){
    this.AuthS.logout();
  }

  goArticles(){
    localStorage.removeItem('filterStatus');
    localStorage.removeItem('filterCategory');
    localStorage.removeItem('lastPageArticles');
    this.router.navigateByUrl('/administrar/articulos');
  }


  isArticlesURL(){
    if(window.location.href.includes('/administrar/articulos')){
      return true
    }
    return false;
  }

  goVideos(){
    localStorage.removeItem('pageVideos');
    this.router.navigateByUrl('/administrar/videos');
  }

}
