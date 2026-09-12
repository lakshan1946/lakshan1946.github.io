import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("skeleton rounded-md bg-border/60", className)}
      {...props}
    />
  );
}

export function SocialProfileSkeleton() {
  return (
    <div className="flex gap-4 border border-border bg-surface p-5">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-5 w-48" />
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ContentCardSkeleton() {
  return (
    <div className="overflow-hidden border border-border bg-surface">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
