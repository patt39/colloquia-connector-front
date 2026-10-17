"use client";

import { useControllableState } from "@/components/hooks/use-controllable-state";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { EditIcon, FileTextIcon, UploadIcon } from "lucide-react";
import {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import Dropzone, {
  Accept,
  DropzoneRef,
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";
import { toast } from "sonner";
import { ImageWithFallback } from "./image.with.fallback";
import { AlertDangerNotification } from "@/utils";

declare global {
  interface File {
    preview?: string;
    model?: string;
    path?: string;
  }
}

interface FileUploaderProps extends HTMLAttributes<HTMLDivElement> {
  value?: File[];
  onValueChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  progresses?: Record<string, number>;
  accept?: DropzoneProps["accept"];
  minSize?: DropzoneProps["minSize"];
  maxSize?: DropzoneProps["maxSize"];
  maxFileCount?: DropzoneProps["maxFiles"];
  multiple?: boolean;
  disabled?: boolean;
}

const FileUploader = forwardRef<DropzoneRef, FileUploaderProps>(
  (
    {
      value: valueProp,
      onValueChange,
      onUpload,
      progresses,
      accept = {
        "image/*": [".png", ".jpeg", ".jpg", ".pdf"],
        "application/pdf": [".pdf"],
      },
      minSize,
      maxSize,
      maxFileCount = 1,
      multiple = false,
      disabled,
      className,
      ...dropzoneProps
    },
    ref,
  ) => {
    const [files, setFiles] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
    });
    const filesLength = useMemo(() => (files && files.length) || 0, [files]);

    const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
          AlertDangerNotification({
            description: `Non puoi caricare più di un file alla volta.`,
          });
          return;
        }

        if (filesLength + acceptedFiles.length > maxFileCount) {
          AlertDangerNotification({
            description: `Non puoi caricare più di ${maxFileCount} file.`,
          });
          return;
        }

        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );

        const updatedFiles = files ? [...files, ...newFiles] : newFiles;

        setFiles(updatedFiles);

        if (rejectedFiles.length > 0) {
          rejectedFiles.forEach(({ file }) => {
            AlertDangerNotification({
              description: `Fichier ${file.name} pas accepté.`,
            });
          });
        }

        if (
          onUpload &&
          updatedFiles.length > 0 &&
          updatedFiles.length <= maxFileCount
        ) {
          const target =
            updatedFiles.length > 0 ? `${updatedFiles.length} file` : `file`;

          toast.promise(onUpload(updatedFiles), {
            loading: `Caricando ${target}...`,
            success: () => {
              setFiles([]);
              return `${target} caricato.`;
            },
            error: `Upload de ${target} echoué.`,
          });
        }
      },
      [files, filesLength, maxFileCount, multiple, onUpload, setFiles],
    );

    const onView = (index: number) => {
      if (!files) return;

      if (files[index].size > 0) {
        const urlPreview = files[index] && files[index]?.preview;
        return window.open(urlPreview, "_blank");
      }
      const previewUrl =
        "preview" in files[index] && (files[index].preview as string);
      previewUrl && window.open(previewUrl, "_blank");
    };

    const onRemove = (index: number) => {
      if (!files) return;
      const newFiles = files.filter((_: File, i: number) => i !== index);
      setFiles(newFiles);
      onValueChange && onValueChange(newFiles);
    };

    useEffect(() => {
      return () => {
        if (!files) return;
        files.forEach((file: File & { preview?: string }) => {
          file.preview && URL.revokeObjectURL(file.preview);
        });
      };
    }, []); // eslint-disable-line

    const isDisabled = disabled || filesLength >= maxFileCount;

    return (
      <div className="relative flex flex-col gap-6 overflow-hidden">
        {!isDisabled ? (
          <Dropzone
            ref={ref}
            onDrop={onDrop}
            accept={accept}
            minSize={minSize}
            maxSize={maxSize}
            maxFiles={maxFileCount}
            multiple={maxFileCount > 1 || multiple}
            disabled={isDisabled}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "border-muted-foreground/25 hover:bg-muted/25 group relative grid h-32 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition",
                  "ring-offset-background focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2",
                  isDragActive && "border-muted-foreground/50",
                  isDisabled && "pointer-events-none opacity-60",
                  className,
                )}
                {...dropzoneProps}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <UploadIcon
                        className="text-muted-foreground size-7"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-muted-foreground font-medium">
                      Rilascia il file qui.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <UploadIcon
                        className="text-muted-foreground size-7"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-col gap-px text-sm">
                      <p className="text-muted-foreground font-medium">
                        Click to select your file or files
                      </p>
                      <p className="text-muted-foreground/70 text-sm">
                        Max {maxFileCount} file
                        {maxSize
                          ? ` of dimension ${formatBytes(minSize ?? 0)} ~ ${formatBytes(maxSize)}${maxFileCount === 1 ? "" : " (ciascuno)"}`
                          : ""}
                        , with format: {acceptedFormats(accept)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        ) : null}

        {filesLength > 0 ? (
          <ScrollArea className="mb-2 h-fit w-full px-3">
            <div className="flex max-h-48 flex-col gap-4">
              {files?.map((file: File, index: number) => (
                <div
                  key={index} // eslint-disable-line
                  className="relative flex items-center gap-2.5"
                >
                  <div className="flex flex-1 gap-2.5">
                    {file?.preview && file.type?.startsWith("image/") ? (
                      <ImageWithFallback
                        src={file.preview}
                        alt=""
                        width={128}
                        height={128}
                        className="bg-muted aspect-square size-14 shrink-0 rounded-sm"
                      />
                    ) : file.preview ? (
                      <FileTextIcon className="text-muted-foreground size-10" />
                    ) : null}

                    <div className="flex w-full flex-col gap-2">
                      <div className="flex flex-col gap-px">
                        <Avatar className="w-20 h-20 object-cover rounded-sm">
                          <AvatarImage src={file} />
                        </Avatar>
                        {/* <p className="text-muted-foreground text-xs">
                          {file.size > 0
                            ? formatBytes(file.size)
                            : 'Foto téléchargé'}
                        </p> */}
                      </div>

                      {progresses && progresses[file.name] && (
                        <Progress value={progresses[file.name]} />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="text-blue-600 size-8 cursor-pointer"
                      onClick={() => onView(index)}
                    >
                      <ViewIcon className="size-4" aria-hidden="true" />
                    </Button> */}
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 text-green-600 cursor-pointer"
                      disabled={disabled}
                      onClick={() => onRemove(index)}
                    >
                      <EditIcon className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : null}
      </div>
    );
  },
);

FileUploader.displayName = "FileUploader";

export { FileUploader };

function acceptedFormats(accept: DropzoneProps["accept"]) {
  if (!accept) return "";

  const normalizedAccept: Accept = Array.isArray(accept)
    ? accept.reduce<Accept>((acc, group) => {
        if (!group || typeof group !== "object") return acc;

        Object.entries(group).forEach(([mime, format]) => {
          if (
            Array.isArray(format) &&
            format.every((item) => typeof item === "string")
          ) {
            acc[mime] = format as string[];
          }
        });

        return acc;
      }, {})
    : accept;

  return Object.entries(normalizedAccept)
    .reduce((acc, [mime, format]) => {
      const normalizedFormat = Array.isArray(format) ? format : [format];

      if (normalizedFormat.length === 0 && mime.endsWith("/*"))
        return [...acc, mime.replace("/*", "")];
      else if (normalizedFormat.length > 0)
        return [
          ...acc,
          normalizedFormat.join(", ").replace(/\./g, "").toUpperCase(),
        ];
      else return acc;
    }, [] as string[])
    .flat()
    .join(", ");
}

function formatBytes(bytes: number, decimals: number = 0) {
  const sizes = ["Byte", "kB", "MB", "GB", "TB"];

  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizes[i] ?? "Byte"}`;
}
