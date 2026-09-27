import React, { useState, useEffect, useRef } from "react";
import {
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Edit2,
  FolderGit2,
  Upload,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  loginAdmin,
  updateProfile,
  saveExperienceItem,
  deleteExperienceItem,
  saveProjectItem,
  deleteProjectItem,
} from "@/lib/services";
import type { UserProfile, ExperienceItem, Project, ProjectTag } from "@/types/portfolio";
import { ExperienceType } from "@/types/portfolio";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  experience: readonly ExperienceItem[];
  projects?: readonly Project[];
  tags?: readonly ProjectTag[];
  onDataUpdated: () => Promise<void>;
}

async function processImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => reject(new Error("No se pudo procesar la imagen seleccionada."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo."));
    reader.readAsDataURL(file);
  });
}

export function AdminModal({
  isOpen,
  onClose,
  profile,
  experience,
  projects = [],
  tags = [],
  onDataUpdated,
}: AdminModalProps) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("portfolio_admin_token")
  );
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "profile" | "experience">("projects");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Perfil form
  const [profileForm, setProfileForm] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    title: profile?.title || "",
    tagline: profile?.tagline || "",
    bio: profile?.bio || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
  });

  // Trayectoria form
  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem> | null>(null);

  // Proyectos form
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        title: profile.title || "",
        tagline: profile.tagline || "",
        bio: profile.bio || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await loginAdmin(password);
    setLoading(false);
    if (res.success && res.data?.token) {
      setToken(res.data.token);
      localStorage.setItem("portfolio_admin_token", res.data.token);
      setPassword("");
    } else {
      setError(res.error || "Contraseña inválida");
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("portfolio_admin_token");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    const updated: UserProfile = {
      ...profile,
      ...profileForm,
    };

    const res = await updateProfile(updated, token);
    setLoading(false);

    if (res.success) {
      setSuccess("¡Perfil actualizado con éxito en Turso!");
      await onDataUpdated();
      setTimeout(() => setSuccess(null), 3000);
    } else {
      if (res.error?.includes("No autorizado")) {
        handleLogout();
      }
      setError(res.error || "Error al actualizar perfil");
    }
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingExp) return;
    setLoading(true);
    setError(null);

    const isEdit = Boolean(editingExp.id);
    const res = await saveExperienceItem(editingExp, token, isEdit);
    setLoading(false);

    if (res.success) {
      setSuccess("Experiencia guardada correctamente.");
      setEditingExp(null);
      await onDataUpdated();
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(res.error || "Error al guardar experiencia");
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!token || !window.confirm("¿Seguro que deseas eliminar este elemento?")) return;
    setLoading(true);
    const res = await deleteExperienceItem(id, token);
    setLoading(false);
    if (res.success) {
      await onDataUpdated();
    } else {
      setError(res.error || "Error al eliminar");
    }
  };

  // Image upload handling for projects
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      setError(null);
      const dataUrl = await processImageFile(file);
      setEditingProject((prev) => ({
        ...prev,
        imageUrl: dataUrl,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProject) return;
    if (!editingProject.title?.trim()) {
      setError("Debes ingresar un nombre para el proyecto.");
      return;
    }
    if (!editingProject.shortDescription?.trim()) {
      setError("Debes ingresar el detalle o descripción del proyecto.");
      return;
    }
    if (!editingProject.imageUrl?.trim()) {
      setError("Debes agregar una imagen como portada (subir archivo o ingresar URL).");
      return;
    }

    setLoading(true);
    setError(null);

    const isEdit = Boolean(editingProject.id);
    const payload: Partial<Project> = {
      ...editingProject,
      longDescription: editingProject.longDescription || editingProject.shortDescription,
      featured: editingProject.featured ?? false,
      tagIds: editingProject.tagIds || [],
      order: editingProject.order ?? (projects.length + 1),
    };

    const res = await saveProjectItem(payload, token, isEdit);
    setLoading(false);

    if (res.success) {
      setSuccess(isEdit ? "¡Proyecto actualizado con éxito!" : "¡Proyecto creado con éxito!");
      setEditingProject(null);
      await onDataUpdated();
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(res.error || "Error al guardar el proyecto.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token || !window.confirm("¿Seguro que deseas eliminar este proyecto del portafolio?")) return;
    setLoading(true);
    setError(null);
    const res = await deleteProjectItem(id, token);
    setLoading(false);
    if (res.success) {
      setSuccess("Proyecto eliminado correctamente.");
      await onDataUpdated();
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(res.error || "Error al eliminar proyecto.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-card border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Panel de Control (Turso SQL)</h2>
          </div>
          <div className="flex items-center gap-2">
            {token && (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs">
                <LogOut className="w-4 h-4 mr-1" /> Cerrar Sesión
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 text-sm text-green-500 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {!token ? (
            <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto py-8">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">Acceso Administrador</h3>
                <p className="text-sm text-muted-foreground">
                  Ingresa tu contraseña para editar tus proyectos y contenido guardado en Turso.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contraseña</label>
                <Input
                  id="admin-password-input"
                  type="password"
                  placeholder="Tu contraseña..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verificando..." : "Ingresar"}
              </Button>
            </form>
          ) : (
            <div>
              {/* Tabs */}
              <div className="flex gap-2 border-b pb-3 mb-6">
                <Button
                  variant={activeTab === "projects" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setActiveTab("projects");
                    setEditingExp(null);
                  }}
                  className="gap-1.5"
                >
                  <FolderGit2 className="w-4 h-4" /> Proyectos
                </Button>
                <Button
                  variant={activeTab === "profile" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setActiveTab("profile");
                    setEditingExp(null);
                    setEditingProject(null);
                  }}
                >
                  Perfil & Carrera
                </Button>
                <Button
                  variant={activeTab === "experience" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setActiveTab("experience");
                    setEditingProject(null);
                  }}
                >
                  Trayectoria / Estudios
                </Button>
              </div>

              {/* TAB PROYECTOS */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  {editingProject ? (
                    <form onSubmit={handleSaveProject} className="p-5 rounded-xl border bg-muted/20 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <h4 className="font-semibold text-base flex items-center gap-2">
                          <FolderGit2 className="w-5 h-5 text-primary" />
                          {editingProject.id ? "Editar Proyecto" : "Nuevo Proyecto"}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingProject(null)}
                        >
                          Cancelar
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nombre del proyecto */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground">
                            Nombre del Proyecto <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="project-title-input"
                            placeholder="Ej: E-Commerce con React y Node"
                            value={editingProject.title || ""}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, title: e.target.value })
                            }
                            required
                          />
                        </div>

                        {/* Link del repositorio */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                            <Github className="w-3.5 h-3.5" /> Link del Repositorio (GitHub)
                          </label>
                          <Input
                            id="project-repo-input"
                            placeholder="https://github.com/usuario/proyecto"
                            value={editingProject.repoUrl || ""}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, repoUrl: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Link demo opcional */}
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                          <ExternalLink className="w-3.5 h-3.5" /> Link de Demo / Despliegue (Opcional)
                        </label>
                        <Input
                          id="project-demo-input"
                          placeholder="https://mi-proyecto.vercel.app"
                          value={editingProject.demoUrl || ""}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, demoUrl: e.target.value })
                          }
                        />
                      </div>

                      {/* Detalle / Descripción */}
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">
                          Detalle / Descripción del Proyecto <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                          id="project-desc-textarea"
                          rows={3}
                          placeholder="Describe qué hace este proyecto, características principales, tecnologías utilizadas, etc."
                          value={editingProject.shortDescription || ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              shortDescription: e.target.value,
                              longDescription: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      {/* Imagen de portada */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5" /> Imagen de Portada{" "}
                          <span className="text-destructive">*</span>
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                          {/* File upload */}
                          <div className="space-y-1">
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              onChange={handleImageFileChange}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full gap-2 border-dashed py-6"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="w-4 h-4 text-primary" />
                              Subir foto desde tu computadora
                            </Button>
                            <p className="text-[11px] text-muted-foreground text-center">
                              Se comprime automáticamente para carga rápida.
                            </p>
                          </div>

                          {/* O pegar URL */}
                          <div className="space-y-1">
                            <Input
                              id="project-image-url-input"
                              placeholder="O pega aquí una URL de imagen..."
                              value={
                                editingProject.imageUrl?.startsWith("data:")
                                  ? "[Imagen cargada desde archivo]"
                                  : editingProject.imageUrl || ""
                              }
                              onChange={(e) =>
                                setEditingProject({ ...editingProject, imageUrl: e.target.value })
                              }
                            />
                            <p className="text-[11px] text-muted-foreground">
                              Puedes pegar un link directo (Unsplash, Imgur, etc.)
                            </p>
                          </div>
                        </div>

                        {/* Vista previa de la portada */}
                        {editingProject.imageUrl && (
                          <div className="relative mt-2 rounded-lg overflow-hidden border max-w-sm h-36 bg-black/10 flex items-center justify-center">
                            <img
                              src={editingProject.imageUrl}
                              alt="Vista previa de portada"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setEditingProject({ ...editingProject, imageUrl: "" })}
                              className="absolute top-2 right-2 p-1 bg-black/70 hover:bg-destructive text-white rounded-full transition-colors"
                              title="Eliminar imagen"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Opciones adicionales: Destacado */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="featured-checkbox"
                          checked={Boolean(editingProject.featured)}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              featured: e.target.checked,
                            })
                          }
                          className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor="featured-checkbox"
                          className="text-xs font-medium cursor-pointer flex items-center gap-1 text-foreground"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          Marcar como proyecto destacado (aparece primero con insignia)
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setEditingProject(null)}
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" disabled={loading} className="gap-1.5">
                          <Save className="w-4 h-4" />
                          {loading ? "Guardando en Turso..." : "Guardar Proyecto"}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="font-semibold text-sm">Tus Proyectos</h4>
                          <p className="text-xs text-muted-foreground">
                            Carga y gestiona tus proyectos almacenados en la base de datos Turso.
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() =>
                            setEditingProject({
                              title: "",
                              shortDescription: "",
                              longDescription: "",
                              imageUrl: "",
                              repoUrl: "",
                              demoUrl: "",
                              featured: false,
                              order: projects.length + 1,
                              tagIds: [],
                              screenshots: [],
                            })
                          }
                          className="gap-1.5"
                        >
                          <Plus className="w-4 h-4" /> Agregar Proyecto
                        </Button>
                      </div>

                      {projects.length === 0 ? (
                        <div className="text-center py-10 border border-dashed rounded-xl space-y-3 bg-muted/10">
                          <FolderGit2 className="w-10 h-10 mx-auto text-muted-foreground opacity-50" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Aún no hay proyectos cargados</p>
                            <p className="text-xs text-muted-foreground">
                              Haz clic en "Agregar Proyecto" para publicar tu primer trabajo con nombre, detalle, link y portada.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {projects.map((proj) => (
                            <div
                              key={proj.id}
                              className="flex items-center justify-between p-3.5 rounded-xl border bg-card text-card-foreground hover:border-primary/50 transition-colors gap-3"
                            >
                              <div className="flex items-center gap-3.5 overflow-hidden">
                                {proj.imageUrl ? (
                                  <img
                                    src={proj.imageUrl}
                                    alt={proj.title}
                                    className="w-14 h-14 rounded-lg object-cover border shrink-0 bg-muted"
                                  />
                                ) : (
                                  <div className="w-14 h-14 rounded-lg border flex items-center justify-center bg-muted shrink-0 text-muted-foreground">
                                    <FolderGit2 className="w-6 h-6" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm truncate">
                                      {proj.title}
                                    </span>
                                    {proj.featured && (
                                      <Badge variant="primary" className="text-[10px] py-0 px-1.5 h-4 gap-0.5">
                                        <Star className="w-2.5 h-2.5 fill-current" /> Destacado
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                    {proj.shortDescription}
                                  </p>
                                  {proj.repoUrl && (
                                    <a
                                      href={proj.repoUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[11px] text-primary hover:underline inline-flex items-center gap-1 mt-1"
                                    >
                                      <Github className="w-3 h-3" /> Repositorio
                                    </a>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setEditingProject(proj)}
                                  title="Editar proyecto"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteProject(proj.id)}
                                  title="Eliminar proyecto"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB PERFIL */}
              {activeTab === "profile" && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Nombre</label>
                      <Input
                        id="profile-firstname-input"
                        value={profileForm.firstName}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, firstName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Apellido</label>
                      <Input
                        id="profile-lastname-input"
                        value={profileForm.lastName}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, lastName: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Título Principal / Carrera</label>
                    <Input
                      id="profile-title-input"
                      value={profileForm.title}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, title: e.target.value })
                      }
                      placeholder="Ej: Desarrollador Full Stack / Licenciado"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Lema o Tagline</label>
                    <Input
                      id="profile-tagline-input"
                      value={profileForm.tagline}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, tagline: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Biografía (Sobre Mí)</label>
                    <Textarea
                      id="profile-bio-textarea"
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, bio: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Email de Contacto</label>
                      <Input
                        id="profile-email-input"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Ubicación</label>
                      <Input
                        id="profile-location-input"
                        value={profileForm.location}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, location: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button type="submit" disabled={loading} className="gap-2">
                      <Save className="w-4 h-4" />
                      {loading ? "Guardando..." : "Guardar en Turso"}
                    </Button>
                  </div>
                </form>
              )}

              {/* TAB EXPERIENCIA */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  {editingExp ? (
                    <form onSubmit={handleSaveExp} className="p-4 rounded-xl border bg-muted/20 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm">
                          {editingExp.id ? "Editar Elemento" : "Agregar Carrera / Trabajo"}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingExp(null)}
                        >
                          Cancelar
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Título / Carrera</label>
                          <Input
                            id="exp-title-input"
                            value={editingExp.title || ""}
                            onChange={(e) =>
                              setEditingExp({ ...editingExp, title: e.target.value })
                            }
                            placeholder="Ej: Licenciatura en Sistemas"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Institución / Empresa</label>
                          <Input
                            id="exp-institution-input"
                            value={editingExp.institution || ""}
                            onChange={(e) =>
                              setEditingExp({ ...editingExp, institution: e.target.value })
                            }
                            placeholder="Ej: Universidad / Empresa"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Tipo</label>
                          <select
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                            value={editingExp.type || "education"}
                            onChange={(e) =>
                              setEditingExp({
                                ...editingExp,
                                type: e.target.value as ExperienceType,
                              })
                            }
                          >
                            <option value="education">Educación / Carrera</option>
                            <option value="work">Experiencia Laboral</option>
                            <option value="achievement">Logro / Certificación</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Inicio</label>
                          <Input
                            id="exp-start-input"
                            value={editingExp.startDate || ""}
                            onChange={(e) =>
                              setEditingExp({ ...editingExp, startDate: e.target.value })
                            }
                            placeholder="Ej: 2021"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Fin (o Presente)</label>
                          <Input
                            id="exp-end-input"
                            value={editingExp.endDate || ""}
                            onChange={(e) =>
                              setEditingExp({ ...editingExp, endDate: e.target.value })
                            }
                            placeholder="Ej: Presente"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Descripción</label>
                        <Textarea
                          id="exp-description-input"
                          rows={2}
                          value={editingExp.description || ""}
                          onChange={(e) =>
                            setEditingExp({ ...editingExp, description: e.target.value })
                          }
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="submit" disabled={loading}>
                          <Save className="w-4 h-4 mr-1" />{" "}
                          {loading ? "Guardando..." : "Guardar"}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          Administra tu trayectoria o estudios.
                        </p>
                        <Button
                          size="sm"
                          onClick={() =>
                            setEditingExp({
                              title: "",
                              institution: "",
                              type: ExperienceType.EDUCATION,
                              startDate: "",
                              endDate: "Presente",
                              description: "",
                              bulletPoints: [],
                              order: experience.length + 1,
                              location: "",
                              relatedSkillsIds: [],
                            })
                          }
                        >
                          <Plus className="w-4 h-4 mr-1" /> Agregar Carrera / Item
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {experience.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 rounded-lg border bg-card text-card-foreground hover:border-primary/50 transition-colors"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{item.title}</span>
                                <Badge variant="outline" className="text-xs">
                                  {item.type === "education"
                                    ? "Estudio"
                                    : item.type === "work"
                                    ? "Trabajo"
                                    : "Logro"}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {item.institution} • {item.startDate} -{" "}
                                {item.endDate || "Presente"}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setEditingExp(item)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteExp(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
