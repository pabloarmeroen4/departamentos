CREATE DATABASE IF NOT EXISTS Villa_del_sol;
USE Villa_del_sol;

DROP TABLE IF EXISTS Propietarios;
CREATE TABLE Propietarios (
  id int NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  cedula varchar(100) NOT NULL,
  telefono varchar(100) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY cedula (cedula)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS Apartamentos;
CREATE TABLE IF NOT EXISTS Apartamentos (
    id int NOT NULL AUTO_INCREMENT,
    numApt VARCHAR(100) NOT NULL,
    torre VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    propietarioId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (propietarioId) REFERENCES Propietarios(id) ON DELETE SET NULL ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Visitantes;

CREATE TABLE IF NOT EXISTS Visitantes (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    cedula VARCHAR(100) NOT NULL,
    fechaIngreso DATETIME NOT NULL,
    fechaSalida DATETIME,
    estado VARCHAR(100) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    apartamentoId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (apartamentoId) REFERENCES Apartamentos(id) ON DELETE SET NULL ON UPDATE CASCADE
);


DROP TABLE IF EXISTS Usuarios;
CREATE TABLE IF NOT EXISTS Usuarios(
    id INT AUTO_INCREMENT ,
    nombre VARCHAR(100),
    cedula VARCHAR(100),
    telefono VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    rol VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

DROP TABLE IF EXISTS Pagos;
CREATE TABLE IF NOT EXISTS Pagos (
    id INT AUTO_INCREMENT,
    monto FLOAT NOT NULL,
    estado VARCHAR(100) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    numeApt varchar(100) DEFAULT NULL,
    apartamentoId INT,
    propietarioId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (apartamentoId) REFERENCES Apartamentos(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (propietarioId) REFERENCES Propietarios(id) ON DELETE SET NULL ON UPDATE CASCADE
);


DROP TABLE IF EXISTS Informes;
CREATE TABLE IF NOT EXISTS Informes (
    id INT AUTO_INCREMENT,
    cargo VARCHAR(255) NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    estado VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    emisorId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (emisorId) REFERENCES Usuarios(id) ON DELETE SET NULL ON UPDATE CASCADE
);