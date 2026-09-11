import { useEffect, useRef, useState } from "react";

type Props = { title: string; url: string };

export default function VideoCard({ title, url }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="glass min-w-0 rounded-3xl p-3 sm:p-4">
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-muted/40">
        {visible ? (
          <video
            src={url}
            controls
            playsInline
            preload="none"
            controlsList="nodownload"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="h-full w-full animate-pulse bg-muted/50" />
        )}
      </div>
      <p className="mt-3 truncate text-center text-sm font-bold sm:text-base">{title}</p>
    </div>
  );
}
