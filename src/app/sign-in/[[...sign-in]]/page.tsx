import { SignIn } from "@clerk/nextjs";

// SineInページ
export default function Page() {
  return (
    <div className="flex justify-center">
      <SignIn />
    </div>
  );
}
