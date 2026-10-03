'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import type { StudioSectionDef } from '@/lib/admin/studio-registry';

interface InspectorProps {
  section: StudioSectionDef;
  data: Record<string, any>;
  onChange: (updatedData: Record<string, any>) => void;
  onResetSection: () => void;
}

function formatLabel(key: string): string {
  const map: Record<string, string> = {
    tag: 'Eyebrow Tag',
    eyebrow: 'Eyebrow Tag',
    title: 'Section Heading',
    heading: 'Main Headline',
    subtitle: 'Subtitle',
    description: 'Description Copy',
    para1: 'Opening Paragraph',
    para2: 'Supporting Paragraph',
    coverImage: 'Cover Image',
    image: 'Primary Image',
    desktopMediaUrl: 'Desktop Background Image',
    mobileMediaUrl: 'Mobile Optimized Image',
    rightBanner: 'Showcase Photo',
    phone1: 'Primary Hotline',
    phone2: 'Secondary Phone',
    salesEmail: 'Sales Department Email',
    supportEmail: 'General Support Email',
    officeAddress: 'Headquarters Address',
    plantAddress: 'Manufacturing Plant Address',
    hours: 'Business Operating Hours',
    whatsappNumber: 'WhatsApp Chat Number',
    whatsappPrompt: 'WhatsApp Welcome Greeting',
    problem: 'Industry Operational Challenge',
    solution: 'Engineered Technical Solution',
    tdsTitle: 'TDS Document Title',
    tdsUrl: 'TDS File Link (PDF)',
    msdsTitle: 'MSDS Document Title',
    msdsUrl: 'MSDS File Link (PDF)',
    searchPlaceholder: 'Search Input Placeholder',
  };
  return map[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
}

function isImageKey(key: string): boolean {
  return /image|logo|banner|mediaurl|photo|thumbnail/i.test(key);
}

function isLongText(key: string, value: any): boolean {
  return /description|para|problem|solution|blurb|excerpt|address|hours|prompt/i.test(key) || String(value || '').length > 120;
}

export default function StudioInspector({ section, data, onChange, onResetSection }: InspectorProps) {
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Update a single field
  const handleFieldChange = (key: string, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  // Image Upload handler
  const handleUpload = async (key: string, file: File | undefined) => {
    if (!file) return;
    setUploadingField(key);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiFetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (res.ok && result.url) {
        handleFieldChange(key, result.url);
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="studio-dock-body">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#fe8220] font-mono">
            Active Section Editor
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">{section.title}</h3>
        </div>
        <button
          type="button"
          onClick={onResetSection}
          className="studio-mini-btn text-[10px] text-gray-400 hover:text-white"
          title="Reset this component to factory defaults"
        >
          Reset Section
        </button>
      </div>

      {/* Render Controls */}
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => {
          // 1. ARRAY REPEATER
          if (Array.isArray(value)) {
            return (
              <div key={key} className="studio-field-group">
                <div className="flex items-center justify-between mb-2">
                  <span className="studio-field-group-title !mb-0">
                    {formatLabel(key)} ({value.length} items)
                  </span>
                  <button
                    type="button"
                    className="studio-mini-btn"
                    onClick={() => {
                      const template = value[0] ? (typeof value[0] === 'object' ? { ...value[0] } : '') : {};
                      handleFieldChange(key, [...value, template]);
                    }}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add
                  </button>
                </div>

                <div className="space-y-3">
                  {value.map((item: any, idx: number) => (
                    <div key={idx} className="studio-repeater-item">
                      <div className="studio-repeater-item-head">
                        <strong>
                          #{idx + 1} · {item?.title || item?.name || item?.value || item?.tag || `Item ${idx + 1}`}
                        </strong>
                        <div className="studio-repeater-actions">
                          <button
                            type="button"
                            className="studio-mini-btn"
                            disabled={idx === 0}
                            onClick={() => {
                              const next = [...value];
                              [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                              handleFieldChange(key, next);
                            }}
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            className="studio-mini-btn"
                            disabled={idx === value.length - 1}
                            onClick={() => {
                              const next = [...value];
                              [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                              handleFieldChange(key, next);
                            }}
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            className="studio-mini-btn danger"
                            onClick={() => {
                              if (confirm('Delete this item?')) {
                                handleFieldChange(
                                  key,
                                  value.filter((_: any, i: number) => i !== idx)
                                );
                              }
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Item sub-fields */}
                      {typeof item === 'object' && item !== null ? (
                        <div className="space-y-2">
                          {Object.entries(item).map(([subKey, subVal]) => (
                            <div key={subKey} className="studio-control">
                              <label>{formatLabel(subKey)}</label>
                              {isImageKey(subKey) ? (
                                <div>
                                  <input
                                    type="text"
                                    value={String(subVal || '')}
                                    onChange={(e) => {
                                      const next = [...value];
                                      next[idx] = { ...next[idx], [subKey]: e.target.value };
                                      handleFieldChange(key, next);
                                    }}
                                    className="studio-input mb-1.5"
                                    placeholder="Image URL..."
                                  />
                                  <label className="studio-mini-btn cursor-pointer inline-flex">
                                    <Upload className="w-3 h-3 mr-1" /> Upload
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const formData = new FormData();
                                          formData.append('file', file);
                                          apiFetch('/api/upload', { method: 'POST', body: formData })
                                            .then((r) => r.json())
                                            .then((res) => {
                                              if (res.url) {
                                                const next = [...value];
                                                next[idx] = { ...next[idx], [subKey]: res.url };
                                                handleFieldChange(key, next);
                                              }
                                            });
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              ) : isLongText(subKey, subVal) ? (
                                <textarea
                                  value={String(subVal || '')}
                                  onChange={(e) => {
                                    const next = [...value];
                                    next[idx] = { ...next[idx], [subKey]: e.target.value };
                                    handleFieldChange(key, next);
                                  }}
                                  rows={2}
                                  className="studio-textarea"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={String(subVal || '')}
                                  onChange={(e) => {
                                    const next = [...value];
                                    next[idx] = { ...next[idx], [subKey]: e.target.value };
                                    handleFieldChange(key, next);
                                  }}
                                  className="studio-input"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={String(item || '')}
                          onChange={(e) => {
                            const next = [...value];
                            next[idx] = e.target.value;
                            handleFieldChange(key, next);
                          }}
                          className="studio-input"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // 2. NESTED OBJECT (KEY-VALUE / SPEC MATRIX)
          if (typeof value === 'object' && value !== null) {
            return (
              <div key={key} className="studio-field-group">
                <span className="studio-field-group-title">{formatLabel(key)}</span>
                <div className="p-3 bg-black/20 rounded-lg space-y-2 border border-white/5">
                  {Object.entries(value).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-5 text-[11px] font-semibold text-gray-300 truncate">{k}</span>
                      <input
                        type="text"
                        value={String(v || '')}
                        onChange={(e) => {
                          handleFieldChange(key, {
                            ...value,
                            [k]: e.target.value,
                          });
                        }}
                        className="col-span-7 studio-input !py-1.5 !text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // 3. IMAGE UPLOAD FIELD
          if (isImageKey(key)) {
            return (
              <div key={key} className="studio-control">
                <label>{formatLabel(key)}</label>
                <div className="studio-upload-bay">
                  <div className="studio-upload-preview">
                    {value ? (
                      <img src={String(value)} alt="Preview" />
                    ) : (
                      <div className="text-gray-500 text-xs flex flex-col items-center">
                        <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                        No image set
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={String(value || '')}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                      placeholder="Paste image URL..."
                      className="studio-input flex-1 !py-1 !text-xs"
                    />
                    <label className="studio-btn secondary !py-1 !px-2.5 !text-xs cursor-pointer">
                      <Upload className="w-3.5 h-3.5 mr-1" />
                      {uploadingField === key ? 'Uploading…' : 'Browse'}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        disabled={uploadingField === key}
                        onChange={(e) => handleUpload(key, e.target.files?.[0])}
                      />
                    </label>
                  </div>
                </div>
              </div>
            );
          }

          // 4. LONG TEXT AREA
          if (isLongText(key, value)) {
            return (
              <div key={key} className="studio-control">
                <label>{formatLabel(key)}</label>
                <textarea
                  value={String(value || '')}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                  rows={3}
                  className="studio-textarea"
                />
              </div>
            );
          }

          // 5. STANDARD TEXT / NUMBER INPUT
          return (
            <div key={key} className="studio-control">
              <label>{formatLabel(key)}</label>
              <input
                type={typeof value === 'number' ? 'number' : 'text'}
                value={String(value || '')}
                onChange={(e) =>
                  handleFieldChange(key, typeof value === 'number' ? Number(e.target.value) : e.target.value)
                }
                className="studio-input"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
