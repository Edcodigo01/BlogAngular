import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services/admin/auth.service';
import { UserModel } from '../../../../../../formularios/src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form:FormGroup;
  user:UserModel;
  constructor(
    private auth:AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['Edwar@gmail.com', [Validators.required,Validators.email]],
      password: [, Validators.required],
    })
  }

  sendLogin(){

    this.user = this.form.value;
    this.auth.login(this.user).subscribe( (resp:any) => {
      localStorage.removeItem('filterStatus');
    localStorage.removeItem('filterCategory');
    localStorage.removeItem('lastPageArticles');
    this.auth.saveAuth(resp);

    })
  }
}
