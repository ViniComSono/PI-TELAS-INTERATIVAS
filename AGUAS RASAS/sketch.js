// peixes
let peixeX = [];
let peixeY = [];
let peixeVX = [];
let peixeVY = [];
let peixeAng = [];
let peixeTam = [];
let peixeCor = [];
let peixeFugindo = [];
let peixeFugVX = [];
let peixeFugVY = [];
let totalPeixes = 20;

// ondas
let totalOndas = 0;
let ondaX = [];
let ondaY = [];
let ondaRaio = [];
let ondaForca = [];
let ondaRaioPrev = [];

let ondaVelRaio = 3.5;

let bubbles = []; 
let fade = 0;
let transicao = false;
let choice = -1;

let buttonLeft;
let buttonRight;

let tempoTelaFinal = 0;

function preload(){
  musica = loadSound("zelda3.mp3");
  bolhas = loadSound("../Spongebob Bubble.mp3");
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

    if(tempoTelaFinal > 30){
      if(choice == 0){
          window.location.href = "../CARDUME/index.html";
      }
      if(choice == 1){
          window.location.href = "../AGUAS VIVAS/index.html";
      }
    }
  } 
}

function drawChoices(button){

    let disatanceMouse = dist(mouseX,mouseY,button.x,button.y);

    //true serve como  um constrain para limitar o valor usando os 2 ultimos argumentos
    let tamanho = map(disatanceMouse,150,0,0,15,true);

    if(disatanceMouse < 150){
        fill(10, 20 + 15 * sin(frameCount * 0.04), 80 + 30 * sin(frameCount * 0.03));
    }

    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20 + tamanho);
    textFont("Montserrat");
    text(button.texto , button.x , button.y);
    fill(255);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // criando os peixes com posições, direções e cores aleatórias
  for (let i = 0; i < totalPeixes; i++){
    peixeX[i] = random(width);
    peixeY[i] = random(height);
    peixeAng[i] = random(PI);
    peixeVX[i] = cos(peixeAng[i]) * 0.8;
    peixeVY[i] = sin(peixeAng[i]) * 0.8;
    peixeTam[i] = random(25, 40);
    peixeFugindo[i] = 0;
    peixeFugVX[i] = 0;
    peixeFugVY[i] = 0;

    let sorteio = floor(random(4));

    if (sorteio == 0){
      peixeCor[i] = color(244, 162,  97);
    }
    if (sorteio == 1){
      peixeCor[i] = color(168, 218, 220);
    }
    if (sorteio == 2){
      peixeCor[i] = color(181, 228, 140);
    }
    if (sorteio == 3){ 
      peixeCor[i] = color(255, 209, 102)
    }
  }
  //caminhos
  buttonLeft = {
        x: width/2 - 150,
        y: height - 80,
        texto: "SEGUIR O REBANHO"
    };

    buttonRight = {
        x: width/2 + 150,
        y: height - 80,
        texto: "IR PARA O NEON"
    };

    for(let i = 0;i < 250; i++){
        bubbles[i] = [];
        bubbles[i][0] = random(width);
        bubbles[i][1] = random(height, height + 500);
        bubbles[i][2] = random(1,10);
    }
}

function draw() {

  desenharFundo();
  atualizarOndas();
  atualizarPeixes();

  drawChoices(buttonRight);
  drawChoices(buttonLeft);

  if(transicao){
        transition(choice);
  }
}

function mouseClicked(){
  // cria novas ondas na posição do click  
  ondaX[totalOndas] = mouseX;
  ondaY[totalOndas] = mouseY;
  ondaRaio[totalOndas] = 0;
  ondaForca[totalOndas] = 1.0;
  ondaRaioPrev[totalOndas] = 0;
  totalOndas++;
  
  if (!musica.isPlaying()) {
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

function atualizarOndas(){
  for (let i = 0; i < totalOndas; i++){
    ondaRaioPrev[i] = ondaRaio[i];
    ondaRaio[i] += ondaVelRaio;
    ondaForca[i] *= 0.98;
    
    // desenhando as ondas
    noFill();
    stroke(255, 255, 255, ondaForca[i] * 180);
    strokeWeight(2);
    circle(ondaX[i], ondaY[i], ondaRaio[i] * 2);

    stroke(255, 255, 255, ondaForca[i] * 120);
    strokeWeight(1.5);
    circle(ondaX[i], ondaY[i], max(0, ondaRaio[i] - 20) * 2);

    stroke(255, 255, 255, ondaForca[i] * 60);
    strokeWeight(1);
    circle(ondaX[i], ondaY[i], max(0, ondaRaio[i] - 40) * 2);
  }
  
  // diminuindo a quantidade de ondas se forem fracas
  for (let i = totalOndas - 1; i >= 0; i--){
    if (ondaForca[i] < 0.1){
      ondaX[i] = ondaX[totalOndas - 1];
      ondaY[i] = ondaY[totalOndas - 1];
      ondaRaio[i] = ondaRaio[totalOndas - 1];
      ondaForca[i] = ondaForca[totalOndas - 1];
      ondaRaioPrev[i] = ondaRaioPrev[totalOndas - 1];
      totalOndas--;
    }
  }
}

function atualizarPeixes(){
  for (let i = 0; i < totalPeixes; i++){
    // verifica se o peixe foi atingido por alguma onda
    for (let j = 0; j < totalOndas; j++){
      
      let d = dist(peixeX[i], peixeY[i], ondaX[j], ondaY[j]);
      if (peixeFugindo[i] == 0 && ondaRaioPrev[j] < d && d <= ondaRaio[j] && ondaForca[j] > 0.5){
        // calcula a direção da fuga
        let angFuga = atan2(peixeY[i] - ondaY[j], peixeX[i] - ondaX[j]);
        peixeFugVX[i] = cos(angFuga) * 10 * ondaForca[j]; 
        peixeFugVY[i] = sin(angFuga) * 10 * ondaForca[j];
        peixeAng[i] = angFuga;
        peixeFugindo[i] = 40; 
      }
    }
    
    // comportamento durante a fuga
    if (peixeFugindo[i] > 0){
      peixeFugVX[i] = peixeFugVX[i] * 0.97;
      peixeFugVY[i] = peixeFugVY[i] * 0.97;
      peixeVX[i] = peixeFugVX[i];
      peixeVY[i] = peixeFugVY[i];
      peixeAng[i] = atan2(peixeVY[i], peixeVX[i]);
      peixeFugindo[i]--;
      
      // voltando ao estado normal
      if (peixeFugindo[i] == 0){
        peixeVX[i] = cos(peixeAng[i]) * 0.8;
        peixeVY[i] = sin(peixeAng[i]) * 0.8;
      }
    } 
    
    // movimento de nado com um pouco de oscilação
    else {
      peixeAng[i] = peixeAng[i] + random(-0.01, 0.01);
      peixeVX[i] = cos(peixeAng[i]) * 0.8;
      peixeVY[i] = sin(peixeAng[i]) * 0.8;
    }
    
    // atualiza posição
    peixeX[i] = peixeX[i] + peixeVX[i];
    peixeY[i] = peixeY[i] + peixeVY[i];
    
    // tp nas bordas
    if (peixeX[i] < 0){
      peixeX[i] = width;
    }
    if (peixeX[i] > width){
      peixeX[i] = 0;
    }
    if (peixeY[i] < 0){
      peixeY[i] = height;
    }
    if (peixeY[i] > height){
      peixeY[i] = 0;
    }
    desenharPeixe(i);
  }
}

function desenharFundo(){
  for (let y = 0; y < height; y++){
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(150,220,255), color(230,220,180), inter);
    stroke(c);
    line(0,y,width,y);
  }
}

function desenharPeixe(i){
  let cr = red(peixeCor[i]);
  let cg = green(peixeCor[i]);
  let cb = blue(peixeCor[i]);
  
  push();
  translate(peixeX[i], peixeY[i]);
  rotate(peixeAng[i]);
  
  // sombra
  noStroke();
  fill(0, 0, 0, 50);
  ellipse(5, 8, peixeTam[i] * 2, peixeTam[i] * 0.8)
  
  stroke(0);
  strokeWeight(0.1);
  
  // corpo
  fill(cr, cg, cb);
  ellipse(0, 0, peixeTam[i] * 2, peixeTam[i] * 0.8);

  // barbatana de cima
  fill(cr - 80, cg - 80, cb - 80, 180);
  ellipse(peixeTam[i] * 0.1, 0, peixeTam[i] * 0.9, peixeTam[i] * 0.18);

  // cauda
  fill(cr - 80, cg - 80, cb - 80);
  triangle(-peixeTam[i], 0, -peixeTam[i] - peixeTam[i] * 0.6, -peixeTam[i] * 0.4, -peixeTam[i] - peixeTam[i] * 0.6, peixeTam[i] * 0.4);

  pop();
}