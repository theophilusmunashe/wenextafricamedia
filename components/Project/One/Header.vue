<template>
  <header class="header-project1">
    <div class="container mt-100">
      <div class="row">
        <div class="col-lg-6 valign">
          <div class="full-width mb-30">
            <h1 class="fz-60">Project 1</h1>
            <p>The Econet Wireless Drone Show was a testament to the power of innovative thinking and creative execution. Sources Consultants is proud to have partnered with Econet Wireless to create a 
              groundbreaking event that celebrated technological advancement 
              and left a lasting impression on all who attended.</p>
          </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="info">
            <div class="row">
              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Client:</span>
                  <h6>Econet Wireless</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Project :</span>
                  <h6>Drone Show Spectacular</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Start Date :</span>
                  <h6>7 August 2021</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item">
                  <span class="opacity-8 mb-5">Location :</span>
                  <h6>Harare, Zimbabwe</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-img mt-100" data-background="/assets/imgs/works/projects/0/7.jpg"></div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue';
import loadBackgroudImages from '@/common/loadBackgroudImages';

onMounted(() => {
  loadBackgroudImages();
});
</script>
