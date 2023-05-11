function riveAnimEmoji(canvas, eyebrows, mouth, color, neutral, happy, angry) {
    const EmojiRive = new rive.Rive({
      src: './images/emoji.riv',
      canvas: canvas,
      autoplay: true,
      stateMachines: 'emoji-states',
      artboard: 'emoji',
      fit: rive.Fit.cover,
      onLoad: (_) => {
        EmojiRive.resizeDrawingSurfaceToCanvas();

        const inputs = EmojiRive.stateMachineInputs("emoji-states");

        const defaultEyebrowsInput = inputs.find((i) => i.name === "DEFAULT-eyebrows");
        const defaultMouthInput = inputs.find((i) => i.name === "DEFAULT-mouth");
        const happyMouthInput = inputs.find((i) => i.name === "HAPPY-mouth");
        const angryMouthInput = inputs.find((i) => i.name === "ANGRY-mouth");
        const angryEyebrowsInput = inputs.find((i) => i.name === "ANGRY-eyebrows");
        const angryColorInput = inputs.find((i) => i.name === "ANGRY-color");

        const defaultBool = inputs.find((i) => i.name === "DEFAULT");
        const happyBool = inputs.find((i) => i.name === "HAPPY");
        const angryBool = inputs.find((i) => i.name === "ANGRY");
        const neutralBool = inputs.find((i) => i.name === "NEUTRAL");

        if(!color.parentNode.classList.contains("hidden")){
          color.parentNode.classList.add("hidden");
        }

        neutralBool.value = true;

        const radioHappy = document.querySelector("#emoji-happy");

        radioHappy.addEventListener("change", () => { 
          if(radioHappy.checked){
            console.log("happy checked")

            if(!color.parentNode.classList.contains("hidden")){
              color.parentNode.classList.add("hidden");
            }

            neutralBool.value = false;
            defaultBool.value = false;
            angryBool.value = false;

            setTimeout(() => {
              neutralBool.value = true;
            }, 10);


            setTimeout(() => {
              neutralBool.value = false;
              defaultBool.value = false;
              angryBool.value = false;
              happyBool.value = true;
            }, 20);
          }
        })

        const radioAngry = document.querySelector("#emoji-angry");

        radioAngry.addEventListener("change", () => {
          if(radioAngry.checked){
            console.log("angry checked")

            color.value = 0;

            if(color.parentNode.classList.contains("hidden")){
              color.parentNode.classList.remove("hidden");
            }

            neutralBool.value = false;
            defaultBool.value = false;
            happyBool.value = false;

            setTimeout(() => {
              neutralBool.value = true;
            }, 10);
            
            setTimeout(() => {
              neutralBool.value = false;
              defaultBool.value = false;
              happyBool.value = false;
              angryBool.value = true;
            }, 20);
          }
        })

        const radioDefault = document.querySelector("#emoji-neutral");

        radioDefault.addEventListener("change", () => {
          if(radioDefault.checked){
            console.log("default checked")

            if(!color.parentNode.classList.contains("hidden")){
              color.parentNode.classList.add("hidden");
            }

            neutralBool.value = false;
            happyBool.value = false;
            angryBool.value = false;

            setTimeout(() => {
              neutralBool.value = true;
            }, 10);

            setTimeout(() => {
              neutralBool.value = false;
              happyBool.value = false;
              angryBool.value = false;
              defaultBool.value = true;
            }, 20);
          }
        })





        eyebrows.addEventListener("input", () => {
            defaultEyebrowsInput.value = eyebrows.value;
            angryEyebrowsInput.value = eyebrows.value;
        });
        
        mouth.addEventListener("input", () => {
          console.log("mouth")
            defaultMouthInput.value = mouth.value;
            happyMouthInput.value = mouth.value;
            angryMouthInput.value = mouth.value;
        });

        color.addEventListener("input", () => {
            if(angryBool.value){
              angryColorInput.value = color.value;
            }
        });

      },
    });
}
  

export default {
    riveAnimEmoji,
}