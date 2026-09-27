/**
 * ProfileCard.tsx
 *
 * Tarjeta de presentación empresarial simple y moderna.
 *
 * Propósito:
 *   Renderiza una única tarjeta de perfil con los datos básicos de una persona.
 *   Diseñado para ser reutilizable, accesible y completamente responsive.
 *
 * Props (todas tipadas con valores por defecto para robustez):
 *   - firstName  : Nombre de pila (requerido con fallback).
 *   - lastName   : Apellido (opcional, puede ser string vacío).
 *   - profession : Profesión o cargo.
 *   - avatarUrl  : URL pública de la imagen de avatar.
 *                  Si no se provee o falla, se muestra un fallback con iniciales.
 *
 * Flujo interno:
 *   1. Desestructura las props aplicando valores por defecto.
 *   2. Calcula el nombre completo concatenando firstName + lastName.
 *   3. Calcula las iniciales para el avatar de fallback.
 *   4. Renderiza un <article> semántico con la imagen, nombre y profesión.
 */

import { useMemo } from 'react';
import styles from './ProfileCard.module.css';

/**
 * Interfaz pública del componente.
 * Define el contrato tipado que deben cumplir los consumidores.
 */
export interface ProfileCardProps {
  /** Nombre de pila de la persona. Valor por defecto: "Nombre". */
  firstName?: string;
  /** Apellido de la persona. Opcional — puede ser string vacío. */
  lastName?: string;
  /** Cargo, profesión o especialidad. Valor por defecto: "Profesión". */
  profession?: string;
  /** URL de la imagen de avatar. Si falla o no existe → fallback de iniciales. */
  avatarUrl?: string;
}

/**
 * Valores por defecto seguros.
 * Garantizan que el componente siempre renderice contenido válido
 * incluso si el consumidor no provee todas las props.
 */
const DEFAULT_PROPS: Required<Pick<ProfileCardProps, 'firstName' | 'lastName' | 'profession'>> = {
  firstName: 'Nombre',
  lastName: '',
  profession: 'Profesión',
};

/**
 * ProfileCard — Tarjeta de perfil empresarial.
 *
 * @example
 * ```tsx
 * <ProfileCard
 *   firstName="Ariel"
 *   lastName=""
 *   profession="Estudiante"
 *   avatarUrl="https://example.com/avatar.jpg"
 * />
 * ```
 *
 * @param props           Propiedades del componente.
 * @param props.firstName Nombre de pila.
 * @param props.lastName  Apellido (opcional).
 * @param props.profession Profesión o cargo.
 * @param props.avatarUrl URL de la imagen de avatar (opcional).
 * @returns Elemento React <article> con la tarjeta renderizada.
 */
export const ProfileCard = ({
  firstName = DEFAULT_PROPS.firstName,
  lastName = DEFAULT_PROPS.lastName,
  profession = DEFAULT_PROPS.profession,
  avatarUrl,
}: ProfileCardProps) => {
  /**
   * Nombre completo: firstName + lastName (con espacio solo si lastName no es vacío).
   * Se usa useMemo para evitar recálculos innecesarios en re-renders.
   */
  const fullName = useMemo(() => {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    return trimmedLast ? `${trimmedFirst} ${trimmedLast}` : trimmedFirst;
  }, [firstName, lastName]);

  /**
   * Iniciales para el avatar de fallback.
   * Toma la primera letra de firstName y la primera de lastName (si existe).
   * Si ambas están vacías, muestra "?".
   */
  const initials = useMemo(() => {
    const firstChar = firstName.trim().charAt(0).toUpperCase();
    const lastChar = lastName.trim().charAt(0).toUpperCase();
    return `${firstChar}${lastChar}` || '?';
  }, [firstName, lastName]);

  return (
    // <article> es la etiqueta semántica correcta: contenido autocontenido.
    <article
      className={styles.card}
      aria-label={`Tarjeta de perfil de ${fullName}`}
    >
      {/* ============ BANNER DECORATIVO SUPERIOR ============
          Gradiente animado. aria-hidden porque es meramente visual. */}
      <div className={styles.banner} aria-hidden="true" />

      {/* ============ CONTENIDO INTERIOR ============
          Agrupa avatar + datos textuales. */}
      <div className={styles.inner}>
        {/* ============ AVATAR ============
            Wrapper relativo para solapar el avatar sobre el banner.
            Renderiza SIEMPRE el fallback de iniciales.
            Si avatarUrl existe y carga bien, la imagen lo tapa.
            Si falla la carga, onError oculta la img → se ven las iniciales. */}
        <div className={styles.avatarWrapper}>
          {avatarUrl ? (
            <img
              className={styles.avatar}
              src={avatarUrl}
              alt={`Retrato de ${fullName}`}
              loading="lazy"
              /* Si la imagen falla, ocúltala para mostrar el fallback. */
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}

          {/* Fallback de iniciales — siempre presente en el DOM. */}
          <span className={styles.avatarFallback} aria-hidden="true">
            {initials}
          </span>
        </div>

        {/* ============ DATOS TEXTUALES ============ */}
        <header className={styles.header}>
          {/* Nombre completo. Si es muy largo, trunca con ellipsis vía CSS. */}
          <h2 className={styles.name} title={fullName}>
            {fullName}
          </h2>

          {/* Profesión / cargo. Resaltado con color de acento vía variables CSS. */}
          <p className={styles.profession}>{profession}</p>
        </header>
      </div>
    </article>
  );
};

export default ProfileCard;
