-- ========================================================
-- Esquema de Base de Datos - Portfolio SPA
-- Compatible con PostgreSQL / Supabase
-- ========================================================

-- 1. Tabla de Mensajes de Contacto (almacena envíos del formulario)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    read BOOLEAN DEFAULT FALSE
);

-- 2. Tabla de Perfil
CREATE TABLE IF NOT EXISTS profile (
    id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    tagline TEXT,
    bio TEXT,
    avatar_url TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(100),
    resume_url TEXT,
    socials JSONB,
    highlights TEXT[]
);

-- 3. Tabla de Proyectos
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT,
    image_url TEXT,
    demo_url TEXT,
    repo_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    project_order INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    tag_ids TEXT[],
    screenshots TEXT[]
);

-- 4. Tabla de Habilidades (Skills)
CREATE TABLE IF NOT EXISTS skills (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    proficiency INT NOT NULL,
    icon_key VARCHAR(50),
    years_of_experience INT
);

-- 5. Tabla de Experiencia y Educación
CREATE TABLE IF NOT EXISTS experience (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,
    start_date DATE,
    end_date DATE,
    location VARCHAR(100),
    description TEXT,
    bullet_points TEXT[],
    exp_order INT DEFAULT 0,
    related_skills_ids TEXT[]
);

-- Habilitar lectura pública (Row Level Security en Supabase)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública:
CREATE POLICY "Permitir lectura publica de perfil" ON profile FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de proyectos" ON projects FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de habilidades" ON skills FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de experiencia" ON experience FOR SELECT USING (true);

-- Política para insertar mensajes de contacto libremente desde la web:
CREATE POLICY "Permitir envio de mensajes de contacto" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir lectura de mensajes al dueno" ON contact_messages FOR SELECT USING (true);