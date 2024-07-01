<template>
  <div class="hamenu valign">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="menu-links">
            <ul class="main-menu rest">
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/about" class="link animsition-link" @click="closeMenu"><span class="nm">01.</span>Home</a>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/about" class="link animsition-link" @click="closeMenu"><span class="nm">02.</span>About</a>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <span class="link dmenu" @click="handleOpenDMenu"><span class="nm">03.</span>Projects </span>
                </div>
                <div class="sub-menu">
                  <ul class="rest">
                    <li>
                      <div class="o-hidden">
                        <span class="sub-link back" @click="handleCloseDMenu"><i class="pe-7s-angle-left"></i> Go
                          Back</span>
                      </div>
                    </li>
                  </ul>
                  <div class="row">
                    <div class="col-md-6">
                      <ul class="rest">
                        <li>
                          
                        </li>
                        <li>
                          <div class="o-hidden">
                            <a href="/carousel-slider" class="sub-link animsition-link" @click="closeMenu">Sources Projects</a>
                          </div>
                        </li>
                       
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/#0" class="link animsition-link" @click="closeMenu"><span class="nm">04.</span>Stories</a>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/contact" class="link animsition-link" @click="closeMenu"><span
                      class="nm">05.</span>Contact</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 valign">
          <div class="cont-info">
            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">Address</h6>
              <p class="fw-400 fz-18">3rd floor Runhare HOUSE
                107 kwame Nkrumah HARARE</p>
            </div>
            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">How to Connect</h6>
              <p class="fw-400 fz-18">+263776517766</p>
              <p class="fw-400 fz-18">admin@sourcesmedia.com</p>
            </div>
            <div class="bottom">
              <h6 class="text-u fw-600 mb-20">Follow Us</h6>
              <ul class="rest social-text d-flex fz-13">
                <li class="mr-20">
                  <a href="/#0" class="hover-this"><span class="hover-anim">Facebook</span></a>
                </li>
                <li class="mr-20">
                  <a href="/#0" class="hover-this"><span class="hover-anim">Twitter</span></a>
                </li>
                <li class="mr-20">
                  <a href="/#0" class="hover-this"><span class="hover-anim">LinkedIn</span></a>
                </li>
                <li>
                  <a href="/#0" class="hover-this"><span class="hover-anim">Instagram</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const closeMenu = () => {
  document.querySelector('.hamenu').classList.remove("open");
};

const handleMouseEnter = (event) => {
  Object.values(event.currentTarget.parentElement.children).forEach(el => el.style.opacity = "0.5");
  event.currentTarget.style.opacity = "1";
};

const handleMouseLeave = (event) => {
  Object.values(event.currentTarget.parentElement.children).forEach(el => el.style.opacity = "1");
};

const handleOpenDMenu = (event) => {
  document.querySelector(".main-menu").classList.add("gosub");
  event.currentTarget.parentElement.parentElement.querySelector(".sub-menu").classList.add("sub-open");
};

const handleCloseDMenu = () => {
  document.querySelector(".main-menu").classList.remove("gosub");
  document.querySelector(".main-menu .sub-menu").classList.remove("sub-open");
};
</script>
