let players = ['red', 'black'];
let currPlayer;
let playing;

//we draw the board on a 500x500 space, and for connect four you need to have 6 columns and 7 rows, so thats 500/6 and 500/7.
let xinc = 500 / 7;
let yinc = 500 / 6;
let w = 500;
let h = 500;
let r = xinc * 0.95;

let board = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],

];

function setup() {
  createCanvas(500, 500);
  playing = true;
  currPlayer = players[round(Math.random())];
}

function turnHandler() {
  if (currPlayer == 'red') {
    currPlayer = 'black';

  }
  else {
    if (currPlayer = 'black') {
      currPlayer = 'red';
    }
  }
}

function checkFour(a, b, c, d) {
  return (((a == b) && (b == c) && (c == d)) && (a != ''));
}

function outcome() {
  //horizontal check
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i <= 3; i++) {
      if (checkFour(board[j][i], board[j][i + 1], board[j][i + 2], board[j][i + 3])) {
        console.log(board);
        playing = false;
      }
    }
  }

  // vertical check
  for (let j = 0; j <= 2; j++) {
    for (let i = 0; i < 7; i++) {
      if (checkFour(board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i])) {
        console.log(currPlayer + " wins.")
        playing = false;
      }
    }
  }

  // diagonal check(Bottom-Backwards)
  for (let i = 6; i >= 3; i--) {
    for (let j = 5; j >= 3; j--) {
      if (checkFour(board[j][i], board[j - 1][i - 1], board[j - 2][i - 2], board[j - 3][i - 3])) {
        console.log(currPlayer + " wins.");
        playing = false;
        return;
      }
    }
  }

  //diagonal check (Bottom-forwards)
  for (let i = 0; i <= 3; i++) {
    for (let j = 5; j >= 3; j--) {
      if (checkFour(board[j][0 + i], board[j - 1][1 + i], board[j - 2][2 + i], board[j - 3][3 + i])) {
        console.log(currPlayer + " wins.");
        playing = false;
        return;
      }
    }
  }
}
//this function will take j, the y coordinate, and check underneath it to see if there is a spot, if there isn't we increment and return
function propagate(i, j) {
  if ((j < 5) && (board[j + 1][i] == '')) {
    console.log('j is' + j);
    return propagate(i, j + 1);

  }
  else {
    return j;
  }

}



// now we want to draw the circles in the corresponding spots if they are clicked by a player.
function mousePressed() {
  // alert(currPlayer+ "'s turn"); yeah this is kind of annoying so I turned it off.
  if (playing == true) {
    if ((mouseX >= 0 && mouseX <= 500) && ((mouseY >= 0 && mouseY <= 500))) {

      for (let j = 0; j <= 5; j++) {
        for (let i = 0; i <= 6; i++) {
          if (((mouseX >= xinc * i) && (mouseX <= xinc * (i + 1)))
            && ((mouseY >= yinc * j) && (mouseY <= yinc * (j + 1)))) {
            if (board[j][i] == '') {
              fill(currPlayer);
              var newJ = propagate(i, j);
              circle((xinc / 2) * ((2 * i) + 1), (yinc / 2) * ((2 * newJ) + 1), r);
              noFill();
              board[newJ][i] = currPlayer;
              outcome();
              turnHandler();
            }
            else {
              alert("Spot already taken.");
            }
          }
        }
      }
    }
  }
}

function resetBoard() {
  board = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],

  ];
  playing = true;
  redraw(); // we redraw the board once, so that we can have a fresh game.
}

function draw() {
  background(255);
  rect(0, 0, w, h);


  //vertical lines
  line(xinc, 0, xinc, 500);
  line(xinc * 2, 0, xinc * 2, 500);
  line(xinc * 3, 0, xinc * 3, 500);
  line(xinc * 4, 0, xinc * 4, 500);
  line(xinc * 5, 0, xinc * 5, 500);
  line(xinc * 6, 0, xinc * 6, 500);

  //horizontal lines
  line(0, yinc, 500, yinc);
  line(0, yinc * 2, 500, yinc * 2);
  line(0, yinc * 3, 500, yinc * 3);
  line(0, yinc * 4, 500, yinc * 4);
  line(0, yinc * 5, 500, yinc * 5);
  noLoop(); //we don't want to overwrite our current board, so we tell p5 to not call draw again by calling noLoop().
}
