//Resume Link
const resumeLink = "https://drive.google.com/file/d/1KK4GKnBej8kHL7VNaYn-bi4WA3q3fWNj/view?usp=sharing";
 const githubLink="https://github.com/Kabilan-AR";
  const linkedinLink="https://www.linkedin.com/in/kabilan-a-r-70b093258";
 //Get Resume Link
 document.addEventListener("DOMContentLoaded", () => {
    const resumeAnchor = document.querySelector(".resume-link");
    if (resumeAnchor) resumeAnchor.href = resumeLink;
  });
  //Get Github Link
 document.addEventListener("DOMContentLoaded", () => {
    const githubAnchor = document.querySelector(".github-link");
    if (githubAnchor) githubAnchor.href = githubLink;
  });
  //Get LinkedInlink
 document.addEventListener("DOMContentLoaded", () => {
    const linkedinAnchor = document.querySelector(".linkedin-link");
    if (linkedinAnchor) linkedinAnchor.href = linkedinLink;
  });
// Toggle mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Optional: close menu when clicking a nav link
const navItems = document.querySelectorAll('#nav-links a');
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
  });
});
// Lightbox Functionality
const images = document.querySelectorAll('.gallery-img');
const lightbox = document.querySelector('.lightbox-overlay');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const nextArrow = document.querySelector('.right-arrow');
const prevArrow = document.querySelector('.left-arrow');
const closeIcon = document.querySelector('.lightbox-close');

let currentIndex = 0;

function updateLightbox(index) {
  const img = images[index];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  currentIndex = index;
  lightbox.classList.add('active');
  document.body.classList.add('noscroll');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.classList.remove('noscroll'); // restore scroll
}
lightboxImg.addEventListener('contextmenu', e => e.preventDefault());
images.forEach((img, i) => {
  img.addEventListener('click', () => updateLightbox(i));
});

nextArrow.addEventListener('click', () => updateLightbox((currentIndex + 1) % images.length));
prevArrow.addEventListener('click', () => updateLightbox((currentIndex - 1 + images.length) % images.length));
closeIcon.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});


// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextArrow.click();
  else if (e.key === 'ArrowLeft') prevArrow.click();
  else if (e.key === 'Escape') lightbox.classList.remove('active');
});


// Scroll-based animation (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

//
//Fade-in Page Transistion
document.body.classList.add('fade-in');

// Smooth transition when clicking internal links
document.querySelectorAll('a[href]').forEach(link => {
  const isInternal = link.href.startsWith(window.location.origin);

  if (isInternal) {
    link.addEventListener('click', function (e) {
      // Ignore hash links and target="_blank"
      if (
        link.target === "_blank" ||
        link.href.includes('#') ||
        link.href === window.location.href
      ) return;

      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = link.href;
      }, 300); // delay matches the CSS transition
    });
  }
});