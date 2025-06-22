(function ($) {
  "use strict";
  
  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });
  
	var nav = $('nav');
	var navHeight = nav.outerHeight();

	/*--/ ScrollReveal /Easy scroll animations for web and mobile browsers /--*/
	window.sr = ScrollReveal();
	sr.reveal('.foo', { duration: 1000, delay: 15 });

	/*--/ Carousel owl /--*/
	$('#carousel').owlCarousel({
		loop: true,
		margin: -1,
		items: 1,
		nav: true,
		navText: ['<i class="ion-ios-arrow-forward" aria-hidden="true"></i>', '<i class="ion-ios-arrow-back" aria-hidden="true"></i>'],
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true
	});

	/*--/ Animate Carousel /--*/
	$('.intro-carousel').on('translate.owl.carousel', function () {
		$('.intro-content .intro-title').removeClass('zoomIn animated').hide();
		$('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
		$('.intro-content .intro-title-top, .intro-content .spacial').removeClass('fadeIn animated').hide();
	});

	$('.intro-carousel').on('translated.owl.carousel', function () {
		$('.intro-content .intro-title').addClass('zoomIn animated').show();
		$('.intro-content .intro-price').addClass('fadeInUp animated').show();
		$('.intro-content .intro-title-top, .intro-content .spacial').addClass('fadeIn animated').show();
	});

	/*--/ Navbar Collapse /--*/
	$('.navbar-toggle-box-collapse').on('click', function () {
		$('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
	});
	$('.close-box-collapse, .click-closed').on('click', function () {
		$('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
		$('.menu-list ul').slideUp(700);
	});

/*--/ NavBar Collapse /-- (Page agent recherche par filtre) */

/* -- Location & Achat -- */

document.addEventListener('DOMContentLoaded', () => {
  const filterSelect = document.getElementById('filter-select');
  const filterSelectAchat = document.getElementById('filter-select-achat');

  function handleFilterChange(value, priceLimits) {
    const cards = document.querySelectorAll('.col-md-4');

    cards.forEach(card => {
      const priceBox = card.querySelector('.price-box');
      const price = priceBox ? parseInt(priceBox.dataset.price) : NaN;
      const banner = card.querySelector('.budget-banner');
      const content = card.querySelector('.card-body-a');
      const title = card.querySelector('.card-title-a');

      if (isNaN(price)) {
        banner.style.display = 'none';
        if (content) content.style.display = '';
        if (title) title.style.display = '';
        return;
      }

      if (value === 'all') {
        banner.style.display = 'none';
        if (content) content.style.display = '';
        if (title) title.style.display = '';
        return;
      }

      const [ltKey, ltLimit] = priceLimits.lt;
      const [gteKey, gteLimit] = priceLimits.gte;

      if ((value === ltKey && price < ltLimit) || (value === gteKey && price >= gteLimit)) {
        banner.style.display = 'block';
        if (content) content.style.display = 'none';
        if (title) title.style.display = 'none';
      } else {
        banner.style.display = 'none';
        if (content) content.style.display = '';
        if (title) title.style.display = '';
      }
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', function () {
	handleFilterChange(this.value, { lt: ['gte700', 700], gte: ['lt700', 700] });
    });
  }

  if (filterSelectAchat) {
    filterSelectAchat.addEventListener('change', function () {
	handleFilterChange(this.value, { lt: ['gte200000', 200000], gte: ['lt200000', 200000] });
    });
  }
});



	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).bind('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-default').addClass('navbar-reduce');
			$('.navbar-default').removeClass('navbar-trans');
		} else {
			$('.navbar-default').addClass('navbar-trans');
			$('.navbar-default').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Property owl /--*/
	$('#property-carousel').owlCarousel({
		loop: true,
		margin: 30,
		responsive: {
			0: {
				items: 1,
			},
			769: {
				items: 2,
			},
			992: {
				items: 3,
			}
		}
	});

	/*--/ Property owl owl /--*/
	$('#property-single-carousel').owlCarousel({
		loop: true,
		margin: 0,  
		nav: true,
		navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	/*--/ News owl /--*/
	$('#new-carousel').owlCarousel({
		loop: true,
		margin: 30,
		responsive: {
			0: {  
				items: 1,
			},
			769: {
				items: 2,
			},
			992: {
				items: 3,
			}
		}
	});

	/* --/ Devlog /-- */

	  document.querySelectorAll('.hf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      document.querySelectorAll('.hf-card').forEach(card => {
        const match = type === 'all' || card.getAttribute('data-type') === type;
        card.style.display = match ? 'block' : 'none';
      });
    });
  });

		/* --/ Chat GPT  /-- */
    document.addEventListener('DOMContentLoaded', () => {
      fetch('fetch_contacts.php')
        .then(res => res.json())
        .then(data => {
          const container = document.getElementById('contactlist-cards');
          if (!Array.isArray(data)) {
            container.innerHTML = '<p>Erreur lors du chargement des contacts.</p>';
            return;
          }

          container.innerHTML = '';

          data.forEach(item => {
            const card = document.createElement('article');
            card.classList.add('contactlist-card');

            card.innerHTML = `
              <header class="contactlist-card-header">${item.nom} - #${item.id}</header>
              <div class="contactlist-card-subheader">Email : ${item.email}</div>
              <div class="contactlist-card-subheader">Sujet : ${item.sujet}</div>
              <p class="contactlist-card-text">${item.message}</p>
              <footer class="contactlist-card-footer">Envoyé le ${new Date(item.date_envoi).toLocaleString('fr-FR')}</footer>
            `;

            container.appendChild(card);
          });
        })
        .catch(() => {
          document.getElementById('contactlist-cards').innerHTML = '<p>Impossible de récupérer les données.</p>';
        });
    });


	/*--/ Testimonials owl /--*/
	$('#testimonial-carousel').owlCarousel({
		margin: 0,
		autoplay: true,
		nav: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeInUp',
		navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);
