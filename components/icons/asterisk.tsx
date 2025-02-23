import { cn } from "@/lib/utils";

export function Asterisk({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="200 50 100 100"
      className={cn('stroke-accent size-5', className)}
    >
      <g transform="translate(250, 100)">
        <path
          d="M-30,2 Q-15,-1 0,2 Q15,-1 30,-2 M-30,-2 Q-15,1 0,-2 Q15,1 30,2"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M-25,-25 Q-12,-12 0,0 Q12,12 25,25 M-25,25 Q-12,12 0,0 Q12,-12 25,-25"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M0,-35 Q2,-17 0,0 Q-2,17 0,35"
          strokeWidth="3"
          fill="none"
        />
      </g>
    </svg>
  );
};
