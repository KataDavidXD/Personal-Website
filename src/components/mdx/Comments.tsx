'use client';

import Giscus from '@giscus/react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { siteConfig } from '@/lib/constants';

export function Comments() {
  const { theme, resolvedTheme } = useTheme();
  const giscusTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <div className="mt-16 border-t border-border/40 pt-16">
      <Giscus
        id="comments"
        repo={siteConfig.giscus.repo as any}
        repoId={siteConfig.giscus.repoId}
        category={siteConfig.giscus.category}
        categoryId={siteConfig.giscus.categoryId}
        mapping={siteConfig.giscus.mapping as any}
        reactionsEnabled={siteConfig.giscus.reactionsEnabled as any}
        emitMetadata={siteConfig.giscus.emitMetadata as any}
        inputPosition={siteConfig.giscus.inputPosition as any}
        theme={giscusTheme}
        lang={siteConfig.giscus.lang}
        loading="lazy"
      />
    </div>
  );
}

