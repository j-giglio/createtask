///////////////////// LEVELS

let levels = [
//level one
  {
    startX: 30,
    startY: 410,
    blocks: [
      {
        x: 0,
        y: 470,
        width: 800,
        height: 30,
        color: "green",
      },
      {
        x: 350,
        y: 400,
        width: 50,
        height: 70,
        color: "brown",
      },
    ],
    enemies: [
      {
        x: 450,
        y: 300,
        type: 1/*enemy1*/,

      },
    ],
  },
//level two
]

///////////////////// OBJECTS

let user = {
  x: null,
  y: null,
  width: 25,
  height: 60,
  walkLeft: false,
  walkRight: false,
  // touchLeft: false,
  // touchRight: false,
  // touchUp: false,
  // touchDown: false,
  isJumping: false,
  isCrouching: false,
  speed: 3,
  canFall: false,
  jump: function() {
    user.canFall = true;
  },
  sprite: null,
};

// let enemy1 = {
//   sprite:
// };

///////////////////// VARIABLES

let currentLevel = 0;
let mobile = [user];
let onScreenThings = [];
let tickCount = 0;
let sprUserWalkingFrame = 1;


///////////////////// ELEMENTS

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

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
    setInterval(perTick, 1)
  };
};

function perTick() {
  tickCount++;
  getMobile();
  getOnScreenThings();
  mobile.forEach((d) => {
    collision(d);
  });
  move();
  gravity();
  //  these are rendering functions
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  user.sprite;
  drawBlocks();
  updateSprites();
};

function drawBlocks() {
  levels[currentLevel].blocks.forEach((block) => {
    if (block.x <= canvas.width) {
      ctx.beginPath();
      ctx.rect(block.x, block.y, block.width, block.height);
      ctx.fillStyle = block.color;
      ctx.fill()
      ctx.closePath();
    }
  });
}

function collision(e) {
  onScreenThings.forEach((thing) => {
    if (e.x < thing.x + thing.width &&
        e.x + e.width > thing.x &&
        e.y < e.y + thing.height && ///https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection November 4 2019
        e.y + e.height > thing.y) {
      if (levels[currentLevel].blocks.includes(thing)) {
        e.walkRight = false;
      }
      if (levels[currentLevel].enemies.includes(thing)) {
        userDeath()
      }
    }
  });
}

function gravity() {

};

function userDeath() {
  console.log("dead");
}

function move() {
  mobile.forEach((c) => {
    if (c.walkLeft) {
      if (c === user && c.x === 30) {
        levels[currentLevel].blocks.forEach((block) => {
          block.x += user.speed;
        });
        levels[currentLevel].enemies.forEach((enemy) => {
          enemy.x += user.speed;
        });
      } else {
        c.x -= c.speed;
      }
    };

    if (c.walkRight) {
      if (c === user && c.x + c.width === canvas.width / 2) {
        levels[currentLevel].blocks.forEach((block) => {
          block.x -= user.speed;
        });
        levels[currentLevel].enemies.forEach((enemy) => {
          enemy.x -= user.speed;
        });
      } else {
        c.x += c.speed;
      }
    };

    // if (c.walkLeft) {
    //   c.x -= c.speed;
    // };
    //
    // if (c.walkRight) {
    //   c.x += c.speed;
    // };

    ////just for debugging
    if (c.isJumping) {
      c.y -= c.speed;
    };

    if (c.isCrouching) {
      c.y += c.speed;
    };


  });
};

function getMobile() {
  mobile = [user];
  levels[currentLevel].enemies.forEach((enemy) => {
    if (enemy.x + enemy.width > 0 && enemy.x < 801 && (enemy.walkLeft || enemy.walkRight)) {
      mobile.push(enemy);
    }
  });
};

function getOnScreenThings() {
  // mobile.forEach((thing) => {
  //   onScreenThings.push(thing)
  // });
  onScreenThings = mobile.concat();
    levels[currentLevel].blocks.forEach((block) => {
    if (block.x + block.width > 0 && block.x < 801) {
      onScreenThings.push(block);
    }
  });
}

function keyDown(a) {
  if (a.key === "ArrowRight"){
    user.walkLeft = false;
    user.walkRight = true;
  };

  if (a.key === "ArrowLeft"){
    user.walkRight = false;
    user.walkLeft = true;
  };

  if (a.key === "ArrowUp"){
    user.isJumping = true;
  };

  if (a.key === "ArrowDown"){
    user.isCrouching = true;
  };
};

function keyUp(b) {
  if (b.key === "ArrowRight"){
    user.walkRight = false;
  };

  if (b.key === "ArrowLeft"){
    user.walkLeft = false;
  };

  if (b.key === "ArrowUp"){
    user.isJumping = false;
  };

  if (b.key === "ArrowDown"){
    user.isCrouching = false;
  };
}

///////////////////// SPRITES

function updateSprites() {
  user.sprite = (user.walkLeft || user.walkRight) ? sprUserWalking() : sprUserStanding();
  // enemies.forEach((thing) => {
  //
  // });
  //
}

function sprUserStanding() {
  ctx.beginPath();
  ctx.rect(user.x, user.y, 25, 60);
  ctx.fillStyle = "black";
  ctx.fill()
  ctx.closePath();
}

function sprUserWalking() {

  if (tickCount % 200 === 0) {
    sprUserWalkingFrame = (sprUserWalkingFrame === 1) ? 2 : 1
  }

  // console.log(which);
  if (sprUserWalkingFrame === 1) {
    ctx.beginPath();
    ctx.rect(user.x, user.y, user.width, user.height);
    ctx.fillStyle = "red";
    ctx.fill()
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.rect(user.x, user.y, 25, 60);
    ctx.fillStyle = "blue";
    ctx.fill()
    ctx.closePath();
  }
}

function sprEnemyOne() {
  ctx.beginPath();
  ctx.rect(user.x, user.y, 25, 30);
  ctx.fillStyle = "blue";
  ctx.fill()
  ctx.closePath();
}
///////////////////// AIs
