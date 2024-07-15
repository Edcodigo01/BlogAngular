import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideosFService } from 'src/app/services/front/videos-f.service';

import SwiperCore, { Pagination, Navigation,SwiperOptions } from "swiper";
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);
@Component({
  selector: 'app-last-videos',
  templateUrl: './last-videos.component.html',
  styleUrls: ['./last-videos.component.css']
})
export class LastVideosComponent implements OnInit {
  videos:any[] = [];
  constructor( private sanitizer: DomSanitizer,private VideosFS:VideosFService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(){
    this.VideosFS.videos(6).subscribe( (data:any) => {
      this.videos = data.videos;
    })
  }

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

          720: {
            slidesPerView: 1,
        },
          999: {
            slidesPerView: 2,
        },
         1200: {
            slidesPerView: 3,
        },
    },

  };

  onSwiper(swiper:any) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  myfunc(event: Event) {

  }



  showVideo(title:string) {

     return new Promise((resolve,reject)=>{
       let videos = this.videos.map(item => ({
         ...item,
         showVideo: false,
       }));

       for(let video of videos){
        if (video.title == title) {
          video.showVideo = true;
          video.showLoader = true;
        }
       }
       this.videos = videos;
       resolve(videos);
     }).then( resp => {
       return;
     })
   }

   urlSanitizer(url: string) {
     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }

}

