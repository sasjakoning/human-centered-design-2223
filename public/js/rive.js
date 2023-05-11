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

        const radioButtons = document.querySelectorAll(".emojiOverlay--emojiContainer input[type='radio']");

        if(!color.parentNode.classList.contains("hidden")){
          color.parentNode.classList.add("hidden");
        }


        radioButtons.forEach((radio) => {
          radio.addEventListener("change", () => { 
            if(radio.checked){
              if(radio.value === "emoji-neutral"){
                console.log("neutral")
                defaultBool.value = true;
                happyBool.value = false;
                angryBool.value = false;
                angryColorInput.value = 0;
                angryEyebrowsInput.value = 0;
                defaultEyebrowsInput.value = 0;
                defaultMouthInput.value = 0;
                happyMouthInput.value = 0;
                angryMouthInput.value = 0;


                if(!color.parentNode.classList.contains("hidden")){
                  color.parentNode.classList.add("hidden");
                }
              }else if(radio.value === "emoji-happy"){
                console.log("happy")
                happyBool.value = true;
                defaultBool.value = false;
                angryBool.value = false;
                angryColorInput.value = 0;

                angryColorInput.value = 0;
                angryEyebrowsInput.value = 0;
                defaultEyebrowsInput.value = 0;
                defaultMouthInput.value = 0;
                happyMouthInput.value = 0;
                angryMouthInput.value = 0;


                if(!color.parentNode.classList.contains("hidden")){
                  color.parentNode.classList.add("hidden");
                }
              }else if(radio.value === "emoji-angry"){
                console.log("angry")
                angryBool.value = true;
                defaultBool.value = false;
                happyBool.value = false;

                angryColorInput.value = 0;
                angryEyebrowsInput.value = 0;
                defaultEyebrowsInput.value = 0;
                defaultMouthInput.value = 0;
                happyMouthInput.value = 0;
                angryMouthInput.value = 0;


                if(color.parentNode.classList.contains("hidden")){
                  color.parentNode.classList.remove("hidden");
                }
              }
            }
          })
        })


        eyebrows.addEventListener("input", () => {
            if(defaultBool.value || happyBool.value){
              console.log("default")
              defaultEyebrowsInput.value = eyebrows.value;
              // reset other values to 50
              angryEyebrowsInput.value = 50;
            }else if(angryBool.value){
              console.log("angry")
              angryEyebrowsInput.value = eyebrows.value;
              // reset other values to 50
              defaultEyebrowsInput.value = 50;
            }
        });
        
        mouth.addEventListener("input", () => {
            if (defaultBool.value){
              console.log("default")
              defaultMouthInput.value = mouth.value;
              // reset other values to 50
              happyMouthInput.value = 50;
              angryMouthInput.value = 50;
            }else if(happyBool.value){
              console.log("happy")
              happyMouthInput.value = mouth.value;
              // reset other values to 50
              defaultMouthInput.value = 50;
              angryMouthInput.value = 50;
            }else if(angryBool.value){
              console.log("angry")
              angryMouthInput.value = mouth.value;
              // reset other values to 50
              defaultMouthInput.value = 50;
              happyMouthInput.value = 50;
            }
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