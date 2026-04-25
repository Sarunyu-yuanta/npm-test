"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Checkbox, Input } from "@sarunyu/system-one";
import { AuthShell } from "../_components/auth-shell";
import { isValidEmail, saveUser } from "../_lib/auth";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  company?: string;
  terms?: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Full name is required";
    if (!email) next.email = "Email is required";
    else if (!isValidEmail(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 8)
      next.password = "Use at least 8 characters";
    if (!agreed) next.terms = "Please agree to the terms to continue";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    saveUser({
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
    });
    router.push("/dashboard");
  };

  const passwordHint =
    password.length === 0
      ? "At least 8 characters"
      : password.length < 8
      ? `${8 - password.length} more character${
          8 - password.length === 1 ? "" : "s"
        } to go`
      : "Looks good";

  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Free for up to 5 teammates. No credit card required."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-action hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <Input
          placeholder="Full name"
          value={name}
          onChange={(v) => {
            setName(v);
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          forceState={errors.name ? "error" : undefined}
          errorMessage={errors.name}
          required
        />

        <Input
          placeholder="Work email"
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
          placeholder="Company (optional)"
          value={company}
          onChange={setCompany}
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
          helperText={errors.password ? undefined : passwordHint}
          required
        />

        <div className="flex flex-col gap-2">
          <Checkbox
            checked={agreed}
            onChange={(next) => {
              setAgreed(next);
              if (errors.terms) setErrors({ ...errors, terms: undefined });
            }}
            label="I agree to the Terms of Service and Privacy Policy"
          />
          {errors.terms ? (
            <Alert status="critical" message={errors.terms} />
          ) : null}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? "Creating workspace…" : "Create workspace"}
        </Button>
      </form>
    </AuthShell>
  );
}
