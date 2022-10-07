function setup() {
    createCanvas(500, 400);
  }
  
  function preload() {
    img4 = loadImage("litwick.jpg");
  }
  /////////////////////////////////////////TILES////////////////////////////
  var Tile = function (config) {
    this.x = config.x;
    this.y = config.y;
    this.size = config.size || 70;
    this.color = config.color;
    this.isFaceUp = false;
    this.isMatch = false;
  };
  
  Tile.prototype.isUnderMouse = function (x, y) {
    return (
      x <= this.x + this.size &&
      x >= this.x &&
      y <= this.y + this.size &&
      y >= this.y
    );
  };
  
  Tile.prototype.tileDisplay = function () {
    strokeWeight(2.2);
    if (this.isFaceUp) {
      fill(this.color);
      rect(this.x, this.y, this.size, this.size, 5);
    } else {
      fill(214, 247, 202);
      rect(this.x, this.y, this.size, this.size, 5);
      image(img4, this.x, this.y, this.size, this.size);
    }
  };
  
  ////////////////////////////////////////Buttons////////////////////
  
  var Button = function (config) {
    this.x = config.x;
    this.y = config.y;
    this.height =  config.height;
    this.width =  config.width;
    this.text = config.text;
    this.onClick = config.onClick;
  };
  
  Button.prototype.isUnderMouse = function (x, y) {
    return (
      x <= this.x + this.width &&
      x >= this.x &&
      y <= this.y + this.height &&
      y >= this.y
    );
  };
  
  Button.prototype.drawButton = function () {
    fill(155);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(0);
    textAlign(CENTER)
    textSize(22);
    text(this.text, this.x + (this.width/2), this.y + (this.height/1.5));
  }
  
  Button.prototype.handleMouseClick = function () {
    if (this.isUnderMouse(mouseX, mouseY)) {
      this.onClick();
    }
  };
  ////////////////////////////////////////Stage 1/////////////////////////
  drawIntro = function () {
    strokeWeight(0.1)
    fill('#99ffe0');
    rect(0,0,250,200);
    fill('#b3ffe8');
    rect(250,0,250,200);
    fill('#ccfff0');
    rect(0,200,250,200);
    fill('#e6fff7');
    rect(250,200,250,200);
    fill(123, 200, 244);
    rect(100, 40, 300, 240, 7);
    fill(255);
    textSize(28);
    text("Matching Game", 250, 65);
    textSize(18);
    text("By: Brandon A", 250, 95);
    text("Choose your difficulty and match ", 250, 155);
    text("away! May your matches be spot on.", 250, 185);
  };
  
  let colors = [
    "#F4F718",
    "#FB5E4E",
    "#90FB4E",
    "#4EFBDE",
    "#4EE3FB",
    "#4E97FB",
    "#A74EFB",
    "#E64EFB",
    "#FB4ED4",
    "#FD1C1C",
    "#FEFEFE",
    "#030303",
    "#FFB6C1",
    "#27408B",
    "#8B4513",
    "#008744",
    "#ffa700",
    "#c9c9ff",
    "#e8ca93",
    "#feffa3"
  ];
  
  let colors2 = [
    "#F4F718",
    "#FB5E4E",
    "#90FB4E",
    "#4EFBDE",
    "#4EE3FB",
    "#4E97FB",
    "#A74EFB",
    "#E64EFB",
    "#FB4ED4",
    "#FD1C1C",
    "#FEFEFE",
    "#030303",
    "#FFB6C1",
    "#27408B",
    "#8B4513",
    "#008744",
    "#ffa700",
    "#c9c9ff",
    "#e8ca93",
    "#feffa3"
  ];
  const selected = [];
  for (var i = 0; i < 10; i++) {
    let randomInt = Math.floor(Math.random() * colors.length);
    let selectedFace = colors[randomInt];
    selected.push(selectedFace);
    selected.push(selectedFace);
    colors.splice(randomInt, 1);
  }
  
  const selected2 = [];
  for (var i = 0; i < 15; i++) {
    let randomInt = Math.floor(Math.random() * colors2.length);
    let selectedFace = colors2[randomInt];
    selected2.push(selectedFace);
    selected2.push(selectedFace);
    colors2.splice(randomInt, 1);
  }
  
  let shuffleArray = function (array) {
    let counter = array.length;
    while (counter > 0) {
      let int = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[int];
      array[int] = temp;
    }
  };
  
  shuffleArray(selected);
  shuffleArray(selected2)
  
  let easyTile = [];
  let rows = 4;
  let columns = 5;
  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      easyTile.push(
        new Tile({
          x: 65 + i * 73,
          y: 15 + j * 73,
          color: selected.pop(),
        })
      );
    }
  }
  
  let hardTile = [];
  let rows1 = 5;
  let columns1 = 6;
  for (var i = 0; i < columns1; i++) {
    for (var j = 0; j < rows1; j++) {
      hardTile.push(
        new Tile({
          x: 50 + i * 65,
          y: 20 + j * 65,
          size: 60,
          color: selected2.pop(),
        })
      );
    }
  }
  
  let easyButton = new Button({
    x: 100,
    y: 285,
    height: 50,
    width: 300,
    text: "Easy",
    onClick: function() {
     
      scene = 1;
    }
  })
  
  let hardButton = new Button({
    x: 100,
    y: 340,
    height: 50,
    width: 300,
    text: "Hard",
    onClick: function() {
      scene = 2;
      redraw();
    }
  })
  
  let quitButton = new Button ({
    x: 180,
    y: 350,
    height: 40,
    width: 100,
    text: "Quit",
    onClick: function() {
      scene = 0;
     window.location.reload();
    }
  })
  
  let numMatches = 0;
  let flippedTile = [];
  //let flippedTile2 = [];
  let delayStartFC = null;
  function mouseClicked() {
    if (scene === 1) {
      redraw();
      for (var i = 0; i < easyTile.length; i++) {
      if (easyTile[i].isUnderMouse(mouseX, mouseY)) {
        if (flippedTile.length < 2 && !easyTile[i].isFaceUp) {
          easyTile[i].isFaceUp = true;
          flippedTile.push(easyTile[i]);
          if (flippedTile.length === 2) {
            if (flippedTile[0].color === flippedTile[1].color) {
              flippedTile[0].isMatch = true;
              flippedTile[1].isMatch = true;
              flippedTile.length = 0;
              //numMatches++;
            }
          }
          delayStartFC = frameCount;
        }
        loop();
      }
    }
    } 
    if (scene === 2) {
    for (var i = 0; i < hardTile.length; i++) {
      if (hardTile[i].isUnderMouse(mouseX, mouseY)) {
        if (flippedTile.length < 2 && !hardTile[i].isFaceUp) {
          hardTile[i].isFaceUp = true;
          flippedTile.push(hardTile[i]);
          if (flippedTile.length === 2) {
            if (flippedTile[0].color === flippedTile[1].color) {
              flippedTile[0].isMatch = true;
              flippedTile[1].isMatch = true;
              flippedTile.length = 0;
              //numMatches++;
            }
          }
          delayStartFC = frameCount;
        }
        loop();
      }
    }
    }
  }
  
  mousePressed = function() {
  if (scene === 0) {
  easyButton.handleMouseClick();
    hardButton.handleMouseClick();
  } else if (scene === 1 || scene === 2){
    quitButton.handleMouseClick();
  }
  };
  
  let scene = 0;
  
  function draw() {
    background(200);
    if (scene === 0) {
      drawIntro();
      easyButton.drawButton();
      hardButton.drawButton();
    }
    if (scene === 1) {
    if (delayStartFC && frameCount - delayStartFC > 70) {
      for (var i = 0; i < easyTile.length; i++) {
        if (!easyTile[i].isMatch) {
          easyTile[i].isFaceUp = false;
        }
        flippedTile = [];
        delayStartFC = null;
        noLoop();
      }
    }
    for (var i = 0; i < easyTile.length; i++) {
      easyTile[i].tileDisplay();
    }
    quitButton.drawButton();
    }
    if (scene === 2) {
    if (delayStartFC && frameCount - delayStartFC > 30) {
      for (var i = 0; i < hardTile.length; i++) {
        if (!hardTile[i].isMatch) {
          hardTile[i].isFaceUp = false;
        }
        flippedTile = [];
        delayStartFC = null;
        noLoop();
      }
    }
    for (var i = 0; i < hardTile.length; i++) {
      hardTile[i].tileDisplay();
    }
    quitButton.drawButton();
    }
  }