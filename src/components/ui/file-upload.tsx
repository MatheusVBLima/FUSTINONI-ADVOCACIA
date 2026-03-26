"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  title,
  subtitle,
  dropHint,
  modifiedPrefix = "Modified",
  accept,
  disabled,
  variant = "default",
}: {
  onChange?: (files: File[]) => void;
  title?: string;
  subtitle?: string;
  dropHint?: string;
  modifiedPrefix?: string;
  accept?: string;
  disabled?: boolean;
  /** Dark section (e.g. black bg); avoids light-theme placeholder on non-dark html. */
  variant?: "default" | "dark";
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDark = variant === "dark";

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    disabled: Boolean(disabled),
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={() => !disabled && handleClick()}
        whileHover={disabled || isDark ? undefined : "animate"}
        className={cn(
          "group/file relative block w-full overflow-hidden rounded-lg p-10",
          /* Dark: parent section already provides the outer card — no second border/bg */
          isDark && "rounded-none border-0 bg-transparent p-0 shadow-none",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        )}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        {!isDark && (
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <p
            className={cn(
              "relative z-20 text-center font-sans text-base font-bold",
              isDark ? "text-white" : "text-neutral-700 dark:text-neutral-300",
            )}
          >
            {title ?? "Upload file"}
          </p>
          <p
            className={cn(
              "relative z-20 mt-2 max-w-md text-center font-sans text-sm font-normal sm:text-base",
              isDark ? "text-white/70" : "text-neutral-500 dark:text-neutral-400",
            )}
          >
            {subtitle ?? "Drag or drop your files here or click to upload"}
          </p>
          <div
            className={cn(
              "relative mx-auto w-full",
              isDark ? "mt-6 max-w-none" : "mt-10 max-w-xl",
            )}
          >
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md p-4 md:h-24",
                    isDark
                      ? "border border-white/15 bg-zinc-800 shadow-none"
                      : "rounded-md bg-white shadow-sm dark:bg-neutral-900",
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className={cn(
                        "max-w-xs truncate text-base",
                        isDark ? "text-white" : "text-neutral-700 dark:text-neutral-300",
                      )}
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className={cn(
                        "w-fit shrink-0 rounded-lg px-2 py-1 text-sm",
                        isDark
                          ? "bg-white/10 text-white/90"
                          : "shadow-input text-neutral-600 dark:bg-neutral-800 dark:text-white",
                      )}
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div
                    className={cn(
                      "mt-2 flex w-full flex-col items-start justify-between text-sm md:flex-row md:items-center",
                      isDark ? "text-white/55" : "text-neutral-600 dark:text-neutral-400",
                    )}
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className={cn(
                        "rounded-md px-1 py-0.5",
                        isDark ? "bg-white/10" : "bg-gray-100 dark:bg-neutral-800",
                      )}
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      {modifiedPrefix}{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && isDark && (
              <motion.div
                layoutId="file-upload"
                className={cn(
                  "relative z-40 mx-auto flex min-h-[148px] w-full flex-col items-center justify-center gap-3 rounded-none border border-dashed px-6 py-8 transition-colors",
                  "border-white/25 bg-black/25",
                  "group-hover/file:border-white/40 group-hover/file:bg-black/35",
                  isDragActive && "border-white/45 bg-black/40",
                )}
              >
                <IconUpload
                  className="h-9 w-9 text-white/60"
                  stroke={1.25}
                  aria-hidden
                />
                <p
                  className={cn(
                    "max-w-sm text-center text-sm",
                    isDragActive ? "font-semibold text-white" : "text-white/70",
                  )}
                >
                  {dropHint ?? "Drop PDF here"}
                </p>
              </motion.div>
            )}
            {!files.length && !isDark && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white group-hover/file:shadow-2xl dark:bg-neutral-900",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-neutral-600"
                  >
                    {dropHint ?? "Drop it"}
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && !isDark && (
              <motion.div
                variants={secondaryVariant}
                className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-gray-100 dark:bg-neutral-900">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`flex h-10 w-10 shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:bg-neutral-950 dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        }),
      )}
    </div>
  );
}
