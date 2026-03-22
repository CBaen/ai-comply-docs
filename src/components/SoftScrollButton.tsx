"use client";

interface SoftScrollButtonProps {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

export default function SoftScrollButton({ targetId, className, children }: SoftScrollButtonProps) {
  function handleClick() {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Fade out
    document.body.style.transition = "opacity 100ms ease-out";
    document.body.style.opacity = "0";

    setTimeout(() => {
      // Move while invisible
      target.scrollIntoView({ behavior: "instant" as ScrollBehavior });

      // Fade back in
      requestAnimationFrame(() => {
        document.body.style.transition = "opacity 150ms ease-in";
        document.body.style.opacity = "1";
      });
    }, 100);
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
