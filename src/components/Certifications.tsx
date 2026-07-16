"use client";

import { motion } from "framer-motion";
import { Award, FileCheck2, Truck } from "lucide-react";

const highlights = [
  { title: "ISO 9001:2015", desc: "Quality Management System Certified", icon: Award },
  { title: "GSTIN 09AACCW6640F1Z8", desc: "Registered under Uttar Pradesh GST", icon: FileCheck2 },
  { title: "CIN U51909UP2020PTC129759", desc: "Winner Pack Technologies Pvt. Ltd.", icon: FileCheck2 },
  { title: "Direct Dispatch", desc: "Shipped from our Ghaziabad base to your site", icon: Truck },
];

export default function Certifications() {
  return (
    <section className="relative overflow-hidden bg-white py-12 border-y border-[var(--color-line)]">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-bone)]/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-blue-soft)] text-[var(--color-blue)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[var(--color-ink)]">
                    {c.title}
                  </h4>
                  <p className="text-xs text-[var(--color-mute)] mt-1">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}