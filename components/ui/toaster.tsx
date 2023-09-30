"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { TOAST_LIMIT, toast, useToast } from "@/components/ui/use-toast";
import { SwipeDirection } from "@radix-ui/react-toast";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  XCircle,
} from "lucide-react";
import React, { useEffect } from "react";

export function Toaster() {
  const { toasts } = useToast();

  useEffect(() => {
    for (let i = 0; i < TOAST_LIMIT; i++) {
      toast({
        description: "load toast viewport",
        className: "hidden pointer-events-none",
        duration: 1,
      });
    }
  }, []);

  return (
    <ToastProvider
      swipeDirection={toasts[0]?.position?.split("-")[1] as SwipeDirection}
    >
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <React.Fragment key={id}>
            <Toast className="mt-2" {...props}>
              <div className="flex items-center gap-3">
                {props.variant === "info" && <InfoIcon />}
                {props.variant === "success" && <CheckCircle2Icon />}
                {props.variant === "warning" && <AlertTriangleIcon />}
                {props.variant === "destructive" && <XCircle />}
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              </div>
              {action}
              <ToastClose />
            </Toast>
            <ToastViewport position={props?.position} />
          </React.Fragment>
        );
      })}
    </ToastProvider>
  );
}
