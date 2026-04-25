"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Dropdown,
  Input,
  TextArea,
  Toggle,
  Tag,
} from "@sarunyu/system-one";
import {
  Camera,
  Envelope,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { isValidEmail, loadUser, updateUser } from "../../_lib/auth";

const timezones = [
  { label: "Pacific Time (UTC-08:00)", value: "pt" },
  { label: "Eastern Time (UTC-05:00)", value: "et" },
  { label: "Greenwich Mean Time (UTC±00:00)", value: "gmt" },
  { label: "Central European Time (UTC+01:00)", value: "cet" },
  { label: "Indochina Time (UTC+07:00)", value: "ict" },
  { label: "Japan Standard Time (UTC+09:00)", value: "jst" },
];

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [tz, setTz] = useState("pt");
  const [emailNotif, setEmailNotif] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = loadUser();
    if (!u) return;
    setName(u.name);
    setEmail(u.email);
    setCompany(u.company ?? "");
  }, []);

  const handleSave = () => {
    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email");
      return;
    }
    setEmailError(undefined);
    updateUser({
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="mx-auto flex w-full max-w-[800px] flex-col gap-8 p-6 md:p-8">
      <header className="flex flex-col gap-2">
        <h1>Profile</h1>
        <p className="text-muted-foreground">
          Manage how you show up across your workspace.
        </p>
      </header>

      {saved ? (
        <Alert status="success" message="Profile saved." />
      ) : null}

      {/* Identity card */}
      <Card size="desktop" className="w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3>Identity</h3>
            <p className="text-sm text-muted-foreground">
              Shown to teammates and on shared surfaces.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-action text-xl font-medium text-on-primary-action">
              {initials || "·"}
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card hover:bg-hover-bg"
                aria-label="Change avatar"
              >
                <Camera size={16} weight="fill" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">
                Profile photo
              </span>
              <span className="text-sm text-muted-foreground">
                PNG or JPG, up to 2MB.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              placeholder="Full name"
              value={name}
              onChange={setName}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(v) => {
                setEmail(v);
                if (emailError) setEmailError(undefined);
              }}
              forceState={emailError ? "error" : undefined}
              errorMessage={emailError}
            />
            <Input
              placeholder="Company"
              value={company}
              onChange={setCompany}
            />
            <Input
              placeholder="Role"
              value={role}
              onChange={setRole}
            />
          </div>

          <TextArea
            placeholder="Short bio"
            value={bio}
            onChange={setBio}
            showCount
            maxCount={200}
          />
        </div>
      </Card>

      {/* Preferences */}
      <Card size="desktop" className="w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3>Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Localize your workspace and tune what reaches your inbox.
            </p>
          </div>

          <Dropdown
            placeholder="Timezone"
            options={timezones}
            value={tz}
            onChange={setTz}
          />

          <div className="flex flex-col gap-1 divide-y divide-divider">
            <div className="py-1">
              <Toggle
                checked={emailNotif}
                onChange={setEmailNotif}
                label="Email notifications"
                description="Get notified on new activity in your workspace."
              />
            </div>
            <div className="py-1">
              <Toggle
                checked={productUpdates}
                onChange={setProductUpdates}
                label="Product updates"
                description="Release notes and new feature announcements."
              />
            </div>
            <div className="py-1">
              <Toggle
                checked={weeklyDigest}
                onChange={setWeeklyDigest}
                label="Weekly digest"
                description="A calm Friday summary of what moved this week."
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card size="desktop" className="w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3>Security</h3>
            <p className="text-sm text-muted-foreground">
              Keep your account safe with two-factor and verified email.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 rounded-lg border border-divider p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-bg text-success">
                <Envelope size={18} weight="fill" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Email verified
                  </span>
                  <Tag text="Verified" variant="green" size="small" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {email || "No email set"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-divider p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-action-light text-primary-action">
                <ShieldCheck size={18} weight="fill" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  Two-factor authentication
                </span>
                <span className="text-sm text-muted-foreground">
                  Add an extra layer to your sign in flow.
                </span>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" size="md">
          Cancel
        </Button>
        <Button variant="primary" size="md" onClick={handleSave}>
          Save changes
        </Button>
      </div>
    </main>
  );
}
