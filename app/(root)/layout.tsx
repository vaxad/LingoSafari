import { isStudent, isTeacher } from "@/lib/userCheck";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const student = await isStudent(userId);
  const teacher = await isTeacher(userId);
  if (!student && !teacher) redirect("/roleform");

  return <>{children}</>;
}
