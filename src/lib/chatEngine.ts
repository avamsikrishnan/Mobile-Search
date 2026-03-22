import { phones } from "@/data/phones";
import { Phone } from "@/types/phone";

export function generateResponse(message: string, context?: string): string {
  const lower = message.toLowerCase();

  const mentionedPhones = phones.filter(
    (p) =>
      lower.includes(p.name.toLowerCase()) ||
      lower.includes(p.id.replace(/-/g, " "))
  );

  if (context) {
    const contextPhone = phones.find((p) => p.id === context);
    if (contextPhone && mentionedPhones.length === 0) {
      mentionedPhones.push(contextPhone);
    }
  }

  if (lower.includes("compare") || lower.includes("vs") || lower.includes("versus") || lower.includes("difference")) {
    if (mentionedPhones.length >= 2) {
      return generateComparison(mentionedPhones[0], mentionedPhones[1]);
    }
    if (mentionedPhones.length === 1) {
      const competitor = findCompetitor(mentionedPhones[0]);
      if (competitor) return generateComparison(mentionedPhones[0], competitor);
    }
    return "I'd be happy to compare phones for you! Could you tell me which two phones you'd like to compare? For example, you could ask \"Compare iPhone 16 Pro Max vs Galaxy S25 Ultra\".";
  }

  if (lower.includes("best") || lower.includes("recommend") || lower.includes("suggest") || lower.includes("which")) {
    if (lower.includes("camera") || lower.includes("photo")) {
      return generateCategoryRecommendation("camera");
    }
    if (lower.includes("battery") || lower.includes("last")) {
      return generateCategoryRecommendation("battery");
    }
    if (lower.includes("budget") || lower.includes("cheap") || lower.includes("affordable") || lower.includes("value")) {
      return generateCategoryRecommendation("value");
    }
    if (lower.includes("gaming") || lower.includes("game") || lower.includes("performance")) {
      return generateCategoryRecommendation("performance");
    }
    if (lower.includes("small") || lower.includes("compact")) {
      return generateCategoryRecommendation("compact");
    }
    if (lower.includes("android")) {
      return generateCategoryRecommendation("android");
    }
    if (lower.includes("iphone") || lower.includes("ios") || lower.includes("apple")) {
      return generateCategoryRecommendation("ios");
    }

    return "I'd love to help you find the perfect phone! Could you tell me more about what you're looking for? For example:\n\n" +
      "• **\"Best camera phone\"** - for photography enthusiasts\n" +
      "• **\"Best budget phone\"** - for value seekers\n" +
      "• **\"Best gaming phone\"** - for mobile gamers\n" +
      "• **\"Best battery life\"** - for heavy users\n\n" +
      "Or you can take our **Best For Me quiz** for personalized recommendations!";
  }

  if (mentionedPhones.length === 1) {
    return generatePhoneOverview(mentionedPhones[0]);
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
    if (mentionedPhones.length > 0) {
      return `The **${mentionedPhones[0].name}** is priced at **$${mentionedPhones[0].price}**. It comes in ${mentionedPhones[0].specs.memory.storage} storage options.\n\n${mentionedPhones[0].price > 1000 ? "This is a premium flagship phone." : mentionedPhones[0].price > 700 ? "This is a mid-to-high range phone with excellent value." : "This is an excellent value option with great specs for the price."}`;
    }
    return generatePriceOverview();
  }

  if (lower.includes("camera") || lower.includes("photo") || lower.includes("video")) {
    if (mentionedPhones.length > 0) {
      return generateCameraDetails(mentionedPhones[0]);
    }
    return generateCategoryRecommendation("camera");
  }

  if (lower.includes("battery") || lower.includes("charging")) {
    if (mentionedPhones.length > 0) {
      return generateBatteryDetails(mentionedPhones[0]);
    }
    return generateCategoryRecommendation("battery");
  }

  if (lower.includes("spec") || lower.includes("feature")) {
    if (mentionedPhones.length > 0) {
      return generatePhoneOverview(mentionedPhones[0]);
    }
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! 👋 I'm your MobileMatch AI assistant. I can help you with:\n\n" +
      "• **Phone recommendations** - Tell me what you need and I'll suggest the best options\n" +
      "• **Comparisons** - Ask me to compare any two phones\n" +
      "• **Detailed specs** - Ask about any phone's camera, battery, performance, etc.\n" +
      "• **Buying advice** - Help you decide which phone is right for you\n\n" +
      "What would you like to know?";
  }

  if (lower.includes("thank")) {
    return "You're welcome! Feel free to ask me anything else about phones. I'm here to help you find your perfect match! 😊";
  }

  return "That's a great question! I can help you with:\n\n" +
    "• **Phone details** - Ask about any specific phone (e.g., \"Tell me about the iPhone 16 Pro Max\")\n" +
    "• **Comparisons** - Compare two phones (e.g., \"Compare Galaxy S25 Ultra vs Pixel 9 Pro\")\n" +
    "• **Recommendations** - Get suggestions (e.g., \"Best phone for photography\")\n" +
    "• **Specs & features** - Ask about cameras, batteries, displays, etc.\n\n" +
    "Try asking something specific and I'll give you a detailed answer!";
}

function generatePhoneOverview(phone: Phone): string {
  return `## ${phone.name}\n\n` +
    `${phone.summary}\n\n` +
    `**Key Specs:**\n` +
    `• **Display:** ${phone.specs.display.size} ${phone.specs.display.type} (${phone.specs.display.refreshRate})\n` +
    `• **Processor:** ${phone.specs.processor.chipset}\n` +
    `• **Camera:** ${phone.specs.camera.main} main${phone.specs.camera.telephoto ? ` + ${phone.specs.camera.telephoto} telephoto` : ""}\n` +
    `• **Battery:** ${phone.specs.battery.capacity} (${phone.specs.battery.charging})\n` +
    `• **RAM/Storage:** ${phone.specs.memory.ram} / ${phone.specs.memory.storage}\n` +
    `• **Price:** $${phone.price}\n` +
    `• **Rating:** ${phone.rating}/5 ⭐ (${phone.reviewCount.toLocaleString()} reviews)\n\n` +
    `**Top Pros:** ${phone.pros.slice(0, 3).join(", ")}\n` +
    `**Main Cons:** ${phone.cons.slice(0, 2).join(", ")}\n\n` +
    `Would you like to know more about its camera, battery, or compare it with another phone?`;
}

function generateComparison(a: Phone, b: Phone): string {
  const winner = (label: string, aVal: number, bVal: number, higherBetter = true): string => {
    if (aVal === bVal) return `**${label}:** Tie`;
    const aWins = higherBetter ? aVal > bVal : aVal < bVal;
    return `**${label}:** ${aWins ? a.name : b.name} wins`;
  };

  return `## ${a.name} vs ${b.name}\n\n` +
    `| Feature | ${a.name} | ${b.name} |\n` +
    `|---|---|---|\n` +
    `| Price | $${a.price} | $${b.price} |\n` +
    `| Display | ${a.specs.display.size} ${a.specs.display.refreshRate} | ${b.specs.display.size} ${b.specs.display.refreshRate} |\n` +
    `| Processor | ${a.specs.processor.chipset} | ${b.specs.processor.chipset} |\n` +
    `| Main Camera | ${a.specs.camera.main} | ${b.specs.camera.main} |\n` +
    `| Battery | ${a.specs.battery.capacity} | ${b.specs.battery.capacity} |\n` +
    `| Charging | ${a.specs.battery.charging} | ${b.specs.battery.charging} |\n` +
    `| Rating | ${a.rating}/5 | ${b.rating}/5 |\n\n` +
    `**Quick Verdict:**\n` +
    `${winner("Price", a.price, b.price, false)}\n` +
    `${winner("Battery", parseInt(a.specs.battery.capacity), parseInt(b.specs.battery.capacity))}\n` +
    `${winner("Rating", a.rating, b.rating)}\n\n` +
    `**${a.name}** is better if you want: ${a.bestFor.slice(0, 3).join(", ")}\n` +
    `**${b.name}** is better if you want: ${b.bestFor.slice(0, 3).join(", ")}\n\n` +
    `Want me to dive deeper into any specific aspect?`;
}

function generateCategoryRecommendation(category: string): string {
  let sorted: Phone[];
  let title: string;
  let description: string;

  switch (category) {
    case "camera":
      sorted = [...phones].sort((a, b) => {
        const aScore = parseInt(a.specs.camera.main) + (a.specs.camera.telephoto ? 20 : 0);
        const bScore = parseInt(b.specs.camera.main) + (b.specs.camera.telephoto ? 20 : 0);
        return bScore - aScore;
      });
      title = "Best Camera Phones";
      description = "These phones have the best camera systems";
      break;
    case "battery":
      sorted = [...phones].sort((a, b) => parseInt(b.specs.battery.capacity) - parseInt(a.specs.battery.capacity));
      title = "Best Battery Life Phones";
      description = "These phones last the longest on a single charge";
      break;
    case "value":
      sorted = [...phones].sort((a, b) => a.price - b.price);
      title = "Best Value Phones";
      description = "Great specs without the flagship price";
      break;
    case "performance":
      sorted = [...phones].sort((a, b) => {
        const aScore = a.specs.processor.chipset.includes("Elite") ? 10 : a.specs.processor.chipset.includes("A18 Pro") ? 9 : 5;
        const bScore = b.specs.processor.chipset.includes("Elite") ? 10 : b.specs.processor.chipset.includes("A18 Pro") ? 9 : 5;
        return bScore - aScore;
      });
      title = "Best Performance Phones";
      description = "Top picks for gaming and power users";
      break;
    case "compact":
      sorted = [...phones].sort((a, b) => parseFloat(a.specs.display.size) - parseFloat(b.specs.display.size));
      title = "Best Compact Phones";
      description = "Smaller phones that are easy to use one-handed";
      break;
    case "android":
      sorted = phones.filter((p) => p.specs.os.includes("Android")).sort((a, b) => b.rating - a.rating);
      title = "Best Android Phones";
      description = "Top Android picks";
      break;
    case "ios":
      sorted = phones.filter((p) => p.specs.os.includes("iOS")).sort((a, b) => b.rating - a.rating);
      title = "Best iPhones";
      description = "Top Apple picks";
      break;
    default:
      sorted = [...phones].sort((a, b) => b.rating - a.rating);
      title = "Top Phones Overall";
      description = "Our highest-rated phones";
  }

  const top3 = sorted.slice(0, 3);
  return `## ${title}\n\n${description}:\n\n` +
    top3.map((p, i) => (
      `**${i + 1}. ${p.name}** - $${p.price}\n` +
      `   ${p.summary.slice(0, 120)}...\n` +
      `   Rating: ${p.rating}/5 ⭐ | ${p.specs.processor.chipset}\n`
    )).join("\n") +
    `\nWould you like more details on any of these, or would you like to compare them?`;
}

function generateCameraDetails(phone: Phone): string {
  return `## ${phone.name} - Camera System\n\n` +
    `• **Main Camera:** ${phone.specs.camera.main}\n` +
    `• **Ultrawide:** ${phone.specs.camera.ultrawide}\n` +
    (phone.specs.camera.telephoto ? `• **Telephoto:** ${phone.specs.camera.telephoto}\n` : "") +
    `• **Front Camera:** ${phone.specs.camera.front}\n` +
    `• **Video:** ${phone.specs.camera.video}\n\n` +
    `${phone.bestFor.includes("photography") ? "This phone is **highly recommended for photography enthusiasts**. " : ""}` +
    `The ${parseInt(phone.specs.camera.main)}MP main sensor captures excellent detail${phone.specs.camera.telephoto ? ", and the telephoto lens is great for portraits and zoom shots" : ""}.\n\n` +
    `Want to know about another aspect of this phone, or compare its camera with another phone?`;
}

function generateBatteryDetails(phone: Phone): string {
  const capacity = parseInt(phone.specs.battery.capacity);
  const endurance = capacity >= 5000 ? "excellent" : capacity >= 4500 ? "very good" : capacity >= 4000 ? "good" : "average";
  return `## ${phone.name} - Battery & Charging\n\n` +
    `• **Battery Capacity:** ${phone.specs.battery.capacity}\n` +
    `• **Wired Charging:** ${phone.specs.battery.charging}\n` +
    `• **Wireless Charging:** ${phone.specs.battery.wireless ? "Yes" : "No"}\n\n` +
    `With a ${phone.specs.battery.capacity} battery, you can expect **${endurance} battery life** for a full day of use. ` +
    `${parseInt(phone.specs.battery.charging) >= 45 ? "The fast charging support means you can top up quickly when needed." : "Charging speeds are moderate compared to some competitors."}\n\n` +
    `Anything else you'd like to know?`;
}

function generatePriceOverview(): string {
  const sorted = [...phones].sort((a, b) => a.price - b.price);
  return `## Phone Prices Overview\n\n` +
    `Here's a quick look at our phone lineup by price:\n\n` +
    sorted.map((p) => `• **${p.name}** - $${p.price}`).join("\n") +
    `\n\nThe most affordable option is the **${sorted[0].name}** at $${sorted[0].price}, while the premium pick is the **${sorted[sorted.length - 1].name}** at $${sorted[sorted.length - 1].price}.\n\n` +
    `What's your budget? I can recommend the best phone in your range!`;
}

function findCompetitor(phone: Phone): Phone | undefined {
  return phones.find(
    (p) =>
      p.id !== phone.id &&
      Math.abs(p.price - phone.price) < 300 &&
      p.brand !== phone.brand
  );
}
