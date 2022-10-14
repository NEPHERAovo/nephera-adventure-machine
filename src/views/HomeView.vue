<template>
    <div>
        <img class="absolute top-[40px] w-[188px] h-[55px] ml-[-94px] left-1/2" src="/public/logo.png" />
        <div class="flex justify-center items-center text-center">
            <img class="z-[-1] absolute top-0 left-0 h-full w-full" src="/public/bg.jpg" />
            <img class="w-1/5 h-1/4" src="/public/left.png" />
            <div class="w-auto rotate-45 flex mx-24">
                <div v-for="count in 6">
                    <div v-for="count2 in 6">
                        <div v-bind:id="(count-1)*6+count2" @click="clickButton((count-1)*6+count2)" v-if="(count==1 && count2<3) || (count==2 && count2<4) || (count==3 && count2>1 && count2<5)
                        || (count==4 && count2>2 && count2<6) || (count==5 && count2>3) || (count==6 && count2>4) "
                            class="misc h-[3.25rem] w-[3.25rem] m-[0.3rem] mx-[0.15rem] border border-border-color bg-cyan-un hover:bg-cyan-hover cursor-pointer">
                        </div>
                        <div v-bind:id="(count-1)*6+count2" @click="clickButton((count-1)*6+count2)" v-else-if="(count==1 && count2>=3 && count2<=6) || (count==2 && count2>=4) || (count==3 && count2>=5)
                        || (count==4 && count2==6)"
                            class="drums h-[3.25rem] w-[3.25rem] m-[0.3rem] mx-[0.15rem] border border-border-color bg-blue-un hover:bg-blue-hover cursor-pointer">
                        </div>
                        <div v-bind:id="(count-1)*6+count2" @click="clickButton((count-1)*6+count2)" v-else
                            class="bass h-[3.25rem] w-[3.25rem] m-[0.3rem] mx-[0.15rem] border border-border-color bg-red-un hover:bg-red-hover cursor-pointer">
                        </div>
                    </div>
                </div>
            </div>
            <img id="right" class="w-1/5 h-1/4" src="/public/left.png" />
        </div>
        <a href="https://github.com/NEPHERAovo"
            class="fixed bottom-[6px] left-1/2 ml-[-40px] cursor-pointer hover:text-[#F8E9DB] text-footer-color font-mono text-lg tracking-wider">NEPHERA</a>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
const active = Array(36).fill(0);
const audios = []
for (let i = 1; i <= 36; i++) {
    let temp = new Audio(`/sound/${i}.ogg`);
    temp.loop = true;
    audios.push(temp);
}
const clickButton = (id) => {
    let button = document.getElementById(id);
    id = id - 1;
    if (active[id] === 0) {
        audios[id].play();
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
        if (button.classList.contains("misc")) {
            button.classList.remove("blinking-green");
        } else if (button.classList.contains("drums")) {
            button.classList.remove("blinking-blue");
        } else {
            button.classList.remove("blinking-red");
        }
    }

}
</script>

<style scoped>
#right {
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