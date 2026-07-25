"use client";
import { apiFetch } from "@/lib/api";
import React, { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import TurndownService from "turndown";
import { marked } from "marked";
import {
  Bold, Italic, Strikethrough, List, ListOrdered, Quote,
  Table as TableIcon, Image as ImageIcon, Loader2
} from "lucide-react";

// Configure marked
marked.setOptions({ gfm: true, breaks: true });

const markdownToHtml = (md: string) => {
  if (!md) return "";
  if (md.trim().startsWith("<")) return md;
  try {
    return marked.parse(md) as string;
  } catch (e) {
    return md;
  }
};

// Setup Turndown
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced"
});

// Configure table translation rule for Turndown
turndownService.addRule("table", {
  filter: "table",
  replacement: (_, node) => {
    const rows: string[][] = [];
    node.querySelectorAll("tr").forEach((tr) => {
      const cells: string[] = [];
      tr.querySelectorAll("th, td").forEach((cell) => {
        cells.push((cell.textContent || "").replace(/\|/g, "\\|").replace(/\n/g, " ").trim());
      });
      rows.push(cells);
    });
    if (rows.length === 0) return "";
    const header = `| ${rows[0].join(" | ")} |`;
    const separator = `| ${rows[0].map(() => "---").join(" | ")} |`;
    const body = rows.slice(1).map(r => `| ${r.join(" | ")} |`).join("\n");
    return `\n\n${header}\n${separator}${body ? "\n" + body : ""}\n\n`;
  }
});
turndownService.addRule("tableCell", { filter: ["th", "td"], replacement: (content) => content });
turndownService.addRule("tableRow", { filter: "tr", replacement: (content) => content });

interface TiptapInlineEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function TiptapInlineEditor({ value, onChange }: TiptapInlineEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const lastEmittedValue = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: markdownToHtml(value || ""),
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[240px] max-h-[500px] overflow-y-auto p-4 w-full bg-white border border-slate-200 rounded-b border-t-0 text-slate-800 prose max-w-none text-sm leading-relaxed",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const htmlContent = currentEditor.getHTML();
      lastEmittedValue.current = htmlContent;
      onChange(htmlContent);
    }
  });

  // Keep content synced on load/change
  useEffect(() => {
    if (editor && value !== undefined && value !== lastEmittedValue.current) {
      const htmlContent = markdownToHtml(value || "");
      if (editor.getHTML() !== htmlContent) {
        editor.commands.setContent(htmlContent);
      }
      lastEmittedValue.current = value;
    }
  }, [value, editor]);

  const handleInsertImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await apiFetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleInsertTable = () => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-t p-2 select-none">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition text-xs ${
            editor.isActive("bold")
              ? "bg-indigo-600 text-white font-bold"
              : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm"
          }`}
          title="Bold"
        >
          <Bold size={13} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition text-xs ${
            editor.isActive("italic")
              ? "bg-indigo-600 text-white font-bold"
              : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm"
          }`}
          title="Italic"
        >
          <Italic size={13} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded transition text-xs ${
            editor.isActive("strike")
              ? "bg-indigo-600 text-white font-bold"
              : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm"
          }`}
          title="Strikethrough"
        >
          <Strikethrough size={13} />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 px-2 rounded text-[10px] font-bold transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-indigo-600 text-white"
              : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm"
          }`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 px-2 rounded text-[10px] font-bold transition ${
            editor.isActive("heading", { level: 3 })
              ? "bg-indigo-600 text-white"
              : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm"
          }`}
          title="Heading 3"
        >
          H3
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded transition text-xs ${
            editor.isActive("bulletList")
              ? "bg-indigo-600 text-white font-bold"
              : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm"
          }`}
          title="Bullet List"
        >
          <List size={13} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded transition text-xs ${
            editor.isActive("orderedList")
              ? "bg-indigo-600 text-white font-bold"
              : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm"
          }`}
          title="Ordered List"
        >
          <ListOrdered size={13} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded transition text-xs ${
            editor.isActive("blockquote")
              ? "bg-indigo-600 text-white font-bold"
              : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm"
          }`}
          title="Blockquote"
        >
          <Quote size={13} />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={handleInsertImage}
          disabled={uploading}
          className="p-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm rounded transition flex items-center justify-center"
          title="Insert Image File"
        >
          {uploading ? <Loader2 size={13} className="animate-spin text-indigo-600" /> : <ImageIcon size={13} />}
        </button>
        <button
          type="button"
          onClick={handleInsertTable}
          className="p-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm rounded transition"
          title="Insert Table"
        >
          <TableIcon size={13} />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
