window.addEventListener('DOMContentLoaded', async () => {
  const tbody = document.querySelector('#tabla-productos tbody');
  tbody.innerHTML = '';
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  try {
    const res = await fetch('/api/productos');
    if (!res.ok) throw new Error('Respuesta no valida del servidor');
    const productos = await res.json();
    productos.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(p.id)}</td><td>${escapeHtml(p.nombre)}</td><td>${escapeHtml(p.descripcion||'')}</td><td>${escapeHtml(p.precio)}</td>`;
      tbody.appendChild(tr);
    });
  } catch (error) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="4">No fue posible cargar productos.</td>';
    tbody.appendChild(tr);
  }
});
