// ContextMenu.jsx
export function ContextMenu({ x, y, closeMenu, actions }) {
  return (
    <>
      {/* Capa invisible para cerrar el menú al hacer clic fuera */}
      <div className="fixed inset-0 z-40" onClick={closeMenu} />

      {/* El Menú en sí */}
      <div
        className="fixed z-50 bg-white border border-zinc-200 shadow-xl rounded-lg py-2 w-48"
        style={{ top: y, left: x }}
      >
        <button
          onClick={() => {
            actions.edit();
            closeMenu();
          }}
          className="w-full text-left px-4 py-2 hover:bg-zinc-100 text-sm flex items-center gap-2"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => {
            actions.copy();
            closeMenu();
          }}
          className="w-full text-left px-4 py-2 hover:bg-zinc-100 text-sm flex items-center gap-2"
        >
          📋 Copiar
        </button>
        <div className="border-t border-zinc-100 my-1" />
        <button
          onClick={() => {
            actions.delete();
            closeMenu();
          }}
          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2"
        >
          🗑️ Eliminar
        </button>
      </div>
    </>
  );
}
