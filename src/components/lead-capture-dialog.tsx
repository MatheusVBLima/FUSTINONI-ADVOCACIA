"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Send } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl, buildLeadWhatsAppMessage } from "@/lib/whatsapp";

const step1Schema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  telefone: z.string().min(10, "Informe um telefone válido"),
  email: z.string().email("Informe um e-mail válido"),
});

const step2Schema = z.object({
  resumo: z.string().min(1, "Descreva brevemente o que deseja tratar"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

type LeadCaptureDialogProps = {
  children: React.ReactNode;
  whatsappPhone: string;
  whatsappBaseMessage?: string;
};

export function LeadCaptureDialog({
  children,
  whatsappPhone,
  whatsappBaseMessage,
}: LeadCaptureDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { nome: "", telefone: "", email: "" },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { resumo: "" },
  });

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      setStep(1);
      setStep1Data(null);
      step1Form.reset();
      step2Form.reset();
    }
  }

  function onStep1Submit(data: Step1Data) {
    setStep1Data(data);
    setStep(2);
  }

  async function onStep2Submit(data: Step2Data) {
    if (!step1Data) return;

    setIsSubmitting(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: step1Data.nome,
          telefone: step1Data.telefone,
          email: step1Data.email,
          resumo: data.resumo,
        }),
      });
    } catch {
      // Não bloqueia o redirecionamento ao WhatsApp
    }

    const message = buildLeadWhatsAppMessage(
      step1Data.nome,
      step1Data.email,
      data.resumo,
      whatsappBaseMessage,
    );

    const url = buildWhatsAppUrl(whatsappPhone, message);
    window.open(url, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="rounded-none sm:max-w-md">
        {step === 1 && (
          <form onSubmit={step1Form.handleSubmit(onStep1Submit)}>
            <DialogHeader>
              <DialogTitle className="uppercase tracking-wider text-base">
                Dados para contato
              </DialogTitle>
              <DialogDescription>
                Preencha seus dados para que possamos atendê-lo melhor.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  placeholder="Seu nome completo"
                  className="rounded-none"
                  {...step1Form.register("nome")}
                />
                {step1Form.formState.errors.nome && (
                  <p className="text-xs text-destructive">
                    {step1Form.formState.errors.nome.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="rounded-none"
                  {...step1Form.register("telefone")}
                />
                {step1Form.formState.errors.telefone && (
                  <p className="text-xs text-destructive">
                    {step1Form.formState.errors.telefone.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="rounded-none"
                  {...step1Form.register("email")}
                />
                {step1Form.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {step1Form.formState.errors.email.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Confirme seu e-mail após o envio - é por ele que entraremos em
                  contato.
                </p>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full rounded-none bg-black text-white hover:bg-black/90"
              >
                Próximo
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={step2Form.handleSubmit(onStep2Submit)}>
            <DialogHeader>
              <DialogTitle className="uppercase tracking-wider text-base">
                Sobre o que deseja tratar?
              </DialogTitle>
              <DialogDescription>
                Descreva brevemente o assunto para que nossa equipe já tenha
                contexto ao atendê-lo.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="resumo">Resumo</Label>
                <Textarea
                  id="resumo"
                  placeholder="Ex.: Preciso de orientação sobre um contrato de compra e venda..."
                  className="min-h-[120px] rounded-none"
                  {...step2Form.register("resumo")}
                />
                {step2Form.formState.errors.resumo && (
                  <p className="text-xs text-destructive">
                    {step2Form.formState.errors.resumo.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="rounded-none"
                onClick={() => setStep(1)}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-none bg-black text-white hover:bg-black/90"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Send className="mr-2 size-4" />
                )}
                Enviar e abrir WhatsApp
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
