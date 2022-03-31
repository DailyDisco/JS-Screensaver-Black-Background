//set up our canvas
//canvas are tools used to drawing and animating within a browser
//gives access to the drawing properties



const canvas = document.querySelector('canvas');
//this is grabbing the canvas tag in the html



const ctx = canvas.getContext('2d');
//.getContext is a method/fuction
//'2d' is used for an oldschool screensaver, there is also '3d'
//the browser knows exactly where you want to run the animation



const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
//double declaration 
//window.innerHeight/innerWidth shows only the screen/viewport in the browser



//function to generate random number 



function random(min, max) {
    return Math.floor( Math.random() * (max - min +1) ) + min;
    //Math.floor makes the number round down to the nearest whole number.
    //this is commonly used; put it in the anki deck 
    // you need to use  '+ min' so that the number stays on the screen.
}



//this returns a random color on the RGB
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}



//We create a class because we are going to use a lot of balls with a lot of ball properties.
//This is why it is best to use objects to represent the ball model
class Ball {

    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    
    //this is the first method
    draw() {

        ctx.beginPath(); //this states we want to draw a shape
        ctx.fillStyle = this.color; //this chooses the balls color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //arc() traces an arc shape
        ctx.fill(); //this ends the drawing started in beginPath()
    
    }

    

    //we update the balls data to move the ball on the screen
    
    update () {
        
        if ((this.x + this.y) >= width) {
            this.velX = -(this.velX);
            //if this hits the right of the screen go the opposite direction.
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
            //if this hits the right of the screen go to the opposite direction.
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
            //if this hits the top of the screen go to the opposite direction.
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
            //if this hits the bottom of the screen go to the opposite direction.
         }

        this.x += this.velX; //takes the existing x location and adds the velocity to it so you can redraw the "frames" it creates the appereance of animation and motion.
        this.y += this.velY; //takes the existing y location and adds the y velocity to it.
    }



    //this is used so that the balls know when they've hit one another
    collisionDetect() {
        for (const ball of balls) {
           if (!(this === ball)) {
              const dx = this.x - ball.x;
              const dy = this.y - ball.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
     
              if (distance < this.size + ball.size) {
                ball.color = this.color = randomRGB();
              }
           }
        }
     }
     

}



//We are going to declare an array that can store all the ball objects
const balls = [];



//the while loop creates new instances of the Ball() class.
while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        //ball position is always drawn at least one ball width... ?
        //away from the edge of the canvas, to avoid drawing errors.
        random(0 + size,width - size), //x-coordinate
        random(0 + size,height - size), //y-cordinate
        random(-7,7),
        random(-7,7),
        randomRGB(),
        size
    );

    balls.push(ball)
    //this pushes a new ball into the array while the array is still less than 25.
}



function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
 
    for (const ball of balls) { //what does const ball of balls mean?
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
 
    requestAnimationFrame(loop); //this is an example of recursion
 }
 


 loop();



//test ball

//const testBall = new Ball(50, 100, 4, 4, 'blue', 10);



//this calls the balls properties
/*
testBall.x
testBall.size
testBall.color
testBall.draw()
*/
