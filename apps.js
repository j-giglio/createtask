///////////////////// LEVELS

let levels = [
//level one
  {
    startX: 124,
    startY: 408,
    blocks: [
      {
        x: 0,
        y: 470,
        startX: 0,
        startY: 470,
        width: 800,
        height: 30,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      // {
      //   x: 0,
      //   y: 265,
      //   startX: 0,
      //   startY: 265,
      //   width: 800,
      //   height: 30,
      //   color: "blue",
      //   sprite: blockPlaceHolder,
      //   onCollision: normalBlock,
      // },
      // {
      //   x: 351,
      //   y: 400,
      //   startX: 351,
      //   startY: 400,
      //   width: 50,
      //   height: 70,
      //   color: "brown",
      //   sprite: blockPlaceHolder,
      //   onCollision: normalBlock,
      // },
      {
        x: -400,
        y: 0,
        startX: -400,
        startY: 0,
        width: 1800,
        height: 66,
        color: "black",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 950,
        y: 400,
        startX: 950,
        startY: 400,
        width: 300,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 1370,
        y: 290,
        startX: 1370,
        startY: 290,
        width: 300,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 1720,
        y: 235,
        startX: 1720,
        startY: 235,
        width: 300,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 2120,
        y: 435,
        startX: 2120,
        startY: 435,
        width: 46,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: teleporter,
        deltaX: -1850,
        deltaY: -300,
      },
    ],
    enemies: [
      {
        x: 450,
        y: 300,
        type: 1/*enemy1*/,

      },
    ],
    // pickups: [];
    projectiles: [

    ]
  },
//level two
]

///////////////////// OBJECTS

let user = {
  x: null,
  y: null,
  width: 28,
  height: 62,
  facing: 1,
  walking: 0, /// 0 is still, 1 is left, 2 is right.
  speed: 0,
  speedCap: 2,
  speedCounter: 0,
  accelRate: 50,
  isJumping: false,
  jumpSpeed: 6,
  baseJumpSpeed: 6,
  jumpStart: null,
  jumpHeight: 166,
  hangTime: 25,
  hangCounter: 0,
  offGround: false,
  isCrouching: false,
  sprite: null,
};

let userPellet = {
  x: null,
  y: null,
  width: 12,
  height: 2,
  speed: 4,
  sprite: bluePellet,
  onCollision: normalBlock
};

///////////////////// ELEMENTS

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

///////////////////// VARIABLES

let currentLevel = 0;
let mobile = [user];
let onScreenThings = [];
let tickCount = 0;
let gforce = 2;
let leftScrollMargin = 120;
let rightScrollMargin = 284;

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
    setInterval(perTick, 1);
  };
};

function perTick() {
  tickCount = (tickCount >= 100000000) ? 0 : tickCount + 1;
  resetAttributes();
  adjustCamera();
  loadEntities();
  if (user.speedCounter > 0) {
    user.speedCounter++
  }
  move();
  mobile.forEach((d) => {
    collision(d);
  });
  gravity();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateSprites();
  drawThings();
    // if (tickCount % 100 === 0 && tickCount <= 5000) {
      // console.log(user.speed);
    // }
};

function resetAttributes() {
  mobile.forEach((c) => {
    c.offGround = /*(e.y + e.height >= this.y && e.y + e.height <= this.y + e.speed && e.x)*/ true
  });
}

function adjustCamera() {
  if (user.x >= rightScrollMargin || user.x <= leftScrollMargin) {
    add = (user.speed === 0 && user.x >= rightScrollMargin) ? -2 : (user.speed === 0 && user.x <= leftScrollMargin) ? 2 : 0 - user.speed;
    user.x += add;
    levels[currentLevel].blocks.forEach((block) => {
      block.x += add;
    });
  }
}

function loadEntities() {
  mobile = (user.x + user.width > 0 && user.x <= canvas.width) ? [user] : [];
  levels[currentLevel].enemies.forEach((enemy) => {
    if (enemy.x + enemy.width > 0 && enemy.x <= canvas.width) {
      mobile.push(enemy);
    }
  });
  levels[currentLevel].projectiles.forEach((projectile) => {
    // if (projectile.x + projectile.width > 0 && projectile.x <= projectile.width) {
      mobile.push(projectile);
    // }
  });

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
        e.x + e.width > thing.x &&               ///
        e.y < thing.y + thing.height &&          ///https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection November 4 2019
        e.y + e.height > thing.y - 1 &&          /// -1 added to fix a gravity/collision detection bug
        thing != user) {
      thing.onCollision(e);
    }
  });
}

function move() {
  mobile.forEach((c) => {
    // if (user.speedCounter > 0 && user.speedCounter % user.accelRate === 0 && user.speed <= user.speedCap) {
    //   user.speed++
    // }
    c.x += c.speed;

    if (c.isJumping) {
      // if (c.y - c.jumpHeight === c.jumpHeight * .85) {
      //   c.jumpSpeed /= 2
      // }
      c.y -= c.jumpSpeed
      if (c.jumpSpeed === 0) {
        c.hangCounter++
      }

      if (c.hangTime === c.hangCounter) {
        c.isJumping = false;
        c.hangCounter === 0;
      }

      if (c.y <= c.jumpStart - c.jumpHeight) {
        c.jumpSpeed = 0;
      }
    };

    ////just for debugging

    // if (c.isCrouching) {
    //   c.y += c.;
    // };
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
  console.log("dead");
}

function drawThings() {
  onScreenThings.forEach((thing) => {
    thing.sprite()
  });

}

function keyDown(a) {
  console.log(a);
  if (canvas.className === "active") {
    switch (a.code) {
      case "KeyD":
        // if (user.speedCounter === 1) {
        //   user.speedCounter =
        // }
        user.speed = 2
        user.facing = 1;
        break;

      case "KeyA":
        user.speed = -2;
        user.facing = -1;
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
          user.jumpSpeed = user.baseJumpSpeed;
          user.hangCounter = 0;
        };
        break;

      case "Comma":
        let pell = Object.create(userPellet);
        pell.x = user.x + user.width + 2
        pell.y = user.y + 10;
        pell.speed *= user.facing;
        levels[currentLevel].projectiles.push(pell)
        break;
    }
  }
};

function keyUp(b) {
  switch (b.code) {
    case "KeyD":
      user.speed = 0;
      user.speedCounter = 1;
      break;
    case "KeyA":
        user.speed = 0;
      break;
    case "KeyW":
      break;
    case "KeyS":
      user.isCrouching = false;
      break;
    case "Space":
      user.jumpSpeed = 0;
      break;
  }
}

///////////////////// COLLISION

function normalBlock(e) {
  /////// underneath /this/
  if (e.y <= this.y + this.height && e.y >= this.y + this.height - e.jumpSpeed) {
    e.isJumping = false;
    e.y -= this.y + this.height + 3;
  } else if (e.y + e.height >= this.y && e.y + e.height <= this.y + gforce) { /////// above /this/
    // console.log(user.isCrouching);
    // user.isCrouching = false;
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
  if (e.y <= this.y + this.height && e.y >= this.y + this.height - e.jumpSpeed) {
    e.isJumping = false;
    e.y = this.y + this.height + 1;
  } else if (e.y + e.height >= this.y && e.y + e.height <= this.y + gforce) { /////// above /this/
      e.x += this.deltaX
      e.y += this.deltaY
  } else /* if (!user.isJumping && user.speed === 0)*/ {
    e.x -= e.speed;
  }
}

///////////////////// SPRITES

function updateSprites() {
  user.sprite = (user.speed !== 0) ? sprUserWalking : sprUserStanding;
  // enemies.forEach((thing) => {
  //
  // });
  //
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

  if (tickCount % 200 === 0) {
    sprUserWalkingFrame = (sprUserWalkingFrame === 1) ? 2 : 1
  }

  if (sprUserWalkingFrame === 1) {
    ctx.beginPath();
    ctx.rect(user.x, user.y, user.width, user.height);
    ctx.fillStyle = "red";
    ctx.fill()
    ctx.closePath();
    if (user.facing === -1) {
      ctx.beginPath();
      ctx.rect(user.x, user.y, user.width /4, user.height);
      ctx.fillStyle = "blue";
      ctx.fill()
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.rect(user.x + user.width, user.y, -1 * user.width /4, user.height);
      ctx.fillStyle = "blue";
      ctx.fill()
      ctx.closePath();
    }
  } else {
    ctx.beginPath();
    ctx.rect(user.x, user.y, user.width, user.height);
    ctx.fillStyle = "blue";
    ctx.fill()
    ctx.closePath();
    if (user.facing -1) {
      ctx.beginPath();
      ctx.rect(user.x, user.y, user.width /4, user.height);
      ctx.fillStyle = "red";
      ctx.fill()
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.rect(user.x + user.width, user.y, -1 * user.width /4, user.height);
      ctx.fillStyle = "red";
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

function bluePellet() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, 6, 2);
  ctx.fillStyle = "blue";
  ctx.fill()
  ctx.closePath();
}

///////////////////// AIs
