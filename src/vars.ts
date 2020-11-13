const root = document.documentElement;

export function setVar(name: string, value: string): void {
  root.style.setProperty(`--${name}`, value);
}

export function removeVar(name: string): void {
  root.style.removeProperty(`--${name}`);
}
