"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Image } from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Minus,
  Sparkles,
  Table as TableIcon,
  Image as ImageIcon,
  Trash2,
  ChevronDown,
  Maximize2,
  Minimize2,
  Eraser,
  FileCode
} from "lucide-react";

import { marked } from "marked";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const parseMarkdownToHtml = (raw: string) => {
  if (!raw) return "<p>Type article content here...</p>";
  const trimmed = raw.trim();
  if (trimmed.startsWith("<") && (trimmed.includes("</p>") || trimmed.includes("</ul>") || trimmed.includes("</h"))) {
    return raw;
  }
  try {
    return marked.parse(raw) as string;
  } catch (err) {
    return raw;
  }
};

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: parseMarkdownToHtml(content),
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Keep editor content in sync when external content prop updates
  useEffect(() => {
    if (editor && content) {
      const parsed = parseMarkdownToHtml(content);
      if (parsed !== editor.getHTML()) {
        editor.commands.setContent(parsed);
      }
    }
  }, [content, editor]);

  if (!isMounted) {
    return (
      <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-100 p-4 text-xs font-mono text-slate-400">
        Initializing Rich Text Tiptap Engine...
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  // Stats calculation
  const textContent = editor.getText();
  const wordCount = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
  const charCount = textContent.length;

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div
      className={`bg-white overflow-hidden shadow-xs font-sans transition-all ${
        isFullscreen
          ? "fixed inset-0 z-[99999] max-w-none h-screen flex flex-col rounded-none border-none"
          : "relative rounded-2xl border border-slate-200"
      }`}
    >
      {/* Tiptap Sticky Formatting Toolbar */}
      <div className="sticky top-0 z-30 flex flex-wrap items-center gap-1.5 border-b border-slate-200 bg-white/95 backdrop-blur-md p-2.5">
        
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            editor.isActive("bold")
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            editor.isActive("italic")
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </button>

        {/* Strikethrough */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            editor.isActive("strike")
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        {/* Inline Code */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            editor.isActive("code")
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </button>

        {/* Code Block */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            editor.isActive("codeBlock")
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Code Block"
        >
          <FileCode className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-200 mx-1" />

        {/* Heading 1 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            editor.isActive("heading", { level: 1 })
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>

        {/* Heading 2 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            editor.isActive("heading", { level: 2 })
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Heading 2 (Subtitle)"
        >
          <Heading2 className="h-4 w-4" />
        </button>

        {/* Heading 3 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            editor.isActive("heading", { level: 3 })
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-200 mx-1" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            editor.isActive("bulletList")
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Bullet Feature List"
        >
          <List className="h-4 w-4" />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            editor.isActive("orderedList")
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            editor.isActive("blockquote")
              ? "bg-[#120a3b] text-amber-400 shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </button>

        {/* Horizontal Rule */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          title="Divider Line"
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-200 mx-1" />

        {/* Add Image */}
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          title="Insert Image URL"
        >
          <ImageIcon className="h-4 w-4" />
        </button>

        {/* Add Table Controls */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTableMenu(!showTableMenu)}
            className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-0.5 ${
              editor.isActive("table")
                ? "bg-[#120a3b] text-amber-400"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            title="Table Actions"
          >
            <TableIcon className="h-4 w-4" />
            <ChevronDown className="h-3 w-3" />
          </button>
          
          {showTableMenu && (
            <div className="absolute left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-50 flex flex-col">
              <button
                type="button"
                onClick={() => { addTable(); setShowTableMenu(false); }}
                className="px-3 py-1.5 text-left text-xs hover:bg-slate-50 rounded-lg text-slate-800 font-semibold cursor-pointer"
              >
                Insert Table (3x3)
              </button>
              {editor.isActive("table") && (
                <>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addRowBefore().run(); setShowTableMenu(false); }}
                    className="px-3 py-1.5 text-left text-xs hover:bg-slate-50 rounded-lg text-slate-800 cursor-pointer"
                  >
                    Add Row Above
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addRowAfter().run(); setShowTableMenu(false); }}
                    className="px-3 py-1.5 text-left text-xs hover:bg-slate-50 rounded-lg text-slate-800 cursor-pointer"
                  >
                    Add Row Below
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addColumnBefore().run(); setShowTableMenu(false); }}
                    className="px-3 py-1.5 text-left text-xs hover:bg-slate-50 rounded-lg text-slate-800 cursor-pointer"
                  >
                    Add Column Left
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addColumnAfter().run(); setShowTableMenu(false); }}
                    className="px-3 py-1.5 text-left text-xs hover:bg-slate-50 rounded-lg text-slate-800 cursor-pointer"
                  >
                    Add Column Right
                  </button>
                  <div className="h-[1px] bg-slate-200 my-1" />
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().deleteRow().run(); setShowTableMenu(false); }}
                    className="px-3 py-1.5 text-left text-xs hover:bg-slate-50 rounded-lg text-slate-800 cursor-pointer"
                  >
                    Delete Row
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().deleteColumn().run(); setShowTableMenu(false); }}
                    className="px-3 py-1.5 text-left text-xs hover:bg-slate-50 rounded-lg text-slate-800 cursor-pointer"
                  >
                    Delete Column
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().deleteTable().run(); setShowTableMenu(false); }}
                    className="px-3 py-1.5 text-left text-xs hover:bg-red-50 text-red-600 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete Table</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Clear Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className="p-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          title="Clear Formatting"
        >
          <Eraser className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-200 mx-1" />

        {/* Undo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition disabled:opacity-40 cursor-pointer"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </button>

        {/* Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition disabled:opacity-40 cursor-pointer"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className={`p-2 rounded-xl text-xs transition cursor-pointer ml-auto ${
            isFullscreen ? "bg-[#fe8220] text-white" : "text-slate-700 hover:bg-slate-100"
          }`}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Focus Mode"}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>

      </div>

      {/* Editor Editable Canvas */}
      <div className={`p-6 leading-relaxed text-slate-800 focus:outline-none relative ${isFullscreen ? "flex-1 overflow-y-auto" : "min-h-[320px]"}`}>
        <style>{`
          .ProseMirror {
            outline: none !important;
            min-height: 280px;
          }
          .ProseMirror p {
            margin-bottom: 0.875rem;
            line-height: 1.7;
            color: #1e293b;
            font-size: 0.925rem;
          }
          .ProseMirror h1 {
            font-size: 1.65rem;
            font-weight: 800;
            color: #120a3b;
            margin-top: 1.5rem;
            margin-bottom: 0.625rem;
            letter-spacing: -0.025em;
          }
          .ProseMirror h2 {
            font-size: 1.35rem;
            font-weight: 800;
            color: #120a3b;
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
            letter-spacing: -0.02em;
          }
          .ProseMirror h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #fe8220;
            margin-top: 1rem;
            margin-bottom: 0.375rem;
          }
          .ProseMirror ul {
            list-style-type: disc !important;
            padding-left: 1.75rem !important;
            margin-bottom: 1rem !important;
          }
          .ProseMirror ol {
            list-style-type: decimal !important;
            padding-left: 1.75rem !important;
            margin-bottom: 1rem !important;
          }
          .ProseMirror li {
            margin-bottom: 0.375rem;
            line-height: 1.6;
            color: #334155;
          }
          .ProseMirror li p {
            margin-bottom: 0.125rem;
          }
          .ProseMirror blockquote {
            border-left: 4px solid #fe8220;
            padding: 0.75rem 1.25rem;
            margin: 1rem 0;
            font-style: italic;
            color: #475569;
            background-color: #fff8f3;
            border-radius: 0 0.875rem 0.875rem 0;
          }
          .ProseMirror code {
            background-color: #f1f5f9;
            color: #0f172a;
            padding: 0.2rem 0.45rem;
            border-radius: 0.375rem;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.85em;
          }
          .ProseMirror pre {
            background-color: #0f172a;
            color: #f8fafc;
            padding: 1rem 1.25rem;
            border-radius: 0.75rem;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            margin: 1.25rem 0;
          }
          .ProseMirror pre code {
            background-color: transparent;
            color: inherit;
            padding: 0;
          }
          .ProseMirror hr {
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 1.5rem 0;
          }
          .ProseMirror strong {
            font-weight: 700;
            color: #0f172a;
          }
          .ProseMirror em {
            font-style: italic;
          }
          /* --- Copy Pasted Tables & Images Styles --- */
          .ProseMirror table {
            border-collapse: collapse !important;
            table-layout: fixed !important;
            width: 100% !important;
            margin: 1.5rem 0 !important;
            overflow: hidden !important;
          }
          .ProseMirror th, .ProseMirror td {
            min-width: 1em !important;
            border: 1px solid #cbd5e1 !important;
            padding: 0.625rem 0.875rem !important;
            vertical-align: top !important;
            box-sizing: border-box !important;
            position: relative !important;
          }
          .ProseMirror th {
            font-weight: 700 !important;
            text-align: left !important;
            background-color: #f1f5f9 !important;
          }
          .ProseMirror img {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 0.75rem !important;
            margin: 1.5rem 0 !important;
            display: block !important;
          }
        `}</style>

        <EditorContent editor={editor} />
      </div>

      {/* Live Editor Stats Footer */}
      <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span><strong>{wordCount}</strong> words</span>
          <span>•</span>
          <span><strong>{charCount}</strong> characters</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Sparkles className="h-3 w-3 text-[#fe8220]" />
          <span>Tiptap Editor Pro</span>
        </div>
      </div>
    </div>
  );
}
