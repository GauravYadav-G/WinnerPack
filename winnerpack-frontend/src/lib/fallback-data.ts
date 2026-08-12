export const initialProducts = [
  // --- LABELS ---
  {
    id: "plain-labels",
    title: "Plain Labels",
    category: "label-sticker-products",
    tag: "Plain",
    blurb: "Paper labels which can be affixed to containers or products for clear item information. Available in custom colors and specifications.",
    longDesc: "We provide paper labels which can be affixed to a container or products, on which information about the product or items is mentioned. Available in colours, these paper labels can also be customized as per the requirement.\n\n### Key Product Features:\n- **Versatile Substrates**: Premium Chromo paper, art paper, and direct thermal paper grades.\n- **Custom Color Options**: Available in vibrant solid colors for inventory tint coding and identification.\n- **High Tack Permanent Adhesive**: Formulated with hot-melt pressure-sensitive adhesive that bonds to corrugated, plastic, glass, and wood.\n- **Printer Compatibility**: Works seamlessly with thermal transfer and flexographic desktop barcode printers.\n- **Custom Sizing & Die-Cutting**: Custom roll widths, core sizes (1-inch & 3-inch), and die-cut shapes on demand.",
    image: "/images/products/plain-labels/image.png",
    gallery: [
      "/images/products/plain-labels/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/product_app_warehouse_dispatch.png"
    ],
    specs: {
      "Material Type": "Premium Chromo / Art Paper / Thermal Stock",
      "Adhesive Grade": "Permanent Hot-Melt & Acrylic Emulsion",
      "Color Options": "Pure White, Solid Yellow, Blue, Green, Red",
      "Core Diameter": "1 Inch / 1.5 Inch / 3 Inch Cardboard Core",
      "Supported Printers": "Zebra, TSC, Honeywell, SATO, Citizen",
      "Format Types": "Die-Cut Roll / Fanfold Sheet / Perforated",
    },
    thicknessLengthMatrix: [
      { micron: "50x25 mm", gauge: "2,000/Roll", meters: "53", feet: "174" },
      { micron: "50x50 mm", gauge: "1,500/Roll", meters: "78", feet: "256" },
      { micron: "100x50 mm", gauge: "1,000/Roll", meters: "53", feet: "174" },
      { micron: "100x100 mm", gauge: "800/Roll", meters: "83", feet: "272" },
      { micron: "100x150 mm", gauge: "500/Roll", meters: "78", feet: "256" },
      { micron: "100x200 mm", gauge: "400/Roll", meters: "83", feet: "272" },
    ],
    subCategories: [
      {
        id: "plain-chromo-labels",
        title: "Plain Chromo Paper Labels",
        subtitle: "White & Solid Colored Unprinted Roll Labels for Packaging",
        blurb: "High-quality unprinted chromo paper label rolls with permanent adhesive backing. Designed for clear product identification, warehouse bin marking, and color-coded carton labeling.",
        image: "/images/products/plain-labels/image.png",
        specs: {
          "Face Paper": "80 GSM Semi-Gloss Chromo Paper",
          "Adhesive": "High Tack Permanent Rubber Base Glue",
          "Liner": "62 GSM Glassine Release Liner",
          "Available Cores": "1 Inch (25mm) / 3 Inch (76mm)",
        },
        applications: ["Outer carton identification tags", "Warehouse bin & shelf marking", "Logistics sorting stickers"],
      },
      {
        id: "plain-thermal-transfer-labels",
        title: "Plain Thermal Transfer Labels",
        subtitle: "Ribbon-Compatible White Transfer Stickers for Barcode Printers",
        blurb: "Smooth surface white paper labels optimized for wax and wax-resin thermal ribbon printing. Delivers sharp barcode print edges and durable text readability.",
        image: "/images/products/plain-labels/applications/app-1.png",
        specs: {
          "Face Stock": "Premium Thermal Transfer Paper",
          "Ribbon Match": "Wax / Wax-Resin Thermal Ribbon",
          "Service Temperature": "-20°C to +80°C",
          "Gap Distance": "2 mm / 3 mm standard die gap",
        },
        applications: ["E-commerce shipping carton labels", "Inventory pallet identification", "Retail box pricing stickers"],
      }
    ],
    options: {
      widths: ["50 mm", "75 mm", "100 mm", "150 mm"],
      thicknesses: ["80 GSM Chromo", "85 GSM Art Paper"],
      colors: ["Pure White", "Signal Red", "Safety Yellow", "Ocean Blue"],
    },
    applications: ["E-commerce shipping labels", "Warehouse barcode sticker", "Inventory box labeling"],
    visualGradients: "from-amber-400 to-orange-500",
  },
  {
    id: "printed-labels",
    title: "Printed Labels",
    category: "label-sticker-products",
    tag: "Printed",
    blurb: "Printed labels are custom labels made as per customer requirements using digital, flexographic, and wide format printing.",
    longDesc: "Printed labels are custom labels which are made as per customer requirements. And are printed through various methods like digital printing, flexographic printing, and wide format printing. All these have different results of printing.\n\n### Key Product Features:\n- **Multi-Method High-Resolution Printing**: Printed using digital printing for short runs, flexographic printing for high volumes, and wide format printing for large labels.\n- **Custom Branding & Graphics**: Up to 8-color UV ink printing with crisp typography, QR codes, and photo-realistic graphics.\n- **Surface Protective Coatings**: Glossy UV lamination, matte top-coat, and scratch-resistant varnishes.\n- **Food & Pharma Grade Inks**: Non-toxic, low-odor inks compliant with FDA indirect food contact guidelines.\n- **Automatic Applicator Ready**: Precision gap die-cutting and winding directions for high-speed automatic label application machines.",
    image: "/images/products/printed-labels/image.png",
    gallery: [
      "/images/products/printed-labels/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/product_app_warehouse_dispatch.png"
    ],
    specs: {
      "Print Methods": "Digital / Flexographic / Wide Format Printing",
      "Material Base": "Chromo Paper / Glossy BOPP / Metallic PET Film",
      "Coatings & Laminations": "Glossy UV Lamination / Soft-Touch Matte / Foil Stamping",
      "Color Capabilities": "Up to 8 Colors CMYK + Pantone Spot Colors",
      "Roll Winding": "Face Out / Face In (Custom Direction 1-8)",
      "Die Cut Shapes": "Rectangular / Square / Oval / Custom Contour Die-Cut",
    },
    thicknessLengthMatrix: [
      { micron: "38x25 mm", gauge: "2,500/Roll", meters: "66", feet: "216" },
      { micron: "50x75 mm", gauge: "1,000/Roll", meters: "78", feet: "256" },
      { micron: "100x100 mm", gauge: "1,000/Roll", meters: "104", feet: "341" },
      { micron: "100x150 mm", gauge: "750/Roll", meters: "116", feet: "380" },
      { micron: "150x200 mm", gauge: "500/Roll", meters: "103", feet: "338" },
      { micron: "200x300 mm", gauge: "250/Roll", meters: "78", feet: "256" },
    ],
    subCategories: [
      {
        id: "flexo-digital-printed-labels",
        title: "Flexographic & Digital Printed Labels",
        subtitle: "High-Volume & Short-Run Custom Product Branding Stickers",
        blurb: "Custom roll labels printed via flexography for mass production or digital printing for short-run SKU variations. Delivers vibrant color accuracy, photo quality detail, and durable surface protection.",
        image: "/images/products/printed-labels/image.png",
        specs: {
          "Printing Process": "8-Color Flexo Press / HP Indigo Digital",
          "Special Effects": "Hot Foil Stamping / Spot UV Varnish / Embossing",
          "Format": "Continuous Roll / Pre-Cut Single Sheet",
          "Adhesive": "Waterproof Acrylic Emulsion Glue",
        },
        applications: ["Cosmetic bottle & jar branding", "Food item container labels", "Pharmaceutical product bottles"],
      },
      {
        id: "wide-format-printed-labels",
        title: "Wide Format & Promotional Labels",
        subtitle: "Large Format Vinyl Stickers & High-Impact Promotional Labels",
        blurb: "Large format printed labels produced on wide-format inkjet presses. Ideal for equipment rating plates, promotional window graphics, drum labels, and outdoor weatherproof branding stickers.",
        image: "/images/products/printed-labels/applications/app-1.png",
        specs: {
          "Printing Process": "Eco-Solvent / UV Wide Format Printing",
          "Substrate": "Heavy-Duty Vinyl / Polypropylene (PP)",
          "Weather Resistance": "UV Stabilized 3-Year Outdoor Durability",
          "Adhesive": "High Tack Solvent Acrylic Glue",
        },
        applications: ["Chemical drum warning decals", "Machine rating plates", "Promotional window & floor graphics"],
      }
    ],
    options: {
      widths: ["Custom Widths (20mm to 300mm)"],
      thicknesses: ["80 GSM Chromo", "60 Micron PP"],
      colors: ["Full Color CMYK", "Pantone Spot Colors", "Metallic Gold & Silver"],
    },
    applications: ["Cosmetics branding", "Food item jars", "Promotional packaging seal"],
    visualGradients: "from-amber-400 to-orange-500",
  },
  {
    id: "barcode-labels",
    title: "Barcode Labels",
    category: "label-sticker-products",
    tag: "Barcode",
    blurb: "Barcode labels provide regulatory information on product tracking, order delivery, transport details, and quality control across all manufacture and distribution phases.",
    longDesc: "Barcode labels are those which provide regulatory information on product tracking and identification, such as order, delivery and transport details, are an essential feature of our product tracking and management systems; they provide for the scanning of incoming and outgoing products and quality control across all phases of manufacture and distribution providing full supply chain visibility when used in conjunction with all stakeholders.\n\n### Key Product Features:\n- **Full Supply Chain Visibility**: Enables instant 1D/2D scanning of incoming and outgoing freight, batch tracking, and quality control.\n- **High Scannability Rate**: Crisp edge definition ensures 99.9%+ read rates under 1D laser and 2D matrix optical scanners.\n- **Extreme Durability**: Resistant to smudge, friction, chemical solvents, and logistics transit abrasion.\n- **Regulatory Compliance**: Meets GS1, ISO/IEC 15416, and global logistics transport labeling standards.\n- **Universal Printer Compatibility**: Works with Zebra, TSC, Honeywell, SATO, and Citizen thermal transfer printers.",
    image: "/images/products/barcode-labels/image.png",
    gallery: [
      "/images/products/barcode-labels/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/product_app_warehouse_dispatch.png"
    ],
    specs: {
      "Barcode Standards": "EAN-13, Code 128, QR Code, Data Matrix, GS1-128",
      "Read Compliance": "99.9% Scanner Optical Read Compliance",
      "Label Stock": "Premium Chromo Paper / Direct Thermal / Polyester",
      "Ribbon Grade": "Wax / Premium Wax-Resin / Full Resin Ribbon",
      "Liner Type": "Super-Calendered Glassine Release Paper",
      "Core Standards": "1 Inch (25mm) / 1.5 Inch / 3 Inch (76mm)",
    },
    thicknessLengthMatrix: [
      { micron: "38x25 mm", gauge: "2,000/Roll", meters: "53", feet: "174" },
      { micron: "50x25 mm", gauge: "2,000/Roll", meters: "53", feet: "174" },
      { micron: "50x50 mm", gauge: "1,000/Roll", meters: "53", feet: "174" },
      { micron: "100x50 mm", gauge: "1,000/Roll", meters: "53", feet: "174" },
      { micron: "100x100 mm", gauge: "500/Roll", meters: "52", feet: "170" },
      { micron: "100x150 mm", gauge: "500/Roll", meters: "78", feet: "256" },
    ],
    subCategories: [
      {
        id: "thermal-transfer-barcode-labels",
        title: "Thermal Transfer Barcode Labels",
        subtitle: "Smudge-Proof Paper & Synthetic Barcode Labels for Warehousing",
        blurb: "Precision die-cut thermal transfer barcode label rolls engineered for high-density 1D and 2D barcode printing using wax or wax-resin ribbons. Guarantees 99.9% optical scanner read rates across supply chain logistics.",
        image: "/images/products/barcode-labels/image.png",
        specs: {
          "Stock Base": "White Semi-Gloss Chromo Paper / Synthetic PET",
          "Printing Ribbon": "Wax / Resin Ribbon Compatible",
          "Adhesive": "High Shear Permanent Acrylic Adhesive",
          "Format": "1-Up / 2-Up / 3-Up Die-Cut Roll Formats",
        },
        applications: ["Pallet batch barcode tracking", "Warehouse inventory bin labels", "Logistics shipping carton barcodes"],
      },
      {
        id: "gs1-data-matrix-barcode-labels",
        title: "GS1 & Data Matrix Barcode Labels",
        subtitle: "Regulatory Traceability & Serialization Stickers for Pharma & Retail",
        blurb: "High-resolution pre-printed or blank barcode labels formatted to strict GS1-128 and 2D Data Matrix serialization standards. Provides complete batch traceability, expiration date tracking, and quality control auditing.",
        image: "/images/products/barcode-labels/applications/app-1.png",
        specs: {
          "Symbology": "GS1 DataMatrix / QR Code / Code 39 / EAN-13",
          "Verification Standard": "ISO/IEC 15415 Grade A Verification",
          "Chemical Resistance": "Resistant to alcohol, oil, and moisture wipe-downs",
          "Format": "Serialized Consecutive Barcode Roll Printing",
        },
        applications: ["Pharmaceutical serialization labels", "Medical device tracking stickers", "Retail asset & price tag barcodes"],
      }
    ],
    options: {
      widths: ["38x25 mm", "50x25 mm", "50x50 mm", "100x50 mm", "100x150 mm"],
      thicknesses: ["85 GSM Chromo", "50 Micron Polyester"],
      colors: ["Bright White", "High-Contrast Yellow"],
    },
    applications: ["Product code stickers", "Asset tracking tags", "Supermarket pricing stickers"],
    visualGradients: "from-amber-400 to-orange-500",
  },
  {
    id: "product-labels",
    title: "Product Labels",
    category: "label-sticker-products",
    tag: "Product",
    blurb: "Product labels are any material attached to a product or container to identify contents, brand, manufacturer, and distributor information.",
    longDesc: "Product labels are any piece of material attached to a product to identify it, or to a container to identify its contents. Information that is directly written on a product can also be considered a label. Product labels don’t necessarily contain information on the item, and may also include other information, including but not limited to the brand, manufacturer, and distributor.\n\n### Key Product Features:\n- **Comprehensive Product Identification**: Displays brand logo, ingredient list, usage directions, manufacturer, and distributor details.\n- **Premium Substrate Options**: Clear PP film, white BOPP, metallic foil paper, and textured craft paper.\n- **Moisture & Oil Resistance**: Formulated to withstand condensation, oils, and refrigeration without peeling or smudging.\n- **Custom Die-Cut Shapes**: Circle, oval, rectangular, and intricate custom contour die-cuts for retail jars and bottles.\n- **Strong Adhesive Bonding**: Pressure-sensitive adhesive engineered for permanent bonding to glass, plastic, metal, and cardboard.",
    image: "/images/products/product-labels/image.png",
    gallery: [
      "/images/products/product-labels/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/product_app_warehouse_dispatch.png"
    ],
    specs: {
      "Substrates Available": "Clear BOPP / White PP Film / Metallic PET / Chromo Paper",
      "Moisture Resistance": "100% Water & Condensation Proof",
      "Adhesive System": "High-Tack Emulsion Acrylic / Solvent Permanent Glue",
      "Surface Finishes": "Spot UV Gloss / Tactile Matte / Gold & Silver Hot Foil",
      "Application Temperature": "0°C to 50°C",
      "Die-Cut Precision": "High-Precision Rotary Die-Cutting (+/- 0.2mm)",
    },
    thicknessLengthMatrix: [
      { micron: "40 mm Round", gauge: "1,500/Roll", meters: "63", feet: "206" },
      { micron: "50x75 mm", gauge: "1,000/Roll", meters: "78", feet: "256" },
      { micron: "75x100 mm", gauge: "1,000/Roll", meters: "104", feet: "341" },
      { micron: "100x120 mm", gauge: "750/Roll", meters: "93", feet: "305" },
      { micron: "100x150 mm", gauge: "500/Roll", meters: "78", feet: "256" },
      { micron: "120x180 mm", gauge: "400/Roll", meters: "75", feet: "246" },
    ],
    subCategories: [
      {
        id: "clear-metallic-product-labels",
        title: "Clear & Metallic Product Labels",
        subtitle: "Transparent BOPP & Metallic Foil Labels for Premium Packaging",
        blurb: "Crystal-clear 'no label look' transparent polypropylene stickers and metallic foil embossed labels. Provides luxury shelf presentation for perfume bottles, glass jars, and premium cosmetic containers.",
        image: "/images/products/product-labels/image.png",
        specs: {
          "Material Base": "Ultra-Clear 50 Micron BOPP Film / Metallic Silver PET",
          "Adhesive": "Water-Clear Non-Yellowing Acrylic Glue",
          "Print Finish": "White Under-Print + High Gloss UV Coating",
          "Squeeze Tolerance": "High Flexibility for Squeezable Plastic Bottles",
        },
        applications: ["Cosmetics & skincare squeeze tubes", "Glass perfume & beverage bottles", "Luxury retail gift boxes"],
      },
      {
        id: "jar-bottle-product-labels",
        title: "Jar & Bottle Product Labels",
        subtitle: "Waterproof & Oil-Resistant Labels for Food, Beverage & Pharma Containers",
        blurb: "Waterproof and oil-resistant product labels engineered for glass, PET, and HDPE bottles. Withstands cold storage condensation, grease, and rough handling without peeling or color fading.",
        image: "/images/products/product-labels/applications/app-1.png",
        specs: {
          "Substrate": "Synthetic White PP / Water-Resistant Art Paper",
          "Oil Barrier": "Special oil and chemical resistant top-coat",
          "Cold Storage Performance": "Deep-Freeze (-20°C) grade adhesive option",
          "Format": "Continuous Roll Winding for Automatic Bottle Labelers",
        },
        applications: ["Edible oil & sauce glass jars", "Beverage bottle front & back labels", "Pharma supplement bottles"],
      }
    ],
    options: {
      widths: ["Custom Sizes (Circle, Oval, Rectangle, Special Contour)"],
      thicknesses: ["60 Micron PP Film", "80 GSM Chromo"],
      colors: ["Full Color CMYK", "Metallic Gold", "Clear Transparent"],
    },
    applications: ["Beverage bottles", "Squeeze tube packaging", "Premium retail boxes"],
    visualGradients: "from-amber-400 to-orange-500",
  },
  {
    id: "self-adhesive-labels",
    title: "Self Adhesive Labels",
    category: "label-sticker-products",
    tag: "Self Adhesive",
    blurb: "Pressure sensitive labels made of three layers: release liner, adhesive layer, and face material. Sticks without wetting or glue application.",
    longDesc: "Self-adhesive labels (also known as pressure sensitive labels) are made by printing onto construction of three layers: a release liner (backing paper), a layer of adhesive and the face material. A self-adhesive label is a small piece of paper designed to be affixed to any surface such as paper, plastic, wood, glass or metal typically by the action of layer of adhesive on the front or back of the label. It sticks without wetting or application of glue to the product.\n\n### Key Product Features:\n- **3-Layer Sandwich Structure**: Face material, pressure-sensitive adhesive layer, and siliconized release liner.\n- **Instant Pressure Bonding**: Sticks instantly upon light contact without heat, water activation, or glue application.\n- **Universal Surface Adhesion**: Bonds securely to paper, plastic, wood, glass, polished metal, and textured cardboard.\n- **High Tack & Shear Strength**: Formulated with permanent acrylic or hot-melt adhesive that resists environmental peeling.\n- **Automatic Machine Dispensing**: Precision die-cut with consistent gap spacing for high-speed automatic labeling equipment.",
    image: "/images/products/self-adhesive-labels/image.png",
    gallery: [
      "/images/products/self-adhesive-labels/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/product_app_warehouse_dispatch.png"
    ],
    specs: {
      "Structure": "3-Layer Sandwich (Face Material + Adhesive + Release Liner)",
      "Adhesive Type": "Pressure Sensitive Permanent Acrylic / Hot-Melt Rubber",
      "Release Liner": "62 GSM Super-Calendered Glassine / Kraft Liner",
      "Application Surfaces": "Paper, Plastic, Wood, Glass, Metal, Corrugated",
      "Activation Method": "Light Pressure Contact (No water or glue required)",
      "Dispensing Compatibility": "Manual Dispensing & Automatic Machine Labeling",
    },
    thicknessLengthMatrix: [
      { micron: "25x50 mm", gauge: "2,500/Roll", meters: "66", feet: "216" },
      { micron: "50x75 mm", gauge: "1,500/Roll", meters: "116", feet: "380" },
      { micron: "100x50 mm", gauge: "1,000/Roll", meters: "53", feet: "174" },
      { micron: "100x100 mm", gauge: "1,000/Roll", meters: "104", feet: "341" },
      { micron: "100x150 mm", gauge: "500/Roll", meters: "78", feet: "256" },
      { micron: "150x200 mm", gauge: "400/Roll", meters: "83", feet: "272" },
    ],
    subCategories: [
      {
        id: "paper-self-adhesive-labels",
        title: "Paper Self-Adhesive Labels",
        subtitle: "Chromo & Art Paper Pressure-Sensitive Sticker Rolls",
        blurb: "Versatile 3-layer paper self-adhesive labels featuring high-tack permanent adhesive on glassine liner. Delivers instant bonding over cardboard boxes, paper bags, and dry packaging containers.",
        image: "/images/products/self-adhesive-labels/image.png",
        specs: {
          "Face Stock": "80 GSM Semi-Gloss Chromo Paper",
          "Adhesive": "Pressure Sensitive Hot-Melt Rubber Base Glue",
          "Liner": "Yellow / White Glassine Release Liner",
          "Service Temp": "-10°C to +70°C",
        },
        applications: ["Carton shipping seals & address stickers", "Retail product barcode tags", "Warehouse inventory identification"],
      },
      {
        id: "film-self-adhesive-labels",
        title: "Film Self-Adhesive Labels",
        subtitle: "Waterproof Polypropylene & Vinyl Pressure-Sensitive Stickers",
        blurb: "Heavy-duty synthetic film self-adhesive labels (BOPP, PE, Vinyl) engineered for extreme weather, moisture, oil, and outdoor UV exposure without peeling or tearing.",
        image: "/images/products/self-adhesive-labels/applications/app-1.png",
        specs: {
          "Face Stock": "60 Micron White / Clear Polypropylene Film",
          "Adhesive": "Waterproof Permanent Acrylic Emulsion Glue",
          "Tear Resistance": "Ultra-High Tensile & Tear Resistance",
          "Outdoor Life": "Up to 2 years UV stability",
        },
        applications: ["Outdoor chemical drum labels", "Automotive & industrial equipment tags", "Cold storage & freezer product stickers"],
      }
    ],
    options: {
      widths: ["50 mm", "100 mm", "150 mm", "200 mm"],
      thicknesses: ["82 GSM Chromo", "60 Micron PP Film"],
      colors: ["Pure White", "Signal Yellow", "Glass Clear"],
    },
    applications: ["Chemical drum warning sticker", "Logistics dispatch tags", "Carton shipping seals"],
    visualGradients: "from-amber-400 to-orange-500",
  },
  {
    id: "thermal-labels",
    title: "Thermal Labels",
    category: "label-sticker-products",
    tag: "Thermal",
    blurb: "Thermal labels printed via direct thermal or thermal transfer heat processes to apply imagery or writing to specially-treated surfaces.",
    longDesc: "Thermal labels can refer to labels printed via one of two processes that use heat to apply imagery or writing to specially-treated surfaces. Direct thermal labels utilize heat-sensitive chemical coatings that react directly with thermal printheads without ink ribbons, while thermal transfer labels use heat to melt wax or resin ribbon ink onto label stock for long-lasting readability.\n\n### Key Product Features:\n- **Dual Thermal Printing Compatibility**: Available in Direct Thermal (ribbonless) and Thermal Transfer (ribbon-required) grades.\n- **Ribbonless Cost Efficiency**: Direct thermal labels eliminate ribbon costs for high-volume shipping, courier, and weight scale printing.\n- **High Heat Sensitivity**: Coated with high-sensitivity thermographic chemical layer for sharp, high-contrast text and barcodes.\n- **Moisture & Scratch Top-Coat**: Top-coated direct thermal paper shields prints from moisture, mild friction, and light grease.\n- **Core Options**: Standard 1-inch and 3-inch cardboard cores compatible with desktop and industrial thermal printers.",
    image: "/images/products/thermal-labels/image.png",
    gallery: [
      "/images/products/thermal-labels/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/product_app_warehouse_dispatch.png"
    ],
    specs: {
      "Printing Processes": "Direct Thermal (Ribbonless) / Thermal Transfer (Ribbon Required)",
      "Coating Grade": "High-Sensitivity Thermographic Coated Paper",
      "Top-Coat Shield": "Moisture, Scratch & Grease Protective Top-Coat",
      "Core Diameters": "1 Inch (25mm) / 1.5 Inch / 3 Inch (76mm)",
      "Printer Compatibility": "Zebra, TSC, Honeywell, SATO, Citizen, Godex",
      "Format Types": "Die-Cut Roll / Fanfold Stacked / Perforated Gap",
    },
    thicknessLengthMatrix: [
      { micron: "38x25 mm", gauge: "2,000/Roll", meters: "53", feet: "174" },
      { micron: "50x25 mm", gauge: "2,000/Roll", meters: "53", feet: "174" },
      { micron: "50x50 mm", gauge: "1,500/Roll", meters: "78", feet: "256" },
      { micron: "100x50 mm", gauge: "1,000/Roll", meters: "53", feet: "174" },
      { micron: "100x150 mm", gauge: "500/Roll", meters: "78", feet: "256" },
      { micron: "100x150 mm", gauge: "1,000/Roll", meters: "154", feet: "505" },
    ],
    subCategories: [
      {
        id: "direct-thermal-labels",
        title: "Direct Thermal Labels",
        subtitle: "Ribbonless Heat-Sensitive Shipping & Courier Sticker Rolls",
        blurb: "Coated with a heat-sensitive layer that turns black when exposed to thermal printheads. Eliminates ink ribbon costs, perfect for high-speed e-commerce shipping labels, courier waybills, and weight scale tags.",
        image: "/images/products/thermal-labels/image.png",
        specs: {
          "Printing Tech": "Direct Thermal (Zero Ribbon Needed)",
          "Paper Coating": "Top-Coated Thermal Sensitive Paper",
          "Adhesive": "All-Temperature Permanent Acrylic Glue",
          "Perforation": "Horizontal Perforated Gap Between Labels",
        },
        applications: ["E-commerce shipping & courier waybill stickers", "Supermarket weigh scale price tags", "Logistics dispatch & parcel tracking"],
      },
      {
        id: "thermal-transfer-paper-labels",
        title: "Thermal Transfer Labels",
        subtitle: "Wax/Resin Ribbon-Printed Long-Life Barcode & Inventory Labels",
        blurb: "Smooth surface thermal transfer paper label rolls designed for thermal transfer printers using wax or wax-resin ribbons. Produces ultra-durable, smudge-proof barcodes and text for long-term warehouse storage.",
        image: "/images/products/thermal-labels/applications/app-3.png",
        specs: {
          "Printing Tech": "Thermal Transfer (Requires Wax/Resin Ribbon)",
          "Face Paper": "Premium Matte/Semi-Gloss Chromo Paper",
          "Image Durability": "Long-life anti-fade & anti-smudge readability",
          "Core Sizes": "1 Inch Desktop Core / 3 Inch Industrial Core",
        },
        applications: ["Long-term warehouse shelf & bin labels", "Pallet shipment barcode tracking tags", "Manufacturing component identification"],
      }
    ],
    options: {
      widths: ["3x2 inches", "4x6 inches", "50x25 mm", "100x50 mm", "100x150 mm"],
      thicknesses: ["78 GSM Direct Thermal", "80 GSM Thermal Transfer"],
      colors: ["Bright White"],
    },
    applications: ["Quick dispatch labels", "Weigh scale weight tags", "Visitor badge printing"],
    visualGradients: "from-amber-400 to-orange-500",
  },

  // --- FILMS, BAGS & TUBES (11 MAIN FILM CATEGORIES & SUB-PRODUCTS) ---
  {
    id: "packaging-films",
    title: "Packaging Films",
    category: "film-products",
    tag: "Packaging Films",
    blurb: "High-performance LDPE, LLDPE, and collation packaging films engineered for industrial bundling, pallet protection, and heavy-duty barrier containment.",
    longDesc: `Packaging Films are versatile and indispensable components in the realm of modern industrial packaging. Engineered for exceptional clarity, tensile strength, holding force, and flexibility, these films are widely used across diverse industrial sectors to safeguard goods during handling, storage, and long-distance transport.

### Introduction to Packaging Films
Packaging films act as the primary protective layer for products ranging from bulk palletized goods to individual retail items. By combining prime virgin polyethylene resins with advanced multi-layer blown film extrusion technology, our packaging films deliver superior puncture resistance, tear propagation resistance, and uniform shrinkage.

### Manufacturing & Polymer Engineering
At WinnerPack, our packaging films are manufactured using advanced 3-layer and 5-layer co-extrusion blown film lines. We formulate specific polymer density blends (LDPE, LLDPE, mLLDPE) to provide:
- **Optimal Drawdown Ability**: High melt strength for high-speed automated packaging lines.
- **Superior Impact & Dart Drop Resistance**: Withstands heavy drops and rough logistics handling.
- **Controlled Shrinkage & Elastic Memory**: Maintains high tension and load stability throughout transit.

### Industrial Applications
Packaging films serve vital roles across key industries:
- **Beverage & Food Industry**: Secondary bundling of water bottles, canned beverages, and jars without carton trays.
- **Warehousing & Logistics**: Pallet load containment, moisture protection, and dust barriers.
- **Manufacturing & Construction**: Heavy component wrapping, building material protection, and chemical shipping sacks.

### Key Packaging Film Features
- Thickness range from 30 Micron to 200 Micron.
- Widths customizable from 200 mm to 2.25 meters.
- Available in high-gloss transparent, milky white opaque, and UV-stabilized grades.
- 100% recyclable prime polymer resins.`,
    image: "/images/products/ldpe-shrink-rolls/image.png",
    gallery: [
      "/images/products/ldpe-shrink-rolls/image.png",
      "/images/products/ldpe-films-pouches/applications/app-1.png",
      "/images/products/ldpe-films-pouches/applications/app-2.png",
      "/images/products/ldpe-films-pouches/applications/app-3.png",
    ],
    specs: {
      "Thickness Range": "30 Micron to 200 Micron",
      "Width Customization": "200 mm to 2,250 mm",
      "Polymer Density": "0.92 g/cm³ Pure Prime LDPE/LLDPE",
      "Holding Force": "High Tension Load Containment",
      "Impact Resistance": "High Dart Drop & Tensile Strength",
      "Line Compatibility": "High-Speed Automated Packaging Lines",
    },
    thicknessLengthMatrix: [
      { micron: "30", gauge: "120", meters: "1,000", feet: "3,280" },
      { micron: "50", gauge: "200", meters: "600", feet: "1,968" },
      { micron: "80", gauge: "320", meters: "375", feet: "1,230" },
      { micron: "100", gauge: "400", meters: "300", feet: "984" },
      { micron: "150", gauge: "600", meters: "200", feet: "656" },
      { micron: "200", gauge: "800", meters: "150", feet: "492" },
    ],
    subCategories: [
      {
        id: "ldpe-shrink-film",
        title: "LDPE Shrink Film",
        subtitle: "Heavy-Duty Collation Shrink Rolls for Bottle & Can Bundling",
        blurb: "Heavy-gauge LDPE collation shrink film engineered for heat-shrink bundling of beverage bottles, cans, glass jars, and heavy industrial products with high holding force and puncture resistance.",
        image: "/images/products/ldpe-shrink-rolls/image.png",
        specs: {
          "Shrink Temperature": "160°C to 200°C Thermal Tunnel",
          "Thickness Range": "50 Micron to 150 Micron",
          "Holding Force": "High Load Bundling Stabilization",
          "Tear Resistance": "High Longitudinal & Transverse Tear Strength",
        },
        applications: ["Mineral water & beverage bottle bundling", "Canned food collation packs", "Chemical container shrink wrapping"],
      },
      {
        id: "pe-liners-garbage-bags",
        title: "PE Liners And Garbage Bags",
        subtitle: "Heavy-Duty Bin Liners & Industrial Drum Liners",
        blurb: "Heavy-duty polyethylene bin liners, box liners, and industrial drum liners designed with reinforced bottom seals to prevent leaks and tears during waste and material disposal.",
        image: "/images/products/ldpe-films-pouches/applications/app-3.png",
        specs: {
          "Format Types": "Flat Bags / Gusseted Liners / Star Seal Rolls",
          "Thickness Range": "20 Micron to 100 Micron",
          "Leak Resistance": "High Integrity Thermal Welded Bottom Seal",
          "Material": "Prime Virgin LDPE / Heavy Duty Recycled PE",
        },
        applications: ["Industrial drum & box liners", "Commercial facility waste bins", "Healthcare & hospitality sanitation"],
      },
      {
        id: "plastic-stretch-film",
        title: "Plastic Stretch Film",
        subtitle: "High Elastic Pallet Wrap & Bundling Film",
        blurb: "Multi-layer co-extruded stretch wrap film providing high elongation and puncture resistance to securely bundle and wrap pallet loads during transit and storage.",
        image: "/images/products/stretch-film/image.png",
        specs: {
          "Elongation Rate": "Up to 300% High Pre-Stretch Capacity",
          "Cling Type": "One-Side / Differential Cling",
          "Thickness Range": "12 Micron to 35 Micron",
          "Core Standard": "3 Inch Standard Paper Core",
        },
        applications: ["Pallet unitization & wrapping", "Carton stabilization", "Moisture & dust barrier wrapping"],
      },
      {
        id: "collation-shrink-film",
        title: "Collation Shrink Film",
        subtitle: "Multi-Pack Secondary Packaging Film for Bottles & Cans",
        blurb: "Engineered collation shrink film designed specifically for secondary multi-pack bundling of beverages, dairy bottles, and retail canned products on high-speed continuous shrink wrappers.",
        image: "/images/products/pof-shrink-rolls/image.png",
        specs: {
          "Shrink Ratio": "70% MD / 20% TD Controlled Shrink",
          "Seal Strength": "High Hot-Tack Impulse Sealing",
          "Clarity": "High Gloss Transparent Print-Ready Surface",
          "Packaging Line Speed": "Up to 120 Packs Per Minute",
        },
        applications: ["Beverage multipack collation", "Dairy & juice bottle bundling", "Trayless can packaging"],
      }
    ],
    options: {
      widths: ["200 mm", "400 mm", "600 mm", "900 mm", "48 inches (1220 mm)"],
      thicknesses: ["30 Micron", "50 Micron", "80 Micron", "120 Micron", "200 Micron"],
      colors: ["High Gloss Clear", "Milky White", "Black UV Opaque"],
    },
    applications: ["Beverage bottle collation packaging", "Paper towel & textile overwrap", "Heavy industrial shipping sacks", "Bread & food pouches"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "ldpe-films-pouches",
    title: "LDPE Films & Pouches",
    category: "film-products",
    tag: "LDPE Film",
    blurb: "LDPE film (Low Density Polyethylene) engineered in customized resin blends for specific industrial and retail packaging applications, featuring high holding force, fast packaging speed, and superior impact strength.",
    longDesc: "LDPE film is an abbreviation for Low Density Polyethylene film. There are a variety of this type of film to cater to different applications in the market. What works for one application will not work for others. A few examples of resins which work only for specific LDPE plastic film applications are – dry cleaner bags, bread bags, paper towel overwrap, and shipping sacks.\n\n### Key Product Features:\n- **Broad Thickness Range**: Thickness available ranging from 30 Micron to 200 Micron.\n- **Customizable Widths**: Width can be customized ranging from 200 mm to 48 inches (1220 mm).\n- **High Holding Force**: Delivers high load containment and pallet/bundle stabilization.\n- **Fast Packaging Speed**: High melt strength and good drawdown ability for high-speed automated lines.\n- **High Tensile & Impact Strength**: Superior resistance against heavy impact drops and sharp puncture risks.\n- **Good Tear Resistance**: Prevents tear propagation during multi-city transit and warehouse handling.\n- **Enhanced Visual Appearance**: High-gloss surface finish and great optical transparency for retail presentation.",
    image: "/images/products/ldpe-shrink-rolls/image.png",
    gallery: [
      "/images/products/ldpe-shrink-rolls/image.png",
      "/images/products/ldpe-films-pouches/applications/app-1.png",
      "/images/products/ldpe-films-pouches/applications/app-2.png",
      "/images/products/ldpe-films-pouches/applications/app-3.png",
      "/images/products/ldpe-films-pouches/applications/app-4.png"
    ],
    specs: {
      "Thickness Range": "30 Micron to 200 Micron",
      "Width Customization": "200 mm to 48 Inches (1220 mm)",
      "Polymer Density": "0.92 g/cm³ Pure Prime LDPE",
      "Holding Force": "High Tension Load Containment",
      "Impact Resistance": "High Dart Drop & Tensile Strength",
      "Drawdown Ability": "Excellent Melt Strength for Fast Lines",
    },
    thicknessLengthMatrix: [
      { micron: "30", gauge: "120", meters: "1,000", feet: "3,280" },
      { micron: "50", gauge: "200", meters: "600", feet: "1,968" },
      { micron: "80", gauge: "320", meters: "375", feet: "1,230" },
      { micron: "100", gauge: "400", meters: "300", feet: "984" },
      { micron: "150", gauge: "600", meters: "200", feet: "656" },
      { micron: "200", gauge: "800", meters: "150", feet: "492" },
    ],
    subCategories: [
      {
        id: "ldpe-shrink-film",
        title: "LDPE Shrink Film",
        subtitle: "Heavy-Duty Collation Shrink Rolls for Bottle & Can Bundling",
        blurb: "Heavy-gauge LDPE collation shrink film engineered for heat-shrink bundling of beverage bottles, cans, glass jars, and heavy industrial products with high holding force and puncture resistance.",
        image: "/images/products/ldpe-shrink-rolls/image.png",
        specs: {
          "Shrink Temperature": "160°C to 200°C Thermal Tunnel",
          "Thickness Range": "50 Micron to 150 Micron",
          "Holding Force": "High Load Bundling Stabilization",
          "Tear Resistance": "High Longitudinal & Transverse Tear Strength",
        },
        applications: ["Mineral water & beverage bottle bundling", "Canned food collation packs", "Chemical container shrink wrapping"],
      },
      {
        id: "standard-normal-ldpe-film",
        title: "Standard Normal LDPE Film",
        subtitle: "High-Gloss Protective Sheeting & Packaging Rolls",
        blurb: "Standard non-shrink LDPE tubing and sheeting rolls used for general protective wrapping, paper towel overwrap, furniture covers, and industrial liner applications with high clarity and fast line speed.",
        image: "/images/products/ldpe-films-pouches/applications/app-1.png",
        specs: {
          "Format Types": "Tubing / Single Wound Sheeting / Centerfolded",
          "Thickness Range": "30 Micron to 100 Micron",
          "Surface Finish": "High Gloss Clear Transparency",
          "Drawdown Speed": "High Melt Strength for Automated Lines",
        },
        applications: ["Paper towel & tissue overwrap", "Dry cleaner & textile protection", "Furniture & mattress dust covers"],
      },
      {
        id: "ldpe-pouches-bags",
        title: "LDPE Pouches & Bags",
        subtitle: "Heavy-Duty Shipping Sacks & Pre-Cut Industrial Bags",
        blurb: "Custom size LDPE gusseted pouches, bread bags, heavy-duty shipping sacks, and industrial trash liners fabricated with high bottom seal integrity and impact tear resistance.",
        image: "/images/products/ldpe-films-pouches/applications/app-3.png",
        specs: {
          "Format Availability": "Gusseted Bags / Flat Pouches / Perforated Roll Bags",
          "Bottom Seal": "High Thermal Impulse Weld Strength",
          "Width Range": "Custom sizes up to 48 inches",
          "Resin Formulations": "Food-grade & Heavy Duty Shipping Sack Resins",
        },
        applications: ["Industrial shipping sacks & chemical bags", "Bread & food item bags", "Heavy hardware & component pouches"],
      }
    ],
    options: {
      widths: ["200 mm", "400 mm", "600 mm", "900 mm", "48 inches (1220 mm)"],
      thicknesses: ["30 Micron", "50 Micron", "80 Micron", "120 Micron", "200 Micron"],
      colors: ["High Gloss Clear", "Milky White", "Black UV Opaque"],
    },
    applications: ["Beverage bottle collation packaging", "Paper towel & textile overwrap", "Heavy industrial shipping sacks", "Bread & food pouches"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "pof-films-pouches",
    title: "POF Films & Pouches",
    category: "film-products",
    tag: "POF Shrink",
    blurb: "POF Shrink Rolls/Pouch shrink film is a polymer plastic film that shrinks tightly over covered products when heat is applied. Ideal for wrapping food, gift baskets, boxes, toys, books, and retail multipacks.",
    longDesc: "POF (Polyolefin) Shrink Rolls & Pouches are manufactured from multi-layer co-extruded polymer plastic film. When heat is applied, it shrinks tightly and uniformly over whatever item it covers. Common applications include wrapping food products, gift baskets, retail product boxes, toys, books, stationery, and pharmaceuticals.\n\n### Key Material Features:\n- **Excellent Transparency & Gloss**: Enhances shelf appeal with 93%+ crystal-clear optical reflection.\n- **Superior Heat Resistance**: Resists burn-through on high-speed L-sealers and shrink tunnels.\n- **Good Stiffness & Dimensional Stability**: Maintains tight pack structure without tearing or slacking over time.\n- **Balanced MD/TD Shrink Properties**: Uniform bi-axial shrinkage preventing product distortion.\n- **Extremely Strong Sealing**: High seal wire strength preventing seal ruptures during rough transit.\n- **Wide Temperature Range Performance**: Functions flawlessly in freezing cold storage and hot warehouse environments.\n- **NO 'Dog Ears'**: Smooth, tight corner shrinkage eliminating excess loose film corners.\n- **Non-Stick Sealing**: Clean release from sealing wires and L-bar cutter blades with zero residue buildup.",
    image: "/images/products/pof-shrink-rolls/image.png",
    gallery: [
      "/images/products/pof-shrink-rolls/image.png",
      "/images/products/pof-films-pouches/applications/app-1.png",
      "/images/products/pof-films-pouches/applications/app-2.png",
      "/images/products/pof-films-pouches/applications/app-3.png",
      "/images/products/pof-films-pouches/applications/app-4.png"
    ],
    specs: {
      "Material Structure": "5-Layer Co-extruded Polyolefin (POF)",
      "Shrink Ratio": "62% MD / 60% TD Bi-axial",
      "Sealing Temperature": "140°C - 180°C",
      "Clarity Level": "93% High Gloss Optical Clarity",
      "Corner Shrink": "Dog-Ear Free Smooth Shrinkage",
      "Blade Release": "Non-Stick Clean Release Wire Performance",
    },
    thicknessLengthMatrix: [
      { micron: "12", gauge: "50", meters: "1,665", feet: "5,250" },
      { micron: "15", gauge: "60", meters: "1,332", feet: "4,375" },
      { micron: "19", gauge: "75", meters: "1,067", feet: "3,500" },
      { micron: "25", gauge: "100", meters: "800", feet: "2,625" },
      { micron: "30", gauge: "120", meters: "666", feet: "2,186" },
    ],
    subCategories: [
      {
        id: "cross-linked-pof",
        title: "Cross-Linked POF Shrink Film",
        subtitle: "High Tensile Irradiated Polyolefin for Heavy & Sharp Edged Products",
        blurb: "Irradiated cross-linked POF film engineered with enhanced polymer chain bonds. Delivers superior puncture resistance, ultra-strong seal wire welds, zero burn-through, and exceptional performance on high-speed automatic L-sealers.",
        image: "/images/products/pof-shrink-rolls/image.png",
        specs: {
          "Polymer Link": "Irradiated Cross-Linked Structure",
          "Puncture Resistance": "Superior Puncture & Tear Resistance",
          "Sealing Window": "Ultra-Wide Hot Knife Sealing Range",
          "Burn-Through Tolerance": "Zero Burn-Through on Extended Tunnels",
          "Available Thicknesses": "12, 15, 19, 25 Micron",
        },
        applications: ["Heavy retail box bundling", "Sharp-edged hardware packaging", "High-speed automatic L-sealers", "Frozen food multipacks"],
      },
      {
        id: "non-cross-linked-pof-film",
        title: "Non-Cross-Linked POF Shrink Film",
        subtitle: "Standard 5-Layer Co-Extruded Polyolefin Rolls for General Retail Packaging",
        blurb: "Standard 5-layer co-extruded POF shrink rolls (centerfolded and single wound). Offers outstanding optical clarity, soft-shrink capability for flexible items, low-temperature activation, and cost-effective everyday wrapping.",
        image: "/images/products/pof-shrink-rolls/image.png",
        specs: {
          "Format Availability": "Centerfolded (CF) / Single Wound (SW) Rolls",
          "Shrink Temp Activation": "135°C Low Temperature Soft Shrink",
          "Optics Rating": "94% Glass-Clear Display Clarity",
          "Recyclability": "100% Recyclable Category 7 Polymer",
          "Available Thicknesses": "15, 19, 25, 30 Micron",
        },
        applications: ["Food & bakery product wrapping", "Gift baskets & cosmetics packs", "Books, stationery & toy boxes", "General retail multipacks"],
      },
      {
        id: "pof-shrink-pouches",
        title: "POF Shrink Pouches",
        subtitle: "Pre-Cut Sealed Shrink Bags & Envelopes for Fast Manual & Semi-Auto Packaging",
        blurb: "Pre-cut three-side sealed POF shrink pouches and bags ready for instant item insertion. Eliminates film slitting waste, speeds up manual packing, and provides a tight, wrinkle-free shrink finish around individual products.",
        image: "/images/products/pof-films-pouches/applications/app-4.png",
        specs: {
          "Format Style": "Pre-Cut 3-Side Sealed Pouches / Bags",
          "Sealing Convenience": "Instant Manual / Impulse Bar Sealing",
          "Clarity Level": "Ultra-High Gloss Display Transparency",
          "Waste Reduction": "Zero Roll Slitting Off-Cut Waste",
          "Available Sizes": "Custom Widths & Heights on Order",
        },
        applications: ["Individual gift basket wrapping", "Book & album shrink sealing", "Soap & cosmetic jar pouches", "Software & DVD box sealing"],
      }
    ],
    options: {
      widths: ["200 mm", "300 mm", "450 mm", "600 mm", "750 mm"],
      thicknesses: ["12 Micron (50G)", "15 Micron (60G)", "19 Micron (75G)", "25 Micron (100G)", "30 Micron (120G)"],
      colors: ["Ultra Clear Glass Finish"],
    },
    applications: ["Food & Bakery wrapping", "Gift baskets & cosmetic boxes", "Toys, books & stationery multipacks", "Pharmaceutical bottle shrink wrap"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "coloured-films-pouches",
    title: "Coloured Films & Pouches",
    category: "film-products",
    tag: "Coloured Film",
    blurb: "High-visibility tint-coloured and opaque specialty PE/CPE plastic films and pre-formed pouches engineered for UV barrier protection, garment packaging, privacy shipping, and color-coded inventory tracking.",
    longDesc: "Coloured Films & Pouches are manufactured from high-grade polyethylene (PE) and cast polyethylene (CPE) resins blended with food-safe masterbatch pigments. Available in semi-transparent frosted finishes, vibrant color tints, and 100% opaque milky white shades. Designed to protect light-sensitive goods, conceal package contents for secure logistics, provide silky soft-touch garment protection, and enable instant warehouse color-code sorting.\n\n### Key Product Features:\n- **Food-Safe Masterbatch Pigments**: Formulated with REACH & FDA-compliant color concentrates.\n- **Superior UV & Light Barrier**: Protects light-sensitive contents from photo-degradation and fading.\n- **Silky Soft-Touch CPE Texture**: CPE film provides a smooth, elegant frosted surface that prevents scratch marks on premium apparel.\n- **High Opacity & Privacy Protection**: Opaque milky white and black films ensure total privacy during parcel transit.\n- **High Tensile & Tear Strength**: Co-extruded structure delivers excellent puncture resistance across sharp edges.\n- **Versatile Sealing Formats**: Compatible with automatic impulse sealers, zip-lock sliders, and self-adhesive sealing strips.",
    image: "/images/products/coloured-films-pouches/image.png",
    gallery: [
      "/images/products/coloured-films-pouches/image.png",
      "/images/products/coloured-films-pouches/applications/app-1.png",
      "/images/products/coloured-films-pouches/applications/app-2.png",
      "/images/products/coloured-films-pouches/applications/app-3.png",
      "/images/products/coloured-films-pouches/applications/app-4.png"
    ],
    specs: {
      "Material Base": "Cast Polyethylene (CPE) / LDPE / LLDPE",
      "Color Pigmentation": "Food-Grade UV Stabilized Masterbatch",
      "Opacity Range": "Frosted Semi-Transparent to 100% Opaque Milky White",
      "Surface Texture": "Silky Soft-Touch Smooth / High Gloss",
      "Format Types": "Frosted Zipper Pouches / Milky Roll Sheeting / Courier Bags",
      "Tear Threshold": "High Puncture & Tear Resistance",
    },
    thicknessLengthMatrix: [
      { micron: "25", gauge: "100", meters: "1,200", feet: "3,936" },
      { micron: "40", gauge: "160", meters: "750", feet: "2,460" },
      { micron: "60", gauge: "240", meters: "500", feet: "1,640" },
      { micron: "80", gauge: "320", meters: "375", feet: "1,230" },
      { micron: "100", gauge: "400", meters: "300", feet: "984" },
      { micron: "150", gauge: "600", meters: "200", feet: "656" },
    ],
    subCategories: [
      {
        id: "cpe-pouches",
        title: "CPE Pouches (Cast Polyethylene)",
        subtitle: "Silky Soft-Touch Frosted Zipper & Flap Pouches for Apparel & Accessories",
        blurb: "Cast Polyethylene (CPE) pouches featuring a signature silky soft-touch frosted surface, zip-lock slider closures, and high tear resistance. Ideal for packaging luxury garments, mobile accessories, cosmetics, and electronics without scratching delicate surfaces.",
        image: "/images/products/coloured-films-pouches/applications/app-1.png",
        specs: {
          "Material Type": "100% Cast Polyethylene (CPE)",
          "Surface Finish": "Silky Soft-Touch Semi-Transparent Frosted",
          "Closure Options": "Slider Zipper / Press Seal Zip / Self-Adhesive Tape",
          "Anti-Scratch Coating": "Non-abrasive inner surface for electronics & apparel",
          "Available Thicknesses": "40 Micron, 50 Micron, 70 Micron, 90 Micron",
        },
        applications: ["Apparel & garment brand packaging", "Smartphone & electronic accessory bags", "Cosmetics & beauty item pouches", "Luxury travel & footwear bags"],
      },
      {
        id: "milky-pouches-films",
        title: "Milky White Pouches & Films",
        subtitle: "100% Opaque White Light-Barrier Rolls, Milk Pouches & Privacy Packaging",
        blurb: "Heavy-duty opaque white masterbatch LDPE/LLDPE rolls, liquid milk pouches, and security courier bags. Delivers complete opacity, high light barrier performance, and superior puncture resistance for dairy, pharmaceuticals, and privacy logistics.",
        image: "/images/products/ldpe-shrink-rolls/image.png",
        specs: {
          "Opacity Level": "100% Solid Opaque Milky White Finish",
          "Barrier Properties": "High UV & Light Reflection Barrier",
          "Puncture Resistance": "Co-extruded Multi-layer High Drop Impact",
          "Food Compliance": "FDA Compliant Direct Food Contact Grade",
          "Available Thicknesses": "50 Micron, 75 Micron, 100 Micron, 150 Micron",
        },
        applications: ["Dairy & liquid milk pouch packaging", "E-commerce privacy courier envelopes", "Pharmaceutical & medical light-barrier packaging", "Warehouse lot color-code sorting"],
      }
    ],
    options: {
      widths: ["200 mm", "400 mm", "600 mm", "900 mm", "1200 mm"],
      thicknesses: ["25 Micron (100G)", "40 Micron (160G)", "60 Micron (240G)", "80 Micron (320G)", "100 Micron (400G)", "150 Micron (600G)"],
      colors: ["Frosted CPE Clear", "Solid Milky White", "Opaque Black", "Vibrant Blue", "Warning Yellow"],
    },
    applications: ["Apparel & garment frosted zipper pouches", "Liquid milk & dairy pouch packaging", "Privacy e-commerce shipping bags", "Warehouse lot color identification"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "bopp-films-pouches",
    title: "BOPP Films & Pouches",
    category: "film-products",
    tag: "BOPP Film",
    blurb: "Biaxially Oriented Polypropylene (BOPP) crystal-clear packaging film rolls and self-adhesive pre-cut pouches engineered for superior moisture barrier, food grade protection, and high-speed flow wrap packaging.",
    longDesc: "BOPP (Biaxially Oriented Polypropylene) Films & Pouches are manufactured by stretching polypropylene film in both machine direction (MD) and transverse direction (TD). This bi-axial orientation provides outstanding mechanical strength, glass-like optical clarity, excellent moisture barrier, and high dimensional stability. Widely used for food packaging (bakery, snacks, confectionery), garment display pouches, flower wrapping, cigarette packs, and high-resolution gravure printed laminations.\n\n### Key Product Features:\n- **Crystal Clear Transparency & High Gloss**: Enhances retail shelf appeal with 95%+ optical clarity.\n- **Superior Moisture & Aroma Barrier**: Keeps food items crisp and aromatic by preventing moisture ingress.\n- **Excellent Tensile Strength**: High tensile modulus prevents stretching during high-speed VFFS/HFFS flow wrapping.\n- **Printable Surface Finish**: Excellent ink adhesion for up to 10-color flexographic and rotogravure printing.\n- **Heat Sealable Grades**: Available in heat-sealable co-extruded structures for airtight pouch welds.\n- **Variety of Finishes**: Plain transparent, matte finish, metallized barrier, and pearlized white options.",
    image: "/images/products/bopp-films-pouches/image.png",
    gallery: [
      "/images/products/bopp-films-pouches/image.png",
      "/images/products/bopp-films-pouches/applications/app-1.png",
      "/images/products/bopp-films-pouches/applications/app-2.png",
      "/images/products/bopp-films-pouches/applications/app-3.png",
      "/images/products/bopp-films-pouches/applications/app-4.png"
    ],
    specs: {
      "Film Structure": "Biaxially Oriented Polypropylene (BOPP)",
      "Barrier Properties": "Superior Water Vapor & Aroma Protection",
      "Surface Clarity": "95%+ Optical Gloss Reflection",
      "Available Finishes": "Clear / Metallized / Matte / Pearlized White",
      "Heat Sealability": "Dual-Side Heat Sealable Co-extrusion",
      "Printing Grade": "Rotogravure & Flexo Compatible",
    },
    thicknessLengthMatrix: [
      { micron: "12", gauge: "48", meters: "2,500", feet: "8,200" },
      { micron: "15", gauge: "60", meters: "2,000", feet: "6,560" },
      { micron: "20", gauge: "80", meters: "1,500", feet: "4,920" },
      { micron: "25", gauge: "100", meters: "1,200", feet: "3,936" },
      { micron: "30", gauge: "120", meters: "1,000", feet: "3,280" },
      { micron: "40", gauge: "160", meters: "750", feet: "2,460" },
    ],
    subCategories: [
      {
        id: "bopp-rolls",
        title: "BOPP Film Rolls (Plain, Printed & Metallized)",
        subtitle: "High-Speed Flow Wrap Rolls, Lamination Sheeting & Thermal Rolls",
        blurb: "Continuous BOPP film rolls available in single wound (SW) and centerfolded (CF) formats. Offered in crystal clear, metallized barrier, matte finish, and custom rotogravure printed options for automated VFFS and HFFS packaging machinery.",
        image: "/images/products/bopp-films-pouches/image.png",
        specs: {
          "Format Types": "Single Wound (SW) / Centerfolded (CF) Slit Rolls",
          "Machine Speed Compatibility": "High Speed VFFS / HFFS Packaging Lines",
          "Metallized Option": "Vacuum Metallized Aluminum Barrier Grade",
          "Lamination Grades": "Thermal Dry Lamination & Extrusion Lamination Base",
          "Available Thicknesses": "12, 15, 18, 20, 25, 30, 40 Micron",
        },
        applications: ["Snack & biscuit flow wrapping", "Confectionery & candy overwrap", "Print lamination for carton boxes", "Flower & gift hamper wrapping"],
      },
      {
        id: "bopp-pouches",
        title: "BOPP Pouches & Bags (Self-Adhesive & Header)",
        subtitle: "Pre-Cut Glass-Clear Display Bags with Peel & Seal Tape Strip",
        blurb: "Pre-formed BOPP bags featuring peel-and-seal self-adhesive tape strips, header punch holes for retail hanger displays, and side gussets. Provides crystal-clear product visibility for garments, stationery, cards, and bakery items.",
        image: "/images/products/bopp-films-pouches/applications/app-3.png",
        specs: {
          "Bag Formats": "Self-Adhesive Tape Bags / Euro Slot Header Pouches / Flap Bags",
          "Sealing Method": "Peel & Seal Resealable / Permanent Adhesive Strip",
          "Display Clarity": "Ultra-Clear Glass Transparency for Retail Shelves",
          "Header Reinforcement": "White Pearlized Plastic Header with Punch Hole",
          "Available Thicknesses": "25 Micron, 30 Micron, 40 Micron, 50 Micron",
        },
        applications: ["Shirt, garment & hosiery display packaging", "Greeting cards, notebook & stationery bags", "Bakery & cookie retail pouches", "Hardware & cutlery retail display packs"],
      }
    ],
    options: {
      widths: ["150 mm", "300 mm", "500 mm", "750 mm", "1000 mm"],
      thicknesses: ["12 Micron (48G)", "15 Micron (60G)", "20 Micron (80G)", "25 Micron (100G)", "30 Micron (120G)", "40 Micron (160G)"],
      colors: ["Glass Clear", "Metallized Silver", "Matte White", "Pearlized Opaque"],
    },
    applications: ["Snack & bakery food packaging", "Garment & hosiery display self-adhesive pouches", "Confectionery overwrap", "Laminated flexible pouches"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "pvc-shrink-rolls-pouches",
    title: "PVC Shrink Rolls & Pouches",
    category: "film-products",
    tag: "PVC Shrink",
    blurb: "Low-temperature heat shrink PVC tubular rolls, custom pre-cut pouches, tamper-evident neck bands, and full-body shrink sleeve packaging engineered for tight contour fitting and high gloss clarity.",
    longDesc: "PVC (Polyvinyl Chloride) Shrink Rolls & Pouches offer exceptional clarity, high gloss, and low-temperature shrink activation (80°C to 120°C). Unlike other polymer shrink films, PVC shrinks smoothly around irregular shapes and sharp bottle contours without burning or slacking over time. Widely specified for jar cap tamper-evident neck bands, promotional duo-pack bundling, beverage bottle shrink sleeve labels, and pre-cut box packaging pouches.\n\n### Key Product Features:\n- **Low Temperature Shrink Activation**: Activates at lower tunnel temperatures (80°C–120°C), saving energy and protecting heat-sensitive products.\n- **Controlled Bi-Axial & Transverse Shrinkage**: High TD shrink (up to 55%) ensures snug, wrinkle-free fitting over contoured bottles and jars.\n- **High Gloss Glass-Like Transparency**: Delivers premium retail presentation and vibrant graphic display.\n- **Tamper-Evident Safety Protection**: Ideal for neck bands and cap seals that provide clear visual evidence of product opening.\n- **High Film Stiffness & Durability**: Maintains rigid shape memory and protective barrier against dust, moisture, and handling scratches.\n- **Seamless Tubular & Pouch Formats**: Available in continuous seamless tubing rolls, centerfolded rolls, and pre-cut bottom-sealed pouches.",
    image: "/images/products/pvc-shrink-rolls/image.png",
    gallery: [
      "/images/products/pvc-shrink-rolls/image.png",
      "/images/products/pvc-shrink-rolls-pouches/applications/app-1.png",
      "/images/products/pvc-shrink-rolls-pouches/applications/app-2.png",
      "/images/products/pvc-shrink-rolls-pouches/applications/app-1.png"
    ],
    specs: {
      "Material Structure": "Polyvinyl Chloride (PVC) Shrink Formulation",
      "Shrink Activation Temp": "80°C - 120°C Low Temperature Tunnel",
      "Shrink Ratio": "10%-15% MD / 45%-55% TD Transverse",
      "Optical Finish": "95%+ Glass Gloss Transparency",
      "Tamper Evidence": "100% Tamper-Evident Neck & Cap Seal",
      "Format Types": "Seamless Tubing Rolls / Centerfolded / Pre-cut Pouches",
    },
    thicknessLengthMatrix: [
      { micron: "25", gauge: "100", meters: "1,200", feet: "3,936" },
      { micron: "30", gauge: "120", meters: "1,000", feet: "3,280" },
      { micron: "35", gauge: "140", meters: "850", feet: "2,788" },
      { micron: "40", gauge: "160", meters: "750", feet: "2,460" },
      { micron: "50", gauge: "200", meters: "600", feet: "1,968" },
      { micron: "60", gauge: "240", meters: "500", feet: "1,640" },
    ],
    subCategories: [
      {
        id: "pvc-shrink-rolls",
        title: "PVC Shrink Rolls (Tubular & Lay-Flat Rolls)",
        subtitle: "Seamless Tubing & Centerfolded Rolls for Automated Shrink Machinery",
        blurb: "Continuous seamless PVC tubular rolls, centerfolded (CF) rolls, and single wound (SW) sheeting. Engineered for fast low-temperature shrink tunnels, promotional twin-pack bundling, and automated box overwrapping.",
        image: "/images/products/pvc-shrink-rolls/image.png",
        specs: {
          "Format Availability": "Seamless Tubular Rolls / Centerfolded (CF) / Single Wound (SW)",
          "Shrink Temperature": "80°C - 110°C Fast Shrink Response",
          "Machine Speed Compatibility": "Automatic & Semi-Automatic L-Sealers",
          "Tear Perforations": "Optional longitudinal & transverse tear lines",
          "Available Thicknesses": "25, 30, 35, 40, 50, 60 Micron",
        },
        applications: ["Promotional duo-pack & buy-1-get-1 bundling", "Box overwrap & gift hamper packaging", "Industrial component protective shrink wrapping", "Continuous bottle sleeve feeding"],
      },
      {
        id: "pvc-shrink-pouches-sleeves",
        title: "PVC Shrink Pouches & Pre-Cut Sleeves",
        subtitle: "Pre-Cut Neck Bands, Cap Seals & Tamper-Evident Shrink Bags",
        blurb: "Custom pre-cut bottom-sealed PVC pouches, tamper-evident neck bands, and printed full-body shrink sleeve labels. Designed for instant manual application over bottle caps, jars, pharmaceutical containers, and retail boxes.",
        image: "/images/products/pvc-shrink-rolls/applications/app-1.png",
        specs: {
          "Bag Formats": "Pre-Cut 3-Side Sealed Bags / Tubular Cut Sleeves / Perforated Bands",
          "Tamper Proofing": "Tamper-Evident Cap & Neck Perforation Lines",
          "Printing Grade": "Reverse Printed Rotogravure & Flexo Graphics",
          "Shrink Fit Integrity": "Tight Wrinkle-Free Fit over Irregular Curves",
          "Available Thicknesses": "30 Micron, 35 Micron, 40 Micron, 50 Micron",
        },
        applications: ["Jar & bottle cap tamper-evident neck bands", "Pharmaceutical bottle security seals", "Pre-cut retail box shrink pouches", "Beverage bottle shrink sleeve labels"],
      }
    ],
    options: {
      widths: ["50 mm", "100 mm", "250 mm", "400 mm", "600 mm"],
      thicknesses: ["25 Micron (100G)", "30 Micron (120G)", "35 Micron (140G)", "40 Micron (160G)", "50 Micron (200G)", "60 Micron (240G)"],
      colors: ["Glass Clear", "High Gloss Amber", "Custom Printed Shrink Graphics"],
    },
    applications: ["Jar cap tamper-evident neck bands", "Pharmaceutical bottle security seals", "Promotional duo packs & buy-1-get-1 bundling", "Pre-cut retail box shrink pouches"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "stretch-film",
    title: "Stretch Film",
    category: "film-products",
    tag: "Stretch Film",
    blurb: "High-cling LLDPE pallet stretch wrap available in dedicated Manual Grade (Hand Wrap) and Machine Grade (Power Pre-Stretch) configurations.",
    longDesc: "5-layer cast LLDPE stretch film engineered for maximum load containment, puncture resistance, and zero-residue cling. Available in both **Manual Grade** (lightweight hand rolls with 3-inch cores) and **Machine Grade** (heavy-duty 15 kg machine rolls supporting up to 300% power pre-stretch on automated turntable and orbital wrappers).\n\n### Key Product Features:\n- **5-Layer Cast Co-Extrusion**: Formulated with 100% prime LLDPE resins for high tensile strength and puncture resistance.\n- **High Cling & Zero Residue**: Formulated with 1-side tackiness that clings tightly to itself without leaving sticky residue on cargo.\n- **Up to 300% Power Pre-Stretch**: Machine grade rolls stretch up to 300% on automated machinery, reducing per-pallet wrapping costs.\n- **Puncture & Tear Resistant**: Protects palletized loads from sharp carton corners, timber splinters, and transit vibration.\n- **Superior Load Retention & Holding Force**: Holds heavy multi-tiered pallets intact during multi-city freight transport.\n- **Manual & Machine Formats**: Available in lightweight 2.4 kg hand rolls and 15 kg heavy machine wrapping rolls.",
    image: "/images/products/stretch-film/image.png",
    gallery: [
      "/images/products/stretch-film/image.png",
      "/images/products/stretch-film/applications/app-1.png",
      "/images/products/stretch-film/applications/app-2.png",
      "/images/products/stretch-film/applications/app-3.png",
      "/images/products/stretch-film/applications/app-4.png"
    ],
    specs: {
      "Primary Polymer": "5-Layer Co-extruded LLDPE",
      "Sub-Grades Available": "Manual Grade (Hand Wrap) & Machine Grade (Power Pre-Stretch)",
      "Pre-Stretch Elongation": "Up to 300% (Machine Grade)",
      "Cling Property": "100% Residue-Free High Cling Formulation",
    },
    thicknessLengthMatrix: [
      { micron: "12", gauge: "48", meters: "2,500", feet: "8,200" },
      { micron: "15", gauge: "60", meters: "2,000", feet: "6,560" },
      { micron: "19", gauge: "75", meters: "1,500", feet: "4,920" },
      { micron: "23", gauge: "90", meters: "1,200", feet: "3,936" },
      { micron: "25", gauge: "100", meters: "1,000", feet: "3,280" },
      { micron: "29", gauge: "116", meters: "850", feet: "2,788" },
    ],
    subCategories: [
      {
        id: "manual-grade",
        title: "Manual Grade Stretch Film",
        subtitle: "Hand-Wrapping Roll Format for Warehouse Staff",
        blurb: "Lightweight, pre-stretched hand wrapping film engineered to reduce worker fatigue while delivering high puncture resistance over sharp carton edges.",
        image: "/images/products/manual-stretch-film/image.png",
        specs: {
          "Stretch Limit": "Up to 150% manual pull",
          "Cling Index": "One-sided tackiness (zero residue)",
          "Core Standard": "3-inch heavy cardboard core",
          "Standard Roll Weight": "2.4 kg / roll",
          "Available Thicknesses": "12 Micron (Pre-stretch), 15 Micron, 19 Micron",
          "Standard Widths": "450 mm, 500 mm",
          "Color Options": "Ultra Clear Tint, Opaque Jet Black",
        },
        applications: ["Manual warehouse pallet wrapping", "Irregular shaped load binding", "Dust & moisture proof parcel wrapping"],
      },
      {
        id: "machine-grade",
        title: "Machine Grade Stretch Film",
        subtitle: "Power Pre-Stretch Rolls for Automated Turntables & Arms",
        blurb: "Cast co-extruded machine stretch film designed for 250% to 300% power pre-stretch on automated turntable and arm wrappers. Offers low-noise unwind and high dart impact strength.",
        image: "/images/products/machine-stretch-film/image.png",
        specs: {
          "Pre-Stretch Capability": "250% - 300% power pre-stretch yield",
          "Standard Roll Weight": "15 kg machine roll",
          "Core Type": "Reinforced heavy-duty machine core",
          "Dart Impact Rating": "High puncture & tear resistance threshold",
          "Available Thicknesses": "23 Micron, 25 Micron, 29 Micron",
          "Standard Widths": "500 mm machine rolls",
          "Color Options": "Crystal Clear, Opaque Black",
        },
        applications: ["High-speed automated turntable wrappers", "Heavy export cargo pallet stabilization", "High-volume logistics centers"],
      }
    ],
    options: {
      widths: ["Hand Roll (450mm - 500mm)", "Machine Roll (500mm standard)"],
      thicknesses: ["12 Micron", "15 Micron", "23 Micron", "29 Micron"],
      colors: ["Crystal Clear", "Opaque Jet Black"],
    },
    applications: ["Manual warehouse pallet wrapping", "Automatic turntable pallet wrapping lines", "Heavy export cargo stabilization"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "lamination-films-pouches",
    title: "Lamination PE Film",
    category: "film-products",
    tag: "Lamination PE",
    blurb: "Lamination PE film is a versatile and indispensable component in the realm of packaging solutions. This high-quality film, made from polyethylene, exhibits exceptional clarity, strength, and flexibility.",
    longDesc: `Lamination PE film is a versatile and indispensable component in the realm of packaging solutions. This high-quality film, made from polyethylene, exhibits exceptional clarity, strength, and flexibility. Lamination PE film is available as laminated and stretch film options, and is widely used as a packaging film and plastic film in various industries. It is commonly utilized as a protective layer, enhancing the durability and visual appeal of various products.

The lamination process involves bonding the film to surfaces such as paper, cardboard, or other materials to provide an added layer of protection against moisture, dirt, and wear. The process can involve combining polyethylene films with other materials such as biaxially oriented polypropylene, polypropylene, or sheets to enhance specific properties. Anti static properties are also important for packaging sensitive electronics and medical products. This enables businesses across industries to safeguard their goods during handling, storage, and transportation.

With its wide range of applications, including packaging for food, pharmaceuticals, textiles, and industrial products, lamination PE film also finds use in beverage packaging, containers, and labels, as well as being suitable for frequently thermoformed packaging and custom polyethylene film products. Its versatility, strength, and reliable barrier properties make it an indispensable choice for businesses seeking optimal packaging solutions in the B2B sector. Linear low density polyethylene and ultra high molecular weight options are available for specialized needs.

Our company’s capabilities include producing a wide range of polyethylene films and plastic films for various industries, establishing us as a leading company and distributor in the market.

### Properties of PE Film
The unique properties of PE film make it an indispensable material for a wide range of uses. Known for its excellent chemical resistance and electrical insulation, PE film is also oil-resistant and waterproof, providing robust protection for packaged goods. Its low density means it is nearly non-absorbent and can float on water, adding to its versatility in various applications.

PE film is available in different forms, primarily low density polyethylene (LDPE) and high density polyethylene (HDPE). LDPE is softer, more flexible, and highly transparent, making it suitable for applications where clarity and flexibility are important. In contrast, HDPE offers greater strength and higher heat resistance, making it ideal for more demanding packaging and industrial uses. The structure of PE film, composed of repeated methylene units, can be tailored during production to achieve specific mechanical properties and thicknesses, ensuring the right balance of durability and performance for each application. Whether used in transparent packaging, industrial sheeting, or protective covers, PE film’s adaptability and reliability make it a preferred choice in many industries.

### Lamination PE Film Manufacturer
A lamination PE film manufacturer plays a pivotal role in delivering high-quality PE films tailored for a variety of packaging applications. Utilizing advanced extrusion and lamination technologies, these manufacturers produce a diverse range of film products, including barrier films, stretch films, and protective films, each designed to meet the specific needs of industries such as food packaging, medical packaging, and industrial packaging.

Manufacturers of PE film products are committed to stringent quality control, ensuring that every roll provides superior moisture barrier, abrasion resistance, and high heat resistance. This attention to detail makes their films suitable for demanding environments in sectors like automotive, aerospace, electronics, and consumer markets. By offering custom plastic products and solutions, lamination PE film manufacturers enable companies to develop innovative packaging products that enhance product safety, extend shelf life, and improve overall performance. Their expertise supports a wide array of commercial applications, from pharmaceutical and medical packaging to industrial and retail packaging, making them essential partners for businesses seeking reliable and effective packaging solutions.

At WinnerPack, we take immense pride in being the leading manufacturer of PE lamination Film, catering to the diverse needs of businesses across industries. With our unwavering commitment to excellence, we have established ourselves as the best choice for all your lamination film requirements. Our capabilities extend to producing innovative flexible packaging films, and we are a trusted distributor for clients across various industries, ensuring reliable supply and service.

We offer a comprehensive range of PE lamination films, including high-quality film lamination options, to meet your specific packaging needs.

### Benefits of PE Lamination Roll:
Here are some benefits of using PE lamination roll:
- Enhanced durability and protection for products.
- Reliable barrier against moisture, oxygen, and contaminants.
- Versatile and customizable for various packaging needs.
- Improved product appearance and visual appeal.
- Extended shelf life for perishable goods.
- Compatibility with different lamination techniques.
- Ease of use and efficient production workflows.
- Wide range of thickness options for customization.
- Cost-effective solution for packaging requirements.
- Compliant with industry standards and regulations.`,
    image: "/images/products/specialty-pouches/image.png",
    gallery: [
      "/images/products/specialty-pouches/image.png",
      "/images/desktop/about/blown_film_tower.png",
      "/images/products/lamination-films-pouches/applications/app-3.png",
      "/images/desktop/portfolio/showcase_printed_custom_tapes.png"
    ],
    specs: {
      "Material Type": "Virgin Low-Density Polyethylene (LDPE) & HDPE Polymers",
      "Available Widths": "Up to 2.25 Meters (2250 mm)",
      "Thickness Range": "18 Micron to 300 Micron",
      "Available Colours": "Natural Transparent, White Opaque (Custom colors on request)",
      "Lamination Process": "Heat & Press Lamination, Adhesive & Extrusion Bonding",
      "Barrier Protection": "Moisture, Oil, Oxygen, Dirt & Abrasion Resistance",
    },
    thicknessLengthMatrix: [
      { micron: "18 - 20", gauge: "80", meters: "1,500", feet: "4,920" },
      { micron: "37.5 - 40", gauge: "160", meters: "750", feet: "2,460" },
      { micron: "50", gauge: "200", meters: "600", feet: "1,968" },
      { micron: "100", gauge: "400", meters: "300", feet: "984" },
      { micron: "150", gauge: "600", meters: "200", feet: "656" },
      { micron: "300", gauge: "1200", meters: "100", feet: "328" },
    ],
    subCategories: [
      {
        id: "adhesive-lamination-film",
        title: "Adhesive Lamination Film",
        subtitle: "Used for Lamination to Polyester | Widths up to 2.25 Meters",
        blurb: "Used for lamination to polyester with exceptional clarity, strength, and flexibility. Available in widths up to 2.25 meters and thickness range from 18 to 300 microns in Natural and White opaque finishes.",
        image: "/images/products/specialty-pouches/image.png",
        specs: {
          "Primary Use": "Used for lamination to polyester",
          "Widths Available": "Available in widths upto 2.25 meters",
          "Thickness Range": "18 - 300 microns",
          "Colours": "Natural, White opaque (Other colours available on request)",
          "Applications": "Seeds Packaging, Pesticide Packaging, Dairy Products, Vacuum Pouches, Condom Packaging etc.",
        },
        applications: ["Seeds Packaging", "Pesticide Packaging", "Dairy Products", "Vacuum Pouches", "Condom Packaging"],
      },
      {
        id: "pharma-grade-poly",
        title: "Pharma Grade Poly",
        subtitle: "Heat & Press Lamination to Aluminum Foil for Strip Tablets",
        blurb: "Pharma Grade Poly is used for Heat and Press Lamination to Aluminum Foil for further packing of strip tablets in the pharmaceutical industry. Other applications include lidding application, cable wrap, and extrusion lamination.",
        image: "/images/products/lamination-films-pouches/applications/app-3.png",
        specs: {
          "Primary Application": "Heat and Press Lamination to Aluminum Foil",
          "Target Use": "Further packing of strip tablets in pharmaceutical industry",
          "Other Applications": "Lidding Application, Cable Wrap, Extrusion Lamination",
          "Standard Thicknesses": "20 Micron, 37.5 Micron, 40 Micron, 50 Micron",
        },
        applications: ["Pharmaceutical Strip Tablets", "Aluminum Foil Heat Lamination", "Lidding Application", "Cable Wrap", "Extrusion Lamination"],
      }
    ],
    options: {
      widths: ["Up to 2.25 Meters", "500 mm", "750 mm", "1000 mm", "1500 mm", "2250 mm"],
      thicknesses: ["18 Micron", "20 Micron", "37.5 Micron", "40 Micron", "50 Micron", "100 Micron", "150 Micron", "300 Micron"],
      colors: ["Natural Transparent", "White Opaque", "Silver Foil Laminated", "Custom Tint"],
    },
    applications: ["Seeds Packaging", "Pesticide Packaging", "Dairy Products", "Vacuum Pouches", "Condom Packaging", "Pharma Strip Tablets", "Lidding & Cable Wrap"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "adhesive-lamination-film",
    title: "Adhesive Lamination Film",
    category: "film-products",
    tag: "Adhesive Lamination",
    blurb: "Adhesive Lamination Film is a versatile solution for all your laminating needs. This high-quality film is designed to provide a strong and durable bond, making it ideal for various applications.",
    longDesc: `Adhesive Lamination Film is a versatile solution for all your laminating needs. This high-quality film is designed to provide a strong and durable bond, making it ideal for various applications.

The adhesive lamination process involves combining two or more layers of material using an adhesive film. This creates a composite structure that offers enhanced strength, protection, and visual appeal.

Our adhesive lamination film acts as the bonding agent, securely joining different substrates together. With our adhesive lamination film, you can achieve seamless adhesion between materials such as paper, plastic, fabric, or metal. This ensures a reliable and long-lasting bond, making it suitable for packaging, labeling, and graphic arts industries.

One of the key advantages of our adhesive lamination film is its exceptional clarity. It provides a crystal-clear finish, allowing your printed designs or product information to shine through without any distortion. This makes it perfect for applications where visibility and aesthetics are crucial.

Additionally, our adhesive lamination film offers excellent resistance to moisture, chemicals, and UV radiation. This ensures that your laminated products remain protected and maintain their integrity even in challenging environments.

Whether you need to create eye-catching packaging, durable labels, or vibrant displays, our adhesive lamination film is the perfect choice. Its versatility, strength, and visual clarity make it an essential tool for any project that requires reliable adhesion and enhanced protection.

### Introduction to Adhesive Lamination
Adhesive lamination is a simple and effective way to protect and preserve a wide range of materials using self adhesive laminating sheets. Unlike traditional lamination methods that require a machine or special equipment, self adhesive laminating sheets offer an easy, hassle-free solution. Just peel and stick the clear, acid free sheet onto your document, photo, sign, certificate, or schedule for instant protection and a professional finish.

These laminating sheets are designed to be user-friendly, making them perfect for both home and office use. The clear, transparent finish ensures that your documents and photos remain vibrant and easy to read, while the acid free material helps prevent yellowing or damage over time. Whether you need to safeguard important certificates, display schedules, or create durable signs, self adhesive laminating sheets provide a quick and reliable way to keep your materials looking their best.

### Manufacturing Self Adhesive Laminating Rolls
At WinnerPack, we take pride in our manufacturing process and the exceptional features of our laminating rolls. It is designed to provide superior quality and performance, making us stand out from the competition.

The manufacturing process of our laminating rolls begins with the selection of high-grade materials. We source premium quality films and adhesives to ensure the durability and reliability of our products. Our self adhesive laminating rolls are made using a combination of advanced machinery and skilled craftsmanship.

One of the key features that sets our laminating rolls apart is the self-adhesive property. This eliminates the need for additional adhesives or heat activation, making the lamination process quick and hassle-free. Simply peel off the backing and apply the roll or sheet to your desired surface for instant adhesion.

Our self-adhesive laminating rolls and sheets offer excellent clarity, allowing your documents, photos, or artwork to be displayed with vibrant colors and sharp details. The transparent finish enhances the visual appeal and protects the laminated items from wear and tear, moisture, and UV radiation.

WinnerPack is one of the leading manufacturers and suppliers of ADHESIVE LAMINATION FILM in the world, trusted across international packaging hubs and modern industrial supply chains.

### Industrial Applications
In industrial settings, adhesive lamination film plays a crucial role in enhancing the durability and longevity of essential materials. Self adhesive laminating sheets are widely used to protect documents such as safety instructions, equipment manuals, and maintenance schedules from damage caused by frequent handling, moisture, and exposure to harsh environments. The clear, acid free sheets ensure that important information remains legible and intact, even in demanding conditions.

Laminating sheets are also perfect for creating long-lasting signs, labels, and identification tags used throughout factories, warehouses, and construction sites. Their easy application means that employees can quickly laminate documents or signage on demand, without the need for a machine or specialized equipment. This not only saves time but also reduces costs associated with traditional lamination methods.

Additionally, the self adhesive feature allows for quick customization and application to a variety of surfaces, making these sheets ideal for labeling equipment, organizing inventory, and displaying safety information. The result is a more efficient, organized, and professional industrial workspace.

### Food Packaging
Adhesive lamination film is an essential component in the food packaging industry, where product safety and presentation are top priorities. Self adhesive laminating sheets provide a protective barrier that helps prevent moisture, contamination, and tampering, ensuring that food products remain fresh and safe for consumption. The acid free, clear sheets are perfect for maintaining the quality and appearance of packaging, allowing branding, nutritional information, and product details to remain visible and attractive.

These laminating sheets are easy to use and can be applied without the need for a machine or additional equipment, making them ideal for both large-scale food manufacturers and small businesses. The strong, self adhesive bond ensures that packaging stays sealed and secure throughout storage, transport, and display.

In addition to protection, adhesive lamination film enhances the visual appeal of food packaging, helping products stand out on store shelves. Whether used for vacuum pouches, dairy products, or specialty food items, self adhesive laminating sheets offer a reliable, cost-effective solution for food packaging that meets industry standards for safety and quality.

### Self Adhesive Laminating Sheets Acid Free Benefits
Avail Benefits of Self Adhesive Laminating Sheets with WinnerPack:
1. Easy application with adhesive backing.
2. Versatile for use on different materials.
3. Provides protection against moisture and damage.
4. Offers durability and resistance to tearing and scratching.
5. Maintains clarity for visibility of the original content.
6. Cost-effective compared to other lamination methods.
7. Can be easily customized and trimmed to size.
8. Convenient for on-demand laminating without the need for machines or pouches.

### Self Adhesive Lamination Film / Sheet Features
- Used for lamination to polyester
- Available in widths upto 2.25 meters
- Thickness Range from 18-300 microns
- Colours : Natural, White opaque. Other colours available on request.
- Applications : Seeds Packaging, Pesticide Packaging, Dairy Products, Vacuum Pouches, Condom Packaging etc.`,
    image: "/images/products/specialty-pouches/image.png",
    gallery: [
      "/images/products/specialty-pouches/image.png",
      "/images/desktop/about/blown_film_tower.png",
      "/images/products/lamination-films-pouches/applications/app-3.png"
    ],
    specs: {
      "Primary Use": "Used for lamination to polyester",
      "Available Widths": "Up to 2.25 meters",
      "Thickness Range": "18 - 300 microns",
      "Available Colours": "Natural, White opaque (Other colours available on request)",
      "Applications": "Seeds Packaging, Pesticide Packaging, Dairy Products, Vacuum Pouches, Condom Packaging etc.",
    },
    options: {
      widths: ["Up to 2.25 Meters", "500 mm", "750 mm", "1000 mm", "1500 mm", "2250 mm"],
      thicknesses: ["18 Micron", "20 Micron", "37.5 Micron", "40 Micron", "50 Micron", "100 Micron", "150 Micron", "300 Micron"],
      colors: ["Natural Transparent", "White Opaque"],
    },
    applications: ["Seeds Packaging", "Pesticide Packaging", "Dairy Products", "Vacuum Pouches", "Condom Packaging"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  // --- AGRICULTURAL FILMS & SUB-PRODUCTS ---
  {
    id: "agricultural-films",
    title: "Agricultural Films",
    category: "film-products",
    tag: "Agricultural Film",
    blurb: "High-performance UV-stabilized agricultural plastic films engineered for crop protection, soil moisture retention, greenhouse microclimate control, and yield optimization.",
    longDesc: `Agricultural Films are specialized plastic sheeting products engineered specifically to enhance crop productivity, protect soil integrity, and optimize agricultural microclimates. Formulated with UV-stabilized virgin polyolefin resins, anti-fog additives, and NIR thermal barriers, our agricultural films enable farmers and commercial agricultural enterprises to maximize crop yields across diverse weather conditions.

### Introduction to Agricultural Films
In modern commercial agriculture, plastic films play a vital role in controlled environment farming (CEF). By regulating soil temperature, retaining moisture, suppressing weed growth, and protecting crops against frost, wind, and pests, our agricultural films provide an optimal growth environment for vegetables, fruits, flowers, and cash crops.

### Manufacturing & UV Stabilization Engineering
At WinnerPack, our agricultural films are produced on multi-layer co-extrusion blown film lines using prime LLDPE, LDPE, and EVA polymers. Engineered features include:
- **Long-Term UV Protection**: Formulated with HALS (Hindered Amine Light Stabilizers) to withstand intense solar radiation for 1 to 5 seasons.
- **Thermal Memory & Anti-Drip Coating**: Prevents condensation droplet formation while maintaining night heat retention.
- **Superior Puncture & Tear Resistance**: Delivers high resistance against field installation tearing, strong winds, and hail.

### Key Product Offerings
- **Plastic Mulching Film**: Dual-color silver/black, black/black, and clear mulch for weed suppression and soil warmth.
- **Greenhouse Film**: High light transmission UV-stabilized greenhouse covers with anti-fog and thermal insulation properties.
- **Low Tunnel Film**: Flexible row covers for early crop protection and micro-climate warmth.
- **Mulch Film**: Specialized bio-degradable and standard polyethylene mulch rolls.`,
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    gallery: [
      "/images/desktop/journey/solution_pcr_eco_film.png",
      "/images/desktop/about/blown_film_tower.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
    ],
    specs: {
      "Thickness Range": "20 Micron to 200 Micron",
      "Width Range": "0.9 Meter to 14 Meters Polyhouse Width",
      "UV Life Expectancy": "1 to 5 Seasons Solar Stability",
      "Light Transmission": "Up to 90% PAR Transmission",
      "Anti-Drip & Anti-Fog": "High-Efficiency Surface Hydrophilic Coating",
      "Material Base": "LLDPE / LDPE / EVA Virgin Polyolefin Blend",
    },
    thicknessLengthMatrix: [
      { micron: "25", gauge: "100", meters: "1,000", feet: "3,280" },
      { micron: "30", gauge: "120", meters: "800", feet: "2,624" },
      { micron: "50", gauge: "200", meters: "500", feet: "1,640" },
      { micron: "100", gauge: "400", meters: "300", feet: "984" },
      { micron: "150", gauge: "600", meters: "200", feet: "656" },
      { micron: "200", gauge: "800", meters: "150", feet: "492" },
    ],
    subCategories: [
      {
        id: "plastic-mulching-film",
        title: "Plastic Mulching Film",
        subtitle: "Silver-Black & Opaque UV Stabilized Crop Protection Mulch",
        blurb: "High-grade silver-black and black polyethylene mulching film designed to reflect sunlight, suppress weeds, conserve soil moisture, and prevent soil erosion.",
        image: "/images/desktop/journey/solution_pcr_eco_film.png",
        specs: {
          "Color Formats": "Silver-Black / Black-Black / Transparent / Red",
          "Thickness Range": "20 Micron to 50 Micron",
          "Width Range": "0.9m to 1.5m",
          "UV Stabilization": "12 to 24 Months Solar Field Stability",
        },
        applications: ["Vegetable & fruit crop mulching", "Soil moisture retention & weed prevention", "Drip irrigation agriculture"],
      },
      {
        id: "greenhouse-film",
        title: "Greenhouse Cover Film",
        subtitle: "Anti-Drip & Anti-Fog UV Stabilized Polyhouse Covers",
        blurb: "Multi-year UV-stabilized greenhouse polyhouse cover film with 90%+ light transmission, anti-fog drop control, and high thermal heat retention.",
        image: "/images/desktop/about/blown_film_tower.png",
        specs: {
          "Light Transmission": "90% PAR Solar Transmission",
          "Thermal Barrier": "IR Thermicity Heat Retention Coating",
          "Anti-Fog Effect": "Hydrophilic Anti-Drip Droplet Control",
          "Width Customization": "Up to 14 Meters Seamless Width",
        },
        applications: ["Polyhouse & greenhouse covers", "Horticulture & floriculture protection", "Controlled environment farming"],
      },
      {
        id: "low-tunnel-film",
        title: "Low Tunnel Sheeting",
        subtitle: "Perforated Micro-Climate Sheeting for Early Crop Protection",
        blurb: "Clear high-clarity low tunnel protective sheeting designed for row crop installation, providing frost protection and accelerated seed germination.",
        image: "/images/desktop/journey/solution_pcr_eco_film.png",
        specs: {
          "Clarity Level": "Ultra High Transparent Solar Transmission",
          "Perforations": "Optional Vent Hole Micro Perforations",
          "Thickness Range": "25 Micron to 50 Micron",
          "Format": "Continuous Roll Sheeting",
        },
        applications: ["Row crop tunnel covers", "Early spring seed germination", "Frost & insect barrier protection"],
      },
      {
        id: "mulch-film",
        title: "Mulch Film",
        subtitle: "Embossed Polyethylene Soil Temperature Control Film",
        blurb: "Embossed and smooth agricultural mulch film rolls optimized for drip irrigation compatibility, weed control, and crop root stabilization.",
        image: "/images/desktop/journey/solution_pcr_eco_film.png",
        specs: {
          "Surface Texture": "Diamond Embossed / Smooth Micro Texture",
          "Width Range": "0.9 Meter to 2.1 Meters",
          "Thickness": "20, 25, 30, 50 Micron",
          "Puncture Resistance": "High Resistance Against Drip Pipe Stakes",
        },
        applications: ["Commercial horticulture mulching", "Fruit orchard soil covers", "Weed control without chemical pesticides"],
      }
    ],
    options: {
      widths: ["0.9 Meter", "1.2 Meters", "1.5 Meters", "2.1 Meters", "7.0 Meters", "14.0 Meters"],
      thicknesses: ["20 Micron", "25 Micron", "30 Micron", "50 Micron", "100 Micron", "150 Micron", "200 Micron"],
      colors: ["Silver / Black Dual Color", "Solid Black Opaque", "Clear Transparent", "UV Diffused White"],
    },
    applications: ["Commercial vegetable & fruit mulching", "Greenhouse & polyhouse coverings", "Low tunnel row crop protection", "Soil moisture retention"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "plastic-mulching-film",
    title: "Plastic Mulching Film",
    category: "film-products",
    tag: "Mulch Film",
    blurb: "High-grade silver-black and black polyethylene mulching film designed to reflect sunlight, suppress weeds, conserve soil moisture, and prevent soil erosion.",
    longDesc: `Plastic Mulching Film is an indispensable tool in modern precision agriculture and commercial crop cultivation. Designed to coat the soil surface along planting rows, our multi-layer silver-black mulching film creates an ideal root zone environment that accelerates crop growth, minimizes weed competition, and significantly conserves water.

### Introduction to Plastic Mulching Film
Using plastic mulch film is one of the most effective methods to increase agricultural yield while reducing reliance on chemical herbicides and excessive irrigation. The dual-color silver/black surface reflects sunlight up into the crop canopy—disorienting insect pests while increasing lower leaf photosynthesis—while the black underside blocks 100% of light to suppress weed germination.

### Key Benefits & Polymer Features:
- **Silver / Black Dual Layer**: Silver side reflects sunlight and repels aphids/thrips; black side prevents weed growth.
- **Micro-Climate Control**: Retains soil heat during cold nights and prevents soil crusting during heavy rainfall.
- **Moisture Conservation**: Reduces water evaporation by up to 50%, maximizing drip irrigation efficiency.
- **Enhanced Crop Quality**: Keeps growing fruits and vegetables clean and off raw soil, preventing rot and soil-borne fungal infections.
- **UV Stabilized Longevity**: Engineered to withstand 12 to 24 months of intense field solar exposure without premature degradation.`,
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    gallery: [
      "/images/desktop/journey/solution_pcr_eco_film.png",
      "/images/desktop/about/blown_film_tower.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png"
    ],
    specs: {
      "Film Formats": "Silver-Black / Black-Black / Transparent / Red / Yellow",
      "Thickness Range": "20 Micron to 50 Micron",
      "Width Range": "0.9 Meter to 1.5 Meters",
      "Roll Length": "400 Meters to 1,000 Meters per Roll",
      "UV Life Rating": "12 to 24 Months Field Durability",
    },
    thicknessLengthMatrix: [
      { micron: "20", gauge: "80", meters: "1,000", feet: "3,280" },
      { micron: "25", gauge: "100", meters: "800", feet: "2,624" },
      { micron: "30", gauge: "120", meters: "600", feet: "1,968" },
      { micron: "50", gauge: "200", meters: "400", feet: "1,312" },
    ],
    options: {
      widths: ["0.9m", "1.0m", "1.2m", "1.5m"],
      thicknesses: ["20 Micron", "25 Micron", "30 Micron", "50 Micron"],
      colors: ["Silver-Black Dual", "Solid Black", "Transparent Clear"],
    },
    applications: ["Strawberry & berry cultivation", "Tomato, pepper & melon farming", "Cotton & sugarcane drip irrigation rows"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "greenhouse-film",
    title: "Greenhouse Cover Film",
    category: "film-products",
    tag: "Greenhouse Cover",
    blurb: "Multi-year UV-stabilized greenhouse polyhouse cover film with 90%+ light transmission, anti-fog drop control, and high thermal heat retention.",
    longDesc: `Greenhouse Cover Film is a high-technology multi-layer co-extruded polyhouse sheet engineered for commercial greenhouse and polyhouse construction. Designed to withstand harsh atmospheric conditions, high UV exposure, and temperature swings, our greenhouse films create the ultimate protected climate for high-value crops.

### Key Product Features:
- **90%+ PAR Light Transmission**: Maximizes photosynthetically active radiation (PAR) for rapid plant growth.
- **Anti-Drip & Anti-Fog Coating**: Prevents heavy water droplets from dripping onto crops, reducing disease risks.
- **IR Thermal Heat Retention**: Keeps greenhouse interior warm during cold nights by trapping long-wave infrared heat.
- **5-Layer Heavy Duty Co-Extrusion**: Delivers high tear and puncture resistance against heavy winds and hail.
- **Multi-Year Warranty**: Guaranteed UV resistance for 3 to 5 years depending on micron thickness.`,
    image: "/images/desktop/about/blown_film_tower.png",
    gallery: [
      "/images/desktop/about/blown_film_tower.png",
      "/images/desktop/journey/solution_pcr_eco_film.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png"
    ],
    specs: {
      "Light Transmission": "90% PAR Transmission Rating",
      "Thermicity Index": "Over 80% Longwave IR Heat Retention",
      "Anti-Drip Additive": "Hydrophilic Internal Surface Coating",
      "Width Range": "Up to 14 Meters Seamless Sheet Width",
      "Thickness Range": "150 Micron to 200 Micron",
    },
    thicknessLengthMatrix: [
      { micron: "150", gauge: "600", meters: "100", feet: "328" },
      { micron: "200", gauge: "800", meters: "80", feet: "262" },
    ],
    options: {
      widths: ["4.0m", "7.0m", "9.0m", "12.0m", "14.0m"],
      thicknesses: ["150 Micron", "200 Micron"],
      colors: ["Clear Transparent", "Diffused Milky White"],
    },
    applications: ["Commercial polyhouse structures", "Floriculture & cut flower growing", "High-value hydroponic farming"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "low-tunnel-film",
    title: "Low Tunnel Sheeting",
    category: "film-products",
    tag: "Low Tunnel",
    blurb: "Clear high-clarity low tunnel protective sheeting designed for row crop installation, providing frost protection and accelerated seed germination.",
    longDesc: `Low Tunnel Sheeting is a lightweight, high-clarity protective film used to construct mini-tunnels directly over field crop rows. Ideal for early spring planting, low tunnels create a localized warm microclimate that accelerates germination and protects delicate seedlings from sudden late-season frosts.

### Key Product Features:
- **High Light Transmission**: Allows 92%+ natural sunlight into the tunnel for optimal photosynthesis.
- **Frost & Cold Protection**: Shields crops from night frost, harsh winds, and heavy rain damage.
- **Optional Vent Perforations**: Pre-perforated options available for automatic temperature regulation.
- **Easy Installation**: Lightweight roll structure designed for quick manual or mechanical hoop installation.`,
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    gallery: [
      "/images/desktop/journey/solution_pcr_eco_film.png",
      "/images/desktop/about/blown_film_tower.png"
    ],
    specs: {
      "Transparency": "92% Ultra-Clear Solar Transmission",
      "Format": "Continuous Roll Sheeting / Micro-Perforated",
      "Thickness Range": "25 Micron to 50 Micron",
      "Width Range": "1.2m to 2.5m",
    },
    thicknessLengthMatrix: [
      { micron: "25", gauge: "100", meters: "500", feet: "1,640" },
      { micron: "30", gauge: "120", meters: "400", feet: "1,312" },
      { micron: "50", gauge: "200", meters: "300", feet: "984" },
    ],
    options: {
      widths: ["1.2m", "1.5m", "2.0m", "2.5m"],
      thicknesses: ["25 Micron", "30 Micron", "50 Micron"],
      colors: ["High Gloss Clear"],
    },
    applications: ["Early season vegetable rows", "Watermelon & cantaloupe tunnels", "Nursery seedling protection"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "mulch-film",
    title: "Mulch Film",
    category: "film-products",
    tag: "Soil Mulch",
    blurb: "Embossed and smooth agricultural mulch film rolls optimized for drip irrigation compatibility, weed control, and crop root stabilization.",
    longDesc: `Mulch Film is an essential soil management solution engineered to prevent weed growth, reduce fertilizer leaching, and maintain optimum root zone temperature. Available in embossed micro-textures that resist tearing on soil ridges, our mulch films ensure clean, efficient crop production.

### Key Product Features:
- **Diamond Embossed Texture**: Delivers superior flexibility and tear resistance on rough field terrain.
- **100% Weed Suppression**: Opaque black formulations prevent weed seed germination completely.
- **Moisture Retention**: Minimizes soil water evaporation and preserves soil structure.
- **Drip Irrigation Friendly**: Works seamlessly with automated drip line laying equipment.`,
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    gallery: [
      "/images/desktop/journey/solution_pcr_eco_film.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png"
    ],
    specs: {
      "Surface Finish": "Diamond Embossed / Smooth Micro Texture",
      "Thickness Range": "20 Micron to 50 Micron",
      "Width Range": "0.9m to 2.1m",
      "UV Life": "12 to 24 Months Field Rating",
    },
    thicknessLengthMatrix: [
      { micron: "20", gauge: "80", meters: "1,000", feet: "3,280" },
      { micron: "25", gauge: "100", meters: "800", feet: "2,624" },
      { micron: "30", gauge: "120", meters: "600", feet: "1,968" },
    ],
    options: {
      widths: ["0.9m", "1.2m", "1.5m", "2.1m"],
      thicknesses: ["20 Micron", "25 Micron", "30 Micron", "50 Micron"],
      colors: ["Solid Black Opaque", "Silver-Black"],
    },
    applications: ["Commercial vegetable farming", "Orchard tree row covers", "Drip irrigated row crops"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "compostable-films-pouches",
    title: "Compostable Films & Pouches",
    category: "film-products",
    tag: "Compostable",
    blurb: "Certified 100% biodegradable and home-compostable PLA and PBAT bio-resin packaging films, carry bags, and eco-friendly security courier mailer pouches.",
    longDesc: "Compostable Films & Pouches are manufactured from renewable plant starch, PLA (Polylactic Acid), and PBAT (Polybutyrate Adipate Terephthalate) bio-polymers. Certified under EN 13432 and ISO 17088 standards, these eco-friendly films completely disintegrate into organic natural humus, CO₂, and water within 90 to 180 days under composting conditions, leaving zero microplastics, heavy metals, or toxic residues.\n\n### Key Product Features:\n- **100% Certified Biodegradable & Compostable**: Complies with EN 13432, ASTM D6400, and ISO 17088 standards.\n- **Zero Microplastics & Toxic Residue**: Breaks down entirely into natural organic soil nutrients.\n- **High Tensile & Tear Strength**: PBAT blending provides flexibility and drop impact strength comparable to traditional LDPE.\n- **Eco-Friendly Water-Based Inks**: Printable using non-toxic water-based eco inks for green brand messaging.\n- **Excellent Shelf Life Integrity**: Maintains full physical strength for up to 12 months under dry indoor warehouse storage.\n- **Rolls & Pouch Formats**: Available in continuous bio-extrusion rolls, D-cut carry bags, garment bags, and self-adhesive courier mailers.",
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    gallery: [
      "/images/desktop/journey/solution_pcr_eco_film.png",
      "/images/desktop/about/blown_film_tower.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/products/compostable-films-pouches/applications/app-4.png"
    ],
    specs: {
      "Bio Polymer Resin": "PBAT + PLA + Cornstarch Blend",
      "Certification Standard": "EN 13432 / ASTM D6400 / ISO 17088",
      "Disintegration Rate": "Fully degraded within 90 - 180 days",
      "Invisibly Non-Toxic": "Zero Heavy Metals, Phthalates, or Microplastics",
      "Printing Grade": "Non-Toxic Water-Based Eco Flexo Ink",
      "Format Types": "Bio Extrusion Rolls / Eco Courier Mailers / Carry Bags",
    },
    thicknessLengthMatrix: [
      { micron: "20", gauge: "80", meters: "1,500", feet: "4,920" },
      { micron: "30", gauge: "120", meters: "1,000", feet: "3,280" },
      { micron: "40", gauge: "160", meters: "750", feet: "2,460" },
      { micron: "50", gauge: "200", meters: "600", feet: "1,968" },
      { micron: "60", gauge: "240", meters: "500", feet: "1,640" },
      { micron: "80", gauge: "320", meters: "375", feet: "1,230" },
    ],
    subCategories: [
      {
        id: "compostable-film-rolls",
        title: "Compostable Film Rolls",
        subtitle: "PBAT/PLA Eco Sheeting & Tubing Rolls for Packaging Lines",
        blurb: "Continuous bio-based PBAT and PLA compostable film rolls available in single wound sheeting and tubular tubing. Ideal for eco-friendly shrink overwrapping, agricultural mulch, and automated bag making machinery.",
        image: "/images/desktop/journey/solution_pcr_eco_film.png",
        specs: {
          "Format Types": "Single Wound Sheeting / Tubular Tubing / Centerfolded",
          "Bio Degradable Rate": "100% Home & Industrial Compostable",
          "Machine Runnability": "Smooth operation on standard film converting equipment",
          "Storage Life": "12 months shelf stability in dry indoor conditions",
          "Available Thicknesses": "20 Micron, 30 Micron, 40 Micron, 50 Micron, 60 Micron",
        },
        applications: ["Eco-friendly product overwrapping", "Organic food & produce wrapping", "Bio bag converting raw material", "Sustainable retail packaging rolls"],
      },
      {
        id: "compostable-pouches-bags",
        title: "Compostable Pouches & Bags",
        subtitle: "100% Home & Industrial Biodegradable Courier & Retail Bags",
        blurb: "Pre-formed bio compostable bags featuring self-adhesive permanent seal mailer flaps, D-cut handles, and zipper closures. Designed for sustainable e-commerce shipping, retail apparel packaging, and organic waste collection.",
        image: "/images/products/compostable-films-pouches/applications/app-4.png",
        specs: {
          "Bag Styles": "Self-Adhesive Courier Mailers / D-Cut Carry Bags / Garment Bags",
          "Sealing Strip": "High Tack Permanent Eco Adhesive Flap Tape",
          "Surface Feel": "Silky Soft-Touch Matte Texture",
          "Strength Load": "High puncture & tear resistance for apparel transport",
          "Available Thicknesses": "30 Micron, 40 Micron, 50 Micron, 60 Micron, 80 Micron",
        },
        applications: ["Sustainable e-commerce shipping courier mailers", "Retail store eco carry bags & garment sleeves", "Organic food & produce shopping bags", "Hotel amenity & laundry compostable bags"],
      }
    ],
    options: {
      widths: ["200 mm", "350 mm", "500 mm", "750 mm", "1000 mm"],
      thicknesses: ["20 Micron (80G)", "30 Micron (120G)", "40 Micron (160G)", "50 Micron (200G)", "60 Micron (240G)", "80 Micron (320G)"],
      colors: ["Natural Translucent White", "Eco Leaf Green", "Matte Off-White"],
    },
    applications: ["Sustainable retail packaging", "Eco courier mailing bags", "Organic food shrink wrap", "Apparel eco mailer bags"],
    visualGradients: "from-sky-400 to-blue-500",
  },

  // --- STRAPPING ---
  {
    id: "pp-strap",
    title: "PP Strap",
    category: "pp-strap",
    tag: "PP STRAP",
    blurb: "High-tensile virgin polypropylene (PP) strapping rolls engineered for automated, semi-automated, and manual carton reinforcement and light bundle tying.",
    longDesc: "Polypropylene (PP) Strapping is manufactured from 100% virgin PP resin extruded with a diamond-embossed surface texture. Engineered for high friction weld joint efficiency (up to 80%) on automatic and semi-automatic strapping machines, it provides reliable carton reinforcement, pallet binding, and bundle unitization without producing dust on welding heads.\n\n### Key Product Features:\n- **High Friction-Weld Joint Strength**: Delivers up to 80% joint strength on heat-sealing and friction-weld strapping tools.\n- **Smooth Machine Runnability**: Precision camber control ensures jam-free feeding in high-speed automatic arch machines.\n- **Embossed Surface Grip**: Diamond knurled embossing enhances strap stiffness and seal clip grip.\n- **Split & Crack Resistant**: Formulated to withstand sharp carton edges without splitting longitudinal fibers.\n- **Lightweight & Recyclable**: 100% recyclable thermoplastic material designed for economic B2B packaging.",
    image: "/images/products/pp-strap/image.png",
    gallery: [
      "/images/products/pp-strap/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/gallery_pp_strapping.png"
    ],
    specs: {
      "Material Grade": "100% Virgin Polypropylene (PP)",
      "Surface Finish": "Diamond Knurled Embossed Texture",
      "Core Standards": "200mm ID x 190mm Width / 406mm ID Machine Core",
      "Joint Efficiency": "Up to 80% Friction-Weld Joint Strength",
      "Machine Runnability": "Automatic Arch & Semi-Automatic Strappers",
      "Break Strength Range": "120 kg to 350 kg Tensile Rating",
    },
    thicknessLengthMatrix: [
      { micron: "9 mm", gauge: "0.55 mm", meters: "3,000", feet: "9,840" },
      { micron: "12 mm", gauge: "0.55 mm", meters: "2,500", feet: "8,200" },
      { micron: "12 mm", gauge: "0.65 mm", meters: "2,000", feet: "6,560" },
      { micron: "15 mm", gauge: "0.65 mm", meters: "1,500", feet: "4,920" },
      { micron: "15 mm", gauge: "0.80 mm", meters: "1,200", feet: "3,936" },
      { micron: "19 mm", gauge: "0.90 mm", meters: "1,000", feet: "3,280" },
    ],
    subCategories: [
      {
        id: "automatic-pp-strap",
        title: "Automatic Machine PP Strap Rolls",
        subtitle: "Precision Camber Fully Automatic Arch Strapping Rolls",
        blurb: "High-grade virgin PP strapping engineered for ultra-fast feeding in fully automatic arch strapping machines. Features tight width tolerance and zero curvature camber for jam-free operation.",
        image: "/images/products/pp-strap/image.png",
        specs: {
          "Format": "Continuous Machine Coil Roll",
          "Machine Speed": "Up to 60 straps/minute arch speed",
          "Camber Tolerance": "Zero curvature camber",
          "Available Widths": "9mm, 12mm, 15mm",
        },
        applications: ["Fully automatic conveyor packaging lines", "Corrugated box bundle strapping", "Newspaper & magazine bundle tying"],
      },
      {
        id: "manual-semi-auto-pp-strap",
        title: "Manual & Semi-Auto PP Strap Rolls",
        subtitle: "Hand Tool & Semi-Automatic Friction Weld Strap Rolls",
        blurb: "Versatile PP strapping rolls formulated for manual hand tensioners, battery friction-weld tools, and tabletop semi-automatic strapping machines. Provides economic box reinforcement.",
        image: "/images/products/pp-strap/applications/app-1.png",
        specs: {
          "Format": "200mm Cardboard Core Hand Coil",
          "Sealing Method": "Metal Clip / Heat Seal / Friction Weld",
          "Core Weight": "10 kg coil weight standard",
          "Available Widths": "12mm, 15mm, 19mm",
        },
        applications: ["Warehouse manual carton sealing", "Semi-automatic tabletop box binding", "Light pallet bundling"],
      }
    ],
    options: {
      widths: ["9 mm", "12 mm", "15 mm", "19 mm"],
      thicknesses: ["0.55 mm", "0.65 mm", "0.80 mm", "0.90 mm"],
      colors: ["Virgin White", "Semi-transparent Natural"],
    },
    applications: ["Carton strapping reinforcement", "Newspaper bundle binding", "Light pallet stabilization"],
    visualGradients: "from-emerald-400 to-teal-500",
  },
  {
    id: "printed-pp-strap",
    title: "Printed PP Strap",
    category: "pp-strap",
    tag: "PRINTED PP",
    blurb: "Custom corporate logo printed polypropylene strapping rolls for brand promotion, dispatch security, and pilferage prevention.",
    longDesc: "Printed PP Strap combines structural box reinforcement with custom corporate logo branding. Printed with high-bonding UV inks, it acts as a tamper-evident security seal on shipping cartons and pallet lots, preventing unauthorized box tampering and theft during logistics transport.\n\n### Key Product Features:\n- **Custom Corporate Logo Printing**: Crisp 1-color or 2-color ink printing of brand name, website, or security warning.\n- **Anti-Pilferage Security Seal**: Instant visual indication if strapping band is cut or tampered with during freight transit.\n- **High-Bonding Ink**: UV cured inks resist friction rub-off and machine roller wear.\n- **Virgin PP Durability**: High tensile break strength with 80% friction weld joint efficiency.\n- **Custom Print Repetition**: Standard 300mm to 500mm logo print repeat cycle.",
    image: "/images/products/printed-pp-strap/image.png",
    gallery: [
      "/images/products/printed-pp-strap/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/gallery_pp_strapping.png"
    ],
    specs: {
      "Print Capabilities": "Custom Corporate Logos & Security Warnings",
      "Ink Technology": "High-Bonding UV Cured Ink (No Rub-Off)",
      "Print Repeat Cycle": "300mm / 450mm Repeat Pattern",
      "Tensile Rating": "180 kg to 280 kg Break Strength",
      "Machine Runnability": "Semi-Automatic & Automatic Packaging Lines",
    },
    thicknessLengthMatrix: [
      { micron: "12 mm Printed", gauge: "0.65 mm", meters: "2,000", feet: "6,560" },
      { micron: "12 mm Printed", gauge: "0.80 mm", meters: "1,500", feet: "4,920" },
      { micron: "15 mm Printed", gauge: "0.65 mm", meters: "1,500", feet: "4,920" },
      { micron: "15 mm Printed", gauge: "0.80 mm", meters: "1,200", feet: "3,936" },
      { micron: "19 mm Printed", gauge: "0.80 mm", meters: "1,000", feet: "3,280" },
      { micron: "19 mm Printed", gauge: "0.90 mm", meters: "850", feet: "2,788" },
    ],
    subCategories: [
      {
        id: "corporate-branded-pp-strap",
        title: "Corporate Branded PP Strap",
        subtitle: "Custom Logo & Company Name Printed Strapping Rolls",
        blurb: "Polypropylene strapping customized with high-impact corporate logos and brand names. Transforms ordinary shipping boxes into mobile marketing billboards while securing cargo.",
        image: "/images/products/printed-pp-strap/image.png",
        specs: {
          "Ink Color Options": "Red, Blue, Black, Green on White/Yellow Base",
          "Repeat Distance": "300mm logo spacing",
          "Format": "200mm ID Coated Paper Core Coil",
          "Tensile Strength": "High break load durability",
        },
        applications: ["High-value electronics dispatch", "Branded consumer goods transport", "Retail distribution box strapping"],
      },
      {
        id: "security-warning-pp-strap",
        title: "Security & Warning Printed PP Strap",
        subtitle: "Pre-Printed Anti-Pilferage & Tamper Caution Strapping Rolls",
        blurb: "Pre-printed with high-visibility security warnings (e.g. 'SECURITY SEAL - DO NOT ACCEPT IF BROKEN'). Prevents theft and tampering in high-risk transit routes.",
        image: "/images/products/printed-pp-strap/applications/app-1.png",
        specs: {
          "Pre-Printed Text": "'SECURITY SEAL' / 'FRAGILE' / 'CHECK WEIGHT'",
          "Base Colors": "Safety Yellow / Signal Red",
          "Visibility": "High-Contrast Block Typography",
          "Joint Method": "Friction Weld & Metal Clip Compatible",
        },
        applications: ["Pharma & chemical freight security", "High-value cargo export binding", "Logistics anti-theft dispatch"],
      }
    ],
    options: {
      widths: ["12 mm", "15 mm", "19 mm"],
      thicknesses: ["0.65 mm", "0.80 mm", "0.90 mm"],
      colors: ["White base with Red print", "Yellow base with Black print", "Custom base/ink"],
    },
    applications: ["High-value electronics dispatch", "Anti-pilferage secure packing", "Branded warehouse inventory packaging"],
    visualGradients: "from-emerald-400 to-teal-500",
  },
  {
    id: "colored-pp-strap",
    title: "Colored PP Strap",
    category: "pp-strap",
    tag: "COLORED PP",
    blurb: "High-opacity vibrant colored polypropylene strapping rolls for instant warehouse lot identification, destination color-coding, and cargo sorting.",
    longDesc: "Colored PP Strap is extruded using high-opacity masterbatch color pigments in red, yellow, blue, green, and black shades. Designed for large distribution centers and export hubs to enable instant visual color-code sorting, pallet batch grouping, and dispatch routing while providing high-tensile box reinforcement.\n\n### Key Product Features:\n- **Vibrant Color Masterbatch Pigments**: Color-fast opaque masterbatch resists UV fading and warehouse handling friction.\n- **Instant Visual Logistics Sorting**: Speeds up cargo dispatch categorization and inventory lot identification.\n- **Consistent Width & Thickness**: Strict tolerance (+/- 0.05 mm) prevents machine jamming during packaging runs.\n- **High Breaking Strength**: Formulated to hold up to 200 kg tensile load per strap band.\n- **Eco-Friendly Recyclable PP**: Fully recyclable polypropylene resin matching green supply chain standards.",
    image: "/images/products/colored-pp-strap/image.png",
    gallery: [
      "/images/products/colored-pp-strap/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/gallery_pp_strapping.png"
    ],
    specs: {
      "Pigmentation Style": "High Opacity Color Masterbatch",
      "Width Tolerance": "+/- 0.05 mm Precision Slitting",
      "Coil Weight": "10 kg / roll average",
      "Coil Length": "1200m to 2000m standard",
      "Break Load": "Up to 200 kg Tensile Strength",
      "Machine Runnability": "Semi-Automatic & Fully Automatic Strapping",
    },
    thicknessLengthMatrix: [
      { micron: "12 mm Red", gauge: "0.65 mm", meters: "2,000", feet: "6,560" },
      { micron: "12 mm Yellow", gauge: "0.65 mm", meters: "2,000", feet: "6,560" },
      { micron: "12 mm Blue", gauge: "0.65 mm", meters: "2,000", feet: "6,560" },
      { micron: "15 mm Red", gauge: "0.80 mm", meters: "1,200", feet: "3,936" },
      { micron: "15 mm Green", gauge: "0.80 mm", meters: "1,200", feet: "3,936" },
      { micron: "15 mm Black", gauge: "0.80 mm", meters: "1,200", feet: "3,936" },
    ],
    subCategories: [
      {
        id: "primary-colored-pp-straps",
        title: "Primary Color Identification PP Straps",
        subtitle: "Signal Red, Safety Yellow & Ocean Blue Strapping Rolls",
        blurb: "Bright primary colored strapping rolls designed for high-visibility warehouse batching and quick destination sorting in distribution hubs.",
        image: "/images/products/colored-pp-strap/image.png",
        specs: {
          "Colors Available": "Signal Red, Safety Yellow, Ocean Blue",
          "Widths": "12mm, 15mm",
          "Embossing": "Diamond Grip Profile",
          "Coil Size": "200mm Paper Core",
        },
        applications: ["Warehouse lot color coding", "Export destination routing", "Pallet batch grouping"],
      },
      {
        id: "heavy-duty-colored-straps",
        title: "Heavy-Duty Colored Packaging Straps",
        subtitle: "15mm & 19mm Heavy Masterbatch Strapping Rolls for Heavy Pallets",
        blurb: "Heavy-gauge colored PP strapping formulated with extra thickness (0.80mm to 0.90mm) for heavy industrial box and pallet unitization.",
        image: "/images/products/colored-pp-strap/applications/app-2.png",
        specs: {
          "Colors Available": "Grass Green, Jet Black, Industrial Orange",
          "Widths": "15mm, 19mm",
          "Tensile Strength": "Up to 280 kg break load",
          "UV Stability": "Enhanced outdoor storage life",
        },
        applications: ["Industrial machinery box marking", "Lumber & pipe color bundle tagging", "Heavy pallet stabilization"],
      }
    ],
    options: {
      widths: ["12 mm", "15 mm", "19 mm"],
      thicknesses: ["0.65 mm", "0.80 mm", "0.90 mm"],
      colors: ["Signal Red", "Safety Yellow", "Ocean Blue", "Grass Green", "Jet Black"],
    },
    applications: ["Logistics color coding", "Pallet batch grouping", "Industrial warehouse box marking"],
    visualGradients: "from-emerald-400 to-teal-500",
  },
  {
    id: "pet-strap",
    title: "PET Strap",
    category: "pp-strap",
    tag: "PET STRAP",
    blurb: "Heavy-duty extruded polyester (PET) strapping bands engineered to replace steel strapping for high-tension pallet stabilization, timber, metals, and export shipping.",
    longDesc: "Polyester (PET) Strapping is the heavy-duty industrial alternative to steel strapping. Manufactured from high-density polyethylene terephthalate, PET strap offers extreme tensile strength (up to 900 kg break load), superior tension retention over long transits, high elastic shock recovery, and 100% rust-free safety. Ideal for securing heavy metal coils, timber lumber, brick kilns, and export palletized cargo.\n\n### Key Product Features:\n- **Steel Strap Alternative**: Matches steel strap break strength while being 80% lighter and safer to handle without sharp edges.\n- **Superior Retention Tension**: Retains structural tension over long transit times and temperature fluctuations without slacking.\n- **Elastic Shock Recovery**: Absorbs heavy impact drops and cargo settling during multi-modal sea freight.\n- **100% Weather & Rust Proof**: Eliminates rust stains on timber, stone, and metal products stored outdoors.\n- **Friction & Battery Tool Compatible**: Formulated for seamless operation with battery-powered pneumatic and manual tensioning tools.",
    image: "/images/products/pet-strap/image.png",
    gallery: [
      "/images/products/pet-strap/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/gallery_pp_strapping.png"
    ],
    specs: {
      "Material Structure": "High-Density Extruded Polyester (PET)",
      "Core Size": "406mm ID x 150mm Width Industrial Heavy Core",
      "Tensile Rating": "Up to 900 kg Break Strength",
      "Elastic Shock Recovery": "12% - 15% Tension Recovery",
      "Weather Resistance": "100% Moisture, UV & Rust Proof",
      "Surface Profile": "Embossed Grid / Smooth Glossy",
    },
    thicknessLengthMatrix: [
      { micron: "12 mm PET", gauge: "0.60 mm", meters: "2,500", feet: "8,200" },
      { micron: "15 mm PET", gauge: "0.70 mm", meters: "1,750", feet: "5,740" },
      { micron: "16 mm PET", gauge: "0.80 mm", meters: "1,500", feet: "4,920" },
      { micron: "19 mm PET", gauge: "0.80 mm", meters: "1,200", feet: "3,936" },
      { micron: "19 mm PET", gauge: "1.00 mm", meters: "1,000", feet: "3,280" },
      { micron: "25 mm PET", gauge: "1.20 mm", meters: "750", feet: "2,460" },
    ],
    subCategories: [
      {
        id: "standard-industrial-pet-strap",
        title: "Standard Industrial PET Strap",
        subtitle: "12mm & 15mm Embossed Green Polyester Strapping Rolls",
        blurb: "Embossed green PET strapping engineered for standard industrial pallet unitization. Designed for battery-powered friction weld tools and pneumatic tensioners.",
        image: "/images/products/pet-strap/image.png",
        specs: {
          "Width Options": "12mm, 15mm",
          "Thickness": "0.60mm, 0.70mm",
          "Surface": "Embossed Diamond Grid",
          "Core": "406mm ID Heavy Duty Core",
        },
        applications: ["Medium-heavy pallet stabilization", "Paper reel bundling", "Canned beverage pallet binding"],
      },
      {
        id: "extra-heavy-export-pet-strap",
        title: "Extra Heavy Export PET Strap",
        subtitle: "16mm, 19mm & 25mm High-Tensile PET Strapping for Metals & Lumber",
        blurb: "Heavy-gauge high-tensile PET strapping bands designed to replace 19mm and 32mm steel straps on heavy timber, steel coils, concrete blocks, and export cargo sea containers.",
        image: "/images/products/pet-strap/applications/app-1.png",
        specs: {
          "Width Options": "16mm, 19mm, 25mm",
          "Thickness": "0.80mm to 1.20mm Heavy",
          "Break Strength": "Up to 900 kg break load",
          "Elongation": "Low elongation high retention",
        },
        applications: ["Steel coil & sheet strapping", "Timber lumber export bundling", "Brick kiln & stone block tying"],
      }
    ],
    options: {
      widths: ["12 mm", "15 mm", "16 mm", "19 mm", "25 mm"],
      thicknesses: ["0.60 mm", "0.70 mm", "0.80 mm", "1.00 mm", "1.20 mm"],
      colors: ["Emerald Green", "Jet Black"],
    },
    applications: ["Heavy pallet stabilization", "Steel and coil strapping", "Brick kiln block tying"],
    visualGradients: "from-emerald-400 to-teal-500",
  },

  // --- PROTECTIVE PACKAGING ---
  {
    id: "bubble-roll",
    title: "Bubble Roll & Pouches",
    category: "protective",
    tag: "Bubble",
    blurb: "Used to cushion fragile glassware, electronics, and precision components. Air-bubble protective wrapping rolls.",
    longDesc: "Cushioning bubble wrap rolls made from 100% virgin LDPE. Designed with heavy air sealing to prevent air leak. Ideal for fragile glassware, artwork, instruments, and electronics protection.",
    image: "/images/products/bubble-roll/image.png",
    gallery: ["/images/products/bubble-roll/image.png"],
    specs: {
      "Bubble Size": "10mm bubble diameter",
      "Material Base": "Virgin LDPE (Recyclable)",
      "Standard Width": "1.0m / 1.5m",
      "Anti-static option": "Pink ESD additives available",
    },
    options: {
      widths: ["1.0m x 50m", "1.5m x 50m"],
      thicknesses: ["50 GSM", "80 GSM"],
      colors: ["Translucent Clear", "Anti-static Pink"],
    },
    applications: ["Glass packaging cushioning", "Electronics wrapping", "Fragile retail box packing"],
    visualGradients: "from-rose-400 to-pink-500",
  },
  {
    id: "epe-foam-rolls",
    title: "EPE Foam Rolls",
    category: "protective",
    tag: "EPE Foam",
    blurb: "Used to shield painted metal parts and glass plates from surface scratches. Closed-cell polyethylene cushioning sheets.",
    longDesc: "Non-crosslinked, closed-cell EPE foam sheets providing premium cushioning and shock absorption. Prevents scratch marks on painted surfaces, sheet metal components, electronics, and glass plates.",
    image: "/images/products/epe-foam-rolls/image.png",
    gallery: ["/images/products/epe-foam-rolls/image.png"],
    specs: {
      "Structure Style": "Closed-cell non-crosslinked foam",
      "Density": "20 kg/m³ average",
      "Scratch Shield": "100% scratch free protection",
      "Thermal Insulation": "Good thermal insulation limits",
    },
    options: {
      widths: ["1.0m x 100m"],
      thicknesses: ["1 mm", "2 mm", "5 mm", "10 mm"],
      colors: ["Cream White"],
    },
    applications: ["Automotive body sheet metal wrapping", "Precision electronics cushioning", "Premium furniture corner protector"],
    visualGradients: "from-rose-400 to-pink-500",
  },
  {
    id: "air-bags",
    title: "Air Bags",
    category: "protective",
    tag: "Air Bag",
    blurb: "Used to fill voids and brace pallets inside shipping containers to prevent cargo shifting. Inflatable container dunnage bags.",
    longDesc: "Heavy-duty inflatable dunnage air bags designed to brace cargo inside shipping containers. Prevents shifts and collisions during sea and rail transits, filling lateral voids between pallets.",
    image: "/images/products/air-bags/image.png",
    gallery: ["/images/products/air-bags/image.png"],
    specs: {
      "Working Pressure": "Max 0.2 Bar",
      "Inner Liner": "Multi-layer co-extruded PE",
      "Outer Shell": "Heavy Kraft Paper / Woven Polypropylene",
      "Valve Style": "Quick-inflator high speed valve",
    },
    options: {
      widths: ["90 x 120 cm", "90 x 180 cm", "120 x 240 cm"],
      thicknesses: ["PP Woven Single Shift", "Kraft Paper 2-Ply"],
      colors: ["Brown Kraft", "White Poly"],
    },
    applications: ["Sea container cargo bracing", "Truck trailer pallet lock", "Rail cargo void filler"],
    visualGradients: "from-rose-400 to-pink-500",
  },
  {
    id: "corrugated-boxes",
    title: "Corrugated Boxes",
    category: "protective",
    tag: "Box",
    blurb: "Used to pack e-commerce parcels and stack warehouse stock securely. 3-ply, 5-ply, and 7-ply kraft board boxes.",
    longDesc: "High compression strength corrugated shipping boxes. Custom engineered flute patterns offer extreme load resistance under stacking storage. Clean printing finish for warehouse tracking codes.",
    image: "/images/products/corrugated-boxes/image.png",
    gallery: ["/images/products/corrugated-boxes/image.png"],
    specs: {
      "Compressive Limit": "380 kg stacking weight",
      "Bursting strength": "14.5 kg/cm²",
      "GSM Specification": "180 GSM Top Kraft / 150 GSM flutes",
      "Joint assembly": "Heavy-duty wire stitched / Glued seam",
    },
    options: {
      widths: ["Small (30x20x20cm)", "Medium (45x30x30cm)", "Large (60x40x40cm)"],
      thicknesses: ["3-Ply Single Wall", "5-Ply Double Wall", "7-Ply Heavy Duty"],
      colors: ["Kraft Brown", "Bleached White"],
    },
    applications: ["E-commerce warehouse dispatches", "Heavy components shipment", "Product retail box stacking"],
    visualGradients: "from-rose-400 to-pink-500",
  },
  {
    id: "corrugated-rolls",
    title: "Corrugated Rolls",
    category: "protective",
    tag: "Roll",
    blurb: "Used to wrap metal pipes, furniture parts, and large machinery columns. Flexible single-face paper rolls.",
    longDesc: "Single face corrugated wrapping paper in rolls. Highly flexible structure allows wrapping around irregular shape industrial parts, furniture legs, and metallic items to protect them from dents.",
    image: "/images/products/corrugated-rolls/image.png",
    gallery: ["/images/products/corrugated-rolls/image.png"],
    specs: {
      "Paper Composition": "120 GSM linear board / 100 GSM flute",
      "Flute density": "45 flutes/foot",
      "Roll Length": "15 meters standard",
      "Roll Weight": "25 kg average",
    },
    options: {
      widths: ["1.0m", "1.2m", "1.5m"],
      thicknesses: ["2-ply Single Face"],
      colors: ["Natural Brown"],
    },
    applications: ["Industrial metal gear wrapping", "Moving and packing surface wrap", "Glass panel interleaving wrap"],
    visualGradients: "from-rose-400 to-pink-500",
  },
  {
    id: "edge-protector",
    title: "Edge Protector",
    category: "protective",
    tag: "Edge",
    blurb: "Used to reinforce vertical pallet corners and prevent straps from cutting into boxes. Laminated paperboard corner boards.",
    longDesc: "L-shaped laminated paperboard edge protectors. Reinforces pallet vertical stack integrity, prevents strap cutting damage on carton corners, and locks columns of boxes during strapping.",
    image: "/images/products/edge-protector/image.png",
    gallery: ["/images/products/edge-protector/image.png"],
    specs: {
      "Material composition": "Multi-layer laminated paperboard",
      "Thickness Tolerance": "+/- 0.2 mm",
      "Flexural Strength": "High compression tolerance",
      "Water barrier": "Slight moisture repellent coating",
    },
    options: {
      widths: ["50x50 mm", "75x75 mm"],
      thicknesses: ["3 mm", "4 mm", "5 mm"],
      colors: ["Kraft Brown"],
    },
    applications: ["Pallet vertical stacking reinforcement", "Box corner protectors under strap tension", "Export bundle packaging stabilization"],
    visualGradients: "from-rose-400 to-pink-500",
  },

  // --- TAPES ---
  {
    id: "bopp-tapes",
    title: "BOPP Tapes",
    category: "tapes",
    tag: "BOPP",
    blurb: "High-tack Biaxially Oriented Polypropylene (BOPP) self-adhesive carton sealing tapes engineered for manual handheld dispensers and automated box sealing machines.",
    longDesc: "BOPP Tapes are manufactured from high-tensile Biaxially Oriented Polypropylene film coated with water-based pressure-sensitive acrylic adhesive. Extruded under strict caliper control, these tapes provide instant tack, high shear strength, and split resistance over corrugated carton flaps, preventing box opening failures during transit.\n\n### Key Product Features:\n- **High Tack Pressure-Sensitive Adhesive**: Water-based acrylic adhesive bonds instantly to recycled and kraft cardboard.\n- **High Tensile Base Film**: Bi-axial film orientation prevents snapping under high manual or automated tensioning.\n- **Moisture & Temperature Resistance**: Resists aging, yellowing, UV light exposure, and humidity fluctuations.\n- **Manual & Machine Roll Lengths**: Available in 50m/100m manual hand rolls and 650m/1000m industrial machine rolls.\n- **Smooth & Low-Noise Unwind**: Formulated for quiet, smooth unwinding on high-speed conveyor sealing lines.",
    image: "/images/products/bopp-tapes/image.png",
    gallery: [
      "/images/products/bopp-tapes/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/showcase_printed_custom_tapes.png"
    ],
    specs: {
      "Film Structure": "Biaxially Oriented Polypropylene (BOPP) Film",
      "Adhesive Type": "Water-Based Pressure Sensitive Acrylic Emulsion",
      "Core Diameter": "3 Inch (76mm) Standard Heavy Cardboard Core",
      "Tack & Shear Rating": "Instant High Shear Adhesion (24hr Retention)",
      "Elongation Threshold": "140% Elongation at Break",
      "Dispensing Grades": "Manual Hand Dispensers & Automatic Carton Sealers",
    },
    thicknessLengthMatrix: [
      { micron: "36", gauge: "144", meters: "50", feet: "164" },
      { micron: "40", gauge: "160", meters: "65", feet: "213" },
      { micron: "45", gauge: "180", meters: "100", feet: "328" },
      { micron: "50", gauge: "200", meters: "650", feet: "2,132" },
      { micron: "55", gauge: "220", meters: "100", feet: "328" },
      { micron: "65", gauge: "260", meters: "1,000", feet: "3,280" },
    ],
    subCategories: [
      {
        id: "manual-hand-dispenser-bopp-tapes",
        title: "Manual Hand-Dispenser BOPP Tapes",
        subtitle: "48mm x 65m / 100m Hand Rolls for Warehouse Carton Sealing",
        blurb: "Lightweight, smooth-unwind BOPP self-adhesive tape rolls designed for handheld tape gun dispensers. Ideal for fast warehouse packing, e-commerce box sealing, and retail parcel dispatch.",
        image: "/images/products/bopp-tapes/image.png",
        specs: {
          "Widths Available": "48mm (2 Inch), 72mm (3 Inch)",
          "Roll Lengths": "50m, 65m, 100m Hand Rolls",
          "Adhesive Thickness": "18 - 22 Micron Acrylic Layer",
          "Color Choices": "Glass Clear, Amber Brown",
        },
        applications: ["Manual warehouse carton sealing", "E-commerce parcel dispatch taping", "Light to medium weight box packing"],
      },
      {
        id: "automated-machine-roll-bopp-tapes",
        title: "Automated Machine-Roll BOPP Tapes",
        subtitle: "48mm / 72mm x 650m / 1000m Industrial Sealing Machine Rolls",
        blurb: "Heavy-duty continuous long-length BOPP tape rolls engineered for fully automated top-and-bottom carton sealing machines. Reduces roll changeover downtime on high-volume conveyor lines.",
        image: "/images/products/bopp-tapes/applications/app-1.png",
        specs: {
          "Widths Available": "48mm (2 Inch), 72mm (3 Inch)",
          "Roll Lengths": "650m, 1000m Industrial Machine Rolls",
          "Machine Speed": "Up to 30 cartons/minute conveyor speed",
          "Low-Noise Unwind": "Specially coated release backer for quiet unwind",
        },
        applications: ["High-speed automated conveyor sealing lines", "Heavy export carton box sealing", "Continuous manufacturing packing lines"],
      }
    ],
    options: {
      widths: ["24 mm", "36 mm", "48 mm (2 Inch)", "72 mm (3 Inch)"],
      thicknesses: ["36 Micron", "40 Micron", "45 Micron", "50 Micron", "65 Micron"],
      colors: ["Transparent Clear", "Amber Brown"],
    },
    applications: ["Corrugated box sealing", "Manual dispenser taping runs", "Automatic tape machine sealing"],
    visualGradients: "from-violet-400 to-fuchsia-500",
  },
  {
    id: "printed-bopp-tapes",
    title: "Printed BOPP Tapes",
    category: "tapes",
    tag: "Printed",
    blurb: "Custom corporate logo printed BOPP packaging tapes engineered for brand identification, tamper-evident security sealing, and anti-pilferage dispatch protection.",
    longDesc: "Printed BOPP Tapes feature custom corporate logos, brand names, handling instructions, or tamper-evident security warnings printed underneath or over high-tack acrylic adhesive BOPP film. Serves as a dual-purpose solution that secures shipping cartons while building brand recognition and acting as a visible indicator against unauthorized box opening.\n\n### Key Product Features:\n- **High-Resolution Custom Branding**: Printed with up to 4-color UV-resistant inks with sharp logo reproduction.\n- **Anti-Pilferage Security Protection**: Instant visual evidence if carton tape is cut or replaced during transit.\n- **High Bond Strength**: Premium acrylic glue bonds permanently to corrugated paper, preventing tape lift-off.\n- **Abrasion & Rub-Off Resistant**: Printed inks are sealed under protective release top-coats to prevent ink smudging.\n- **Custom Warning Prints**: Pre-printed messages available (e.g. 'FRAGILE', 'HANDLE WITH CARE', 'DO NOT ACCEPT IF SEAL BROKEN').",
    image: "/images/products/printed-bopp-tapes/image.png",
    gallery: [
      "/images/products/printed-bopp-tapes/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/showcase_printed_custom_tapes.png"
    ],
    specs: {
      "Print Technology": "Reverse / Surface Printed UV Cured Inks (No Rub-Off)",
      "Color Options": "Up to 4 Spot Colors on Clear, White, or Yellow Base",
      "Print Repeat Distance": "150mm / 220mm / 300mm Repeat Cycle Pattern",
      "Adhesive Grade": "High-Shear Permanent Acrylic Emulsion Glue",
      "Core Standards": "3 Inch (76mm) Cardboard Core",
      "Roll Length Formats": "65m, 100m Hand Rolls & 650m Machine Rolls",
    },
    thicknessLengthMatrix: [
      { micron: "40", gauge: "160", meters: "50", feet: "164" },
      { micron: "45", gauge: "180", meters: "65", feet: "213" },
      { micron: "50", gauge: "200", meters: "100", feet: "328" },
      { micron: "50", gauge: "200", meters: "650", feet: "2,132" },
      { micron: "55", gauge: "220", meters: "100", feet: "328" },
      { micron: "60", gauge: "240", meters: "650", feet: "2,132" },
    ],
    subCategories: [
      {
        id: "custom-corporate-logo-tapes",
        title: "Custom Corporate Logo Printed Tapes",
        subtitle: "Brand Identity & Custom Artwork Packaging Tapes",
        blurb: "BOPP packaging tape customized with corporate logos, company graphics, and web addresses. Transforms shipping boxes into mobile marketing channels while securing box flaps.",
        image: "/images/products/printed-bopp-tapes/image.png",
        specs: {
          "Ink Colors": "Up to 4 Custom Pantone Spot Colors",
          "Background Base": "Pure White / Crystal Clear / Kraft Brown",
          "Format": "48mm x 65m / 100m Hand Rolls",
          "Tack": "Instant high-shear acrylic bonding",
        },
        applications: ["E-commerce brand identity shipment sealing", "Corporate merchandise dispatch", "High-end retail box taping"],
      },
      {
        id: "preprinted-warning-security-tapes",
        title: "Pre-Printed Warning & Security Tapes",
        subtitle: "Tamper-Evident Fragile & Security Caution Packaging Tapes",
        blurb: "Pre-printed with high-visibility warning text (e.g. 'FRAGILE - HANDLE WITH CARE', 'STOP IF SEAL IS BROKEN'). Prevents damage and theft during transit.",
        image: "/images/products/printed-bopp-tapes/applications/app-1.png",
        specs: {
          "Text Options": "'FRAGILE' / 'SECURITY SEAL' / 'HANDLE WITH CARE'",
          "Color Combination": "Red Text on White Base / Black Text on Yellow Base",
          "Format": "48mm x 65m Hand Rolls",
          "Adhesion": "High Tack Shear Resistance",
        },
        applications: ["Fragile glass & electronics shipment warning", "High-value goods security sealing", "Export logistics caution taping"],
      }
    ],
    options: {
      widths: ["36 mm", "48 mm (2 Inch)", "72 mm (3 Inch)"],
      thicknesses: ["40 Micron", "45 Micron", "50 Micron", "60 Micron"],
      colors: ["White base with Red print", "Yellow base with Black print", "Custom base/ink"],
    },
    applications: ["E-commerce shipping box security", "Premium brand identity packaging", "Warning box sealing"],
    visualGradients: "from-violet-400 to-fuchsia-500",
  },
  {
    id: "coloured-bopp-tapes",
    title: "Coloured BOPP Tapes",
    category: "tapes",
    tag: "Coloured",
    blurb: "Bright opaque colored BOPP self-adhesive packaging tapes engineered for inventory color classification, cargo batch sorting, and high-visibility parcel marking.",
    longDesc: "Coloured BOPP Tapes are manufactured by blending solid masterbatch color pigments into BOPP backing film, coated with high-tack acrylic adhesive. Designed for large distribution centers, fulfillment warehouses, and export logistics hubs to enable instant visual color-code sorting, cargo batching, and inventory routing.\n\n### Key Product Features:\n- **High Opacity Solid Masterbatch Colors**: Red, Yellow, Blue, Green, Orange, Black, and White solid colors.\n- **Instant Visual Inventory Sorting**: Speeds up warehouse parcel classification and cargo routing.\n- **High Tack Acrylic Bonding**: Adheres firmly to corrugated paper and stretch film without peeling.\n- **UV & Moisture Resistant**: Pigments and adhesives resist fading under warehouse lighting and moisture exposure.\n- **Standard Hand & Machine Roll Formats**: Available in 48mm x 65m hand rolls and long-length machine rolls.",
    image: "/images/products/coloured-bopp-tapes/image.png",
    gallery: [
      "/images/products/coloured-bopp-tapes/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/showcase_printed_custom_tapes.png"
    ],
    specs: {
      "Pigmentation Grade": "High Opacity Solid Block Masterbatch Color",
      "Adhesive Type": "Pressure Sensitive Water-Based Acrylic Emulsion",
      "Slitting Tolerance": "+/- 0.5 mm Precision Width Control",
      "Core Size": "3 Inch (76mm) Heavy Cardboard Core",
      "Color Selection": "Signal Red, Safety Yellow, Ocean Blue, Grass Green, Orange, Black",
      "Roll Lengths": "50m, 65m, 100m Hand Rolls",
    },
    thicknessLengthMatrix: [
      { micron: "40 Red", gauge: "160", meters: "50", feet: "164" },
      { micron: "45 Yellow", gauge: "180", meters: "65", feet: "213" },
      { micron: "45 Blue", gauge: "180", meters: "65", feet: "213" },
      { micron: "45 Green", gauge: "180", meters: "65", feet: "213" },
      { micron: "50 Orange", gauge: "200", meters: "100", feet: "328" },
      { micron: "50 Black", gauge: "200", meters: "100", feet: "328" },
    ],
    subCategories: [
      {
        id: "primary-colored-bopp-tapes",
        title: "Primary Colored BOPP Tapes",
        subtitle: "Signal Red, Safety Yellow & Ocean Blue Packaging Tapes",
        blurb: "High-visibility primary colored BOPP tapes designed for quick warehouse lot identification, order priority color-coding, and parcel batching.",
        image: "/images/products/coloured-bopp-tapes/image.png",
        specs: {
          "Colors": "Signal Red, Safety Yellow, Ocean Blue",
          "Widths": "48mm (2 Inch)",
          "Format": "48mm x 65m Hand Roll",
          "Adhesive": "Water-based acrylic glue",
        },
        applications: ["Priority parcel order tagging", "Warehouse bin batching", "Logistics destination color coding"],
      },
      {
        id: "secondary-colored-bopp-tapes",
        title: "Secondary & Security Colored Tapes",
        subtitle: "Grass Green, Industrial Orange & Jet Black Tapes",
        blurb: "Solid secondary colored BOPP self-adhesive tapes for special inventory categorization, quality inspection marking, and confidential parcel sealing.",
        image: "/images/products/coloured-bopp-tapes/applications/app-2.png",
        specs: {
          "Colors": "Grass Green, Industrial Orange, Jet Black",
          "Widths": "48mm (2 Inch), 72mm (3 Inch)",
          "Format": "48mm x 100m Hand Roll",
          "Adhesive": "High-shear acrylic adhesive",
        },
        applications: ["Quality control PASS/REJECT box marking", "Confidential parcel sealing", "Industrial product lot identification"],
      }
    ],
    options: {
      widths: ["24 mm", "36 mm", "48 mm", "72 mm"],
      thicknesses: ["40 Micron", "45 Micron", "50 Micron"],
      colors: ["Signal Red", "Safety Yellow", "Ocean Blue", "Grass Green", "Industrial Orange", "Jet Black"],
    },
    applications: ["Inventory box color classification", "High visibility parcel marking", "Warehouse cargo batching"],
    visualGradients: "from-violet-400 to-fuchsia-500",
  },
  {
    id: "silicon-tapes",
    title: "Silicon Tapes",
    category: "tapes",
    tag: "Silicon",
    blurb: "Self-fusing silicone rubber sealing tapes and release-liner bag sealing tapes engineered for high-temperature pipe leak repair, electrical insulation, and reusable bag closures.",
    longDesc: "Silicon Sealing Tapes encompass self-fusing silicone rubber wrapping tapes and silicone release bag sealing tapes. Self-fusing silicone tapes fuse to themselves under tension without adhesive, forming an airtight, 100% waterproof seal capable of withstanding extreme temperatures (-50°C to +260°C) and high electrical voltage insulation.\n\n### Key Product Features:\n- **Self-Fusing Adhesive-Free Action**: Fuses permanently to itself within 24 hours under tension without sticky residues.\n- **Extreme Temperature Resistance**: Operates continuously from -50°C to +260°C without melting or hardening.\n- **High Electrical Dielectric Insulation**: Withstands up to 8,000 Volts per layer for electrical cable splicing.\n- **100% Waterproof & Pressure Tight**: Instantly seals leaking water pipes, hose connections, and air ducts under pressure.\n- **Weather & Chemical Proof**: Resistant to UV radiation, ozone, salt water, fuel, and industrial hydraulic fluids.",
    image: "/images/products/silicon-tapes/image.png",
    gallery: [
      "/images/products/silicon-tapes/image.png",
      "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      "/images/desktop/portfolio/showcase_printed_custom_tapes.png"
    ],
    specs: {
      "Operating Temperature": "-50°C to +260°C Continuous",
      "Fusing Mechanism": "Self-Amalgamating Silicone Polymer (No Glue)",
      "Dielectric Insulation": "8,000 Volts (8 kV) per layer",
      "Tensile Strength": "700 PSI Tensile Breaking Strength",
      "Elongation Limit": "Up to 300% Elongation Stretch",
      "Chemical Resistance": "Resistant to UV, Ozone, Oils, Fuels, Salt Water",
    },
    thicknessLengthMatrix: [
      { micron: "0.5 mm", gauge: "20 mil", meters: "3", feet: "10" },
      { micron: "0.5 mm", gauge: "20 mil", meters: "5", feet: "16" },
      { micron: "0.5 mm", gauge: "20 mil", meters: "10", feet: "33" },
      { micron: "1.0 mm", gauge: "40 mil", meters: "5", feet: "16" },
      { micron: "1.0 mm", gauge: "40 mil", meters: "10", feet: "33" },
      { micron: "1.5 mm", gauge: "60 mil", meters: "15", feet: "49" },
    ],
    subCategories: [
      {
        id: "self-fusing-silicone-leak-tapes",
        title: "Self-Fusing Silicone Rubber Leak Tapes",
        subtitle: "Adhesive-Free Pipe & Electrical Insulation Repair Tapes",
        blurb: "Self-amalgamating silicone rubber tape that bonds to itself upon wrapping under tension. Provides an instant 100% waterproof emergency seal for leaking pipes, automotive radiator hoses, and high-voltage electrical cable splices.",
        image: "/images/products/silicon-tapes/image.png",
        specs: {
          "Widths": "25mm (1 Inch), 50mm (2 Inch)",
          "Thickness": "0.5mm, 1.0mm",
          "Dielectric Rating": "8 kV per layer",
          "Temp Limit": "-50°C to +260°C",
        },
        applications: ["Emergency industrial pipe leak wrapping", "High-voltage cable joint insulation", "Automotive radiator hose emergency repair"],
      },
      {
        id: "silicone-bag-sealing-tapes",
        title: "Silicone Bag Sealing Tapes",
        subtitle: "Peel-and-Seal Reusable Bag Closure Tapes",
        blurb: "Polyester-backed silicone release liner tapes designed for sealing plastic mailers, OPP bags, and courier pouches with reusable peel-and-seal functionality.",
        image: "/images/products/silicon-tapes/applications/app-1.png",
        specs: {
          "Substrate": "Mylar / PET film with silicone release coating",
          "Adhesive": "Solvent acrylic / Synthetic rubber glue",
          "Format": "Spool roll / Pancakes slit roll",
          "Closure Type": "Resealable / Permanent Security Seal",
        },
        applications: ["OPP garment bag flap sealing", "E-commerce courier envelope closure", "Stationery bag peel-and-seal strips"],
      }
    ],
    options: {
      widths: ["25 mm", "50 mm"],
      thicknesses: ["0.5 mm", "1.0 mm", "1.5 mm"],
      colors: ["Jet Black", "Silicon Red", "Transparent Clear"],
    },
    applications: ["Emergency leak wrapping", "High voltage cable insulation wrapping", "Industrial pipe thread seals"],
    visualGradients: "from-violet-400 to-fuchsia-500",
  },

  // --- PALLET WRAPPING ---
  {
    id: "manual-stretch-film",
    title: "Manual Stretch Film",
    category: "pallet-wrapping",
    tag: "Manual",
    blurb: "Used to wrap cargo pallets manually by warehouse staff. Pre-stretched high-cling hand wrap rolls.",
    longDesc: "Pre-stretched and standard hand-wrapping stretch films. High puncture resistance prevents tearing on box corners. Lightweight roll profile reduces worker fatigue during manual pallet wrapping.",
    image: "/images/products/manual-stretch-film/image.png",
    gallery: [
      "/images/products/manual-stretch-film/image.png",
      "/images/products/manual-stretch-film/applications/app-1.png",
      "/images/products/manual-stretch-film/applications/app-2.png",
      "/images/products/manual-stretch-film/applications/app-3.png",
      "/images/products/manual-stretch-film/applications/app-4.png"
    ],
    specs: {
      "Stretch Ratio": "Up to 150% manual limit",
      "Cling index": "One-sided tackiness (leaves no residue)",
      "Core Size": "3 inch standard cardboard core",
      "Roll weight": "2.4 kg average",
    },
    options: {
      widths: ["450 mm", "500 mm"],
      thicknesses: ["12 Micron", "15 Micron", "19 Micron"],
      colors: ["Ultra Clear Tint", "Opaque Jet Black"],
    },
    applications: ["Manual pallet wrap runs", "Irregular shaped load binding", "Dust and water proof wrap coating"],
    visualGradients: "from-yellow-400 to-amber-500",
  },
  {
    id: "machine-stretch-film",
    title: "Machine Stretch Film",
    category: "pallet-wrapping",
    tag: "Machine",
    blurb: "Used to wrap heavy pallet loads on automated pre-stretch turntable wrappers. High-performance machine stretch wrap.",
    longDesc: "Cast co-extruded machine stretch film rolls. Designed to stretch up to 300% on automatic powered pre-stretch turntable wrappers. Low noise unwind and high puncture resistance.",
    image: "/images/products/machine-stretch-film/image.png",
    gallery: [
      "/images/products/machine-stretch-film/image.png",
      "/images/products/machine-stretch-film/applications/app-1.png",
      "/images/products/machine-stretch-film/applications/app-2.png",
      "/images/products/machine-stretch-film/applications/app-3.png",
      "/images/products/machine-stretch-film/applications/app-4.png"
    ],
    specs: {
      "Stretch Capability": "250% - 300% power stretch",
      "Roll Weight": "15 kg standard machine roll",
      "Puncture resistance": "Extremely high dart rating",
      "Roll core type": "Heavy duty machine core",
    },
    options: {
      widths: ["500 mm"],
      thicknesses: ["23 Micron", "25 Micron", "29 Micron"],
      colors: ["Crystal Clear"],
    },
    applications: ["Automatic pallet wrappers", "High volume packing warehouse runs", "Secure export cargo load wrap"],
    visualGradients: "from-yellow-400 to-amber-500",
  },
  {
    id: "pallet-cover",
    title: "Pallet Cover",
    category: "pallet-wrapping",
    tag: "Pallet Cover",
    blurb: "Used to protect stacked pallets from dust, moisture, and rain. Heavy-gauge LDPE pallet hood covers.",
    longDesc: "Gusseted LDPE pallet bags. Slipped over stacked pallets before stretch wrapping to provide complete 5-side moisture, dust, and rain protection for outdoor warehousing.",
    image: "/images/products/pallet-cover/image.png",
    gallery: ["/images/products/pallet-cover/image.png"],
    specs: {
      "Material Style": "Gusseted LDPE Hood bag",
      "Dust protection": "100% dust proof shield",
      "Water barrier": "Waterproof LDPE surface",
      "Format": "Pre-cut bags on roll",
    },
    options: {
      widths: ["Standard Pallet (1200x1000x1500mm)", "Extended Pallet (1200x1000x2000mm)"],
      thicknesses: ["80 Micron", "100 Micron", "120 Micron"],
      colors: ["Translucent Clear", "Opaque Black"],
    },
    applications: ["Outdoor pallet warehousing protection", "Chemical bulk bag covers", "Rain proof cargo shipping preparation"],
    visualGradients: "from-yellow-400 to-amber-500",
  },
  {
    id: "pallet-liner",
    title: "Pallet Liner",
    category: "pallet-wrapping",
    tag: "Pallet Liner",
    blurb: "Used to protect bottom box layers from pallet nail punctures and rising moisture. Anti-slip bottom liner sheets.",
    longDesc: "Placed on the wooden pallet base before stacking cartons. Protects bottom carton layers from nail punctures, splinters, moisture rising from wet wooden blocks, and slippage during cargo transit.",
    image: "/images/products/pallet-liner/image.png",
    gallery: ["/images/products/pallet-liner/image.png"],
    specs: {
      "Composition": "Heavy Kraft Cardboard / Corrugated plastic profile",
      "Slip Rating": "High slip-resistant surface coating",
      "Standard size": "1200 x 1000 mm",
      "Waterproofing": "Poly-laminated water barrier options",
    },
    options: {
      widths: ["1200 x 1000 mm"],
      thicknesses: ["350 GSM Paperboard", "3mm Corrugated plastic"],
      colors: ["Kraft Brown", "Grey plastic"],
    },
    applications: ["Pallet bottom layer board", "Stack stabilization interleaving", "Carton moisture barrier protector"],
    visualGradients: "from-yellow-400 to-amber-500",
  },

  // --- ADDITIONAL STANDALONE FILM PARENTS & SUB-PRODUCTS ---
  {
    id: "pof-shrink-film",
    title: "POF Shrink Film",
    category: "film-products",
    tag: "POF Shrink",
    blurb: "5-Layer co-extruded Polyolefin (POF) shrink rolls and pre-cut pouches engineered for crystal-clear optical transparency, high tensile puncture resistance, and dog-ear free shrink performance.",
    longDesc: `POF (Polyolefin) Shrink Film is an advanced multi-layer polymer film produced via double-bubble co-extrusion technology. Engineered for retail display packaging, food overwrapping, and industrial multipacks, POF shrink film delivers 93%+ glass-like clarity, high tensile strength, and clean non-stick sealing wire performance.

### Key Material Features
- **High Gloss Display Optics**: Enhances shelf presence with crystal-clear transparency.
- **Bi-Axial Uniform Shrinkage**: 62% MD / 60% TD shrink ratio ensures tight, wrinkle-free corner fitment without 'dog ears'.
- **Puncture & Tear Resistance**: Multi-layer LLDPE/PP core prevents tear propagation across sharp box corners.
- **Food Safe & Recyclable**: 100% FDA compliant for direct food contact and 100% recyclable.`,
    image: "/images/products/pof-shrink-rolls/image.png",
    gallery: [
      "/images/products/pof-shrink-rolls/image.png",
      "/images/products/pof-films-pouches/applications/app-1.png",
      "/images/products/pof-films-pouches/applications/app-2.png",
    ],
    specs: {
      "Polymer Structure": "5-Layer Co-Extruded Polyolefin (POF)",
      "Shrink Temp Window": "140°C to 180°C Thermal Tunnel",
      "Optical Clarity": "93% Glass Gloss Reflection",
      "Available Formats": "Centerfolded (CF) / Single Wound (SW) / Pre-Cut Pouches",
    },
    thicknessLengthMatrix: [
      { micron: "12", gauge: "50", meters: "1,665", feet: "5,250" },
      { micron: "15", gauge: "60", meters: "1,332", feet: "4,375" },
      { micron: "19", gauge: "75", meters: "1,067", feet: "3,500" },
      { micron: "25", gauge: "100", meters: "800", feet: "2,625" },
    ],
    subCategories: [
      { id: "cross-linked-pof", title: "Cross-Linked POF Film", subtitle: "Irradiated High Tensile Polyolefin Rolls", blurb: "Irradiated cross-linked POF shrink film with extreme puncture resistance and high hot-knife seal strength.", image: "/images/products/pof-shrink-rolls/image.png" },
      { id: "non-cross-linked-pof-film", title: "Non-Cross-Linked POF Film", subtitle: "Standard 5-Layer Soft Shrink Polyolefin", blurb: "Standard co-extruded POF shrink rolls designed for bakery, books, cosmetics, and general retail multipacks.", image: "/images/products/pof-shrink-rolls/image.png" },
      { id: "pof-shrink-pouches", title: "POF Shrink Pouches", subtitle: "Pre-Cut Sealed Polyolefin Shrink Bags", blurb: "Pre-cut 3-side sealed POF shrink pouches ready for manual L-bar sealing and instant shrink tunnel processing.", image: "/images/products/pof-films-pouches/applications/app-4.png" },
    ],
    options: { widths: ["200mm", "300mm", "450mm", "600mm"], thicknesses: ["12 Micron", "15 Micron", "19 Micron", "25 Micron"], colors: ["Ultra Clear Glass Finish"] },
    applications: ["Food & bakery packaging", "Gift basket & cosmetic boxes", "Toys, books & stationery packs"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "cross-linked-pof",
    title: "Cross-Linked POF Film",
    category: "film-products",
    tag: "Irradiated POF",
    blurb: "Irradiated cross-linked POF shrink film engineered with enhanced polymer chain bonds for extreme puncture resistance and high-speed automated L-sealer performance.",
    longDesc: "Cross-Linked POF Film undergoes high-energy electron beam irradiation during extrusion, forming strong cross-linked molecular bonds. This grants the film superior resistance against puncture from sharp edges, zero burn-through on extended shrink tunnels, and ultra-strong seal wire welds.",
    image: "/images/products/pof-shrink-rolls/image.png",
    gallery: ["/images/products/pof-shrink-rolls/image.png"],
    specs: { "Polymer Link": "Irradiated Cross-Linked Structure", "Puncture Resistance": "Superior Sharp Edge Impact Rating", "Sealing Window": "Ultra-Wide Hot Knife Sealing Range" },
    thicknessLengthMatrix: [{ micron: "12", gauge: "50", meters: "1,665", feet: "5,250" }, { micron: "15", gauge: "60", meters: "1,332", feet: "4,375" }, { micron: "19", gauge: "75", meters: "1,067", feet: "3,500" }],
    options: { widths: ["200mm", "300mm", "450mm", "600mm"], thicknesses: ["12 Micron", "15 Micron", "19 Micron", "25 Micron"], colors: ["Ultra Clear"] },
    applications: ["Heavy retail box bundling", "Sharp-edged hardware packaging", "High-speed automatic L-sealers"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "non-cross-linked-pof-film",
    title: "Non-Cross-Linked POF Film",
    category: "film-products",
    tag: "Standard POF",
    blurb: "Standard 5-layer co-extruded POF shrink rolls (centerfolded and single wound) offering outstanding optical clarity, soft-shrink capability, and low-temperature activation.",
    longDesc: "Non-Cross-Linked POF Film provides a cost-effective, high-clarity shrink solution for everyday retail items. Its soft-shrink tension prevents thin paperbacks or flexible food items from bending during shrinking.",
    image: "/images/products/pof-shrink-rolls/image.png",
    gallery: ["/images/products/pof-shrink-rolls/image.png"],
    specs: { "Format Availability": "Centerfolded (CF) / Single Wound (SW)", "Shrink Activation": "135°C Low Temperature Soft Shrink", "Clarity Rating": "94% Glass-Clear Display Optics" },
    thicknessLengthMatrix: [{ micron: "15", gauge: "60", meters: "1,332", feet: "4,375" }, { micron: "19", gauge: "75", meters: "1,067", feet: "3,500" }],
    options: { widths: ["200mm", "300mm", "450mm"], thicknesses: ["15 Micron", "19 Micron", "25 Micron"], colors: ["Glass Clear"] },
    applications: ["Food & bakery product wrapping", "Gift baskets & cosmetic packs", "Books & stationery boxes"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "pof-shrink-pouches",
    title: "POF Shrink Pouches",
    category: "film-products",
    tag: "POF Bags",
    blurb: "Pre-cut three-side sealed POF shrink pouches and bags ready for instant item insertion, eliminating roll slitting off-cut waste.",
    longDesc: "POF Shrink Pouches are pre-fabricated sealed bags designed to speed up manual packing operations. Users slide the product into the pouch and seal the open edge using a tabletop impulse wire sealer before tunnel shrinking.",
    image: "/images/products/pof-films-pouches/applications/app-4.png",
    gallery: ["/images/products/pof-films-pouches/applications/app-4.png"],
    specs: { "Format Style": "Pre-Cut 3-Side Sealed Bags", "Sealing Method": "Tabletop Impulse Bar Sealer", "Clarity": "Ultra-High Gloss" },
    thicknessLengthMatrix: [{ micron: "15", gauge: "60", meters: "Custom", feet: "Custom" }],
    options: { widths: ["100x150mm", "150x200mm", "200x300mm"], thicknesses: ["15 Micron", "19 Micron"], colors: ["Clear"] },
    applications: ["Individual gift basket wrapping", "Book & album shrink sealing", "Soap & cosmetic jar pouches"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "lamination-pe-film",
    title: "Lamination PE Film",
    category: "film-products",
    tag: "Lamination Poly",
    blurb: "High-clarity corona treated polyethylene lamination film engineered for solventless and solvent-based bonding with PET, BOPP, and aluminum foil substrates.",
    longDesc: "Lamination PE Film is specifically formulated with controlled slip properties and high corona surface treatment to provide permanent bond strength when laminated to printed polyester (PET), BOPP, or metalized films.",
    image: "/images/products/specialty-pouches/image.png",
    gallery: ["/images/products/specialty-pouches/image.png"],
    specs: { "Corona Treatment": "42+ Dynes/cm Surface Energy", "Bonding Grade": "Solventless & Solvent-Based Polyurethane", "Thickness Range": "18 to 150 Micron" },
    thicknessLengthMatrix: [{ micron: "25", gauge: "100", meters: "1,200", feet: "3,936" }, { micron: "40", gauge: "160", meters: "750", feet: "2,460" }],
    subCategories: [
      { id: "adhesive-lamination-film", title: "Adhesive Lamination Film", subtitle: "High Bond Corona Treated Poly", blurb: "Versatile self-adhesive lamination film providing crystal clear finish and permanent substrate bonding.", image: "/images/products/specialty-pouches/image.png" },
      { id: "pharma-grade-poly", title: "Pharma Grade Poly", subtitle: "Ultra-Clean Barrier Poly Sheeting", blurb: "Cleanroom certified polyethylene lamination film formulated for pharmaceutical strip foil and medical device pouches.", image: "/images/products/specialty-pouches/image.png" },
    ],
    options: { widths: ["300mm", "600mm", "900mm", "1200mm"], thicknesses: ["25 Micron", "40 Micron", "60 Micron"], colors: ["Natural Clear", "White Opaque"] },
    applications: ["Food packaging flexible laminates", "Pharmaceutical strip packaging", "Agro-chemical barrier laminates"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  {
    id: "pharma-grade-poly",
    title: "Pharma Grade Poly",
    category: "film-products",
    tag: "Pharma Barrier",
    blurb: "Cleanroom manufactured prime polyethylene lamination film for pharmaceutical strip foil packaging, oral dosage pouches, and sterile medical device overwrapping.",
    longDesc: "Pharma Grade Poly is extruded under strict cGMP cleanroom conditions using US FDA-compliant virgin resin. Features low extractables, excellent heat sealing integrity, and superior moisture/gas barrier performance when laminated to aluminum foil or PET.",
    image: "/images/products/specialty-pouches/image.png",
    gallery: ["/images/products/specialty-pouches/image.png"],
    specs: { "Cleanroom Standard": "ISO Class 8 Cleanroom Extrusion", "Compliance": "US FDA 21 CFR & EU Food Contact Approved", "Extractables": "Ultra-Low Migratable Additive Index" },
    thicknessLengthMatrix: [{ micron: "30", gauge: "120", meters: "1,000", feet: "3,280" }, { micron: "50", gauge: "200", meters: "600", feet: "1,968" }],
    options: { widths: ["200mm", "400mm", "600mm"], thicknesses: ["30 Micron", "50 Micron", "70 Micron"], colors: ["Natural Ultra-Clear", "Opaque White"] },
    applications: ["Pharmaceutical strip foil lamination", "Medical sachet & pouch barrier lining", "Sterile surgical tray covers"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  {
    id: "biodegradable-films",
    title: "Biodegradable Films",
    category: "film-products",
    tag: "Eco Bio Film",
    blurb: "100% Certified home and industrial compostable bio-polymer films (PBAT + PLA + Cornstarch) engineered for eco-friendly shopping bags, shrink wrap, and courier mailers.",
    longDesc: `Biodegradable Films are certified eco-friendly packaging materials produced from renewable bio-resins. Compliant with EN 13432 and ISO 17088 standards, these films fully break down into natural organic soil nutrients within 90 to 180 days in composting conditions without leaving microplastics or toxic residues.

### Key Material Advantages
- **100% Certified Compostable**: EN 13432 & ISO 17088 Certified.
- **Zero Microplastics**: Degrades naturally into water, CO2, and biomass.
- **Silk Matte Finish**: Elegant soft-touch texture for luxury eco retail packaging.`,
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    gallery: ["/images/desktop/journey/solution_pcr_eco_film.png"],
    specs: { "Bio Resin Base": "PBAT + PLA + Cornstarch Blend", "Certification": "EN 13432 / ASTM D6400 / ISO 17088", "Disintegration": "Fully degraded within 90-180 Days" },
    thicknessLengthMatrix: [{ micron: "20", gauge: "80", meters: "1,500", feet: "4,920" }, { micron: "30", gauge: "120", meters: "1,000", feet: "3,280" }],
    subCategories: [
      { id: "bio-degradable-mulch-film", title: "Bio Degradable Mulch Film", subtitle: "Soil Compostable Mulch Sheeting", blurb: "Soil-biodegradable agricultural mulch film that plows directly into soil after harvest.", image: "/images/desktop/journey/solution_pcr_eco_film.png" },
      { id: "biodegradable-shrink-film", title: "Biodegradable Shrink Film", subtitle: "Compostable Overwrap Shrink Rolls", blurb: "Eco-friendly POF/PBAT heat shrink rolls for sustainable product overwrapping.", image: "/images/desktop/journey/solution_pcr_eco_film.png" },
      { id: "biodegradable-shopping-bag", title: "Biodegradable Shopping Bag", subtitle: "Eco Retail Carry Bags", blurb: "D-cut and W-cut compostable retail carry bags with non-toxic flexo ink branding.", image: "/images/products/compostable-films-pouches/applications/app-4.png" },
      { id: "compostable-pouches", title: "Compostable Pouches", subtitle: "Self-Adhesive Bio Courier Mailers", blurb: "Eco e-commerce courier bags with high-tack permanent adhesive eco flap tape.", image: "/images/products/compostable-films-pouches/applications/app-4.png" },
    ],
    options: { widths: ["200mm", "350mm", "500mm"], thicknesses: ["20 Micron", "30 Micron", "40 Micron"], colors: ["Natural Translucent", "Eco Green", "Matte Off-White"] },
    applications: ["Sustainable retail packaging", "Eco e-commerce courier bags", "Soil compostable agricultural mulch"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "bio-degradable-mulch-film",
    title: "Bio Degradable Mulch Film",
    category: "film-products",
    tag: "Eco Soil Mulch",
    blurb: "Soil-degradable PBAT agricultural mulch film that breaks down directly in field soil, eliminating plastic retrieval costs post-harvest.",
    longDesc: "Bio Degradable Mulch Film is engineered to perform as a high-efficiency weed and moisture barrier during crop growth, then completely biodegrade into soil organic matter when plowed under post-harvest.",
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    gallery: ["/images/desktop/journey/solution_pcr_eco_film.png"],
    specs: { "Biodegradability": "100% Soil Biodegradable (EN 17033)", "UV Lifespan": "3 to 6 Months Field Stability", "Thickness": "15 to 25 Micron" },
    thicknessLengthMatrix: [{ micron: "15", gauge: "60", meters: "1,200", feet: "3,936" }, { micron: "20", gauge: "80", meters: "1,000", feet: "3,280" }],
    options: { widths: ["0.9m", "1.2m", "1.5m"], thicknesses: ["15 Micron", "20 Micron", "25 Micron"], colors: ["Black Opaque", "Translucent"] },
    applications: ["Vegetable crop mulching", "Short-cycle organic farming", "Zero-plastic field retrieval agriculture"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "biodegradable-shrink-film",
    title: "Biodegradable Shrink Film",
    category: "film-products",
    tag: "Eco Shrink",
    blurb: "Certified compostable heat shrink film rolls designed for eco-conscious retail overwrapping and multipack bundling.",
    longDesc: "Biodegradable Shrink Film provides smooth bi-axial shrink performance while remaining 100% home and industrial compostable, helping consumer brands meet strict zero-waste goals.",
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    gallery: ["/images/desktop/journey/solution_pcr_eco_film.png"],
    specs: { "Shrink Temp": "140°C to 170°C", "Certification": "EN 13432 Certified", "Format": "Centerfolded Rolls" },
    thicknessLengthMatrix: [{ micron: "19", gauge: "75", meters: "1,000", feet: "3,280" }],
    options: { widths: ["200mm", "350mm", "450mm"], thicknesses: ["19 Micron", "25 Micron"], colors: ["Translucent Clear"] },
    applications: ["Organic product multipacks", "Eco retail box overwrap", "Sustainable cosmetics packaging"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "biodegradable-shopping-bag",
    title: "Biodegradable Shopping Bag",
    category: "film-products",
    tag: "Eco Carry Bag",
    blurb: "High-tensile compostable retail carry bags featuring D-cut and loop handles, silk matte finish, and custom water-based eco printing.",
    longDesc: "Biodegradable Shopping Bags offer the strength and tear resistance of traditional plastic carry bags, with the environmental benefit of 100% certified home compostability.",
    image: "/images/products/compostable-films-pouches/applications/app-4.png",
    gallery: ["/images/products/compostable-films-pouches/applications/app-4.png"],
    specs: { "Handle Style": "D-Cut / Loop Handle / W-Cut", "Inks": "Non-Toxic Water-Based Eco Flexo Ink", "Load Capacity": "Up to 8 kg" },
    thicknessLengthMatrix: [{ micron: "30", gauge: "120", meters: "Custom", feet: "Custom" }],
    options: { widths: ["8x10 inch", "12x15 inch", "16x20 inch"], thicknesses: ["30 Micron", "40 Micron", "50 Micron"], colors: ["Natural White", "Eco Green"] },
    applications: ["Retail apparel shopping bags", "Grocery store organic produce bags", "Exhibition & event eco carry bags"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "compostable-pouches",
    title: "Compostable Pouches",
    category: "film-products",
    tag: "Eco Mailer",
    blurb: "100% Home compostable self-adhesive courier mailers and zipper pouches for sustainable e-commerce shipping.",
    longDesc: "Compostable Pouches feature a permanent high-tack adhesive flap tape that seals security parcels reliably while breaking down into natural soil humus in compost bins.",
    image: "/images/products/compostable-films-pouches/applications/app-4.png",
    gallery: ["/images/products/compostable-films-pouches/applications/app-4.png"],
    specs: { "Adhesive Flap": "Permanent High-Tack Eco Adhesive Strip", "Surface Feel": "Silky Soft-Touch Matte", "Tear Strength": "High Puncture Resistance" },
    thicknessLengthMatrix: [{ micron: "50", gauge: "200", meters: "Custom", feet: "Custom" }],
    options: { widths: ["6x9 inch", "10x12 inch", "12x16 inch"], thicknesses: ["50 Micron", "60 Micron"], colors: ["Matte Black", "Off-White", "Leaf Green"] },
    applications: ["Sustainable e-commerce courier shipping", "Apparel brand mailers", "Eco subscription box packaging"],
    visualGradients: "from-emerald-500 to-teal-700",
  },
  {
    id: "flexible-laminates",
    title: "Flexible Laminate Rolls & Pouches",
    category: "film-products",
    tag: "Flexible Laminate",
    blurb: "Multi-layer barrier laminates (PET/ALU/PE, PET/MET-PET/PE, BOPP/CPP) in printed roll stock and pre-formed pouch formats for food, agro-chemical, and retail products.",
    longDesc: `Flexible Laminate Rolls & Pouches represent the pinnacle of high-barrier food and industrial packaging. By combining reverse-printed PET or BOPP films with high-barrier aluminum foil or metalized polyester and sealable PE/CPP inner layers, our flexible laminates protect sensitive products against moisture, oxygen, light, and aroma loss.

### High-Barrier Multi-Layer Constructions
- **3-Ply Metalized (PET / MET-PET / PE)**: Outstanding moisture and oxygen barrier for snacks, coffee, and spices.
- **3-Ply Foil (PET / ALU / PE)**: Zero gas and light transmission for pharmaceutical powders, agro-chemicals, and vacuum items.
- **2-Ply Clear (BOPP / CPP)**: High transparency crisp-feel laminates for bakery items and dry pasta.`,
    image: "/images/products/specialty-pouches/image.png",
    gallery: ["/images/products/specialty-pouches/image.png"],
    specs: { "Barrier Layers": "Aluminum Foil / MET-PET / EVOH / PVDC", "Printing Technology": "Up to 9-Color High Definition Rotogravure", "Lamination Type": "Solvent-Free Eco Polyurethane Lamination" },
    thicknessLengthMatrix: [{ micron: "60", gauge: "240", meters: "1,000", feet: "3,280" }, { micron: "100", gauge: "400", meters: "600", feet: "1,968" }],
    subCategories: [
      { id: "food-packaging-laminates", title: "Food Packaging Laminates", subtitle: "High Barrier Printed Food Laminate Rolls", blurb: "Rotogravure printed barrier laminate rolls for snacks, tea, coffee, and dry spices.", image: "/images/products/specialty-pouches/image.png" },
      { id: "agro-chemical-laminates", title: "Agro Chemical Laminates", subtitle: "Pesticide & Chemical Foil Laminates", blurb: "Chemical-resistant aluminum foil laminates designed for pesticide and fertilizer packaging.", image: "/images/products/specialty-pouches/image.png" },
      { id: "plain-standup-pouches", title: "Plain Standup Pouches", subtitle: "Zipper & Spout Pre-Formed Pouches", blurb: "Unprinted stock stand-up pouches with zip locks for retail packaging versatility.", image: "/images/products/specialty-pouches/image.png" },
      { id: "lidding-foils-laminates", title: "Lidding Foils And Laminates", subtitle: "Peelable Cup & Tray Lidding Foils", blurb: "Heat-sealable lidding foil for yogurt cups, mineral water cups, and meal trays.", image: "/images/products/specialty-pouches/image.png" },
      { id: "wrap-around-labels", title: "Wrap Around Labels", subtitle: "BOPP Bottle Roll Labels", blurb: "Roll-fed continuous BOPP wrap-around labels for beverage and water bottles.", image: "/images/products/specialty-pouches/image.png" },
      { id: "laminated-pouch-india", title: "Laminated Pouch India", subtitle: "Custom Pre-Formed Barrier Bags", blurb: "Custom 3-side seal, center seal, and gusseted laminated pouches.", image: "/images/products/specialty-pouches/image.png" },
    ],
    options: { widths: ["100mm to 1200mm"], thicknesses: ["50 Micron", "80 Micron", "120 Micron"], colors: ["Rotogravure HD 9-Color Print"] },
    applications: ["Processed food & snack packaging", "Pesticide & agro chemical barrier sachets", "Beverage bottle wrap-around labels"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  {
    id: "food-packaging-laminates",
    title: "Food Packaging Laminates",
    category: "film-products",
    tag: "Food Laminate",
    blurb: "Rotogravure printed multi-layer barrier laminate rolls engineered to preserve aroma, crispness, and shelf life for dry food products.",
    longDesc: "Food Packaging Laminates combine HD rotogravure surface/reverse printing with high-barrier inner layers (MET-PET, Aluminum Foil, EVOH). Engineered for automatic form-fill-seal (FFS) pouch machines.",
    image: "/images/products/specialty-pouches/image.png",
    gallery: ["/images/products/specialty-pouches/image.png"],
    specs: { "Printing": "Up to 9 Color High Definition Rotogravure", "Food Contact": "100% FDA Approved Direct Food Grade", "Form-Fill-Seal": "High Speed VFFS / HFFS Runnability" },
    thicknessLengthMatrix: [{ micron: "60", gauge: "240", meters: "1,000", feet: "3,280" }],
    options: { widths: ["200mm", "350mm", "500mm"], thicknesses: ["60 Micron", "80 Micron", "100 Micron"], colors: ["Custom Printed"] },
    applications: ["Snack food & potato chip packaging", "Ground coffee & tea leaf barrier pouches", "Spices, pulses & bakery item rolls"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  {
    id: "agro-chemical-laminates",
    title: "Agro Chemical Laminates",
    category: "film-products",
    tag: "Agro Laminate",
    blurb: "Heavy-duty aluminum foil and specialty resin barrier laminates engineered to contain aggressive pesticides, insecticides, and liquid fertilizers.",
    longDesc: "Agro Chemical Laminates utilize chemical-resistant primer coatings and thick aluminum foil layers to prevent volatile solvent migration, sachet swelling, or pinhole corrosion.",
    image: "/images/products/specialty-pouches/image.png",
    gallery: ["/images/products/specialty-pouches/image.png"],
    specs: { "Foil Thickness": "7 Micron to 12 Micron Pure Aluminum", "Chemical Barrier": "Solvent-Proof Primer Coating", "Burst Strength": "Ultra-High Puncture Resistance" },
    thicknessLengthMatrix: [{ micron: "90", gauge: "360", meters: "800", feet: "2,624" }],
    options: { widths: ["150mm", "300mm", "450mm"], thicknesses: ["80 Micron", "100 Micron", "120 Micron"], colors: ["Custom HD Print"] },
    applications: ["Liquid pesticide sachets", "Powder fungicide barrier pouches", "Specialty chemical packaging"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  {
    id: "plain-standup-pouches",
    title: "Plain Standup Pouches",
    category: "film-products",
    tag: "Standup Pouch",
    blurb: "Unprinted stock stand-up pouches with press-to-close zippers and bottom gussets for elegant, self-standing retail display.",
    longDesc: "Plain Standup Pouches provide small and medium brands an instant, professional retail packaging solution. Features a wide bottom gusset that expands to allow the pouch to stand unsupported on store shelves.",
    image: "/images/products/specialty-pouches/image.png",
    gallery: ["/images/products/specialty-pouches/image.png"],
    specs: { "Pouch Format": "K-Seal / Round Bottom Standup Gusset", "Closure": "Re-sealable Press Zip Lock", "Tear Notch": "Precision Laser Scored Easy-Tear Notch" },
    thicknessLengthMatrix: [{ micron: "100", gauge: "400", meters: "Custom", feet: "Custom" }],
    options: { widths: ["100x150+30mm", "150x220+40mm", "200x300+50mm"], thicknesses: ["100 Micron", "120 Micron"], colors: ["Silver Foil", "Matte Black", "Kraft Paper"] },
    applications: ["Nuts, dried fruits & trail mix", "Specialty coffee beans & tea leaves", "Pet treats & nutritional supplements"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  {
    id: "lidding-foils-laminates",
    title: "Lidding Foils And Laminates",
    category: "film-products",
    tag: "Lidding Foil",
    blurb: "Heat-sealable aluminum foil and polyester lidding die-cut lids for yogurt cups, mineral water cups, and rigid plastic trays.",
    longDesc: "Lidding Foils And Laminates provide hermetic heat sealing onto PP, PS, PET, and PVC plastic containers. Formulated with easy-peel lacquer coatings for smooth consumer opening.",
    image: "/images/products/specialty-pouches/image.png",
    gallery: ["/images/products/specialty-pouches/image.png"],
    specs: { "Sealing Lacquer": "Heat Sealable PP/PS/PET Lacquer", "Format": "Die-Cut Lids / Continuous Roll Stock", "Peel Rating": "Smooth Controlled Easy Peel" },
    thicknessLengthMatrix: [{ micron: "38", gauge: "150", meters: "1,000", feet: "3,280" }],
    options: { widths: ["75mm Lid", "95mm Lid", "Custom Tray Dimensions"], thicknesses: ["30 Micron", "38 Micron", "50 Micron"], colors: ["Embossed Silver", "Custom Printed"] },
    applications: ["Yogurt & dairy cup lidding", "Water & juice cup covers", "Ready-meal plastic tray seals"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  {
    id: "wrap-around-labels",
    title: "Wrap Around Labels",
    category: "film-products",
    tag: "Wrap Label",
    blurb: "Continuous roll-fed BOPP wrap-around labels for high-speed hot-melt labeling on PET beverage bottles and jars.",
    longDesc: "Wrap Around Labels are produced on clear, white, or metalized BOPP film rolls. Applied on continuous hot-melt roll-fed labeling machines at speeds exceeding 400 bottles per minute.",
    image: "/images/products/specialty-pouches/image.png",
    gallery: ["/images/products/specialty-pouches/image.png"],
    specs: { "Material Substrate": "38/40 Micron White/Clear/Metalized BOPP", "Printing": "UV Flexo / Rotogravure HD Print", "Line Speed": "Up to 500 Bottles / Min" },
    thicknessLengthMatrix: [{ micron: "38", gauge: "150", meters: "2,000", feet: "6,560" }],
    options: { widths: ["50mm", "80mm", "120mm"], thicknesses: ["38 Micron", "40 Micron"], colors: ["Pearlized White", "Clear", "Metallic Silver"] },
    applications: ["Mineral water PET bottles", "Carbonated soft drink bottles", "Edible oil & condiment jars"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  {
    id: "laminated-pouch-india",
    title: "Laminated Pouch India",
    category: "film-products",
    tag: "Barrier Bags",
    blurb: "Custom engineered 3-side seal, center seal, and side gusset barrier pouches manufactured to ISO 9001:2015 quality standards.",
    longDesc: "Laminated Pouch India covers our full range of custom pre-formed flexible pouches fabricated for domestic and export FMCG brands.",
    image: "/images/products/specialty-pouches/image.png",
    gallery: ["/images/products/specialty-pouches/image.png"],
    specs: { "Seal Style": "3-Side Seal / Center Fin Seal / Side Gusset", "Pinhole Resistance": "Zero Defect Thermal Welding", "Custom HD Print": "Up to 9 Colors" },
    thicknessLengthMatrix: [{ micron: "70", gauge: "280", meters: "Custom", feet: "Custom" }],
    options: { widths: ["100x150mm", "200x300mm", "300x450mm"], thicknesses: ["70 Micron", "90 Micron", "110 Micron"], colors: ["HD Rotogravure Custom"] },
    applications: ["FMCG retail product packaging", "Bulk food & chemical pouches", "Export goods moisture-proof bags"],
    visualGradients: "from-blue-600 to-indigo-700",
  },
  {
    id: "printed-pe-films",
    title: "Printed PE Films",
    category: "film-products",
    tag: "Printed PE",
    blurb: "Multi-layer co-extruded printed PE liquid film rolls (Milk, Ghee, Water, SMP) with high puncture resistance and zero-leak thermal seam welding.",
    longDesc: `Printed PE Films are specialized high-tensile polyethylene rolls manufactured for automatic liquid and dairy pouch packaging machines (VFFS). Formulated with 3-layer co-extruded resin blends featuring black EVOH/opaque barrier layers that protect fresh milk, ghee, edible oil, and purified water from light oxidation.

### Key Performance Properties
- **High Hot-Tack Sealing**: Weld seam seals instantly through liquid splash on high-speed vertical form-fill-seal machines.
- **Light & UV Barrier**: 100% opaque inner layer prevents vitamin degradation and off-flavor development.
- **Tear & Drop Strength**: Co-extruded mLLDPE prevents pouch burst when dropped during dairy logistics.`,
    image: "/images/products/coloured-films-pouches/image.png",
    gallery: ["/images/products/coloured-films-pouches/image.png"],
    specs: { "Extrusion Tech": "3-Layer Co-Extruded Liquid Packaging Film", "Leak Rate": "Zero Leakage Weld Seam Guarantee", "Printing": "Food-Safe Flexographic Printing" },
    thicknessLengthMatrix: [{ micron: "55", gauge: "220", meters: "1,000", feet: "3,280" }, { micron: "75", gauge: "300", meters: "750", feet: "2,460" }],
    subCategories: [
      { id: "milk-packaging-film", title: "Milk Packaging Film", subtitle: "Liquid Milk Pouch Film Rolls", blurb: "3-Layer black/white co-extruded liquid milk pouch packaging rolls.", image: "/images/products/coloured-films-pouches/image.png" },
      { id: "ghee-packaging-film", title: "Ghee Packaging Film", subtitle: "High Barrier Ghee & Oil Film", blurb: "High puncture resistance film rolls for ghee, vanaspati, and edible oil pouches.", image: "/images/products/coloured-films-pouches/image.png" },
      { id: "smp-packaging-film", title: "SMP Packaging Film", subtitle: "Skimmed Milk Powder Bulk Bags", blurb: "Heavy-duty barrier liner film rolls for skimmed milk powder and dairy ingredients.", image: "/images/products/ldpe-shrink-rolls/image.png" },
      { id: "water-packaging-film", title: "Water Packaging Film", subtitle: "Purified Water Pouch Sheeting", blurb: "High-clarity printed PE film rolls for 200ml and 500ml drinking water pouches.", image: "/images/products/coloured-films-pouches/image.png" },
    ],
    options: { widths: ["325mm", "345mm", "450mm"], thicknesses: ["55 Micron", "65 Micron", "75 Micron", "90 Micron"], colors: ["White / Black Co-ex", "Clear"] },
    applications: ["Liquid fresh milk pouch packaging", "Ghee & edible oil pouches", "Drinking water sachet rolls"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "milk-packaging-film",
    title: "Milk Packaging Film",
    category: "film-products",
    tag: "Milk Film",
    blurb: "3-Layer co-extruded black/white polyethylene pouch film engineered for continuous liquid fresh milk packaging machines.",
    longDesc: "Milk Packaging Film features an opaque white outer layer for vibrant brand printing and a solid black inner layer that blocks UV light to preserve fresh milk freshness and nutritional value.",
    image: "/images/products/coloured-films-pouches/image.png",
    gallery: ["/images/products/coloured-films-pouches/image.png"],
    specs: { "Co-Extrusion": "White / Clear / Black 3-Layer Structure", "Seal Strength": "High Hot-Tack Liquid Sealing", "Thickness": "55 Micron to 75 Micron" },
    thicknessLengthMatrix: [{ micron: "55", gauge: "220", meters: "1,000", feet: "3,280" }, { micron: "65", gauge: "260", meters: "850", feet: "2,788" }],
    options: { widths: ["325mm Standard", "345mm"], thicknesses: ["55 Micron", "65 Micron", "75 Micron"], colors: ["White/Black Co-ex"] },
    applications: ["Pasteurized fresh milk pouches", "Buttermilk & lassi liquid packaging", "Flavored milk sachets"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "ghee-packaging-film",
    title: "Ghee Packaging Film",
    category: "film-products",
    tag: "Ghee Film",
    blurb: "Heavy-duty multi-layer poly film rolls engineered for oil/grease resistance and puncture-free ghee pouch packaging.",
    longDesc: "Ghee Packaging Film utilizes specialized metallocene LLDPE resins that resist fat breakdown and maintain high heat seal strength in the presence of hot liquid ghee or edible oils.",
    image: "/images/products/coloured-films-pouches/image.png",
    gallery: ["/images/products/coloured-films-pouches/image.png"],
    specs: { "Grease Resistance": "100% Oil & Fat Barrier", "Dart Drop Impact": "High Puncture Resistance", "Thickness": "75 Micron to 105 Micron" },
    thicknessLengthMatrix: [{ micron: "75", gauge: "300", meters: "750", feet: "2,460" }, { micron: "90", gauge: "360", meters: "600", feet: "1,968" }],
    options: { widths: ["325mm", "450mm"], thicknesses: ["75 Micron", "90 Micron", "105 Micron"], colors: ["White HD Printed"] },
    applications: ["Pure ghee 500ml & 1L pouches", "Vanaspati & mustard oil packaging", "Refined cooking oil sachets"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "smp-packaging-film",
    title: "SMP Packaging Film",
    category: "film-products",
    tag: "SMP Bag Film",
    blurb: "Heavy-gauge moisture barrier PE liner film rolls for skimmed milk powder (SMP) 25kg bulk bags and agricultural ingredients.",
    longDesc: "SMP Packaging Film is extruded with ultra-low moisture vapor transmission rates (MVTR) to prevent hygroscopic skimmed milk powder from caking or absorbing ambient moisture.",
    image: "/images/products/ldpe-shrink-rolls/image.png",
    gallery: ["/images/products/ldpe-shrink-rolls/image.png"],
    specs: { "MVTR Barrier": "Ultra Low Moisture Vapor Transmission Rate", "Bag Capacity": "25kg Heavy Duty Bulk Lining", "Thickness": "80 Micron to 150 Micron" },
    thicknessLengthMatrix: [{ micron: "100", gauge: "400", meters: "500", feet: "1,640" }],
    options: { widths: ["600mm", "900mm", "1200mm"], thicknesses: ["80 Micron", "100 Micron", "120 Micron"], colors: ["Natural Clear", "Milky White"] },
    applications: ["Skimmed milk powder 25kg inner liners", "Dairy whey powder bulk bags", "Food ingredient protective liners"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "water-packaging-film",
    title: "Water Packaging Film",
    category: "film-products",
    tag: "Water Film",
    blurb: "High-clarity virgin LDPE printed film rolls for fast automatic packaging of 200ml and 500ml purified drinking water pouches.",
    longDesc: "Water Packaging Film is extruded from 100% prime virgin polyethylene resins ensuring completely odor-free, taste-free water sachet packaging.",
    image: "/images/products/coloured-films-pouches/image.png",
    gallery: ["/images/products/coloured-films-pouches/image.png"],
    specs: { "Odor / Taste": "100% Taste-Free & Odorless Virgin Resin", "Seal Weld": "High-Speed Impulse Sealing", "Thickness": "50 Micron to 65 Micron" },
    thicknessLengthMatrix: [{ micron: "55", gauge: "220", meters: "1,000", feet: "3,280" }],
    options: { widths: ["325mm"], thicknesses: ["50 Micron", "55 Micron", "65 Micron"], colors: ["Clear HD Printed"] },
    applications: ["200ml & 500ml drinking water pouches", "Liquids sachet packaging", "Event mineral water pouches"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "sustainable-stretch-wrap",
    title: "Sustainable Stretch Wrap",
    category: "film-products",
    tag: "Eco Stretch",
    blurb: "30%+ Post-Consumer Recycled (PCR) content pallet stretch film rolls delivering high load holding force with reduced virgin plastic footprint.",
    longDesc: "Sustainable Stretch Wrap incorporates certified PCR resin without sacrificing pre-stretch performance or puncture resistance, helping warehouses meet corporate ESG sustainability metrics.",
    image: "/images/products/stretch-film/image.png",
    gallery: ["/images/products/stretch-film/image.png"],
    specs: { "PCR Content": "30%+ Certified Post-Consumer Recycled Poly", "Pre-Stretch": "Up to 250% Pre-Stretch Capability", "Thickness": "17 to 23 Micron" },
    thicknessLengthMatrix: [{ micron: "20", gauge: "80", meters: "300", feet: "984" }],
    options: { widths: ["500mm"], thicknesses: ["17 Micron", "20 Micron", "23 Micron"], colors: ["Translucent Eco Tint"] },
    applications: ["Green warehouse pallet wrapping", "Sustainable logistics unitization", "Corporate ESG packaging compliance"],
    visualGradients: "from-yellow-400 to-amber-500",
  },
  {
    id: "mini-stretch-wrap-rolls",
    title: "Mini Stretch Wrap Rolls",
    category: "film-products",
    tag: "Mini Stretch",
    blurb: "Compact 100mm and 250mm handheld mini stretch wrap rolls with reusable plastic handles for fast bundle tying and pipe bundling.",
    longDesc: "Mini Stretch Wrap Rolls replace sticky tape or twine when bundling long extrusions, pipes, wooden moldings, or small boxes. Leaves zero adhesive residue on wrapped items.",
    image: "/images/products/stretch-film/image.png",
    gallery: ["/images/products/stretch-film/image.png"],
    specs: { "Roll Width": "100mm (4 Inch) & 250mm (10 Inch)", "Included Accessories": "Reusable Plastic Extended Core Handle", "Cling": "High One-Side Cling" },
    thicknessLengthMatrix: [{ micron: "20", gauge: "80", meters: "150", feet: "492" }],
    options: { widths: ["100mm (4\")", "250mm (10\")"], thicknesses: ["17 Micron", "20 Micron"], colors: ["Clear", "Opaque Black"] },
    applications: ["Pipe & aluminum profile bundling", "Small box grouping & wire coil wrapping", "Residue-free industrial tying"],
    visualGradients: "from-yellow-400 to-amber-500",
  },
  {
    id: "ldpe-bags",
    title: "LDPE Bags",
    category: "film-products",
    tag: "LDPE Bags",
    blurb: "Heavy-duty pre-cut LDPE flat bags, gusseted box liners, shipping sacks, and trash bags fabricated with reinforced impulse welded bottom seals.",
    longDesc: "LDPE Bags are fabricated in a wide variety of custom dimensions, thicknesses, and seal styles. Designed for protective industrial lining, shipping bulk powders, and heavy hardware packaging.",
    image: "/images/products/ldpe-films-pouches/applications/app-3.png",
    gallery: ["/images/products/ldpe-films-pouches/applications/app-3.png"],
    specs: { "Seal Type": "Heavy-Duty Bottom Weld / Side Gusset", "Resin Grade": "Prime Virgin LDPE / LLDPE Blend", "Thickness Range": "30 to 200 Micron" },
    thicknessLengthMatrix: [{ micron: "50", gauge: "200", meters: "Custom", feet: "Custom" }, { micron: "100", gauge: "400", meters: "Custom", feet: "Custom" }],
    subCategories: [
      { id: "standard-normal-ldpe-film", title: "Standard Normal LDPE Film", subtitle: "High-Gloss Protective Sheeting", blurb: "Standard non-shrink LDPE tubing and sheeting rolls for dust protection and protective overwrapping.", image: "/images/products/ldpe-films-pouches/applications/app-1.png" },
      { id: "ldpe-pouches-bags", title: "LDPE Pouches & Bags", subtitle: "Industrial Gusseted Bags & Liners", blurb: "Custom size gusseted LDPE bags and box liners with high bottom seal integrity.", image: "/images/products/ldpe-films-pouches/applications/app-3.png" },
      { id: "heavy-duty-shipping-sacks", title: "Heavy-Duty Shipping Sacks", subtitle: "Puncture Proof Bulk Sacks", blurb: "Extra heavy-duty 150-200 micron LDPE sacks for chemical resins, fertilizers, and raw materials.", image: "/images/products/ldpe-films-pouches/applications/app-3.png" },
    ],
    options: { widths: ["200mm to 1200mm"], thicknesses: ["30 Micron", "50 Micron", "100 Micron", "150 Micron", "200 Micron"], colors: ["High Gloss Clear", "Milky White", "Black Opaque"] },
    applications: ["Industrial box & drum liners", "Heavy chemical & resin shipping sacks", "Garment & textile dust covers"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "heavy-duty-shipping-sacks",
    title: "Heavy-Duty Shipping Sacks",
    category: "film-products",
    tag: "Shipping Sacks",
    blurb: "Extra heavy-duty 150 to 200 micron LDPE/LLDPE sacks engineered for bulk chemical resin, fertilizer, and construction material transport.",
    longDesc: "Heavy-Duty Shipping Sacks deliver extreme puncture resistance and drop impact weld strength, replacing paper multi-wall sacks for moisture-sensitive bulk industrial materials.",
    image: "/images/products/ldpe-films-pouches/applications/app-3.png",
    gallery: ["/images/products/ldpe-films-pouches/applications/app-3.png"],
    specs: { "Thickness Range": "150 Micron to 200 Micron", "Bottom Seal": "Double Thermal Weld Seam", "Bag Format": "Open Mouth / Valve Sacks" },
    thicknessLengthMatrix: [{ micron: "150", gauge: "600", meters: "Custom", feet: "Custom" }, { micron: "200", gauge: "800", meters: "Custom", feet: "Custom" }],
    options: { widths: ["450x750mm", "500x850mm"], thicknesses: ["150 Micron", "180 Micron", "200 Micron"], colors: ["White / Black Co-ex", "Natural Clear"] },
    applications: ["Plastic resin pellet 25kg sacks", "Chemical & fertilizer shipping sacks", "Construction sand & compound bags"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "bopp-films",
    title: "BOPP Films",
    category: "film-products",
    tag: "BOPP Film",
    blurb: "Bi-axially Oriented Polypropylene (BOPP) plain, heat-sealable, and display pouches offering ultra-high clarity, moisture barrier, and dimensional stiffness.",
    longDesc: `BOPP Films are bi-axially stretched polypropylene sheets known for their superior optics, high tensile strength, and excellent moisture barrier properties. Widely used for flower wrapping, food pouches, tape backing, and high-gloss retail display bags.`,
    image: "/images/products/bopp-films-pouches/image.png",
    gallery: ["/images/products/bopp-films-pouches/image.png"],
    specs: { "Stretching Tech": "Bi-Axial Orientation (BOPP)", "Clarity Index": "95%+ Ultra Clear Optical Transparency", "Barrier": "High Moisture Vapor Barrier" },
    thicknessLengthMatrix: [{ micron: "20", gauge: "80", meters: "2,000", feet: "6,560" }, { micron: "30", gauge: "120", meters: "1,500", feet: "4,920" }],
    subCategories: [
      { id: "bopp-film-rolls", title: "BOPP Film Rolls", subtitle: "Plain & Corona Treated BOPP Sheeting", blurb: "High clarity plain and print-treated BOPP film rolls for lamination and overwrapping.", image: "/images/products/bopp-films-pouches/image.png" },
      { id: "bopp-display-pouches", title: "BOPP Display Pouches", subtitle: "Header Card & Tape Seal Bags", blurb: "Self-adhesive tape seal BOPP pouches with Euro-hole punch headers for retail display.", image: "/images/products/bopp-films-pouches/image.png" },
      { id: "heat-sealable-bopp-films", title: "Heat Sealable BOPP Films", subtitle: "Co-Extruded Sealable Overwrap Rolls", blurb: "Co-extruded heat-sealable BOPP rolls for automatic flow-wrap packaging machines.", image: "/images/products/bopp-films-pouches/image.png" },
    ],
    options: { widths: ["200mm to 1000mm"], thicknesses: ["15 Micron", "20 Micron", "25 Micron", "30 Micron"], colors: ["Ultra Clear Glass Finish", "Metalized Silver"] },
    applications: ["Bakery & confectionery overwrapping", "Retail display tape-seal bags", "BOPP adhesive tape base film"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "bopp-film-rolls",
    title: "BOPP Film Rolls",
    category: "film-products",
    tag: "BOPP Rolls",
    blurb: "High clarity plain and print-treated BOPP film rolls engineered for flexographic printing, thermal lamination, and food overwrapping.",
    longDesc: "BOPP Film Rolls deliver outstanding stiffness and moisture barrier. Surface treated up to 40+ dynes for crisp ink adhesion during high-speed printing.",
    image: "/images/products/bopp-films-pouches/image.png",
    gallery: ["/images/products/bopp-films-pouches/image.png"],
    specs: { "Corona Energy": "38 - 42 Dynes/cm", "Tensile Strength": "High MD/TD Tensile Rating", "Thickness Range": "15 to 40 Micron" },
    thicknessLengthMatrix: [{ micron: "20", gauge: "80", meters: "2,000", feet: "6,560" }, { micron: "25", gauge: "100", meters: "1,600", feet: "5,248" }],
    options: { widths: ["300mm", "500mm", "800mm"], thicknesses: ["15 Micron", "20 Micron", "25 Micron"], colors: ["Ultra Clear"] },
    applications: ["Flexo & gravure reverse printing", "Paperboard thermal lamination", "Flower & gift overwrapping"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "bopp-display-pouches",
    title: "BOPP Display Pouches",
    category: "film-products",
    tag: "BOPP Bags",
    blurb: "Glass-clear BOPP display pouches featuring resealable self-adhesive tape flaps and white header punch holes for retail peg display.",
    longDesc: "BOPP Display Pouches present garments, greeting cards, hosiery, and stationery with 95%+ optical reflection while keeping items clean from dust.",
    image: "/images/products/bopp-films-pouches/image.png",
    gallery: ["/images/products/bopp-films-pouches/image.png"],
    specs: { "Closure Type": "Resealable Self-Adhesive Flap Tape", "Header Punch": "White Printed Header with Euro Slot Hole", "Clarity": "Glass-Like Reflection" },
    thicknessLengthMatrix: [{ micron: "25", gauge: "100", meters: "Custom", feet: "Custom" }],
    options: { widths: ["4x6 inch", "6x9 inch", "9x12 inch"], thicknesses: ["25 Micron", "30 Micron"], colors: ["Clear"] },
    applications: ["Garment & shirt display packaging", "Greeting cards, albums & stationery", "Socks & hosiery retail bags"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "heat-sealable-bopp-films",
    title: "Heat Sealable BOPP Films",
    category: "film-products",
    tag: "Sealable BOPP",
    blurb: "Co-extruded heat-sealable BOPP rolls featuring low seal-initiation temperature (SIT) for high-speed automatic horizontal flow-wrap lines.",
    longDesc: "Heat Sealable BOPP Films are manufactured with sealable terpolymer outer layers. Designed for wrapping chocolate bars, biscuits, and soap bars at speeds up to 400 packs/min.",
    image: "/images/products/bopp-films-pouches/image.png",
    gallery: ["/images/products/bopp-films-pouches/image.png"],
    specs: { "Seal Initiation Temp": "105°C Low SIT", "Cof Friction": "Low Static Coefficient of Friction (<0.25)", "Format": "Single Wound Sheeting Rolls" },
    thicknessLengthMatrix: [{ micron: "20", gauge: "80", meters: "2,000", feet: "6,560" }],
    options: { widths: ["200mm", "350mm", "500mm"], thicknesses: ["20 Micron", "25 Micron", "30 Micron"], colors: ["Clear", "White Cavitated"] },
    applications: ["Horizontal flow-wrap (HFFS) packaging", "Biscuit, wafer & confectionery overwrapping", "Soap bar wrapping"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "pvc-shrink-films",
    title: "PVC Shrink Films",
    category: "film-products",
    tag: "PVC Shrink",
    blurb: "High-clarity PVC heat shrink rolls, pre-cut sleeves, and shrink tubing delivering rapid 40%+ transverse shrinkage at low tunnel temperatures.",
    longDesc: `PVC Shrink Films provide quick, high-gloss shrink encapsulation at lower heating temperatures. Ideal for tamper-evident bottle neck caps, battery pack insulation sleeves, and box multi-packs.`,
    image: "/images/products/pvc-shrink-rolls-pouches/image.png",
    gallery: ["/images/products/pvc-shrink-rolls-pouches/image.png"],
    specs: { "Transverse Shrink": "45% to 50% TD Shrink Ratio", "Activation Temp": "100°C to 130°C Low Heat Tunnel", "Clarity": "High Gloss Rigid Clarity" },
    thicknessLengthMatrix: [{ micron: "30", gauge: "120", meters: "1,000", feet: "3,280" }, { micron: "40", gauge: "160", meters: "750", feet: "2,460" }],
    subCategories: [
      { id: "pvc-heat-shrink-rolls", title: "PVC Heat Shrink Rolls", subtitle: "Centerfolded & Single Wound PVC Rolls", blurb: "High-gloss PVC shrink film rolls for L-sealers and thermal shrink tunnels.", image: "/images/products/pvc-shrink-rolls-pouches/image.png" },
      { id: "pvc-shrink-pouches-sleeves", title: "PVC Shrink Sleeves", subtitle: "Tamper Evident Bottle Neck Bands", blurb: "Pre-cut perforated PVC shrink bands for tamper-proof bottle neck sealing.", image: "/images/products/pvc-shrink-rolls-pouches/image.png" },
      { id: "pvc-heat-shrink-tubing", title: "PVC Heat Shrink Tubing", subtitle: "Industrial Continuous Layflat Tubing", blurb: "Continuous layflat PVC shrink tubing for battery pack insulation and cylinder wrapping.", image: "/images/products/pvc-shrink-rolls-pouches/image.png" },
    ],
    options: { widths: ["100mm to 600mm"], thicknesses: ["30 Micron", "40 Micron", "50 Micron"], colors: ["High Gloss Clear", "Custom Printed"] },
    applications: ["Tamper-evident bottle neck sealing", "Pharmaceutical bottle multipacks", "Battery pack insulation sleeves"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "pvc-heat-shrink-rolls",
    title: "PVC Heat Shrink Rolls",
    category: "film-products",
    tag: "PVC Rolls",
    blurb: "Centerfolded and single wound PVC shrink rolls providing crisp stiffness and quick low-temperature thermal tunnel shrinkage.",
    longDesc: "PVC Heat Shrink Rolls shrink tightly around products at lower tunnel temperatures than PE or POF, saving energy on manual L-bar sealing lines.",
    image: "/images/products/pvc-shrink-rolls-pouches/image.png",
    gallery: ["/images/products/pvc-shrink-rolls-pouches/image.png"],
    specs: { "Format": "Centerfolded (CF) / Layflat", "Shrink Temp": "110°C Low Heat Activation", "Stiffness": "High Crisp Film Memory" },
    thicknessLengthMatrix: [{ micron: "35", gauge: "140", meters: "800", feet: "2,624" }],
    options: { widths: ["200mm", "350mm", "500mm"], thicknesses: ["30 Micron", "35 Micron", "40 Micron"], colors: ["Glass Clear"] },
    applications: ["Cosmetics & perfume box shrink wrap", "Software & CD/DVD multipacks", "Hardware tool display wrapping"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "pvc-shrink-pouches-sleeves",
    title: "PVC Shrink Sleeves",
    category: "film-products",
    tag: "PVC Sleeves",
    blurb: "Pre-cut perforated PVC shrink neck bands and body sleeves for tamper-evident bottle cap protection and 360-degree graphics.",
    longDesc: "PVC Shrink Sleeves feature vertical tear perforations for easy customer opening while ensuring 100% tamper-evident security on sauce bottles and pharma jars.",
    image: "/images/products/pvc-shrink-rolls-pouches/image.png",
    gallery: ["/images/products/pvc-shrink-rolls-pouches/image.png"],
    specs: { "Perforation": "Vertical Easy-Tear Scored Line", "Shrink Ratio": "50% TD High Contour Conformity", "Format": "Pre-Cut Cut-Bands / Continuous Roll" },
    thicknessLengthMatrix: [{ micron: "40", gauge: "160", meters: "Custom", feet: "Custom" }],
    options: { widths: ["25mm Cap", "50mm Neck", "80mm Body"], thicknesses: ["40 Micron", "45 Micron", "50 Micron"], colors: ["Clear", "Printed Security Seal"] },
    applications: ["Pharmaceutical bottle cap security seals", "Sauce & beverage bottle tamper bands", "LPG cylinder valve shrink caps"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "pvc-heat-shrink-tubing",
    title: "PVC Heat Shrink Tubing",
    category: "film-products",
    tag: "PVC Tubing",
    blurb: "Continuous layflat PVC heat shrink tubing for battery pack insulation, busbar electrical jacketing, and long object bundling.",
    longDesc: "PVC Heat Shrink Tubing slips over cylindrical battery cells, metal pipes, or tool handles, shrinking tightly upon heating to form a tough protective jacket.",
    image: "/images/products/pvc-shrink-rolls-pouches/image.png",
    gallery: ["/images/products/pvc-shrink-rolls-pouches/image.png"],
    specs: { "Dielectric Strength": "High Electrical Insulation Rating", "Layflat Width": "15mm to 300mm", "Shrink Activation": "100°C Air Gun / Tunnel" },
    thicknessLengthMatrix: [{ micron: "70", gauge: "280", meters: "500", feet: "1,640" }],
    options: { widths: ["20mm", "50mm", "100mm", "200mm"], thicknesses: ["70 Micron", "100 Micron"], colors: ["Blue", "Black", "Clear", "Red"] },
    applications: ["Lithium battery pack shrink jacketing", "Busbar & capacitor insulation", "Curtain rod & pipe protective tubing"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "pe-liners-garbage-bags",
    title: "PE Liners And Garbage Bags",
    category: "film-products",
    tag: "PE Liners",
    blurb: "Heavy-duty polyethylene bin liners, box liners, and industrial drum liners designed with reinforced bottom seals to prevent leaks.",
    longDesc: "PE Liners And Garbage Bags are fabricated with thermal impulse welded bottom seams to handle wet municipal waste, industrial chemical powders, and commercial food waste without splitting.",
    image: "/images/products/ldpe-films-pouches/applications/app-3.png",
    gallery: ["/images/products/ldpe-films-pouches/applications/app-3.png"],
    specs: { "Format": "Flat Sealed Bags / Gusseted Box Liners", "Leak Protection": "High-Integrity Thermal Bottom Weld", "Thickness": "20 to 100 Micron" },
    thicknessLengthMatrix: [{ micron: "30", gauge: "120", meters: "Custom", feet: "Custom" }],
    options: { widths: ["24x30 inch", "30x40 inch", "36x48 inch"], thicknesses: ["30 Micron", "50 Micron", "80 Micron"], colors: ["Black", "Green", "Clear"] },
    applications: ["Industrial drum & carton lining", "Commercial facility waste bin liners", "Healthcare & hospital trash disposal"],
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "plastic-stretch-film",
    title: "Plastic Stretch Film",
    category: "film-products",
    tag: "Plastic Stretch",
    blurb: "Multi-layer co-extruded LLDPE stretch wrap film providing up to 300% elongation and puncture resistance for pallet load unitization.",
    longDesc: "Plastic Stretch Film wraps securely around stacked pallet loads, maintaining high elastic memory to prevent box shifting during long-distance truck transport.",
    image: "/images/products/stretch-film/image.png",
    gallery: ["/images/products/stretch-film/image.png"],
    specs: { "Pre-Stretch": "Up to 300% Elongation", "Cling Type": "Differential One-Side Cling", "Core": "3-Inch Heavy Duty Cardboard Core" },
    thicknessLengthMatrix: [{ micron: "23", gauge: "92", meters: "300", feet: "984" }],
    options: { widths: ["500mm (20 Inch)"], thicknesses: ["15 Micron", "20 Micron", "23 Micron", "29 Micron"], colors: ["Clear", "Black Opaque"] },
    applications: ["Pallet load wrapping & containment", "Warehouse box unitization", "Moisture & dust protective wrap"],
    visualGradients: "from-yellow-400 to-amber-500",
  },
  {
    id: "collation-shrink-film",
    title: "Collation Shrink Film",
    category: "film-products",
    tag: "Collation Shrink",
    blurb: "Engineered multi-pack shrink film designed specifically for secondary bundling of water bottles, cans, and glass jars on high-speed wrappers.",
    longDesc: "Collation Shrink Film provides high holding force to replace corrugated cardboard tray packaging, dramatically reducing secondary packaging cost and weight for beverage bottlers.",
    image: "/images/products/pof-shrink-rolls/image.png",
    gallery: ["/images/products/pof-shrink-rolls/image.png"],
    specs: { "Shrink Ratio": "70% MD / 20% TD Controlled Shrink", "Line Speed": "Up to 120 Packs Per Minute", "Thickness": "50 to 120 Micron" },
    thicknessLengthMatrix: [{ micron: "60", gauge: "240", meters: "500", feet: "1,640" }],
    options: { widths: ["400mm", "550mm", "650mm"], thicknesses: ["50 Micron", "60 Micron", "80 Micron"], colors: ["High Gloss Clear"] },
    applications: ["Mineral water 6-pack & 12-pack bottle bundling", "Canned food collation packaging", "Dairy & juice bottle trayless bundling"],
    visualGradients: "from-sky-400 to-blue-500",
  },
];

export const initialMachines = [];

export const initialArticles = [
  {
    tag: "Engineering",
    date: "Mar 2026",
    title: "Choosing between PP and PET strap: a load-vs-cost framework",
    excerpt: "A simple decision tree — based on 6 years of mill data — that helps procurement pick the right strap for the right load, without overspending.",
    read: "6 min read",
    featured: true,
    slug: "pp-vs-pet-strap-framework",
    body: "Polypropylene (PP) and Polyester (PET) straps serve distinct purposes in industrial packaging. While PP strap is highly elastic and suited for light-to-medium bundles that expand/contract, PET strap offers superior tension retention and impact resistance, replacing steel strapping for heavy palletized loads.",
    image: "/images/desktop/portfolio/quality_featured.png",
  },
  {
    tag: "Sustainability",
    date: "Feb 2026",
    title: "Mono-material films and the road to recyclable e-commerce packaging",
    excerpt: "Why multi-layer laminate plastics are a recycling nightmare and how new oriented films enable single-stream recycling compatibility.",
    read: "8 min read",
    featured: false,
    slug: "mono-material-recyclable-films",
    body: "Multi-layer packaging has traditionally combined different plastic types, making them impossible to recycle together. Our latest mono-material LDPE and POF shrink/stretch films provide the same barrier properties and tensile strength while remaining fully compatible with standard single-stream recycling loops, allowing your buyers to meet strict plastic waste compliance.",
    image: "/images/desktop/portfolio/sustainability_featured.png",
  },
  {
    tag: "Operations",
    date: "Jan 2026",
    title: "How we hit 98.4% on-time dispatch in 2025 — a playbook",
    excerpt: "A look inside Winner Pack's Dasna hub operations, vehicle coordination algorithms, and WhatsApp integrations.",
    read: "5 min read",
    featured: false,
    slug: "on-time-dispatch-playbook-2025",
    body: "At Winner Pack, delivery is a key product feature. By coordinating Dasna plants with localized distribution hubs, pre-staging high-volume SKU inventory, and setting automated carrier assignment workflows linked directly to buyer WhatsApp alerts, we sustained a 98.4% rolling on-time delivery rate. Here is our operational playbook.",
    image: "/images/desktop/portfolio/dispatch_featured.png",
  },
];

const defaultSlides = [
  {
    id: "ad",
    tag: "01 / INFRASTRUCTURE",
    title: "Tailored Specs. Direct Dispatch.",
    heading: "Tailored Specs. Direct Dispatch.",
    subtitle: "Precision-extruded packaging materials designed for maximum load retention and line throughput.",
    description: "Precision-extruded packaging materials designed for maximum load retention and line throughput.",
    image: "/images/desktop/hero-slider/slide-1.png",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-1.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-1.png",
  },
  {
    id: "capacity",
    tag: "02 / CAPACITY",
    title: "12,000+ Tons Annually",
    heading: "12,000+ Tons Annually",
    subtitle: "Dual-plant automated capacity ensures consistent thickness and high-speed delivery for heavy industrial loads.",
    description: "Dual-plant automated capacity ensures consistent thickness and high-speed delivery for heavy industrial loads.",
    image: "/images/desktop/hero-slider/slide-2.png",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-2.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-2.png",
  },
  {
    id: "quality",
    tag: "03 / QUALITY",
    title: "ISO 9001:2015 Standards",
    heading: "ISO 9001:2015 Standards",
    subtitle: "Process-controlled extrusion runs with strict tensile testing and batch traceability on every dispatch.",
    description: "Process-controlled extrusion runs with strict tensile testing and batch traceability on every dispatch.",
    image: "/images/desktop/hero-slider/slide-3.png",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-3.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-3.png",
  },
  {
    id: "automation",
    tag: "04 / PERFORMANCE",
    title: "End-to-End Solutions",
    heading: "End-to-End Solutions",
    subtitle: "Syncing high-tensile strapping, stretch wrap, and tapes to maximize line efficiency and lower total cost-per-pallet.",
    description: "Syncing high-tensile strapping, stretch wrap, and tapes to maximize line efficiency and lower total cost-per-pallet.",
    image: "/images/desktop/hero-slider/slide-4.png",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-4.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-4.png",
  },
  {
    id: "labels-stickers",
    tag: "05 / LABELS & STICKERS",
    title: "Best Quality Labels & Stickers",
    heading: "Best Quality Labels & Stickers",
    subtitle: "High Performance. Superior Strength. Maximum Protection for Product & Self-Adhesive Labels.",
    description: "High Performance. Superior Strength. Maximum Protection for Product & Self-Adhesive Labels.",
    image: "/images/desktop/hero-slider/slide-5.png",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-5.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-5.png",
  },
  {
    id: "tapes",
    tag: "06 / TAPES",
    title: "Best Quality Tapes",
    heading: "Best Quality Tapes",
    subtitle: "High Performance. Superior Strength. Maximum Protection for BOPP & Custom Printed BOPP Tapes.",
    description: "High Performance. Superior Strength. Maximum Protection for BOPP & Custom Printed BOPP Tapes.",
    image: "/images/desktop/hero-slider/slide-6.png",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-6.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-6.png",
  },
  {
    id: "coloured-silicone-tapes",
    tag: "07 / SPECIALTY TAPES",
    title: "Best Quality Coloured & Silicone Tapes",
    heading: "Best Quality Coloured & Silicone Tapes",
    subtitle: "High Performance. Superior Strength. Maximum Protection for Coloured BOPP & Self-Fusing Silicone Tapes.",
    description: "High Performance. Superior Strength. Maximum Protection for Coloured BOPP & Self-Fusing Silicone Tapes.",
    image: "/images/desktop/hero-slider/slide-7.png",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-7.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-7.png",
  },
  {
    id: "pp-printed-strap",
    tag: "08 / PP & PRINTED STRAP",
    title: "Best Quality PP & Printed Strap",
    heading: "Best Quality PP & Printed Strap",
    subtitle: "High Performance. Superior Strength. Maximum Protection for Plain & Custom Printed PP Strapping Rolls.",
    description: "High Performance. Superior Strength. Maximum Protection for Plain & Custom Printed PP Strapping Rolls.",
    image: "/images/desktop/hero-slider/slide-8.png",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-8.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-8.png",
  }
];

const defaultRightBanner = "/images/desktop/hero-slider/right-banner.png";
const defaultMobileRightBanner = "/images/mobile/hero-slider/right-banner.png";

const defaultAbout = {
  tagline: "Pioneering B2B Industrial Packaging & Labeling Solutions",
  para1: "Winner Pack Technologies Pvt. Ltd. supplies environment-friendly secondary and tertiary packaging materials. Guided by our motto \"We Serve To Deserve\", we supply premium quality solutions tailored to your operational needs.",
  para2: "We specialize in BOPP tapes, strapping rolls, shrink films, and protective packaging, serving various key industrial sectors including food, cosmetics, pharmaceuticals, and retail logistics.",
  stats: [
    { value: "8+", label: "Years in business" },
    { value: "4", label: "Product categories" },
    { value: "20+", label: "Product lines" },
    { value: "100%", label: "Customer commitment" }
  ]
};

const defaultUsps = [
  {
    title: "Custom specifications",
    text: "We manufacture to your exact width, gauge, and formulation requirements — ensuring the right fit for your production line.",
    icon: "Tag",
    bgImage: "/images/products/bopp-films-pouches/image.png",
  },
  {
    title: "Consistent roll quality",
    text: "Our strapping rolls are manufactured to maintain uniform straightness and tension, enabling smooth operation on automated packaging lines.",
    icon: "Layers",
    bgImage: "/images/products/pp-strap/applications/app-1.png",
  },
  {
    title: "Superior film performance",
    text: "Our stretch films are formulated for maximum load-holding force and cling retention with optimized material usage per pallet.",
    icon: "Disc3",
    bgImage: "/images/products/stretch-film/applications/app-1.png",
  },
  {
    title: "In-house quality testing",
    text: "Every batch undergoes rigorous elongation, tensile strength, and adhesive performance testing before dispatch.",
    icon: "Shield",
    bgImage: "/images/products/coloured-bopp-tapes/applications/app-4.png",
  },
  {
    title: "Eco-friendly options",
    text: "We offer recyclable and biodegradable packaging alternatives to support your sustainability and compliance goals.",
    icon: "Leaf",
    bgImage: "/images/products/coloured-films-pouches/applications/app-3.png",
  },
  {
    title: "Direct manufacturer supply",
    text: "No distributor markups. We manufacture, warehouse, and dispatch directly to optimize operations and reduce procurement costs.",
    icon: "Globe2",
    bgImage: "/images/products/stretch-film/applications/app-4.png",
  }
];

const defaultClients = [
  { name: "Lava", logo: "/Brand_logo/lava.png" },
  { name: "Vivo", logo: "/Brand_logo/vivo.png" },
  { name: "Noise", logo: "/Brand_logo/noise.png" },
  { name: "Fire-Boltt", logo: "/Brand_logo/firebolt.png" }
];

const defaultSteps = [
  {
    n: "01",
    phase: "Discovery",
    title: "Tell us your line.",
    body: "Share your SKU, payload profile and dispatch rhythm. Our team scopes the right strapping, shrink film or courier packaging for your operation.",
    deliverable: "Requirement scoping"
  },
  {
    n: "02",
    phase: "Sample",
    title: "Material in your hands.",
    body: "We share a sample of the exact gauge, width and grade — PP/PET strap, shrink film or bubble roll — so you can test it before committing.",
    deliverable: "Sample dispatch"
  },
  {
    n: "03",
    phase: "Trial",
    title: "Line qualification.",
    body: "For strapping, shrink wrapping and packaging workflows, our team helps test and tune material performance against your throughput.",
    deliverable: "Material qualification support"
  },
  {
    n: "04",
    phase: "Order",
    title: "Confirmed pricing.",
    body: "We quote based on your volume and material spec, and confirm terms before production and delivery are scheduled.",
    deliverable: "Quote & confirmation"
  },
  {
    n: "05",
    phase: "Dispatch",
    title: "Scheduled delivery.",
    body: "Orders are dispatched from our manufacturing facility and delivered to your site as per the agreed timeframe.",
    deliverable: "Scheduled delivery"
  },
  {
    n: "06",
    phase: "Support",
    title: "Ongoing service.",
    body: "We stay on for direct supply of strap rolls, films, packaging tools, and ongoing technical material optimization.",
    deliverable: "Service & repeat supply"
  }
];

const defaultIndustries = [
  { name: "Electronics", image: "/images/desktop/industries/electronics_industry.png" },
  { name: "Cosmetics", image: "/images/desktop/industries/cosmetics_industry.png" },
  { name: "Food & FMCG", image: "/images/desktop/industries/food_fmcg_industry.png" },
  { name: "Automobile", image: "/images/desktop/industries/automobile_industry.png" },
  { name: "Stationery", image: "/images/desktop/industries/stationery_industry.png" },
  { name: "E-commerce & Logistics", image: "/images/desktop/industries/ecommerce_logistics_industry.png" }
];

export const fallbackData = {
  slides: defaultSlides,
  rightBanner: defaultRightBanner,
  mobileRightBanner: defaultMobileRightBanner,
  about: defaultAbout,
  usps: defaultUsps,
  clients: defaultClients,
  steps: defaultSteps,
  industries: defaultIndustries
};
