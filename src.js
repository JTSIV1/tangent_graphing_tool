let BUFFER = 21;
let CANVASX = 30 * BUFFER;
let CANVASY = 35 * BUFFER;
let BOARDX = CANVASX - 12 * BUFFER;
let BOARDY = CANVASY - 17 * BUFFER;
let tangent, normal, secant;
let p1 = 0;
let p2 = 0;
let x0, x1, x2, x3, x4, xMin, xMax, yMin, yMax;
let pixelX, pixelY;
let help;

function restart() {
  removeElements();
  setup();
}

function setup() {
  tangent = false;
  normal = false;
  secant = false;
  help = false;

  createCanvas(CANVASX, CANVASY);

  tangentCB = createCheckbox('Draw Tangent', false);
  tangentCB.changed(updateTan);
  tangentCB.position(BUFFER, BOARDY + 3 * BUFFER + 20);
  
  normalCB = createCheckbox('Draw Normal', false);
  normalCB.changed(updateNor);
  normalCB.position(BUFFER + (1 / 3) * BOARDX, BOARDY + 3 * BUFFER + 20);
  
  secantCB = createCheckbox('Draw Secant', false);
  secantCB.changed(updateSec);
  secantCB.position(BUFFER + (2 / 3) * BOARDX, BOARDY + 3 * BUFFER + 20);

  helpB = createButton('Help');
  helpB.position(27.5 * BUFFER, 20 * BUFFER);
  helpB.mousePressed(toggleMenu);
  
  printB = createButton('Print');
  printB.position(23.8 * BUFFER, 20 * BUFFER);
  printB.mousePressed(print);

  restartB = createButton('Reset');
  restartB.position(20 * BUFFER, 20 * BUFFER);
  restartB.mousePressed(restart);

  p1Slider = createSlider(0, 1, 0.5, 0.001);
  p1Slider.position(3.2 * BUFFER, BOARDY + 5.5 * BUFFER);
  p1Slider.style('width', '320px');
  
  p2Slider = createSlider(0, 1, 0.5, 0.001);
  p2Slider.position(3.2 * BUFFER, BOARDY + 7 * BUFFER);
  p2Slider.style('width', '320px');

  // p1Inp = createInput(p1);
  // p1Inp.position(2 * BUFFER, BOARDY + 7 * BUFFER);
  // p1Inp.size(15);
  
  let intInput = '';
  intInput += round(random(-2, 2));
  x4Inp = createInput(intInput);
  x4Inp.position(3 * BUFFER, BOARDY + 9 * BUFFER);
  x4Inp.size(20);

  intInput = '';
  intInput += round(random(-2, 2));
  x3Inp = createInput(intInput);
  x3Inp.position(6.4 * BUFFER, BOARDY + 9 * BUFFER);
  x3Inp.size(20);

  intInput = '';
  intInput += round(random(-2, 2));
  x2Inp = createInput(intInput);
  x2Inp.position(9.8 * BUFFER, BOARDY + 9 * BUFFER);
  x2Inp.size(20);

  intInput = '';
  intInput += round(random(-2, 2));
  x1Inp = createInput(intInput);
  x1Inp.position(13.2 * BUFFER, BOARDY + 9 * BUFFER);
  x1Inp.size(20);

  intInput = '';
  intInput += round(random(-2, 2));
  x0Inp = createInput(intInput);
  x0Inp.position(16.6 * BUFFER, BOARDY + 9 * BUFFER);
  x0Inp.size(20);

  xMinInp = createInput('-5');
  xMinInp.position(5.4 * BUFFER, BOARDY + 13.5 * BUFFER);
  xMinInp.size(30);

  xMaxInp = createInput('5');
  xMaxInp.position(13.4 * BUFFER, BOARDY + 13.5 * BUFFER);
  xMaxInp.size(30);

  yMinInp = createInput('-5');
  yMinInp.position(5.4 * BUFFER, BOARDY + 15.5 * BUFFER);
  yMinInp.size(30);

  yMaxInp = createInput('5');
  yMaxInp.position(13.4 * BUFFER, BOARDY + 15.5 * BUFFER);
  yMaxInp.size(30);
}

function draw() {
  background(220);
  textSize(11);

  rect(BUFFER, BUFFER, BOARDX, BOARDY, 1);

  strokeWeight(0);
  fill(0);
  x4 = int(x4Inp.value());
  x3 = int(x3Inp.value());
  x2 = int(x2Inp.value());
  x1 = int(x1Inp.value());
  x0 = int(x0Inp.value());
  
  xMin = int(xMinInp.value());
  xMax = int(xMaxInp.value());
  yMin = int(yMinInp.value());
  yMax = int(yMaxInp.value());
  
  p1 = round(xMin + p1Slider.value() * (xMax - xMin), 2);
  p2 = round(xMin + p2Slider.value() * (xMax - xMin), 2);
  
  pixelX = (xMax - xMin) / BOARDX;
  pixelY = (yMax - yMin) / BOARDY;

  textSize(18);
  text('Y = ', BUFFER, BOARDY + 9.8 * BUFFER);
  text('x  +', 4.7 * BUFFER, BOARDY + 9.8 * BUFFER);
  textSize(10);
  text('4', 5.2 * BUFFER, BOARDY + 9.2 * BUFFER);
  textSize(18);
  text('x  +', 8 * BUFFER, BOARDY + 9.8 * BUFFER);
  textSize(10);
  text('3', 8.5 * BUFFER, BOARDY + 9.2 * BUFFER);
  textSize(18);
  text('x  +', 11.5 * BUFFER, BOARDY + 9.8 * BUFFER);
  textSize(10);
  text('2', 12 * BUFFER, BOARDY + 9.2 * BUFFER);
  textSize(18);
  text('x +', 15 * BUFFER, BOARDY + 9.8 * BUFFER);

  textSize(25);
  text('Window Size:', BUFFER, BOARDY + 12.5 * BUFFER);
  text('Graph Options:', BUFFER, BOARDY + 3.3 * BUFFER);
  
  textSize(18);
  text('x    =', 3 * BUFFER, BOARDY + 14.3 * BUFFER);
  textSize(10);
  text('min', 3.5 * BUFFER, BOARDY + 14.9 * BUFFER);
  textSize(18);
  text('x    =', 11 * BUFFER, BOARDY + 14.3 * BUFFER);
  textSize(10);
  text('max', 11.5 * BUFFER, BOARDY + 14.9 * BUFFER);

  textSize(18);
  text('y    =', 3 * BUFFER, BOARDY + 16.3 * BUFFER);
  textSize(10);
  text('min', 3.5 * BUFFER, BOARDY + 16.9 * BUFFER);
  textSize(18);
  text('y    =', 11 * BUFFER, BOARDY + 16.3 * BUFFER);
  textSize(10);
  text('max', 11.5 * BUFFER, BOARDY + 16.9 * BUFFER);

  text('x1 = ' + p1, BUFFER, BOARDY + 6.2 * BUFFER);
  text('x2 = ' + p2, BUFFER, BOARDY + 7.7 * BUFFER);

  strokeWeight(0.5);
  stroke(50);
  let xAxis = getAxisLines(xMin, xMax);
  for (let i = 1; i < xAxis.length; i++) {
    if (xAxis[i] == 0) {
      strokeWeight(1.5);
    }
    let xCoord = BUFFER + (((xMax - xMin) - (xMax - xAxis[i])) / pixelX)
    line(xCoord, BUFFER, xCoord, BUFFER + BOARDY);
    text(round(xAxis[i], 1), xCoord - 3, BOARDY + 1.5 * BUFFER);
    strokeWeight(0.5);
  }

  let yAxis = getAxisLines(yMin, yMax);
  for (let i = 1; i < yAxis.length; i++) {
    if (yAxis[i] == 0) {
      strokeWeight(1.5);
    }
    let yCoord = BUFFER + ((yMax - yAxis[i]) / pixelY);
    line(BUFFER, yCoord, BUFFER + BOARDX, yCoord);
    text(round(yAxis[i], 1), 2, yCoord + 3);
    strokeWeight(0.5);
  }

  textSize(16);
  text('Function:', 2 * BUFFER + BOARDX, 2 * BUFFER);

  text('Point 1:', 2 * BUFFER + BOARDX, 5 * BUFFER);
  fill(0);
  stroke(1);
  circle(5.2 * BUFFER + BOARDX, 4.7 * BUFFER, 13);

  text('Point 2:', 2 * BUFFER + BOARDX, 8 * BUFFER);
  fill(0, 0, 255);
  stroke(1);
  circle(5.2 * BUFFER + BOARDX, 7.7 * BUFFER, 13);
  fill(0);

  text('Tangent:', 2 * BUFFER + BOARDX, 11 * BUFFER);
  strokeWeight(2);
  stroke(255, 0, 0);
  line(5.2 * BUFFER + BOARDX, 11 * BUFFER, 5.7 * BUFFER + BOARDX, 10.5 * BUFFER)
  stroke(0);
  strokeWeight(0);

  text('Normal:', 2 * BUFFER + BOARDX, 14 * BUFFER);
  strokeWeight(2);
  stroke(0, 255, 0);
  line(5 * BUFFER + BOARDX, 14 * BUFFER, 5.5 * BUFFER + BOARDX, 13.5 * BUFFER)
  stroke(0);
  strokeWeight(0);

  text('Secant:', 2 * BUFFER + BOARDX, 17 * BUFFER);
  strokeWeight(2);
  stroke(0, 0, 255);
  line(4.9 * BUFFER + BOARDX, 17 * BUFFER, 5.4 * BUFFER + BOARDX, 16.5 * BUFFER)
  stroke(0);
  strokeWeight(0);

  textSize(12);
  let result = 'Y = ';
  if (x4 != 0) {
    result += x4 + 'x⁴ ';
  }
  if (x3 != 0) {
    if (result != 'Y = ') {
      result += '+ ';
    }
    result += x3 + 'x³ ';
  }
  if (x2 != 0) {
    if (result != 'Y = ') {
      result += '+ ';
    }
    result += x2 + 'x² ';
  }
  if (x1 != 0) {
    if (result != 'Y = ') {
      result += '+ ';
    }
    result += x1 + 'x ';
  }
  if(x0 != 0) {
    if (result != 'Y = ') {
      result += '+ ';
    }
    result += x0;
  }else if(result == 'Y = '){
    result += '0';
  }
  text(result, 2 * BUFFER + BOARDX, 3.3 * BUFFER);
  strokeWeight(3);
  drawArr(drawFunction());

  strokeWeight(1);
  stroke(255, 0, 0);
  if (tangent) {
    drawArr(drawTangent());
    textSize(12);
    stroke(0);
    strokeWeight(0);
    text('Y = ' + round(calcDerivative(), 2) + 'x + ' + round(calcFunction(p1) - calcDerivative() * p1, 2), 2 * BUFFER + BOARDX, 12.3 * BUFFER);
    strokeWeight(1);
  }

  stroke(0, 255, 0);
  if (normal) {
    drawArr(drawNormal());
    textSize(12);
    stroke(0);
    strokeWeight(0);
    text('Y = ' + round(oppRecip(), 2) + 'x + ' + round(calcFunction(p1) - oppRecip() * p1, 2), 2 * BUFFER + BOARDX, 15.3 * BUFFER);
    strokeWeight(1);
  }

  stroke(0, 0, 255);
  if (secant) {
    drawArr(drawSecant());
    let temp = [calcFunction(p2)];
    fill(0, 0, 255);
    stroke(1);
    if (!(temp[0] > yMax || temp[0] < yMin)) {
      circle(BUFFER + (((xMax - xMin) - (xMax - p2)) / pixelX), BUFFER + (BOARDY - yToPixel(temp)[0]), 10);
    }
    textSize(12);
    stroke(0);
    strokeWeight(0);
    fill(0);
    text('(' + p2 + ', ' + round(calcFunction(p2), 2) + ')', 2 * BUFFER + BOARDX, 9.3 * BUFFER);
    let m;
    if (p1 == p2) {
      m = calcDerivative();
    } else {
      m = (calcFunction(p2) - calcFunction(p1)) / (p2 - p1);
    }
    text('Y = ' + round(m, 2) + 'x + ' + round(calcFunction(p1) - m * p1, 2), 2 * BUFFER + BOARDX, 18.3 * BUFFER);
    strokeWeight(1);
  }

  if (secant || tangent || normal) {
    let temp = [calcFunction(p1)];
    fill(0);
    stroke(1);
    if (!(temp[0] > yMax || temp[0] < yMin)) {
      circle(BUFFER + (((xMax - xMin) - (xMax - p1)) / pixelX), BUFFER + (BOARDY - yToPixel(temp)[0]), 10);
    }
    textSize(12);
    stroke(0);
    strokeWeight(0);
    text('(' + p1 + ', ' + round(calcFunction(p1), 2) + ')', 2 * BUFFER + BOARDX, 6.3 * BUFFER)
    strokeWeight(1);
  }

  if (help) {
    displayHelp();
  }

  fill(255);
  stroke(1);
  strokeWeight(1);
}

function displayHelp() {
  stroke(0);
  fill(255);
  strokeWeight(1);
  rect(1.5 * BUFFER, 1.5 * BUFFER, CANVASX - 3 * BUFFER, BOARDY, 10);
  textSize(30);
  fill(0);
  text('Help Menu', 2 * BUFFER, 3.7 * BUFFER);

  strokeWeight(0);
  textSize(18);
  text('Check Boxes:', 2 * BUFFER, 5.3 * BUFFER);
  textSize(12);
  text('Use the Draw Tangent/Normal/Secant check boxes to enable/disable the corresponding lines on ', 2 * BUFFER, 6.3 * BUFFER);
  text('the graph. When enabled, the equations of the line will appear on the right side of the graph.', 2 * BUFFER, 7 * BUFFER);

  textSize(18);
  text('Sliders:', 2 * BUFFER, 8.5 * BUFFER);
  textSize(12);
  text('Use the sliders to change the location of point 1 and point 2. When tangent, normal, or secant is ', 2 * BUFFER, 9.6 * BUFFER);
  text('enabled, x1 determines the x coordinate of point 1 (used to place the tangent/normal or as the first ', 2 * BUFFER, 10.3 * BUFFER);
  text('point for a secant line). If secant is enabled, x2 can be used to change x2, the x coordinate of point ', 2 * BUFFER, 11 * BUFFER);
  text('2, and the location of the secant line. The coordinates of points 1 and 2 will appear to the right of ', 2 * BUFFER, 11.7 * BUFFER);
  text('the graph. For fine slider adjustments use the right/left arrow keys after clicking once on the slider.', 2 * BUFFER, 12.4 * BUFFER);

  textSize(18);
  text('Text Input Boxes:', 2 * BUFFER, 13.9 * BUFFER);
  textSize(12);
  text('Use the first 5 input boxes to set the coefficients of each term in the quartic polynomial. The', 2 * BUFFER, 14.9 * BUFFER);
  text('equation that is created will be graphed above, and the equation will be given to the right of the ', 2 * BUFFER, 15.6 * BUFFER);
  text('graph. The boxes only accept integers.', 2 * BUFFER, 16.3 * BUFFER);
  text('Use the final 4 input boxes to set the window of the graph above. Xmin and Xmax determine the ', 2 * BUFFER, 17.4 * BUFFER);
  text('range on the x axis and Ymin and Ymax determine the range of the y axis. These boxes only', 2 * BUFFER, 18.1 * BUFFER);
  text('accept integers.', 2 * BUFFER, 18.8 * BUFFER);
}

function getAxisLines(min, max) {
  let result = [];
  min = round(min);
  let range = max - min;
  if (range <= 2) {
    for (let i = 0; i < range; i += 0.1) {
      result.push(min + round(i, 1));
    }
  } else if (range <= 30) {
    for (let i = 0; i < range; i++) {
      result.push(min + i);
    }
  } else if (range <= 120) {
    for (let i = 0; i < range; i++) {
      if ((min + i) % 5 == 0) {
        result.push(min + i);
      }
    }
  } else {
    for (let i = 0; i < range; i++) {
      if ((min + i) % 10 == 0) {
        result.push(min + i);
      }
    }
  }
  return result;
}

function drawArr(arr) {
  let toDraw = yToPixel(arr);
  for (let i = 0; i < toDraw.length - 1; i++) {
    if (toDraw[i] != -1 && toDraw[i + 1] != -1) {
      line(BUFFER + i, BUFFER + (BOARDY - toDraw[i]), BUFFER + i + 1, BUFFER + (BOARDY - toDraw[i + 1]));
    } else if (toDraw[i] != -1 && toDraw[i + 1] == -1) {
      if (arr[i + 1] < yMin) {
        line(BUFFER + i, BUFFER + (BOARDY - toDraw[i]), BUFFER + i + 1, BUFFER + BOARDY);
      } else {
        line(BUFFER + i, BUFFER + (BOARDY - toDraw[i]), BUFFER + i + 1, BUFFER);
      }
    } else if (toDraw[i] == -1 && toDraw[i + 1] != -1) {
      if (arr[i] < yMin) {
        line(BUFFER + i, BUFFER + BOARDY, BUFFER + i + 1, BUFFER + (BOARDY - toDraw[i + 1]));
      } else {
        line(BUFFER + i, BUFFER, BUFFER + i + 1, BUFFER + (BOARDY - toDraw[i + 1]));
      }
    }
  }
}

function updateTan() {
  tangent = !tangent;
}

function updateNor() {
  normal = !normal;
}

function updateSec() {
  secant = !secant;
}

function calcFunction(inputX) {
  let result = 0;
  result += x0;
  result += x1 * inputX;
  result += x2 * pow(inputX, 2);
  result += x3 * pow(inputX, 3);
  result += x4 * pow(inputX, 4);
  return result;
}

function calcDerivative() {
  let result = 0;
  result += x1;
  result += 2 * x2 * p1;
  result += 3 * x3 * pow(p1, 2);
  result += 4 * x4 * pow(p1, 3);
  return result;
}

function oppRecip() {
  return -1 * (1 / calcDerivative());
}

function drawFunction() {
  let result = [];
  for (let i = 0; i <= BOARDX; i++) {
    result.push(calcFunction(xMin + i * pixelX));
  }
  return result;
}

function drawTangent() {
  let result = [];
  let minValue = calcFunction(p1) - (p1 - xMin) * calcDerivative();
  for (let i = 0; i <= BOARDX; i++) {
    result.push(minValue + i * pixelX * calcDerivative());
  }
  return result;
}

function drawNormal() {
  let result = [];
  let minValue = calcFunction(p1) - (p1 - xMin) * oppRecip();
  for (let i = 0; i <= BOARDX; i++) {
    result.push(minValue + i * pixelX * oppRecip());
  }
  return result;
}

function drawSecant() {
  let result = [];
  if (p1 == p2) {
    return drawTangent()
  }
  let m = (calcFunction(p2) - calcFunction(p1)) / (p2 - p1);
  let minValue = calcFunction(p1) - (p1 - xMin) * m;
  for (let i = 0; i <= BOARDX; i++) {
    result.push(minValue + i * pixelX * m);
  }
  return result;
}

function yToPixel(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > yMax || arr[i] < yMin) {
      result.push(-1); // indicates an out of domain value
    } else {
      result.push((arr[i] - yMin) / pixelY);
    }
  }
  return result;
}

function toggleMenu() {
  help = !help;
  if (help) {
    let button1 = createButton('Close');
    button1.position(27.5 * BUFFER - 4, 20 * BUFFER);
    button1.mousePressed(toggleMenu);
  } else {
    let button1 = createButton('Help');
    button1.position(27.5 * BUFFER, 20 * BUFFER);
    button1.mousePressed(toggleMenu);
  }
}