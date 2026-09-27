import React, { useState, useEffect } from "react";
import { Lock, LogOut, Save, Plus, Trash2, X, CheckCircle, AlertCircle, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { loginAdmin, updateProfile, saveExperienceItem, deleteExperienceItem } from "@/lib/services";
import type { UserProfile, ExperienceItem } from "@/types/portfolio";
import { ExperienceType } from "@/types/portfolio";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  experience: readonly ExperienceItem[];
  onDataUpdated: () => Promise<void>;
}

export function AdminModal({
  isOpen,
  onClose,
  profile,
  experience,
  onDataUpdated,
}: AdminModalProps) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("portfolio_admin_token"));
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "experience">("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem> | null>(null);

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
      setSuccess("Experiencia/carrera guardada correctamente.");
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-card border shadow-2xl overflow-hidden">
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
                  Ingresa tu contraseña para editar el contenido guardado en Turso.
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
              <div className="flex gap-2 border-b pb-3 mb-6">
                <Button
                  variant={activeTab === "profile" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => { setActiveTab("profile"); setEditingExp(null); }}
                >
                  Perfil & Carrera
                </Button>
                <Button
                  variant={activeTab === "experience" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("experience")}
                >
                  Trayectoria / Estudios
                </Button>
              </div>

              {activeTab === "profile" && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Nombre</label>
                      <Input
                        id="profile-firstname-input"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Apellido</label>
                      <Input
                        id="profile-lastname-input"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Título Principal / Carrera</label>
                    <Input
                      id="profile-title-input"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      placeholder="Ej: Desarrollador Full Stack / Licenciado"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Lema o Tagline</label>
                    <Input
                      id="profile-tagline-input"
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Biografía (Sobre Mí)</label>
                    <Textarea
                      id="profile-bio-textarea"
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Email de Contacto</label>
                      <Input
                        id="profile-email-input"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Ubicación</label>
                      <Input
                        id="profile-location-input"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
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

              {activeTab === "experience" && (
                <div className="space-y-6">
                  {editingExp ? (
                    <form onSubmit={handleSaveExp} className="p-4 rounded-xl border bg-muted/20 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm">
                          {editingExp.id ? "Editar Elemento" : "Agregar Carrera / Trabajo"}
                        </h4>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setEditingExp(null)}>
                          Cancelar
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Título / Carrera</label>
                          <Input
                            id="exp-title-input"
                            value={editingExp.title || ""}
                            onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                            placeholder="Ej: Licenciatura en Sistemas"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Institución / Empresa</label>
                          <Input
                            id="exp-institution-input"
                            value={editingExp.institution || ""}
                            onChange={(e) => setEditingExp({ ...editingExp, institution: e.target.value })}
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
                            onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value as ExperienceType })}
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
                            onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                            placeholder="Ej: 2021"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Fin (o Presente)</label>
                          <Input
                            id="exp-end-input"
                            value={editingExp.endDate || ""}
                            onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
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
                          onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="submit" disabled={loading}>
                          <Save className="w-4 h-4 mr-1" /> {loading ? "Guardando..." : "Guardar"}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Administra tu trayectoria o estudios.</p>
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
                  )}

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
                              {item.type === "education" ? "Estudio" : item.type === "work" ? "Trabajo" : "Logro"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {item.institution} • {item.startDate} - {item.endDate || "Presente"}
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
      </Card>
    </div>
  );
}
