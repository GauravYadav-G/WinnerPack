import Client from "./ProductDetailClient";
export default function Page(props: { params: Promise<{ id: string }> }) {
  return <Client {...props} />;
}
