import { ContactPageContent } from "@/components/pages/ContactPageContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Winner Pack Technologies",
  description: "Contact Winner Pack Technologies for industrial packaging product specifications, samples, quotations, and custom requirements.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
