///////////////////// LEVELS

let levels = [
//level one
  {
    startX: 124,
    startY: 408,
    blocks: [
      {
        x: 100,
        y: 470,
        startX: 0,
        startY: 470,
        width: 300,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      // {
      //   x: -400,
      //   y: 0,
      //   startX: -400,
      //   startY: 0,
      //   width: 1800,
      //   height: 66,
      //   color: "black",
      //   sprite: blockPlaceHolder,
      //   onCollision: normalBlock,
      // },
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
        y: 290,
        startX: 1320,
        startY: 235,
        width: 50,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 1620,
        y: 290,
        startX: 1320,
        startY: 235,
        width: 50,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 1820,
        y: 290,
        startX: 1320,
        startY: 235,
        width: 50,
        height: 50,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },


      {
        x: 2070,
        y: 235,
        startX: 1320,
        startY: 235,
        width: 300,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 2520,
        y: 435,
        startX: 1720,
        startY: 435,
        width: 50,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: teleporter,
        deltaX: -1500,
        deltaY: -300,
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
  speedCounter: 0,
  isJumping: false,
  ySpeed: 0,
  jumpSpeed: 20,
  jumpStart: null,
  jumpHeight: 166,
  hangTime: 10,
  hangCounter: 0,
  offGround: false,
  isCrouching: false,
  sprite: null,
};

///////////////////// ELEMENTS

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

///////////////////// VARIABLES

let currentLevel = 0;
let mobile = [user];
let onScreenThings = [];
let tickCount = 0;
let gforce = 8;
let leftScrollMargin = 120;
let rightScrollMargin = 284;
let topScrollMargin = 100;
let bottomScrollMargin = 420 - user.height;

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
    window.requestAnimationFrame(perTick);
  };
};

function perTick() {
  tickCount = (tickCount >= 100000000) ? 0 : tickCount + 1;
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
    window.requestAnimationFrame(perTick);
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
  // if (user.y >= bottomScrollMargin || user.y <= topScrollMargin) {
  //   let add = (user.ySpeed === 0 && user.y >= bottomScrollMargin) ? -user.speedCap : (user.ySpeed === 0 && user.y <= topScrollMargin) ? user.speedCap : -user.ySpeed;
  //   user.y += add;
  //   levels[currentLevel].blocks.forEach((block) => {
  //     block.y += add;
  //   });
  // }
}

function loadEntities() {
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
}

function move() {
  mobile.forEach((c) => {
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
  console.log("dead");
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
        user.speed = user.speedCap
        user.facing = 1;
        break;

      case "KeyA":
        user.speed = -user.speedCap;
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
          user.ySpeed = user.jumpSpeed;
          user.hangCounter = 0;
        };
        break;
      case "KeyP":
        canvas.className = (canvas.className === "active") ? "inactive" : "active";
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

///////////////////// AIs
