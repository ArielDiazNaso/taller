-- =========================================================================
-- ESQUEMA SQL 3NF — SISTEMA DE CONTADORES Y LOGS DE INTERACCIÓN
-- =========================================================================
-- Objetivo: almacenar usuarios, sesiones y cada operación (incrementar,
-- decrementar, reset) realizada en el contador.
--
-- Cumplimiento de TERCERA FORMA NORMAL (3NF):
--   1NF: Todas las columnas son atómicas (no hay grupos repetidos).
--   2NF: Cada atributo NO-clave depende de TODA la clave primaria
--        (no dependencias parciales).
--   3NF: Ningún atributo NO-clave depende transitivamente de otra
--        columna NO-clave. Toda la información descriptiva se separa
--        en tablas de catálogo (ej: `action_types`).
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1) TABLA DE USUARIOS
--    Datos descriptivos de cada usuario (información personal).
-- -------------------------------------------------------------------------
CREATE TABLE users (
    user_id       BIGSERIAL     PRIMARY KEY,
    email         VARCHAR(254)  NOT NULL  UNIQUE,
    display_name  VARCHAR(80)   NOT NULL,
    theme         VARCHAR(10)   NOT NULL  DEFAULT 'system'
                  CHECK (theme IN ('light', 'dark', 'system')),
    created_at    TIMESTAMPTZ   NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ   NOT NULL  DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users (email);

-- -------------------------------------------------------------------------
-- 2) TABLA CATÁLOGO — TIPOS DE ACCIÓN
--    Evita repetir strings ('INCREMENT','DECREMENT','RESET') en cada fila
--    del log y previene inconsistencias (3NF: atributos dependen
--    ÚNICAMENTE de la PK, no de otras columnas no-clave).
-- -------------------------------------------------------------------------
CREATE TABLE action_types (
    action_code   CHAR(3)       PRIMARY KEY,  -- 'INC','DEC','RST'
    action_name   VARCHAR(15)   NOT NULL UNIQUE,
    description   VARCHAR(120)  NOT NULL
);

INSERT INTO action_types (action_code, action_name, description) VALUES
    ('INC', 'INCREMENT', 'Incrementar el contador en 1'),
    ('DEC', 'DECREMENT', 'Decrementar el contador en 1'),
    ('RST', 'RESET',     'Reiniciar el contador a 0');

-- -------------------------------------------------------------------------
-- 3) TABLA DE SESIONES
--    Agrupa interacciones por visita/sesión. Un usuario puede tener
--    muchas sesiones; cada sesión pertenece a UN solo usuario (N:1).
-- -------------------------------------------------------------------------
CREATE TABLE sessions (
    session_id    BIGSERIAL     PRIMARY KEY,
    user_id       BIGINT        NULL  REFERENCES users(user_id)
                                   ON DELETE SET NULL,
    device_info   VARCHAR(255)  NULL,
    started_at    TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ended_at      TIMESTAMPTZ   NULL
);

CREATE INDEX idx_sessions_user_id    ON sessions (user_id);
CREATE INDEX idx_sessions_started_at ON sessions (started_at);

-- -------------------------------------------------------------------------
-- 4) TABLA DE LOGS DEL CONTADOR
--    Cada fila = UNA operación individual en el contador.
--    FKs hacia users, sessions y action_types garantizan la 3NF.
-- -------------------------------------------------------------------------
CREATE TABLE counter_logs (
    log_id         BIGSERIAL     PRIMARY KEY,
    session_id     BIGINT        NULL  REFERENCES sessions(session_id)
                                      ON DELETE SET NULL,
    user_id        BIGINT        NULL  REFERENCES users(user_id)
                                      ON DELETE SET NULL,
    action_code    CHAR(3)       NOT NULL REFERENCES action_types(action_code),
    value_before   INTEGER       NOT NULL,
    value_after    INTEGER       NOT NULL,
    occurred_at    TIMESTAMPTZ   NOT NULL  DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_counter_logs_user_id   ON counter_logs (user_id);
CREATE INDEX idx_counter_logs_session   ON counter_logs (session_id);
CREATE INDEX idx_counter_logs_action    ON counter_logs (action_code);
CREATE INDEX idx_counter_logs_occurred  ON counter_logs (occurred_at DESC);

-- -------------------------------------------------------------------------
-- 5) VISTA RESUMEN — Última estadística por usuario
--    Evita almacenar datos derivados (violaría 3NF); en su lugar,
--    se calculan al vuelo mediante una vista.
-- -------------------------------------------------------------------------
CREATE VIEW vw_user_counter_stats AS
SELECT
    u.user_id,
    u.display_name,
    COUNT(cl.log_id)                               AS total_operations,
    COUNT(CASE WHEN cl.action_code = 'INC' THEN 1 END) AS increments,
    COUNT(CASE WHEN cl.action_code = 'DEC' THEN 1 END) AS decrements,
    COUNT(CASE WHEN cl.action_code = 'RST' THEN 1 END) AS resets,
    MAX(cl.value_after)                            AS max_value_reached,
    MIN(cl.value_after)                            AS min_value_reached,
    MAX(cl.occurred_at)                            AS last_activity_at
FROM        users          u
LEFT JOIN   counter_logs   cl  ON cl.user_id = u.user_id
GROUP BY    u.user_id, u.display_name;

-- =========================================================================
--  MOTIVACIÓN DE CUMPLIMIENTO 3NF
-- =========================================================================
-- - `action_types` separa la descripción de cada acción, evitando que
--   strings como 'INCREMENT' se repitan en `counter_logs`.
-- - Si quisiéramos renombrar 'INCREMENT' → 'PLUS_ONE`, editamos
--   UNA sola fila en `action_types` (3NF: sin dependencias transitivas).
-- - Datos de usuario viven en `users`; datos de sesión en `sessions`;
--   eventos individuales en `counter_logs`. Nada se duplica.
-- - Datos agregados (totales, máximos, mínimos) NO se guardan — se
--   calculan en vistas, evitando anomalías de actualización.
-- =========================================================================
