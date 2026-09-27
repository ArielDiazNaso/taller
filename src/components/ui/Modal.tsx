import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ModalContextValue {
  readonly open: boolean;
  readonly close: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

interface ModalRootProps {
  readonly open: boolean;
  readonly onOpenChange: (next: boolean) => void;
  readonly children: React.ReactNode;
}

export function Modal({ open, onOpenChange, children }: ModalRootProps) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const value = useMemo<ModalContextValue>(() => ({ open, close }), [open, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <ModalContext.Provider value={value}>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="presentation"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              key="modal-content"
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className={cn(
                "relative z-10 w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl",
                "bg-card border border-border shadow-2xl",
              )}
            >
              <div className="overflow-y-auto max-h-[90vh] no-scrollbar">
                {children}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export interface ModalHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly showClose?: boolean;
  readonly className?: string;
}

export function ModalHeader({
  title,
  description,
  showClose = true,
  className,
}: ModalHeaderProps) {
  const ctx = useContext(ModalContext);
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 p-6 border-b border-border sticky top-0 bg-card/90 backdrop-blur z-10",
        className,
      )}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="heading-md">{title}</h3>
        {description ? (
          <p className="paragraph text-sm">{description}</p>
        ) : null}
      </div>
      {showClose && ctx ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={ctx.close}
          aria-label="Cerrar modal"
          className="shrink-0 -mt-1 -mr-1"
        >
          <X className="h-5 w-5" />
        </Button>
      ) : null}
    </div>
  );
}

export interface ModalContentProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function ModalContent({ children, className }: ModalContentProps) {
  return <div className={cn("p-6 space-y-6", className)}>{children}</div>;
}

export interface ModalFooterProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-6 pt-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
