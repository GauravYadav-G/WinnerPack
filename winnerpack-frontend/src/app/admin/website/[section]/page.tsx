import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section: id } = await params;

  if (id === 'about-us' || id === 'about-header' || id === 'about-who-we-are' || id === 'about-metrics' || id === 'about-guides' || id === 'about-capabilities') {
    redirect(`/admin/studio/about-us?section=${id}`);
  }
  if (id === 'contact' || id === 'contact-header' || id === 'contact-channels' || id === 'contact-faqs') {
    redirect(`/admin/studio/contact?section=${id}`);
  }
  if (id === 'gallery' || id === 'gallery-hero' || id === 'gallery-items') {
    redirect(`/admin/studio/gallery?section=${id}`);
  }
  if (id === 'global' || id === 'global-ticker' || id === 'global-footer' || id === 'global-floating') {
    redirect(`/admin/studio/global?section=${id}`);
  }

  redirect(`/admin/studio/home?section=${id}`);
}
