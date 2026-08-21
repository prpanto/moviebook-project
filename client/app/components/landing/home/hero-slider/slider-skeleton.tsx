"use client";

import { Skeleton } from "~/components/ui/skeleton";
import { Star, Clock } from "lucide-react";

export default function SliderSkeleton() {
  return (
    <div className="relative h-screen">
      <Skeleton className="h-full bg-black/50 rounded-none" />

      <div className="z-20 absolute top-1/2 left-64 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-14 w-66 bg-white/50" />

          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-120 bg-white/50" />
            <Skeleton className="h-6 w-120 bg-white/50" />
            <Skeleton className="h-6 w-80 bg-white/50" />
          </div>
        </div>

       <div  className="flex flex-col gap-2">
          <div className="flex items-center space-x-2 divide-x-2 divide-white/80">
            <div className="flex items-center gap-2 pr-2">
              <Star className="animate-pulse text-white/50 fill-current" />
              <Skeleton className="h-6 w-14 bg-white/50" />
            </div>
          </div>

          <div className="flex items-center space-x-2 divide-x divide-white/80">
            <div className="flex items-center gap-2 pr-2">
              <Clock className="animate-pulse text-white/50" />
              <Skeleton className="h-6 w-14 bg-white/50" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-14 bg-white/50" />
              <Skeleton className="h-6 w-14 bg-white/50" />
            </div>
          </div>
       </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-30 bg-white/50" />
          <Skeleton className="h-8 w-30 bg-white/50" />
        </div>
      </div>
    </div>
  );
};
