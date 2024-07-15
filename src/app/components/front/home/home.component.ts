import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('service1') service1:ElementRef;
  @ViewChild('service2') service2:ElementRef;
  @ViewChild('service3') service3:ElementRef;
  @ViewChild('service4') service4:ElementRef;

  constructor(private router:Router) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    console.log(this.service1);

    // this.scrollServices();
    // let el:any = document.getElementById('service4');
    // el.scrollIntoView();
  }



  scrollServices() {

    let goServices = localStorage.getItem('goServices');
    let self = this;

    if (goServices?.length) {
        if (goServices == 'service1') {
          self.service1.nativeElement.scrollIntoView();
        } else if (goServices == 'service2') {
          self.service2.nativeElement.scrollIntoView();
        } else if (goServices == 'service3') {
          self.service3.nativeElement.scrollIntoView();
        } else if (goServices == 'service4') {
          self.service4.nativeElement.scrollIntoView();
        }
    }


    localStorage.removeItem('goServices');
  }


}
