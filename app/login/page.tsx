"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Checkbox, Input } from "@sarunyu/system-one";
import { AuthShell } from "../_components/auth-shell";
import { isValidEmail, saveUser } from "../_lib/auth";

type Errors = { email?: string; password?: string; form?: string };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!email) next.email = "Email is required";
    else if (!isValidEmail(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 8)
      next.password = "Password must be at least 8 characters";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    saveUser({
      name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
    });
    router.push("/dashboard");
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Lumen workspace"
      footer={
        <>
          New to Lumen?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary-action hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {errors.form ? (
          <Alert status="critical" message={errors.form} />
        ) : null}

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          forceState={errors.email ? "error" : undefined}
          errorMessage={errors.email}
          required
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          forceState={errors.password ? "error" : undefined}
          errorMessage={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            checked={remember}
            onChange={setRemember}
            label="Remember me"
          />
          <Link
            href="#"
            className="text-sm font-medium text-primary-action hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </Button>

        <div className="relative py-1 text-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-divider" />
          <span className="relative inline-block bg-background px-3 text-xs uppercase tracking-wide text-muted-foreground">
            or
          </span>
        </div>

        <Button type="button" variant="outline" size="lg" className="w-full">
          Continue with Google
        </Button>
      </form>
    </AuthShell>
  );
}
