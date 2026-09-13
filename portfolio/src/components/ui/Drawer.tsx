import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type DrawerSide = "left" | "right";

interface DrawerContextValue {
  readonly open: boolean;
  readonly close: () => void;
  readonly side: DrawerSide;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export function useDrawer(): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used inside Drawer");
  return ctx;
}

interface DrawerProps {
  readonly open: boolean;
  readonly onOpenChange: (next: boolean) => void;
  readonly side?: DrawerSide;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
}

export function Drawer({
  open,
  onOpenChange,
  side = "right",
  children,
  className,
  ariaLabel,
}: DrawerProps) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const value = useMemo<DrawerContextValue>(
    () => ({ open, close, side }),
    [open, close, side],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const variantsX = side === "right" ? { closed: "100%", open: "0%" } : { closed: "-100%", open: "0%" };

  return (
    <DrawerContext.Provider value={value}>
      <AnimatePresence>
        {open ? (
          <div
            className="fixed inset-0 z-50"
            role="presentation"
          >
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer-panel"
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel ?? "Menú lateral"}
              initial={{ x: variantsX.closed }}
              animate={{ x: variantsX.open }}
              exit={{ x: variantsX.closed }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "absolute top-0 bottom-0 w-[min(86vw,360px)]",
                side === "right" ? "right-0" : "left-0",
                "bg-card border-border shadow-2xl overflow-hidden",
                side === "right" ? "border-l" : "border-r",
                className,
              )}
            >
              <div className="h-full overflow-y-auto no-scrollbar">
                {children}
              </div>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </DrawerContext.Provider>
  );
}

export interface DrawerHeaderProps {
  readonly title?: React.ReactNode;
  readonly showClose?: boolean;
  readonly className?: string;
}

export function DrawerHeader({
  title,
  showClose = true,
  className,
}: DrawerHeaderProps) {
  const { close } = useDrawer();
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-5 py-4 border-b border-border sticky top-0 bg-card/90 backdrop-blur",
        className,
      )}
    >
      <div className="font-semibold text-foreground min-w-0 truncate">
        {title}
      </div>
      {showClose ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={close}
          aria-label="Cerrar menú"
          className="shrink-0"
        >
          <X className="h-5 w-5" />
        </Button>
      ) : null}
    </div>
  );
}

export interface DrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DrawerContent({
  children,
  className,
  ...props
}: DrawerContentProps) {
  return (
    <div
      className={cn("p-4 sm:p-5 space-y-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
