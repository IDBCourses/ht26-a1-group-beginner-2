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

//const ringPhase1 = ["E", "D#", "F#", "E"]
let ring = {
  phase1: ["E", "D#", "F#", "E"],
  phase2: ["B", "D", "C#", "B"],
  phase3: ["A", "C#", "E", "A"]
}

let numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let notes = ["G#", "C#", "B", "D", "E", "B", "A", "C#", "E", "A"];

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.
let step = 0;
let distortion = 0.1;
let isPlaying = false
let duration = "4n";
let octave = "4";

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const chord = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once
const synth = new Tone.Synth().toDestination();
const distortionEffect = new Tone.Distortion(0.8).toDestination(); // an effect that makes the sound more "gritty"


function raiseDistortion() {
  distortion = distortion + 0.1;
  if (distortion > 1) {
    distortion = 1;
  }
    distortionEffect.distortion = distortion;
}

function lowerDistortion() {
  distortion = distortion - 0.05;
  if (distortion < 0) {
    distortion = 0;
  }
  distortionEffect.distortion = distortion;
}

function playSong() {
  let now = Tone.now();
  if (step === 0 && !isPlaying) {
    for (let j = 0; j < ring.phase1.length; j++) {
      chord.triggerAttackRelease(ring.phase1[j] + octave, duration, now + j * 0.4);
      console.log(ring.phase1[j] + octave);
      isPlaying = true;
    }
  } else if (step === 1 && !isPlaying) {
    for (let j = 0; j < ring.phase2.length; j++) {
      chord.triggerAttackRelease(ring.phase2[j] + octave, duration, now + j * 0.4);
      console.log(ring.phase2[j] + octave);
      isPlaying = true;
    }
  } else if (step === 2 && !isPlaying) {
    for (let j = 0; j < ring.phase3.length; j++) {
      chord.triggerAttackRelease(ring.phase3[j] + octave, duration, now + j * 0.4);
      console.log(ring.phase3[j] + octave);
      isPlaying = true
    }
  }
}

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.
  isPlaying = !isPlaying
  lowerDistortion();
  setTimeout(update, 100); // call update() again in 100 milliseconds
  console.log("Update: lowering distortion to: " + distortion);

}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  chord.connect(distortionEffect);
  setTimeout(use, 100); // call use() again in 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
function keyDown(event) {
let start = Tone.now(); // browsers only allow sound after the player has pressed something
  if (event.repeat === false) {
    if (event.key === "a") {
      console.log("Step is " + step);
      playSong();
    }
    step += 1;
    if (step > 2) {
      step = 0;
    }
    if (event.key === " ") {
    console.log("Key down ");
    step = 2
    playSong();
    }

    for (let i = 0; i < notes.length; i++) {
        if (numberKeys.length === notes.length && event.key === numberKeys[i]) {
          console.log(numberKeys.length === notes.length);
        synth.triggerAttackRelease(notes[i] + octave, "16n", start);
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
  //window.addEventListener("keyup", keyUp);
}

setup(); // Always remember to call setup()!
