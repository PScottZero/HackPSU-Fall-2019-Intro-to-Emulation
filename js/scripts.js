/**
 * @author Paul Scott
 * @version 2 November 2019
 *
 * main javascript file used for misc ui functions
 */

// chip8 variable
let chip8 = null;

/**
 * loads emulator when page loads
 */
$(document).ready(async function () {

  // create chip 8 instance
  chip8 = new Chip8();

  let fileInput = document.getElementById("file_input");
  fileInput.onchange = function(event) {
    run_emulator(event.target.files[0]);
  }
});

/**
 * runs chip8 emulator
 * @param file specified rom
 * @returns {Promise<void>}
 */
async function run_emulator(file) {

  // breaks out of instruction 0xF00A
  chip8.key[0] = 1;
  await sleep(10);
  chip8.key[0] = 0;

  // stops emulation
  chip8.stop();
  await sleep(10);

  // loads specified rom and run emulator
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function(event) {
    chip8.reset();
    chip8.loadProgram(new Uint8Array(event.target.result));
    chip8.run();
  }
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
