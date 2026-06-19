"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { Pencil, X, Check, AlertCircle, Save, Loader2 } from "lucide-react";

interface PendingChange {
  id: string;
  execute: () => Promise<boolean>;
}

interface EditContextType {
  isEditing: boolean;
  isAuthenticated: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  activeBlockKey: string | null;
  setActiveBlockKey: (key: string | null) => void;
  isBlockInteracting: boolean;
  setIsBlockInteracting: (v: boolean) => void;
  notifySave: (ok: boolean, msg?: string) => void;
  // Pending changes system: components register save functions, EditMode triggers them all.
  registerSave: (id: string, fn: () => Promise<boolean>) => void;
  unregisterSave: (id: string) => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (v: boolean) => void;
  saveAll: () => Promise<void>;
  isSaving: boolean;
}

const EditContext = createContext<EditContextType>({
  isEditing: false,
  isAuthenticated: false,
  enableEditing: () => {},
  disableEditing: () => {},
  activeBlockKey: null,
  setActiveBlockKey: () => {},
  isBlockInteracting: false,
  setIsBlockInteracting: () => {},
  notifySave: () => {},
  registerSave: () => {},
  unregisterSave: () => {},
  hasUnsavedChanges: false,
  setHasUnsavedChanges: () => {},
  saveAll: async () => {},
  isSaving: false,
});

export function EditProvider({
  children,
  initialEditing = false,
}: {
  children: React.ReactNode;
  initialEditing?: boolean;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(initialEditing);

  useEffect(() => {
    setIsEditing(initialEditing);
  }, [initialEditing]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeBlockKey, setActiveBlockKey] = useState<string | null>(null);
  const [isBlockInteracting, setIsBlockInteracting] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isEditingRef = useRef(isEditing);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveFnsRef = useRef<Map<string, () => Promise<boolean>>>(new Map());

  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  useEffect(() => {
    fetch("/api/admin/login", { credentials: "include" }).then(r => r.json()).then(d => {
      if (d.isLoggedIn) setIsAuthenticated(true);
    }).catch(() => {});
  }, []);

  // Click outside any editable block to deactivate the toolbar.
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-editable-block]")) {
        setActiveBlockKey(null);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  const notifySave = useCallback((ok: boolean, msg?: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ ok, msg: msg || (ok ? "已保存" : "保存失败") });
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  }, []);

  const registerSave = useCallback((id: string, fn: () => Promise<boolean>) => {
    saveFnsRef.current.set(id, fn);
  }, []);

  const unregisterSave = useCallback((id: string) => {
    saveFnsRef.current.delete(id);
  }, []);

  const saveAll = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    let allOk = true;
    for (const [, fn] of saveFnsRef.current) {
      try {
        const ok = await fn();
        if (!ok) allOk = false;
      } catch {
        allOk = false;
      }
    }
    setIsSaving(false);
    setHasUnsavedChanges(false);
    notifySave(allOk, allOk ? "全部保存成功" : "部分保存失败，请重试");
  }, [isSaving, notifySave]);

  const enableEditing = useCallback(() => {
    if (!isAuthenticated) {
      setShowPassword(true);
      return;
    }
    setIsEditing(true);
  }, [isAuthenticated]);

  const disableEditing = useCallback(() => {
    if (hasUnsavedChanges) {
      if (!confirm("有未保存的更改，确定退出编辑吗？")) return;
    }
    setIsEditing(false);
    setActiveBlockKey(null);
    setIsBlockInteracting(false);
    setHasUnsavedChanges(false);
  }, [hasUnsavedChanges]);

  const handleLogin = async () => {
    setError("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    if (r.ok) {
      setIsAuthenticated(true);
      setIsEditing(true);
      setShowPassword(false);
      setPassword("");
    } else {
      setError("密码错误");
    }
  };

  return (
    <EditContext.Provider value={{
      isEditing,
      isAuthenticated,
      enableEditing,
      disableEditing,
      activeBlockKey,
      setActiveBlockKey,
      isBlockInteracting,
      setIsBlockInteracting,
      notifySave,
      registerSave,
      unregisterSave,
      hasUnsavedChanges,
      setHasUnsavedChanges,
      saveAll,
      isSaving,
    }}>
      {children}

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {/* Save button - only visible in edit mode with unsaved changes */}
        {isEditing && hasUnsavedChanges && (
          <button
            onClick={saveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg text-sm font-medium transition-all duration-300 cursor-pointer bg-green-500 text-white hover:bg-green-600 disabled:opacity-60 disabled:cursor-wait"
            title="保存所有更改"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? "保存中..." : "保存"}
          </button>
        )}

        {/* Edit toggle button */}
        <button
          onClick={isEditing ? disableEditing : enableEditing}
          className={"w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer " +
            (isEditing ? "bg-[#f97316] text-white shadow-amber-200" : "bg-white text-[#1a1a1a]/40 border border-[#1a1a1a]/10 hover:text-[#f97316] hover:border-[#f97316]")}
          title={isEditing ? "退出编辑" : "编辑网站"}
        >
          {isEditing ? <X size={20} /> : <Pencil size={20} />}
        </button>
      </div>

      {/* Password modal */}
      {showPassword && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center" onClick={() => setShowPassword(false)}>
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">验证身份</h3>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="w-full px-4 py-3 rounded-lg border border-[#1a1a1a]/10 focus:border-[#f97316] focus:outline-none mb-3 text-sm"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <div className="flex gap-3">
              <button onClick={() => setShowPassword(false)} className="flex-1 py-3 border border-[#1a1a1a]/10 rounded-lg text-sm hover:bg-[#1a1a1a]/5 cursor-pointer">取消</button>
              <button onClick={handleLogin} className="flex-1 py-3 bg-[#f97316] text-white rounded-lg text-sm font-medium hover:bg-[#ea580c] cursor-pointer">确定</button>
            </div>
          </div>
        </div>
      )}

      {/* Save toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-sm font-medium transition-all duration-300 ${toast.ok ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {toast.ok ? <Check size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}
    </EditContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditContext);
}
