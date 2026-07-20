import { cookies } from "next/headers";

export async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "true";
}
