/**
 * @author Paul Scott
 * @version 2 November 2019
 *
 * main javascript file used for misc. ui functions
 */

// chip8 variable
let chip8 = null;

/**
 * loads emulator when page loads
 */
$(document).ready(async function () {

  // create chip 8 instance
  chip8 = new Chip8();

  // add listeners for mobile virtual keys
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('touchstart', keypad_down, false);
    keys[i].addEventListener('touchend', keypad_up, false);
  }

  // program list
  let prg_list = ['15 Puzzle [Roger Ivie] (alt).ch8', '15 Puzzle [Roger Ivie].ch8', 'Addition Problems [Paul C. Moews].ch8', 'Airplane.ch8', 'Animal Race [Brian Astle].ch8', 'Astro Dodge [Revival Studios, 2008].ch8', 'Biorhythm [Jef Winsor].ch8', 'Blinky [Hans Christian Egeberg, 1991].ch8', 'Blinky [Hans Christian Egeberg] (alt).ch8', 'Blitz [David Winter].ch8', 'BMP Viewer - Hello (C8 example) [Hap, 2005].ch8', 'Bowling [Gooitzen van der Wal].ch8', 'Breakout (Brix hack) [David Winter, 1997].ch8', 'Breakout [Carmelo Cortez, 1979].ch8', 'Brick (Brix hack, 1990).ch8', 'Brix [Andreas Gustafsson, 1990].ch8', 'Cave.ch8', 'Chip8 emulator Logo [Garstyciuks].ch8', 'Chip8 Picture.ch8', 'Clock Program [Bill Fisher, 1981].ch8', 'Coin Flipping [Carmelo Cortez, 1978].ch8', 'Connect 4 [David Winter].ch8', 'Craps [Camerlo Cortez, 1978].ch8', 'Deflection [John Fort].ch8', 'Delay Timer Test [Matthew Mikolay, 2010].ch8', 'Division Test [Sergey Naydenov, 2010].ch8', 'Figures.ch8', 'Filter.ch8', 'Fishie [Hap, 2005].ch8', 'Framed MK1 [GV Samways, 1980].ch8', 'Framed MK2 [GV Samways, 1980].ch8', 'Guess [David Winter] (alt).ch8', 'Guess [David Winter].ch8', 'Hi-Lo [Jef Winsor, 1978].ch8', 'Hidden [David Winter, 1996].ch8', 'IBM Logo.ch8', 'Jumping X and O [Harry Kleinberg, 1977].ch8', 'Kaleidoscope [Joseph Weisbecker, 1978].ch8', 'Keypad Test [Hap, 2006].ch8', 'Landing.ch8', 'Life [GV Samways, 1980].ch8', 'Lunar Lander (Udo Pernisz, 1979).ch8', 'Mastermind FourRow (Robert Lindley, 1978).ch8', 'Maze (alt) [David Winter, 199x].ch8', 'Maze [David Winter, 199x].ch8', 'Merlin [David Winter].ch8', 'Minimal game [Revival Studios, 2007].ch8', 'Missile [David Winter].ch8', 'Most Dangerous Game [Peter Maruhnic].ch8', 'Nim [Carmelo Cortez, 1978].ch8', 'Paddles.ch8', 'Particle Demo [zeroZshadow, 2008].ch8', 'Pong (1 player).ch8', 'Pong (alt).ch8', 'Pong 2 (Pong hack) [David Winter, 1997].ch8', 'Pong [Paul Vervalin, 1990].ch8', 'Programmable Spacefighters [Jef Winsor].ch8', 'Puzzle.ch8', 'Random Number Test [Matthew Mikolay, 2010].ch8', 'Reversi [Philip Baltzer].ch8', 'Rocket Launch [Jonas Lindstedt].ch8', 'Rocket Launcher.ch8', 'Rocket [Joseph Weisbecker, 1978].ch8', 'Rush Hour [Hap, 2006] (alt).ch8', 'Rush Hour [Hap, 2006].ch8', 'Russian Roulette [Carmelo Cortez, 1978].ch8', 'Sequence Shoot [Joyce Weisbecker].ch8', 'Shooting Stars [Philip Baltzer, 1978].ch8', 'Sierpinski [Sergey Naydenov, 2010].ch8', 'Sirpinski [Sergey Naydenov, 2010].ch8', 'Slide [Joyce Weisbecker].ch8', 'Soccer.ch8', 'Space Flight.ch8', 'Space Intercept [Joseph Weisbecker, 1978].ch8', 'Space Invaders [David Winter] (alt).ch8', 'Space Invaders [David Winter].ch8', 'Spooky Spot [Joseph Weisbecker, 1978].ch8', 'SQRT Test [Sergey Naydenov, 2010].ch8', 'Squash [David Winter].ch8', 'Stars [Sergey Naydenov, 2010].ch8', 'Submarine [Carmelo Cortez, 1978].ch8', 'Sum Fun [Joyce Weisbecker].ch8', 'Syzygy [Roy Trevino, 1990].ch8', 'Tank.ch8', 'Tapeworm [JDR, 1999].ch8', 'Tetris [Fran Dachille, 1991].ch8', 'Tic-Tac-Toe [David Winter].ch8', 'Timebomb.ch8', 'Trip8 Demo (2008) [Revival Studios].ch8', 'Tron.ch8', 'UFO [Lutz V, 1992].ch8', 'Vers [JMN, 1991].ch8', 'Vertical Brix [Paul Robson, 1996].ch8', 'Wall [David Winter].ch8', 'Wipe Off [Joseph Weisbecker].ch8', 'Worm V4 [RB-Revival Studios, 2007].ch8', 'X-Mirror.ch8', 'Zero Demo [zeroZshadow, 2007].ch8', 'ZeroPong [zeroZshadow, 2007].ch8'];

  // add programs to rom list menu
  let list = document.getElementById('rom_list');
  list.innerHTML += "<ul>";
  for (let i = 0; i < prg_list.length; i++) {
    list.innerHTML += `<li><a onclick='run_emulator("${prg_list[i]}")'> ${prg_list[i]} </a></li>`;
  }
  list.innerHTML += "</ul>";
});

/**
 * runs chip8 emulator
 * @param file specified rom
 * @returns {Promise<void>}
 */
async function run_emulator(file) {

  // break out of instruction 0xF00A
  chip8.key[0] = 1;
  await sleep(10);
  chip8.key[0] = 0;

  // stop emulation
  chip8.stop();
  await sleep(10);

  // load specified rom and run emulator
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "roms/" + file, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    chip8.reset();
    chip8.loadProgram(new Uint8Array(xhr.response));
  };
  xhr.send();
  chip8.run();
}

/**
 * pause script
 * @param ns
 * @returns {Promise}
 */
function sleep(ns) {
  return new Promise(resolve => setTimeout(resolve, ns));
}

/**
 * sends key pressed events to emulator
 * @param e - key event
 */
document.onkeydown = function (e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 49:
      chip8.keypress(0x1, 1);
      break;
    case 50:
      chip8.keypress(0x2, 1);
      break;
    case 51:
      chip8.keypress(0x3, 1);
      break;
    case 52:
      chip8.keypress(0xC, 1);
      break;
    case 81:
      chip8.keypress(0x4, 1);
      break;
    case 87:
      chip8.keypress(0x5, 1);
      break;
    case 69:
      chip8.keypress(0x6, 1);
      break;
    case 82:
      chip8.keypress(0xD, 1);
      break;
    case 65:
      chip8.keypress(0x7, 1);
      break;
    case 83:
      chip8.keypress(0x8, 1);
      break;
    case 68:
      chip8.keypress(0x9, 1);
      break;
    case 70:
      chip8.keypress(0xE, 1);
      break;
    case 90:
      chip8.keypress(0xA, 1);
      break;
    case 88:
      chip8.keypress(0x0, 1);
      break;
    case 67:
      chip8.keypress(0xB, 1);
      break;
    case 86:
      chip8.keypress(0xF, 1);
      break;
  }
};

/**
 * sends key released events to emulator
 * @param e - key event
 */
document.onkeyup = function (e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 49:
      chip8.keypress(0x1, 0);
      break;
    case 50:
      chip8.keypress(0x2, 0);
      break;
    case 51:
      chip8.keypress(0x3, 0);
      break;
    case 52:
      chip8.keypress(0xC, 0);
      break;
    case 81:
      chip8.keypress(0x4, 0);
      break;
    case 87:
      chip8.keypress(0x5, 0);
      break;
    case 69:
      chip8.keypress(0x6, 0);
      break;
    case 82:
      chip8.keypress(0xD, 0);
      break;
    case 65:
      chip8.keypress(0x7, 0);
      break;
    case 83:
      chip8.keypress(0x8, 0);
      break;
    case 68:
      chip8.keypress(0x9, 0);
      break;
    case 70:
      chip8.keypress(0xE, 0);
      break;
    case 90:
      chip8.keypress(0xA, 0);
      break;
    case 88:
      chip8.keypress(0x0, 0);
      break;
    case 67:
      chip8.keypress(0xB, 0);
      break;
    case 86:
      chip8.keypress(0xF, 0);
      break;
  }
};

/**
 * toggle rom list and controls menu
 * @param component
 */
function menu_toggle(component) {

  // get rom list and controls components
  let list = document.getElementById("rom_list");
  let controls = document.getElementById("controls");

  // show rom list
  if (component.id === "roms") {
    if (list.style.display === "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
    controls.style.display = "none";
  }

  // show controls
  else {
    if (controls.style.display === "none") {
      controls.style.display = "block";
    } else {
      controls.style.display = "none";
    }
    list.style.display = "none";
  }
}

/**
 * hide rom list and controls menu
 */
$(document).mouseup(function() {
  let controls = document.getElementById("controls");
  let list = document.getElementById("rom_list");
  controls.style.display = 'none';
  list.style.display = 'none';
});
