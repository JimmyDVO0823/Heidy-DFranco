import React, { useState } from "react";

export function EditModal({ isOpen, onClose, onSave, initialData }) {
  // Estado para el formulario
  const [formData, setFormData] = useState(initialData);

  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Fondo oscuro detrás del cuadro */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* El cuadro de edición */}
      <div className="relative bg-white w-full max-w-md p-8 rounded-[2rem] shadow-2xl flex flex-col gap-6">
        <h2 className="text-2xl font-bold font-playfair text-[#2E2E3A]">
          Editar Recuerdo
        </h2>

        <div className="flex flex-col gap-4">
          {/* Input para el Título */}
          <div className="flex flex-col gap-1 text-left">
            <label className="text-sm font-semibold text-zinc-500 ml-1">
              Título
            </label>
            <input
              type="text"
              className="border border-zinc-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Input para la Descripción */}
          <div className="flex flex-col gap-1 text-left">
            <label className="text-sm font-semibold text-zinc-500 ml-1">
              Descripción
            </label>
            <textarea
              rows="3"
              className="border border-zinc-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-zinc-500 hover:bg-zinc-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex-1 px-4 py-3 rounded-xl font-semibold bg-[#2E2E3A] text-white hover:bg-black transition-colors"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
