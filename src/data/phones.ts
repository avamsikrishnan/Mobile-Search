import { Phone } from "@/types/phone";

export const phones: Phone[] = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    image: "/phones/iphone-16-pro-max.svg",
    price: 1199,
    releaseDate: "2024-09-20",
    rating: 4.8,
    reviewCount: 12450,
    colors: ["Natural Titanium", "Black Titanium", "White Titanium", "Desert Titanium"],
    summary: "Apple's most powerful iPhone ever with the A18 Pro chip, a stunning 6.9-inch Super Retina XDR display, and a pro-grade 48MP camera system with 5x optical zoom.",
    bestFor: ["photography", "video", "productivity", "premium", "ios-ecosystem"],
    specs: {
      display: { size: "6.9 inches", type: "Super Retina XDR OLED", resolution: "2868 x 1320", refreshRate: "120Hz ProMotion", brightness: "2000 nits (peak)" },
      processor: { chipset: "Apple A18 Pro", cpu: "6-core", gpu: "6-core GPU" },
      memory: { ram: "8 GB", storage: "256GB / 512GB / 1TB", expandable: false },
      camera: { main: "48 MP (f/1.78)", ultrawide: "48 MP (f/2.2)", telephoto: "12 MP 5x optical (f/2.8)", front: "12 MP TrueDepth", video: "4K Dolby Vision @ 120fps" },
      battery: { capacity: "4685 mAh", charging: "27W wired, 25W MagSafe", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.3", nfc: true, usb: "USB-C 3.2" },
      dimensions: { height: "163 mm", width: "77.6 mm", thickness: "8.25 mm", weight: "227 g" },
      os: "iOS 18",
      waterResistance: "IP68",
      biometrics: ["Face ID"],
    },
    pros: ["Best-in-class video recording", "Exceptional battery life", "Beautiful titanium design", "Powerful A18 Pro chip"],
    cons: ["Very expensive", "No expandable storage", "Slow charging vs competitors", "Heavy"],
    reviews: [
      { id: "r1", source: "YouTube", title: "iPhone 16 Pro Max Review: The Best Gets Better!", author: "MKBHD", rating: 9, snippet: "The camera improvements alone make this a worthy upgrade, especially the 5x telephoto across the Pro lineup.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2024-09-22", type: "video" },
      { id: "r2", source: "YouTube", title: "iPhone 16 Pro Max - 30 Days Later", author: "Dave2D", rating: 8.5, snippet: "After a month of heavy use, the battery life and camera consistency remain the standout features.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2024-10-20", type: "video" },
      { id: "r3", source: "The Verge", title: "iPhone 16 Pro Max review: Apple Intelligence is here", author: "Allison Johnson", rating: 9, snippet: "With Apple Intelligence features rolling out, this phone becomes more capable over time.", url: "https://theverge.com", date: "2024-09-22", type: "article" },
    ],
  },
  {
    id: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    image: "/phones/samsung-s25-ultra.svg",
    price: 1299,
    releaseDate: "2025-01-22",
    rating: 4.7,
    reviewCount: 8920,
    colors: ["Titanium Silverblue", "Titanium Gray", "Titanium Black", "Titanium Whitesilver"],
    summary: "Samsung's most advanced Galaxy phone featuring Snapdragon 8 Elite, a gorgeous 6.9-inch Dynamic AMOLED 2X display, built-in S Pen, and Galaxy AI features throughout.",
    bestFor: ["photography", "productivity", "multitasking", "stylus", "android-power-user"],
    specs: {
      display: { size: "6.9 inches", type: "Dynamic AMOLED 2X", resolution: "3120 x 1440", refreshRate: "120Hz LTPO", brightness: "2600 nits (peak)" },
      processor: { chipset: "Snapdragon 8 Elite for Galaxy", cpu: "Octa-core (2x4.47 GHz + 6x3.53 GHz)", gpu: "Adreno 830" },
      memory: { ram: "12 GB", storage: "256GB / 512GB / 1TB", expandable: false },
      camera: { main: "200 MP (f/1.7)", ultrawide: "50 MP (f/1.9)", telephoto: "50 MP 5x optical (f/2.6)", front: "12 MP (f/2.2)", video: "8K @ 30fps, 4K @ 120fps" },
      battery: { capacity: "5000 mAh", charging: "45W wired, 15W wireless", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", nfc: true, usb: "USB-C 3.2" },
      dimensions: { height: "162.8 mm", width: "77.6 mm", thickness: "8.2 mm", weight: "218 g" },
      os: "Android 15, One UI 7",
      waterResistance: "IP68",
      biometrics: ["Ultrasonic Fingerprint", "Face Recognition"],
    },
    pros: ["Incredible 200MP camera", "Built-in S Pen for notes & sketches", "Galaxy AI features", "Brightest display on a phone"],
    cons: ["Expensive", "S Pen less functional than Note days", "Titanium frame can feel slippery", "Large and heavy"],
    reviews: [
      { id: "r4", source: "YouTube", title: "Galaxy S25 Ultra Review - Samsung Did It!", author: "MKBHD", rating: 9, snippet: "The Snapdragon 8 Elite makes this the smoothest Galaxy experience yet.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2025-01-25", type: "video" },
      { id: "r5", source: "YouTube", title: "S25 Ultra vs iPhone 16 Pro Max", author: "SuperSaf", rating: 8.5, snippet: "Both flagships are incredible, but the S25 Ultra wins on versatility.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2025-02-01", type: "video" },
      { id: "r6", source: "Tom's Guide", title: "Samsung Galaxy S25 Ultra review", author: "Mark Spoonauer", rating: 9, snippet: "The Galaxy AI features set a new standard for smartphone intelligence.", url: "https://tomsguide.com", date: "2025-01-22", type: "article" },
    ],
  },
  {
    id: "google-pixel-9-pro",
    name: "Google Pixel 9 Pro",
    brand: "Google",
    image: "/phones/pixel-9-pro.svg",
    price: 999,
    releaseDate: "2024-08-22",
    rating: 4.6,
    reviewCount: 6780,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose Quartz"],
    summary: "Google's AI-first smartphone with the Tensor G4 chip, an incredible 50MP triple camera system with best-in-class computational photography, and 7 years of updates.",
    bestFor: ["photography", "ai-features", "clean-android", "value", "software-updates"],
    specs: {
      display: { size: "6.3 inches", type: "Super Actua LTPO OLED", resolution: "2856 x 1280", refreshRate: "120Hz LTPO", brightness: "3000 nits (peak)" },
      processor: { chipset: "Google Tensor G4", cpu: "Octa-core", gpu: "Mali-G715 MC7" },
      memory: { ram: "16 GB", storage: "128GB / 256GB / 512GB / 1TB", expandable: false },
      camera: { main: "50 MP (f/1.68)", ultrawide: "48 MP (f/1.7)", telephoto: "48 MP 5x optical (f/2.8)", front: "42 MP (f/2.2)", video: "8K @ 30fps, 4K @ 60fps" },
      battery: { capacity: "4700 mAh", charging: "27W wired, 21W wireless", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.3", nfc: true, usb: "USB-C 3.2" },
      dimensions: { height: "152.8 mm", width: "72 mm", thickness: "8.5 mm", weight: "199 g" },
      os: "Android 14 (upgradable to 15)",
      waterResistance: "IP68",
      biometrics: ["Under-display Fingerprint", "Face Unlock"],
    },
    pros: ["Best computational photography", "Excellent AI features", "7 years of updates", "Clean Android experience"],
    cons: ["Tensor G4 not as fast as Snapdragon", "Slower charging", "Limited availability in some regions", "Smaller battery than competitors"],
    reviews: [
      { id: "r7", source: "YouTube", title: "Pixel 9 Pro - The AI Phone We Needed", author: "MKBHD", rating: 8.5, snippet: "Gemini integration makes this the smartest phone you can buy.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2024-08-25", type: "video" },
      { id: "r8", source: "YouTube", title: "Pixel 9 Pro Camera Deep Dive", author: "Ben's Gadget Reviews", rating: 9, snippet: "Night Sight and Magic Eraser continue to set the standard for mobile photography.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2024-09-01", type: "video" },
      { id: "r9", source: "CNET", title: "Google Pixel 9 Pro Review", author: "Lisa Eadicicco", rating: 8.8, snippet: "Google proves that AI can genuinely improve the daily phone experience.", url: "https://cnet.com", date: "2024-08-22", type: "article" },
    ],
  },
  {
    id: "oneplus-13",
    name: "OnePlus 13",
    brand: "OnePlus",
    image: "/phones/oneplus-13.svg",
    price: 899,
    releaseDate: "2025-01-07",
    rating: 4.6,
    reviewCount: 4560,
    colors: ["Midnight Ocean", "Arctic Dawn", "Black Eclipse"],
    summary: "OnePlus returns with a flagship killer featuring Snapdragon 8 Elite, Hasselblad-tuned cameras, 100W fast charging, and a stunning 2K display at an aggressive price.",
    bestFor: ["value", "fast-charging", "gaming", "photography", "android-power-user"],
    specs: {
      display: { size: "6.82 inches", type: "LTPO AMOLED", resolution: "3168 x 1440", refreshRate: "120Hz LTPO", brightness: "4500 nits (peak)" },
      processor: { chipset: "Snapdragon 8 Elite", cpu: "Octa-core (2x4.32 GHz + 6x3.53 GHz)", gpu: "Adreno 830" },
      memory: { ram: "12GB / 16GB", storage: "256GB / 512GB", expandable: false },
      camera: { main: "50 MP Sony LYT-808 (f/1.6)", ultrawide: "50 MP (f/2.0)", telephoto: "50 MP 3x optical (f/2.6)", front: "32 MP (f/2.4)", video: "8K @ 24fps, 4K @ 120fps" },
      battery: { capacity: "6000 mAh", charging: "100W wired, 50W wireless", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", nfc: true, usb: "USB-C 3.2" },
      dimensions: { height: "162.9 mm", width: "76.5 mm", thickness: "8.5 mm", weight: "213 g" },
      os: "Android 15, OxygenOS 15",
      waterResistance: "IP69",
      biometrics: ["Ultrasonic Fingerprint", "Face Unlock"],
    },
    pros: ["Incredible 100W fast charging", "Massive 6000mAh battery", "Flagship specs at lower price", "Hasselblad camera tuning"],
    cons: ["OxygenOS not as polished as stock Android", "No 5x telephoto", "Brand recognition lower than Samsung/Apple", "Software updates fewer years"],
    reviews: [
      { id: "r10", source: "YouTube", title: "OnePlus 13 - The Best Value Flagship?", author: "Dave2D", rating: 9, snippet: "At $899, this is arguably the best spec-per-dollar phone on the market.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2025-01-10", type: "video" },
      { id: "r11", source: "YouTube", title: "OnePlus 13 Full Review", author: "Linus Tech Tips", rating: 8.5, snippet: "100W charging and that 6000mAh battery? Game changer.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2025-01-15", type: "video" },
      { id: "r12", source: "Android Authority", title: "OnePlus 13 Review", author: "Robert Triggs", rating: 8.7, snippet: "OnePlus delivers its most complete phone yet.", url: "https://androidauthority.com", date: "2025-01-07", type: "article" },
    ],
  },
  {
    id: "samsung-galaxy-s25",
    name: "Samsung Galaxy S25",
    brand: "Samsung",
    image: "/phones/samsung-s25.svg",
    price: 799,
    releaseDate: "2025-01-22",
    rating: 4.5,
    reviewCount: 5340,
    colors: ["Icy Blue", "Navy", "Mint", "Silver Shadow"],
    summary: "Samsung's compact flagship brings Snapdragon 8 Elite performance, Galaxy AI, and a refined design in a pocketable 6.2-inch form factor.",
    bestFor: ["compact", "everyday-use", "ai-features", "one-hand-use", "value"],
    specs: {
      display: { size: "6.2 inches", type: "Dynamic AMOLED 2X", resolution: "2340 x 1080", refreshRate: "120Hz LTPO", brightness: "2600 nits (peak)" },
      processor: { chipset: "Snapdragon 8 Elite for Galaxy", cpu: "Octa-core", gpu: "Adreno 830" },
      memory: { ram: "12 GB", storage: "128GB / 256GB / 512GB", expandable: false },
      camera: { main: "50 MP (f/1.8)", ultrawide: "12 MP (f/2.2)", front: "12 MP (f/2.2)", video: "8K @ 30fps, 4K @ 120fps" },
      battery: { capacity: "4000 mAh", charging: "25W wired, 15W wireless", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", nfc: true, usb: "USB-C 3.2" },
      dimensions: { height: "146.9 mm", width: "70.1 mm", thickness: "7.2 mm", weight: "162 g" },
      os: "Android 15, One UI 7",
      waterResistance: "IP68",
      biometrics: ["Ultrasonic Fingerprint", "Face Recognition"],
    },
    pros: ["Compact and lightweight", "Flagship performance", "Galaxy AI features", "7 years of updates"],
    cons: ["Smaller battery", "No telephoto camera", "Slower charging", "Base storage is only 128GB"],
    reviews: [
      { id: "r13", source: "YouTube", title: "Galaxy S25 - Small But Mighty", author: "MKBHD", rating: 8, snippet: "Finally, a compact flagship with no compromises on performance.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2025-01-25", type: "video" },
      { id: "r14", source: "The Verge", title: "Samsung Galaxy S25 review", author: "Allison Johnson", rating: 8, snippet: "Samsung proves you don't need a huge phone to get a great experience.", url: "https://theverge.com", date: "2025-01-22", type: "article" },
    ],
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    brand: "Apple",
    image: "/phones/iphone-16.svg",
    price: 799,
    releaseDate: "2024-09-20",
    rating: 4.5,
    reviewCount: 9870,
    colors: ["Black", "White", "Pink", "Teal", "Ultramarine"],
    summary: "The standard iPhone 16 gets the Action Button, Camera Control, and the capable A18 chip, making it the best mainstream iPhone yet.",
    bestFor: ["everyday-use", "ios-ecosystem", "value", "photography", "simplicity"],
    specs: {
      display: { size: "6.1 inches", type: "Super Retina XDR OLED", resolution: "2556 x 1179", refreshRate: "60Hz", brightness: "2000 nits (peak)" },
      processor: { chipset: "Apple A18", cpu: "6-core", gpu: "5-core GPU" },
      memory: { ram: "8 GB", storage: "128GB / 256GB / 512GB", expandable: false },
      camera: { main: "48 MP (f/1.6)", ultrawide: "12 MP (f/2.2)", front: "12 MP TrueDepth", video: "4K Dolby Vision @ 60fps" },
      battery: { capacity: "3561 mAh", charging: "20W wired, 15W MagSafe", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.3", nfc: true, usb: "USB-C 2.0" },
      dimensions: { height: "147.6 mm", width: "71.6 mm", thickness: "7.8 mm", weight: "170 g" },
      os: "iOS 18",
      waterResistance: "IP68",
      biometrics: ["Face ID"],
    },
    pros: ["Great camera for the price", "Action Button added", "Powerful A18 chip", "Excellent software support"],
    cons: ["Still 60Hz display", "Slower charging", "No telephoto lens", "USB 2.0 speeds"],
    reviews: [
      { id: "r15", source: "YouTube", title: "iPhone 16 Review - The One to Get", author: "Dave2D", rating: 8, snippet: "For most people, this is the iPhone to buy. Great value.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2024-09-22", type: "video" },
      { id: "r16", source: "Wired", title: "iPhone 16 Review", author: "Julian Chokkattu", rating: 8, snippet: "A solid upgrade that makes the standard iPhone feel more premium.", url: "https://wired.com", date: "2024-09-20", type: "article" },
    ],
  },
  {
    id: "google-pixel-9a",
    name: "Google Pixel 9a",
    brand: "Google",
    image: "/phones/pixel-9a.svg",
    price: 499,
    releaseDate: "2025-03-19",
    rating: 4.5,
    reviewCount: 3210,
    colors: ["Iris", "Porcelain", "Obsidian", "Peony"],
    summary: "Google's most affordable Pixel yet brings the Tensor G4 chip, exceptional camera quality, Gemini AI, and a beautiful OLED display at a fraction of the flagship price.",
    bestFor: ["budget", "photography", "ai-features", "clean-android", "value"],
    specs: {
      display: { size: "6.3 inches", type: "Actua OLED", resolution: "2424 x 1080", refreshRate: "120Hz", brightness: "2700 nits (peak)" },
      processor: { chipset: "Google Tensor G4", cpu: "Octa-core", gpu: "Mali-G715" },
      memory: { ram: "8 GB", storage: "128GB / 256GB", expandable: false },
      camera: { main: "48 MP (f/1.7)", ultrawide: "16 MP (f/2.2)", front: "13 MP (f/2.2)", video: "4K @ 60fps" },
      battery: { capacity: "5100 mAh", charging: "23W wired, 7.5W wireless", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.3", nfc: true, usb: "USB-C 3.2" },
      dimensions: { height: "154.7 mm", width: "73.3 mm", thickness: "8.9 mm", weight: "186 g" },
      os: "Android 15",
      waterResistance: "IP68",
      biometrics: ["Under-display Fingerprint", "Face Unlock"],
    },
    pros: ["Incredible value for money", "Same Tensor G4 as Pro", "All Gemini AI features", "7 years of updates"],
    cons: ["No telephoto camera", "Slower charging", "Plastic build", "Lower RAM than Pro"],
    reviews: [
      { id: "r17", source: "YouTube", title: "Pixel 9a - Best Budget Phone 2025", author: "MKBHD", rating: 8.5, snippet: "Google somehow put Tensor G4 in a $499 phone. Incredible.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2025-03-20", type: "video" },
      { id: "r18", source: "The Verge", title: "Pixel 9a Review", author: "Allison Johnson", rating: 8.5, snippet: "The best mid-range phone, period.", url: "https://theverge.com", date: "2025-03-19", type: "article" },
    ],
  },
  {
    id: "samsung-galaxy-z-fold-6",
    name: "Samsung Galaxy Z Fold 6",
    brand: "Samsung",
    image: "/phones/galaxy-z-fold-6.svg",
    price: 1899,
    releaseDate: "2024-07-24",
    rating: 4.3,
    reviewCount: 4120,
    colors: ["Silver Shadow", "Navy", "Pink", "Crafted Black"],
    summary: "Samsung's most refined foldable yet with a wider cover screen, slimmer design, Snapdragon 8 Gen 3, and improved multitasking with Flex Mode.",
    bestFor: ["multitasking", "productivity", "foldable", "premium", "innovation"],
    specs: {
      display: { size: "7.6 inches (inner) / 6.3 inches (cover)", type: "Dynamic AMOLED 2X (both)", resolution: "2160 x 1856 (inner)", refreshRate: "120Hz LTPO (both)", brightness: "2600 nits (peak)" },
      processor: { chipset: "Snapdragon 8 Gen 3 for Galaxy", cpu: "Octa-core", gpu: "Adreno 750" },
      memory: { ram: "12 GB", storage: "256GB / 512GB / 1TB", expandable: false },
      camera: { main: "50 MP (f/1.8)", ultrawide: "12 MP (f/2.2)", telephoto: "10 MP 3x optical (f/2.4)", front: "10 MP (f/2.2) cover + 4 MP under-display", video: "8K @ 30fps, 4K @ 60fps" },
      battery: { capacity: "4400 mAh", charging: "25W wired, 15W wireless", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.3", nfc: true, usb: "USB-C 3.2" },
      dimensions: { height: "153.5 mm", width: "68.1 mm (folded)", thickness: "12.1 mm (folded)", weight: "239 g" },
      os: "Android 14, One UI 6.1.1",
      waterResistance: "IPX8",
      biometrics: ["Side Fingerprint", "Face Recognition"],
    },
    pros: ["Incredible tablet-like experience", "Improved durability", "Best foldable multitasking", "Slimmer and lighter design"],
    cons: ["Very expensive", "Visible crease on inner display", "Cover screen still narrow", "Under-display camera quality poor"],
    reviews: [
      { id: "r19", source: "YouTube", title: "Z Fold 6 - Is Foldable Ready?", author: "MKBHD", rating: 7.5, snippet: "The best foldable phone money can buy, but foldables still have trade-offs.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2024-07-27", type: "video" },
      { id: "r20", source: "YouTube", title: "Galaxy Z Fold 6 Full Review", author: "Mrwhosetheboss", rating: 8, snippet: "Samsung continues to lead the foldable market with meaningful improvements.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2024-08-01", type: "video" },
    ],
  },
  {
    id: "nothing-phone-3",
    name: "Nothing Phone (3)",
    brand: "Nothing",
    image: "/phones/nothing-phone-3.svg",
    price: 599,
    releaseDate: "2025-03-04",
    rating: 4.4,
    reviewCount: 2890,
    colors: ["White", "Black", "Grey"],
    summary: "Nothing's most ambitious phone yet with a unique Glyph Interface, AI-powered features, Snapdragon 8s Gen 3, and a design that stands out from every other phone.",
    bestFor: ["design", "unique-features", "value", "customization", "android-power-user"],
    specs: {
      display: { size: "6.5 inches", type: "LTPO AMOLED", resolution: "2756 x 1264", refreshRate: "120Hz LTPO", brightness: "1600 nits (peak)" },
      processor: { chipset: "Snapdragon 8s Gen 3", cpu: "Octa-core", gpu: "Adreno 735" },
      memory: { ram: "8GB / 12GB", storage: "128GB / 256GB", expandable: false },
      camera: { main: "50 MP (f/1.88)", ultrawide: "50 MP (f/2.2)", telephoto: "50 MP 3x optical (f/2.0)", front: "32 MP (f/2.45)", video: "4K @ 60fps" },
      battery: { capacity: "5500 mAh", charging: "65W wired, 15W wireless", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.3", nfc: true, usb: "USB-C 2.0" },
      dimensions: { height: "162.2 mm", width: "76.2 mm", thickness: "8.3 mm", weight: "199 g" },
      os: "Android 15, Nothing OS 3.0",
      waterResistance: "IP65",
      biometrics: ["Under-display Fingerprint", "Face Unlock"],
    },
    pros: ["Unique transparent design with Glyph", "Great value for specs", "Interesting AI features", "Excellent haptics"],
    cons: ["IP65 vs IP68", "USB 2.0 speeds", "Brand is still young", "Camera not quite flagship level"],
    reviews: [
      { id: "r21", source: "YouTube", title: "Nothing Phone (3) - Style Meets Substance", author: "Dave2D", rating: 8, snippet: "Nothing continues to be the most exciting new brand in smartphones.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2025-03-06", type: "video" },
      { id: "r22", source: "YouTube", title: "Nothing Phone 3 Review", author: "Mrwhosetheboss", rating: 8.5, snippet: "The Glyph Interface and design philosophy make this stand out.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2025-03-05", type: "video" },
    ],
  },
  {
    id: "xiaomi-15-pro",
    name: "Xiaomi 15 Pro",
    brand: "Xiaomi",
    image: "/phones/xiaomi-15-pro.svg",
    price: 749,
    releaseDate: "2025-02-27",
    rating: 4.5,
    reviewCount: 3450,
    colors: ["White", "Black", "Green"],
    summary: "Xiaomi's flagship delivers Leica-tuned cameras, Snapdragon 8 Elite, blazing 90W charging, and a gorgeous 2K display, offering exceptional specs at a competitive price.",
    bestFor: ["photography", "value", "fast-charging", "gaming", "multimedia"],
    specs: {
      display: { size: "6.73 inches", type: "LTPO AMOLED", resolution: "3200 x 1440", refreshRate: "120Hz LTPO", brightness: "3200 nits (peak)" },
      processor: { chipset: "Snapdragon 8 Elite", cpu: "Octa-core", gpu: "Adreno 830" },
      memory: { ram: "12GB / 16GB", storage: "256GB / 512GB / 1TB", expandable: false },
      camera: { main: "50 MP Leica Summilux (f/1.44)", ultrawide: "50 MP (f/2.0)", telephoto: "50 MP 3x optical (f/2.5)", front: "32 MP (f/2.0)", video: "8K @ 24fps, 4K @ 120fps" },
      battery: { capacity: "5500 mAh", charging: "90W wired, 50W wireless", wireless: true },
      connectivity: { fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", nfc: true, usb: "USB-C 3.2" },
      dimensions: { height: "161.3 mm", width: "75.2 mm", thickness: "8.4 mm", weight: "213 g" },
      os: "Android 15, HyperOS 2",
      waterResistance: "IP68",
      biometrics: ["Ultrasonic Fingerprint", "Face Unlock"],
    },
    pros: ["Leica camera partnership delivers stunning photos", "90W fast charging", "Excellent price-to-performance", "Beautiful 2K AMOLED display"],
    cons: ["HyperOS has bloatware", "Limited availability in US", "No eSIM in some markets", "Software updates less consistent"],
    reviews: [
      { id: "r23", source: "YouTube", title: "Xiaomi 15 Pro - Leica's Best Phone Camera?", author: "SuperSaf", rating: 9, snippet: "The Leica camera system produces photos with beautiful color science and detail.", url: "https://youtube.com", youtubeId: "dQw4w9WgXcQ", date: "2025-03-01", type: "video" },
      { id: "r24", source: "GSMArena", title: "Xiaomi 15 Pro review", author: "GSMArena Team", rating: 8.5, snippet: "An excellent all-rounder that punches well above its price point.", url: "https://gsmarena.com", date: "2025-02-28", type: "article" },
    ],
  },
];

export function getPhoneById(id: string): Phone | undefined {
  return phones.find((p) => p.id === id);
}

export function getPhonesByBrand(brand: string): Phone[] {
  return phones.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

export function searchPhones(query: string): Phone[] {
  const q = query.toLowerCase();
  return phones.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.specs.processor.chipset.toLowerCase().includes(q)
  );
}

export function filterPhones(filters: {
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  features?: string[];
  searchQuery?: string;
}): Phone[] {
  let result = [...phones];

  if (filters.searchQuery) {
    result = searchPhones(filters.searchQuery);
  }
  if (filters.brands && filters.brands.length > 0) {
    result = result.filter((p) =>
      filters.brands!.some((b) => p.brand.toLowerCase() === b.toLowerCase())
    );
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.minRating !== undefined) {
    result = result.filter((p) => p.rating >= filters.minRating!);
  }
  if (filters.features && filters.features.length > 0) {
    result = result.filter((p) =>
      filters.features!.some((f) => p.bestFor.includes(f))
    );
  }

  return result;
}

export const allBrands = Array.from(new Set(phones.map((p) => p.brand)));
export const priceRange: [number, number] = [
  Math.min(...phones.map((p) => p.price)),
  Math.max(...phones.map((p) => p.price)),
];
