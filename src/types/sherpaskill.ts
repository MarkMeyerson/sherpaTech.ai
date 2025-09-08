export interface Outcome {
  id: string;
  icon: "envelope" | "bar-chart" | "calendar" | "pencil";
  headline: string;
  subcopy: string;
  examples: string[];
  visualHint?: string;
}
