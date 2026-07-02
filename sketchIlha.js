let tempo = 0;

let bubbles = []; 
let fade = 0;
let transicao = false;
let choice = -1;
let tempoTelaFinal = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  buttonLeft = {
        x: width/2 - 780,
        y: height - 80,
        texto: "AGUAS PROFUNDAS"
    };

    buttonRight = {
        x: width/2 + 180,
        y: height - 180,
        texto: "AGUAS RASAS"
    };

    for(let i = 0;i < 250; i++){
        bubbles[i] = [];
        bubbles[i][0] = random(width);
        bubbles[i][1] = random(height, height + 500);
        bubbles[i][2] = random(1,10);
    }
}

function preload(){
    musica = loadSound("Lake Verity.mp3");
    bolhas = loadSound("/Spongebob Bubble.mp3");
}

function drawChoices(button){
    let disatanceMouse = dist(mouseX,mouseY,button.x,button.y);
    
    //true serve como  um constrain para limitar o valor usando os 2 ultimos argumentos
    let tamanho = map(disatanceMouse,150,0,0,15,true);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20 + tamanho);
    textFont("Montserrat");
    text(button.texto , button.x , button.y);
    fill(255);
}

function transition(choice){
    
    musica.setVolume(0);
    // desenha bolhas
    for(let i = 0; i < 250; i++){
        let vel = map(bubbles[i][2], 1,5,3,10);
        let tam = map(bubbles[i][2], 1,10,10,25);
        let esp = map(bubbles[i][2], 1,5,0.5,1);
        
        strokeWeight(esp);
        stroke(255);
        noFill();
        circle(bubbles[i][0] + bubbles[i][0]/3, bubbles[i][1] - bubbles[i][1]/4, tam/5);
        circle(bubbles[i][0], bubbles[i][1], tam);
        
        bubbles[i][1] -= vel;
        
        if(bubbles[i][1] < 0){
            
            bubbles[i][1] = random(height + 10, height + 40);
        }
    }

    fade += 3;
    noStroke();
    fill(0, fade);
    rect(0,0,width,height);

    if(fade >= 255){
        fill(255);
        textSize(40);

        if(choice == 0){
            text(buttonLeft.texto, width/2, height/2);
        }

        if(choice == 1){
            text(buttonRight.texto, width/2, height/2);
        }

        tempoTelaFinal++;

        if (tempoTelaFinal > 30) {

        if (choice == 0) {
        window.location.href = "/PROFUNDEZAS/index.html";
          }
    
        else if (choice == 1) {
              window.location.href = "/AGUAS RASAS/index.html";
          }
      }
    }
    
}

function draw() {

  tempo++;

  let linhaDoMar = height / 2;

  desenharCeu(linhaDoMar);
  desenharSol(linhaDoMar);
  desenharMar(linhaDoMar);
  desenharIlha(linhaDoMar);
  
    fill(255);

  drawChoices(buttonRight);
  drawChoices(buttonLeft);

  if(transicao){
    transition(choice);
  }
}

function desenharCeu(linhaDoMar) {
  background(255, 120, 70);

  fill(70, 90, 150, 80);
  rect(0, linhaDoMar / 2, width, linhaDoMar / 2);
}

function desenharSol(linhaDoMar) {
  let solX = width * 0.75;
  let solY = linhaDoMar * 0.45;

  fill(255, 190, 90, 60);
  ellipse(solX, solY, 100, 100);

  fill(255, 220, 120, 230);
  ellipse(solX, solY, 45, 45);
}

function desenharMar(linhaDoMar) {
  fill(20, 90, 150);
  rect(0, linhaDoMar, width, height - linhaDoMar);

  fill(5, 40, 90, 120);
  rect(0, linhaDoMar + 120, width, height);

  noFill();

  for (let camada = 0; camada < 5; camada++) {
    let yBase = linhaDoMar + camada * 25;
    let forcaOnda = 5 - camada;

    stroke(170, 220, 255, 150 - camada * 25);
    strokeWeight(2);

    for (let x = 0; x < width; x = x + 20) {
      let y1 = yBase + sin(x / 40 + tempo / 40 + camada) * forcaOnda;
      let y2 = yBase + sin((x + 20) / 40 + tempo / 40 + camada) * forcaOnda;

      line(x, y1, x + 20, y2);
    }
  }

  noStroke();
}

function desenharIlha(linhaDoMar) {
  let ilhaX = width / 2;
  let ilhaY = linhaDoMar + height * 0.25;

  // sombra da ilha
  fill(10, 30, 60, 80);
  ellipse(ilhaX, linhaDoMar + 25, width * 0.70, 75);

  // água clara em volta da ilha
  desenharAguaClara(ilhaX, ilhaY);

  // areia em toda a volta
  fill(215, 185, 105);
  ellipse(ilhaX, ilhaY + 10, width * 0.74, height * 0.34);

  // corpo principal da ilha
  fill(50, 95, 45);
  ellipse(ilhaX, ilhaY, width * 0.68, height * 0.30);

  // parte mais alta
  fill(75, 130, 55);
  ellipse(ilhaX - 20, ilhaY - 30, width * 0.48, height * 0.20);

  desenharLago(ilhaX, ilhaY);
  desenharCaminhos(ilhaX, ilhaY);
  desenharPalmeiras(ilhaX, ilhaY);
}

function desenharAguaClara(ilhaX, ilhaY) {
  fill(90, 200, 220, 180);
  ellipse(ilhaX, ilhaY + 20, width * 0.88, height * 0.42);

  fill(140, 230, 240, 100);
  ellipse(ilhaX - 20, ilhaY + 15, width * 0.72, height * 0.28);

  fill(180, 245, 255, 70);
  ellipse(ilhaX + 40, ilhaY + 5, width * 0.40, height * 0.12);
}

function desenharLago(ilhaX, ilhaY) {
  fill(60, 170, 220);
  ellipse(ilhaX + 70, ilhaY, 120, 55);

  fill(140, 220, 255, 80);
  ellipse(ilhaX + 55, ilhaY - 8, 55, 15);

  noFill();
  stroke(180, 220, 180, 100);
  strokeWeight(3);
  ellipse(ilhaX + 70, ilhaY, 125, 60);

  noStroke();
}

function desenharCaminhos(ilhaX, ilhaY) {
  stroke(170, 140, 80, 160);
  strokeWeight(3);

  line(ilhaX - 20, ilhaY + 5, ilhaX - 45, ilhaY - 20);
  line(ilhaX - 45, ilhaY - 20, ilhaX - 90, ilhaY - 45);
  line(ilhaX - 65, ilhaY - 35, ilhaX - 150, ilhaY - 65);
  noStroke();
}

function desenharPalmeiras(ilhaX, ilhaY) {
    desenharPalmeira(ilhaX - 90, ilhaY - 55, 40);
    desenharPalmeira(ilhaX - 30, ilhaY - 60, 50);
    desenharPalmeira(ilhaX + 20, ilhaY - 40, 40);
    desenharPalmeira(ilhaX + 130, ilhaY + 10, 35);
    desenharPalmeira(ilhaX + 10, ilhaY + 10, 50);
    desenharPalmeira(ilhaX - 70, ilhaY - 55, 20);
    desenharPalmeira(ilhaX - 30, ilhaY - 60, 60);
    desenharPalmeira(ilhaX + 20, ilhaY + 15, 25);
    desenharPalmeira(ilhaX - 140, ilhaY - 30, 45);
}

function desenharPalmeira(x, y, altura) {
  stroke(90, 65, 35);
  strokeWeight(3);
  line(x, y, x + 10, y - altura);

  noStroke();

  let topoX = x + 10;
  let topoY = y - altura;

  fill(35, 100, 45);
  ellipse(topoX - 15, topoY, 35, 8);
  ellipse(topoX + 15, topoY, 35, 8);
  ellipse(topoX, topoY - 10, 8, 30);
  ellipse(topoX - 10, topoY - 8, 28, 8);
  ellipse(topoX + 10, topoY - 8, 28, 8);
}

function desenharSetas(linhaDoMar) {
  let brilho = sin(tempo / 30) * 40 + 150;

  textAlign(CENTER);

  textSize(16);
  fill(120, 200, 255, brilho);
  text("Mergulhar nas profundezas", width * 0.10, linhaDoMar + height * 0.45);

  textSize(16);
  fill(140, 250, 255, brilho);
  text("Seguir para aguas rasas", width * 0.90, linhaDoMar + height * 0.30);

}

function mousePressed() {
    if (!musica.isPlaying()) {
        userStartAudio();
        musica.setVolume(0.1);
        musica.loop();
    }

    let dLeft = dist(mouseX, mouseY, buttonLeft.x, buttonLeft.y);
    let dRight = dist(mouseX, mouseY, buttonRight.x, buttonRight.y);

    if(dLeft < 50){
        choice = 0;
        transicao = true;
        if (!bolhas.isPlaying()){
            bolhas.setVolume(0.1);
            bolhas.play();
        }
    }
    if(dRight < 50){
        choice = 1;
        transicao = true;
        if (!bolhas.isPlaying()){
            bolhas.setVolume(0.1);
            bolhas.play();
        }
    }
}