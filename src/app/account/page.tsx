import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AccountPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/account/purchases");
  } else {
    redirect("/account/login");
  }
}
