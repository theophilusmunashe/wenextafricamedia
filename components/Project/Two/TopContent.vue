<template>
  <section class="section-padding bord-thin-bottom">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <h2 class="mb-50">The <br /> Overview</h2>
        </div>
        <div class="col-lg-7">
          <div class="text">
            <h5 class="mb-30 fw-400 line-height-40">Stanbic Bank enlisted the expertise of Sources Consultants to revitalize 
              its brand identity and enhance its market positioning. The objective was to develop a
               cohesive and compelling branding strategy that would resonate with existing customers,
                attract new clients, and reinforce Stanbic Bank's reputation as a leading financial 
                institution in the region.</h5>
            <p class="fz-18">Objective:

              To create a unified and recognizable brand identity for Stanbic Bank.
              To strengthen brand loyalty and customer trust.
              To differentiate Stanbic Bank from competitors through a unique value proposition.
              To enhance the bank’s visibility and engagement across multiple channels.</p>
          </div>
          <div class="accordion bord mt-100">
            <div v-for="(item, index) in accordionData" :key="index" class="item mb-20 wow fadeInUp"
              :data-wow-delay="item.delay" @click="openAccordion">
              <div class="title">
                <h4 class="fw-300">{{ item.title }}</h4>
                <span class="ico"></span>
              </div>
              <div class="accordion-info">
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const accordionData = ref([
  {
    title: 'Brand Audit and Research',
    content: 'Conducted a thorough brand audit to assess current brand perception and market positioning.',
    delay: '.1s'
  },
  {
    title: 'Brand Strategy Development',
    content: 'Defined the core brand values, mission, and vision aligned with Stanbic Bank’s strategic goals.',
    delay: '.3s'
  },
  {
    title: 'Visual Identity Revamp',
    content: 'Designed a refreshed logo that embodies the bank’s heritage and forward-thinking approach.',
    delay: '.5s'
  },
  {
    title: 'Internal Branding',
    content: 'Implemented internal branding initiatives to ensure employees are brand ambassadors.',
    delay: '.7s'
  }
]);

function openAccordion(event) {
  document.querySelectorAll('.accordion .item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.accordion-info').style.display = 'none';
  });
  event.currentTarget.classList.add('active');
  event.currentTarget.querySelector('.accordion-info').style.display = 'block';
}
</script>
