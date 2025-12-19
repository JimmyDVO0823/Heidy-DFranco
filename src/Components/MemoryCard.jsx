import React, { useState } from "react"; // 1. Importación necesaria
import { ContextMenu } from "./ContextMenu";
import { toast } from "sonner";
import {EditModal} from './EditModal'

export default function MemoryCard({ element, handleDelete }) {
  // Estado para controlar el menú
  const [menuConfig, setMenuConfig] = useState({ visible: false, x: 0, y: 0 });

  const [elementData, setElementData] = useState(element);

  // 2. Función para capturar el clic derecho
  const handleRightClick = (e) => {
    e.preventDefault(); // Bloquea el menú por defecto del navegador
    setMenuConfig({
      visible: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const closeMenu = () => setMenuConfig({ ...menuConfig, visible: false });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (updatedData) => {
    // Aquí llamas a una función que actualice el estado global de recuerdos
    console.log("Datos actualizados:", updatedData);
    setElementData(updatedData);
    setIsModalOpen(false);
  };

  return (
    /* Agregamos el evento onContextMenu al contenedor principal */
    <div onContextMenu={handleRightClick} className="relative">
      <div
        className="group relative flex flex-col items-center justify-center text-center 
            border-4 border-[#D2D5D9] rounded-[3rem] shadow-md 
            hover:scale-105 hover:shadow-2xl transition-all duration-500
            aspect-square overflow-hidden bg-zinc-100"
      >
        <img
          src={element.image}
          alt={element.title || "Recuerdo"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay que aparece al hacer hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-white">
          <h1 className="text-2xl font-bold font-playfair">{elementData.title}</h1>
          <p className="text-sm mt-2 opacity-90">{elementData.description}</p>
        </div>
      </div>

      {/* 3. Renderizado condicional del Menú de Contexto */}
      {menuConfig.visible && (
        <ContextMenu
          x={menuConfig.x}
          y={menuConfig.y}
          closeMenu={closeMenu}
          actions={{
            edit: () => setIsModalOpen(true),
            copy: () => {
              navigator.clipboard.writeText(
                elementData.title + "\n" + elementData.description
              );
              toast.success("Recuerdo copiado al portapapeles");
            },
            delete: () => handleDelete(elementData.id), // Conectado a tu función borrar
          }}
        />
      )}
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={elementData} // Le pasamos los datos actuales
        />
      )}
    </div>
  );
}
