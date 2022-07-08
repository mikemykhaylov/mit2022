/*!
 * Sakura.js 1.1.1
 * Vanilla JS version of jQuery-Sakura: Make it rain sakura petals.
 * https://github.com/jhammann/sakura
 *
 * Copyright 2019-2019 Jeroen Hammann
 *
 * Released under the MIT License
 *
 * Released on: September 4, 2019
 */
"use strict";

var Star = function Star(selector, options) {
  var _this = this;

  if (typeof selector === "undefined") {
    throw new Error("No selector present. Define an element.");
  }
  console.log("s", selector);
  this.el = document.getElementById(selector); // Defaults for the option object, which gets extended below.
  // this.el = document.body;
  console.log("el", this.el);
  var defaults = {
    className: "star",
    // Classname of the petal. This corresponds with the css.
    fallSpeed: 1,
    // Speed factor in which the petal falls (higher is slower).
    maxSize: 14,
    // The maximum size of the petal.
    minSize: 10,
    // The minimum size of the petal.
    delay: 200,
    // Delay between petals.
    colors: [
      {
        // You can add multiple colors (chosen randomly) by adding elements to the array.
        gradientColorStart: "rgba(255, 183, 197, 1)",
        // Gradient color start (rgba).
        gradientColorEnd: "rgba(255, 197, 208, 1)",
        // Gradient color end (rgba).
        gradientColorDegree: 120, // Gradient degree angle.
      },
    ],
  }; // Merge defaults with user options.

  var extend = function extend(originalObj, newObj) {
    Object.keys(originalObj).forEach(function (key) {
      if (newObj && Object.prototype.hasOwnProperty.call(newObj, key)) {
        var origin = originalObj;
        origin[key] = newObj[key];
      }
    });
    return originalObj;
  };

  this.settings = extend(defaults, options); // Hide horizontal scrollbars on the target element.
  this.el.style.overflowX = "hidden"; // Random array element

  function randomArrayElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  } // Random integer

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } // Check for animation events.

  var prefixes = ["webkit", "moz", "MS", "o", ""];

  function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < prefixes.length; p += 1) {
      var animType = type;

      if (!prefixes[p]) {
        animType = type.toLowerCase();
      }

      element.addEventListener(prefixes[p] + animType, callback, false);
    }
  } // Check if the element is in the viewport.

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  this.createArm = function () {
    if (_this.el.dataset.starAnimId) {
      setTimeout(function () {
        window.requestAnimationFrame(_this.createArm);
      }, _this.settings.delay);
    } // Name the animations. These have to match the animations in the CSS file.

    var animationNames = {
      blowAnimations: [
        "blow-soft-left",
        "blow-medium-left",
        "blow-soft-right",
        "blow-medium-right",
      ],
      swayAnimations: [
        "sway-0",
        "sway-1",
        "sway-2",
        "sway-3",
        "sway-4",
        "sway-5",
        "sway-6",
        "sway-7",
        "sway-8",
      ],
    }; // Get one random animation of each type and randomize fall time of the petals

    var blowAnimation = randomArrayElem(animationNames.blowAnimations);
    var swayAnimation = randomArrayElem(animationNames.swayAnimations);

    var fallTime =
      (document.documentElement.clientHeight * 0.007 +
        Math.round(Math.random() * 5)) *
      _this.settings.fallSpeed; // Create animations

    var animationsArr = [
      "fall ".concat(fallTime, "s linear 0s 1"),
      ""
        .concat(blowAnimation, " ")
        .concat(
          (fallTime > 30 ? fallTime : 30) - 20 + randomInt(0, 20),
          "s linear 0s infinite"
        ),
      ""
        .concat(swayAnimation, " ")
        .concat(randomInt(2, 4), "s linear 0s infinite"),
    ];
    var animations = animationsArr.join(", "); // Create petal and give it a random size.

    var arm = document.createElement("div");
    arm.classList.add(_this.settings.className);
    var height = randomInt(_this.settings.minSize, _this.settings.maxSize);
    var width = height - Math.floor(randomInt(0, _this.settings.minSize) / 3); // Get a random color.

    var color = randomArrayElem(_this.settings.colors);
    arm.style.background = "linear-gradient("
      .concat(color.gradientColorDegree, "deg, ")
      .concat(color.gradientColorStart, ", ")
      .concat(color.gradientColorEnd, ")");
    arm.style.webkitAnimation = animations;
    arm.style.animation = animations;
    arm.style.borderRadius = ""
      .concat(
        randomInt(
          _this.settings.maxSize,
          _this.settings.maxSize + Math.floor(Math.random() * 10)
        ),
        "px "
      )
      .concat(randomInt(1, Math.floor(width / 4)), "px");
    arm.style.height = "".concat(height, "px");
    arm.style.left = "".concat(
      Math.random() * document.documentElement.clientWidth - 100,
      "px"
    );
    arm.style.marginTop = "".concat(
      -(Math.floor(Math.random() * 20) + 15),
      "px"
    );
    arm.style.width = "".concat(width, "px"); // Remove petals of which the animation ended.

    PrefixedEvent(arm, "AnimationEnd", function () {
      if (!elementInViewport(arm)) {
        arm.remove();
      }
    }); // Remove petals that float out of the viewport.

    PrefixedEvent(arm, "AnimationIteration", function () {
      if (!elementInViewport(arm)) {
        arm.remove();
      }
    }); // Add the petal to the target element.

    _this.el.appendChild(arm);
  };

  this.el.setAttribute(
    "data-star-anim-id",
    window.requestAnimationFrame(this.createArm)
  );
};

Star.prototype.start = function () {
  var animId = this.el.dataset.starAnimId;

  if (!animId) {
    this.el.setAttribute(
      "data-star-anim-id",
      window.requestAnimationFrame(this.createArm)
    );
  } else {
    throw new Error("Star is already running.");
  }
};

Star.prototype.stop = function () {
  var _this2 = this;

  var graceful =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var animId = this.el.dataset.starAnimId;

  if (animId) {
    window.cancelAnimationFrame(animId);
    this.el.setAttribute("data-star-anim-id", "");
  } // Remove all current blossoms at once.
  // You can also set 'graceful' to true to stop new petals from being created.
  // This way the petals won't be removed abruptly.

  if (!graceful) {
    setTimeout(function () {
      var arms = document.getElementsByClassName(_this2.settings.className);

      while (arms.length > 0) {
        arms[0].parentNode.removeChild(arms[0]);
      }
    }, this.settings.delay + 50);
  }
};
