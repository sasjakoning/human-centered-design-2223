function riveAnimEmoji(canvas, eyebrows, mouth) {
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

        const eyebrowsInput = inputs.find((i) => i.name === "eyebrows");
        const mouthInput = inputs.find((i) => i.name === "mouth");
        eyebrowsInput.value = eyebrows.value;
        mouthInput.value = mouth.value;

        eyebrows.addEventListener("input", () => {
            eyebrowsInput.value = eyebrows.value;
        });
        
        mouth.addEventListener("input", () => {
            mouthInput.value = mouth.value;
        });

      },
    });
}
  

export default {
    riveAnimEmoji,
}