const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const windowWidth = window.innerWidth;
const frameCount = 540;
let screen = "lg_c";
let extension = "jpg";
if (windowWidth < 576) {
  screen = "sm_c"; // Extra Small
} else if (windowWidth < 769) {
  screen = "md_c"; // Small
} else if (windowWidth < 992) {
  screen = "lg_c"; // Medium
} else if (windowWidth < 1200) {
  screen = "xl_c"; // Large
} else if (windowWidth < 1400) {
  screen = "xxl_c"; // Extra Large
} else {
  screen = "xxxl"; // Larger than 1400 pixels
  extension="png"
}

console.log("Screen size: " + screen);
const currentFrame = index => (
  `v2/${screen}/RG%20(${index}).${extension}`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

var start_wwd_amin = document.getElementById('start_wwd_amin'); 

window.addEventListener('scroll', () => {  
  var scrollHeight = start_wwd_amin.scrollHeight;

  const scrollTop = html.scrollTop;
  const maxScrollTop =scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  // console.log("scrollTop:",scrollTop);
  // console.log("html.scrollHeight:",html.scrollHeight);
  console.log("maxScrollTop:",scrollHeight);
  // console.log("maxScrollTop:",maxScrollTop);
  // console.log("frameIndex:",frameIndex);
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()