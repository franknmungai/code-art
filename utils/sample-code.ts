export const html = `
<canvas id="canvas1"></canvas>
`;

export const css = `
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

#canvas1 {
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
`;

export const js = `
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

ctx.shadowColor = 'rgba(0,0,0,0.2)';
ctx.shadowoffsetY = 10;
ctx.shadowoffsetX = 5;
ctx.shadowBlur = 10;
ctx.fillStyle = 'green';

class Fractal {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.size = canvasWidth * 0.5;
    this.maxLevel = 4;
    this.scale = 0.5;
    this.spread = 1;
    this.branches = 2;
    this.color = 'hsl(28, 39%, 45%)'; 
    this.colors = [
      'hsl(28, 38%, 50%)',
      'hsl(28, 39%, 45%)',
      'hsl(39, 42%, 45%)',
    ];
  }

  draw(context, sides = 5) {
    context.save(); 
    context.lineWidth = 20;
    context.lineCap = 'round';
    context.fillStyle = 'green';

    context.translate(this.canvasWidth / 2, this.canvasHeight * 0.8);
    context.rotate(Math.PI); 

    context.scale(0.6, 0.6);

    for (let i = 0; i < sides; i++) {
      this.#drawLine(context, 0);
      context.rotate((Math.PI * 2) / sides);
    }
  }

  drawAnimate() {
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.maxLevel = this.maxLevel < 4 ? this.maxLevel + 1 : 0;
      ctx.save();
      this.draw(ctx, 1);
      ctx.restore();
    }, 800);
  }

  #drawLine(context, level) {
    if (level > this.maxLevel) {
      ctx.beginPath();
      ctx.arc(0, 0, 200, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    context.strokeStyle = this.colors[level] || this.color;

    context.beginPath();
    context.moveTo(0, 0); 
    context.lineTo(0, this.size);
    context.stroke();

    for (let i = 0; i < this.branches; i++) {
      context.save();
      context.translate(0, this.size - (this.size / this.branches) * i);
      context.scale(this.scale, this.scale);

      context.save();
      context.rotate(this.spread);
      this.#drawLine(context, level + 1);
      context.restore();

      context.save();
      context.rotate(-this.spread);
      this.#drawLine(context, level + 1);
      context.restore();
      context.restore();
    }
  }
}

const fractal = new Fractal(canvas.width, canvas.height);
fractal.draw(ctx, 1);
`;
