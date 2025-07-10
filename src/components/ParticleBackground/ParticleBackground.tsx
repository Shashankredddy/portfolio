import React, { useEffect, useRef, useState } from "react";
import "./ParticleBackground.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(
        100,
        Math.floor((canvas.width * canvas.height) / 6000)
      );

      const colors = [
        "rgba(255, 255, 255, 0.9)",
        "rgba(255, 215, 0, 0.8)",
        "rgba(102, 126, 234, 0.7)",
        "rgba(118, 75, 162, 0.6)",
        "rgba(255, 255, 255, 0.7)",
        "rgba(255, 140, 0, 0.6)",
      ];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }

      particlesRef.current = particles;
      setIsLoaded(true);
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update pulse animation
        particle.pulse += particle.pulseSpeed;
        const pulseMultiplier = 1 + Math.sin(particle.pulse) * 0.3;
        const currentSize = particle.size * pulseMultiplier;
        const currentOpacity =
          particle.opacity * (0.7 + Math.sin(particle.pulse) * 0.3);

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Mouse interaction with enhanced effects
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Enhanced mouse interaction based on hover state
        const interactionRadius = isHovered ? 180 : 120;
        const forceMultiplier = isHovered ? 0.015 : 0.008;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          particle.vx -= (dx / distance) * force * forceMultiplier;
          particle.vy -= (dy / distance) * force * forceMultiplier;

          // Add attraction effect on hover
          if (isHovered && distance > 50) {
            particle.vx += (dx / distance) * force * 0.005;
            particle.vy += (dy / distance) * force * 0.005;
          }
        }

        // Draw particle with enhanced glow
        ctx.save();
        ctx.globalAlpha = currentOpacity;

        // Outer glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
        const outerGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          currentSize * 3
        );
        outerGradient.addColorStop(0, particle.color);
        outerGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = outerGradient;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        ctx.restore();

        // Draw connections to nearby particles with enhanced interactivity
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const connectionRadius = isHovered ? 180 : 150;
            if (distance < connectionRadius) {
              const opacity = Math.max(
                0,
                (1 - distance / connectionRadius) * (isHovered ? 0.6 : 0.4)
              );

              ctx.save();
              ctx.globalAlpha = opacity;

              // Enhanced line gradient with more colors
              const lineGradient = ctx.createLinearGradient(
                particle.x,
                particle.y,
                otherParticle.x,
                otherParticle.y
              );
              lineGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
              lineGradient.addColorStop(0.3, "rgba(255, 215, 0, 0.7)");
              lineGradient.addColorStop(0.7, "rgba(102, 126, 234, 0.6)");
              lineGradient.addColorStop(1, "rgba(255, 140, 0, 0.5)");

              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = lineGradient;
              ctx.lineWidth = isHovered ? 2 : 1.5;
              ctx.stroke();

              ctx.restore();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Initial setup
    resizeCanvas();
    createParticles();
    animate();

    // Event listeners
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-background ${isLoaded ? "loaded" : ""}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "auto",
        cursor: "none",
      }}
    />
  );
};

export default ParticleBackground;
