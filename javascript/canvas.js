class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.context.lineWidth = 8;
    this.context.strokeStyle = '#4a4a44'; // grey
    this.secretWord = secretWord;
  }
  // method to draw lines
  drawLineHangman (startX, startY, nextX, nextY) { // arrow function to use 'this'
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(nextX, nextY);
    this.context.stroke() //executes the drawing
    this.context.closePath();
  }
  // method to draw circles
  drawCircle (startX, startY, radius) {
    this.context.beginPath();
    // startAngle --> 0, finalAngle -> 360degrees or PI * 2
    this.context.arc(startX, startY, radius, 0, Math.PI * 2, true); // radius: 12
    this.context.stroke(); // only border
  }

  createBoard() {
    // clear canvas
    this.context.clearRect(0, 0, 1200, 800); // (x,y, canvas.width, canvas.height)
    // call drawLines
    this.drawLines();
  }

  drawLines() {
    console.log(this.secretWord);
    this.secretWord.split('').forEach((item , i) => this.drawLineHangman (300 + i * 80, 700, 350 + i * 80, 700));
  }

  writeCorrectLetter(index) {
    this.context.fillStyle = '#9DA400'; 
    this.context.font = '48px Roboto';
    // context.fillText('string', x, y);
    // taking line#22 -->coorX --> 300
    this.context.fillText(this.secretWord[index].toUpperCase(), 310 + index * 80, 680)
  }

  writeWrongLetter(letter, errorsLeft) {
    let indexToDraw;
    if (errorsLeft > 0) {
      this.context.fillStyle = '#4a4a44';
      this.context.font = '48px Roboto';
      hangman.letters.forEach((item, index) => {
        if(item === letter) {
          indexToDraw = index;
        }
      });
      this.context.fillText(letter.toUpperCase(), 600 + (indexToDraw * 50), 200);
    }
  }

  drawHangman(errorsLeft) {
    console.log(errorsLeft);
    this.context.strokeStyle = '#4a4a44'; // grey
    // starts with errorsLeft = 9
    return errorsLeft === 9 ?  this.drawLineHangman(50, 700, 150, 630) //triangle
    : errorsLeft === 8 ? this.drawLineHangman(150, 630, 250, 700) //triangle
    : errorsLeft === 7 ? this.drawLineHangman(250, 700, 50, 700) //triangle
      // draw line left to right up --> triangle
    : errorsLeft === 6 ? this.drawLineHangman(150, 630, 150, 100) // line up
    : errorsLeft === 5 ? this.drawLineHangman(150, 100, 400, 100) // line from left to right
    : errorsLeft === 4 ? this.drawLineHangman(400, 100, 400, 170) // line from left to right
    : errorsLeft === 3 ? this.drawCircle(400, 170 + 50, 50) // draw circle // 170 + radius
    : errorsLeft === 2 ? this.drawLineHangman(400, 270, 400, 450) // line from left to right // y-> 100 + 170
    : errorsLeft === 1 ? this.drawLineHangman(400, 450, 400 + 80 , 510 ) // line right leg
    : errorsLeft === 0 ? this.drawLineHangman(400, 450, 400 - 80 , 510 ) // line from left leg
    : 'End of the Game!';     
  }

  winner() {
    const winnerImg = new Image();
    winnerImg.src = '../images/awesome.png';
      // set the start position of our image
      let imgX = 180;
      let imgY = 40;
    winnerImg.onload = () => { // once the image isloaded
      this.context.drawImage(winnerImg, imgX, imgY);
    };
  }
}
