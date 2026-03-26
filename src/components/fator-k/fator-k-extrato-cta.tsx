"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { z } from "zod/v4";

import { GridBackground } from "@/components/grid-background-demo";
import { Button } from "@/components/ui/button";
import { Compare } from "@/components/ui/compare";
import { FileUpload } from "@/components/ui/file-upload";

import { WhatsAppCTAButton } from "@/components/whatsapp-cta-button";

import { FatorKLeadGateDialog } from "./fator-k-lead-gate-dialog";

type FatorKExtratoCtaProps = {
  whatsappPhone: string;
};

type AnalysisPhase = "ready" | "running" | "complete";

const PROGRESS_STEPS = [
  { key: "progressUploading" as const, pct: 20, delay: 0 },
  { key: "progressExtracting" as const, pct: 55, delay: 1500 },
  { key: "progressSearching" as const, pct: 85, delay: 4000 },
];

function useProgressSteps(running: boolean) {
  const [stepIndex, setStepIndex] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!running) {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setStepIndex(0);
      return;
    }
    for (let i = 1; i < PROGRESS_STEPS.length; i++) {
      timers.current.push(
        setTimeout(() => setStepIndex(i), PROGRESS_STEPS[i].delay),
      );
    }
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [running]);

  const step = PROGRESS_STEPS[stepIndex];
  return { label: step.key, pct: step.pct };
}

/** Dev-only: UUID of an existing lead with origem `fator_k_extrato`. Remove env before shipping. */
function readFatorKDevLeadId(): string | null {
  if (process.env.NODE_ENV !== "development") return null;
  const raw = process.env.NEXT_PUBLIC_FATOR_K_DEV_LEAD_ID?.trim();
  if (!raw) return null;
  const parsed = z.string().uuid().safeParse(raw);
  return parsed.success ? parsed.data : null;
}

const FATOR_K_DEV_LEAD_BOOTSTRAP = readFatorKDevLeadId();

export function FatorKExtratoCta({ whatsappPhone }: FatorKExtratoCtaProps) {
  const t = useTranslations("fatorK.extratoCta");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const progress = useProgressSteps(analysisRunning);
  const [leadId, setLeadId] = useState<string | null>(FATOR_K_DEV_LEAD_BOOTSTRAP);
  const [gateDone, setGateDone] = useState(FATOR_K_DEV_LEAD_BOOTSTRAP !== null);
  const [analysisPhase, setAnalysisPhase] = useState<AnalysisPhase>("ready");
  const [uploadKey, setUploadKey] = useState(0);
  const [found, setFound] = useState<boolean | null>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file || !gateDone || !leadId) return;
      setAnalyzeError(null);
      setAnalysisPhase("running");
      setAnalysisRunning(true);
      const fd = new FormData();
      fd.append("leadId", leadId);
      fd.append("file", file);
      try {
        const res = await fetch("/api/fator-k/analyze-extract", {
          method: "POST",
          body: fd,
        });
        if (res.status === 415) {
          setAnalyzeError(t("needsPdf"));
          setAnalysisPhase("ready");
          setAnalysisRunning(false);
          setUploadKey(k => k + 1);
          return;
        }
        const payload = (await res.json()) as { code?: string; found?: boolean };
        if (!res.ok) {
          if (payload.code === "STORAGE_UPLOAD_FAILED") {
            setAnalyzeError(t("errorStorage"));
          } else {
            setAnalyzeError(t("errorAnalyze"));
          }
          setAnalysisPhase("ready");
          setAnalysisRunning(false);
          setUploadKey(k => k + 1);
          return;
        }
        const data = payload;
        setFound(Boolean(data.found));
        setAnalysisRunning(false);
        setAnalysisPhase("complete");
      } catch {
        setAnalyzeError(t("errorAnalyze"));
        setAnalysisPhase("ready");
        setAnalysisRunning(false);
        setUploadKey(k => k + 1);
      }
    },
    [gateDone, leadId, t],
  );

  function handleTryAgain() {
    setAnalysisPhase("ready");
    setFound(null);
    setAnalyzeError(null);
    setUploadKey(k => k + 1);
  }

  function handleLeadSuccess(id: string) {
    setLeadId(id);
    setGateDone(true);
    setAnalysisPhase("ready");
  }

  return (
    <section className="relative border-b border-black/15 bg-black px-4 py-16 text-white sm:px-6 sm:py-20 md:px-10">
      <GridBackground variant="dark" className="z-0" />
      <div className="relative z-10 mx-auto max-w-5xl isolate">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-white/80">
          {t("sectionEyebrow")}
        </p>
        <h2 className="mb-12 text-center font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
          {t("sectionTitle")}
        </h2>

        <div className="mb-14 grid gap-6 sm:grid-cols-3">
          {([1, 2, 3] as const).map(n => (
            <div
              key={n}
              className="relative z-[1] flex gap-4 border border-white/20 bg-zinc-950 p-4 sm:min-h-[140px]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/35 text-sm font-bold tabular-nums">
                {n}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight">{t(`step${n}Title`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/72">{t(`step${n}Detail`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <div className="mx-auto w-full max-w-xl sm:max-w-2xl">
            <Compare
              firstImage="/sabesp-compare-without-fator-k.svg?v=6"
              secondImage="/sabesp-compare-with-fator-k.svg?v=6"
              className="aspect-800/520 h-auto w-full overflow-hidden rounded-none border-0 bg-black"
              firstImageClassName="h-full w-full object-cover object-center"
              secondImageClassname="h-full w-full object-cover object-center"
              slideMode="drag"
              autoplay
              autoplayDuration={5000}
              initialSliderPercentage={48}
            />
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-white/45">{t("compareDisclaimer")}</p>
        </div>

        <div className="relative z-[1] mx-auto max-w-xl border border-white/20 bg-zinc-950 p-6 sm:p-8">
          {FATOR_K_DEV_LEAD_BOOTSTRAP ? (
            <p className="mb-4 border border-amber-500/35 bg-amber-500/10 px-3 py-2 text-center text-[11px] leading-snug text-amber-100/95">
              Dev: lead gate skipped. Delete <code className="rounded bg-black/30 px-1">NEXT_PUBLIC_FATOR_K_DEV_LEAD_ID</code> from{" "}
              <code className="rounded bg-black/30 px-1">.env.local</code> when finished testing.
            </p>
          ) : null}
          {!gateDone && (
            <div className="text-center">
              <h3 className="font-serif text-xl sm:text-2xl">{t("idleTitle")}</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/75">
                {t("idleDescription")}
              </p>
              <Button
                type="button"
                className="mt-8 h-[42px] rounded-none bg-white px-8 text-xs font-medium uppercase tracking-wider text-black hover:bg-white/90"
                onClick={() => setDialogOpen(true)}
              >
                {t("idleButton")}
              </Button>
            </div>
          )}

          {gateDone && analysisPhase === "running" && (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <Loader2 className="size-6 animate-spin text-white/70" aria-hidden />
              <span className="text-sm text-white/90">{t(progress.label)}</span>
              <div className="h-1 w-48 overflow-hidden bg-white/10">
                <div
                  className="h-full bg-white/80 transition-all duration-700 ease-out"
                  style={{ width: `${progress.pct}%` }}
                />
              </div>
            </div>
          )}

          {gateDone && analysisPhase === "ready" && (
            <div>
              <FileUpload
                key={uploadKey}
                variant="dark"
                title={t("uploadTitle")}
                subtitle={t("uploadSubtitle")}
                dropHint={t("dropHint")}
                modifiedPrefix={t("modifiedPrefix")}
                accept=".pdf,application/pdf"
                onChange={files => void handleFiles(files)}
              />
              {analyzeError ? (
                <p className="mt-4 whitespace-pre-line text-center text-sm leading-relaxed text-red-300">
                  {analyzeError}
                </p>
              ) : null}
            </div>
          )}

          {gateDone && analysisPhase === "complete" && found !== null && (
            <div className="text-center">
              <h3 className="font-serif text-xl sm:text-2xl">
                {found ? t("resultFoundTitle") : t("resultNotFoundTitle")}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-white/78">
                {found ? t("resultFoundBody") : t("resultNotFoundBody")}
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                {found && whatsappPhone ? (
                  <WhatsAppCTAButton
                    origem="fator_k_extrato_resultado"
                    whatsappPhone={whatsappPhone}
                    whatsappBaseMessage={t("resultFoundWhatsAppMessage")}
                    className="h-[42px] rounded-none bg-white px-8 text-xs font-medium uppercase tracking-wider text-black hover:bg-white/90"
                  >
                    {t("resultFoundCta")}
                  </WhatsAppCTAButton>
                ) : null}
                {!found || !whatsappPhone ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-none border-white/35 text-white hover:bg-white/10"
                    onClick={handleTryAgain}
                  >
                    {t("tryAgain")}
                  </Button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>

      <FatorKLeadGateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleLeadSuccess}
      />
    </section>
  );
}
