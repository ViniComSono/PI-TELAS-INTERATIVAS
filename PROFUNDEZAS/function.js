let partX = [];
let partY = [];
let partR = [];
let partVX = [];
let partVY = [];
let partCor = [];      
let partVida = [];
let partMaxVida = [];
let totalParticulas = 60;

let peixes = [];
let allPeixes = 20;
let clownFish = [];
let AllClownFish = 20;

let bubbles = []; 
let fade = 0;
let transicao = false;
let choice = -1;
let tempoTelaFinal = 0;

let buttonLeft;
let buttonRight;

function preload(){
    musica = loadSound("Maridia (Swampy Caverns).mp3");
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

function desenharParticula(i){
    let sumir = partVida[i] / partMaxVida[i];
    let c = partCor[i];
    noStroke();
    fill(c[0], c[1], c[2], c[3] * sumir);
    circle(partX[i], partY[i], partR[i] * 0.5);

    fill(c[0], c[1], c[2], c[3] * sumir * 0.2);
    circle(partX[i], partY[i], partR[i] * 0.5);
}

function desenharPeixes(peixe){
        let distance = dist(peixe.x, peixe.y, mouseX, mouseY);
        peixe.visible = constrain(peixe.visible, 0, 255);

        if(distance < 100){
            peixe.visible += 8;
        }else{
            peixe.visible -= 8; 
        }

        push();
        translate(peixe.x, peixe.y);
        rotate(atan2(peixe.ySpeed, peixe.xSpeed));
        noStroke();

        // corpo
        fill(120,230,255,peixe.visible);
        ellipse(0, 0, 40, 16);
        // ponta frontal
        triangle(20, 0,10, -6,10, 6);
        // cauda
        fill(90,190,255, peixe.visible);
        triangle(-20, 0,-38, -12,-38, 12);
        // nadadeiras laterais
        triangle(-2, -4,-12, -14,8, -4);
        triangle(-2, 4,-12, 14,8, 4);
        pop();
}

function drawClownFish(peixe) {
    let distance = dist(peixe.x, peixe.y, mouseX, mouseY);
    peixe.visible = constrain(peixe.visible, 0, 255);

    if(distance < 100){
        peixe.visible += 8;
    }else{
        peixe.visible -= 8; 
    }

    push();
    translate(peixe.x, peixe.y);
    rotate(atan2(peixe.ySpeed, peixe.xSpeed));

    noStroke();
    // corpo laranja
    fill(255, 140, 40, peixe.visible);
    ellipse(0, 0, 40, 18);
    // cauda
    triangle(-20 , 0,-35, -12,-35, 12);
    // listras brancas
    fill(255, 255, 255, peixe.visible);
    stroke(20, 20, 20, peixe.visible);
    strokeWeight(1.2);

    ellipse(-10, 0, 5, 18);
    ellipse(2, 0, 4, 18);
    ellipse(13, 0, 4, 14);

    pop();
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
                window.location.href = "/MONSTRO DOS MARES/index.html";
            }
            if(choice == 1){
                window.location.href = "/PEIXE DIABO/index.html";
            }
        }
    }
    
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < totalParticulas; i++){
        partMaxVida[i] = random(200, 500);
        partVida[i] = partMaxVida[i];
        partX[i] = random(width);
        partY[i] = random(height);
        partR[i] = random(1, 3.5);
        partVX[i] = random(-0.15, 0.15);
        partVY[i] = random(-0.3, 0.1);
    
        if (random() > 0.5){
            partCor[i] = [255, 255, 255, 255];
        } 
        else{
            partCor[i] = [255, 255, 255, 255];
        }
    }

    for (let i = 0; i < allPeixes; i++) {
        peixes.push({
            x: random(width),
            y: random(height),
            xSpeed: random(-1, 1),
            ySpeed: random(-1, 1),
            visible: 0
        });
    }

    for (let i = 0; i < AllClownFish; i++) {
        clownFish.push({
            x: random(width),
            y: random(height),
            xSpeed: random(-1, 1),
            ySpeed: random(-1, 1),
            visible: 0
        });
    }

    buttonLeft = {
        x: width/2 - 150,
        y: height - 80,
        texto: "A CRIATURA"
    };

    buttonRight = {
        x: width/2 + 150,
        y: height - 80,
        texto: "A LANTERNA"
    };

    for(let i = 0;i < 250; i++){
        bubbles[i] = [];
        bubbles[i][0] = random(width);
        bubbles[i][1] = random(height, height + 500);
        bubbles[i][2] = random(1,10);
    }
}

function draw() {
    background(0);

    drawChoices(buttonRight);
    drawChoices(buttonLeft);

    noFill();

    // PARTICULAS
    for (let i = 0; i < totalParticulas; i++){
        partX[i] += partVX[i];
        partY[i] += partVY[i];

        if (partVida[i] <= 0 || partY[i] < 0){
            partX[i] = random(width);
            partY[i] = random(height);
        }
        desenharParticula(i);
    }

    //PEIXES
    for(let i = 0; i < allPeixes;i++){
        let peixe = peixes[i]; 
        peixe.x += peixe.xSpeed;
        peixe.y += peixe.ySpeed;

        //verificar se ele vai escapar da tela
        if(peixe.x > width){
            peixe.x = 0;
        }
        if(peixe.x < 0){
            peixe.x = width;
        }

        if(peixe.y > height){
            peixe.y = 0;
        }
        if(peixe.y < 0){
            peixe.y = height;
        }
        desenharPeixes(peixe);
    }
    
    for(let i = 0; i < AllClownFish;i++){
        let fish = clownFish[i]; 
        fish.x += fish.xSpeed;
        fish.y += fish.ySpeed;

        if(fish.x > width){
            fish.x = 0;
        }
        if(fish.x < 0){
            fish.x = width;
        }
        if(fish.y > height){
            fish.y = 0;
        }
        if(fish.y < 0){
            fish.y = height;
        }
        drawClownFish(fish);
    }

    //LUZ
    blendMode(ADD);

    drawingContext.shadowBlur = 350;
    drawingContext.shadowColor = "rgb(179, 208, 207)";

    fill(255,255,255,10);
    circle(mouseX, mouseY, 300);

    drawingContext.shadowBlur = 0;
    blendMode(BLEND);
    fill(255);

    if(transicao){
        transition(choice);
    }
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
