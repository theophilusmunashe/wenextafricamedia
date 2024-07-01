<template>
  <section class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <div class="text">
            <span class="sub-title mb-15 opacity-8">- What We Believe?</span>
            <div class="text-reval">
              <h2 class="fz-50 text-u mb-30">
                <span class="text">At Sources Consultants,  </span>
                <span class="text">we believe that every brand </span>
                <span class="text">has a unique story to tell.</span>
              </h2>
            </div>
            
            <p>
              Sources Consultants is a young and
              energetic creative agency. We combine
              imaginative thinking with strategic planning
              to craft a stand-out image for your brand.Our mission is to uncover
               that story and convey it in a way that resonates deeply with your target audience. 
               We approach each project with a collaborative spirit, working closely with our 
               clients to understand their vision, goals, and challenges. This partnership-driven
                approach allows us to develop tailored strategies that deliver tangible results.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="row mt-80">
            <div class="col-md-4 sm-mb30">
              <ul class="list rest">
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Advertising Campaigns</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Content Creation</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Brand Strategy</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Creative Services</li>
              </ul>
            </div>
            <div class="col-md-4 sm-mb30">
              <ul class="list rest">
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Public Relations</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Live Streaming</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Social Media</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Advertising</li>
              </ul>
            </div>
            <div class="col-md-4">
              <ul class="list rest">
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Videography</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Digital Experiences</li>
                
              </ul>
            </div>
          </div>
          <div class="row numbers mt-80">
            <div class="col-lg-4">
              <div class="item md-mb50">
                <h3 class="stroke f-bold num pb-30 mb-30 bord-thin-bottom">58</h3>
                <h6 class="fz-16">Projects Completed</h6>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="item md-mb50">
                <h3 class="stroke f-bold num pb-30 mb-30 bord-thin-bottom">34</h3>
                <h6 class="fz-16">Clients Around the World</h6>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="item">
                <h3 class="stroke f-bold num pb-30 mb-30 bord-thin-bottom">3</h3>
                <h6 class="fz-16">Total Awards</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const handleResize = () => {
  if (window.innerWidth > 991) {
    gsap.to(".text-reval .text", {
      backgroundPositionX: "0%",
      stagger: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".text-reval",
        markers: false,
        scrub: 1,
        start: "top center",
        end: "bottom center"
      }
    });
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
