/**
 * Art Gallery Main Script - Optimized v3.2
 * Features:
 * - Enhanced cart system with navbar counter
 * - Persistent button active states
 * - Smooth animations
 */

(function($) {
    "use strict";

    // Global cart counter
    let cartCount = 0;

    // Initialize when DOM is ready
    $(document).ready(function() {
        initButtonEffects();
        initDropdowns();
        initBackToTop();
        initFavoriteButtons();
        initCartButtons();
        updateCartCounter();
    });

    // ========================
    // 1. BUTTON EFFECTS
    // ========================

    function initButtonEffects() {
        // Remove default Bootstrap button effects
        $('.btn').off('mouseenter mouseleave mousedown mouseup focus blur');
        
        // Custom press effect for all buttons
        $('.btn').on('pointerdown', function(e) {
            e.preventDefault();
            $(this).css({
                'transform': 'scale(0.97)',
                'transition': 'transform 0.5s ease'
            });
        }).on('pointerup pointerleave', function() {
            $(this).css({
                'transform': '',
                'transition': ''
            });
        });
    }

    // ========================
    // 2. DROPDOWN MENUS
    // ========================

    function initDropdowns() {
        $('.dropdown-toggle').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const $menu = $(this).next('.dropdown-menu');
            const $icon = $(this).find('i');
            
            // Close other open menus
            $('.dropdown-menu').not($menu).removeClass('show');
            $('.dropdown-toggle').not(this).removeClass('active').find('i').css('color', '');
            
            // Toggle current menu
            $menu.toggleClass('show');
            $(this).toggleClass('active');
            
            // Toggle icon color (red when active)
            $icon.css('color', $menu.hasClass('show') ? '#ff4757' : '');
            
            // Smooth slide animation
            $menu.stop(true, true)[$menu.hasClass('show') ? 'slideDown' : 'slideUp'](200);
        });

        // Close menus when clicking outside
        $(document).on('click', function() {
            $('.dropdown-menu').slideUp(200).removeClass('show');
            $('.dropdown-toggle').removeClass('active').find('i').css('color', '');
        });
    }

    // ========================
    // 3. BACK TO TOP BUTTON
    // ========================

    function initBackToTop() {
        $(window).on('scroll', function() {
            $('.back-to-top').toggle($(this).scrollTop() > 300);
        });

        $('.back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 800, 'swing');
        });
    }

    // ========================
    // 4. FAVORITE BUTTONS
    // ========================

    function initFavoriteButtons() {
        $('.action-buttons button:first-child').on('click', function() {
            const $icon = $(this).find('i');
            const isActive = $(this).toggleClass('active').hasClass('active');
            
            // Toggle between outline and solid heart icon
            $icon.toggleClass('far fas').css('color', isActive ? '#ff4757' : '');
        });
    }

    // ========================
    // 5. CART BUTTONS SYSTEM
    // ========================

    function initCartButtons() {
        $('.action-buttons button:last-child').on('click', function() {
            const $this = $(this);
            const $icon = $this.find('i');
            
            // Prevent multiple clicks
            if ($this.hasClass('processing')) return;
            $this.addClass('processing active');
            
            // Immediate visual feedback
            $icon.removeClass('fa-shopping-cart').addClass('fa-check').css('color', '#ffffff');
            
            // Create +1 indicators
            createPlusOneIndicators($this);
            
            // Update cart count
            updateCartCounter(++cartCount);
            
            // Reset after animation
            setTimeout(resetCartButton.bind(null, $this, $icon), 2000);
        });
    }

    function createPlusOneIndicators($button) {
        // Add +1 to card button
        const cardPlusOne = $('<span class="plus-one">+1</span>').appendTo($button);
        
        // Add +1 to navbar cart
        const navPlusOne = $('<span class="nav-plus-one">+1</span>').appendTo($('.cart-btn'));
        
        // Animate both indicators
        setTimeout(() => {
            cardPlusOne.add(navPlusOne).css({
                'opacity': '0',
                'transform': 'translateY(-20px)'
            }).delay(300).remove();
        }, 100);
    }

    function resetCartButton($button, $icon) {
        $icon.removeClass('fa-check').addClass('fa-shopping-cart').css('color', '');
        $button.removeClass('processing');
    }

    function updateCartCounter(count) {
        const $cartCounter = $('.cart-counter');
        
        if (count > 0) {
            $cartCounter.length ? $cartCounter.text(count) : 
                $('.cart-btn').append(`<span class="cart-counter">${count}</span>`);
        } else {
            $cartCounter.remove();
        }
    }

})(jQuery);