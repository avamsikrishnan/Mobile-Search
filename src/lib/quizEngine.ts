import { Phone } from "@/types/phone";
import { phones } from "@/data/phones";

interface QuizAnswers {
  [questionId: string]: string | string[];
}

interface ScoredPhone {
  phone: Phone;
  score: number;
  reasons: string[];
}

export function calculateQuizResults(answers: QuizAnswers): ScoredPhone[] {
  const scored: ScoredPhone[] = phones.map((phone) => {
    let score = 0;
    const reasons: string[] = [];

    const budget = answers.budget as string;
    if (budget) {
      const matchesBudget = checkBudget(phone.price, budget);
      if (matchesBudget) {
        score += 25;
        reasons.push("Fits your budget perfectly");
      } else {
        score -= 15;
      }
    }

    const priorities = (answers.priority as string[]) || [];
    priorities.forEach((priority) => {
      const pts = scorePriority(phone, priority);
      score += pts.score;
      if (pts.reason) reasons.push(pts.reason);
    });

    const ecosystem = answers.ecosystem as string;
    if (ecosystem && ecosystem !== "no-preference") {
      if (ecosystem === "ios" && phone.specs.os.toLowerCase().includes("ios")) {
        score += 20;
        reasons.push("Runs iOS as you prefer");
      } else if (ecosystem === "android" && phone.specs.os.toLowerCase().includes("android")) {
        score += 20;
        reasons.push("Runs Android as you prefer");
      } else if (ecosystem !== "no-preference") {
        score -= 30;
      }
    }

    const size = answers.size as string;
    if (size) {
      const displayInches = parseFloat(phone.specs.display.size);
      if (size === "compact" && displayInches <= 6.3) {
        score += 15;
        reasons.push("Compact size for easy one-hand use");
      } else if (size === "medium" && displayInches > 6.3 && displayInches <= 6.7) {
        score += 15;
        reasons.push("Great balanced screen size");
      } else if (size === "large" && displayInches > 6.7) {
        score += 15;
        reasons.push("Large screen for immersive content");
      } else if (size === "foldable" && phone.name.toLowerCase().includes("fold")) {
        score += 25;
        reasons.push("Foldable design for phone + tablet");
      }
    }

    const usages = (answers.usage as string[]) || [];
    usages.forEach((usage) => {
      const pts = scoreUsage(phone, usage);
      score += pts.score;
      if (pts.reason) reasons.push(pts.reason);
    });

    const specials = (answers.special as string[]) || [];
    specials.forEach((feature) => {
      const pts = scoreSpecialFeature(phone, feature);
      score += pts.score;
      if (pts.reason) reasons.push(pts.reason);
    });

    score += phone.rating * 2;

    return { phone, score, reasons: Array.from(new Set(reasons)).slice(0, 4) };
  });

  return scored.sort((a, b) => b.score - a.score);
}

function checkBudget(price: number, budget: string): boolean {
  switch (budget) {
    case "budget": return price < 600;
    case "mid": return price >= 600 && price <= 999;
    case "flagship": return price >= 1000 && price <= 1300;
    case "ultra": return price > 1300;
    default: return true;
  }
}

function scorePriority(phone: Phone, priority: string): { score: number; reason: string } {
  switch (priority) {
    case "photography": {
      const mp = parseInt(phone.specs.camera.main);
      const hasTelephoto = !!phone.specs.camera.telephoto;
      let s = mp >= 48 ? 10 : 5;
      if (hasTelephoto) s += 5;
      if (phone.bestFor.includes("photography")) s += 5;
      return { score: s, reason: s > 12 ? "Excellent camera system" : "Good camera capabilities" };
    }
    case "battery": {
      const cap = parseInt(phone.specs.battery.capacity);
      const s = cap >= 5000 ? 15 : cap >= 4500 ? 10 : 5;
      return { score: s, reason: s >= 15 ? "Outstanding battery life" : "Solid battery endurance" };
    }
    case "performance": {
      const isTop = phone.specs.processor.chipset.includes("Elite") ||
        phone.specs.processor.chipset.includes("A18 Pro") ||
        phone.specs.processor.chipset.includes("A18");
      return { score: isTop ? 15 : 8, reason: isTop ? "Top-tier performance" : "Good performance" };
    }
    case "design": {
      const isPremium = phone.price >= 800;
      return { score: isPremium ? 12 : 6, reason: isPremium ? "Premium design and materials" : "Well-designed build" };
    }
    case "display": {
      const is120 = phone.specs.display.refreshRate.includes("120");
      const isHighRes = phone.specs.display.resolution.includes("1440") || phone.specs.display.resolution.includes("1856");
      let s = is120 ? 8 : 3;
      if (isHighRes) s += 5;
      return { score: s, reason: s > 10 ? "Stunning high-res 120Hz display" : "Smooth display experience" };
    }
    case "value": {
      const ratio = phone.rating / (phone.price / 1000);
      const s = ratio > 6 ? 15 : ratio > 5 ? 10 : 5;
      return { score: s, reason: s >= 15 ? "Exceptional value for money" : "Good value proposition" };
    }
    default:
      return { score: 0, reason: "" };
  }
}

function scoreUsage(phone: Phone, usage: string): { score: number; reason: string } {
  switch (usage) {
    case "gaming":
      return phone.specs.processor.chipset.includes("Elite") || phone.specs.processor.chipset.includes("A18")
        ? { score: 10, reason: "Powerful enough for demanding games" }
        : { score: 3, reason: "" };
    case "content":
      return phone.bestFor.includes("photography") || phone.bestFor.includes("video")
        ? { score: 10, reason: "Great for content creation" }
        : { score: 3, reason: "" };
    case "work":
      return phone.bestFor.includes("productivity") || phone.bestFor.includes("multitasking")
        ? { score: 10, reason: "Excellent for productivity" }
        : { score: 3, reason: "" };
    case "social":
      return { score: 5, reason: "" };
    case "streaming": {
      const big = parseFloat(phone.specs.display.size) >= 6.5;
      return { score: big ? 8 : 4, reason: big ? "Large screen perfect for streaming" : "" };
    }
    case "basic":
      return phone.price <= 600
        ? { score: 10, reason: "Simple and effective for everyday use" }
        : { score: 3, reason: "" };
    default:
      return { score: 0, reason: "" };
  }
}

function scoreSpecialFeature(phone: Phone, feature: string): { score: number; reason: string } {
  switch (feature) {
    case "stylus":
      return phone.bestFor.includes("stylus")
        ? { score: 15, reason: "Built-in S Pen for notes and drawing" }
        : { score: 0, reason: "" };
    case "wireless-charging":
      return phone.specs.battery.wireless
        ? { score: 8, reason: "Supports wireless charging" }
        : { score: -5, reason: "" };
    case "5g":
      return phone.specs.connectivity.fiveG
        ? { score: 5, reason: "5G connectivity for fast data" }
        : { score: -10, reason: "" };
    case "water-resistant":
      return phone.specs.waterResistance.includes("IP68") || phone.specs.waterResistance.includes("IP69")
        ? { score: 8, reason: "Excellent water and dust resistance" }
        : { score: 0, reason: "" };
    case "ai-features":
      return phone.bestFor.includes("ai-features")
        ? { score: 12, reason: "Advanced AI features built in" }
        : { score: 2, reason: "" };
    case "fast-charging": {
      const watts = parseInt(phone.specs.battery.charging);
      return watts >= 45
        ? { score: 12, reason: `Blazing ${watts}W fast charging` }
        : { score: 3, reason: "" };
    }
    default:
      return { score: 0, reason: "" };
  }
}
