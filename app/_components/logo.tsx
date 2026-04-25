export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="var(--primary-action)"
      />
      <path
        d="M9 9h4v14H9V9zm6 6h4v8h-4v-8zm6-3h4v11h-4V12z"
        fill="var(--text-on-primary-action, #fff)"
      />
    </svg>
  );
}
