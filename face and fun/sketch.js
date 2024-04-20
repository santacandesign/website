// let vid;
// w=64;
// h=40;
// let scale = 10;

// function setup() {
//   createCanvas(w*scale, h*scale);
//   vid = createCapture(VIDEO, {flipped: true});
//   vid.size(w,h);
  
//   stroke(255,255,255)
// }

// function draw() {
//   background(220);
//   vid.loadPixels();
  
  
  
  
//   for(let i=0; i<vid.width; i++){
    
//     for(let j=0; j<vid.height; j++) {
//       let index = ((j* vid.width)+i)*4;
//       let r = vid.pixels[index+0];
//       let g = 100+vid.pixels[index+ 1];
//       let b = vid.pixels[index+2];
//       let a = vid.pixels[index+3];
      
//       let c = (r +g+ b)/3 ;
//       let s = map(c, 0, 100, 0, 80);
//       // let val = vid.get(i,j)
//       // let c = map(brightness(val), 0, 100, 0, 255);
//       // let s = map(brightness(val), 0, 100, 0, 20);
      
//       fill(r,g,b);
//       rect( i*scale,  j*scale, s, s);
//     }
//   }
//   filter(INVERT);
//   filter(POSTERIZE, 3);
  
// }

let vid;
let scale = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  vid = createCapture(VIDEO);
  vid.size(width / scale, height / scale);
  

  stroke(255);
}

function draw() {
  background(220);
  image(vid, 0, 0, 320, 240); 
  vid.loadPixels();
  vid.updatePixels();
  translate(0, 0);

  for (let i = 0; i < vid.width; i++) {
    for (let j = 0; j < vid.height; j++) {
      let index = (j * vid.width + i) * 4;
      let r = vid.pixels[index + 0];
      let g = 100+vid.pixels[index + 1];
      let b = vid.pixels[index + 2];
      let a = vid.pixels[index + 3];

      let c = (r + g + b) / 3;
      let s = map(c, 0, 100, 0, 80);

      fill(r, g, b);
      rect(i * scale, j * scale, s, s);
    }
  }
  filter(INVERT);
  filter(POSTERIZE, 3);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  vid.size(width / scale, height / scale);
}
