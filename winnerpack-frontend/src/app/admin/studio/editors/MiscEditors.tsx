'use client';
import { EditorSection, TextInput, TextareaInput, ImageUpload, StringList, Repeater } from './shared';

// ─── Category Page Editors ────────────────────────────────────────────────────
export function CatBannerEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-1">
      <EditorSection title="Category Banner">
        <TextInput label="Category Title" value={data.title || ''} onChange={(v) => onChange({ ...data, title: v })} />
        <TextInput label="Eyebrow / Subtitle" value={data.eyebrow || ''} onChange={(v) => onChange({ ...data, eyebrow: v })} />
        <TextareaInput label="Description Copy" value={data.description || ''} onChange={(v) => onChange({ ...data, description: v })} rows={3} />
        <ImageUpload label="Header Background Image" value={data.image || ''} onChange={(v) => onChange({ ...data, image: v })} />
      </EditorSection>
    </div>
  );
}

export function CatSubcategoriesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const subcategories: any[] = data.subcategories || [];
  return (
    <div className="space-y-1">
      <EditorSection title="Subcategory Navigation">
        <p className="text-[11px] text-gray-500 -mt-1 mb-2">Filter chips shown at the top of the category page.</p>
        <Repeater
          label="Subcategories"
          items={subcategories}
          onChange={(s) => onChange({ ...data, subcategories: s })}
          newItem={{ name: 'New Subcategory', slug: 'new-subcategory', itemsCount: 0 }}
          getTitle={(item) => item.name}
          renderItem={(sub, _, update) => (
            <div className="space-y-2">
              <TextInput label="Subcategory Name" value={sub.name} onChange={(v) => update({ ...sub, name: v })} />
              <div className="grid grid-cols-2 gap-2">
                <TextInput label="URL Slug" value={sub.slug} onChange={(v) => update({ ...sub, slug: v })} mono />
                <TextInput label="Products Count" value={String(sub.itemsCount || 0)} onChange={(v) => update({ ...sub, itemsCount: Number(v) })} />
              </div>
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}

// ─── Industry Page Editors ────────────────────────────────────────────────────
export function IndustryHeroEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-1">
      <EditorSection title="Industry Header">
        <TextInput label="Page Title" value={data.title || ''} onChange={(v) => onChange({ ...data, title: v })} />
        <TextInput label="Eyebrow Tag" value={data.eyebrow || ''} onChange={(v) => onChange({ ...data, eyebrow: v })} />
        <TextInput label="Main Headline" value={data.headline || ''} onChange={(v) => onChange({ ...data, headline: v })} />
        <ImageUpload label="Industry Banner Photo" value={data.image || ''} onChange={(v) => onChange({ ...data, image: v })} />
      </EditorSection>
      <EditorSection title="Problem & Solution">
        <TextareaInput label="Industry Challenge / Problem" value={data.problem || ''} onChange={(v) => onChange({ ...data, problem: v })} rows={3} hint="Shown on a red-tinted card" />
        <TextareaInput label="WinnerPack Solution" value={data.solution || ''} onChange={(v) => onChange({ ...data, solution: v })} rows={3} hint="Shown on a green-tinted card" />
      </EditorSection>
    </div>
  );
}

export function IndustryComplianceEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-1">
      <EditorSection title="Compliance & Standard Badges">
        <p className="text-[11px] text-gray-500 -mt-1 mb-2">Text badges shown at the bottom. Each is a short compliance label.</p>
        <StringList label="Badges" items={data.badges || []} onChange={(v) => onChange({ ...data, badges: v })} placeholder="e.g. US FDA 21 CFR Compliant" />
      </EditorSection>
    </div>
  );
}

// ─── Gallery Editors ───────────────────────────────────────────────────────────
export function GalleryHeroEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-1">
      <EditorSection title="Featured Gallery Hero">
        <TextInput label="Caption / Title" value={data.title || ''} onChange={(v) => onChange({ ...data, title: v })} />
        <div>
          <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-widest mb-1">Focal Point</label>
          <div className="grid grid-cols-3 gap-1.5">
            {['top', 'center', 'bottom'].map((pos) => (
              <button key={pos} type="button" onClick={() => onChange({ ...data, focal: pos })}
                className={`py-1.5 rounded-lg text-xs font-semibold border transition ${data.focal === pos ? 'bg-[#fe8220] text-[#120a3b] border-[#fe8220]' : 'bg-white/5 text-gray-300 border-white/10'}`}>
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <ImageUpload label="Hero Photo" value={data.image || ''} onChange={(v) => onChange({ ...data, image: v })} hint="Landscape 16:9 recommended" />
      </EditorSection>
    </div>
  );
}

export function GalleryItemsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const portraits: any[] = data.portraits || [];
  const landscapes: any[] = data.landscapes || [];

  const renderPhotoItem = (items: any[], type: 'portraits' | 'landscapes') => (
    <Repeater
      label={type === 'portraits' ? 'Portrait Photos' : 'Landscape Photos'}
      items={items}
      onChange={(updated) => onChange({ ...data, [type]: updated })}
      newItem={{ id: Date.now(), title: 'New Photo', image: '' }}
      getTitle={(item) => item.title}
      renderItem={(item, _, update) => (
        <div className="space-y-2">
          <TextInput label="Caption" value={item.title} onChange={(v) => update({ ...item, title: v })} />
          <ImageUpload label="Photo" value={item.image} onChange={(v) => update({ ...item, image: v })} />
        </div>
      )}
    />
  );

  return (
    <div className="space-y-1">
      <EditorSection title="Portrait Photos">{renderPhotoItem(portraits, 'portraits')}</EditorSection>
      <EditorSection title="Landscape Photos">{renderPhotoItem(landscapes, 'landscapes')}</EditorSection>
    </div>
  );
}

// ─── Blog Editors ──────────────────────────────────────────────────────────────
export function BlogHubEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-1">
      <EditorSection title="Blog Hub Header">
        <TextInput label="Blog Title" value={data.title || ''} onChange={(v) => onChange({ ...data, title: v })} />
        <TextInput label="Eyebrow / Journal Name" value={data.eyebrow || ''} onChange={(v) => onChange({ ...data, eyebrow: v })} />
        <TextareaInput label="Description" value={data.description || ''} onChange={(v) => onChange({ ...data, description: v })} rows={2} />
      </EditorSection>
    </div>
  );
}

export function BlogArticleEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-1">
      <EditorSection title="Article Details">
        <TextInput label="Article Title" value={data.title || ''} onChange={(v) => onChange({ ...data, title: v })} />
        <div className="grid grid-cols-2 gap-2">
          <TextInput label="Category Tag" value={data.tag || ''} onChange={(v) => onChange({ ...data, tag: v })} />
          <TextInput label="Read Time" value={data.readTime || ''} onChange={(v) => onChange({ ...data, readTime: v })} hint="e.g. 6 min read" />
          <TextInput label="Author" value={data.author || ''} onChange={(v) => onChange({ ...data, author: v })} />
          <TextInput label="Published Date" value={data.date || ''} onChange={(v) => onChange({ ...data, date: v })} />
        </div>
        <TextareaInput label="Excerpt / Summary" value={data.excerpt || ''} onChange={(v) => onChange({ ...data, excerpt: v })} rows={3} />
        <ImageUpload label="Cover Image" value={data.image || ''} onChange={(v) => onChange({ ...data, image: v })} hint="16:9 landscape format" />
      </EditorSection>
    </div>
  );
}
