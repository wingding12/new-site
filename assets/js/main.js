/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $main = $("#main");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Nav.
  var $nav = $("#nav");

  if ($nav.length > 0) {
    // Shrink effect.
    $main.scrollex({
      mode: "top",
      enter: function () {
        $nav.addClass("alt");
      },
      leave: function () {
        $nav.removeClass("alt");
      },
    });

    // Links.
    var $nav_a = $nav.find("a");

    $nav_a
      .scrolly({
        speed: 1000,
        offset: function () {
          return $nav.height();
        },
      })
      .on("click", function () {
        var $this = $(this);

        // External link? Bail.
        if ($this.attr("href").charAt(0) != "#") return;

        // Deactivate all links.
        $nav_a.removeClass("active").removeClass("active-locked");

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
        $this.addClass("active").addClass("active-locked");
      })
      .each(function () {
        var $this = $(this),
          id = $this.attr("href"),
          $section = $(id);

        // No section for this link? Bail.
        if ($section.length < 1) return;

        // Scrollex.
        $section.scrollex({
          mode: "middle",
          initialize: function () {
            // Deactivate section.
            if (browser.canUse("transition")) $section.addClass("inactive");
          },
          enter: function () {
            // Activate section.
            $section.removeClass("inactive");

            // No locked links? Deactivate all links and activate this section's one.
            if ($nav_a.filter(".active-locked").length == 0) {
              $nav_a.removeClass("active");
              $this.addClass("active");
            }

            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass("active-locked"))
              $this.removeClass("active-locked");
          },
        });
      });
  }

  // Scrolly.
  $(".scrolly").scrolly({
    speed: 1000,
  });

  // Positions Toggle.
  var $toggleButton = $("#togglePositions");
  var $additionalPositions = $(".additional-positions");
  var $toggleText = $(".toggle-text");
  var $toggleIcon = $(".toggle-icon");

  if ($toggleButton.length > 0) {
    $toggleButton.on("click", function (e) {
      e.preventDefault();

      var isVisible = $additionalPositions.hasClass("show");

      if (isVisible) {
        // Hide additional positions
        $additionalPositions.removeClass("show");
        $toggleText.text("Show More");
        $toggleIcon.removeClass("rotated");
      } else {
        // Show additional positions
        $additionalPositions.addClass("show");
        $toggleText.text("Show Less");
        $toggleIcon.addClass("rotated");
      }
    });
  }

  // Scroll Animations
  function initScrollAnimations() {
    // Create intersection observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          // Remove animation class when element goes out of view
          entry.target.classList.remove("animate");
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animateElements = document.querySelectorAll(
      "header.major, .features li, .statistics li, .position-entry, .project-entry, .actions, .icon.major"
    );

    animateElements.forEach((el) => {
      observer.observe(el);
    });

    // Special handling for spotlight content (About section)
    const spotlightContent = document.querySelector(".spotlight .content");
    const spotlightImage = document.querySelector(".spotlight .image");

    if (spotlightContent && spotlightImage) {
      const spotlightObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              spotlightContent.classList.add("fade-left");
              spotlightImage.classList.add("fade-right");
            } else {
              // Remove animation classes when element goes out of view
              spotlightContent.classList.remove("fade-left");
              spotlightImage.classList.remove("fade-right");
            }
          });
        },
        { threshold: 0.2 }
      );

      spotlightObserver.observe(spotlightContent);
    }

    // Special handling for footer
    const footer = document.querySelector("#footer");
    if (footer) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              footer.classList.add("slide-bottom");
            } else {
              // Remove animation class when element goes out of view
              footer.classList.remove("slide-bottom");
            }
          });
        },
        { threshold: 0.1 }
      );

      footerObserver.observe(footer);
    }
  }

  // Initialize animations when DOM is ready
  $(document).ready(function () {
    initScrollAnimations();
  });
})(jQuery);
