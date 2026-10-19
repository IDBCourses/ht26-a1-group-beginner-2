/*
 * IDB Programming: A1 Modelling — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — applies the state to make sound every 100ms, if necessary
 *   controls — what happens when a key goes down or comes up
 *   setup    — starts everything
 *
 * There is no loop in this assignment. Nothing happens until the player presses
 * a key, and every key event follows the same two steps:
 *   1. update: change the state, based on which key it was
 *   2. use:    make sound from the state
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
// For example: which key does what, which notes you can play, the tempo.

const ringPhase1 = ["E", "D#", "F#", "E"]

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.
let octave = 4;
let distortion = 0.1;
let spacepressed = false;
// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once
const distortionEffect = new Tone.Distortion(0.8).toDestination(); // an effect that makes the sound more "gritty"

function changeoctave() {
  octave = octave + 1;
  if (octave > 6) {
    octave = 4;
  }
  console.log ("octave changed to:" + octave);
  }

function raiseDistortion() {
  distortion = distortion + 0.01;
  if (distortion > 1) {
    distortion = 1;
  }
    distortionEffect.distortion = distortion;
}

function lowerDistortion() {
  distortion = distortion - 0.01;
  if (distortion < 0) {
    distortion = 0;
  }
  distortionEffect.distortion = distortion;
}
// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.
  lowerDistortion();
  setTimeout(update, 250); // call update() again in 100 milliseconds
  console.log("Update: lowering distortion to: " + distortion);

}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  synth.connect(distortionEffect);
  setTimeout(use, 100); // call use() again in 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
function keyDown(event) {
  let now = Tone.now(); // browsers only allow sound after the player has pressed something

  // Holding a key down sends keydown again and again. Only react to the first one.
  if (event.repeat === false) {
    console.log("key down:", event.key);

    // Example: replace this with your own instrument.
    if (event.key === "o"){
      changeoctave();
      }

    if (event.key === "a") {
      for (let i = 0; i < ringPhase1.length; i++) {
        synth.triggerAttackRelease(
          ringPhase1[i] + octave,
          "4n",
          now + i * 0.4);
      }
      }
  }
  if (event.key === "x") {
    raiseDistortion();
    console.log("x pressed: raising distortion to: " + distortion);
  }
}

// Runs every time a key comes up.
function keyUp(event) {
  if (event.key === "o") {
    console.log("space released: normal octave activation");
  }
  console.log("Key up:", event.key);
  if (event.key === exampleKey)
  // Example: replace this with your own instrument.
  synth.triggerRelease(exampleNote, Tone.now());
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
}

setup(); // Always remember to call setup()!
