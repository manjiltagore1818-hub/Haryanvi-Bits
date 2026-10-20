import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../services/audioEngine';

interface AudioVisualizerProps {
  isPlaying: boolean;
  accentColor?: string;
  isBassBoosted?: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  accentColor = '#f59e0b',
  isBassBoosted = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const data = audioEngine.getVisualizerData();
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const numBars = 32;
      const barWidth = Math.max(2, (width / numBars) - 2);

      for (let i = 0; i < numBars; i++) {
        // Sample frequency data
        const sampleIdx = Math.floor((i / numBars) * (data.length * 0.7));
        let val = isPlaying ? data[sampleIdx] || 0 : 4;

        if (isPlaying && isBassBoosted && i < 10) {
          val = Math.min(255, val * 1.35);
        }

        const barHeight = Math.max(3, (val / 255) * (height - 4));
        const x = i * (barWidth + 2);
        const y = height - barHeight;

        // Gradient from base accent to bright golden tip
        const gradient = ctx.createLinearGradient(0, height, 0, y);
        gradient.addColorStop(0, accentColor);
        gradient.addColorStop(1, '#fde68a');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, accentColor, isBassBoosted]);

  return (
    <div className="relative w-full h-8 flex items-end overflow-hidden">
      <canvas
        ref={canvasRef}
        width={320}
        height={32}
        className="w-full h-full opacity-90"
      />
    </div>
  );
};
