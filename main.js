(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    /** new addition start*/
    document.querySelectorAll('.details-icon').forEach(btn => {
        btn.addEventListener('click', () => {
            const menu = btn.nextElementSibling;
            menu.classList.toggle('show');
        });
    });

    // إغلاق القائمة لو تم الضغط خارجها
    window.addEventListener('click', function (e) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    });
    /**new addition end */

    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    fetch('getHighlights.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.title === 'Most Featured Artist') {
                    document.getElementById('featured-count').textContent = item.count;
                } else if (item.title === 'Competition Winner') {
                    document.getElementById('winner-count').textContent = item.count;
                } else if (item.title === 'Top Learner') {
                    document.getElementById('learner-count').textContent = item.count;
                }
            });
        });




    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Favorite functionality
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });

    // Cart functionality
    document.querySelectorAll('.cart-icon').forEach(icon => {
        icon.addEventListener('click', function () {
            this.classList.toggle('added');
            const iconElement = this.querySelector('i');

            if (this.classList.contains('added')) {
                iconElement.classList.remove('fa-shopping-cart');
                iconElement.classList.add('fa-check');
            } else {
                iconElement.classList.remove('fa-check');
                iconElement.classList.add('fa-shopping-cart');
            }
        });
    });

    // Details icon functionality
    document.querySelectorAll('.details-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            const cardTitle = this.closest('.card').querySelector('.card-title').textContent;
            alert(`Showing details for: ${cardTitle}`);
        });
    });
    // artwok featured end



    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 4
            },
            768: {
                items: 6
            },
            992: {
                items: 8
            }
        }
    });

})(jQuery);

