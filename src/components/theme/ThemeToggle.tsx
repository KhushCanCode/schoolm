
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, SunDim } from "lucide-react";

export default function ThemeToggle(): JSX.Element {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = (mounted ? (resolvedTheme || theme) : theme) === "dark";

  const handleToggle = () => {
    if (mounted) {
      setTheme(isDark ? "light" : "dark");
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={handleToggle}
      className=" text-primary hover:bg-muted p-2 rounded-xl cursor-pointer transition duration-300"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
