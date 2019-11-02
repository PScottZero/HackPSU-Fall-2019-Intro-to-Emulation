/**
 * @author Paul Scott
 * @version 2 November 2019
 *
 * This is the starter code for the 'Intro to Emulation'
 * HackPSU workshop. Use this as the basis for your own
 * CHIP-8 emulator.
 * 
 * To write this emulator, the following functions
 * need to be implemented:
 * 
 * decode(opcode)
 * draw()
 * setPixel(x, y, value)
 * clearDisplay()
 */
class Chip8 {

  /**
   * constructor
   * initializes data before emulator runs
   */
  constructor() {

    // instance data
    this.I = 0x0; // I pointer
    this.delay = 0; // delay timer
    this.sound = 0; // sound timer
    this.isRunning = false; // emulation running state

    // 4k memory and program counter
    this.memBuffer = new ArrayBuffer(0x1000);
    this.memory = new Uint8Array(this.memBuffer);
    this.PC = 0x200;

    // stack memory
    this.stackBuffer = new ArrayBuffer(0x20);
    this.stack = new Uint16Array(this.stackBuffer);
    this.SP = -1;

    // video memory
    this.dispBuffer = new ArrayBuffer(0x800);
    this.display = new Uint8Array(this.dispBuffer);
    this.height = 32;
    this.width = 64;

    // keypad data
    this.keyBuffer = new ArrayBuffer(0x10);
    this.key = new Uint8Array(this.keyBuffer);

    // registers
    this.regBuffer = new ArrayBuffer(0x10);
    this.V = new Uint8Array(this.regBuffer);
  }

  // -------------------------------------------- LOAD/RUN FUNCTIONS --------------------------------------------

  /**
   * loads program into chip8 memory
   * @param program - chip8 program
   */
  loadProgram(program) {
    for (let i = 0; i < program.length; i++)
      this.memory[this.PC + i] = program[i];
    this.loadFont();
  }

    /**
   * load chip8 font into memory
   */
  loadFont() {
    let font = Array(
        0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
        0x20, 0x60, 0x20, 0x20, 0x70, // 1
        0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
        0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
        0x90, 0x90, 0xF0, 0x10, 0x10, // 4
        0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
        0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
        0xF0, 0x10, 0x20, 0x40, 0x40, // 7
        0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
        0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
        0xF0, 0x90, 0xF0, 0x90, 0x90, // A
        0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
        0xF0, 0x80, 0x80, 0x80, 0xF0, // C
        0xE0, 0x90, 0x90, 0x90, 0xE0, // D
        0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
        0xF0, 0x80, 0xF0, 0x80, 0x80  // F
    );

    for (let i = 0; i < 0x50; i++) this.memory[i] = font[i];
  }

  /**
   * emulation main loop
   */
  run() {
    this.isRunning = true;
    let self = this;

    // executes instructions
    requestAnimationFrame(async function step() {

      if (self.isRunning) {

        // decodes opcode
        for (let i = 0; i < 10; i++) {
          let opcode = (self.memory[self.PC] << 8) | (self.memory[self.PC + 1]);
          await self.decode(opcode);
        }

        // decrement timers
        if (self.delay > 0) self.delay--;
        if (self.sound > 0) self.sound--;
        requestAnimationFrame(step);
      }
    });
  }
  
  /**
   * decodes machine instruction
   * @param opcode 16 bit opcode
   */
  async decode(opcode) {
    // TODO: write code to decode opcodes
  }

  /**
   * resets emulation
   */
  async reset() {

    // reset variables
    this.opcode = 0x0;
    this.I = 0x0;
    this.delay = 0;
    this.sound = 0;
    this.PC = 0x200;
    this.SP = -1;
    this.clearDisplay();
    this.loadFont();

    // resets memory
    for (let i = 0; i < this.memory.length; i++)
      this.memory[i] = 0x0;

    // resets display
    for (let i = 0; i < this.display.length; i++)
      this.display[i] = 0x0;

    // resets stack, keyboard state, and registers
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i] = 0x0;
      this.key[i] = 0x0;
      this.V[i] = 0x0;
    }
  }

  /**
   * stops current emulation run
   */
  stop() {
    this.isRunning = false;
  }

  /**
   * pause emulation for a given number of ns
   * @param ns
   * @returns {Promise}
   */
  sleep(ns) {
    return new Promise(resolve => setTimeout(resolve, ns));
  }

  // -------------------------------------------- DISPLAY FUNCTIONS --------------------------------------------

  /**
   * draw display
   * 
   * YOU CAN SET DISPLAY COLORS HERE!!!
   */
  draw() {
    let canvas = document.getElementById("chip8"); // get canvas from html
    let ctx = canvas.getContext("2d"); // canvas context
    // TODO: implement drawing functionality
  }

  /**
   * set pixel on display
   * @param x x value
   * @param y y value
   * @param value 1 'on' or 0 'off'
   * @returns {number} - 1 if pixel switches from on to off, 0 otherwise
   */
  setPixel(x, y, value) {
    // TODO: implement this method to set pixel on display
  }

  /**
   * clear display
   */
  clearDisplay() {
    // TODO: clear display (set all pixels to zero)
  }

  // -------------------------------------------- KEYBOARD FUNCTIONS --------------------------------------------

  /**
   * changes state of keypad key
   * @param key specified key
   * @param value 1 'pressed' or 0 'released'
   */
  keypress(key, value) {
    this.key[key] = value;
  }
}