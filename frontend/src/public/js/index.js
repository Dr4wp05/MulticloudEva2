document.getElementById('form-producto').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const mensaje = document.getElementById('mensaje');
  mensaje.style.color = 'green';
  // Validación básica
  if (!form.nombre.value || !form.precio.value) {
    mensaje.textContent = 'Nombre y precio son obligatorios';
    mensaje.style.color = 'red';
    return;
  }
  const data = {
    nombre: form.nombre.value,
    descripcion: form.descripcion.value,
    precio: form.precio.value
  };
  const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
  if (submitBtn) submitBtn.disabled = true;
  try {
    const res = await fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      mensaje.textContent = 'Producto agregado correctamente';
      mensaje.style.color = 'green';
      form.reset();
    } else {
      const err = await res.json();
      mensaje.textContent = err.error || 'Error al agregar producto';
      mensaje.style.color = 'red';
    }
  } catch (error) {
    mensaje.textContent = 'No se pudo conectar con el servidor.';
    mensaje.style.color = 'red';
  }
  if (submitBtn) submitBtn.disabled = false;
  setTimeout(() => { mensaje.textContent = ''; }, 4000);
});
