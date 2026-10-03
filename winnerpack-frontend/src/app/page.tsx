import type { Metadata } from "next";
import Client from "./HomeClient";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return <Client />;
}
