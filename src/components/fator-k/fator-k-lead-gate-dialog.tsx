"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type AppLocale } from "@/i18n/routing";

const LEAD_ORIGIN = "fator_k_extrato";

type FormData = {
  nome: string;
  telefone: string;
  email: string;
};

type FatorKLeadGateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (leadId: string) => void;
};

export function FatorKLeadGateDialog({
  open,
  onOpenChange,
  onSuccess,
}: FatorKLeadGateDialogProps) {
  const t = useTranslations("fatorK.extratoCta");
  const locale = useLocale() as AppLocale;
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const schema = z.object({
    nome: z.string().min(2, t("validation.name")),
    telefone: z.string().min(8, t("validation.phone")),
    email: z.string().email(t("validation.email")),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", telefone: "", email: "" },
  });

  async function onSubmit(data: FormData) {
    setSubmitError(null);
    setPending(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          telefone: data.telefone,
          email: data.email,
          resumo: t("leadResumo"),
          locale,
          origem: LEAD_ORIGIN,
        }),
      });
      if (!res.ok) {
        setSubmitError(t("errorGeneric"));
        return;
      }
      const body = (await res.json()) as { ok?: boolean; leadId?: string };
      if (!body.leadId) {
        setSubmitError(t("errorGeneric"));
        return;
      }
      form.reset();
      onSuccess(body.leadId);
      onOpenChange(false);
    } catch {
      setSubmitError(t("errorGeneric"));
    } finally {
      setPending(false);
    }
  }

  function handleOpenChange(value: boolean) {
    if (!value) {
      form.reset();
      setSubmitError(null);
    }
    onOpenChange(value);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-none sm:max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="uppercase tracking-wider text-base">
              {t("leadTitle")}
            </DialogTitle>
            <DialogDescription>{t("leadDescription")}</DialogDescription>
          </DialogHeader>

          <div className="mt-4 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fator-k-lead-nome">{t("fields.nameLabel")}</Label>
              <Input
                id="fator-k-lead-nome"
                placeholder={t("fields.namePlaceholder")}
                className="rounded-none"
                autoComplete="name"
                {...form.register("nome")}
              />
              {form.formState.errors.nome && (
                <p className="text-xs text-destructive">{form.formState.errors.nome.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fator-k-lead-telefone">{t("fields.phoneLabel")}</Label>
              <Input
                id="fator-k-lead-telefone"
                type="tel"
                placeholder={t("fields.phonePlaceholder")}
                className="rounded-none"
                autoComplete="tel"
                {...form.register("telefone")}
              />
              {form.formState.errors.telefone && (
                <p className="text-xs text-destructive">{form.formState.errors.telefone.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fator-k-lead-email">{t("fields.emailLabel")}</Label>
              <Input
                id="fator-k-lead-email"
                type="email"
                placeholder={t("fields.emailPlaceholder")}
                className="rounded-none"
                autoComplete="email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
              <p className="text-xs text-muted-foreground">{t("fields.emailHelp")}</p>
            </div>

            {submitError && <p className="text-sm text-destructive">{submitError}</p>}
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              disabled={pending}
              className="w-full rounded-none bg-black text-white hover:bg-black/90"
            >
              {pending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}
              {t("leadSubmit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
