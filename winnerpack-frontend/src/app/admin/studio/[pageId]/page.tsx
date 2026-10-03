import { STUDIO_PAGES } from '@/lib/admin/studio-registry';
import { notFound } from 'next/navigation';
import PageStudioClient from './PageStudioClient';

export function generateStaticParams() {
  return STUDIO_PAGES.map((p) => ({ pageId: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ pageId: string }> }) {
  const { pageId } = await params;
  const page = STUDIO_PAGES.find((p) => p.id === pageId);
  return {
    title: page ? `Edit ${page.title} | WinnerPack Admin` : 'Page Editor | WinnerPack Admin',
  };
}

export default async function PageStudioRoute({ params }: { params: Promise<{ pageId: string }> }) {
  const { pageId } = await params;
  const page = STUDIO_PAGES.find((p) => p.id === pageId);
  if (!page) notFound();
  return <PageStudioClient pageId={pageId} />;
}
