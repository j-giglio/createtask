//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage Dec. 9 2019 canvas api used throughout
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors Sept. 20 2019 used throughout
///////////////////// LEVELS

let levels = [
//level one
  {
    startX: 200,
    startY: 300,
    blocks: [
      {
        x: 100,
        y: 470,
        startX: 100,
        startY: 470,
        width: 300,
        height: 50,
        color: "red",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 550,
        y: 400,
        startX: 550,
        startY: 400,
        width: 300,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 970,
        y: 290,
        startX: 970,
        startY: 290,
        width: 300,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },


      {
        x: 1420,
        y: 235,
        startX: 1420,
        startY: 235,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 1620,
        y: 235,
        startX: 1620,
        startY: 235,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 1820,
        y: 235,
        startX: 1820,
        startY: 235,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },


      {
        x: 2070,
        y: 235,
        startX: 2070,
        startY: 235,
        width: 300,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 2580,
        y: 400,
        startX: 2580,
        startY: 400,
        width: 250,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },



      {
        x: 2950,
        y: 350,
        startX: 2950,
        startY: 350,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 3100,
        y: 220,
        startX: 3100,
        startY: 220,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 3300,
        y: 220,
        startX: 3300,
        startY: 220,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 3500,
        y: 100,
        startX: 3500,
        startY: 100,
        width: 250,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 3930,
        y: 400,
        startX: 3930,
        startY: 400,
        width: 280,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 4330,
        y: 270,
        startX: 4330,
        startY: 270,
        width: 400,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 4830,
        y: 140,
        startX: 4830,
        startY: 140,
        width: 300,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 5280,
        y: 425,
        startX: 5280,
        startY: 425,
        width: 60,
        height: 60,
        color: "#0046b8",
        sprite: blockPlaceHolder,
        onCollision: teleporter,
        deltaX: 400,
        deltaY: -355,
      },
      {
        x: 5680,
        y: 100,
        startX: 5680,
        startY: 100,
        width: 60,
        height: 60,
        color: "#0046b8",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 5750,
        y: 290,
        startX: 5750,
        startY: 290,
        width: 210,
        height: 30,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 6150,
        y: 410,
        startX: 6150,
        startY: 410,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 6210,
        y: 410,
        startX: 6210,
        startY: 410,
        width: 60,
        height: 60,
        color: "#0046b8",
        sprite: blockPlaceHolder,
        onCollision: teleporter,
        deltaX: 0,
        deltaY: -310,
      },
      {
        x: 6210,
        y: 100,
        startX: 6210,
        startY: 100,
        width: 60,
        height: 60,
        color: "#0046b8",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 6270,
        y: 100,
        startX: 6270,
        startY: 100,
        width: 130,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 6550,
        y: 380,
        startX: 6550,
        startY: 380,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 6750,
        y: 320,
        startX: 6750,
        startY: 320,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 6900,
        y: 180,
        startX: 6900,
        startY: 180,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 7100,
        y: 240,
        startX: 7100,
        startY: 240,
        width: 60,
        height: 60,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 7300,
        y: 400,
        startX: 7300,
        startY: 400,
        width: 60,
        height: 60,
        color: "#0046b8",
        sprite: blockPlaceHolder,
        onCollision: teleporter,
        deltaX: 400,
        deltaY: -300,
      },
      {
        x: 7700,
        y: 100,
        startX: 7700,
        startY: 100,
        width: 60,
        height: 60,
        color: "#0046b8",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 7900,
        y: 100,
        startX: 7900,
        startY: 100,
        width: 300,
        height: 50,
        color: "red",
        sprite: blockPlaceHolder,
        onCollision: endGame,
      },
    ],
  },
]

///////////////////// OBJECTS

let user = {
  x: null,
  y: null,
  width: 28,
  height: 62,
  facing: 1,
  speed: 0,
  speedCap: 10,
  speedCounter: 1,
  accelDivisor: 2,
  accelRate: 3,
  isJumping: false,
  ySpeed: 0,
  jumpSpeed: 26,
  jumpStart: null,
  jumpHeight: 166,
  hangTime: 10,
  hangCounter: 0,
  offGround: false,
  isCrouching: false,
  sprite: null,
};

///////////////////// ELEMENTS

const message = document.getElementById("message");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

///////////////////// VARIABLES

let currentLevel = 0;
let mobile = [user];
let onScreenThings = [];
let tickCount = 0;
let gforce = 8;
let leftScrollMargin = 196;
let rightScrollMargin = 284;
let topScrollMargin = 100;
let bottomScrollMargin = 420 - user.height;
let leftPressed = false;
let rightPressed = false;

//////Sprite Animation Counters

let sprUserWalkingFrame = 1;

///////////////////// EVENT LISTENERS

canvas.onclick = runTicks;
// document.getElementsByClassName("inactive").onclick = startGame;
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

///////////////////// ENGINE

function runTicks() {
  if (canvas.className === "inactive") {
    user.x = levels[currentLevel].startX;
    user.y = levels[currentLevel].startY;
    canvas.className = "active";
    window.requestAnimationFrame(perTick); //https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame Feb 22 2020
  };
};

function perTick() {
  tickCount = (tickCount >= Math.MAX_SAFE_INTEGER) ? 0 : tickCount + 1;
  resetAttributes();
  loadEntities();
  move();
  gravity();
  mobile.forEach((d) => {
    collision(d);
  });
  adjustCamera();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateSprites();
  drawThings();
  if (canvas.className === "active") {
    window.requestAnimationFrame(perTick); //https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame Feb 22 2020
  }
  if (user.speedCounter > 1) {
    user.speedCounter++;
  }
};

function resetAttributes() {
  mobile.forEach((c) => {
    c.offGround = true
  });
}

function adjustCamera() {
  if (user.x >= rightScrollMargin || user.x <= leftScrollMargin) {
    let add = (user.speed === 0 && user.x >= rightScrollMargin) ? -user.speedCap : (user.speed === 0 && user.x <= leftScrollMargin) ? user.speedCap : -user.speed;
    user.x += add;
    levels[currentLevel].blocks.forEach((block) => {
      block.x += add;
    });
  }
}

function loadEntities() {
  if (user.x <= -user.width && user.x >= canvas.width) {
    mobile.push(user);
  }
  onScreenThings = mobile.concat();
  levels[currentLevel].blocks.forEach((block) => {
    if (block.x + block.width > 0 && block.x < canvas.width) {
      onScreenThings.push(block);
    }
  });
};

function collision(e) {
  onScreenThings.forEach((thing) => {
    if (e.x < thing.x + thing.width &&           ///
        e.x + e.width > thing.x &&               ///https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection November 4 2019
        e.y < thing.y + thing.height &&          ///
        e.y + e.height > thing.y - 1 &&          /// -1 added to fix a gravity/collision detection bug
        thing != user) {
      thing.onCollision(e);
    }
  });
  if (user.y > canvas.height) {
    userDeath()
  }
}

function move() {
  mobile.forEach((c) => {
    if (c.speedCounter % c.accelDivisor === 0) {
      c.speed += c.accelRate * user.facing;
      c.speed = (c.speed > c.speedCap) ? c.speedCap : c.speed;
      c.speed = (c.speed < -c.speedCap) ? -c.speedCap : c.speed;
    }
    c.x += c.speed;

    if (c.isJumping) {
      c.y -= c.ySpeed
      if (c.ySpeed === 0) {
        c.hangCounter++
      }

      if (c.hangTime === c.hangCounter) {
        c.isJumping = false;
        c.hangCounter === 0;
      }

      if (c.y <= c.jumpStart - c.jumpHeight) {
        c.ySpeed = 0;
      }
    };
  });
};

function gravity() {
  mobile.forEach((c) => {
    if (c.offGround && !c.isJumping && c.x >= 0 && c.x <= canvas.width) {
      c.y += gforce;
    }
  });
};

function userDeath() {
  user.x = levels[currentLevel].startX;
  user.y = levels[currentLevel].startY;
  levels[currentLevel].blocks.forEach((block) => {
    block.x = block.startX;
    block.y = block.startY;
  });
}

function drawThings() {
  onScreenThings.forEach((thing) => {
    thing.sprite()
  });

}

function keyDown(a) {
  if (canvas.className === "active") {
    switch (a.code) {
      case "KeyD":
        // user.speed = user.speedCap
        user.facing = 1;
        if (user.speedCounter === 1) {
          user.speedCounter++;
        }
        leftPressed = true;
        break;
      case "KeyA":
        user.facing = -1;
        if (user.speedCounter === 1) {
          user.speedCounter++;
        }
        rightPressed = true;
        break;
      case "KeyW":
        break;
      case "KeyS":
        user.isCrouching = true;
        break;
      case "Space":
        if (!user.isJumping && !user.offGround){
          user.jumpStart = user.y;
          user.isJumping = true;
          user.ySpeed = user.jumpSpeed;
          user.hangCounter = 0;
        };
        break;
    }
  }
};

function keyUp(b) {
  switch (b.code) {
    case "KeyD":
      if (!rightPressed) {
        user.speed = 0;
        user.speedCounter = 1;
      }
      leftPressed = false;
      break;
    case "KeyA":
      if (!leftPressed) {
        user.speed = 0;
        user.speedCounter = 1;
      }
      rightPressed = false;
      break;
    case "KeyW":
      break;
    case "KeyS":
      user.isCrouching = false;
      break;
    case "Space":
      user.ySpeed = 0;
      break;
  }
}

///////////////////// COLLISION

function normalBlock(e) {
  /////// underneath /this/
  if (e.y <= this.y + this.height && e.y >= this.y + this.height - e.ySpeed) {
    e.isJumping = false;
    e.y -= this.y + this.height + 3;
  } else if (e.y + e.height >= this.y && e.y + e.height <= this.y + gforce) { /////// above /this/
    e.y = this.y - e.height;
    if (e.offGround) {
      e.offGround = false;
    }
  } else/* if (!user.isJumping && user.speed === 0)*/ {
    e.x -= e.speed;
  }
}

function teleporter(e) {
  /////// underneath /this/
  if (e.y <= this.y + this.height && e.y >= this.y + this.height - e.ySpeed) {
    e.isJumping = false;
    e.y = this.y + this.height + 1;
  } else if (e.y + e.height >= this.y && e.y + e.height <= this.y + gforce) { /////// above /this/
      e.x += this.deltaX
      e.y += this.deltaY
  } else {
    e.x -= e.speed;
  }
}

function endGame() {
  canvas.className = "inactive";
  message.innerHTML = "You win!"
}

///////////////////// SPRITES

function updateSprites() {
  user.sprite = (user.speed !== 0) ? sprUserWalking : sprUserStanding;
}

function sprUserStanding() {
  ctx.beginPath();
  ctx.rect(user.x, user.y, user.width, user.height);
  ctx.fillStyle = "black";
  ctx.fill()
  ctx.closePath();
  if (user.facing === -1) {
    ctx.beginPath();
    ctx.rect(user.x, user.y, user.width /4, user.height);
    ctx.fillStyle = "gray";
    ctx.fill()
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.rect(user.x + user.width, user.y, -1 * user.width /4, user.height);
    ctx.fillStyle = "gray";
    ctx.fill()
    ctx.closePath();
  }
}

function sprUserWalking() {

  if (tickCount % 26 === 0) {
    sprUserWalkingFrame = (sprUserWalkingFrame === 1) ? 2 : 1
  }

  if (sprUserWalkingFrame === 1) {
    ctx.beginPath();
    ctx.rect(user.x, user.y, user.width, user.height);
    ctx.fillStyle = "#6a6a6a";
    ctx.fill()
    ctx.closePath();
    if (user.facing === -1) {
      ctx.beginPath();
      ctx.rect(user.x, user.y, user.width /4, user.height);
      ctx.fillStyle = "#353535";
      ctx.fill()
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.rect(user.x + user.width, user.y, -1 * user.width /4, user.height);
      ctx.fillStyle = "#353535";
      ctx.fill()
      ctx.closePath();
    }
  } else {
    ctx.beginPath();
    ctx.rect(user.x, user.y, user.width, user.height);
    ctx.fillStyle = "#353535";
    ctx.fill()
    ctx.closePath();
    if (user.facing === -1) {
      ctx.beginPath();
      ctx.rect(user.x, user.y, user.width /4, user.height);
      ctx.fillStyle = "#6a6a6a";
      ctx.fill()
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.rect(user.x + user.width, user.y, -1 * user.width /4, user.height);
      ctx.fillStyle = "#6a6a6a";
      ctx.fill()
      ctx.closePath();
    }
  }
}

function sprEnemyOne() {
  ctx.beginPath();
  ctx.rect(user.x, user.y, 25, 30);
  ctx.fillStyle = "blue";
  ctx.fill()
  ctx.closePath();
}

function blockPlaceHolder() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = this.color;
  ctx.fill()
  ctx.closePath();
}

///////////////////// AIs
