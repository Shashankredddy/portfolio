import React, { useEffect, useRef } from "react";
import "./ConstellationBackground.css";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
  pulsePhase: number;
}

const ConstellationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createConstellation = () => {
      const stars: Star[] = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 20000);

      // Create stars
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          brightness: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      // Create connections between nearby stars
      const connections: Connection[] = [];
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150 && Math.random() < 0.1) {
            connections.push({
              from: i,
              to: j,
              opacity: Math.random() * 0.3 + 0.1,
              pulsePhase: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      starsRef.current = stars;
      connectionsRef.current = connections;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw constellation connections
      connectionsRef.current.forEach((connection) => {
        const fromStar = starsRef.current[connection.from];
        const toStar = starsRef.current[connection.to];

        if (fromStar && toStar) {
          connection.pulsePhase += 0.01;
          const pulseOpacity =
            connection.opacity * (0.5 + 0.5 * Math.sin(connection.pulsePhase));

          // Create gradient line
          const gradient = ctx.createLinearGradient(
            fromStar.x,
            fromStar.y,
            toStar.x,
            toStar.y
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${pulseOpacity})`);
          gradient.addColorStop(
            0.5,
            `rgba(255, 215, 0, ${pulseOpacity * 0.8})`
          );
          gradient.addColorStop(1, `rgba(255, 255, 255, ${pulseOpacity})`);

          ctx.beginPath();
          ctx.moveTo(fromStar.x, fromStar.y);
          ctx.lineTo(toStar.x, toStar.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw stars
      starsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.3 + 0.7 * Math.sin(star.twinklePhase);
        const currentBrightness = star.brightness * twinkle;

        // Create star glow
        const glowGradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 4
        );
        glowGradient.addColorStop(
          0,
          `rgba(255, 255, 255, ${currentBrightness})`
        );
        glowGradient.addColorStop(
          0.5,
          `rgba(255, 215, 0, ${currentBrightness * 0.5})`
        );
        glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentBrightness})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createConstellation();
    };

    resizeCanvas();
    createConstellation();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation-background" />;
};

export default ConstellationBackground;
