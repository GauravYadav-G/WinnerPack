import { notFound } from 'next/navigation';
import ContentEditor from '@/components/admin/ContentEditor';
import { findSection } from '@/lib/admin/sections';
export default async function Page({params}:{params:Promise<{section:string}>}){const {section:id}=await params;const section=findSection(id);if(!section)notFound();return <ContentEditor key={id} section={section}/>;}
