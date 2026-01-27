"use client";

import { useEffect, useRef, useCallback } from "react";

export default function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const timeRef = useRef(0);
  
  // OPTIMASI: Target 20fps untuk gradient halus
  const TARGET_FPS = 20;
  const FRAME_INTERVAL = 1000 / TARGET_FPS;

  const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, timestamp: number) => {
    // OPTIMASI: Skip frame jika tidak visible
    if (!isVisibleRef.current) {
      requestAnimationFrame((ts) => draw(canvas, ctx, ts));
      return;
    }

    // OPTIMASI: FPS throttle
    const elapsed = timestamp - lastFrameTimeRef.current;
    if (elapsed < FRAME_INTERVAL) {
      requestAnimationFrame((ts) => draw(canvas, ctx, ts));
      return;
    }
    lastFrameTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);

    timeRef.current += 0.002;
    const time = timeRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // OPTIMASI: Pre-calculate sin/cos values
    const sinTime = Math.sin(time);
    const cosTime = Math.cos(time);
    const sinTime12 = Math.sin(time * 1.2);
    const cosTime12 = Math.cos(time * 1.2);
    const sinTime08 = Math.sin(time * 0.8);
    const cosTime08 = Math.cos(time * 0.8);

    // Create gradient
    const gradient1 = ctx.createRadialGradient(
      width * 0.3 + sinTime * 100,
      height * 0.3 + cosTime * 100,
      0,
      width * 0.3 + sinTime * 100,
      height * 0.3 + cosTime * 100,
      width * 0.8
    );
    gradient1.addColorStop(0, "rgba(138, 43, 226, 0.15)");
    gradient1.addColorStop(1, "rgba(138, 43, 226, 0)");

    const gradient2 = ctx.createRadialGradient(
      width * 0.7 + cosTime12 * 150,
      height * 0.7 + sinTime12 * 150,
      0,
      width * 0.7 + cosTime12 * 150,
      height * 0.7 + sinTime12 * 150,
      width * 0.9
    );
    gradient2.addColorStop(0, "rgba(0, 191, 255, 0.12)");
    gradient2.addColorStop(1, "rgba(0, 191, 255, 0)");

    const gradient3 = ctx.createRadialGradient(
      width * 0.5 + sinTime08 * 80,
      height * 0.5 + cosTime08 * 80,
      0,
      width * 0.5 + sinTime08 * 80,
      height * 0.5 + cosTime08 * 80,
      width * 0.6
    );
    gradient3.addColorStop(0, "rgba(255, 20, 147, 0.1)");
    gradient3.addColorStop(1, "rgba(255, 20, 147, 0)");

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = gradient3;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "source-over";

    requestAnimationFrame((ts) => draw(canvas, ctx, ts));
  }, [FRAME_INTERVAL]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // OPTIMASI: Visibility API
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start animation
    requestAnimationFrame((ts) => draw(canvas, ctx, ts));

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

