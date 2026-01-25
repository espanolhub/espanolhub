'use client';

interface OptimizedScriptProps {
  src: string;
  defer?: boolean;
  async?: boolean;
}

export default function OptimizedScript({ src, defer = true, async = true }: OptimizedScriptProps) {
  return (
    <script
      src={src}
      defer={defer}
      async={async}
    />
  );
}
