import { Plus, Trash2, Cpu } from "lucide-react";

interface SpecsMapEditorProps {
  value: Record<string, string>;
  onChange: (specs: Record<string, string>) => void;
}

export default function SpecsMapEditor({ value = {}, onChange }: SpecsMapEditorProps) {
  const entries = Object.entries(value);

  const handleAdd = () => {
    let keyName = "Specification";
    let counter = 1;
    while (value[`${keyName} ${counter}`]) {
      counter++;
    }
    onChange({ ...value, [`${keyName} ${counter}`]: "" });
  };

  const handleKeyChange = (oldKey: string, newKey: string, val: string) => {
    const updated: Record<string, string> = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === oldKey) {
        updated[newKey] = val;
      } else {
        updated[k] = v;
      }
    }
    onChange(updated);
  };

  const handleValueChange = (key: string, val: string) => {
    onChange({ ...value, [key]: val });
  };

  const handleDelete = (key: string) => {
    const updated = { ...value };
    delete updated[key];
    onChange(updated);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-200/50">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Technical Specifications ({entries.length} Attributes)
            </h4>
            <p className="text-[11px] text-slate-500">
              Key-value technical parameters (e.g. Tensile Strength, Adhesive Type, Core Diameter).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 active:scale-98 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Spec
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
          <Cpu className="mx-auto h-7 w-7 text-slate-300 mb-1.5" />
          <p className="text-xs font-medium text-slate-600">No technical specs defined.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Click "Add Spec" to add parameters like Material Grade, Elongation, or Temperature Range.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map(([key, val], idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-xl bg-slate-50/70 p-2 border border-slate-200/60 hover:border-slate-300 transition-colors"
            >
              <div className="w-1/3">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => handleKeyChange(key, e.target.value, val)}
                  placeholder="Parameter (e.g. Material Type)"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleValueChange(key, e.target.value)}
                  placeholder="Value (e.g. 5-Layer Cross-Linked Resin)"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>
              <button
                type="button"
                onClick={() => handleDelete(key)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                title="Remove spec"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
