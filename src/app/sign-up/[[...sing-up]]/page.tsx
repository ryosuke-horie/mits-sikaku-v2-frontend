import { SignUp } from "@clerk/nextjs";

// signupページ
export default function Page() {
  return (
    <div className="flex justify-center">
      <SignUp />
    </div>
  );
}
