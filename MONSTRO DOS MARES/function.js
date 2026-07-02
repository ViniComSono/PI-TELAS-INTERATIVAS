let bubblesMonstro = []; 
let mousePressing = false;
let InicialTime = 0;
let RealTime = 0

let bubbles = []; 
let fade = 0;
let transicao = false;
let choice = -1;
let tempoTelaFinal = 0;
let tempo = 0;

let buttonCenter;


function preload(){
    musica = loadSound("DokiDokiLiteratureClub!.mp3");
    bolhas = loadSound("../Spongebob Bubble.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for(let i = 0;i < 150; i++){
        bubblesMonstro[i] = [];
        bubblesMonstro[i][0] = random(width);
        bubblesMonstro[i][1] = random(width);
        bubblesMonstro[i][2] = random(1,5);
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
            text(buttonCenter.texto, width/2, height/2);
        }

        tempoTelaFinal++;

        if(tempoTelaFinal > 30){
            if(choice == 0){
                window.location.href = "../index.html";
            }
        }
    }
    
}

function drawFace(){

    push();
    strokeWeight(25);
    stroke(14, 21, 20);

    let xBase = 0;
    translate(xBase, height / 2 + 70);

    for(xBase = width / 2 - 80; xBase < width / 2 + 90; xBase += 40){

        beginShape();
        let contFrame = frameCount;

        if(contFrame > 600000){
            contFrame = 0;
        }

        let limit = map(RealTime, 0, 5000, 0, 20);
        let curv = map(RealTime, 0, 5000, 0, 4);

        for(let y = 0; y < (100 + limit); y += 1){
            let x = xBase + sin(contFrame * 0.04 + y * 0.04) * (10 + curv);
            vertex(x, y);
        }
        endShape();    
    }
    strokeWeight(1);
    pop();
}

function drawTantaculus(rotates, translateX, translateY){   
    push();

    strokeWeight(50);
    stroke(14, 21, 20);
    
    translate(translateX,  translateY);
    rotate(rotates);

    beginShape();

    let limit = map(RealTime, 0, 5000, 0, 80);
    let curv = map(RealTime, 0, 5000, 0, 8);

    for(let x = 0; x < (140 + limit); x += 1){
        let y = sin(frameCount * 0.04 + x * 0.04) * (10 + curv);
        vertex(x, y);
    }
    endShape();    
    strokeWeight(1);
    pop();
}

function drawBody(){
    fill(14, 21, 20);
    
    circle(width/2,height/2,(270));
    
    let shadowB = map(RealTime, 0, 5000, 0, 5);
    drawingContext.shadowBlur = 10 +  shadowB;
    drawingContext.shadowColor = "white";

    let followEyesX = map(mouseX, 0, width, width/2 + 60, width/2 + 70);
    let followBigEyesX = map(mouseX, 0, width, width/2 - 20, width/2 + 20);
    let followBigEyesY = map(mouseY, 0, height, height/2 - 28, height/2 - 12);

    noStroke();

    let littleEyesSize = map(RealTime, 0, 5000, 0, 8);
    let bigEyeSize = map(RealTime, 0, 5000, 0, 10);

    let color = map(RealTime, 0, 5000, 0, 200);
    let colorRed = 255 - color; 

    //EYES

    fill(255,colorRed,colorRed);
    circle(width/2 +80,height/2 -30,(30 + littleEyesSize));
    fill(0);
    ellipse(map(mouseX, 0, width, width/2 + 75, width/2 + 85), map(mouseY, 0, height, height/2 - 33, height/2 - 27) , 3 , 20); 
    
    fill(255,colorRed,colorRed);
    circle(width/2 -85,height/2 -30,(30 + littleEyesSize));
    fill(0);
    ellipse(map(mouseX, 0, width, width/2 - 90, width/2 - 80) , map(mouseY, 0, height, height/2 - 33, height/2 - 27) ,  3 , 20);
    
    fill(255,colorRed,colorRed);
    circle(width/2 -55,height/2 -80,(30 + littleEyesSize));
    fill(0);
    ellipse(map(mouseX, 0, width, width/2 - 60, width/2 - 50), map(mouseY, 0, height, height/2 - 83, height/2 - 77) , 3 , 20);
    
    fill(255,colorRed,colorRed);
    circle(width/2 +55,height/2 -80,(30 + littleEyesSize));
    fill(0);
    ellipse(map(mouseX, 0, width, width/2 + 50, width/2 + 60), map(mouseY, 0, height, height/2 - 83, height/2 - 77), 3, 20);

    fill(255,colorRed,colorRed);
    circle(width/2 ,height/2 -98,(30 + littleEyesSize));
    fill(0);
    ellipse(map(mouseX, 0, width, width/2 - 5, width/2 + 5), map(mouseY, 0, height, height/2 - 101, height/2 - 95), 3, 20);

    fill(255,colorRed,colorRed);
    circle(width/2,height/2 - 20, 80 + bigEyeSize);

    fill(0);
    ellipse(followBigEyesX, followBigEyesY,5, 50);

    drawingContext.shadowBlur = 0;

    //BODY

    drawFace();
    fill(14, 21, 20);
    noStroke();
    ellipse(width/2,height/2 + 84,250, 110);
}

function draw() {
    background(0);

    drawChoices(buttonCenter);

    for(let i = 0; i < 150; i++){
    
        let vel = map(bubblesMonstro[i][2], 1,5,1,2);
        let tam = map(bubblesMonstro[i][2], 1,2,1,4);
        let esp = map(bubblesMonstro[i][2], 1,5,0.5,1);
        
        noFill();
        stroke(255);
        strokeWeight(0.2);
        
        circle(bubblesMonstro[i][0], bubblesMonstro[i][1], tam);
        
        bubblesMonstro[i][1] -= vel;
        
        if(bubblesMonstro[i][1] < 0){
            bubblesMonstro[i][1] = random(height + 40, height + 10);
        }
        
        stroke(0);
    }

    push();

    drawTantaculus(PI, width/2 - 120, height/2 + 50);
    drawTantaculus(5 * PI / 4.5, width/2 - 120, height/2 - 10);
    drawTantaculus(5 * PI / 4, width/2 - 100, height / 2 - 75);
    drawTantaculus(5 * PI / 3.5, width/2 - 40, height / 2 - 125);

    drawTantaculus(0, width/2 + 120, height/2 + 50);
    drawTantaculus(-PI / 10, width/2 + 120, height/2 - 10);
    drawTantaculus(-PI / 6, width/2 + 115, height / 2 -80);
    drawTantaculus(-PI / 3, width/2 + 60, height / 2 - 120);

    pop();

    drawBody();

    //CONT : fiz esse contador para conseguir fazer a animação dos tentaculos crescendo
    
    if(mouseIsPressed && !mousePressing){
        mousePressing = true;
        InicialTime = millis();
    } 
    if(mouseIsPressed && mousePressing){
        RealTime = constrain(millis() - InicialTime, 0, 5000);
    }
    if(!mouseIsPressed && mousePressing){
        mousePressing = false;
    }
    if(!mouseIsPressed){
        RealTime = lerp(RealTime, 0, 0.05);
    }

    if(transicao){
        transition(choice);
    }
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