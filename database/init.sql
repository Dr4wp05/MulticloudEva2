-- database/init.sql
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Paracetamol 500mg', 'Analgésico y antipirético', 1500.00, 100),
('Ibuprofeno 400mg', 'Antiinflamatorio no esteroideo', 2200.00, 50),
('Amoxicilina 500mg', 'Antibiótico de amplio espectro', 4500.00, 30);
