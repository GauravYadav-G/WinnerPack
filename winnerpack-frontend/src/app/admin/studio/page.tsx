import { Metadata } from 'next';
import StudioClient from './StudioClient';

export const metadata: Metadata = {
  title: 'Page Editor | Winner Pack Admin',
  description: 'Edit and preview Winner Pack website pages.',
};

export default function StudioPage() {
  return <StudioClient />;
}
