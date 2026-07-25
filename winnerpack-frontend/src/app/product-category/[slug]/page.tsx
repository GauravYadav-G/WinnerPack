import Client from "./CategoryClient";

export default function Page(props: { params: Promise<{ slug: string }> }) {
  return <Client {...props} />;
}
