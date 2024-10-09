<template>
  <div class="wrapper">
    <div class="monkey alternate">
      <div class="swing-wrapper">
        <div class="body">
          <div class="head">
            <div class="face"></div>
          </div>
          <div class="shoulder">
            <div class="joint left">
              <div class="arm">
                <div class="joint"></div>
                <div class="joint elbow">
                  <div class="arm"></div>
                </div>
              </div>
            </div>
            <div class="joint right">
              <div class="arm">
                <div class="joint"></div>
                <div class="joint elbow">
                  <div class="arm"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="waist">
            <div class="joint">
              <div class="thigh">
                <div class="joint knee">
                  <div class="leg"></div>
                </div>
              </div>
            </div>
            <div class="tail-joint">
              <div class="tail">
                <div class="joint">
                  <div class="tail">
                    <div class="joint">
                      <div class="tail">
                        <div class="joint">
                          <div class="tail"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="joint right-leg">
              <div class="thigh">
                <div class="joint knee">
                  <div class="leg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';

export default {
  setup() {
    const handles = ref([]);
    const handlePositions = ref([]);
    const index = ref(0);
    const nearestIndex = ref(0);
    const monkey = ref({ x: 44, y: 0, alternate: false });
    const isReverse = ref(false);
    const isAlternate = ref(false);

    const monkeyStyle = computed(() => {
      return {
        transform: `translate(${monkey.value.x}px, ${monkey.value.y}px) rotate(0deg)`,
        '--jump-height': (monkey.value.y > 80 ? `${monkey.value.y - 10}px` : '-50px')
      };
    });

    const createHandles = () => {
      const handleData = [
        [300, 5], [150, 3], [150, 4], [150, 2],
        [150, 4], [100, 2], [100, 5], [150, 2],
        [150, 4], [150, 3], [100, 2], [100, 5]
      ];

      let totalHeight = 0;
      handleData.forEach(([y, n]) => {
        totalHeight += n * 20; // 每个 handle 高度
        handles.value.push({ y: totalHeight });
      });
    };

    const getHandlePos = () => {
      return handles.value.map(handle => {
        const { x, y } = handle.getBoundingClientRect();
        return { x: x + window.scrollX, y: y + window.scrollY };
      });
    };

    const monkeyJump = ({ x, y }) => {
      isReverse.value = monkey.value.x > x;
      isAlternate.value = !isAlternate.value;
      monkey.value.x = x;
      monkey.value.y = y;

      nextTick(() => {
        const monkeyEl = document.querySelector('.monkey');
        monkeyEl.classList.add('jump');
        setTimeout(() => {
          monkeyEl.classList.remove('jump');
        }, 500);
      });
    };

    const getNearestHandleIndex = () => {
      const y = Math.round(window.scrollY + (window.innerHeight / 2));
      nearestIndex.value = handlePositions.value.reduce((nearest, handle, i) => {
        const diff = Math.abs(handle.y - y);
        return diff < Math.abs(handlePositions.value[nearest].y - y) ? i : nearest;
      }, 0);
    };

    const jumpToNearestHandle = () => {
      if (index.value === nearestIndex.value) return;

      const { x, y } = handlePositions.value[index.value];
      monkeyJump({ x: x + 5, y: y + 5 });

      if (index.value > nearestIndex.value && index.value >= 0) {
        index.value--;
      } else if (index.value < nearestIndex.value && index.value < handles.value.length - 1) {
        index.value++;
      }
    };

    onMounted(() => {
      createHandles();
      handlePositions.value = getHandlePos();

      window.addEventListener('resize', () => {
        handlePositions.value = getHandlePos();
        const { x, y } = handlePositions.value[index.value];
        monkeyJump({ x, y });
      });

      setInterval(() => {
        getNearestHandleIndex();
        jumpToNearestHandle();
      }, 700);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', () => {});
    });

    return {
      handles,
      monkeyStyle,
      isReverse,
      isAlternate,
    };
  },
};

</script>

<style>
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
  background-color: #024f32;
  color: white;
}

.monkey {
  position: absolute;
  transition: 0.7s;
  width: 10px;
  height: 10px;
  transform: translateX(44px);
  --m: 1;
  --left-shoulder-angle: 40deg;
  --right-shoulder-angle: -170deg;
  --left-shoulder-pos: 0px;
  --right-shoulder-pos: calc(var(--m) * 30px);
  --left-elbow-angle: -50deg;
  --right-elbow-angle: -20deg;
  --waist-joint-angle: -45deg;
  --tail-angle: 12deg;
  --tail-base-angle: 40deg;
  --jump-height: 50px
}

.monkey.reverse:not(.alternate) {
  --left-shoulder-angle: 10deg;
  --right-shoulder-angle: 140deg;
  --left-elbow-angle: 50deg;
  --right-elbow-angle: 30deg;
  --waist-joint-angle: 45deg;
  --tail-angle: -12deg;
  --tail-base-angle: -40deg;
}

.monkey.alternate {
  --left-shoulder-angle: -140deg;
  --right-shoulder-angle: -20deg;
  --left-elbow-angle: -30deg;
  --right-elbow-angle: -20deg;
}

.monkey.alternate.reverse {
  --left-shoulder-angle: 170deg;
  --right-shoulder-angle: -40deg;
  --left-elbow-angle: 20deg;
  --right-elbow-angle: 50deg;
  --waist-joint-angle: 45deg;
  --tail-angle: -12deg;
  --tail-base-angle: -40deg;
}

.swing-wrapper {
  width: 10px;
  height: 10px;
  animation: swing ease-in-out infinite 3s;
}

@keyframes swing {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

.monkey * {
  position: absolute;
  transition: 0.7s;
  background-size: calc(var(--w) * var(--m)) calc(var(--h) * var(--m)) !important; 
  width: calc(var(--w) * var(--m));
  height: calc(var(--h) * var(--m));
  background-repeat: no-repeat !important;
  image-rendering: pixelated;
}

.left {
  rotate: var(--left-shoulder-angle);
  translate: var(--left-shoulder-pos) 0;
  z-index: 5;
}

.reverse .left {
  z-index: -5;
}

.reverse .right {
  z-index: 5;
}

.right {
  rotate: var(--right-shoulder-angle);
  translate: var(--right-shoulder-pos) 0;
  z-index: -5;
}

.elbow {
  bottom: 0;
}

.left .elbow {
  rotate: var(--left-elbow-angle);
}

.right .elbow {
  rotate: var(--right-elbow-angle);
}

.waist > .joint {
  rotate: var(--waist-joint-angle);
}

.knee {
  bottom: 0;
  rotate: calc(var(--waist-joint-angle) * -2);
}

.body {
  --w: 30px;
  --h: 30px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAIZJREFUSEtjZEADG1rN/qOLUYMfUH2KEdkcOIdWFqI7GuYAsMX0shTmCJDlA2cxvX0L8zXjqMXUyDrEmDEa1MSEElXUjAY1VYKRGENGg5qYUKKKmtGgpkowEmPICAzqkdfmGlAf09NylHb1gFpMD8uRuzEo/RlaWo6z74Rc2lC7rY1uKcguAOOsW5NYqXbPAAAAAElFTkSuQmCC);
}

.head {
  top: calc(var(--m) * -10px);
  left: calc(var(--m) * 4px);
  --w: 22px;
  --h: 22px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAGtJREFUSEtjZMACNrSa/ccmjkssoPoUI7ocigCpBqIbhmwB3GBKDYVZAjMcbDC1DEU2nJHahsIMHzUYnlBGg2I0KDCLpyGYKmhWCNHUYGoajlIew+KU0iIUaw2CnGBItYBgnUeO4dgMBZkDAArwRQ8BLYjYAAAAAElFTkSuQmCC);
  z-index: 1;
}

.face {
  top: calc(var(--m) * 5px);
  left: calc(var(--m) * 4px);
  --w: 18px;
  --h: 14px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAAAXNSR0IArs4c6QAAAHVJREFUOE+1k9sOwCAIQ9f//2gWiBCCuO7ifMKIB2gKjnRERPKdxQDgORY8BdQCCsRXSHT0C0hHvitTzY3Rkm4U1uXuB6loW0ZjnmHvSx913a06Nh95pc4GWdRh3KkxZ1yC2DhDV2ME6M2qTLtWKzO3Z4D/PQHES1jzyue2wwAAAABJRU5ErkJggg==);
}

.reverse .face {
  left: 0;
}

.shoulder {
  width: calc(100% + (calc(var(--m) * 10px)));
  top: 0;
  left: calc(var(--m) * -5px);
  height: calc(var(--m) * 10px);
}

.waist {
  height: calc(var(--m) * 10px);
  bottom: 0;
  width: 100%;
}

.right-leg {
  right: 0;
}

.thigh,
.leg {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAYAAAC07qxWAAAAAXNSR0IArs4c6QAAADhJREFUOE9jZICCDa1m/2FsZDqg+hQjiA8mcCmCaQApZiSkCKZ4VCG28IaLjQYPlYKH6IRLbFYAAGcMNrX4mA6GAAAAAElFTkSuQmCC);
  --w: 10px;
  --h: 20px;
}

.joint {
  width: calc(var(--m) * 10px);
  height: calc(var(--m) * 10px);
}

.arm {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAZCAYAAAAIcL+IAAAAAXNSR0IArs4c6QAAADpJREFUOE9jZICCDa1m/2FsZDqg+hQjiA8mcCmCaQApZiSkCKZ4VCG28IaLjQbPaPBghADxuZDYfA0AXddCzD8VHloAAAAASUVORK5CYII=);
  --w: 10px;
  --h: 25px;
}

.monkey.jump .body {
  animation: jump-up forwards 0.35s;
}

@keyframes jump-up {
  0%, 100% {
    translate: 0;
  }
  70% {
    translate: 0 calc(var(--m) * var(--jump-height));
  }
}

.monkey .body {
  top: calc(var(--m) * 30px);
  left: calc(var(--m) * -28px);
}

.monkey.alternate .body {
  top: calc(var(--m) * 28px);
  left: calc(var(--m) * -10px);
}

.monkey.reverse .body {
  top: calc(var(--m) * 28px);
  left: calc(var(--m) * -15px);
}

.monkey.reverse.alternate .body {
  top: calc(var(--m) * 30px);
  left: calc(var(--m) * 0px);
}

.outer-handle-wrapper {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  max-width: 1000px;
  left: 50%;
  transform: translateX(-50%);
}

.outer-handle-wrapper:last-of-type {
  padding-bottom: 440px;
}

.tail-joint {
  width: calc(4px * var(--m));
  height: calc(4px * var(--m));
  bottom: 0;
  left: 2px;
  transform: rotate(var(--tail-base-angle));
}

.tail-joint .joint {
  width: calc(4px * var(--m));
  height: calc(4px * var(--m));
  bottom: 0;
  transform: rotate(var(--tail-angle));
}

.reverse .tail-joint {
  left: calc(28px * var(--m));
}

.tail {
  width: calc(4px * var(--m));
  height: calc(12px * var(--m));
  background-color: #b08536;
}

.outer-handle-wrapper:nth-child(odd) {
  flex-direction: row-reverse;
} 

.handle-wrapper {
  width: 20px;
  height: 100%;
}

.handle-wrapper:nth-child(2) {
  padding-top: 20px;
}

.handle-wrapper:nth-child(3) {
  padding-top: 40px;
}

.handle-wrapper:nth-child(4) {
  padding-top: 60px;
}

.handle-wrapper:nth-child(5) {
  padding-top: 80px;
}

.handle {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAADpJREFUKFNjZEACnPqK/5H53y/eZ4Tx4Qx0RTAFMMVghbgUIStmJKQIbvUAKiTaMzDHEhU8uBQjBzgAXjoda3RhMkUAAAAASUVORK5CYII=);
  width: 20px;
  height: 20px;
  background-size: 20px;
  background-repeat: no-repeat !important;
  image-rendering: pixelated;
}

.text-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  margin: 80px auto 0;
}

p {
  text-align: center;
  color: #b08536;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.3rem;
}

small {
  font-size: 0.95rem;
}

.sign {
  position: fixed;
  font-family: Arial, Helvetica, sans-serif;
  color: #b08536;
  bottom: 10px;
  right: 10px;
  font-size: 0.6rem;
  text-transform: none;
}

a {
  color: #b08536;
  text-decoration: none;
  text-transform: none;
}

a:hover { text-decoration: underline; }
</style>
