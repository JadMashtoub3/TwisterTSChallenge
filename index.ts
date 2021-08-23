// Import stylesheets
import './style.css';
import { Colours } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

// used to make the spinner spin
let spinnerCounter = 0;



// container for the spinner 
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];

//dont change above=======================

const colourDiv = document.getElementById('colourResult');
const colourSelector: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('colourSelect')
);
const bodyPartP = document.getElementById('bodyPartText');
const bodyPartSelector: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('bodyPartSelect')
);

const stats = document.getElementById('statsResults');


const history = document.getElementById('historyTableBody');

//How many of selected was spun
const lastSpun = document.getElementById('lastSpun');

// sets up an array of strings to represent the colours from the enum *****

let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);

    let colorselect: HTMLOptionElement = document.createElement('option');
    colorselect.innerHTML = colour;
    colorselect.value = colour.toString();
    colourSelector.add(colorselect);
  }
}


// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];
for (let bodypart in BodyParts) {
  if (isNaN(Number(bodypart))) {
    bodyPartsArray.push(bodypart);

    let bodyselect: HTMLOptionElement = document.createElement('option');
    bodyselect.innerHTML = bodypart;
    bodyselect.value = bodypart.toString();
    bodyPartSelector.add(bodyselect);
  }
}

// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement>document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100));

const statsBtn = <HTMLButtonElement>document.getElementById('statsBtn');
statsBtn.addEventListener('click', () => statsBtnHandler(colourSelector.value, bodyPartSelector.value));

// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);
  spinCount++;
  // TODO randomly select colour from array
  let colornum: number = 0;
  colornum = Math.floor(Math.random() * coloursArray.length);
  selectedColour = coloursArray[colornum];


  // TODO randomly select bodyPart from array
  let bodypartnum: number = 0;
  bodypartnum = Math.floor(Math.random() * bodyPartsArray.length);
  selectedBodyPart = bodyPartsArray[bodypartnum];

  spinHistoryArray.push(
    new SpinRecord(
      spinCount,
      Colours[selectedColour],
      BodyParts[selectedBodyPart]
    )
  );

  spinBtn.disabled = true;

  
  
  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}

 
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor =
    coloursArray[spinnerCounter % coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter % bodyPartsArray.length];
}
// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle);
  bodyPartP.innerHTML = selectedBodyPart;
  spinBtn.disabled = false;
  
  addToHistory();
}

// TODO set colourDiv and bodyPartP to the randomly spun results ****^


// TODO add the newly spun result to the history table***
function addToHistory() {
  let newRow = document.createElement('tr');

  let NumRow = document.createElement('td');
  NumRow.innerHTML = spinCount.toString();
  newRow.append(NumRow);

  let ColorRow = document.createElement('td');
  ColorRow.innerHTML = selectedColour;
  newRow.append(ColorRow);

  let BodyPartRow = document.createElement('td');
  BodyPartRow.innerHTML = selectedBodyPart;
  newRow.append(BodyPartRow);
  history.append(newRow);

}
 // set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23
function statsBtnHandler(colour, bodyPart) {
  const statsTable= document.getElementById('statsResults')
  statsTable.innerHTML = `<div>${bodyPart}${colour} Rolled: ${getAmount(colour,bodyPart)} times ====== Last roll ${getLastSpun(colour,bodyPart)}`
 
}
  
// TODO returns the amount of times the combination of selected of colour and body part have been spun***
function getAmount(colour, bodyPart): number {
  let picker = 0;
  for (let pointer = 0; pointer < spinHistoryArray.length; pointer++) {
    if (BodyParts[spinHistoryArray[pointer].bodyPart] === bodyPart) {
      if (Colours[spinHistoryArray[pointer].colour] === colour) {
        picker++;
      }
    }
  }
  return picker;
}


// TODO return the last num which the combination of selected of colour and body part have been spun ***
function getLastSpun(colour, bodyPart): number {
  for (let pointer = spinHistoryArray.length; pointer > 0; pointer--) {
    if (BodyParts[spinHistoryArray[pointer - 1].bodyPart] === bodyPart) {
      if (Colours[spinHistoryArray[pointer - 1].colour] === colour) {
        return pointer;
      }
    }
  }
  return;
}
