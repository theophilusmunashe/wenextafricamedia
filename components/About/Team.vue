<template>
  <section class="team section-padding pb-0">
    <div class="container">
      <div class="sec-head mb-80">
        <div class="row">
          <div class="col-lg-8">
            <h6 class="sub-title opacity-8 wow fadeInUp mb-15">- Our Team</h6>
            <h3 class="f-bold text-u d-rotate wow">
              <span class="rotate-text">Meet Our Team.</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid rest">
      <div class="row no-pad">
        <div v-for="item in data" :key="item.id" class="col-lg-3 col-md-6">
          <div class="item">
            <div class="img">
              <img :src="item.image" alt="" />
            </div>
            <div class="info mt-20">
              <span class="fz-12 opacity-8">{{ item.role }}</span>
              <h6 class="fz-18">{{ item.title }}</h6>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/About/team.json';
</script>
