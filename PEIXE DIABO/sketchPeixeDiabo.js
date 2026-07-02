let nivelLuz = 0;
let tempo = 0;
let transparenciaTextA = 0;

let bubbles = []; 
let fade = 0;
let transicao = false;
let choice = -1;
let tempoTelaFinal = 0;

let buttonCenter;

function preload(){
    musica = loadSound("Zelda Majoras Mask.mp3");
    bolhas = loadSound("/Spongebob Bubble.mp3");
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
            text(buttonCenter.texto, width/2, height/2);
        }
        tempoTelaFinal++;

        if(tempoTelaFinal > 30){
            if(choice == 0){
                window.location.href = "/index.html";
            }
        }
    }
    
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

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  buttonCenter = {
        x: width/2,
        y: height - 80,
        texto: "RESET"
    };

    for(let i = 0;i < 250; i++){
        bubbles[i] = [];
        bubbles[i][0] = random(width);
        bubbles[i][1] = random(height, height + 500);
        bubbles[i][2] = random(1,10);
    }
}

function draw() {
  background(0, 0, 5);

  drawChoices(buttonCenter);

  tempo++;

  let peixeX = width / 2 + sin(tempo / 60) * 40;
  let peixeY = height / 2 + 50 + cos(tempo / 60) * 20;

  let luzX = peixeX - 90;
  let luzY = peixeY - 120 + sin(tempo / 10) * 5;

  let tamanhoDaLuz = 10;
  let forcaDaLuz = 20;
  let visaoDoPeixe = 5;

  if (nivelLuz === 1) {
    tamanhoDaLuz = 90;
    forcaDaLuz = 70;
    visaoDoPeixe = 120;
  }

  if (nivelLuz === 2) {
    tamanhoDaLuz = 180;
    forcaDaLuz = 120;
    visaoDoPeixe = 180;
  }

  if (nivelLuz === 3) {
    tamanhoDaLuz = 320;
    forcaDaLuz = 170;
    visaoDoPeixe = 230;
  }

  desenharLuz(luzX, luzY, tamanhoDaLuz, forcaDaLuz);
  desenharPeixinhos(luzX, luzY, tamanhoDaLuz);
  desenharPeixe(peixeX, peixeY, visaoDoPeixe);
  desenharLanterna(luzX, luzY);

  if(transicao){
        transition(choice);
    }
}

function mousePressed() {
  nivelLuz = nivelLuz + 1;

  if (nivelLuz > 3) {
    nivelLuz = 0;
  }

  if (!musica.isPlaying()) {
    userStartAudio();
    musica.setVolume(0.1);
    musica.loop();
  }

  let dCenter = dist(mouseX, mouseY, buttonCenter.x, buttonCenter.y);
    
    if(dCenter < 50){
        choice = 0;
        transicao = true;
        if (!bolhas.isPlaying()){
            bolhas.setVolume(0.1);
            bolhas.play();
        }
    }
    
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function desenharLuz(x, y, tamanho, forca) {
  for (let raio = tamanho; raio > 0; raio = raio - 10) {
    let brilho = map(raio, tamanho, 0, 0, forca);

    fill(80, 150, 255, brilho / 3);
    ellipse(x, y, raio * 2, raio * 2);
  }
}

function desenharLanterna(x, y) {
  let brilho = sin(tempo / 10) * 30 + 90;

  fill(80, 150, 255, brilho);
  ellipse(x, y, 30, 30);

  fill(120, 190, 255, brilho);
  ellipse(x, y, 20, 20);

  fill(220, 240, 255);
  ellipse(x, y, 8, 8);
}

function desenharPeixe(x, y, visao) {
  // antena
  noFill();
  stroke(8, 15, 20, visao);
  strokeWeight(3);
  bezier(x - 20, y - 55, x, y - 65, x, y - 150, x - 90, y - 120);
  noStroke();

  // corpo
  fill(3, 5, 10, visao);
  ellipse(x, y, 220, 130);

  // cauda
  fill(2, 5, 10, visao);
  triangle(x + 90, y - 20, x + 160, y - 70, x + 135, y + 5);
  triangle(x + 90, y + 20, x + 160, y + 70, x + 135, y - 5);

  // barbatanas
  triangle(x + 15, y - 50, x + 60, y - 95, x + 50, y - 20);
  triangle(x + 10, y + 40, x + 60, y + 80, x + 40, y + 15);

  // dentes
  fill(220, 240, 255, visao);
  dente(x - 100, y - 10, x - 90, y + 10);
  dente(x - 80, y - 20, x - 70, y + 5);
  dente(x - 55, y - 15, x - 50, y + 5);
  dente(x - 90, y + 25, x - 80, y + 5);
  dente(x - 70, y + 30, x - 60, y + 10);
  dente(x - 50, y + 20, x - 40, y + 5);

  // olho
  fill(70, 140, 255, visao);
  ellipse(x - 15, y - 30, 25, 25);

  fill(5, 10, 15, visao);
  ellipse(x - 15, y - 30, 10, 10);

  fill(220, 240, 255, visao);
  ellipse(x - 20, y - 35, 5, 5);
}

function desenharPeixinhos(luzX, luzY, tamanhoDaLuz) {
  if (nivelLuz < 2) {
    return;
  }

  for (let i = 0; i < 4; i++) {
    let x = noise(i * 30, tempo / 300) * width;
    let y = noise(i * 20, tempo / 300 + 10) * height;

    let distancia = dist(x, y, luzX, luzY);
    let visao = map(distancia, tamanhoDaLuz / 3, tamanhoDaLuz, 1, 0, true);

    if (visao > 0) {
      fill(10, 20, 30, 180 * visao);
      ellipse(x, y, 40 * visao, 20 * visao);

      fill(100, 170, 255, 120 * visao);
      ellipse(x + 10, y - 5, 5, 5);
      ellipse(x - 10, y - 5, 5, 5);
    }
  }
}

function dente(x1, y1, x2, y2) {
  triangle(x1, y1, x1 + 10, y1 + 5, x2, y2);
}