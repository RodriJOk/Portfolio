/* ===== MENU SHOW ===== */

/* ===== Escritura Texto ===== */

class TextTyper {
  constructor(el, minTypingTime=30, randomTypingTime=100) {
    this.container = el;
    this.cursorBlinkerTimeoutId;
    this.waitCharacters = '.?!';

    this.minTypingTime = minTypingTime;
    this.randomTypingTime = randomTypingTime;

    this.stopAnimation = false;
    this.currPromiseChain = Promise.resolve();
  }

  type(text) {
    for( let char of text ) { 
      this.typeLetter(char);
      if (this.waitCharacters.includes(char)) this.wait(1000);
    }
    return this;
  }

  typeLetter(char) {
    this.chain( () => new Promise( resolve => {
      if (this.stopAnimation) return resolve();

      setTimeout( () => {
        this.container.innerText += char;
        this.stopCursorBlinking();
        resolve();
      }, this.getRandomTimeout());
    }));
    return this;
  }

  getRandomTimeout() {
    // simulates real person's typing
    return Math.random() * this.randomTypingTime + this.minTypingTime; 
  }

  stopCursorBlinking() {
    this.container.classList.add('typing');
    clearTimeout( this.cursorBlinkerTimeoutId );
    this.cursorBlinkerTimeoutId = setTimeout( () => {
      this.container.classList.remove('typing');
    }, 200);
  }

  remove(num) {
    for( let i = 0; i < num; i++ ) {
      this.removeLetter();
    }
    return this;
  }

  removeLetter() {
    this.chain( () => new Promise( resolve => {
      if (this.stopAnimation) return resolve();

      setTimeout( () => {
        let currText = this.container.innerText;
        this.container.innerText = currText.slice( 0, currText.length - 1);
        this.stopCursorBlinking();
        resolve();
      }, this.getRandomTimeout() / 2.5);
      // removing characters is usually much faster than typing

    }))
    return this;
  }

  chain( callback ) {
    this.currPromiseChain = this.currPromiseChain.then( callback );
    return this;
  }
  wait( time ) {
    this.chain( () => new Promise( resolve => {
      if (this.stopAnimation) return resolve();
      setTimeout(resolve, time)
    }));
    return this;
  }
  clear() {
    this.chain( () => this.container.innerText = '');
    return this;
  }
  stop() {
    this.stopAnimation = true;
    this.chain( () => this.stopAnimation = false );
    return this;
  }
  clearNow() {
    this.stop().clear();
    return this;
  }

}

let typer = new TextTyper( document.getElementById('type-me') );

document.querySelector('.buttons').addEventListener('click', (e) => {
  let btnId = e.target.id;
  switch (btnId) {
    case 'stop':
      typer.stop();
      break;
    case 'again':
      typer
        .clearNow()
        .type("You liked that animation, didn\'t you? Don't forget to press the like button! NOW!", 1000);
      break;
    case 'clear':
      typer.clearNow();
      break;
  }
});

const init = () => {
  // typing is devided into a few function calls just to demonstrate flexibility
  typer
    .clearNow()
    .wait(1200)
    .type("Me llamo Rodrigo. ")
    .wait(500)
    .type("Soy un apasionado por la tecnologia,")
    .type(" y un desarrolador web Full Stack. ")
    
    .wait(300)
    .type('(O eso intento :D)')
    .wait(600)
    .remove('(O eso intento :D)'.length)
    .wait(900)
    .type(' Espero que disfrutes mi website, el cual fue hecho con mucho ')
    
    .wait(500)
    .type("♥")
    /*.wait(4000)
    .clear();*/
}
init();

  

/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '50px',
    duration: 1000,
    reset: true
})

/*SCROLL HOME*/
sr.reveal('.home__title', {})
sr.reveal('.home__scroll', {delay: 200})
sr.reveal('.home__img', {origin:'right', delay: 400})

/*SCROLL ABOUT*/
sr.reveal('.about__img', {delay: 500})
sr.reveal('.about__subtitle', {delay: 300})
sr.reveal('.about__profession', {delay: 400})
sr.reveal('.about__text', {delay: 500})
sr.reveal('.about__social-icon', {delay: 600, interval: 200})

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle', {})
sr.reveal('.skills__name', {distance: '20px', delay: 50, interval: 100})
sr.reveal('.skills__img', {delay: 400})

/*SCROLL PORTFOLIO*/
sr.reveal('.portfolio__img', {interval: 200})

/*SCROLL CONTACT*/
sr.reveal('.contact__subtitle', {})
sr.reveal('.contact__text', {interval: 200})
sr.reveal('.contact__input', {delay: 400})
sr.reveal('.contact__button', {delay: 600})

