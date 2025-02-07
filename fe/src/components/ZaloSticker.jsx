import { useEffect, useRef } from "react";

const ZaloSticker = ({
    eid,
    size=130,
    className,
    onClick,
}) => {
  const canvasRef = useRef(null);
  const spriteRef = useRef(new Image());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sprite = spriteRef.current;
    const url = `https://zalo-api.zadn.vn/api/emoticon/sprite?eid=${eid}&size=${size}`;
    
    sprite.src = url; // Đường dẫn ảnh sprite
    const frameWidth = size;
    const frameHeight = size;
    let currentFrame = 0;
    let totalFrames = 1;
    
    canvas.width = frameWidth;
    canvas.height = frameHeight;
    
    const animateSprite = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        sprite,
        currentFrame * frameWidth,
        0,
        frameWidth,
        frameHeight,
        0,
        0,
        frameWidth,
        frameHeight
      );
      currentFrame = (currentFrame + 1) % totalFrames;
      setTimeout(() => requestAnimationFrame(animateSprite), 50);
    };

    sprite.onload = () => {
      totalFrames = sprite.width / frameWidth;
      animateSprite();
    };
  }, []);

  return <canvas onClick={onClick} className={className} ref={canvasRef}></canvas>;
};

export default ZaloSticker;
