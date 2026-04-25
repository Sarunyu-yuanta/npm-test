"use client";

import { useState } from "react";
import { Card, Input, Toggle } from "@sarunyu/system-one";

export default function SettingsPage() {
  const [workspace, setWorkspace] = useState("Lumen Labs");
  const [slug, setSlug] = useState("lumen-labs");
  const [publicProfile, setPublicProfile] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <main className="mx-auto flex w-full max-w-[800px] flex-col gap-6 p-6 md:p-8">
      <header className="flex flex-col gap-2">
        <h1>Settings</h1>
        <p className="text-muted-foreground">
          Workspace-wide controls and defaults.
        </p>
      </header>

      <Card size="desktop" className="w-full">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h3>Workspace</h3>
            <p className="text-sm text-muted-foreground">
              Visible to all teammates.
            </p>
          </div>
          <Input
            placeholder="Workspace name"
            value={workspace}
            onChange={setWorkspace}
          />
          <Input
            placeholder="Workspace URL"
            value={slug}
            onChange={setSlug}
            unit=".lumen.app"
          />
        </div>
      </Card>

      <Card size="desktop" className="w-full">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3>Security</h3>
            <p className="text-sm text-muted-foreground">
              Policies applied to everyone in the workspace.
            </p>
          </div>
          <Toggle
            checked={twoFactor}
            onChange={setTwoFactor}
            label="Require 2FA"
            description="Team members must enable 2FA on next sign in."
          />
          <Toggle
            checked={publicProfile}
            onChange={setPublicProfile}
            label="Public workspace profile"
            description="Show your workspace on the public directory."
          />
        </div>
      </Card>
    </main>
  );
}
