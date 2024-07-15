import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/front/blog.service';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, SwiperOptions } from "swiper";
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-last-articles',
  templateUrl: './last-articles.component.html',
  styleUrls: ['./last-articles.component.css']
})

export class LastArticlesComponent implements OnInit {
  lastArticles:any[] = [];
  constructor(private blogS:BlogService,private router:Router) { }

  config: SwiperOptions = {
    pagination:{
    clickable: true
  },
    navigation:true,
  // loopFillGroupWithBlank:true,
    slidesPerView: 1,
    spaceBetween: 15,
    freeMode: true,
    loop: false,
    breakpoints: {
        470: {
            slidesPerView: 1,
        },
          720: {
            slidesPerView: 2,
        },
          999: {
            slidesPerView: 3,
        },
         1200: {
            slidesPerView: 4,
        },
    },

  };

  ngOnInit() {
    this.getLastArticles();
  }

  goArticle(article:any){
    let category = localStorage.removeItem('filterCategoryA');
    let title = localStorage.removeItem('filterTitleA');
    let page = localStorage.removeItem('currentPageA');
    let orderBy = localStorage.removeItem('orderByA');


    this.router.navigateByUrl('/blog/articulo/'+article.categorySlug+'/'+article.slug)
  }

  onSwiper(swiper:any) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

   myfunc(event: Event) {

  }

  getLastArticles(){
    this.blogS.lastArticles().subscribe( (data:any)=>{
      this.lastArticles = data.articles;
    });
  }
}
