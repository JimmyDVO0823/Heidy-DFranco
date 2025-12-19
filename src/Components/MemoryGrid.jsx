import React from "react";
import MemoryCard from "./MemoryCard";

export default function MemoryGrid({ memories, handleDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
      {memories.map((element) => (
        /* Usa la sintaxis de componente y añade siempre una key única aquí */
        <MemoryCard
          key={element.id}
          element={element}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
