import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jQuery from 'jquery';
import Header from './Header';
import Footer from './Footer';
import FeatureProduct from './FeatureProduct';
import Feature from './Feature';
import Login from './Login';
import Category from './Category';
import Product from './Product';
import './App.css';
// import './vendor/jquery/jquery-3.2.1.min.js';

class App extends React.Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {

    (function ($) {
      "use strict";
      
      /*[ Load page ]
      ===========================================================*/
      // $(".animsition").animsition({
      //   inClass: 'fade-in',
      //   outClass: 'fade-out',
      //   inDuration: 1500,
      //   outDuration: 800,
      //   linkElement: '.animsition-link',
      //   loading: true,
      //   loadingParentElement: 'html',
      //   loadingClass: 'animsition-loading-1',
      //   loadingInner: '<div data-loader="ball-scale"></div>',
      //   timeout: false,
      //   timeoutCountdown: 5000,
      //   onLoadEvent: true,
      //   browser: ['animation-duration', '-webkit-animation-duration'],
      //   overlay: false,
      //   overlayClass: 'animsition-overlay-slide',
      //   overlayParentElement: 'html',
      //   transition: function (url) { window.location.href = url; }
      // });

      /*[ Back to top ]
      ===========================================================*/
      var windowH = $(window).height() / 2;

      $(window).on('scroll', function () {
        if ($(this).scrollTop() > windowH) {
          $("#myBtn").css('display', 'flex');
        } else {
          $("#myBtn").css('display', 'none');
        }
      });

      $('#myBtn').on("click", function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
      });

      $('.js-show-header-dropdown').on('click', function () {
        $(this).parent().find('.header-dropdown')
      });

      var menu = $('.js-show-header-dropdown');
      var sub_menu_is_showed = -1;

      for (var i = 0; i < menu.length; i++) {
        $(menu[i]).on('click', function () {

          if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
            $(this).parent().find('.header-dropdown').toggleClass('show-header-dropdown');
            sub_menu_is_showed = -1;
          }
          else {
            for (var i = 0; i < menu.length; i++) {
              $(menu[i]).parent().find('.header-dropdown').removeClass("show-header-dropdown");
            }

            $(this).parent().find('.header-dropdown').toggleClass('show-header-dropdown');
            sub_menu_is_showed = jQuery.inArray(this, menu);
          }
        });
      }

      $(".js-show-header-dropdown, .header-dropdown").click(function (event) {
        event.stopPropagation();
      });

      $(window).on("click", function () {
        for (var i = 0; i < menu.length; i++) {
          $(menu[i]).parent().find('.header-dropdown').removeClass("show-header-dropdown");
        }
        sub_menu_is_showed = -1;
      });

      var posWrapHeader = $('.topbar').height();
      var header = $('.container-menu-header');

      $(window).on('scroll', function () {

        if ($(this).scrollTop() >= posWrapHeader) {
          $('.header1').addClass('fixed-header');
          $(header).css('top', -posWrapHeader);

        }
        else {
          var x = - $(this).scrollTop();
          $(header).css('top', x);
          $('.header1').removeClass('fixed-header');
        }

        if ($(this).scrollTop() >= 200 && $(window).width() > 992) {
          $('.fixed-header2').addClass('show-fixed-header2');
          $('.header2').css('visibility', 'hidden');
          $('.header2').find('.header-dropdown').removeClass("show-header-dropdown");

        }
        else {
          $('.fixed-header2').removeClass('show-fixed-header2');
          $('.header2').css('visibility', 'visible');
          $('.fixed-header2').find('.header-dropdown').removeClass("show-header-dropdown");
        }

      });

      $('.btn-show-menu-mobile').on('click', function () {
        $(this).toggleClass('is-active');
        $('.wrap-side-menu').slideToggle();
      });

      var arrowMainMenu = $('.arrow-main-menu');

      for (var i = 0; i < arrowMainMenu.length; i++) {
        $(arrowMainMenu[i]).on('click', function () {
          $(this).parent().find('.sub-menu').slideToggle();
          $(this).toggleClass('turn-arrow');
        })
      }

      $(window).resize(function () {
        if ($(window).width() >= 992) {
          if ($('.wrap-side-menu').css('display') == 'block') {
            $('.wrap-side-menu').css('display', 'none');
            $('.btn-show-menu-mobile').toggleClass('is-active');
          }
          if ($('.sub-menu').css('display') == 'block') {
            $('.sub-menu').css('display', 'none');
            $('.arrow-main-menu').removeClass('turn-arrow');
          }
        }
      });


      $('.btn-romove-top-noti').on('click', function () {
        $(this).parent().remove();
      })

      $('.block2-btn-addwishlist').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('block2-btn-towishlist');
        $(this).removeClass('block2-btn-addwishlist');
        $(this).off('click');
      });

      $('.btn-num-product-down').on('click', function (e) {
        e.preventDefault();
        var numProduct = Number($(this).next().val());
        if (numProduct > 1) $(this).next().val(numProduct - 1);
      });

      $('.btn-num-product-up').on('click', function (e) {
        e.preventDefault();
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
      });

      $('.active-dropdown-content .js-toggle-dropdown-content').toggleClass('show-dropdown-content');
      $('.active-dropdown-content .dropdown-content').slideToggle('fast');

      $('.js-toggle-dropdown-content').on('click', function () {
        $(this).toggleClass('show-dropdown-content');
        $(this).parent().find('.dropdown-content').slideToggle('fast');
      });

      var srcOld = $('.video-mo-01').children('iframe').attr('src');

      $('[data-target="#modal-video-01"]').on('click', function () {
        $('.video-mo-01').children('iframe')[0].src += "&autoplay=1";

        setTimeout(function () {
          $('.video-mo-01').css('opacity', '1');
        }, 300);
      });

      $('[data-dismiss="modal"]').on('click', function () {
        $('.video-mo-01').children('iframe')[0].src = srcOld;
        $('.video-mo-01').css('opacity', '0');
      });

    })(jQuery);
  }

  render() {
    return (
      <React.Fragment>
        <Header isLoggedIn={this.state.isLoggedIn}/>
        <Switch>
          <Route path="/" exact>
            <FeatureProduct />
            <Feature />
          </Route>
          <Route path="/category/:id" exact>
            <Category />
          </Route>
          <Route path="/product/:id" exact>
            <Product />
          </Route>
          <Route path="/auth/login" exact>
            <Login />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;