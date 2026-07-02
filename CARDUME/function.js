let partX = [];
let partY = [];
let partR = [];
let partVX = [];
let partVY = [];
let partCor = [];      
let partVida = [];
let partMaxVida = [];
let totalParticulas = 60;

let bubbles = []; 
let fade = 0;
let transicao = false;
let choice = -1;
let tempoTelaFinal = 0;

let buttonCenter;

let fishes = [], raio, transp, verificationCircle = false, waveX, waveY, musica;

function preload(){
    musica = loadSound("DonkeyKongCountry.mp3");
    fundo = loadImage("fundo.png");
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


function desenharParticula(i){
    let sumir = partVida[i] / partMaxVida[i];
    let c = partCor[i];
    noStroke();
    fill(c[0], c[1], c[2], c[3] * sumir);
    circle(partX[i], partY[i], partR[i] * 2);

    fill(c[0], c[1], c[2], c[3] * sumir * 0.2);
    circle(partX[i], partY[i], partR[i] * 5);
}

function drawFishs(fishes){
    push();
    translate( fishes.x, fishes.y);
    rotate(atan2(fishes.ySpeed,fishes.xSpeed));

    fill(9, 82, 106);
    noStroke();
    //corpo
    ellipse(0, 0, 14, 8);
    //cauda
    triangle(-8, 0,-12, -6,-12, 6);

    pop();
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < totalParticulas; i++){
        partX[i] = random(width);
        partY[i] = random(height);
        partR[i] = random(1, 3.5);
        partVX[i] = random(-0.15, 0.15);
        partVY[i] = random(-0.3, 0.1);
        partVida[i] = random(200, 500);
        partMaxVida[i] = partVida[i];
    
    if (random() > 0.5){
        partCor[i] = [20, 70, 140, random(40, 120)];
    } 
    else{
        partCor[i] = [0, 150, 180, random(40, 120)];
    }
    }

    for (let i = 0; i < 50; i++) {
        fishes.push({
        x: random(width),
        y: random(height),
        xSpeed: random(-2, 3),
        ySpeed: random(-2, 3)
    });
    }

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
    background(fundo);

    // PARTICCULAS
    for (let i = 0; i < totalParticulas; i++){
        partX[i] += partVX[i];
        partY[i] += partVY[i];
        partVida[i]--;

        if (partVida[i] <= 0 || partY[i] < 0){
            partX[i] = random(width);
            partY[i] = random(height);
            partVida[i] = random(200, 500);
            partMaxVida[i] = partVida[i];
        }
        desenharParticula(i);
    }

    for (let myFish of fishes) {
        // ANALISAR OUTROS PEIXES

        for (let others of fishes) {
            if (myFish === others) {
                continue;
            }
            let distance = dist(myFish.x, myFish.y, others.x, others.y);

        // Separação
            if (distance < 25) {
                myFish.xSpeed += (myFish.x - others.x) * 2;
                myFish.ySpeed += (myFish.y - others.y) * 2;
            }
        }

        //SEGUIR MOUSE
        let mouseDistance = dist(myFish.x, myFish.y, mouseX, mouseY);
        if(mouseDistance < 200){
            myFish.xSpeed += (mouseX - myFish.x) / mouseDistance * 0.1;
            myFish.ySpeed += (mouseY - myFish.y) / mouseDistance * 0.1;
        }

        //CIRCULO
        if(verificationCircle){
            push();
            noFill();
            strokeWeight(1);
            stroke(0, 200, 255, transp);
            circle( waveX, waveY, raio);
            pop();

            raio += 0.3;
            transp -= 0.008;

            if(transp <= 0){
                verificationCircle = false;
            }
        }

        // LIMITAR VELOCIDADE
        let velocidade = sqrt((myFish.xSpeed * myFish.xSpeed) + (myFish.ySpeed * myFish.ySpeed));
        if (velocidade > 2) {
            myFish.xSpeed = myFish.xSpeed / velocidade * 2
            myFish.ySpeed = myFish.ySpeed / velocidade * 2;
        }
        // MOVIMENTO
        myFish.x += myFish.xSpeed;
        myFish.y += myFish.ySpeed;
        // BORDAS
        if (myFish.x > width)
            myFish.x = 0;
        if (myFish.x < 0)
            myFish.x = width;
        if (myFish.y > height)
            myFish.y = 0;
        if (myFish.y < 0)
            myFish.y = height;
        // DESENHAR
        drawFishs(myFish);
    }

    fill(255);

    drawChoices(buttonCenter);
    
    if(transicao){
        transition(choice);
    }
}

function mouseClicked() {

    for (let myFish of fishes) {
        let mouseDistance = dist(myFish.x, myFish.y, mouseX, mouseY);

        if (mouseDistance < 200 && myFish.x > mouseX) {
             myFish.xSpeed +=  mouseDistance * 60;
        }
        if (mouseDistance < 200 && myFish.x < mouseX) {
            myFish.xSpeed -=  mouseDistance * 60;
        }
        if (mouseDistance < 200 && myFish.y < mouseY) {
            myFish.xSpeed -=  mouseDistance * 60;
        }
        if (mouseDistance < 200 && myFish.y > mouseY) {
           myFish.xSpeed +=  mouseDistance * 60;
        }
    }
        waveX = mouseX;
        waveY = mouseY;
        raio = 1;
        transp = 10;
        verificationCircle = true;
    }

function mousePressed() {

    if (!musica.isPlaying()) {
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
