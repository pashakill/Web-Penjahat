import {initPage} from '../api.js';
import {initPortofolio} from '../api.js';
import {initService} from '../api.js';
import {initCrew} from '../api.js';
import {addBooking} from '../api.js';


jQuery(document).ready(function ($) {
  window.openModal = function(image, title, description) {
    // Set dynamic content
    $("#modalImage").attr("src", `data:image/png;base64,${image}`).css({
      "object-fit": "contain", // Ensures the image fits inside the container without cropping
      "max-width": "100%",      // Prevents the image from exceeding the container width
      "max-height": "100%"      // Prevents the image from exceeding the container height
    });
    $("#detailModalLabel").text(title);
    $("#modalDescription").text(description);

    // Show the modal with animation
    $("#detailModal").modal("show");
  };
  
  // event handler for close modal manual
  $('#detailModal').on('hidden.bs.modal', function () {
    console.log('Modal ditutup');
  });

  $("#closeButton").click(function () {
    $("#detailModal").modal("hide");
  });

  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  new WOW().init();

  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Porfolio filter
  $("#portfolio-flters li").click(function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function () {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });


});

document.addEventListener("DOMContentLoaded", async function() {
  //EXECUTE DATA INTROS
  const dataIntros = await initPage();
  if (dataIntros) {
    const iframe = document.getElementById('map');
    iframe.src = dataIntros.maps;

    document.getElementById('cta-link').setAttribute('href', 'https://wa.me/${dataIntros.phoneNumber}');
    document.querySelector('.twitter').setAttribute('href', dataIntros.twitter);
    document.querySelector('.facebook').setAttribute('href', dataIntros.facebook);
    document.querySelector('.instagram').setAttribute('href', dataIntros.instagram);
    document.querySelector('.linkedin').setAttribute('href', dataIntros.linkedin);

    document.getElementById('addressPenjahat').textContent = dataIntros.address;
    document.getElementById('emailPenjahat').textContent = dataIntros.email;
    document.getElementById('phoneNumber').textContent = dataIntros.phoneNumber;
    document.getElementById('subTitle').textContent = dataIntros.subtitle || "Kenapa Penjahat ?";
    document.getElementById('subDescription').textContent = dataIntros.subdescription || "kami adalah Pencipta Event Nan Jenius, Atraktif, dan Hebat Tanpa Cela, penyedia layanan Event Organizer (EO) yang siap membantu Anda menciptakan momen tak terlupakan dengan konsep yang unik, kreatif, dan penuh inovasi. Dari pesta ulang tahun hingga pernikahan impian, dari nonton bareng, nongkrong bareng, menggelar konser hingga kompetisi mobile Legend, kami melayani berbagai jenis acara sesuai kebutuhan Anda. Kami percaya bahwa setiap event memiliki cerita dan tujuan yang spesial. Oleh karena itu, tim kami yang terdiri dari profesional berpengalaman akan bekerja dengan penuh dedikasi, memastikan setiap detail direncanakan dan dieksekusi dengan sempurna.";
    document.getElementById('titlePage').textContent = dataIntros.titlePage || "Welcome to Penjahat Crew";
    document.getElementById('descriptionPage').textContent = dataIntros.descriptionPage || "Kami adalah Team Event Organizer Kreatif, Profesional, dan Terpercaya untuk Segala Jenis Acara!";
    var heroElement = document.querySelector("#hero");
    if (heroElement) {
      const base64ImageHero = dataIntros.image_header;
      const formattedBase64ImageHero = `data:image/jpeg;base64,${base64ImageHero}`; 
      heroElement.style.background = `url('${formattedBase64ImageHero}') center top no-repeat`;
      heroElement.style.backgroundSize = "cover";
      heroElement.style.width = "100%"; 
      heroElement.style.height = "100%"; 
    }
    var backgroundElement = document.querySelector("#about .about-container .background");
    if (backgroundElement) {
      const base64Image = dataIntros.image;
      const formattedBase64Image = `data:image/jpeg;base64,${base64Image}`;
      backgroundElement.style.background = `url('${formattedBase64Image}') center top no-repeat`;
      backgroundElement.style.minHeight = "300px"; 
    }
  }

  //EXECUTE DATA SERVICE
  const dataService = await initService();
  if(dataService){
    const container = document.querySelector(".last-3-index-service-container");
      container.innerHTML = '';
      const limitedData = dataService.slice(0, 3);
      limitedData.forEach((item) => {
        try {
          const iconBox = document.createElement("div");
          iconBox.classList.add("icon-box", "wow", "fadeInUp");
          const iconDiv = document.createElement("div");
          iconDiv.classList.add("icon");
          if (item.image) {
            iconDiv.innerHTML = `<img src="data:image/png;base64,${item.image}" alt="icon" style="width: 50px; height: 50px; border-radius: 50%;">`;
          } else {
            iconDiv.innerHTML = `<i class="fa fa-shopping-bag"></i>`;  
          }
          const titleElement = document.createElement("h4");
          titleElement.classList.add("title");
          const titleLink = document.createElement("a");
          titleLink.href = "#"; 
          titleLink.textContent = item.title || "No Title";  
          titleElement.appendChild(titleLink);
          const descriptionElement = document.createElement("p");
          descriptionElement.classList.add("description");
          descriptionElement.textContent = item.description || "No description available";
          iconBox.appendChild(iconDiv);
          iconBox.appendChild(titleElement);
          iconBox.appendChild(descriptionElement);
            container.appendChild(iconBox);
        } catch (error) {
          console.error('Error creating icon box', error);
        }
      });

      const serviceList = document.getElementById('service-list');
      dataService.forEach((service, index) => {
        const serviceBox = document.createElement('div');
        serviceBox.classList.add('col-lg-4', 'col-md-6', 'wow', 'fadeInUp');
        serviceBox.setAttribute('data-wow-delay', `${(index + 1) * 0.2}s`);
        
        serviceBox.innerHTML = `
            <div class="box">
                <div class="icon">
                    <a href="javascript:void(0);" onclick="openModal('${service.image}', '${service.title}', '${service.description}')">
                      <img src="data:image/png;base64,${service.image}" alt="service icon" style="width: 50px; height: 50px; border-radius: 50%;">
                    </a>
                </div>
                <h4 class="title"><a href="">${service.title}</a></h4>
                <p class="description">${service.description}</p>
            </div>
        `;
        
        serviceList.appendChild(serviceBox);
    });

  }

  //EXECUTE DATA PORTOFOLIO
  const dataInitPortofolio = await initPortofolio();
  if (dataInitPortofolio) {
    const portfolioFlters = document.getElementById('portfolio-flters');
    const categories = new Set();
    dataInitPortofolio.forEach(item => categories.add(item.category));    
    portfolioFlters.innerHTML = `<li data-filter="*" class="filter-active">All</li>`;
    categories.forEach(category => {
      const filterItem = document.createElement('li');
      filterItem.setAttribute('data-filter', `.${category}`);
      filterItem.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      portfolioFlters.appendChild(filterItem);
      filterItem.addEventListener('click', function() {
        portfolioFlters.querySelectorAll('li').forEach(li => li.classList.remove('filter-active'));
        filterItem.classList.add('filter-active');
        const selectedFilter = filterItem.getAttribute('data-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
          if (item.classList.contains(selectedFilter.slice(1))) {
            item.style.display = '';
          } else {
            item.style.display = 'none';  
          }
        });
      });
    });

    const portfolioWrapper = document.getElementById('portfolio-wrapper');
    dataInitPortofolio.forEach(item => {
      const portfolioItem = document.createElement('div');
      portfolioItem.classList.add('col-lg-3', 'col-md-6', 'portfolio-item', item.category); 
      portfolioItem.innerHTML = `
      <a href="javascript:void(0);" onclick="openModal('${item.image}', '${item.title}', '${item.description}')">
        <img src="data:image/png;base64,${item.image}" alt="${item.title}" style="object-fit: cover; object-position: center; width: 100%; height: 100%; ">
        <div class="details">
          <h4>${item.title}</h4>
          <span>${item.description}</span>
        </div>
      </a>
    `;

      portfolioWrapper.appendChild(portfolioItem);
    });

    const allTab = portfolioFlters.querySelector('[data-filter="*"]');
    allTab.addEventListener('click', function() {
      portfolioFlters.querySelectorAll('li').forEach(li => li.classList.remove('filter-active'));
      allTab.classList.add('filter-active');
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      portfolioItems.forEach(item => {
        item.style.display = ''; 
      });
    });


    //EXECUTE DATA CREW
    const initCrewPenjahat = await initCrew();
    if(initCrewPenjahat){
      const teamList = document.getElementById('team-list');
      if (!initCrewPenjahat || initCrewPenjahat.length === 0) {
        teamList.innerHTML = '<p>No team members available.</p>';
        return;
      }

      initCrewPenjahat.forEach(member => {
        const teamMember = document.createElement('div');
        teamMember.classList.add('col-lg-3', 'col-md-6'); 
        teamMember.innerHTML = `
          <div class="member">
            <div class="pic">
              <img src="data:image/png;base64,${member.image}" alt="${member.title}">
            </div>
            <h4>${member.name}</h4>
            <span>${member.title}</span>
            <div class="social">
              <a href="${member.twitter}"><i class="fa fa-twitter"></i></a>
              <a href="${member.facebook}"><i class="fa fa-facebook"></i></a>
              <a href="${member.googlePlus}"><i class="fa fa-google-plus"></i></a>
              <a href="${member.linkedin}"><i class="fa fa-linkedin"></i></a>
            </div>
          </div>
        `;
        
        teamList.appendChild(teamMember);
      });
    }

  }

  document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 
    const formData = {
      nama: document.getElementById('inquiryName').value,
      email: document.getElementById('inquiryEmail').value,
      subject: document.getElementById('inquirySubject').value,
      message: document.getElementById('inquiryMessage').value,
    };

    try {
      const result = await addBooking('http://localhost:8080/booking', formData);
      // Tampilkan pesan sukses
      document.getElementById('sendmessage').style.display = 'block';
      document.getElementById('errormessage').style.display = 'none';
      console.log('Success:', result);
  } catch (error) {
      // Tangani error
      document.getElementById('sendmessage').style.display = 'none';
      document.getElementById('errormessage').style.display = 'block';
      document.getElementById('errormessage').innerText = `Error: ${error.message}`;
      console.error('Error:', error);
  }
  });
});