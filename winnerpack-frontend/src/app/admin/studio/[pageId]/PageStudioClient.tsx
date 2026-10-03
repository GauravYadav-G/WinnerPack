'use client';

import StudioClient from '../StudioClient';

interface Props {
  pageId: string;
}

export default function PageStudioClient({ pageId }: Props) {
  return <StudioClient initialPageId={pageId} />;
}
