import React, { useState, useRef, useEffect } from "react";
import MemoryGrid from './MemoryGrid'
/**
 * COMPONENTE: Memories
 * ------------------------------------------------------------------
 * Este componente representa una sección de "Recuerdos" de la página.
 *
 * Funcionalidades principales:
 *  - Muestra una galería de tarjetas (recuerdos) con imágenes.
 *  - Permite subir imágenes desde el dispositivo del usuario.
 *  - Cada imagen subida se muestra inmediatamente en la galería.
 *  - Permite eliminar recuerdos individualmente.
 *  - Gestiona correctamente los Object URLs para evitar fugas de memoria.
 *
 * El componente es completamente autocontenido y utiliza:
 *  - Estado local (useState)
 *  - Referencias mutables (useRef)
 *  - Efectos de ciclo de vida (useEffect)
 *
 * @param {Array} initialElements
 *  Lista inicial de recuerdos que se renderizan al montar el componente.
 *  Cada elemento debe tener la forma:
 *    {
 *      id?: string,
 *      title: string,
 *      description: string,
 *      image: string (URL o ruta de imagen)
 *    }
 */
export default function Memories({ initialElements = [] }) {
  /**
   * ESTADO: memories
   * ----------------------------------------------------------------
   * Contiene el listado actual de recuerdos que se muestran en pantalla.
   *
   * - Se inicializa a partir de `initialElements`.
   * - Cada recuerdo recibe un `id` único si no lo tiene.
   * - Se usa una función inicializadora para evitar cálculos en cada render.
   */
  const [memories, setMemories] = useState(() =>
    // Normaliza los elementos iniciales asegurando que tengan un id
    initialElements.map((el, i) => ({ id: `init-${i}`, ...el }))
  );

  /**
   * REF: createdUrlsRef
   * ----------------------------------------------------------------
   * Referencia mutable que almacena todos los Object URLs creados
   * mediante `URL.createObjectURL`.
   *
   * - No provoca re-renders al modificarse.
   * - Se usa para poder revocar las URLs cuando ya no se necesiten.
   * - Evita fugas de memoria en el navegador.
   */
  const createdUrlsRef = useRef(new Set());

  /**
   * EFECTO: limpieza al desmontar el componente
   * ----------------------------------------------------------------
   * Este efecto se ejecuta SOLO cuando el componente se desmonta.
   *
   * Su objetivo es:
   *  - Revocar todos los Object URLs creados durante la vida del componente.
   *  - Liberar memoria del navegador.
   *
   * El array de dependencias vacío [] garantiza que:
   *  - No se ejecute en re-renders.
   *  - Solo se ejecute la función de limpieza.
   */
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (err) {
          // Se ignoran errores por seguridad
        }
      });
      createdUrlsRef.current.clear();
    };
  }, []);

  /**
   * FUNCIÓN: handleUpload
   * ----------------------------------------------------------------
   * Se ejecuta cuando el usuario selecciona una imagen en el input file.
   *
   * Flujo:
   *  1. Obtiene el archivo seleccionado.
   *  2. Crea un Object URL para poder mostrar la imagen localmente.
   *  3. Registra el Object URL en la referencia `createdUrlsRef`.
   *  4. Crea un nuevo objeto "recuerdo".
   *  5. Añade el recuerdo al inicio del estado `memories`.
   *  6. Limpia el input para permitir volver a subir el mismo archivo.
   */
  const handleUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      // Se guarda el URL creado para poder revocarlo más adelante
      createdUrlsRef.current.add(url);

      const newMemory = {
        id: `${Date.now()}`, // Identificador único basado en timestamp
        title: "Nuevo Recuerdo",
        description: "Añadido ahora mismo",
        image: url,
      };

      // Inserta el nuevo recuerdo al inicio de la galería
      setMemories((prev) => [newMemory, ...prev]);

      // Limpia el input para permitir volver a seleccionar el mismo archivo
      e.target.value = "";
    }
  };

  /**
   * FUNCIÓN: handleDelete
   * ----------------------------------------------------------------
   * Elimina un recuerdo específico de la galería.
   *
   * Flujo:
   *  1. Busca el recuerdo a eliminar por su id.
   *  2. Si la imagen es un Object URL creado por el componente:
   *     - Revoca el Object URL.
   *     - Lo elimina del registro interno.
   *  3. Filtra el recuerdo fuera del estado `memories`.
   *
   * @param {string} id - Identificador del recuerdo a eliminar
   */
  const handleDelete = (id) => {
    setMemories((prev) => {
      const toRemove = prev.find((m) => m.id === id);

      if (toRemove && createdUrlsRef.current.has(toRemove.image)) {
        try {
          URL.revokeObjectURL(toRemove.image);
        } catch (err) {
          // Ignorar errores
        }
        createdUrlsRef.current.delete(toRemove.image);
      }

      // Devuelve la lista sin el recuerdo eliminado
      return prev.filter((m) => m.id !== id);
    });
  };

  /**
   * RENDER
   * ----------------------------------------------------------------
   * Estructura visual del componente:
   *
   *  - Contenedor principal centrado
   *  - Título de la sección
   *  - Botón estilizado para subir imágenes
   *  - Galería en formato grid responsivo
   *  - Cada recuerdo se muestra como una tarjeta cuadrada con:
   *      - Imagen de fondo
   *      - Botón para eliminar
   *      - Overlay con título y descripción al hacer hover
   */
  return (
    <div className="mt-10 text-center flex flex-col items-center w-full px-6">
      <h1 className="text-4xl font-playfair font-bold mb-6">Recuerdos</h1>

      {/* 
        Label estilizado que actúa como botón.
        Contiene un input file oculto para mejorar la experiencia visual.
      */}
      <label
        htmlFor="file-input"
        className="mb-10 cursor-pointer bg-[#2E2E3A] text-white px-8 py-3 rounded-full hover:bg-black transition-all shadow-lg"
        aria-label="Añadir foto"
      >
        + Añadir Foto
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {/* Grid responsivo que contiene todas las tarjetas de recuerdos */}
      <MemoryGrid memories={memories} handleDelete={handleDelete} />
    </div>
  );
}
