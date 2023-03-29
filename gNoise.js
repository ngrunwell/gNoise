
gNoiseDetail = function(lod, falloff) {
  if (lod > 0) {
    perlin_octaves = lod;
  }
  if (falloff > 0) {
    perlin_amp_falloff = falloff;
  }
};


gNoiseSeed = function(seed) {
  // Linear Congruential Generator
  // Variant of a Lehman Generator
  var lcg = (function() {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    var m = 4294967296;
    // a - 1 should be divisible by m's prime factors
    var a = 1664525;
    // c and m should be co-prime
    var c = 1013904223;
    var seed, z;
    return {
      setSeed: function setSeed(val) {
        // pick a random seed if val is undefined or null
        // the >>> 0 casts the seed to an unsigned 32-bit integer
        z = seed = (val == null ? Math.random() * m : val) >>> 0;
      },
      getSeed: function getSeed() {
        return seed;
      },
      rand: function rand() {
        // define the recurrence relationship
        z = (a * z + c) % m;
        // return a float in [0, 1)
        // if z = m then z / m = 0 therefore (z % m) / m < 1 always
        return z / m;
      }
    };
  })();

  lcg.setSeed(seed);
  perlin = new Array(PERLIN_SIZE + 1);
  for (var i = 0; i < PERLIN_SIZE + 1; i++) {
    perlin[i] = lcg.rand();
  }
};

        var PERLIN_YWRAPB = 4;
        var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
        var PERLIN_ZWRAPB = 8;
        var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
        var PERLIN_SIZE = 4095;
        var perlin_octaves = 4; // default to medium smooth
        var perlin_amp_falloff = 0.5; // 50% reduction/octave

        var easeOutSine = function easeOutSine(i) {
          return Math.sin((i * Math.PI) / 2);
        };
        var easeInSine = function easeInSine(i) {
          return 1 - Math.cos((i * Math.PI) / 2);
        };
        var easeInOutSine = function easeInOutSine(i) {
          return -(Math.cos(Math.PI * i) - 1) / 2;
        };
        var easeInQuad = function easeInQuad(i) {
          return i * i;
        };
        var easeOutQuad = function easeOutQuad(i) {
          return 1 - (1 - i) * (1 - i);
        };
        var easeInOutQuad = function easeInOutQuad(i) {
          return i < 0.5 ? 2 * i * i : 1 - Math.pow(-2 * i + 2, 2) / 2;
        };
        var easeInCubic = function easeInCubic(i) {
          return i * i * i;
        };
        var easeOutCubic = function easeOutCubic(i) {
          return 1 - Math.pow(1 - i, 3);
        };
        var easeInOutCubic = function easeInOutCubic(i) {
          return i < 0.5 ? 4 * i * i * i : 1 - Math.pow(-2 * i + 2, 3) / 2;
        };
        var easeInQuart = function easeInQuart(i) {
          return i * i * i * i;
        };
        var easeOutQuart = function easeOutQuart(i) {
          return 1 - Math.pow(1 - i, 4);
        };
        var easeInOutQuart = function easeInOutQuart(i) {
          return i < 0.5 ? 8 * i * i * i * i : 1 - Math.pow(-2 * i + 2, 4) / 2;
        };
        var easeInQuint = function easeInQuint(i) {
          return i * i * i * i * i;
        };
        var easeOutQuint = function easeOutQuint(i) {
          return 1 - Math.pow(1 - i, 5);
        };
        var easeInOutQuint = function easeInOutQuint(i) {
          return i < 0.5 ? 16 * i * i * i * i * i : 1 - Math.pow(-2 * i + 2, 5) / 2;
        };

        var easeInExpo = function easeInExpo(i) {
          return i === 0 ? 0 : Math.pow(2, 10 * i - 10);
        };

        var easeOutExpo = function easeOutExpo(i) {
          return i === 1 ? 1 : 1 - Math.pow(2, -10 * i);
        };


        var easeInOutExpo = function easeInOutExpo(i) {
          return i === 0
            ? 0
            : i === 1
              ? 1
              : i < 0.5 ? Math.pow(2, 20 * i - 10) / 2
                : (2 - Math.pow(2, -20 * i + 10)) / 2;
        };

        var easeInCirc = function easeInCirc(i) {
          return 1 - Math.sqrt(1 - Math.pow(i, 2));
        };

        var easeOutCirc = function easeOutCirc(i) {
          return sqrt(1 - Math.pow(i - 1, 2));
        };
        var easeInOutCirc = function easeInOutCirc(i) {
          return i < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * i, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * i + 2, 2)) + 1) / 2;
        };

        var easeInBack = function easeInBack(i) {
          const c1 = 1.70158;
          const c3 = c1 + 1;

          return c3 * i * i * i - c1 * i * i;
        };

        var easeOutBack = function easeOutBack(i) {
          const c1 = 1.70158;
          const c3 = c1 + 1;

          return 1 + c3 * Math.pow(i - 1, 3) + c1 * Math.pow(i - 1, 2);
        };
        var easeInOutBack = function easeInOutBack(i) {
          const c1 = 1.70158;
          const c2 = c1 * 1.525;

          return i < 0.5
            ? (Math.pow(2 * i, 2) * ((c2 + 1) * 2 * i - c2)) / 2
            : (Math.pow(2 * i - 2, 2) * ((c2 + 1) * (i * 2 - 2) + c2) + 2) / 2;
        };


        var easeInElastic = function easeInElastic(i) {
          const c4 = (2 * Math.PI) / 3;

          return i === 0
            ? 0
            : i === 1
              ? 1
              : -Math.pow(2, 10 * i - 10) * Math.sin((i * 10 - 10.75) * c4);
        };

        var easeOutElastic = function easeOutElastic(i) {
          return i === 0
            ? 0
            : i === 1
              ? 1
              : Math.pow(2, -10 * i) * Math.sin((i * 10 - 0.75) * (2 * Math.PI) / 3) + 1;
        };

        var easeInOutElastic = function easeInOutElastic(i) {
          const c5 = (2 * Math.PI) / 4.5;

          return i === 0
            ? 0
            : i === 1
              ? 1
              : i < 0.5
                ? -(Math.pow(2, 20 * i - 10) * Math.sin((20 * i - 11.125) * c5)) / 2
                : (Math.pow(2, -20 * i + 10) * Math.sin((20 * i - 11.125) * c5)) / 2 + 1;
        };

        var easeInBounce = function easeInBounce(i) {
          return 1 - easeOutBounce(1 - i);
        };

        var easeOutBounce = function easeOutBounce(i) {
          const n1 = 7.5625;
          const d1 = 2.75;

          if (i < 1 / d1) {
            return n1 * i * i;
          } else if (i < 2 / d1) {
            return n1 * (i -= 1.5 / d1) * i + 0.75;
          } else if (i < 2.5 / d1) {
            return n1 * (i -= 2.25 / d1) * i + 0.9375;
          } else {
            return n1 * (i -= 2.625 / d1) * i + 0.984375;
          }
        };

        var easeInOutBounce = function easeInOutBounce(i) {
          return i < 0.5
            ? (1 - easeOutBounce(1 - 2 * i)) / 2
            : (1 + easeOutBounce(2 * i - 1)) / 2;
        };

        var scaled_cosine = function scaled_cosine(i) {
          return 0.5 * (1 - Math.cos(i * Math.PI));
        };


        var perlin; // will be initialized lazily by noise() or noiseSeed()
/**
* Returns the Perlin noise value at specified coordinates. Perlin noise is
* a random sequence generator producing a more naturally ordered, harmonic
* succession of numbers compared to the standard <a href="#/p5/random">random()</a> function.
* It was invented by Ken Perlin in the 1980s and been used since in
* graphical applications to produce procedural textures, natural motion,
* shapes, terrains etc.<br /><br /> The main difference to the
* <a href="#/p5/random">random()</a> function is that Perlin noise is defined in an infinite
* n-dimensional space where each pair of coordinates corresponds to a
* fixed semi-random value (fixed only for the lifespan of the program; see
* the <a href="#/p5/noiseSeed">noiseSeed()</a> function). p5.js can compute 1D, 2D and 3D noise,
* depending on the number of coordinates given. The resulting value will
* always be between 0.0 and 1.0. The noise value can be animated by moving
* through the noise space as demonstrated in the example above. The 2nd
* and 3rd dimensions can also be interpreted as time.<br /><br />The actual
* noise is structured similar to an audio signal, in respect to the
* function's use of frequencies. Similar to the concept of harmonics in
* physics, Perlin noise is computed over several octaves which are added
* together for the final result. <br /><br />Another way to adjust the
* character of the resulting sequence is the scale of the input
* coordinates. As the function works within an infinite space the value of
* the coordinates doesn't matter as such, only the distance between
* successive coordinates does (eg. when using <a href="#/p5/noise">noise()</a> within a
* loop). As a general rule the smaller the difference between coordinates,
* the smoother the resulting noise sequence will be. Steps of 0.005-0.03
* work best for most applications, but this will differ depending on use.
*
* @method noise
* @param  {Number} x   x-coordinate in noise space
* @param  {Number} [y] y-coordinate in noise space
* @param  {Number} [z] z-coordinate in noise space
* @return {Number}     Perlin noise value (between 0 and 1) at specified
*                      coordinates
* @example
* <div>
* <code>
* let xoff = 0.0;
*
* function draw() {
*   background(204);
*   xoff = xoff + 0.01;
*   let n = noise(xoff) * width;
*   line(n, 0, n, height);
*   describe(`vertical line moves left to right with updating
*     noise values.`);
* }
* </code>
* </div>
* <div>
* <code>let noiseScale=0.02;
*
* function draw() {
*   background(0);
*   for (let x=0; x < width; x++) {
*     let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
*     stroke(noiseVal*255);
*     line(x, mouseY+noiseVal*80, x, height);
*   }
*   describe(`horizontal wave pattern effected by mouse x-position
*     & updating noise values.`);
* }
* </code>
* </div>
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
*/gNoise = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutSine(xf);
            ryf = easeOutSine(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutSine(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise2 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInSine(xf);
            ryf = easeInSine(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInSine(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise3 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutSine(xf);
            ryf = easeInOutSine(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutSine(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise4 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInQuad(xf);
            ryf = easeInQuad(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInQuad(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise5 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutQuad(xf);
            ryf = easeOutQuad(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutQuad(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise6 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutQuad(xf);
            ryf = easeInOutQuad(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutQuad(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise7 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInCubic(xf);
            ryf = easeInCubic(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInCubic(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise8 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutCubic(xf);
            ryf = easeOutCubic(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutCubic(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise9 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutCubic(xf);
            ryf = easeInOutCubic(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutCubic(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise10 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInQuart(xf);
            ryf = easeInQuart(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInQuart(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise11 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutQuart(xf);
            ryf = easeOutQuart(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutQuart(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise12 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutQuart(xf);
            ryf = easeInOutQuart(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutQuart(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise13 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInQuint(xf);
            ryf = easeInQuint(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInQuint(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise14 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutQuint(xf);
            ryf = easeOutQuint(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutQuint(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise15 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutQuint(xf);
            ryf = easeInOutQuint(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutQuint(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise16 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInExpo(xf);
            ryf = easeInExpo(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInExpo(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise17 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutExpo(xf);
            ryf = easeOutExpo(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutExpo(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise18 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutExpo(xf);
            ryf = easeInOutExpo(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutExpo(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise19 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInCirc(xf);
            ryf = easeInCirc(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInCirc(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise20 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutCirc(xf);
            ryf = easeOutCirc(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutCirc(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise21 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutCirc(xf);
            ryf = easeInOutCirc(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutCirc(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise22 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInBack(xf);
            ryf = easeInBack(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInBack(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise23 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutBack(xf);
            ryf = easeOutBack(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutBack(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise24 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutBack(xf);
            ryf = easeInOutBack(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutBack(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise25 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInElastic(xf);
            ryf = easeInElastic(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInElastic(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise26 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutElastic(xf);
            ryf = easeOutElastic(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutElastic(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise27 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutElastic(xf);
            ryf = easeInOutElastic(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutElastic(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise28 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInBounce(xf);
            ryf = easeInBounce(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInBounce(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise29 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeOutBounce(xf);
            ryf = easeOutBounce(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeOutBounce(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
        gNoise30 = function (x) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
              perlin[i] = Math.random();
            }
          }
          if (x < 0) {
            x = - x;
          }
          if (y < 0) {
            y = - y;
          }
          if (z < 0) {
            z = - z;
          }
          var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
          var xf = x - xi;
          var yf = y - yi;
          var zf = z - zi;
          var rxf,
            ryf;
          var r = 0;
          var ampl = 0.5;
          var n1,
            n2,
            n3;
          for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = easeInOutBounce(xf);
            ryf = easeInOutBounce(yf);
            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
            n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
            n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += easeInOutBounce(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        };