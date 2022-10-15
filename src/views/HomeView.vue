<template>
  <div>
    <img
      class="absolute top-[2vh] w-[188px] h-[55px] ml-[-94px] left-1/2"
      src="/logo.png"
    />
    <div class="flex justify-center items-center text-center">
      <img
        class="z-[-1] absolute top-0 left-0 h-[100vh] w-[100vw] xl:h-full xl:w-full"
        src="/bg.jpg"
      />
      <img class="w-[14vw] xl:w-[9vw] xl:h-1/4" src="/left.png" />
      <!-- <img
        class="fixed opacity-60 left-[0.62vw] bottom-[50vh] w-[14vw] xl:w-[9vw] xl:left-[31.35vw]"
        src="/top.png"
      />
      <img
        class="fixed opacity-60 left-[0.62vw] bottom-[44.8vh] w-[14vw] xl:w-[9vw] xl:left-[31.35vw] xl:bottom-[33vh]"
        src="/bottom.png"
      /> -->
      <div class="w-auto rotate-45 flex mx-10 xl:mx-24">
        <div v-for="count in 6">
          <div v-for="count2 in 6">
            <div
              v-bind:id="((count - 1) * 6 + count2).toString()"
              @click="clickButton((count - 1) * 6 + count2)"
              v-if="
                (count == 1 && count2 < 3) ||
                (count == 2 && count2 < 4) ||
                (count == 3 && count2 > 1 && count2 < 5) ||
                (count == 4 && count2 > 2 && count2 < 6) ||
                (count == 5 && count2 > 3) ||
                (count == 6 && count2 > 4)
              "
              class="misc h-[8vw] w-[8vw] m-[0.4vw] mx-[0.2vw] xl:h-[52px] xl:w-[52px] xl:m-[5px] xl:mx-[2.5px] border border-border-color bg-cyan-un hover:bg-cyan-hover cursor-pointer"
            ></div>
            <div
              v-bind:id="((count - 1) * 6 + count2).toString()"
              @click="clickButton((count - 1) * 6 + count2)"
              v-else-if="
                (count == 1 && count2 >= 3 && count2 <= 6) ||
                (count == 2 && count2 >= 4) ||
                (count == 3 && count2 >= 5) ||
                (count == 4 && count2 == 6)
              "
              class="drums h-[8vw] w-[8vw] m-[0.4vw] mx-[0.2vw] xl:h-[52px] xl:w-[52px] xl:m-[5px] xl:mx-[2.5px] border border-border-color bg-blue-un hover:bg-blue-hover cursor-pointer"
            ></div>
            <div
              v-bind:id="((count - 1) * 6 + count2).toString()"
              @click="clickButton((count - 1) * 6 + count2)"
              v-else
              class="bass h-[8vw] w-[8vw] m-[0.4vw] mx-[0.2vw] xl:h-[52px] xl:w-[52px] xl:m-[5px] xl:mx-[2.5px] border border-border-color bg-red-un hover:bg-red-hover cursor-pointer"
            ></div>
          </div>
        </div>
      </div>
      <img class="right w-[14vw] xl:w-[9vw]" src="/left.png" />
      <!-- <img
        class="right opacity-60 fixed right-[0.62vw] bottom-[50vh] w-[14vw] xl:w-[9vw] xl:right-[31.35vw]"
        src="/top.png"
      />
      <img
        class="right opacity-60 fixed right-[0.62vw] bottom-[44.8vh] w-[14vw] xl:w-[9vw] xl:right-[31.35vw] xl:bottom-[33vh]"
        src="/bottom.png"
      /> -->
    </div>
    <a
      href="https://github.com/NEPHERAovo"
      class="fixed bottom-[6px] left-1/2 ml-[-40px] cursor-pointer hover:text-[#F8E9DB] text-footer-color font-mono text-lg tracking-wider"
      >NEPHERA</a
    >
  </div>
</template>

<script setup lang="ts">
const active: Array<number> = Array(36).fill(0);
const audios: any = [];
for (let i = 1; i <= 36; i++) {
  let temp = new Audio(`/sound/${i}.ogg`);
  // temp.loop = true;
  audios.push(temp);
}

let needToPlay: Array<number> = [];
let playing: Array<number> = [];
// setInterval(() => {
//   if (needToPlay.length > 0) {
//     let temp = needToPlay[0];
//     needToPlay.shift();
//     audios[temp].play();
//     console.log(audios[temp].duration);
//   }
// }, 4363.628);
var interval = 4363.6; // ms
var expected = Date.now() + interval;
setTimeout(step, interval);
function step() {
  var dt = Date.now() - expected; // the drift (positive for overshooting)
  if (playing.length > 0) {
    for (let i of playing) {
      audios[i].currentTime = 0;
      audios[i].play();
    }
  }
  while (needToPlay.length > 0) {
    let temp = needToPlay[0] + 1;
    let button: HTMLElement | null = document.getElementById(temp.toString());
    if (button) {
      if (button.classList.contains("misc")) {
        button.classList.remove("blinking-green");
        button.classList.add("bg-cyan-active");
      } else if (button.classList.contains("drums")) {
        button.classList.remove("blinking-blue");
        button.classList.add("bg-blue-active");
      } else {
        button.classList.remove("blinking-red");
        button.classList.add("bg-red-active");
      }
    }
    audios[needToPlay[0]].play();
    playing.push(needToPlay[0]);
    needToPlay.shift();
  }
  expected += interval;
  setTimeout(step, Math.max(0, interval - dt)); // take into account drift
}
const clickButton = (id: number) => {
  let button: HTMLElement | null = document.getElementById(id.toString());
  id = id - 1;
  if (button) {
    if (active[id] === 0) {
      needToPlay.push(id);
      active[id] = 1;
      if (button.classList.contains("misc")) {
        button.classList.add("blinking-green");
      } else if (button.classList.contains("drums")) {
        button.classList.add("blinking-blue");
      } else {
        button.classList.add("blinking-red");
      }
    } else {
      active[id] = 0;
      audios[id].pause();
      audios[id].currentTime = 0;
      playing = playing.filter((item) => {
        return item != id;
      });
      if (button.classList.contains("misc")) {
        button.classList.remove("blinking-green");
        button.classList.remove("bg-cyan-active");
      } else if (button.classList.contains("drums")) {
        button.classList.remove("blinking-blue");
        button.classList.remove("bg-blue-active");
      } else if (button.classList.contains("bass")) {
        button.classList.remove("blinking-red");
        button.classList.remove("bg-red-active");
      }
    }
  }
};
</script>

<style scoped>
.right {
  transform: rotateY(180deg);
}

.blinking-green {
  animation: 400ms blink-green infinite;
}

@keyframes blink-green {
  0% {
    background-color: rgba(33, 208, 168, 0.37);
  }

  50% {
    background-color: rgba(10, 253, 204, 0.64);
  }
}

.blinking-blue {
  animation: 400ms blink-blue infinite;
}

@keyframes blink-blue {
  0% {
    background-color: rgba(56, 75, 107, 0.32);
  }

  50% {
    background-color: rgba(44, 100, 196, 0.64);
  }
}

.blinking-red {
  animation: 400ms blink-red infinite;
}

@keyframes blink-red {
  0% {
    background-color: rgba(175, 46, 80, 0.47);
  }

  50% {
    background-color: rgba(212, 33, 79, 0.64);
  }
}
</style>
