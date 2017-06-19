var forceX = 0;
var forceY = 0;
var bars = [];
var r, g, b;

function windowResized() { 
	resizeCanvas(windowWidth, windowHeight);
}

function setup(){
	createCanvas(windowWidth, windowHeight);
  r = random(50, 255);
  g = random(0, 200);
  b = random(50, 255);
  
  
	gyro.frequency = 10; 
	gyro.startTracking(function(o) {
        forceX = o.gamma/50;
        forceY = o.beta/50;
    });

    for (var i = 0; i < 20; i++) {
    	bars[i] = new Bar();
    }

  
}



function draw(){
 background(200);
   console.log('draw');
   noStroke();
   fill(r,g,random(255));
//  rotateX(accelerationX * 0.01);
//  rotateY(accelerationY * 0.01);
   for (var i = 0; i < bars.length; i++) {
		bars[i].update();
		
	}
}

function deviceMoved() {   
    r = map(forceX, 0, 0, 1, 1);
    g = map(forceY, 0, 0, 1, 1);

}


function Bar(){
	this.x = width/2; 
	this.y = height/2;
	this.vitx = random(2, 12);
	this.vity = random(2, 12);
	this.diam = random(20,40);
}


Bar.prototype = {
	update: function(){

		this.x += this.vitx * forceX;
		this.y += this.vity * forceY;

		if(this.x < this.diam/2){
			this.x = this.diam/2;
		} else if(this.x > width-this.diam/2){
			this.x = width-this.diam/2;
		}
		if(this.y < this.diam/2){
			this.y = this.diam/2;
		} else if(this.y > height-this.diam/2){
			this.y = height-this.diam/2;
		}

	rect(this.x, this.y, this.diam + forceX*5, this.diam* + forceY*10);		
			//	rect(this.x-this.diam*2, this.y, this.diam/2, this.diam*3);	
			//	rect(this.x-this.diam*4, this.y, this.diam/2, this.diam*3);
				//rect(this.x+this.diam*2, this.y, this.diam/2, this.diam*3);	
			//	rect(this.x+this.diam*4, this.y, this.diam/2, this.diam*3);
	}
}