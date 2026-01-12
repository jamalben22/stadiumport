'use client';

import React from 'react';

interface DeferredStylesheetProps {
  href: string;
}

export function DeferredStylesheet({ href }: DeferredStylesheetProps) {
  return (
    <link
      rel="stylesheet"
      href={href}
      media="print"
      onLoad={(e) => {
        e.currentTarget.media = 'all';
      }}
    />
  );
}
