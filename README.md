# 🎓 CampusFind — Lost & Found Web Portal

An aesthetic, minimal, and modern campus lost-and-found web application designed for students, faculty, and campus security.

---

## 🌟 Key Features

### 1. 🔍 Report Found Items (Receivers / Finders)
- **Product Name & Model**: Specify exact title.
- **Color Selection**: Visual swatches (Black, White, Blue, Red, Green, Grey, Gold, Brown, Pink, etc.) + custom colors.
- **Category Taxonomy**: Electronics, IDs & Cards, Keys, Bags & Wallets, Books & Stationery, Clothing, Bottles, and Others.
- **Campus Location**: Pick designated campus spots (Library 2nd Floor, Cafeteria, Science Block, Gym, Hostels, etc.) or enter a custom location.
- **Timestamp**: Date & time picker.
- **Detailed Description**: Scratches, serial numbers, case markings, contents.
- **Photo Upload**: Drag-and-drop or select file with instant preview (Base64 data URL saved in browser storage).
- **Handover Desk**: Record where the item was safely deposited (e.g. Library reception, Main Security Gate).
- **Finder Contact**: Student name, email, and phone.

### 2. 📢 Report Lost Items (Owners)
- Symmetrical reporting flow for owners who lost an item.
- Specify last seen location, timestamp, and identifying marks.
- Optional reference photo upload.

### 3. ⚡ Smart Match Recommendations
- When viewing any Lost item, the system automatically checks for matching Found items (matching category, similar color, or keyword overlap) and displays them under **"Potential Matches Found"**!
- Allows instant cross-referencing to reunite belongings faster.

### 4. 🤝 Verification & Claim Process
- **Proof of Ownership**: Claimants must provide secret identifying details not visible in public photos (e.g., lock screen wallpaper, specific cards inside wallet, serial number).
- **Campus Safety Guidelines**: Designated safe drop-off desks (Library, Student Welfare, Gate 1 Security) with hours and contact lines.
- **Reunited Status**: Items can be marked as reunited with celebratory confetti.

### 5. 🎨 Aesthetic & Minimal Design
- Modern Scandinavian minimalism with delicate glassmorphism, clean typography, badge pills, and responsive layout for mobile, tablet, and desktop.
- Live search bar, multi-category chips, location filters, and sorting.
- Persistent local storage (`localStorage`) so your reported items remain saved across page refreshes.

---

## 🚀 Running Locally

```bash
# 1. Navigate to the project directory
cd C:\Users\anshi\.gemini\antigravity\scratch\campus-lost-found

# 2. Install dependencies (already installed)
npm install

# 3. Start development server
npm run dev
```

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your web browser.
