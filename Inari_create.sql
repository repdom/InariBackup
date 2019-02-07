-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-02-05 18:52:31.467

-- tables
-- Table: area
CREATE TABLE area (
    codigo int NOT NULL AUTO_INCREMENT,
    nombre varchar(64) NOT NULL,
    cancelado bool NOT NULL DEFAULT false,
    CONSTRAINT area_pk PRIMARY KEY (codigo)
);

-- Table: calendario
CREATE TABLE calendario (
    codigo int NOT NULL AUTO_INCREMENT,
    inicio_calendario timestamp NOT NULL,
    fin_calendario timestamp NOT NULL,
    area_codigo int NOT NULL,
    cancelado bool NOT NULL DEFAULT false,
    usuario_relacionado int NOT NULL,
    formulario_modelo_codigo int NOT NULL,
    CONSTRAINT calendario_pk PRIMARY KEY (codigo)
);

-- Table: formulario_evaluacion
CREATE TABLE formulario_evaluacion (
    codigo int NOT NULL AUTO_INCREMENT,
    fecha_creacion timestamp NOT NULL COLUMN_FORMAT FIXED,
    fecha_guardado timestamp NOT NULL,
    foto1 blob NULL,
    foto2 blob NULL,
    foto3 blob NULL,
    foto4 blob NULL,
    foto5 blob NULL,
    foto6 blob NULL,
    foto7 blob NULL,
    foto8 blob NULL,
    foto9 blob NULL,
    foto10 blob NULL,
    usuario_relacionado int NOT NULL,
    formulario_modelo_codigo int NOT NULL,
    area_codigo int NOT NULL,
    CONSTRAINT formulario_evaluacion_pk PRIMARY KEY (codigo)
);

-- Table: formulario_modelo
CREATE TABLE formulario_modelo (
    codigo int NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    fecha_creacion timestamp NOT NULL,
    foto1 blob NULL,
    foto2 blob NULL,
    foto3 blob NULL,
    foto4 blob NULL,
    foto5 blob NULL,
    foto6 blob NULL,
    foto7 blob NULL,
    foto8 blob NULL,
    foto9 blob NULL,
    foto10 blob NULL,
    cancelado bool NOT NULL DEFAULT false,
    area_codigo int NOT NULL,
    usuario_relacionado int NOT NULL,
    CONSTRAINT formulario_modelo_pk PRIMARY KEY (codigo)
);

-- Table: formulario_modelo_item
CREATE TABLE formulario_modelo_item (
    formulario_modelo_codigo int NOT NULL,
    item_codigo int NOT NULL,
    cancelado bool NOT NULL DEFAULT false
);

-- Table: item
CREATE TABLE item (
    codigo int NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    fecha_creacion timestamp NOT NULL,
    cancelado bool NOT NULL DEFAULT false,
    CONSTRAINT item_pk PRIMARY KEY (codigo)
);

-- Table: item_evaluacion
CREATE TABLE item_evaluacion (
    codigo int NOT NULL AUTO_INCREMENT,
    fecha_creacion timestamp NOT NULL,
    fecha_guardado timestamp NOT NULL,
    evaluacion bool NOT NULL DEFAULT false,
    comentario varchar(264) NOT NULL,
    formulario_evaluacion_codigo int NOT NULL,
    imagen blob NOT NULL,
    usuario_relacionado int NOT NULL,
    item_codigo int NOT NULL,
    CONSTRAINT item_evaluacion_pk PRIMARY KEY (codigo)
);

-- Table: usuario
CREATE TABLE usuario (
    codigo int NOT NULL AUTO_INCREMENT,
    nombre1 varchar(64) NOT NULL,
    nombre2 varchar(64) NULL,
    apellido1 varchar(64) NOT NULL,
    apellido2 varchar(64) NULL,
    email varchar(264) NOT NULL,
    usuario varchar(264) NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY (codigo)
);

-- foreign keys
-- Reference: calendario_area (table: calendario)
ALTER TABLE calendario ADD CONSTRAINT calendario_area FOREIGN KEY calendario_area (area_codigo)
    REFERENCES area (codigo);

-- Reference: calendario_formulario_modelo (table: calendario)
ALTER TABLE calendario ADD CONSTRAINT calendario_formulario_modelo FOREIGN KEY calendario_formulario_modelo (formulario_modelo_codigo)
    REFERENCES formulario_modelo (codigo);

-- Reference: formulario_evaluacion_area (table: formulario_evaluacion)
ALTER TABLE formulario_evaluacion ADD CONSTRAINT formulario_evaluacion_area FOREIGN KEY formulario_evaluacion_area (area_codigo)
    REFERENCES area (codigo);

-- Reference: formulario_evaluacion_formulario_modelo (table: formulario_evaluacion)
ALTER TABLE formulario_evaluacion ADD CONSTRAINT formulario_evaluacion_formulario_modelo FOREIGN KEY formulario_evaluacion_formulario_modelo (formulario_modelo_codigo)
    REFERENCES formulario_modelo (codigo);

-- Reference: formulario_modelo_area (table: formulario_modelo)
ALTER TABLE formulario_modelo ADD CONSTRAINT formulario_modelo_area FOREIGN KEY formulario_modelo_area (area_codigo)
    REFERENCES area (codigo);

-- Reference: formulario_modelo_item_formulario_modelo (table: formulario_modelo_item)
ALTER TABLE formulario_modelo_item ADD CONSTRAINT formulario_modelo_item_formulario_modelo FOREIGN KEY formulario_modelo_item_formulario_modelo (formulario_modelo_codigo)
    REFERENCES formulario_modelo (codigo);

-- Reference: formulario_modelo_item_item (table: formulario_modelo_item)
ALTER TABLE formulario_modelo_item ADD CONSTRAINT formulario_modelo_item_item FOREIGN KEY formulario_modelo_item_item (item_codigo)
    REFERENCES item (codigo);

-- Reference: item_evaluacion_formulario_evaluacion (table: item_evaluacion)
ALTER TABLE item_evaluacion ADD CONSTRAINT item_evaluacion_formulario_evaluacion FOREIGN KEY item_evaluacion_formulario_evaluacion (formulario_evaluacion_codigo)
    REFERENCES formulario_evaluacion (codigo);

-- Reference: item_evaluacion_item (table: item_evaluacion)
ALTER TABLE item_evaluacion ADD CONSTRAINT item_evaluacion_item FOREIGN KEY item_evaluacion_item (item_codigo)
    REFERENCES item (codigo);

-- End of file.

