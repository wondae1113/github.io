const MOTTO = '"기술은 사람을 위해 존재한다"';

const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.side-nav a, .mobile-nav-overlay a');
const sections = document.querySelectorAll('main section');
const mottoText = document.getElementById('mottoText');
let mottoTyped = false;

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

function updateActiveNav() {
  let current = '';
  const scrollPos = window.scrollY + 200;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.side-nav a').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'motto' && !mottoTyped) {
          mottoTyped = true;
          typeMotto();
        }
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
);

sections.forEach(section => observer.observe(section));

function typeMotto() {
  const cursor = mottoText.querySelector('.cursor');
  let i = 0;
  const interval = setInterval(() => {
    if (i < MOTTO.length) {
      mottoText.insertBefore(document.createTextNode(MOTTO[i]), cursor);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 70);
}
