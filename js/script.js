'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
          
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    // const deadline = '2021-02-25';

    // function getTimeRemainder (endtime) {
    //     const t = Date.parse(endtime) - Date.parse(new Date()),
    //     days = Math.floor((t / (1000 * 60 * 60 * 24))),
    //     hours = Math.floor((t / (1000 * 60 * 60) % 24)),
    //     minutes = Math.floor((t / 1000 / 60) % 60),
    //     seconds = Math.floor((t / 1000) % 60);

    //     return {
    //         'total': t,
    //         'days': days,
    //         'hours': hours,
    //         'minutes': minutes,
    //         'seconds': seconds
    //     };
    // }

    // function addZero(num) {
    //     if (num >= 0 && num < 10) {
    //         return`0${num}`;
    //     } else {
    //         return num;
    //     }
    // }

    // function setClock(selector, endtime) {
    //     const timer = document.querySelector(selector),
    //           days = timer.querySelector('#days'),
    //           hours = timer.querySelector('#hours'),
    //           minutes = timer.querySelector('#minutes'),
    //           seconds = timer.querySelector('#seconds'),
    //           timeInterval = setInterval(updateClock, 1000);
    //     updateClock();

    //     function updateClock() {
    //         const t = getTimeRemainder(endtime);

    //         days.innerHTML = addZero(t.days);
    //         hours.innerHTML = addZero(t.hours);
    //         minutes.innerHTML = addZero(t.minutes);
    //         seconds.innerHTML = addZero(t.seconds);

    //         if (t.total <= 0) {
    //             clearInterval(timeInterval);
    //         }

    //     }
    // }

    // setClock('.timer', deadline);

   const deadline = '2021-03-28 00:00';

   function getTimeRemainder(endtime) {
       const t = Date.parse(endtime) - Date.parse(new Date()),
             days = Math.floor((t / (1000 * 60 * 60 * 24))),
             hours = Math.floor((t / (1000 * 60 * 60) % 24)),
             minutes = Math.floor((t / 1000 / 60) % 60),
             seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
   }

   function addZero(num) {
       if (num >= 0 && num < 10) {
           return`${num}`;
       } else {
           return num;
       }
   }

   function setClock(selector, endtime) {
       const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             hours = timer.querySelector('#hours'),
             minutes = timer.querySelector('#minutes'),
             seconds = timer.querySelector('#seconds'),
             timeInterval = setInterval(updateClock, 1000);

            updateClock();

             function updateClock() {
                 const t = getTimeRemainder(endtime);

                 days.innerHTML = addZero(t.days);
                 hours.innerHTML = addZero(t.hours);
                 minutes.innerHTML = addZero(t.minutes);
                 seconds.innerHTML = addZero(t.seconds);

                 if (t.total <= 0) {
                     const zero = '00';
                     clearInterval(timeInterval);
                     days.innerHTML = zero;
                     hours.innerHTML = zero;
                     minutes.innerHTML = zero;
                     seconds.innerHTML = zero;
                 }
             }
   }

   setClock('.timer', deadline);

    //    Modal

    const modalShowbtn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    
    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalShowbtn.forEach(btn => {
        btn.addEventListener('click', showModal);
    });


    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();   
        }
    });

    const modalTimerId = setTimeout(showModal, 40000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
    
    // Menu card

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27.99;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = Math.round(this.price * this.transfer);
        }

        render() {
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span>  грн/день</div>
                </div>
                `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'Меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        25.8,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        18,
        '.menu .container'
    ).render();
    
            // Forms

            const forms = document.querySelectorAll('form');

            const message = {
                loading: 'img/form/spinner.svg',
                success: 'Submited successfully',
                failure: 'Failure'
            };
    
            forms.forEach(item => {
                postData(item);
            });
    
    
            function postData(form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
    
                    let statusMessage = document.createElement('img');
                    statusMessage.src = message.loading;
                    statusMessage.style.cssText = `
                        display: block;
                        margin: 0 auto;
                    `;
                    form.insertAdjacentElement('afterend', statusMessage);

                    const request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    const formData = new FormData(form);

                    const object = {};
                    formData.forEach(function(value, key){
                        object[key] = value;
                    });
            
                    const json = JSON.stringify(object);

                    request.send(json);

                    request.addEventListener('load', () => {
                        if (request.status === 200) {
                            console.log(request.response);
                            thankMessageModal(message.success);
                            statusMessage.remove();
                            form.reset();
                        } else {
                            thankMessageModal(message.failure);
                        }
                    });
                });               
            }
                

            function thankMessageModal(message) {
                const prevModal = document.querySelector('.modal__dialog');
                prevModal.classList.add('hide');
                showModal();
                
                const thankMessage = document.createElement('div');
                thankMessage.classList.add('modal__dialog');
                thankMessage.innerHTML = 
                `
                <div class = 'modal__content'>
                    <div data-close class = 'modal__close'>&times;</div>
                    <div class = 'modal__title'>${message}</div>
                </div>
                `;
                document.querySelector('.modal').append(thankMessage);
                setTimeout(() => {
                    thankMessage.remove();
                    prevModal.classList.add('show');
                    prevModal.classList.remove('hide');
                    closeModal();
                }, 2000);
                
            } 



 });