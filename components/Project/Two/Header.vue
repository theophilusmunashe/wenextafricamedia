<template>
  <header class="header-project2 section-padding pb-0">
    <div class="container mt-80 mb-80">
      <div class="row">
        <div class="col-lg-6 valign">
          <div class="full-width mb-30">
            <h1 class="fz-60">Project 2</h1>
            <p>The comprehensive branding strategy developed for Stanbic Bank by Sources Consultants  successfully rejuvenated the bank’s image, 
              creating a strong and cohesive brand presence in the market. 
              Our strategic approach and creative execution have positioned Stanbic Bank for continued 
              growth and success. Sources Consultants is proud to be a part of this remarkable transformation journey.</p>
          </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="info">
            <div class="row">
              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Client :</span>
                  <h6>Stanbic Bank</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Project :</span>
                  <h6>Comprehensive Branding Strategy</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Start Date :</span>
                  <h6>7 February 2022</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item">
                  <span class="opacity-8 mb-5">Location:</span>
                  <h6>Harare, Zimbabwe</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid rest">
      <div class="project2">
        <div id="content-carousel-container-unq-project2" class="swiper-container">
          <swiper v-bind="swiperOptions" class="swiper-container" id="content-carousel-container-unq-project2">
            <swiper-slide>
              <div class="img">
                <img src="/assets/imgs/works/projects/2/2.jpg" alt="" />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="img">
                <img src="/assets/imgs/works/projects/2/3.jpg" alt="" />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="img">
                <img src="/assets/imgs/works/projects/2/2.jpg" alt="" />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper';

const swiperOptions = {
  modules: [Navigation, Autoplay],
  slidesPerView: 2,
  loop: true,
  centeredSlides: true,
  spaceBetween: 30,
};
</script>
