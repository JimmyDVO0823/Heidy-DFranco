import React, { useState, useRef } from "react";
import YouTube from "react-youtube";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const videoId = "gndkFhYh5Mo";

  const opts = {
    height: "1", // 0 puede dar problemas; usar 1 px para que exista
    width: "1",
    playerVars: {
      autoplay: 0,
      controls: 0,
      playsinline: 1, // útil en móviles
      modestbranding: 1,
      rel: 0,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const onStateChange = (event) => {
    // Estados: 0 = ended, 1 = playing, 2 = paused
    const state = event.data;
    if (state === 1) setIsPlaying(true);
    else setIsPlaying(false);
  };

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) {
      // aún no está listo
      return;
    }

    try {
      const state = player.getPlayerState(); // 1 playing, 2 paused...
      if (state === 1) {
        player.pauseVideo();
        setIsPlaying(false); // respuesta inmediata en UI; onStateChange actualizará si es necesario
      } else {
        // Intentamos reproducir. Si el navegador bloquea autoplay sin interacción,
        // aquí tenemos una interacción del usuario (click), así que debería funcionar.
        player.playVideo();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("YouTube player error:", err);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-100">
      {/* El iframe NO usa display:none; lo colocamos fuera de la ventana y con 1px */}
      <div
        // usamos CSS para que esté en DOM pero invisible/inelegible
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* Interfaz visible */}
      <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md p-3 px-6 rounded-full shadow-xl border border-zinc-200">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
            Ambiente
          </span>
          <span className="text-sm font-semibold text-[#2E2E3A]">
            Música de fondo
          </span>
        </div>

        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center bg-[#2E2E3A] text-white rounded-full hover:scale-110 transition-all shadow-lg shadow-black/20"
        >
          {isPlaying ? (
            /* Pausa */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          ) : (
            /* Play */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z"
              />
            </svg>
          )}
        </button>

        <div className="flex gap-1 items-end h-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-1 bg-zinc-300 rounded-full transition-all duration-500 ${
                isPlaying ? "animate-pulse h-full" : "h-1"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
