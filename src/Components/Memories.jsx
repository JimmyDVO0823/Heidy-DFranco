import React from "react";

export default function Memories({ elements }) {
  return (
    <div className="mt-10 text-center flex flex-col items-center">
      <h1>Recuerdos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-4">
        {elements.map((element, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center border rounded-4xl p-4 shadow-md 
            hover:scale-105 hover:shadow-lg transition-transform duration-300
            aspect-[2/1]"
          >
            <h1>{element.title}</h1>
            <p>{element.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
