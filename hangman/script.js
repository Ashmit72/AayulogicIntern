const wordsWithHints = [
  { word: "apple", hint: "A common fruit that keeps the doctor away." },
  { word: "ball", hint: "Round object used in sports." },
  { word: "cat", hint: "A small domesticated carnivorous mammal." },
  { word: "dog", hint: "Man's best friend." },
  { word: "elephant", hint: "Largest land animal." },
  { word: "forest", hint: "A large area covered chiefly with trees." },
  { word: "garden", hint: "A piece of ground for growing flowers, fruits, or vegetables." },
  { word: "house", hint: "A building for human habitation." },
  { word: "ice", hint: "Frozen water." },
  { word: "jacket", hint: "A piece of clothing for the upper body." },
  { word: "kite", hint: "A toy flown in the wind on a string." },
  { word: "lemon", hint: "A sour yellow fruit." },
  { word: "mountain", hint: "A large natural elevation of the earth's surface." },
  { word: "notebook", hint: "A book of blank pages for writing notes." },
  { word: "ocean", hint: "A large body of saltwater." },
  { word: "pencil", hint: "An instrument for writing or drawing." },
  { word: "queen", hint: "The female ruler of an independent state." },
  { word: "river", hint: "A large natural stream of water flowing in a channel." },
  { word: "sun", hint: "The star at the center of our solar system." },
  { word: "tree", hint: "A woody perennial plant." },
  { word: "umbrella", hint: "A device for protection against rain or sun." },
  { word: "violin", hint: "A string instrument played with a bow." },
  { word: "whale", hint: "A large marine mammal." },
  { word: "xylophone", hint: "A musical instrument with wooden bars." },
  { word: "yarn", hint: "A long, thin strand of cotton, wool, or other fibers." },
  { word: "zebra", hint: "An African wild horse with black-and-white stripes." },
  { word: "ant", hint: "A small insect that lives in colonies." },
  { word: "bird", hint: "A warm-blooded egg-laying vertebrate distinguished by feathers." },
  { word: "cloud", hint: "A visible mass of condensed water vapor floating in the atmosphere." },
  { word: "dew", hint: "Tiny drops of water that form on cool surfaces at night." },
  { word: "earth", hint: "The planet we live on." },
  { word: "flower", hint: "The reproductive structure of a flowering plant." },
  { word: "grass", hint: "Plants with long, narrow leaves growing wild or cultivated on lawns and pastures." },
  { word: "honey", hint: "A sweet, sticky substance made by bees." },
  { word: "island", hint: "A piece of land surrounded by water." },
  { word: "jungle", hint: "A dense, tropical forest." },
  { word: "kangaroo", hint: "A large marsupial from Australia." },
  { word: "leaf", hint: "A flat, green part of a plant." },
  { word: "moon", hint: "The natural satellite of the Earth." },
  { word: "night", hint: "The period of darkness between sunset and sunrise." },
  { word: "orange", hint: "A round citrus fruit with a tough bright reddish-yellow rind." },
  { word: "peach", hint: "A soft, juicy fruit with a fuzzy skin." },
  { word: "quail", hint: "A small ground-nesting game bird." },
  { word: "rose", hint: "A prickly bush or shrub that typically bears red, pink, yellow, or white fragrant flowers." },
  { word: "star", hint: "A luminous point in the night sky." },
  { word: "tiger", hint: "A large wild cat with a reddish-orange coat and black stripes." },
  { word: "unicorn", hint: "A mythical horse-like animal with a single horn." },
  { word: "vase", hint: "A decorative container without handles." },
  { word: "wolf", hint: "A wild carnivorous mammal of the dog family." },
  { word: "xerox", hint: "A brand name often used as a verb meaning to make a copy of a document." },
  { word: "yacht", hint: "A medium-sized sailing boat equipped for cruising or racing." },
  { word: "zephyr", hint: "A soft, gentle breeze." },
  { word: "airplane", hint: "A powered flying vehicle with fixed wings." },
  { word: "bicycle", hint: "A vehicle composed of two wheels held in a frame one behind the other." },
  { word: "car", hint: "A road vehicle powered by an engine." },
  { word: "drone", hint: "An unmanned aerial vehicle." },
  { word: "elevator", hint: "A platform or compartment housed in a shaft for raising and lowering people or things." },
  { word: "fan", hint: "A device for creating a current of air." },
  { word: "guitar", hint: "A string instrument played by plucking or strumming." },
  { word: "helicopter", hint: "A type of aircraft which derives both lift and propulsion from one or two sets of horizontally revolving rotors." },
  { word: "internet", hint: "A global computer network." },
  { word: "jigsaw", hint: "A tool for cutting irregular shapes." },
  { word: "keyboard", hint: "A panel of keys that operate a computer or typewriter." },
  { word: "laptop", hint: "A small portable computer." },
  { word: "microscope", hint: "An optical instrument used for viewing very small objects." },
  { word: "oscilloscope", hint: "An instrument for viewing oscillations." },
  { word: "printer", hint: "A machine for printing text or pictures." },
  { word: "quadcopter", hint: "A drone with four rotors." },
  { word: "robot", hint: "A machine capable of carrying out a complex series of actions automatically." },
  { word: "satellite", hint: "An artificial body placed in orbit around the earth or moon." },
  { word: "television", hint: "A system for transmitting visual images and sound." },
  { word: "ufo", hint: "An unidentified flying object." },
  { word: "vacuum", hint: "A space entirely devoid of matter." },
  { word: "wheelchair", hint: "A chair with wheels, used by people who cannot walk." },
  { word: "x-ray", hint: "A form of electromagnetic radiation." },
  { word: "yoke", hint: "A wooden crosspiece fastened over the necks of two animals." },
  { word: "zeppelin", hint: "A large German airship." },
  { word: "bounce", hint: "To spring back after hitting something." },
  { word: "climb", hint: "To go up something, such as a ladder or mountain." },
  { word: "dance", hint: "To move rhythmically to music." },
  { word: "explore", hint: "To travel in or through an unfamiliar area to learn about it." },
  { word: "fly", hint: "To move through the air." },
  { word: "giggle", hint: "To laugh lightly and repeatedly in a silly way." },
  { word: "hop", hint: "To jump on one foot." },
  { word: "imagine", hint: "To form a mental image or concept." },
  { word: "jump", hint: "To push oneself off a surface and into the air." },
  { word: "kick", hint: "To strike with the foot." },
  { word: "laugh", hint: "To make sounds and movements expressing amusement." },
  { word: "move", hint: "To change position." },
  { word: "nod", hint: "To lower and raise one's head slightly and briefly." },
  { word: "observe", hint: "To watch carefully." },
  { word: "paint", hint: "To cover a surface with color." },
  { word: "quiver", hint: "To tremble or shake with a slight rapid motion." },
  { word: "run", hint: "To move at a speed faster than a walk." },
  { word: "swim", hint: "To move through water by making movements with the arms and legs." },
  { word: "talk", hint: "To speak in order to give information." },
  { word: "understand", hint: "To perceive the meaning of something." },
  { word: "view", hint: "To look at or inspect." },
  { word: "walk", hint: "To move at a regular pace by lifting and setting down each foot in turn." },
  { word: "yell", hint: "To shout loudly." },
  { word: "zip", hint: "To fasten or unfasten with a zipper." },
];


const WordArray= wordsWithHints.map(word=>word.word);
const HintArray=wordsWithHints.map(hint=>hint.hint)
const randomIndex=Math.round((Math.random()*wordsWithHints.length)-1)
const randomWord=WordArray[randomIndex]
const randomHint=HintArray[randomIndex]
const wordValue = randomWord.toUpperCase();
console.log(wordValue);
const hintValue=randomHint
const lettersToShow = Math.round((Math.random() * wordValue.length) / 2);
const wordDisplay = document.querySelector("#word-value");
const hint=document.querySelector("#hint")
hint.innerText=randomHint
wordDisplay.innerText = wordValue.substring(0, lettersToShow).toUpperCase() + "_".repeat(wordValue.length - lettersToShow);


const buttons = document.querySelectorAll("button");
let hangStatus
let error=0
buttons.forEach((button) => {
 
  button.addEventListener("click", () => {
    const guessedLetter = button.innerText;
    if (wordValue.includes(guessedLetter.toUpperCase())) {
      console.log("Correct guess!");
      hangStatus=true;
      const currentWordDisplay = wordDisplay.innerText.split('');
      for (let i = 0; i < wordValue.length; i++) {
        if (wordValue[i] === guessedLetter.toUpperCase()) {
          currentWordDisplay[i] = guessedLetter.toUpperCase();
        }
      }
      wordDisplay.innerText = currentWordDisplay.join('');
      if (wordDisplay.innerText === wordValue) {
        buttons.forEach(button=>button.style.display="none")
        const message=document.querySelector("#message")
        message.style.display="block"
        message.innerText="Congratulations You have Guessed The Word!"
      }
    } else {
      hangStatus=false
      console.log("Incorrect guess.");
      error++
      console.log(error);
    }
    button.disabled = true;
   console.log(hangStatus);
   switch(error){
    case 1:
        console.log("Head!");
        const head=document.querySelector(".head")
        head.style.display="block"
        break
    case 2:
        console.log("Body!");
        const body=document.querySelector(".body")
        body.style.display="block"
        break
    case 3:
        console.log("left hand!");
        const handsleft=document.querySelector(".left-hand")
        handsleft.style.display="block"
        break
    case 4:
        console.log("Right leg!");
        const handsRight=document.querySelector(".right-hand")
        handsRight.style.display="block"
        break
    case 5:
        console.log("left leg!");
        const leftleg=document.querySelector(".left-leg")
        leftleg.style.display="block"
        break
    case 6:
      console.log("right leg!");
      const rightleg=document.querySelector(".right-leg")
      rightleg.style.display="block"
      buttons.forEach(button=>button.style.display="none")
      const message=document.querySelector("#message")
      message.style.display="block"
    default:
    //   console.log("Invalid Choice");
    break
}
  });
});


