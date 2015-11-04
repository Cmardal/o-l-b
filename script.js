//Time saving function
function getId(ID) {
  return document.getElementById(ID);
}

//Set Initial Value of Wrong Answers
var wrong = 0;

//Object constructor function - This probably won't need to be changed
function Set(image, correctAnswer, guess2, guess3, guess4) {
  this.image = '<img src="images/' + image + '" alt="">',
  this.imageSmall = '<img src="images/' + image + '" height="150px" width="200px" alt="">',
  this.array = [correctAnswer, guess2, guess3, guess4],
  this.correctAnswer = correctAnswer
}

//Shows Either Correct or Wrong Screen When an Answer is Clicked, and Adds 1 to the Forkerte Section if Needed
checkAnswer = function() {
    if (this.innerHTML === imageSets[0].correctAnswer) {
      getId('correctScreen').style.visibility = 'visible';
      setTimeout(function() {
        getId('correctScreen').style.visibility ='hidden';
      }, 2000);
      reset();
    }
    else {
      wrong++;
      getId('wrong').innerHTML = wrong;
      getId('wrongAnswerScreen').style.visibility = 'visible';
      setTimeout(function() {
        getId('wrongAnswerScreen').style.visibility ='hidden';
      }, 2000);
    }
  }

//This is the first step to adding more places. The first attribute in quotes ('') is the image name, the second number is the correct answer, and the other numbers are incorrect answers - You must also add your set to the array below
var set1 = new Set('image-1.png', '123007', '124007', '124107', '114007');
var set2 = new Set('image-2.png', '977221', '978321', '968221', '978221');
var set3 = new Set('image-3.png', '743949', '744949', '745049', '734949');
var set4 = new Set('image-4.png', '745449', '754449', '755449', '755549');
var set5 = new Set('image-5.png', '175860', '174860', '175960', '165860');
var set6 = new Set('image-6.png', '856805', '865805', '866805', '866905');
var set7 = new Set('image-7.png', '378766', '377666', '378666', '368666');
var set8 = new Set('image-8.png', '757043', '756043', '757143', '747043');
var set9 = new Set('image-9.png', '502397', '501297', '502297', '492297');
var set10 = new Set('image-10.png', '654050', '655050', '655150', '645050');

//This is the array that you need to add to or change - notice that 'set10' is not included, it will be added at the end - if you do not need a static ending, they all can be added to the array now.
var imageSets = [set1, set2, set3, set4, set5, set6, set7, set8, set9];

//Function to randomize arrays using the Fisher-Yates method
function random(array) {
  for (var a = array.length - 1; a > 0; a--) {
    var b = Math.floor(Math.random() * ( a + 1 ));
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }
return array;
}

//Calling the Randomize Function on our 'imageSets' array
random(imageSets);

//Now We Add the Static One to the End - So it Will Always be last
imageSets.push(set10);

//Function to Hide the Big Picture and animate the small picture. It also listens for a click on the small picture so it can show the big picture again
function showSmall() {
  getId('bigPicture').innerHTML = '';
  getId('bigPicture').style.visibility = 'hidden';
  getId('smallPicture').style.visibility = 'visible';
  getId('smallPicture').style.marginTop = '300px';
  getId('guessContainer').style.visibility = 'visible';
  var margin = 300;
  var moveUp = setInterval(function() {
      margin -= 5;
      getId('smallPicture').style.marginTop = margin + 'px';
      if (margin <= 100) {
        clearInterval(moveUp);
      }
  }, 20);
  getId('smallPicture').addEventListener('click', function() {
    getId('bigPicture').innerHTML = imageSets[0].image;
    getId('bigPicture').style.visibility = 'visible';
  });
}

//The reset function is run every time a new picture is needed - at the very beginning, and after every correct answer
function reset() {
  imageSets.shift();
  //Check to see if they are finished
  if (imageSets.length === 0) {
    getId('finishedScreen').style.visibility = 'visible';
  }
  //If not, show the next picture
  else {
    random(imageSets[0].array);
    getId('smallPicture').innerHTML = imageSets[0].imageSmall;
    getId('smallPicture').style.visibility = 'hidden';
    getId('guessContainer').style.visibility = 'hidden';
    getId('bigPicture').innerHTML = imageSets[0].image;
    getId('bigPicture').style.visibility = 'visible';
    for (var i = 0; i < 4; i++) {
      getId('guessBox' + i).innerHTML = imageSets[0].array[i];
    }
  }
}

window.onload = function() {
  reset();
  var boxes = document.getElementsByClassName('guessBox');
  for (var item = 0; item < boxes.length; item++) {
    boxes[item].addEventListener('click', checkAnswer);
  }
  getId('bigPicture').addEventListener('click', showSmall);
  getId('wrong').innerHTML = wrong;
}
