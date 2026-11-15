/**
 * MM Kitchen World - Shared Product Store (Vendor Demo Edition)
 * Provides persistent catalog management via LocalStorage with real-time sync across tabs.
 */

const DEFAULT_PRODUCTS = [
  {
    "id": "chimneys-ch-6052-di-bl-ac",
    "title": "CH 6052 DI BL AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 DI BL AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-di-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1200 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Digital Display for real-time control and clear visibility",
      "Heat Auto-Clean Technology",
      "Touch Control with Motion Sensor",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting",
      "Metallic Motor Housing"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Digital Display for real-time control and clear visibility. Heat Auto-Clean Technology. Touch Control with Motion Sensor.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 18
  },
  {
    "id": "chimneys-ch-6052-hsr-bl-ac",
    "title": "CH 6052 HSR BL AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 HSR BL AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-hsr-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Sleek 50 mm T-Shape chimney",
      "Heat Sensor Switches",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Touch Control with Motion Sensor",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Remote Control for Added Convenience",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Sleek 50 mm T-Shape chimney. Heat Sensor Switches. Intelli-Clean Technology for Automatic Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 18
  },
  {
    "id": "chimneys-ch-6052-slim-bl-ac",
    "title": "CH 6052 SLIM BL AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 SLIM BL AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-slim-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1200 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Heat Auto-Clean Technology with Auto Off Function",
      "Touch Control with Motion Sensor",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting",
      "Metallic Motor Housing"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Heat Auto-Clean Technology with Auto Off Function. Touch Control with Motion Sensor. Advanced Filterless Design – No Filter Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 18
  },
  {
    "id": "chimneys-ch-6052-uc-ac",
    "title": "CH 6052 UC AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 UC AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-uc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Under-Cabinet Auto-Clean Chimney – A perfect choice for",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Touch Control with Motion Sensor",
      "Remote Control for Added Convenience",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting",
      "Metallic Motor Housing"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Under-Cabinet Auto-Clean Chimney – A perfect choice for. Heat Auto-Clean Technology with Auto Off Function. Touch Control with Motion Sensor.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 18
  },
  {
    "id": "chimneys-ch-6055-ihsr-bl-ac",
    "title": "CH 6055 IHSR BL AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6055 IHSR BL AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6055-ihsr-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Heat Sensor Switches",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Touch Control with Motion Sensor",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Remote Control for Added Convenience",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Heat Sensor Switches. Intelli-Clean Technology for Automatic Cleaning. Touch Control with Motion Sensor.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 19
  },
  {
    "id": "chimneys-ch-6058-bl-ac",
    "title": "CH 6058 BL AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6058 BL AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6058-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1200 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Heat Auto-Clean Technology with Auto Off Function",
      "Touch Control with Motion Sensor",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting",
      "Metallic Motor Housing"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Heat Auto-Clean Technology with Auto Off Function. Touch Control with Motion Sensor. Advanced Filterless Design – No Filter Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 19
  },
  {
    "id": "chimneys-ch-6058-di-bl-ac",
    "title": "CH 6058 DI BL AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6058 DI BL AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6058-di-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1200 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Digital Display for real-time control and clear visibility",
      "Heat Auto-Clean Technology",
      "Touch Control with Motion Sensor",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting",
      "Metallic Motor Housing"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Digital Display for real-time control and clear visibility. Heat Auto-Clean Technology. Touch Control with Motion Sensor.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 19
  },
  {
    "id": "chimneys-ch-6059-di-bl-ac",
    "title": "CH 6059 DI BL AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6059 DI BL AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6059-di-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1500 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 2 Years on Controls"
      }
    ],
    "features": [
      "Digital Display for real-time control and clear visibility",
      "Heat Auto-Clean Technology",
      "Touch Control with Motion Sensor",
      "Remote Control for Added Convenience",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting",
      "Metallic Motor Housing"
    ],
    "warranty": "15 Years on Motor & 2 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Digital Display for real-time control and clear visibility. Heat Auto-Clean Technology. Touch Control with Motion Sensor.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 19
  },
  {
    "id": "chimneys-ch-6064-bl-ms-ac",
    "title": "CH 6064 BL MS AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6064 BL MS AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6064-bl-ms-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1200 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Heat Auto-Clean Technology with Auto Off Function",
      "Touch Control with Motion Sensor",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting",
      "Metallic Motor Housing"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Heat Auto-Clean Technology with Auto Off Function. Touch Control with Motion Sensor. Advanced Filterless Design – No Filter Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 19
  },
  {
    "id": "chimneys-ch-6064-hsr-bl-ac",
    "title": "CH 6064 HSR BL AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6064 HSR BL AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6064-hsr-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor & 2 Years on Controls"
      }
    ],
    "features": [
      "Heat Sensor Switches",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Touch Control with Motion Sensor",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Remote Control for Added Convenience",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "7 Years on Motor & 2 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Heat Sensor Switches. Intelli-Clean Technology for Automatic Cleaning. Touch Control with Motion Sensor.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 20
  },
  {
    "id": "chimneys-ch-6068-bl-smart-ac",
    "title": "CH 6068 BL SMART AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6068 BL SMART AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6068-bl-smart-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Smart Auto Clean Chimney – Control Anytime, Anywhere",
      "Wi-Fi Control, Remote operation via Glen Smart Mobile App",
      "Digital Display for real-time control and clear visibility",
      "Gas leakage detection & motor malfunction indication",
      "Touch Control with Motion Sensor",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Smart Auto Clean Chimney – Control Anytime, Anywhere. Wi-Fi Control, Remote operation via Glen Smart Mobile App. Digital Display for real-time control and clear visibility.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 18
  },
  {
    "id": "chimneys-ch-6072-sx-bl-ms-ac",
    "title": "CH 6072 SX BL MS AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6072 SX BL MS AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6072-sx-bl-ms-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Heat Auto-Clean Technology with Auto Off Function",
      "Touch Control with Motion Sensor",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting",
      "Metallic Motor Housing"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Heat Auto-Clean Technology with Auto Off Function. Touch Control with Motion Sensor. Advanced Filterless Design – No Filter Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 20
  },
  {
    "id": "chimneys-ch-6073-sx-bl-ms-ac",
    "title": "CH 6073 SX BL MS AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6073 SX BL MS AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6073-sx-bl-ms-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Heat Auto-Clean Technology with Auto Off Function",
      "Touch Control with Motion Sensor",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Energy-Efficient LED Lighting",
      "Thermal Overload Protection (TOP)"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Heat Auto-Clean Technology with Auto Off Function. Touch Control with Motion Sensor. Advanced Filterless Design – No Filter Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 20
  },
  {
    "id": "chimneys-ch-6075-bl-ms-ac",
    "title": "CH 6075 BL MS AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6075 BL MS AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6075-bl-ms-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Periphery Suction – Enhanced suction through edge vents",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Smart Digital Display for real-time control and clear visibility",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Touch Control with Motion Sensor",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray",
      "Metallic Motor Housing"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Periphery Suction – Enhanced suction through edge vents. Intelli-Clean Technology for Automatic Cleaning. Smart Digital Display for real-time control and clear visibility.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 20
  },
  {
    "id": "chimneys-ch-6080-hsr-bl-ac",
    "title": "CH 6080 HSR BL AC",
    "category": "Chimneys",
    "subcategory": "Auto Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6080 HSR BL AC",
    "tag": "Auto Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6080-hsr-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1500 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Smart Digital Display for real-time control and clear visibility",
      "Heat Sensor Switches",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Touch Control with Motion Sensor",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Remote Control for Added Convenience",
      "Advanced Filterless Design – No Filter Cleaning",
      "Easy-to-Clean Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Smart Digital Display for real-time control and clear visibility. Heat Sensor Switches. Intelli-Clean Technology for Automatic Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 20
  },
  {
    "id": "chimneys-ch-6052-lcd-hsr-bldc-ac",
    "title": "CH 6052 LCD HSR BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 LCD HSR BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-lcd-hsr-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Vibrant LCD DISPLAY Panel, Heat Sensor Switch",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Touch Control with Motion Sensor",
      "Stir-Fry Mode for Maximum Suction",
      "Aeration Function to Keep the Kitchen Fresh",
      "Inverter Technology for Optimized Power Consumption",
      "9-Speed Brushless DC (BLDC) Motor, 2500 RPM – Auto Adjustable",
      "Remote Control for Added Convenience",
      "Metallic Motor Housing, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Vibrant LCD DISPLAY Panel, Heat Sensor Switch. Intelli-Clean Technology for Automatic Cleaning. Touch Control with Motion Sensor.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 14
  },
  {
    "id": "chimneys-ch-6052-slim-bl-bldc-ac",
    "title": "CH 6052 SLIM BL BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 SLIM BL BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-slim-bl-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 2 Years on Controls"
      }
    ],
    "features": [
      "Smart Digital Display for real-time control and clear visibility",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Aeration Function to Keep the Kitchen Fresh",
      "Stir-Fry Mode for Maximum Suction",
      "Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Inverter Technology for Optimized Power Consumption",
      "Metallic Motor Housing, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 2 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Smart Digital Display for real-time control and clear visibility. Intelli-Clean Technology for Automatic Cleaning. Aeration Function to Keep the Kitchen Fresh.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 14
  },
  {
    "id": "chimneys-ch-6053-hsr-bl-bldc-ac",
    "title": "CH 6053 HSR BL BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6053 HSR BL BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6053-hsr-bl-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Smart Digital Display for real-time control and clear visibility",
      "Heat Sensor Switch, Remote Control for Added Convenience",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Aeration Function to Keep the Kitchen Fresh",
      "Stir-Fry Mode for Maximum Suction",
      "Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Inverter Technology for Optimized Power Consumption",
      "Metallic Motor Housing, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Smart Digital Display for real-time control and clear visibility. Heat Sensor Switch, Remote Control for Added Convenience. Intelli-Clean Technology for Automatic Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 14
  },
  {
    "id": "chimneys-ch-6061-lcd-hsr-bldc-ac",
    "title": "CH 6061 LCD HSR BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6061 LCD HSR BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6061-lcd-hsr-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Vibrant LCD DISPLAY Panel, Heat Sensor Switch",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Remote Control for Added Convenience",
      "Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor, 2500 RPM – Auto Adjustable",
      "Stir-Fry Mode for Maximum Suction",
      "Aeration Function to Keep the Kitchen Fresh",
      "Inverter Technology for Optimized Power Consumption",
      "Metallic Motor Housing, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Vibrant LCD DISPLAY Panel, Heat Sensor Switch. Intelli-Clean Technology for Automatic Cleaning. Remote Control for Added Convenience.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 14
  },
  {
    "id": "chimneys-ch-6065-hsr-bl-bldc-ac",
    "title": "CH 6065 HSR BL BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6065 HSR BL BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6065-hsr-bl-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Smart Digital Display for real-time control and clear visibility",
      "Heat Sensor Switch, Intelli-Clean Technology for Automatic Cleaning",
      "Aeration Function to Keep the Kitchen Fresh",
      "Stir-Fry Mode for Maximum Suction",
      "Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor, Metallic Motor Housing",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Inverter Technology for Optimized Power Consumption",
      "Remote Control, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Smart Digital Display for real-time control and clear visibility. Heat Sensor Switch, Intelli-Clean Technology for Automatic Cleaning. Aeration Function to Keep the Kitchen Fresh.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 14
  },
  {
    "id": "chimneys-ch-6067-bl-bldc-ac",
    "title": "CH 6067 BL BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6067 BL BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6067-bl-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 1 Years on Controls"
      }
    ],
    "features": [
      "Large Display Panel with Digital Clock",
      "Aeration Function to Keep the Kitchen Fresh",
      "Stir-Fry Mode for Maximum Suction",
      "Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Thermal Overload Protection (TOP)",
      "Inverter Technology for Optimized Power Consumption",
      "Metallic Motor Housing, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 1 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Large Display Panel with Digital Clock. Aeration Function to Keep the Kitchen Fresh. Stir-Fry Mode for Maximum Suction.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 15
  },
  {
    "id": "chimneys-ch-6069-hsr-bl-bldc-ac",
    "title": "CH 6069 HSR BL BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6069 HSR BL BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6069-hsr-bl-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 76 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Smart Digital Display for real-time control and clear visibility",
      "Heat Sensor Switch, Intelli-Clean Technology for Automatic Cleaning",
      "Aeration Function to Keep the Kitchen Fresh",
      "Stir-Fry Mode for Maximum Suction",
      "Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor, Metallic Motor Housing",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Inverter Technology for Optimized Power Consumption",
      "Remote Control, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Smart Digital Display for real-time control and clear visibility. Heat Sensor Switch, Intelli-Clean Technology for Automatic Cleaning. Aeration Function to Keep the Kitchen Fresh.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 15
  },
  {
    "id": "chimneys-ch-6071r-bldc-bl-ac",
    "title": "CH 6071R BLDC BL AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6071R BLDC BL AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6071r-bldc-bl-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1400 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 2 Years on Controls"
      }
    ],
    "features": [
      "Smart Digital Display for real-time control and clear visibility",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Aeration Function to Keep the Kitchen Fresh",
      "Stir-Fry Mode for Maximum Suction",
      "Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor",
      "Heat Auto-Clean Technology with Auto Off Function",
      "Remote Control, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 2 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Smart Digital Display for real-time control and clear visibility. Intelli-Clean Technology for Automatic Cleaning. Aeration Function to Keep the Kitchen Fresh.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 15
  },
  {
    "id": "chimneys-ch-6073-hsr-bl-bldc-ac",
    "title": "CH 6073 HSR BL BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6073 HSR BL BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6073-hsr-bl-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Digital Display for real-time control and clear visibility",
      "Heat Sensor Switch, Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor, 2500 RPM – Auto Adjustable",
      "Stir-Fry Mode for Maximum Suction, Metallic Motor Housing",
      "Aeration Function to Keep the Kitchen Fresh",
      "Off Timer for Automatic Shut-Off After Cooking",
      "Inverter Technology for Optimized Power Consumption",
      "Remote Control, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Digital Display for real-time control and clear visibility. Heat Sensor Switch, Touch Control with Motion Sensor. 9-Speed Brushless DC (BLDC) Motor, 2500 RPM – Auto Adjustable.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 15
  },
  {
    "id": "chimneys-ch-6073-hsr-mg-bldc-ac",
    "title": "CH 6073 HSR MG BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6073 HSR MG BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6073-hsr-mg-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Elegant Matt Glass Finish to enhance kitchen aesthetics",
      "Digital Display for real-time control and clear visibility",
      "Heat Sensor Switch, Touch Control with Motion Sensor",
      "Intelli-Clean Technology for Automatic Cleaning",
      "9-Speed Brushless DC (BLDC) Motor, 2500 RPM – Auto Adjustable",
      "Stir-Fry Mode for Maximum Suction, Metallic Motor Housing",
      "Aeration Function to Keep the Kitchen Fresh",
      "Off Timer for Automatic Shut-Off After Cooking",
      "Inverter Technology for Optimized Power Consumption",
      "Remote Control, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Elegant Matt Glass Finish to enhance kitchen aesthetics. Digital Display for real-time control and clear visibility. Heat Sensor Switch, Touch Control with Motion Sensor.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 15
  },
  {
    "id": "chimneys-ch-6074-bl-bldc-ac",
    "title": "CH 6074 BL BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6074 BL BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6074-bl-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 1 Year on Controls"
      }
    ],
    "features": [
      "Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor, 2500 RPM – Auto Adjustable",
      "Stir-Fry Mode for Maximum Suction",
      "Aeration Function to Keep the Kitchen Fresh",
      "Hydraulic Shaft for smooth opening and closing of the glass panel",
      "Off Timer for Automatic Shut-Off After Cooking",
      "Inverter Technology for Optimized Power Consumption",
      "Metallic Motor Housing, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 1 Year on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Touch Control with Motion Sensor. 9-Speed Brushless DC (BLDC) Motor, 2500 RPM – Auto Adjustable. Stir-Fry Mode for Maximum Suction.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 16
  },
  {
    "id": "chimneys-ch-6074-mg-bldc-ac",
    "title": "CH 6074 MG BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6074 MG BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6074-mg-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 1 Year on Controls"
      }
    ],
    "features": [
      "Elegant Matt Glass Finish to enhance kitchen aesthetics",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Touch Control with Motion Sensor, Automatic Shut-Off timer",
      "9-Speed Brushless DC (BLDC) Motor, 2500 RPM – Auto Adjustable",
      "Stir-Fry Mode for Maximum Suction",
      "Aeration Function to Keep the Kitchen Fresh",
      "Hydraulic Shaft for smooth opening and closing of the glass panel",
      "Inverter Technology for Optimized Power Consumption",
      "Metallic Motor Housing, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 1 Year on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Elegant Matt Glass Finish to enhance kitchen aesthetics. Intelli-Clean Technology for Automatic Cleaning. Touch Control with Motion Sensor, Automatic Shut-Off timer.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 16
  },
  {
    "id": "chimneys-ch-6076-hsr-bl-bldc-ac",
    "title": "CH 6076 HSR BL BLDC AC",
    "category": "Chimneys",
    "subcategory": "BLDC Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6076 HSR BL BLDC AC",
    "tag": "BLDC Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6076-hsr-bl-bldc-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 75 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Double Draft Suction for super-fast extraction",
      "Heat Sensor Switch, Touch Control with Motion Sensor",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Aeration Function to Keep the Kitchen Fresh",
      "Off Timer for Automatic Shut-Off After Cooking",
      "Inverter Technology for Optimized Power Consumption",
      "9-Speed Brushless DC (BLDC) Motor, 2500 RPM – Auto Adjustable",
      "Stir-Fry Mode for Maximum Suction • Metallic Motor Housing",
      "530 PA Static Pressure for Efficient Exhaust",
      "Remote Control, Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Double Draft Suction for super-fast extraction. Heat Sensor Switch, Touch Control with Motion Sensor. Intelli-Clean Technology for Automatic Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 16
  },
  {
    "id": "chimneys-ch-1010-in-bl",
    "title": "CH 1010 IN BL",
    "category": "Chimneys",
    "subcategory": "Ceiling Hood",
    "brand": "GLEN APPLIANCES",
    "model": "CH 1010 IN BL",
    "tag": "Ceiling Hood",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-1010-in-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "95 / 120 cm"
      },
      {
        "label": "Airflow",
        "value": "1250 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Lifetime on Motor & 2 Years on Controls"
      }
    ],
    "features": [
      "Ceiling-Mounted Kitchen Chimney",
      "Perimeter Extraction for Higher Efficiency & Lower Noise",
      "Wide, Sleek Design Suitable for 2–5 Burner Cooktops",
      "Remote Control for Added Convenience",
      "In-Built Auto Shut-Off Timer",
      "Powerful Motor with Thermal Overload Protection (TOP)",
      "Easy to clean SS Baffle Filters",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Lifetime on Motor & 2 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Ceiling-Mounted Kitchen Chimney. Perimeter Extraction for Higher Efficiency & Lower Noise. Wide, Sleek Design Suitable for 2–5 Burner Cooktops.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 12
  },
  {
    "id": "chimneys-ch-6003-df-ts-bf-bl",
    "title": "CH 6003 DF TS BF BL",
    "category": "Chimneys",
    "subcategory": "Duct Free Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6003 DF TS BF BL",
    "tag": "Duct Free Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6003-df-ts-bf-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1000 m3/h"
      }
    ],
    "features": [
      "Duct-Free Operation (No Duct Required)",
      "Touch Sensor Control",
      "2-Stage Filtration System - SS Baffle Filter for",
      "Compact, Built-In Look",
      "DIY-Friendly Installation",
      "Flexible & Portable, Clean Air Circulation",
      "1 set of carbon filters included with chimney",
      "Glass visor in the front",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Duct-Free Operation (No Duct Required). Touch Sensor Control. 2-Stage Filtration System - SS Baffle Filter for.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 23
  },
  {
    "id": "chimneys-ch-6003-ss-60-bf-ltw",
    "title": "CH 6003 SS 60 BF LTW",
    "category": "Chimneys",
    "subcategory": "Duct Free Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6003 SS 60 BF LTW",
    "tag": "Duct Free Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6003-ss-60-bf-ltw.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1000 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Front glass visor with recirculation mode",
      "Bi-rotational technology",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "1 set of carbon filters included",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Front glass visor with recirculation mode. Bi-rotational technology. Easy-to-clean SS Baffle Filter.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 24
  },
  {
    "id": "chimneys-ch-6052-df-ms-bf-bl",
    "title": "CH 6052 DF MS BF BL",
    "category": "Chimneys",
    "subcategory": "Duct Free Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 DF MS BF BL",
    "tag": "Duct Free Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-df-ms-bf-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1100 m3/h"
      },
      {
        "label": "Warranty",
        "value": "7 Years on Motor"
      }
    ],
    "features": [
      "Duct-Free Operation (No Duct Required)",
      "Touch Control with Motion Sensor",
      "2 Stage Filtration System - SS Baffle Filter for grease removal +",
      "1 set of carbon filters included with chimney",
      "Compact, Built-In Look",
      "DIY-Friendly Installation",
      "Flexible & Portable, Clean Air Circulation",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "7 Years on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Duct-Free Operation (No Duct Required). Touch Control with Motion Sensor. 2 Stage Filtration System - SS Baffle Filter for grease removal +.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 23
  },
  {
    "id": "chimneys-ch-6079-in",
    "title": "CH 6079 IN",
    "category": "Chimneys",
    "subcategory": "Duct Free Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6079 IN",
    "tag": "Duct Free Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6079-in.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1100 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "A black glass wall mounted chimney",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting",
      "Carbon Filter (Optional)"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "A black glass wall mounted chimney. Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 23
  },
  {
    "id": "chimneys-ch-6079-ms",
    "title": "CH 6079 MS",
    "category": "Chimneys",
    "subcategory": "Duct Free Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6079 MS",
    "tag": "Duct Free Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6079-ms.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1250 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "A black glass wall mounted chimney",
      "Touch Control with Motion Sensor",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Energy-Efficient LED Lighting",
      "Carbon Filter (Optional)"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "A black glass wall mounted chimney. Touch Control with Motion Sensor. Easy-to-clean SS Baffle Filter.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 24
  },
  {
    "id": "chimneys-ch-6000-ju-bl",
    "title": "CH 6000 JU BL",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6000 JU BL",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6000-ju-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1000 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing. Push-button controls.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 21
  },
  {
    "id": "chimneys-ch-6014-pb-bl",
    "title": "CH 6014 PB BL",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6014 PB BL",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6014-pb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1000 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Bi-rotational technology",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Bi-rotational technology. Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 21
  },
  {
    "id": "chimneys-ch-6049-in",
    "title": "CH 6049 IN",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6049 IN",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6049-in.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1100 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Classic pyramid shape hood",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Classic pyramid shape hood. Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 21
  },
  {
    "id": "chimneys-ch-6050-in",
    "title": "CH 6050 IN",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6050 IN",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6050-in.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1100 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Classic pyramid shape hood",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Classic pyramid shape hood. Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 21
  },
  {
    "id": "chimneys-ch-6052-in",
    "title": "CH 6052 IN",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 IN",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-in.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1100 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing. Push-button controls.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 22
  },
  {
    "id": "chimneys-ch-6052-in-dx-bl",
    "title": "CH 6052 IN DX BL",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 IN DX BL",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-in-dx-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing. Push-button controls.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 22
  },
  {
    "id": "chimneys-ch-6052-in-ms-dx-bl",
    "title": "CH 6052 IN MS DX BL",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 IN MS DX BL",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-in-ms-dx-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Touch Control with Motion Sensor",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Touch Control with Motion Sensor. Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 22
  },
  {
    "id": "chimneys-ch-6054-bl",
    "title": "CH 6054 BL",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6054 BL",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6054-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 / 90 cm"
      },
      {
        "label": "Airflow",
        "value": "1250 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Classic pyramid shape hood",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Classic pyramid shape hood. Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 22
  },
  {
    "id": "chimneys-ch-6071-ex-bl",
    "title": "CH 6071 EX BL",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6071 EX BL",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6071-ex-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1000 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Curved Glass Chimney",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Curved Glass Chimney. Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 22
  },
  {
    "id": "chimneys-ch-6071-in",
    "title": "CH 6071 IN",
    "category": "Chimneys",
    "subcategory": "Easy Clean Chimneys",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6071 IN",
    "tag": "Easy Clean Chimneys",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6071-in.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1100 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Life time on Motor"
      }
    ],
    "features": [
      "Curved Glass Chimney",
      "Easy-to-clean SS Baffle Filter",
      "Flame Retardant Plastic (FRP) housing",
      "Push-button controls",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Life time on Motor",
    "dimensions": null,
    "status": "Published",
    "description": "Curved Glass Chimney. Easy-to-clean SS Baffle Filter. Flame Retardant Plastic (FRP) housing.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 23
  },
  {
    "id": "chimneys-ch-1000-bldc-ac-bl-is",
    "title": "CH 1000 BLDC AC BL IS",
    "category": "Chimneys",
    "subcategory": "Island Hood",
    "brand": "GLEN APPLIANCES",
    "model": "CH 1000 BLDC AC BL IS",
    "tag": "Island Hood",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-1000-bldc-ac-bl-is.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "90 cm"
      },
      {
        "label": "Airflow",
        "value": "1600 m3/h"
      },
      {
        "label": "Warranty",
        "value": "15 Years on Motor & 5 Years on Controls"
      }
    ],
    "features": [
      "Auto-Clean Island Chimney",
      "Two Way Control",
      "Intelli-Clean Technology for Automatic Cleaning",
      "Stir-Fry & Aeration Mode, Touch Control with Motion Sensor",
      "9-Speed Brushless DC (BLDC) Motor",
      "Advanced Filterless Design – No Filter Cleaning",
      "Remote Control for Added Convenience",
      "Thermal Overload Protection (TOP)",
      "Easy-to-Clean Removable Oil Collector Tray"
    ],
    "warranty": "15 Years on Motor & 5 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Auto-Clean Island Chimney. Two Way Control. Intelli-Clean Technology for Automatic Cleaning.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 11
  },
  {
    "id": "chimneys-ch-1022-bl-ms-is",
    "title": "CH 1022 BL MS IS",
    "category": "Chimneys",
    "subcategory": "Island Hood",
    "brand": "GLEN APPLIANCES",
    "model": "CH 1022 BL MS IS",
    "tag": "Island Hood",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-1022-bl-ms-is.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "60 cm"
      },
      {
        "label": "Airflow",
        "value": "1250 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Lifetime on Motor & 2 Years on Controls"
      }
    ],
    "features": [
      "Two Way Control",
      "Touch Control with Motion Sensor",
      "Remote Control for Added Convenience",
      "Powerful Motor with Thermal Overload Protection (TOP)",
      "Easy to clean SS Baffle Filters",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Lifetime on Motor & 2 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Two Way Control. Touch Control with Motion Sensor. Remote Control for Added Convenience.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 11
  },
  {
    "id": "chimneys-ch-6052-bl-ms-is",
    "title": "CH 6052 BL MS IS",
    "category": "Chimneys",
    "subcategory": "Island Hood",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6052 BL MS IS",
    "tag": "Island Hood",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6052-bl-ms-is.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "90 / 120 cm"
      },
      {
        "label": "Airflow",
        "value": "1250 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Lifetime on Motor & 2 Years on Controls"
      }
    ],
    "features": [
      "Two Way Control",
      "Touch Control with Motion Sensor",
      "Remote Control for Added Convenience",
      "Powerful Motor with Thermal Overload Protection (TOP)",
      "Easy to clean SS Baffle Filters (1200 mm with 4 Filters)",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Lifetime on Motor & 2 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Two Way Control. Touch Control with Motion Sensor. Remote Control for Added Convenience.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 11
  },
  {
    "id": "chimneys-ch-6071-bl-ms-is",
    "title": "CH 6071 BL MS IS",
    "category": "Chimneys",
    "subcategory": "Island Hood",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6071 BL MS IS",
    "tag": "Island Hood",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6071-bl-ms-is.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Size",
        "value": "90 cm"
      },
      {
        "label": "Airflow",
        "value": "1250 m3/h"
      },
      {
        "label": "Warranty",
        "value": "Lifetime on Motor & 2 Years on Controls"
      }
    ],
    "features": [
      "Two Way Control",
      "Touch Control with Motion Sensor",
      "Remote Control for Added Convenience",
      "Powerful Motor with Thermal Overload Protection (TOP)",
      "Easy to clean SS Baffle Filters",
      "Energy-Efficient LED Lighting"
    ],
    "warranty": "Lifetime on Motor & 2 Years on Controls",
    "dimensions": null,
    "status": "Published",
    "description": "Two Way Control. Touch Control with Motion Sensor. Remote Control for Added Convenience.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 11
  },
  {
    "id": "chimneys-ch-6090-por-bl",
    "title": "CH 6090 POR BL",
    "category": "Chimneys",
    "subcategory": "Portable Chimney",
    "brand": "GLEN APPLIANCES",
    "model": "CH 6090 POR BL",
    "tag": "Portable Chimney",
    "tagColor": "bg-primary text-on-primary",
    "image": "assets/products/chimneys/chimneys-ch-6090-por-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Sleek & Modern Portable Design"
      }
    ],
    "features": [
      "Sleek & Modern Portable Design",
      "Compact Tabletop Placement",
      "Suitable for BBQ & Induction Cooking",
      "Easy Cleaning & Maintenance",
      "Removable Oil Collector Cup",
      "Stable Non-Slip Silicone Base",
      "Plug & Play – No Installation Required",
      "3-Layer Smoke, Fume & Odor Filtration System"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Sleek & Modern Portable Design. Compact Tabletop Placement. Suitable for BBQ & Induction Cooking.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 25
  },
  {
    "id": "ovens-bo-651-mr-turbo-black",
    "title": "BO 651 MR+TURBO BLACK",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 651 MR+TURBO BLACK",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-651-mr-turbo-black.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "70 litres"
      }
    ],
    "features": [
      "9 Cooking Functions • Triple-Layer Glass Door",
      "True Convection with Turbo Fan • Motorized Rotisserie",
      "Mechanical Timer (120 min) • Temperature Control: 50–250°C",
      "Tilt-Free Sliding Racks • Interior Oven Light",
      "Rated Power: 2800 W • Rear Heating Tube: 1800 W",
      "Upper Outer Ring Heating Element: 1000 W",
      "Upper Inner Heating Element: 1200 W",
      "Lower Heating Tube: 1000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "9 Cooking Functions • Triple-Layer Glass Door. True Convection with Turbo Fan • Motorized Rotisserie. Mechanical Timer (120 min) • Temperature Control: 50–250°C.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 29
  },
  {
    "id": "ovens-bo-652-touch-mr-turbo-black",
    "title": "BO 652 TOUCH MR+TURBO BLACK",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 652 TOUCH MR+TURBO BLACK",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-652-touch-mr-turbo-black.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "70 litres"
      }
    ],
    "features": [
      "12 Cooking Functions • Air fryer technology",
      "Triple-Layer Glass Door • Automatic Program Mode",
      "Full Touch Control with LCD Display • Motorized Rotisserie",
      "True Convection Oven with Turbo Fan • Tilt-Free Sliding Racks",
      "Temperature Control: 40-250°C • Interior Oven Light",
      "Child Safety Lock",
      "Rated Power: 2800 W • Rear Heating Tube: 1800 W",
      "Upper Outer Ring Heating Pipe: 1000 W",
      "Upper Inner Heating Pipe: 1200 W",
      "Lower Heating Tube: 1000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "12 Cooking Functions • Air fryer technology. Triple-Layer Glass Door • Automatic Program Mode. Full Touch Control with LCD Display • Motorized Rotisserie.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 29
  },
  {
    "id": "ovens-bo-653-touch-mr-turbo-black",
    "title": "BO 653 TOUCH MR+TURBO BLACK",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 653 TOUCH MR+TURBO BLACK",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-653-touch-mr-turbo-black.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "70 litres"
      }
    ],
    "features": [
      "12 Cooking Functions • Air fryer technology",
      "Triple-Layer Glass Door • True Convection Oven with Turbo Fan",
      "Automatic Program Mode • LCD display with push-out knobs",
      "Motorized Rotisserie • Tilt-Free Sliding Racks",
      "Temperature Control: 40-250°C",
      "Child Safety Lock • Interior Oven Light",
      "Rated Power: 2800 W • Rear Heating Tube: 1800 W",
      "Upper Outer Ring Heating Pipe: 1000 W",
      "Upper Inner Heating Pipe: 1200 W",
      "Lower Heating Tube: 1000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "12 Cooking Functions • Air fryer technology. Triple-Layer Glass Door • True Convection Oven with Turbo Fan. Automatic Program Mode • LCD display with push-out knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 29
  },
  {
    "id": "ovens-bo-654-touch-af-turbo",
    "title": "BO 654 TOUCH AF+TURBO",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 654 TOUCH AF+TURBO",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-654-touch-af-turbo.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "45 litres"
      }
    ],
    "features": [
      "10 Cooking Functions • Triple-Layer Glass Door",
      "Air fryer technology • Full touch control with LCD display",
      "Automatic cooking programs • True Convection Oven with Turbo Fan",
      "Temperature Control: 50-250°C • Timer control - up to 120 min.",
      "Tilt-free sliding racks, Removable rack supports, 5 shelf positions",
      "Child safety lock, Interior Oven Light",
      "Accessories: Grate, Enamelled baking tray, slide-in racks,",
      "Rated Power: 2600 W",
      "Heating Element: 1000 W (Lower) , 1600 W (Rear)",
      "Upper Outer Ring Heating Element: 1000 W",
      "Upper Inner Ring Heating Element: 1200 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "10 Cooking Functions • Triple-Layer Glass Door. Air fryer technology • Full touch control with LCD display. Automatic cooking programs • True Convection Oven with Turbo Fan.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 29
  },
  {
    "id": "ovens-bo-655-touch-af-turbo-90",
    "title": "BO 655 TOUCH AF+TURBO 90",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 655 TOUCH AF+TURBO 90",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-655-touch-af-turbo-90.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "90 Litre Large Capacity: spacious oven cavity provides ample room to cook large meals, multiple dishes, or family-sized portions with ease."
      }
    ],
    "features": [
      "90 Litre Large Capacity: spacious oven cavity provides ample room to cook large meals, multiple dishes, or family-sized portions with ease.",
      "Dual Fan Air Circulation: twin fans circulate hot air evenly throughout the oven for faster, uniform cooking and consistent results on every rack.",
      "Air Fryer Basket Included: specially designed basket delivers crisp, evenly cooked results with enhanced airflow.",
      "90 Ltr. Air Fryer Oven"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "90 Litre Large Capacity: spacious oven cavity provides ample room to cook large meals, multiple dishes, or family-sized portions with ease. Dual Fan Air Circulation: twin fans circulate hot air evenly throughout the oven for faster, uniform cooking and consistent results on every rack. Air Fryer Basket Included: specially designed basket delivers crisp, evenly cooked results with enhanced airflow.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 28
  },
  {
    "id": "ovens-bo-656",
    "title": "BO 656",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 656",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-656.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "70 litres"
      }
    ],
    "features": [
      "3 Cooking Functions • Double-Layer Glass Door",
      "Conventional Heating with Efficient Cooling Fan System",
      "Mechanical Timer (120 min) with Auto Shut-off",
      "Temperature Control: 50-250°C • Multi-level Shelf Adjustment",
      "Removable door plate • Wire Shelf & Baking Tray",
      "Interior Oven Light",
      "Total Power Consumption: 2088 W",
      "Powerful 2100 W Heating Performance",
      "Heating Element: Top – 950 W / Bottom – 1100 W",
      "Total Power load: 2.1 kW"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "3 Cooking Functions • Double-Layer Glass Door. Conventional Heating with Efficient Cooling Fan System. Mechanical Timer (120 min) with Auto Shut-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 29
  },
  {
    "id": "ovens-bo-656-turbo",
    "title": "BO 656 TURBO",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 656 TURBO",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-656-turbo.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "65 litres"
      }
    ],
    "features": [
      "5 Cooking Functions • Convection Oven with Turbo Fan",
      "Double-Layer Glass Door • Advanced Cooling Ventilation System",
      "Mechanical Timer (120 min) with Auto Shut-off",
      "Motorized Rotisserie • Temperature Control: 50-250°C",
      "Top & Bottom Heating System • Removable door plate",
      "Grill Rack & Grill Tray • Interior Oven Light",
      "Total Power Consumption: 2107 W",
      "Powerful 2100 W Heating Performance",
      "Heating Element: Top – 950 W / Bottom – 1100 W",
      "Total Power load: 2.1 kW"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "5 Cooking Functions • Convection Oven with Turbo Fan. Double-Layer Glass Door • Advanced Cooling Ventilation System. Mechanical Timer (120 min) with Auto Shut-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 30
  },
  {
    "id": "ovens-bo-660-mr-turbo-black",
    "title": "BO 660 MR+TURBO BLACK",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 660 MR+TURBO BLACK",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-660-mr-turbo-black.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "78 litres"
      }
    ],
    "features": [
      "8 Cooking Functions • Double-Layer Glass Door",
      "True Convection Oven with Turbo Fan",
      "Enamelled oven interior, Motorized Rotisserie",
      "Mechanical Timer (120 min) • Temperature Control: 50-250°C",
      "Removable rack supports with multiple shelf positions",
      "Tiltable rack supports • Child Safety Lock, Interior Oven Light",
      "Heating Elements: Top 950 W / Bottom 1100 W",
      "Grill Heating Element: 2000 W • Convection Heating Element: 2000 W",
      "Total Power Consumption: 3000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "8 Cooking Functions • Double-Layer Glass Door. True Convection Oven with Turbo Fan. Enamelled oven interior, Motorized Rotisserie.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 30
  },
  {
    "id": "ovens-bo-661-touch-mr-turbo",
    "title": "BO 661 TOUCH MR+TURBO",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 661 TOUCH MR+TURBO",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-661-touch-mr-turbo.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "80 litres"
      }
    ],
    "features": [
      "9 Cooking Functions • Triple-Layer Glass Door",
      "LCD Display with Push-Out Knobs",
      "True Convection Oven with Turbo Fan • Forced Air Cooling System",
      "Motorized Rotisserie, Energy Rating A • Timer with Thermostat",
      "5 Shelf Positions, Removable Door Plate",
      "Child Safety Lock, Interior Oven Light",
      "Power Consumption: 3000 W",
      "Heating Element: Top 950 W, Bottom 1100 W",
      "Grill Heating Element: 2000 W",
      "Convection Heating Element: 2000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "9 Cooking Functions • Triple-Layer Glass Door. LCD Display with Push-Out Knobs. True Convection Oven with Turbo Fan • Forced Air Cooling System.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 30
  },
  {
    "id": "ovens-bo-662-af",
    "title": "BO 662 AF",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 662 AF",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-662-af.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "60 litres"
      }
    ],
    "features": [
      "6 Cooking Functions • Triple-Layer Glass Door",
      "Air Fry Technology • Convection Oven with Fan",
      "Motorized Rotisserie",
      "Temperature Control: 50-250°C",
      "Mechanical timer - 120 min.",
      "Top-Mounted Fan for even heat distribution",
      "Removable Rack Supports",
      "5 Shelf Positions, Interior Oven Light",
      "Grill Rack, Grill Tray & Air Fry Basket",
      "Total Power load: 2.05 kW"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "6 Cooking Functions • Triple-Layer Glass Door. Air Fry Technology • Convection Oven with Fan. Motorized Rotisserie.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 30
  },
  {
    "id": "ovens-bo-664-bl-gas",
    "title": "BO 664 BL GAS",
    "category": "Ovens",
    "subcategory": "Built-in Ovens",
    "brand": "GLEN APPLIANCES",
    "model": "BO 664 BL GAS",
    "tag": "Built-in Ovens",
    "tagColor": "bg-secondary text-on-secondary",
    "image": "assets/products/ovens/ovens-bo-664-bl-gas.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "75 litres"
      }
    ],
    "features": [
      "3 Cooking Functions • Triple-Layer Glass Door",
      "Triple safety system with Thermostat & F.F.D",
      "Forced Air Cooling System • Temperature Setting: 160-265°C",
      "Mechanical timer - 120 min. • Wire rack with drip pan",
      "Motorized Rotisserie, Forced Air Cooling System",
      "Removable door plate, Interior Oven Light",
      "Top Burner Power: 1.6 kW",
      "Bottom Burner Power: 2.2 kW",
      "Top Burner Consumption: 116 g/h",
      "Bottom Burner Consumption: 160 g/h"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "3 Cooking Functions • Triple-Layer Glass Door. Triple safety system with Thermostat & F.F.D. Forced Air Cooling System • Temperature Setting: 160-265°C.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 30
  },
  {
    "id": "microwaves-mo-671",
    "title": "MO 671",
    "category": "Microwaves",
    "subcategory": "Built-in Microwaves",
    "brand": "GLEN APPLIANCES",
    "model": "MO 671",
    "tag": "Built-in Microwaves",
    "tagColor": "bg-inverse-surface text-inverse-on-surface",
    "image": "assets/products/microwaves/microwaves-mo-671.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "25 litres"
      }
    ],
    "features": [
      "Built-in Microwave with Grill • 8 Auto Cooking Menus",
      "Full Glass Fascia, SS Interior",
      "Electronic Clock with Cooking End Signal",
      "Touch Sensor Control Panel",
      "5 Power Levels, Child Safety Lock",
      "95 Minutes Timer, Interior Light",
      "Defrost by Weight or Time • Thermostat Knob, 24-Hours Clock",
      "Grill Function, ISI Certified • 315 mm Glass Turntable",
      "Rated Input Power (Microwave): 1450 W",
      "Rated Output Power (Microwave): 900 W",
      "Rated Input Power (Grill): 1000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built-in Microwave with Grill • 8 Auto Cooking Menus. Full Glass Fascia, SS Interior. Electronic Clock with Cooking End Signal.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 32
  },
  {
    "id": "microwaves-mo-674-black",
    "title": "MO 674 BLACK",
    "category": "Microwaves",
    "subcategory": "Built-in Microwaves",
    "brand": "GLEN APPLIANCES",
    "model": "MO 674 BLACK",
    "tag": "Built-in Microwaves",
    "tagColor": "bg-inverse-surface text-inverse-on-surface",
    "image": "assets/products/microwaves/microwaves-mo-674-black.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "25 litres"
      }
    ],
    "features": [
      "Built-in-Microwave with Grill • 8 Auto Cooking Menus",
      "EUP A11 standards • SS Interior, Jog Wheel Control",
      "Electronic clock, Child Safety Lock • Comply with, 30 Sec. Speed cook",
      "Interior light, 24-Hours Clock • Cooking End Signal, Delay protection",
      "95-Minute Timer, 315 mm Glass Turntable • Defrost by Weight or Time",
      "Rated Input Power (Microwave): 1450 W",
      "Rated Output Power (Microwave): 900 W",
      "Rated Input Power (Grill): 1000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built-in-Microwave with Grill • 8 Auto Cooking Menus. EUP A11 standards • SS Interior, Jog Wheel Control. Electronic clock, Child Safety Lock • Comply with, 30 Sec. Speed cook.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 32
  },
  {
    "id": "microwaves-mo-674-con-black",
    "title": "MO 674 CON BLACK",
    "category": "Microwaves",
    "subcategory": "Built-in Microwaves",
    "brand": "GLEN APPLIANCES",
    "model": "MO 674 CON BLACK",
    "tag": "Built-in Microwaves",
    "tagColor": "bg-inverse-surface text-inverse-on-surface",
    "image": "assets/products/microwaves/microwaves-mo-674-con-black.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "25 litres"
      }
    ],
    "features": [
      "Built-in-Microwave with Grill & Convection • 8 Auto Cooking Menus",
      "EUP A11 standards • SS Interior, Jog Wheel Control",
      "Electronic clock, Child Safety Lock • Comply with, 30 Sec. Speed cook",
      "Interior light, 24-Hours Clock • Cooking End Signal, Delay protection",
      "95-Minute Timer, 315 mm Glass Turntable • Defrost by Weight or Time",
      "Convection Power: 2500 W",
      "Rated Input Power (Microwave): 1450 W",
      "Rated Output Power (Microwave): 900 W",
      "Rated Input Power (Grill): 1000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built-in-Microwave with Grill & Convection • 8 Auto Cooking Menus. EUP A11 standards • SS Interior, Jog Wheel Control. Electronic clock, Child Safety Lock • Comply with, 30 Sec. Speed cook.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 33
  },
  {
    "id": "microwaves-mo-675",
    "title": "MO 675",
    "category": "Microwaves",
    "subcategory": "Built-in Microwaves",
    "brand": "GLEN APPLIANCES",
    "model": "MO 675",
    "tag": "Built-in Microwaves",
    "tagColor": "bg-inverse-surface text-inverse-on-surface",
    "image": "assets/products/microwaves/microwaves-mo-675.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "25 litres"
      }
    ],
    "features": [
      "Built-in Microwave with Grill",
      "8 Auto Cooking Menus • Full Glass Fascia, Electronic Clock",
      "Touch Control Panel, SS Interior",
      "Complies with EUP A11 Standards • 315 mm Glass Turntable",
      "30-Second Speed Cook Function • Defrost by Weight or Time",
      "Interior Light, Cooking End Signal",
      "Delay Protection, Child Safety Lock",
      "24-Hours Clock, 95-Minutes Timer",
      "Rated Input Power (Microwave): 1450 W",
      "Rated Output Power (Microwave): 900 W",
      "Rated Input Power (Grill): 1000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built-in Microwave with Grill. 8 Auto Cooking Menus • Full Glass Fascia, Electronic Clock. Touch Control Panel, SS Interior.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 33
  },
  {
    "id": "microwaves-mo-678",
    "title": "MO 678",
    "category": "Microwaves",
    "subcategory": "Built-in Microwaves",
    "brand": "GLEN APPLIANCES",
    "model": "MO 678",
    "tag": "Built-in Microwaves",
    "tagColor": "bg-inverse-surface text-inverse-on-surface",
    "image": "assets/products/microwaves/microwaves-mo-678.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "25 litres"
      }
    ],
    "features": [
      "Built-in Microwave with Grill • 8 Auto Cooking Menus",
      "Full Touch Control • Stainless Steel Cavity",
      "Child Safety Lock • Defrost, Multi-Stage Cooking",
      "315 mm Glass Turntable",
      "Microwave Power: 1450 W",
      "Microwave Output: 900 W",
      "Grill Power: 1000 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built-in Microwave with Grill • 8 Auto Cooking Menus. Full Touch Control • Stainless Steel Cavity. Child Safety Lock • Defrost, Multi-Stage Cooking.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 33
  },
  {
    "id": "microwaves-mo-679",
    "title": "MO 679",
    "category": "Microwaves",
    "subcategory": "Built-in Microwaves",
    "brand": "GLEN APPLIANCES",
    "model": "MO 679",
    "tag": "Built-in Microwaves",
    "tagColor": "bg-inverse-surface text-inverse-on-surface",
    "image": "assets/products/microwaves/microwaves-mo-679.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Capacity",
        "value": "34 litres"
      }
    ],
    "features": [
      "Built-in Microwave with Grill & Convection",
      "10 Auto Cooking Menus • Touch Control Panel",
      "Stainless Steel Cavity • Push-Open Door, Kitchen Timer",
      "Cooking End Signal, Child Safety Lock",
      "315 mm Glass Turntable",
      "Rated Input Power (Convection): 2500 W",
      "Rated Input Power (Microwave): 1550 W",
      "Rated Output Power (Microwave): 1000 W",
      "Rated Input Power (Grill): 1100 W"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built-in Microwave with Grill & Convection. 10 Auto Cooking Menus • Touch Control Panel. Stainless Steel Cavity • Push-Open Door, Kitchen Timer.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 33
  },
  {
    "id": "gas-stoves-cr-2011-ss-tr",
    "title": "CR 2011 SS TR",
    "category": "Gas Stoves",
    "subcategory": "Cooking Range",
    "brand": "GLEN APPLIANCES",
    "model": "CR 2011 SS TR",
    "tag": "Cooking Range",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-cr-2011-ss-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "515x600x895 mm"
      }
    ],
    "features": [
      "Spill Tray SS, Top lid - Toughened glass",
      "Front - Black glass",
      "Gas grill, Gas oven, Motorised rotisserie (optional)",
      "Thermostat for precise heat control",
      "Oven chamber - 62.6 lts. & Grill chamber - 34.45 lts.",
      "Aluminium alloy burners for faster cooking",
      "1 triple ring burner & 3 Aluminium alloy burners"
    ],
    "warranty": null,
    "dimensions": "515x600x895 mm",
    "status": "Published",
    "description": "Spill Tray SS, Top lid - Toughened glass. Front - Black glass. Gas grill, Gas oven, Motorised rotisserie (optional).",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 79
  },
  {
    "id": "gas-stoves-cr-2012-pl-tr-cb-ai",
    "title": "CR 2012 PL TR CB AI",
    "category": "Gas Stoves",
    "subcategory": "Cooking Range",
    "brand": "GLEN APPLIANCES",
    "model": "CR 2012 PL TR CB AI",
    "tag": "Cooking Range",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-cr-2012-pl-tr-cb-ai.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "515x600x895 mm"
      }
    ],
    "features": [
      "Top lid - Toughened glass, Finish - Matt stainless steel",
      "Gas Grill, Gas Oven, Auto ignition - Top burners",
      "Front - Mirror finish toughened glass",
      "Motorised rotisserie (optional)",
      "Oven chamber - 62.6 lts. & Grill chamber - 34.45 lts.",
      "Aluminium alloy burners for faster cooking",
      "1 triple ring burner & 3 aluminium alloy burners"
    ],
    "warranty": null,
    "dimensions": "515x600x895 mm",
    "status": "Published",
    "description": "Top lid - Toughened glass, Finish - Matt stainless steel. Gas Grill, Gas Oven, Auto ignition - Top burners. Front - Mirror finish toughened glass.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 79
  },
  {
    "id": "gas-stoves-cr-2014-db-ai",
    "title": "CR 2014 DB AI",
    "category": "Gas Stoves",
    "subcategory": "Cooking Range",
    "brand": "GLEN APPLIANCES",
    "model": "CR 2014 DB AI",
    "tag": "Cooking Range",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-cr-2014-db-ai.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "515x600x895 mm"
      }
    ],
    "features": [
      "Easy to clean 8 mm toughened glass",
      "Oven light & motorised rotisserie",
      "Multi-spark auto ignition, Separate gas grill chamber",
      "Gas oven with large viewing window glass door",
      "Oven chamber - 62.6 lts. & Grill chamber - 34.45 lts.",
      "Forged brass burner with double ring flame (2 big & 2 small)"
    ],
    "warranty": null,
    "dimensions": "515x600x895 mm",
    "status": "Published",
    "description": "Easy to clean 8 mm toughened glass. Oven light & motorised rotisserie. Multi-spark auto ignition, Separate gas grill chamber.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 79
  },
  {
    "id": "gas-stoves-ct-1022-gt-bb-bl-hf-cps",
    "title": "CT 1022 GT BB BL HF CPS",
    "category": "Gas Stoves",
    "subcategory": "Cooktops with Crown Pan Supports",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1022 GT BB BL HF CPS",
    "tag": "Cooktops with Crown Pan Supports",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1022-gt-bb-bl-hf-cps.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "660x385x122 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "Toughened glass top",
      "Strong and sturdy crown pan supports",
      "360° Swivel type revolving inlet nozzle",
      "SS Drip Tray, Ergonomic black knobs",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame & 1 Big Burner"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "660x385x122 mm",
    "status": "Published",
    "description": "Toughened glass top. Strong and sturdy crown pan supports. 360° Swivel type revolving inlet nozzle.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 68
  },
  {
    "id": "gas-stoves-ct-1038-gt-bb-bl-hf-cps",
    "title": "CT 1038 GT BB BL HF CPS",
    "category": "Gas Stoves",
    "subcategory": "Cooktops with Crown Pan Supports",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1038 GT BB BL HF CPS",
    "tag": "Cooktops with Crown Pan Supports",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1038-gt-bb-bl-hf-cps.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "780x435x122 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "Toughened glass top",
      "Strong and sturdy crown pan supports",
      "360° Swivel type revolving inlet nozzle",
      "SS Drip Tray, Ergonomic black knobs",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame & 1 Big & 1 Small Burner"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "780x435x122 mm",
    "status": "Published",
    "description": "Toughened glass top. Strong and sturdy crown pan supports. 360° Swivel type revolving inlet nozzle.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 68
  },
  {
    "id": "gas-stoves-ct-1042-gt-bb-bl-hf-cps",
    "title": "CT 1042 GT BB BL HF CPS",
    "category": "Gas Stoves",
    "subcategory": "Cooktops with Crown Pan Supports",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1042 GT BB BL HF CPS",
    "tag": "Cooktops with Crown Pan Supports",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1042-gt-bb-bl-hf-cps.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "600x565x122 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "Toughened glass top",
      "Strong and sturdy crown pan supports",
      "360° Swivel type revolving inlet nozzle",
      "SS Drip Tray, Ergonomic black knobs",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame & 1 Big & 2 Small Burners"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "600x565x122 mm",
    "status": "Published",
    "description": "Toughened glass top. Strong and sturdy crown pan supports. 360° Swivel type revolving inlet nozzle.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 69
  },
  {
    "id": "gas-stoves-ct-1044-gt-bb-bl-hf-cps",
    "title": "CT 1044 GT BB BL HF CPS",
    "category": "Gas Stoves",
    "subcategory": "Cooktops with Crown Pan Supports",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1044 GT BB BL HF CPS",
    "tag": "Cooktops with Crown Pan Supports",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1044-gt-bb-bl-hf-cps.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "880x515x122 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "Toughened glass top",
      "Strong and sturdy crown pan supports",
      "360° Swivel type revolving inlet nozzle",
      "SS Drip Tray, Ergonomic black knobs",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame & 1 Big & 2 Small Burners"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "880x515x122 mm",
    "status": "Published",
    "description": "Toughened glass top. Strong and sturdy crown pan supports. 360° Swivel type revolving inlet nozzle.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 69
  },
  {
    "id": "gas-stoves-ct-1021-gt-fb-hf",
    "title": "CT 1021 GT FB HF",
    "category": "Gas Stoves",
    "subcategory": "Forged Brass Burner & Double Drip Tray",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1021 GT FB HF",
    "tag": "Forged Brass Burner & Double Drip Tray",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1021-gt-fb-hf.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "660x390x118 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "4 mm thick sturdy pan supports",
      "Stainless Steel drip trays (1 removable & other fixed)",
      "ISI Certified, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Forged brass burners",
      "1 high-flame & 1 small burner"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "660x390x118 mm",
    "status": "Published",
    "description": "8 mm thick toughened glass. 4 mm thick sturdy pan supports. Stainless Steel drip trays (1 removable & other fixed).",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 69
  },
  {
    "id": "gas-stoves-ct-1032-gt-hf-bb-dd-bl",
    "title": "CT 1032 GT HF BB DD BL",
    "category": "Gas Stoves",
    "subcategory": "Forged Brass Burner & Double Drip Tray",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1032 GT HF BB DD BL",
    "tag": "Forged Brass Burner & Double Drip Tray",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1032-gt-hf-bb-dd-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "726x435x125 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, Stainless Steel drip trays",
      "ISI Certified, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 high-flame, 1 big & 1 small burner"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "726x435x125 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, Stainless Steel drip trays. ISI Certified, Ergonomic knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 69
  },
  {
    "id": "gas-stoves-ct-1033-gt-xl-fb-dd-bl",
    "title": "CT 1033 GT XL FB DD BL",
    "category": "Gas Stoves",
    "subcategory": "Forged Brass Burner & Double Drip Tray",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1033 GT XL FB DD BL",
    "tag": "Forged Brass Burner & Double Drip Tray",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1033-gt-xl-fb-dd-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "726x440x118 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "4 mm thick sturdy pan supports",
      "Stainless Steel drip trays (1 removable & other fixed)",
      "ISI Certified, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Forged brass burners",
      "1 high-flame, 1 big & 1 small burner"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "726x440x118 mm",
    "status": "Published",
    "description": "8 mm thick toughened glass. 4 mm thick sturdy pan supports. Stainless Steel drip trays (1 removable & other fixed).",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 70
  },
  {
    "id": "gas-stoves-ct-1038-gt-fb-dd-bl",
    "title": "CT 1038 GT FB DD BL",
    "category": "Gas Stoves",
    "subcategory": "Forged Brass Burner & Double Drip Tray",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1038 GT FB DD BL",
    "tag": "Forged Brass Burner & Double Drip Tray",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1038-gt-fb-dd-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "780x455x118 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "4 mm thick sturdy pan supports",
      "Stainless Steel drip trays (1 removable & other fixed)",
      "ISI Certified, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Forged brass burners",
      "1 high-flame, 1 big & 1 small burner"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "780x455x118 mm",
    "status": "Published",
    "description": "8 mm thick toughened glass. 4 mm thick sturdy pan supports. Stainless Steel drip trays (1 removable & other fixed).",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 70
  },
  {
    "id": "gas-stoves-ct-1041-gt-fb-bl",
    "title": "CT 1041 GT FB BL",
    "category": "Gas Stoves",
    "subcategory": "Forged Brass Burner & Double Drip Tray",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1041 GT FB BL",
    "tag": "Forged Brass Burner & Double Drip Tray",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1041-gt-fb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "600x565x118 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, SS drip tray",
      "ISI Certified, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Forged brass burners",
      "2 big & 2 small burners"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "600x565x118 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, SS drip tray. ISI Certified, Ergonomic knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 70
  },
  {
    "id": "gas-stoves-ct-1042-gt-fb",
    "title": "CT 1042 GT FB",
    "category": "Gas Stoves",
    "subcategory": "Forged Brass Burner & Double Drip Tray",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1042 GT FB",
    "tag": "Forged Brass Burner & Double Drip Tray",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1042-gt-fb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "600x565x118 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "4 mm thick sturdy pan supports",
      "SS drip tray, ISI Certified, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Forged brass burners",
      "1 high-flame, 1 big & 2 small burners"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "600x565x118 mm",
    "status": "Published",
    "description": "8 mm thick toughened glass. 4 mm thick sturdy pan supports. SS drip tray, ISI Certified, Ergonomic knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 70
  },
  {
    "id": "gas-stoves-ct-1043-gt-hf-bb-dd-bl",
    "title": "CT 1043 GT HF BB DD BL",
    "category": "Gas Stoves",
    "subcategory": "Forged Brass Burner & Double Drip Tray",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1043 GT HF BB DD BL",
    "tag": "Forged Brass Burner & Double Drip Tray",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1043-gt-hf-bb-dd-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "550x555x125 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports",
      "Stainless Steel drip trays (1 removable & other fixed)",
      "ISI Certified, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 high-flame, 1 big & 2 small burners"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "550x555x125 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports. Stainless Steel drip trays (1 removable & other fixed).",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 70
  },
  {
    "id": "gas-stoves-ct-1020-gt-jm-bb",
    "title": "CT 1020 GT JM BB",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1020 GT JM BB",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1020-gt-jm-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "660x400x110 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "1 Big & 1 Small Burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "660x400x110 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 71
  },
  {
    "id": "gas-stoves-ct-1020-gt-xl-bb-bl",
    "title": "CT 1020 GT XL BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1020 GT XL BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1020-gt-xl-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "630x370x130 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "1 Big & 1 Small Burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "630x370x130 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 71
  },
  {
    "id": "gas-stoves-ct-1021-gt-bb-bl",
    "title": "CT 1021 GT BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1021 GT BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1021-gt-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "660x395x150 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame & 1 Big burner"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "660x395x150 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 71
  },
  {
    "id": "gas-stoves-ct-1022-gt-xl-bb-bl",
    "title": "CT 1022 GT XL BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1022 GT XL BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1022-gt-xl-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "630x370x130 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "1 Big & 1 Small burner"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "630x370x130 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 71
  },
  {
    "id": "gas-stoves-ct-1030-gt-bb-bl",
    "title": "CT 1030 GT BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1030 GT BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1030-gt-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "700x405x110 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "2 Big & 1 Small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "700x405x110 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 72
  },
  {
    "id": "gas-stoves-ct-1030-gt-hf-bb-bl",
    "title": "CT 1030 GT HF BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1030 GT HF BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1030-gt-hf-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "700x410x110 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "1 High Flame, 1 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "700x410x110 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 72
  },
  {
    "id": "gas-stoves-ct-1033-gt-bb-bl",
    "title": "CT 1033 GT BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1033 GT BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1033-gt-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "726x390x118 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame, 1 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "726x390x118 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 72
  },
  {
    "id": "gas-stoves-ct-1033-gt-xl-bb-bl",
    "title": "CT 1033 GT XL BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1033 GT XL BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1033-gt-xl-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "726x440x118 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame, 1 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "726x440x118 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 72
  },
  {
    "id": "gas-stoves-ct-1034-gt-bb-bl",
    "title": "CT 1034 GT BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1034 GT BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1034-gt-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "730x395x105 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "Front Inlet Nozzle",
      "Fuel efficient brass burners",
      "2 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "730x395x105 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 72
  },
  {
    "id": "gas-stoves-ct-1038-gt-bb-bl",
    "title": "CT 1038 GT BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1038 GT BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1038-gt-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "780x455x118 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "8 mm thick tempered glass",
      "4 mm thick sturdy pan supports",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame, 1 big and 1 small burner"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "780x455x118 mm",
    "status": "Published",
    "description": "8 mm thick tempered glass. 4 mm thick sturdy pan supports. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 73
  },
  {
    "id": "gas-stoves-ct-1040-gt-xl-hf-bb-bl",
    "title": "CT 1040 GT XL HF BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1040 GT XL HF BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1040-gt-xl-hf-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "580x540x106 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs",
      "Front Inlet Nozzle, ISI Certified",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame, 1 big and 2 small burners"
    ],
    "warranty": "2 years standard",
    "dimensions": "580x540x106 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 73
  },
  {
    "id": "gas-stoves-ct-1040-gt-xl-ju-bb-bl",
    "title": "CT 1040 GT XL JU BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1040 GT XL JU BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1040-gt-xl-ju-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "550x560x110 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard and 2 years on glass"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "2 big and 2 small burners"
    ],
    "warranty": "2 years standard and 2 years on glass",
    "dimensions": "550x560x110 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 73
  },
  {
    "id": "gas-stoves-ct-1041-gt-bb-bl",
    "title": "CT 1041 GT BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1041 GT BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1041-gt-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "600x565x118 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "2 big and 2 small burners"
    ],
    "warranty": "2 years standard",
    "dimensions": "600x565x118 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 73
  },
  {
    "id": "gas-stoves-ct-1043-gt-bb-bl",
    "title": "CT 1043 GT BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1043 GT BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1043-gt-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "550x565x118 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Toughened glass top",
      "Sturdy pan supports, ISI Certified",
      "SS Drip Tray, Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "2 big and 2 small burners"
    ],
    "warranty": "2 years standard",
    "dimensions": "550x565x118 mm",
    "status": "Published",
    "description": "Toughened glass top. Sturdy pan supports, ISI Certified. SS Drip Tray, Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 73
  },
  {
    "id": "gas-stoves-ct-1048-gt-hf-bb-bl",
    "title": "CT 1048 GT HF BB BL",
    "category": "Gas Stoves",
    "subcategory": "Glass Cooktop with Brass Burner",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1048 GT HF BB BL",
    "tag": "Glass Cooktop with Brass Burner",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1048-gt-hf-bb-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "705x565x118 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass"
      }
    ],
    "features": [
      "8 mm thick tempered glass",
      "4 mm thick sturdy pan supports",
      "SS Drip Tray, Ergonomic black knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High Flame, 1 big and 2 small burners"
    ],
    "warranty": "2 years standard, 5 years on Glass",
    "dimensions": "705x565x118 mm",
    "status": "Published",
    "description": "8 mm thick tempered glass. 4 mm thick sturdy pan supports. SS Drip Tray, Ergonomic black knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 74
  },
  {
    "id": "gas-stoves-ct-1020-ss-bb",
    "title": "CT 1020 SS BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1020 SS BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1020-ss-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "620x330x135 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Stainless Steel body",
      "MS pan supports",
      "Ergonomic black knobs, ISI Certified",
      "Front inlet nozzle",
      "Fuel efficient brass burners",
      "1 big and 1 small burners"
    ],
    "warranty": "2 years standard",
    "dimensions": "620x330x135 mm",
    "status": "Published",
    "description": "Stainless Steel body. MS pan supports. Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 75
  },
  {
    "id": "gas-stoves-ct-1021-ss-bb",
    "title": "CT 1021 SS BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1021 SS BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1021-ss-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "700x360x175 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Stainless Steel body",
      "MS pan supports",
      "Ergonomic black knobs, ISI Certified",
      "Front inlet nozzle",
      "Fuel efficient brass burners",
      "1 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "700x360x175 mm",
    "status": "Published",
    "description": "Stainless Steel body. MS pan supports. Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 75
  },
  {
    "id": "gas-stoves-ct-1026-ss-bb",
    "title": "CT 1026 SS BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1026 SS BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1026-ss-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "660x400x135 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "1 big and 1 small burners"
    ],
    "warranty": "2 years standard",
    "dimensions": "660x400x135 mm",
    "status": "Published",
    "description": "Stainless Steel body. 4 mm thick Sturdy pan supports. Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 75
  },
  {
    "id": "gas-stoves-ct-1031-xl-ss-hf-bb",
    "title": "CT 1031 XL SS HF BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1031 XL SS HF BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1031-xl-ss-hf-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "760x410x115 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "1 High flame, 1 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "760x410x115 mm",
    "status": "Published",
    "description": "Stainless Steel body. 4 mm thick Sturdy pan supports. Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 75
  },
  {
    "id": "gas-stoves-ct-1033-ss-hf-dt-bb",
    "title": "CT 1033 SS HF DT BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1033 SS HF DT BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1033-ss-hf-dt-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "740x455x105 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "Stainless Steel drip tray",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "1 High flame, 1 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "740x455x105 mm",
    "status": "Published",
    "description": "Stainless Steel body. 4 mm thick Sturdy pan supports. Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 75
  },
  {
    "id": "gas-stoves-ct-1035-ss-hf-bb",
    "title": "CT 1035 SS HF BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1035 SS HF BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1035-ss-hf-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "720x440x115 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High flame, 1 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "720x440x115 mm",
    "status": "Published",
    "description": "Stainless Steel body. 4 mm thick Sturdy pan supports. Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 76
  },
  {
    "id": "gas-stoves-ct-1035-xl-hf-bb-dt",
    "title": "CT 1035 XL HF BB DT",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1035 XL HF BB DT",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1035-xl-hf-bb-dt.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "798x450x105 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Maximum cooking space",
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Stainless Steel drip trays (1 removable & other fixed)",
      "Fuel efficient brass burners",
      "1 High flame, 1 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "798x450x105 mm",
    "status": "Published",
    "description": "Maximum cooking space. Stainless Steel body. 4 mm thick Sturdy pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 76
  },
  {
    "id": "gas-stoves-ct-1037-ss-hf-bb",
    "title": "CT 1037 SS HF BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1037 SS HF BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1037-ss-hf-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "720x440x115 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Maximum cooking space",
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "1 High flame, 1 big and 1 small burner"
    ],
    "warranty": "2 years standard",
    "dimensions": "720x440x115 mm",
    "status": "Published",
    "description": "Maximum cooking space. Stainless Steel body. 4 mm thick Sturdy pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 76
  },
  {
    "id": "gas-stoves-ct-1044-ss-bb",
    "title": "CT 1044 SS BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1044 SS BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1044-ss-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "595x565x115 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "2 big and 2 small burners"
    ],
    "warranty": "2 years standard",
    "dimensions": "595x565x115 mm",
    "status": "Published",
    "description": "Stainless Steel body. 4 mm thick Sturdy pan supports. Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 76
  },
  {
    "id": "gas-stoves-ct-1044-ss-hf-bb",
    "title": "CT 1044 SS HF BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1044 SS HF BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1044-ss-hf-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "595x565x115 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High flame, 1 big and 2 small burners"
    ],
    "warranty": "2 years standard",
    "dimensions": "595x565x115 mm",
    "status": "Published",
    "description": "Stainless Steel body. 4 mm thick Sturdy pan supports. Ergonomic black knobs, ISI Certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 76
  },
  {
    "id": "gas-stoves-ct-1044-xl-ss-hf-bb",
    "title": "CT 1044 XL SS HF BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1044 XL SS HF BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1044-xl-ss-hf-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "635x580x115 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Maximum cooking space",
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Fuel efficient brass burners",
      "1 High flame, 1 big and 2 small burners"
    ],
    "warranty": "2 years standard",
    "dimensions": "635x580x115 mm",
    "status": "Published",
    "description": "Maximum cooking space. Stainless Steel body. 4 mm thick Sturdy pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 77
  },
  {
    "id": "gas-stoves-ct-1045-ss-hf-bb",
    "title": "CT 1045 SS HF BB",
    "category": "Gas Stoves",
    "subcategory": "PNG Gas Stoves",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1045 SS HF BB",
    "tag": "PNG Gas Stoves",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1045-ss-hf-bb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "700x565x115 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard"
      }
    ],
    "features": [
      "Maximum cooking space",
      "Stainless Steel body",
      "4 mm thick Sturdy pan supports",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Fuel efficient brass burners",
      "1 High flame, 1 big and 2 small burners"
    ],
    "warranty": "2 years standard",
    "dimensions": "700x565x115 mm",
    "status": "Published",
    "description": "Maximum cooking space. Stainless Steel body. 4 mm thick Sturdy pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 77
  },
  {
    "id": "gas-stoves-ct-1047-ultra-slim-dt-ss",
    "title": "CT 1047 ULTRA SLIM DT SS",
    "category": "Gas Stoves",
    "subcategory": "Stainless Steel Cooktops",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1047 ULTRA SLIM DT SS",
    "tag": "Stainless Steel Cooktops",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1047-ultra-slim-dt-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "760x600x150 mm"
      },
      {
        "label": "Warranty",
        "value": "2 years standard. Lifetime Warranty on SS 304 Body"
      }
    ],
    "features": [
      "Freedom of space to cook on all burners simultaneously",
      "304 Stainless Steel Deep Drawn Single Sheet Ultra Slim Body",
      "4 mm thick enamelled pan supports",
      "Removable drip tray",
      "Ergonomic black knobs, ISI Certified",
      "360° Swivel type revolving brass inlet nozzle",
      "High Efficiency Forged Brass Burners",
      "1 High flame, 1 big and 2 small burners"
    ],
    "warranty": "2 years standard. Lifetime Warranty on SS 304 Body",
    "dimensions": "760x600x150 mm",
    "status": "Published",
    "description": "Freedom of space to cook on all burners simultaneously. 304 Stainless Steel Deep Drawn Single Sheet Ultra Slim Body. 4 mm thick enamelled pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 77
  },
  {
    "id": "gas-stoves-ct-1036-ultra-slim-top-tn-77",
    "title": "CT 1036 ULTRA SLIM TOP TN 77",
    "category": "Gas Stoves",
    "subcategory": "Top Knob Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1036 ULTRA SLIM TOP TN 77",
    "tag": "Top Knob Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1036-ultra-slim-top-tn-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "Product Dimensions (W×DxH) - 770x540x110 mm"
      },
      {
        "label": "Warranty",
        "value": "5 Year on glass & burners"
      }
    ],
    "features": [
      "Sleek appearance with ultra slim body",
      "8 mm thick toughened glass top",
      "Strong vitreous square pan supports with Flame Guards",
      "Stainless Steel drip tray",
      "Smart & elegant Alloy knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high flame, 1 big and 1 small burner"
    ],
    "warranty": "5 Year on glass & burners",
    "dimensions": "Product Dimensions (W×DxH) - 770x540x110 mm",
    "status": "Published",
    "description": "Sleek appearance with ultra slim body. 8 mm thick toughened glass top. Strong vitreous square pan supports with Flame Guards.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 67
  },
  {
    "id": "gas-stoves-ct-1037-ultra-slim-tn-75",
    "title": "CT 1037 ULTRA SLIM TN 75",
    "category": "Gas Stoves",
    "subcategory": "Top Knob Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1037 ULTRA SLIM TN 75",
    "tag": "Top Knob Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1037-ultra-slim-tn-75.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "Product Dimensions (W×DxH) - 750x540x110 mm"
      },
      {
        "label": "Warranty",
        "value": "5 Year on glass & burners"
      }
    ],
    "features": [
      "Sleek appearance with ultra slim body",
      "8 mm thick toughened glass top",
      "Strong vitreous enamelled pan supports",
      "Stainless Steel drip tray",
      "Smart & elegant Alloy knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high flame, 1 big and 1 small burner"
    ],
    "warranty": "5 Year on glass & burners",
    "dimensions": "Product Dimensions (W×DxH) - 750x540x110 mm",
    "status": "Published",
    "description": "Sleek appearance with ultra slim body. 8 mm thick toughened glass top. Strong vitreous enamelled pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 67
  },
  {
    "id": "gas-stoves-ct-1045-ultra-slim-tn-75",
    "title": "CT 1045 ULTRA SLIM TN 75",
    "category": "Gas Stoves",
    "subcategory": "Top Knob Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1045 ULTRA SLIM TN 75",
    "tag": "Top Knob Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1045-ultra-slim-tn-75.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "Product Dimensions (W×DxH) - 750x540x110 mm"
      },
      {
        "label": "Warranty",
        "value": "5 Year on glass & burners"
      }
    ],
    "features": [
      "Sleek appearance with ultra slim body",
      "8 mm thick toughened glass top",
      "Strong vitreous enamelled pan supports",
      "Stainless Steel drip tray",
      "Smart & elegant Alloy knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high flame, 1 big and 2 small burner"
    ],
    "warranty": "5 Year on glass & burners",
    "dimensions": "Product Dimensions (W×DxH) - 750x540x110 mm",
    "status": "Published",
    "description": "Sleek appearance with ultra slim body. 8 mm thick toughened glass top. Strong vitreous enamelled pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 68
  },
  {
    "id": "gas-stoves-ct-1047-ultra-slim-top-tn-77",
    "title": "CT 1047 ULTRA SLIM TOP TN 77",
    "category": "Gas Stoves",
    "subcategory": "Top Knob Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1047 ULTRA SLIM TOP TN 77",
    "tag": "Top Knob Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1047-ultra-slim-top-tn-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "Product Dimensions (W×DxH) - 770x540x110 mm"
      },
      {
        "label": "Warranty",
        "value": "5 Year on glass & burners"
      }
    ],
    "features": [
      "Sleek appearance with ultra slim body",
      "8 mm thick toughened glass top",
      "Strong vitreous square pan supports with Flame Guards",
      "Matt Stainless Steel Drip Trays",
      "Smart & elegant Alloy knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high flame, 1 big and 2 small burner"
    ],
    "warranty": "5 Year on glass & burners",
    "dimensions": "Product Dimensions (W×DxH) - 770x540x110 mm",
    "status": "Published",
    "description": "Sleek appearance with ultra slim body. 8 mm thick toughened glass top. Strong vitreous square pan supports with Flame Guards.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 68
  },
  {
    "id": "gas-stoves-ct-1035-ultra-slim-ac",
    "title": "CT 1035 ULTRA SLIM AC",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1035 ULTRA SLIM AC",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1035-ultra-slim-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "782x455x100 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "40 mm sleek ultra-slim apricot powder coated body",
      "8 mm thick toughened glass top",
      "Strong vitreous enamelled pan supports",
      "Matt SS drip trays, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high-flame, 1 big & 1 small burner"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "782x455x100 mm",
    "status": "Published",
    "description": "40 mm sleek ultra-slim apricot powder coated body. 8 mm thick toughened glass top. Strong vitreous enamelled pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 67
  },
  {
    "id": "gas-stoves-ct-1035-ultra-slim-bl",
    "title": "CT 1035 ULTRA SLIM BL",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1035 ULTRA SLIM BL",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1035-ultra-slim-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "782x455x100 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "40 mm sleek ultra-slim black powder coated body",
      "8 mm thick toughened glass top",
      "Strong vitreous enamelled pan supports",
      "Matt SS drip trays, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high-flame, 1 big & 1 small burners"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "782x455x100 mm",
    "status": "Published",
    "description": "40 mm sleek ultra-slim black powder coated body. 8 mm thick toughened glass top. Strong vitreous enamelled pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 66
  },
  {
    "id": "gas-stoves-ct-1037-ultra-slim-mg-75",
    "title": "CT 1037 ULTRA SLIM MG 75",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1037 ULTRA SLIM MG 75",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1037-ultra-slim-mg-75.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "750x510x125 mm"
      },
      {
        "label": "Warranty",
        "value": "10 year on Glass, Burners & Gas Valve"
      }
    ],
    "features": [
      "Sleek Ultra-Slim body",
      "8 mm thick matte finish toughened glass",
      "Strong vitreous enamelled crown pan supports & drip tray",
      "High precision gas valve for no sim off, Alloy knobs",
      "360° Swivel type revolving inlet nozzle",
      "High efficiency forged brass burners",
      "1 High Flame, 1 Big & 1 Small burner"
    ],
    "warranty": "10 year on Glass, Burners & Gas Valve",
    "dimensions": "750x510x125 mm",
    "status": "Published",
    "description": "Sleek Ultra-Slim body. 8 mm thick matte finish toughened glass. Strong vitreous enamelled crown pan supports & drip tray.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 65
  },
  {
    "id": "gas-stoves-ct-1038-slim-cp-bl-bb-mg",
    "title": "CT 1038 SLIM CP BL BB MG",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1038 SLIM CP BL BB MG",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1038-slim-cp-bl-bb-mg.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "780x435/450x118"
      },
      {
        "label": "Warranty",
        "value": "2 years standard, 5 years on Glass, Burners &"
      }
    ],
    "features": [
      "Sleek Ultra-Slim body",
      "8 mm thick matte finish toughened glass",
      "Strong vitreous enamelled crown pan supports & drip tray",
      "Ergonomic knobs, 360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency burners",
      "1 High Flame & 1 Big & 1 Small Burner"
    ],
    "warranty": "2 years standard, 5 years on Glass, Burners &",
    "dimensions": "780x435/450x118",
    "status": "Published",
    "description": "Sleek Ultra-Slim body. 8 mm thick matte finish toughened glass. Strong vitreous enamelled crown pan supports & drip tray.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 65
  },
  {
    "id": "gas-stoves-ct-1038-slim-sq-bl-fb",
    "title": "CT 1038 SLIM SQ BL FB",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1038 SLIM SQ BL FB",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1038-slim-sq-bl-fb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "782x455x100 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "40 mm sleek ultra-slim body",
      "8 mm thick toughened glass top",
      "Strong vitreous enamelled pan supports",
      "Matt SS drip trays, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Forged brass burners",
      "1 high-flame, 1 big & 1 small burners"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "782x455x100 mm",
    "status": "Published",
    "description": "40 mm sleek ultra-slim body. 8 mm thick toughened glass top. Strong vitreous enamelled pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 66
  },
  {
    "id": "gas-stoves-ct-1044-slim-cp-bl-bb-mg",
    "title": "CT 1044 SLIM CP BL BB MG",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1044 SLIM CP BL BB MG",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1044-slim-cp-bl-bb-mg.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "800x510x118 mm"
      },
      {
        "label": "Warranty",
        "value": "Glass, Burners & Gas Valve"
      }
    ],
    "features": [
      "Sleek Ultra-Slim body",
      "8 mm thick matte finish toughened glass",
      "Strong vitreous enamelled crown pan supports & drip tray",
      "Ergonomic knobs, 360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency burners",
      "1 High Flame & 2 Big & 1 Small Burner"
    ],
    "warranty": "Glass, Burners & Gas Valve",
    "dimensions": "800x510x118 mm",
    "status": "Published",
    "description": "Sleek Ultra-Slim body. 8 mm thick matte finish toughened glass. Strong vitreous enamelled crown pan supports & drip tray.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 65
  },
  {
    "id": "gas-stoves-ct-1045-ultra-slim-mg-75",
    "title": "CT 1045 ULTRA SLIM MG 75",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1045 ULTRA SLIM MG 75",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1045-ultra-slim-mg-75.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "750x510x125 mm"
      },
      {
        "label": "Warranty",
        "value": "10 year on Glass, Burners & Gas Valve"
      }
    ],
    "features": [
      "Sleek Ultra-Slim body",
      "8 mm thick matte finish toughened glass",
      "Strong vitreous enamelled crown pan supports & drip tray",
      "High precision gas valve for no sim off, Alloy knobs",
      "Multi-spark auto ignition (AI model)",
      "360° Swivel type revolving inlet nozzle",
      "High efficiency forged brass burners",
      "1 High Flame, 2 Big & 1 Small burner"
    ],
    "warranty": "10 year on Glass, Burners & Gas Valve",
    "dimensions": "750x510x125 mm",
    "status": "Published",
    "description": "Sleek Ultra-Slim body. 8 mm thick matte finish toughened glass. Strong vitreous enamelled crown pan supports & drip tray.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 65
  },
  {
    "id": "gas-stoves-ct-1047-ultra-slim-ac",
    "title": "CT 1047 ULTRA SLIM AC",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1047 ULTRA SLIM AC",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1047-ultra-slim-ac.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "700x555x100 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "40 mm sleek ultra-slim apricot powder coated body",
      "8 mm thick toughened glass top",
      "Strong vitreous enamelled pan supports",
      "Matt SS drip trays, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high-flame, 1 big & 2 small burners"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "700x555x100 mm",
    "status": "Published",
    "description": "40 mm sleek ultra-slim apricot powder coated body. 8 mm thick toughened glass top. Strong vitreous enamelled pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 66
  },
  {
    "id": "gas-stoves-ct-1047-ultra-slim-bl",
    "title": "CT 1047 ULTRA SLIM BL",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1047 ULTRA SLIM BL",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1047-ultra-slim-bl.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "700x555x100 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "40 mm sleek ultra-slim black powder coated body",
      "8 mm thick toughened glass top",
      "Strong vitreous enamelled pan supports",
      "Matt SS drip trays, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Forged brass burners",
      "1 high-flame, 1 big & 2 small burners"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "700x555x100 mm",
    "status": "Published",
    "description": "40 mm sleek ultra-slim black powder coated body. 8 mm thick toughened glass top. Strong vitreous enamelled pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 66
  },
  {
    "id": "gas-stoves-ct-1048-slim-cp-bl-bb-mg",
    "title": "CT 1048 SLIM CP BL BB MG",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1048 SLIM CP BL BB MG",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1048-slim-cp-bl-bb-mg.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "700x560x120"
      },
      {
        "label": "Warranty",
        "value": "Glass, Burners & Gas Valve"
      }
    ],
    "features": [
      "Sleek Ultra-Slim body",
      "8 mm thick matte finish toughened glass",
      "Strong vitreous enamelled crown pan supports & drip tray",
      "Ergonomic knobs, 360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "High efficiency burners",
      "1 High Flame & 2 Big & 1 Small Burner"
    ],
    "warranty": "Glass, Burners & Gas Valve",
    "dimensions": "700x560x120",
    "status": "Published",
    "description": "Sleek Ultra-Slim body. 8 mm thick matte finish toughened glass. Strong vitreous enamelled crown pan supports & drip tray.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 65
  },
  {
    "id": "gas-stoves-ct-1048-slim-sq-bl-fb",
    "title": "CT 1048 SLIM SQ BL FB",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1048 SLIM SQ BL FB",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1048-slim-sq-bl-fb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "700x555x100 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "40 mm sleek ultra-slim body",
      "8 mm thick toughened glass top",
      "Strong vitreous enamelled pan supports",
      "Matt SS drip trays, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Forged brass burners",
      "1 high-flame, 1 big & 2 small burners"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "700x555x100 mm",
    "status": "Published",
    "description": "40 mm sleek ultra-slim body. 8 mm thick toughened glass top. Strong vitreous enamelled pan supports.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 66
  },
  {
    "id": "gas-stoves-ct-1049-sq-gt-fb",
    "title": "CT 1049 SQ GT FB",
    "category": "Gas Stoves",
    "subcategory": "Ultra Slim Glass",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1049 SQ GT FB",
    "tag": "Ultra Slim Glass",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1049-sq-gt-fb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "905x450x140 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on glass, gas valve and burners"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "Strong vitreous enamelled square pan supports",
      "Matt SS drip trays, Ergonomic knobs",
      "360° Swivel type revolving inlet nozzle",
      "Multi-spark auto ignition (AI model)",
      "Forged brass burners",
      "1 high-flame, 1 big & 2 small burners"
    ],
    "warranty": "5-year on glass, gas valve and burners",
    "dimensions": "905x450x140 mm",
    "status": "Published",
    "description": "8 mm thick toughened glass. Strong vitreous enamelled square pan supports. Matt SS drip trays, Ergonomic knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 67
  },
  {
    "id": "gas-stoves-ct-1052-66-ultra-tuff-ss",
    "title": "CT 1052 66 ULTRA TUFF SS",
    "category": "Gas Stoves",
    "subcategory": "Ultra Tuff Stainless Steel",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1052 66 ULTRA TUFF SS",
    "tag": "Ultra Tuff Stainless Steel",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1052-66-ultra-tuff-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "660x390x117 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on gas valve and burners"
      }
    ],
    "features": [
      "Ultra-tough stainless steel body",
      "5 mm thick ultra-strong pan supports",
      "360° swivel brass gas inlet nozzle",
      "Ergonomic knobs, ISI-certified",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high-flame & 1 big burner"
    ],
    "warranty": "5-year on gas valve and burners",
    "dimensions": "660x390x117 mm",
    "status": "Published",
    "description": "Ultra-tough stainless steel body. 5 mm thick ultra-strong pan supports. 360° swivel brass gas inlet nozzle.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 63
  },
  {
    "id": "gas-stoves-ct-1053-73-ultra-tuff-ss",
    "title": "CT 1053 73 ULTRA TUFF SS",
    "category": "Gas Stoves",
    "subcategory": "Ultra Tuff Stainless Steel",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1053 73 ULTRA TUFF SS",
    "tag": "Ultra Tuff Stainless Steel",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1053-73-ultra-tuff-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "730x400x117 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on gas valve and burners"
      }
    ],
    "features": [
      "Ultra-tough stainless steel body",
      "5 mm thick ultra-strong pan supports",
      "360° swivel brass gas inlet nozzle",
      "Ergonomic knobs, ISI-certified",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high-flame, 1 big & 1 small burner"
    ],
    "warranty": "5-year on gas valve and burners",
    "dimensions": "730x400x117 mm",
    "status": "Published",
    "description": "Ultra-tough stainless steel body. 5 mm thick ultra-strong pan supports. 360° swivel brass gas inlet nozzle.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 63
  },
  {
    "id": "gas-stoves-ct-1053-77-ultra-tuff-dt-ss",
    "title": "CT 1053 77 ULTRA TUFF DT SS",
    "category": "Gas Stoves",
    "subcategory": "Ultra Tuff Stainless Steel",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1053 77 ULTRA TUFF DT SS",
    "tag": "Ultra Tuff Stainless Steel",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1053-77-ultra-tuff-dt-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "770x455x117 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on gas valve and burners"
      }
    ],
    "features": [
      "Ultra-tough stainless steel body",
      "5 mm thick ultra-strong pan supports",
      "Maximum vessel space, ISI-certified",
      "Removable SS drip trays for easy cleaning",
      "Multi-spark auto ignition (AI model)",
      "Ergonomic knobs, Anti-Skid feet",
      "360° swivel brass gas inlet nozzle",
      "Forged brass burners",
      "1 high-flame, 1 big & 1 small burner"
    ],
    "warranty": "5-year on gas valve and burners",
    "dimensions": "770x455x117 mm",
    "status": "Published",
    "description": "Ultra-tough stainless steel body. 5 mm thick ultra-strong pan supports. Maximum vessel space, ISI-certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 63
  },
  {
    "id": "gas-stoves-ct-1053-77-ultra-tuff-ss",
    "title": "CT 1053 77 ULTRA TUFF SS",
    "category": "Gas Stoves",
    "subcategory": "Ultra Tuff Stainless Steel",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1053 77 ULTRA TUFF SS",
    "tag": "Ultra Tuff Stainless Steel",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1053-77-ultra-tuff-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "770x455x117 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on gas valve and burners"
      }
    ],
    "features": [
      "Ultra-tough stainless steel body",
      "5 mm thick ultra-strong pan supports",
      "360° swivel brass gas inlet nozzle",
      "Ergonomic knobs, ISI-certified",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high-flame, 1 big & 1 small burner"
    ],
    "warranty": "5-year on gas valve and burners",
    "dimensions": "770x455x117 mm",
    "status": "Published",
    "description": "Ultra-tough stainless steel body. 5 mm thick ultra-strong pan supports. 360° swivel brass gas inlet nozzle.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 63
  },
  {
    "id": "gas-stoves-ct-1053-78-u-tuff-top-knob-dt-ss",
    "title": "CT 1053 78 U TUFF TOP KNOB DT SS",
    "category": "Gas Stoves",
    "subcategory": "Ultra Tuff Stainless Steel",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1053 78 U TUFF TOP KNOB DT SS",
    "tag": "Ultra Tuff Stainless Steel",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1053-78-u-tuff-top-knob-dt-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "Product Dimensions (W×DxH) - 780x455x117"
      },
      {
        "label": "Warranty",
        "value": "10-year on gas valve and burners"
      }
    ],
    "features": [
      "Ultra-tough stainless steel body",
      "5 mm thick ultra-strong pan supports",
      "Maximum vessel space, ISI-certified",
      "Removable SS drip trays for easy cleaning",
      "Multi-spark auto ignition (AI model)",
      "Premium Alloy knobs, Anti-Skid feet",
      "360° swivel brass gas inlet nozzle",
      "High efficiency forged brass burners",
      "1 high-flame, 1 big & 1 small burner"
    ],
    "warranty": "10-year on gas valve and burners",
    "dimensions": "Product Dimensions (W×DxH) - 780x455x117",
    "status": "Published",
    "description": "Ultra-tough stainless steel body. 5 mm thick ultra-strong pan supports. Maximum vessel space, ISI-certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 62
  },
  {
    "id": "gas-stoves-ct-1054-73-ultra-tuff-dt-ss",
    "title": "CT 1054 73 ULTRA TUFF DT SS",
    "category": "Gas Stoves",
    "subcategory": "Ultra Tuff Stainless Steel",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1054 73 ULTRA TUFF DT SS",
    "tag": "Ultra Tuff Stainless Steel",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1054-73-ultra-tuff-dt-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "730x560x117 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on gas valve and burners"
      }
    ],
    "features": [
      "Ultra-tough stainless steel body",
      "5 mm thick ultra-strong pan supports",
      "Maximum vessel space, ISI-certified",
      "Removable SS drip trays for easy cleaning",
      "Multi-spark auto ignition (AI model)",
      "Ergonomic knobs, Anti-Skid feet",
      "360° swivel brass gas inlet nozzle",
      "Forged brass burners",
      "1 high-flame, 1 big & 2 small burners"
    ],
    "warranty": "5-year on gas valve and burners",
    "dimensions": "730x560x117 mm",
    "status": "Published",
    "description": "Ultra-tough stainless steel body. 5 mm thick ultra-strong pan supports. Maximum vessel space, ISI-certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 63
  },
  {
    "id": "gas-stoves-ct-1054-73-ultra-tuff-ss",
    "title": "CT 1054 73 ULTRA TUFF SS",
    "category": "Gas Stoves",
    "subcategory": "Ultra Tuff Stainless Steel",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1054 73 ULTRA TUFF SS",
    "tag": "Ultra Tuff Stainless Steel",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1054-73-ultra-tuff-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "730x560x117 mm"
      },
      {
        "label": "Warranty",
        "value": "5-year on gas valve and burners"
      }
    ],
    "features": [
      "Ultra-tough stainless steel body",
      "5 mm thick ultra-strong pan supports",
      "360° swivel brass gas inlet nozzle",
      "Ergonomic knobs, ISI-certified",
      "Multi-spark auto ignition (AI model)",
      "High efficiency forged brass burners",
      "1 high-flame, 1 big & 2 small burners"
    ],
    "warranty": "5-year on gas valve and burners",
    "dimensions": "730x560x117 mm",
    "status": "Published",
    "description": "Ultra-tough stainless steel body. 5 mm thick ultra-strong pan supports. 360° swivel brass gas inlet nozzle.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 64
  },
  {
    "id": "gas-stoves-ct-1054-75-u-tuff-top-knob-dt-ss",
    "title": "CT 1054 75 U TUFF TOP KNOB DT SS",
    "category": "Gas Stoves",
    "subcategory": "Ultra Tuff Stainless Steel",
    "brand": "GLEN APPLIANCES",
    "model": "CT 1054 75 U TUFF TOP KNOB DT SS",
    "tag": "Ultra Tuff Stainless Steel",
    "tagColor": "bg-surface-container-high text-primary",
    "image": "assets/products/gas-stoves/gas-stoves-ct-1054-75-u-tuff-top-knob-dt-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Dimensions (WxDxH)",
        "value": "Product Dimensions (W×DxH) - 750x560x117"
      },
      {
        "label": "Warranty",
        "value": "10-year on gas valve and burners"
      }
    ],
    "features": [
      "Ultra-tough stainless steel body",
      "5 mm thick ultra-strong pan supports",
      "Maximum vessel space, ISI-certified",
      "Removable SS drip trays for easy cleaning",
      "Multi-spark auto ignition (AI model)",
      "Premium Alloy knobs, Anti-Skid feet",
      "360° swivel brass gas inlet nozzle",
      "High efficiency forged brass burners",
      "1 high-flame, 1 big & 2 small burner"
    ],
    "warranty": "10-year on gas valve and burners",
    "dimensions": "Product Dimensions (W×DxH) - 750x560x117",
    "status": "Published",
    "description": "Ultra-tough stainless steel body. 5 mm thick ultra-strong pan supports. Maximum vessel space, ISI-certified.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 62
  },
  {
    "id": "hobs-bh-1014-ic-4z",
    "title": "BH 1014 IC 4Z",
    "category": "Hobs",
    "subcategory": "Built-in Induction Hobs",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1014 IC 4Z",
    "tag": "Built-in Induction Hobs",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1014-ic-4z.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Built in Induction Hob with 4 burner zones"
      }
    ],
    "features": [
      "Built in Induction Hob with 4 burner zones",
      "Rated power: 1200+1500x2",
      "Boost Function 1500+2000x2",
      "Touch control",
      "9 Power stages",
      "Child lock control",
      "99 min. timer",
      "Overheat protection",
      "Pan Sensor"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built in Induction Hob with 4 burner zones. Rated power: 1200+1500x2. Boost Function 1500+2000x2.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 58
  },
  {
    "id": "hobs-bh-1015-ic-2z",
    "title": "BH 1015 IC 2Z",
    "category": "Hobs",
    "subcategory": "Built-in Induction Hobs",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1015 IC 2Z",
    "tag": "Built-in Induction Hobs",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1015-ic-2z.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Built in Induction Hob with 2 burner zones"
      }
    ],
    "features": [
      "Built in Induction Hob with 2 burner zones",
      "Rated Power: 1800+1500",
      "Boost Function 2000+1500",
      "Touch control",
      "9 Power stages",
      "Child lock control",
      "99 minute Timer",
      "Overheat protection",
      "Pan Sensor"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built in Induction Hob with 2 burner zones. Rated Power: 1800+1500. Boost Function 2000+1500.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 58
  },
  {
    "id": "hobs-bh-1016-ic-2z",
    "title": "BH 1016 IC 2Z",
    "category": "Hobs",
    "subcategory": "Built-in Induction Hobs",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1016 IC 2Z",
    "tag": "Built-in Induction Hobs",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1016-ic-2z.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Built in Induction Hob with 2 flexible cooking zones"
      }
    ],
    "features": [
      "Built in Induction Hob with 2 flexible cooking zones",
      "Rated Power: 2000+2000",
      "Boost Function 2200+2200",
      "Touch control",
      "9 Power stages",
      "Child lock control",
      "99 minute Timer",
      "Overheat protection",
      "Pan Sensor"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built in Induction Hob with 2 flexible cooking zones. Rated Power: 2000+2000. Boost Function 2200+2200.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 58
  },
  {
    "id": "hobs-bh-1017-ic-2z",
    "title": "BH 1017 IC 2Z",
    "category": "Hobs",
    "subcategory": "Built-in Induction Hobs",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1017 IC 2Z",
    "tag": "Built-in Induction Hobs",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1017-ic-2z.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Built in Induction Hob with 2 burner zones"
      }
    ],
    "features": [
      "Built in Induction Hob with 2 burner zones",
      "Rated Power: 2000+1500",
      "Touch control",
      "9 Power stages",
      "Child lock control",
      "99 minute Timer",
      "Overheat protection",
      "Pan Sensor"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built in Induction Hob with 2 burner zones. Rated Power: 2000+1500. Touch control.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 58
  },
  {
    "id": "hobs-bh-1018-ic-2z",
    "title": "BH 1018 IC 2Z",
    "category": "Hobs",
    "subcategory": "Built-in Induction Hobs",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1018 IC 2Z",
    "tag": "Built-in Induction Hobs",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1018-ic-2z.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Built in Induction Hob with 2 burner zones"
      }
    ],
    "features": [
      "Built in Induction Hob with 2 burner zones",
      "Rated Power: 2000+2000",
      "Boost Function 2200+2200",
      "Touch control",
      "10 Power levels",
      "Child lock control",
      "180 minute Timer",
      "Overheat protection",
      "Pan Sensor"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Built in Induction Hob with 2 burner zones. Rated Power: 2000+2000. Boost Function 2200+2200.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 58
  },
  {
    "id": "hobs-bh-1063-df-ht-tr",
    "title": "BH 1063 DF HT TR",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1063 DF HT TR",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1063-df-ht-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous enameled pan supports & drip tray",
      "Premium Alloy knobs",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "DFVS Forged Brass Burners with Double Ring Flame",
      "1 Triple ring, 1 Big & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 44
  },
  {
    "id": "hobs-bh-1064-ro-ht-tdb",
    "title": "BH 1064 RO HT TDB",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1064 RO HT TDB",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1064-ro-ht-tdb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enameled pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "2 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 46
  },
  {
    "id": "hobs-bh-1064-ro-ht-tdb-mtr",
    "title": "BH 1064 RO HT TDB MTR",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1064 RO HT TDB MTR",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1064-ro-ht-tdb-mtr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enameled pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "1 Mini Triple Ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 46
  },
  {
    "id": "hobs-bh-1073-df-ht-2tr-77",
    "title": "BH 1073 DF HT 2TR 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 DF HT 2TR 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-df-ht-2tr-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous Enameled Pan Support with Flame Guard",
      "Premium Alloy Knob, Vitreous enameled drip tray",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "DFVS Forged Brass Burners with Double Ring Flame",
      "1 Triple ring, 1 Mini Triple Ring & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 44
  },
  {
    "id": "hobs-bh-1073-df-ht-mtr-70",
    "title": "BH 1073 DF HT MTR 70",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 DF HT MTR 70",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-df-ht-mtr-70.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous enameled pan supports & drip tray",
      "Premium Alloy knobs",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "DFVS Forged Brass Burners with Double Ring Flame",
      "1 Mini Triple ring, 1 Big & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 44
  },
  {
    "id": "hobs-bh-1073-dft-ht-2tr-77",
    "title": "BH 1073 DFT HT 2TR 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 DFT HT 2TR 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-dft-ht-2tr-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous enameled pan supports & drip tray",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Mini Triple ring & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 42
  },
  {
    "id": "hobs-bh-1073-sq-ht-tdb",
    "title": "BH 1073 SQ HT TDB",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 SQ HT TDB",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-sq-ht-tdb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enameled pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "2 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 46
  },
  {
    "id": "hobs-bh-1073-sq-ht-tdb-tr",
    "title": "BH 1073 SQ HT TDB TR",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 SQ HT TDB TR",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-sq-ht-tdb-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enameled pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 46
  },
  {
    "id": "hobs-bh-1073-xl-dft-ht-tr-mg75",
    "title": "BH 1073 XL DFT HT TR MG75",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 XL DFT HT TR MG75",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-xl-dft-ht-tr-mg75.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Matt Glass",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Cast Iron pan supports with Flame Guard",
      "Vitreous enameled drip tray",
      "European Gas Valves for no sim-off",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 big and 1 small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Matt Glass. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 41
  },
  {
    "id": "hobs-bh-1073-xl-roci-ht-dft-mg-77",
    "title": "BH 1073 XL ROCI HT DFT MG 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 XL ROCI HT DFT MG 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-xl-roci-ht-dft-mg-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Matt Glass",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Cast Iron pan supports with Flame Guard",
      "Vitreous enameled drip tray",
      "European Gas Valves for no sim-off",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Big, 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Matt Glass. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 39
  },
  {
    "id": "hobs-bh-1073-xl-sq-ht-tdb-tr-bl-77",
    "title": "BH 1073 XL SQ HT TDB TR BL 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 XL SQ HT TDB TR BL 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-xl-sq-ht-tdb-tr-bl-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enameled pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 47
  },
  {
    "id": "hobs-bh-1073-xl-sq-ht-tdb-tr-mg-77",
    "title": "BH 1073 XL SQ HT TDB TR MG 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 XL SQ HT TDB TR MG 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-xl-sq-ht-tdb-tr-mg-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick matte finish glass with edge guard",
      "European gas valve for no sim-off",
      "Strong vitreous cast iron pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 big and 1 small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick matte finish glass with edge guard. European gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 45
  },
  {
    "id": "hobs-bh-1074-df-ht-2tr-77",
    "title": "BH 1074 DF HT 2TR 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 DF HT 2TR 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-df-ht-2tr-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous Enameled Pan Support with Flame Guard",
      "Premium Alloy Knob, Vitreous enameled drip tray",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "DFVS Forged Brass Burners with Double Ring Flame",
      "1 Triple Ring, 1 Mini Triple Ring, 1 Big & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 43
  },
  {
    "id": "hobs-bh-1074-df-ht-mtr-70",
    "title": "BH 1074 DF HT MTR 70",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 DF HT MTR 70",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-df-ht-mtr-70.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous enameled pan supports & drip tray",
      "Premium Alloy knobs",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "DFVS Forged Brass Burners with Double Ring Flame",
      "1 Mini Triple Ring, 1 Big & 2 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 44
  },
  {
    "id": "hobs-bh-1074-dft-ht-2tr-77",
    "title": "BH 1074 DFT HT  2TR 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 DFT HT  2TR 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-dft-ht-2tr-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous enameled pan supports & drip tray",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Mini Triple ring, 1 Big, 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 42
  },
  {
    "id": "hobs-bh-1074-dft-ht-2tr-mg-77",
    "title": "BH 1074 DFT HT 2TR MG 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 DFT HT 2TR MG 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-dft-ht-2tr-mg-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Matt Glass",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Cast Iron pan supports with Flame Guard",
      "Vitreous enameled drip tray",
      "European Gas Valves for no sim-off",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Mini Triple ring, 1 Big & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Matt Glass. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 41
  },
  {
    "id": "hobs-bh-1074-roci-ht-dft-mg-77",
    "title": "BH 1074 ROCI HT DFT MG 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 ROCI HT DFT MG 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-roci-ht-dft-mg-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Matt Glass",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Cast Iron pan supports with Flame Guard",
      "Vitreous enameled drip tray",
      "European Gas Valves for no sim-off",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Mini Triple Ring, 2 Big Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Matt Glass. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 39
  },
  {
    "id": "hobs-bh-1074-sq-ht-tdb",
    "title": "BH 1074 SQ HT TDB",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ HT TDB",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-ht-tdb.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enameled pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "2 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 47
  },
  {
    "id": "hobs-bh-1074-sq-ht-tdb-2tr-mg-77",
    "title": "BH 1074 SQ HT TDB 2TR MG 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ HT TDB 2TR MG 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-ht-tdb-2tr-mg-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick matte finish glass with edge guard",
      "European gas valve for no sim-off",
      "Strong vitreous cast iron pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Mini Triple Ring and 2 Big burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick matte finish glass with edge guard. European gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 45
  },
  {
    "id": "hobs-bh-1074-sq-ht-tdb-tr-77",
    "title": "BH 1074 SQ HT TDB TR 77",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ HT TDB TR 77",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-ht-tdb-tr-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enameled pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 47
  },
  {
    "id": "hobs-bh-1093-xl-df-ht-2tr",
    "title": "BH 1093 XL DF HT 2TR",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1093 XL DF HT 2TR",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1093-xl-df-ht-2tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous Enameled Pan Support with Flame Guard",
      "Premium Alloy Knob, Vitreous enameled drip tray",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "DFVS Forged Brass Burners with Double Ring Flame",
      "1 Triple Ring, 1 Mini Triple Ring & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 43
  },
  {
    "id": "hobs-bh-1093-xl-dft-ht-2tr",
    "title": "BH 1093 XL DFT HT 2TR",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1093 XL DFT HT 2TR",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1093-xl-dft-ht-2tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous enameled pan supports & drip tray",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Mini Triple ring & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 42
  },
  {
    "id": "hobs-bh-1093-xl-dft-ht-2tr-mg",
    "title": "BH 1093 XL DFT HT 2TR MG",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1093 XL DFT HT 2TR MG",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1093-xl-dft-ht-2tr-mg.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Matt Glass",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Cast Iron pan supports with Flame Guard",
      "Vitreous enameled drip tray",
      "European Gas Valves for no sim-off",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Mini Triple ring & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Matt Glass. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 41
  },
  {
    "id": "hobs-bh-1094-xl-df-ht-2tr",
    "title": "BH 1094 XL DF HT 2TR",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 XL DF HT 2TR",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-xl-df-ht-2tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous Enameled Pan Support with Flame Guard",
      "Premium Alloy Knob, Vitreous enameled drip tray",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "DFVS Forged Brass Burners with Double Ring Flame",
      "1 Triple Ring, 1 Mini Triple Ring, 1 Big & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 43
  },
  {
    "id": "hobs-bh-1094-xl-dft-ht-2tr",
    "title": "BH 1094 XL DFT HT 2TR",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 XL DFT HT 2TR",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-xl-dft-ht-2tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous enameled pan supports & drip tray",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Mini Triple ring, 1 Big, 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 42
  },
  {
    "id": "hobs-bh-1094-xl-dft-ht-2tr-mg",
    "title": "BH 1094 XL DFT HT 2TR MG",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 XL DFT HT 2TR MG",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-xl-dft-ht-2tr-mg.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Matt Glass",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Cast Iron pan supports with Flame Guard",
      "Vitreous enameled drip tray",
      "European Gas Valves for no sim-off",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Mini Triple ring, 1 Big, 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Matt Glass. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 41
  },
  {
    "id": "hobs-bh-1094-xl-roci-ht-dft-mg",
    "title": "BH 1094 XL ROCI HT DFT MG",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 XL ROCI HT DFT MG",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-xl-roci-ht-dft-mg.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Matt Glass",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Cast Iron pan supports with Flame Guard",
      "Vitreous enameled drip tray",
      "European Gas Valves for no sim-off",
      "Premium Alloy knobs with matching brass ring",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "High Strength 5.5 mm DFVS Total Brass Burners",
      "1 Triple ring, 1 Mini Triple Ring, 2 Big Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Matt Glass. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 39
  },
  {
    "id": "hobs-bh-1094-xl-sq-ht-tdb-2tr",
    "title": "BH 1094 XL SQ HT TDB 2TR",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 XL SQ HT TDB 2TR",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-xl-sq-ht-tdb-2tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enameled pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Mini Triple Ring and 2 Big burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 47
  },
  {
    "id": "hobs-bh-1094-xl-sq-ht-tdb-2tr-mg",
    "title": "BH 1094 XL SQ HT TDB 2TR MG",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 XL SQ HT TDB 2TR MG",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-xl-sq-ht-tdb-2tr-mg.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick matte finish glass with edge guard",
      "European gas valve for no sim-off",
      "Strong vitreous cast iron pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Mini Triple Ring and 2 Big burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick matte finish glass with edge guard. European gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 45
  },
  {
    "id": "hobs-bh-1094-xl-sq-ht-tdb-tr",
    "title": "BH 1094 XL SQ HT TDB TR",
    "category": "Hobs",
    "subcategory": "DFVS - Direct Flame Venturi System",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 XL SQ HT TDB TR",
    "tag": "DFVS - Direct Flame Venturi System",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-xl-sq-ht-tdb-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enameled pan supports",
      "Alloy knobs with matching brass ring",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Total Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 47
  },
  {
    "id": "hobs-bh-1065-tr-glass",
    "title": "BH 1065 TR GLASS",
    "category": "Hobs",
    "subcategory": "European Sealed Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1065 TR GLASS",
    "tag": "European Sealed Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1065-tr-glass.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "8 mm thick toughened glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Strong MS pan supports",
      "Stainless steel drip tray, Bakelite knobs",
      "European Sealed Burners",
      "1 Triple ring, 1 Auxiliary and 2 Semi-Rapid burners"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Integrated multi-spark auto ignition AC 230-240 V.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 56
  },
  {
    "id": "hobs-bh-1073-tr-glass",
    "title": "BH 1073 TR GLASS",
    "category": "Hobs",
    "subcategory": "European Sealed Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 TR GLASS",
    "tag": "European Sealed Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-tr-glass.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "8 mm thick toughened glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Strong MS pan supports",
      "Stainless steel drip tray, Bakelite knobs",
      "European Sealed Burners",
      "1 Triple ring, 1 Rapid and 1 Semi-Rapid burner"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Integrated multi-spark auto ignition AC 230-240 V.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 56
  },
  {
    "id": "hobs-bh-1012-ro-db",
    "title": "BH 1012 RO DB",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1012 RO DB",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1012-ro-db.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Strong vitreous enamelled round pan supports, Bakelite knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 53
  },
  {
    "id": "hobs-bh-1022-sq-ht-db",
    "title": "BH 1022 SQ HT DB",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1022 SQ HT DB",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1022-sq-ht-db.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 49
  },
  {
    "id": "hobs-bh-1063-sq-db",
    "title": "BH 1063 SQ DB",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1063 SQ DB",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1063-sq-db.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Strong vitreous enamelled round pan supports, Bakelite knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 53
  },
  {
    "id": "hobs-bh-1063-sq-ht-db-tr",
    "title": "BH 1063 SQ HT DB TR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1063 SQ HT DB TR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1063-sq-ht-db-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 49
  },
  {
    "id": "hobs-bh-1064-df-ht-tr",
    "title": "BH 1064 DF HT TR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1064 DF HT TR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1064-df-ht-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm Toughened Glass top",
      "Direct Flame Venturi System (DFVS) for uniform blue flame",
      "Vitreous enameled pan supports & drip tray",
      "Premium Alloy knobs",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "DFVS Forged Brass Burners with Double Ring Flame",
      "1 Triple ring, 1 Big & 2 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm Toughened Glass top. Direct Flame Venturi System (DFVS) for uniform blue flame.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 44
  },
  {
    "id": "hobs-bh-1064-dlx-db",
    "title": "BH 1064 DLX DB",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1064 DLX DB",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1064-dlx-db.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Strong vitreous enamelled round pan supports, Bakelite knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 53
  },
  {
    "id": "hobs-bh-1064-ro-ht-db",
    "title": "BH 1064 RO HT DB",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1064 RO HT DB",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1064-ro-ht-db.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big & 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 50
  },
  {
    "id": "hobs-bh-1065-x-ro-ht-db-65",
    "title": "BH 1065 X RO HT DB 65",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1065 X RO HT DB 65",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1065-x-ro-ht-db-65.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big & 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 50
  },
  {
    "id": "hobs-bh-1065-x-sq-ht-db-tr-65",
    "title": "BH 1065 X SQ HT DB TR 65",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1065 X SQ HT DB TR 65",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1065-x-sq-ht-db-tr-65.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 50
  },
  {
    "id": "hobs-bh-1073-sq-db",
    "title": "BH 1073 SQ DB",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 SQ DB",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-sq-db.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Strong vitreous enamelled round pan supports, Bakelite knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 54
  },
  {
    "id": "hobs-bh-1073-sq-ht-db",
    "title": "BH 1073 SQ HT DB",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 SQ HT DB",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-sq-ht-db.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 50
  },
  {
    "id": "hobs-bh-1073-sq-ht-db-70",
    "title": "BH 1073 SQ HT DB 70",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 SQ HT DB 70",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-sq-ht-db-70.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 50
  },
  {
    "id": "hobs-bh-1073-sq-ht-db-mtr",
    "title": "BH 1073 SQ HT DB MTR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 SQ HT DB MTR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-sq-ht-db-mtr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Mini Triple ring, 1 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 51
  },
  {
    "id": "hobs-bh-1073-sq-ht-db-tr",
    "title": "BH 1073 SQ HT DB TR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 SQ HT DB TR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-sq-ht-db-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 51
  },
  {
    "id": "hobs-bh-1073-sq-ht-dbbl-mtr-mg-75",
    "title": "BH 1073 SQ HT DBBL MTR MG 75",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 SQ HT DBBL MTR MG 75",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-sq-ht-dbbl-mtr-mg-75.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened matt glass",
      "Vitreous enameled Square pan support & drip tray",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "Smart & Elegant Alloy Knobs",
      "Painted Forged Brass Burner with Double Ring Flame",
      "1 Mini Triple ring, 1 Big & 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened matt glass. Vitreous enameled Square pan support & drip tray.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 48
  },
  {
    "id": "hobs-bh-1073-xl-sq-ht-db-2mtr-bl-77",
    "title": "BH 1073 XL SQ HT DB 2MTR BL 77",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 XL SQ HT DB 2MTR BL 77",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-xl-sq-ht-db-2mtr-bl-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Mini Triple ring & 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 51
  },
  {
    "id": "hobs-bh-1073-xl-sq-ht-db-tr-bl-77",
    "title": "BH 1073 XL SQ HT DB TR BL 77",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 XL SQ HT DB TR BL 77",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-xl-sq-ht-db-tr-bl-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big & 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 51
  },
  {
    "id": "hobs-bh-1074-sq-db",
    "title": "BH 1074 SQ DB",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ DB",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-db.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Strong vitreous enamelled round pan supports, Bakelite knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 54
  },
  {
    "id": "hobs-bh-1074-sq-db-tr-77",
    "title": "BH 1074 SQ DB TR 77",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ DB TR 77",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-db-tr-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big and 2 Small burners",
      "1 Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Strong vitreous enamelled round pan supports, Bakelite knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 54
  },
  {
    "id": "hobs-bh-1074-sq-ht-db",
    "title": "BH 1074 SQ HT DB",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ HT DB",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-ht-db.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "2 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 51
  },
  {
    "id": "hobs-bh-1074-sq-ht-db-2tr-77",
    "title": "BH 1074 SQ HT DB 2TR 77",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ HT DB 2TR 77",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-ht-db-2tr-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Mini Triple ring & 2 Big burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 52
  },
  {
    "id": "hobs-bh-1074-sq-ht-db-mtr",
    "title": "BH 1074 SQ HT DB MTR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ HT DB MTR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-ht-db-mtr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Mini Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 52
  },
  {
    "id": "hobs-bh-1074-sq-ht-db-tr-77",
    "title": "BH 1074 SQ HT DB TR 77",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ HT DB TR 77",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-ht-db-tr-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 52
  },
  {
    "id": "hobs-bh-1074-sq-ht-dbbl-tr-mg-77",
    "title": "BH 1074 SQ HT DBBL TR MG 77",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ HT DBBL TR MG 77",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-ht-dbbl-tr-mg-77.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened matt glass",
      "Vitreous enameled Square pan support & drip tray",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "Smart & Elegant Alloy Knobs",
      "Painted Forged Brass Burner with Double Ring Flame",
      "1 Triple Ring, 2 Big & 1 Small Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened matt glass. Vitreous enameled Square pan support & drip tray.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 48
  },
  {
    "id": "hobs-bh-1074-x-sq-ht-db-tr-70",
    "title": "BH 1074 X SQ HT DB TR 70",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 X SQ HT DB TR 70",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-x-sq-ht-db-tr-70.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 52
  },
  {
    "id": "hobs-bh-1093-xl-sq-ht-db-tr",
    "title": "BH 1093 XL SQ HT DB TR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1093 XL SQ HT DB TR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1093-xl-sq-ht-db-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 52
  },
  {
    "id": "hobs-bh-1094-sq-db-tr",
    "title": "BH 1094 SQ DB TR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 SQ DB TR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-sq-db-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Strong vitreous enamelled round pan supports, Bakelite knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 54
  },
  {
    "id": "hobs-bh-1094-sq-ht-dbbl-2tr-mg-90",
    "title": "BH 1094 SQ HT DBBL 2TR MG 90",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 SQ HT DBBL 2TR MG 90",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-sq-ht-dbbl-2tr-mg-90.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened matt glass",
      "Vitreous enameled Square pan support & drip tray",
      "Integrated Multi-spark auto ignition DC 1.5V",
      "Smart & Elegant Alloy Knobs",
      "Painted Forged Brass Burner with Double Ring Flame",
      "1 Triple Ring, 1 Mini Triple Ring & 2 Big Burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened matt glass. Vitreous enameled Square pan support & drip tray.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 48
  },
  {
    "id": "hobs-bh-1094-xl-sq-db-tr",
    "title": "BH 1094 XL SQ DB TR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 XL SQ DB TR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-xl-sq-db-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Strong vitreous enamelled round pan supports, Bakelite knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 54
  },
  {
    "id": "hobs-bh-1094-xl-sq-ht-db-tr",
    "title": "BH 1094 XL SQ HT DB TR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1094 XL SQ HT DB TR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1094-xl-sq-ht-db-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "Flexibility to use as Hob Top or Built in",
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as Hob Top or Built in. 8 mm thick toughened glass. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 53
  },
  {
    "id": "hobs-bh-1095-sq-db-tr",
    "title": "BH 1095 SQ DB TR",
    "category": "Hobs",
    "subcategory": "Forged / Double Brass Burners",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1095 SQ DB TR",
    "tag": "Forged / Double Brass Burners",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1095-sq-db-tr.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard, 5 Year on glass"
      }
    ],
    "features": [
      "8 mm thick toughened glass",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled round pan supports, Bakelite knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 2 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard, 5 Year on glass",
    "dimensions": null,
    "status": "Published",
    "description": "8 mm thick toughened glass. High precision gas valve for no sim-off. Strong vitreous enamelled round pan supports, Bakelite knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 55
  },
  {
    "id": "hobs-bh-1014-ht-ic-4z",
    "title": "BH 1014 HT IC 4Z",
    "category": "Hobs",
    "subcategory": "Induction Hob Top",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1014 HT IC 4Z",
    "tag": "Induction Hob Top",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1014-ht-ic-4z.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Flexibility to use as hob top or built in"
      }
    ],
    "features": [
      "Flexibility to use as hob top or built in",
      "Rated power: 1200+1500x2",
      "Boost Function 1500+2000x2",
      "Touch control",
      "9 Power stages",
      "Child lock control",
      "99 min. timer",
      "Overheat protection",
      "Pan Sensor"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as hob top or built in. Rated power: 1200+1500x2. Boost Function 1500+2000x2.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 59
  },
  {
    "id": "hobs-bh-1015-ht-ic-2z",
    "title": "BH 1015 HT IC 2Z",
    "category": "Hobs",
    "subcategory": "Induction Hob Top",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1015 HT IC 2Z",
    "tag": "Induction Hob Top",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1015-ht-ic-2z.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Flexibility to use as hob top or built in"
      }
    ],
    "features": [
      "Flexibility to use as hob top or built in",
      "Rated Power: 1800+1500",
      "Boost Function 2000+1500",
      "Touch control",
      "9 Power stages",
      "Child lock control",
      "99 minute Timer",
      "Overheat protection",
      "Pan Sensor"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as hob top or built in. Rated Power: 1800+1500. Boost Function 2000+1500.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 59
  },
  {
    "id": "hobs-bh-1016-ht-ic-2z-t",
    "title": "BH 1016 HT IC 2Z T",
    "category": "Hobs",
    "subcategory": "Induction Hob Top",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1016 HT IC 2Z T",
    "tag": "Induction Hob Top",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1016-ht-ic-2z-t.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Flexibility to use as hob top or built in"
      }
    ],
    "features": [
      "Flexibility to use as hob top or built in",
      "Rated Power: 2000+2000",
      "Boost Function 2200+2200",
      "Touch control",
      "9 Power stages",
      "Child lock control",
      "99 minute Timer",
      "Overheat protection",
      "Pan Sensor"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as hob top or built in. Rated Power: 2000+2000. Boost Function 2200+2200.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 59
  },
  {
    "id": "hobs-bh-1017-ht-ic-2z",
    "title": "BH 1017 HT IC 2Z",
    "category": "Hobs",
    "subcategory": "Induction Hob Top",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1017 HT IC 2Z",
    "tag": "Induction Hob Top",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1017-ht-ic-2z.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Flexibility to use as hob top or built in"
      }
    ],
    "features": [
      "Flexibility to use as hob top or built in",
      "Rated Power: 2000+1500",
      "Touch control",
      "9 Power stages",
      "Child lock control",
      "99 minute Timer",
      "Overheat protection",
      "Pan Sensor"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Flexibility to use as hob top or built in. Rated Power: 2000+1500. Touch control.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 59
  },
  {
    "id": "hobs-bh-1061-db-tr-ss",
    "title": "BH 1061 DB TR SS",
    "category": "Hobs",
    "subcategory": "Stainless Steel Finish",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1061 DB TR SS",
    "tag": "Stainless Steel Finish",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1061-db-tr-ss.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard"
      }
    ],
    "features": [
      "Stainless Steel Body",
      "High precision gas valve for no sim-off",
      "Strong Mild Steel pan supports, Bakelite Knobs",
      "Integrated multi-spark auto ignition AC 230-240 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Triple ring, 2 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard",
    "dimensions": null,
    "status": "Published",
    "description": "Stainless Steel Body. High precision gas valve for no sim-off. Strong Mild Steel pan supports, Bakelite Knobs.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 55
  },
  {
    "id": "hobs-bh-1073-sq-ht-ss-db-mtr-70",
    "title": "BH 1073 SQ HT SS DB MTR 70",
    "category": "Hobs",
    "subcategory": "Stainless Steel Finish",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1073 SQ HT SS DB MTR 70",
    "tag": "Stainless Steel Finish",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1073-sq-ht-ss-db-mtr-70.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard"
      }
    ],
    "features": [
      "Stainless Steel Body",
      "Flexibility to use as Hob Top or Built in",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports",
      "Smart & Elegant Alloy Knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Mini Triple ring, 1 Big and 1 Small burner"
    ],
    "warranty": "2 Year standard",
    "dimensions": null,
    "status": "Published",
    "description": "Stainless Steel Body. Flexibility to use as Hob Top or Built in. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 55
  },
  {
    "id": "hobs-bh-1074-sq-ht-ss-db-mtr-70",
    "title": "BH 1074 SQ HT SS DB MTR 70",
    "category": "Hobs",
    "subcategory": "Stainless Steel Finish",
    "brand": "GLEN APPLIANCES",
    "model": "BH 1074 SQ HT SS DB MTR 70",
    "tag": "Stainless Steel Finish",
    "tagColor": "bg-tertiary-container text-on-tertiary-container",
    "image": "assets/products/hobs/hobs-bh-1074-sq-ht-ss-db-mtr-70.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Warranty",
        "value": "2 Year standard"
      }
    ],
    "features": [
      "Stainless Steel Body",
      "Flexibility to use as Hob Top or Built in",
      "High precision gas valve for no sim-off",
      "Strong vitreous enamelled pan supports",
      "Smart & Elegant Alloy Knobs",
      "Integrated multi-spark auto ignition DC 1.5 V",
      "Forged Brass Burner with Double Ring Flame",
      "1 Mini Triple ring, 1 Big and 2 Small burners"
    ],
    "warranty": "2 Year standard",
    "dimensions": null,
    "status": "Published",
    "description": "Stainless Steel Body. Flexibility to use as Hob Top or Built in. High precision gas valve for no sim-off.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 55
  },
  {
    "id": "dishwashers-dw-5201-fs",
    "title": "DW 5201 FS",
    "category": "Dishwashers",
    "subcategory": "Free-standing",
    "brand": "GLEN APPLIANCES",
    "model": "DW 5201 FS",
    "tag": "Free-standing",
    "tagColor": "bg-secondary-container text-on-secondary-container",
    "image": "assets/products/dishwashers/dishwashers-dw-5201-fs.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Free-standing dishwasher"
      }
    ],
    "features": [
      "Free-standing dishwasher",
      "12 place settings",
      "Self-cleaning filter system",
      "2 racks, upper & lower spray arms",
      "Concealed heating element",
      "24-hours delay timer",
      "Programs: Intensive->Universal->ECO->Glass->90 Min->Rapid",
      "Functions: On/Off, Half Load, Child Lock, Delay, Start/Pause",
      "Stainless steel panel with electronic controls",
      "Child safety lock for added protection",
      "Upper & lower spray arms"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Free-standing dishwasher. 12 place settings. Self-cleaning filter system.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 35
  },
  {
    "id": "dishwashers-dw-7735-m",
    "title": "DW 7735 M",
    "category": "Dishwashers",
    "subcategory": "Semi Built-in",
    "brand": "GLEN APPLIANCES",
    "model": "DW 7735 M",
    "tag": "Semi Built-in",
    "tagColor": "bg-secondary-container text-on-secondary-container",
    "image": "assets/products/dishwashers/dishwashers-dw-7735-m.png",
    "price": "Contact showroom for price",
    "specs": [
      {
        "label": "Highlight",
        "value": "Semi Built-in Dishwasher"
      }
    ],
    "features": [
      "Semi Built-in Dishwasher",
      "14 Place Settings",
      "Self-cleaning Filter System",
      "3 Racks: Upper, Lower & Top Spray Arm",
      "Concealed Heating Element",
      "Improved Energy Efficiency",
      "Functions: Power, Dual Zone Wash, Delay, Child Lock, Program,",
      "Stainless Steel Panel with Electronic Controls",
      "Child safety lock for added protection"
    ],
    "warranty": null,
    "dimensions": null,
    "status": "Published",
    "description": "Semi Built-in Dishwasher. 14 Place Settings. Self-cleaning Filter System.",
    "sourcePdf": "GLEN-source-catalogue.pdf",
    "sourcePage": 35
  }
];

const IMAGE_PRESETS = [
  {
    "label": "Auto Clean Chimneys — CH 6052 DI BL AC",
    "category": "Chimneys",
    "url": "assets/products/chimneys/chimneys-ch-6052-di-bl-ac.png"
  },
  {
    "label": "Auto Clean Chimneys — CH 6052 HSR BL AC",
    "category": "Chimneys",
    "url": "assets/products/chimneys/chimneys-ch-6052-hsr-bl-ac.png"
  },
  {
    "label": "Built-in Ovens — BO 651 MR+TURBO BLACK",
    "category": "Ovens",
    "url": "assets/products/ovens/ovens-bo-651-mr-turbo-black.png"
  },
  {
    "label": "Built-in Ovens — BO 652 TOUCH MR+TURBO BLACK",
    "category": "Ovens",
    "url": "assets/products/ovens/ovens-bo-652-touch-mr-turbo-black.png"
  },
  {
    "label": "Built-in Microwaves — MO 671",
    "category": "Microwaves",
    "url": "assets/products/microwaves/microwaves-mo-671.png"
  },
  {
    "label": "Built-in Microwaves — MO 674 BLACK",
    "category": "Microwaves",
    "url": "assets/products/microwaves/microwaves-mo-674-black.png"
  },
  {
    "label": "Cooking Range — CR 2011 SS TR",
    "category": "Gas Stoves",
    "url": "assets/products/gas-stoves/gas-stoves-cr-2011-ss-tr.png"
  },
  {
    "label": "Cooking Range — CR 2012 PL TR CB AI",
    "category": "Gas Stoves",
    "url": "assets/products/gas-stoves/gas-stoves-cr-2012-pl-tr-cb-ai.png"
  },
  {
    "label": "Built-in Induction Hobs — BH 1014 IC 4Z",
    "category": "Hobs",
    "url": "assets/products/hobs/hobs-bh-1014-ic-4z.png"
  },
  {
    "label": "Built-in Induction Hobs — BH 1015 IC 2Z",
    "category": "Hobs",
    "url": "assets/products/hobs/hobs-bh-1015-ic-2z.png"
  },
  {
    "label": "Free-standing — DW 5201 FS",
    "category": "Dishwashers",
    "url": "assets/products/dishwashers/dishwashers-dw-5201-fs.png"
  },
  {
    "label": "Semi Built-in — DW 7735 M",
    "category": "Dishwashers",
    "url": "assets/products/dishwashers/dishwashers-dw-7735-m.png"
  }
];

const STORAGE_KEY = "mm_kitchen_world_catalog_v2";

window.ProductsStore = {
  IMAGE_PRESETS,

  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.resetToDefaults();
        return DEFAULT_PRODUCTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn("Error reading catalog storage:", e);
      return DEFAULT_PRODUCTS;
    }
  },

  getPublished() {
    return this.getAll().filter(p => p.status === "Published" || !p.status);
  },

  getById(id) {
    return this.getAll().find(p => p.id === id);
  },

  save(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent("catalog-updated", { detail: products }));
  },

  isDuplicateModel(model, excludeId) {
    if (!model) return false;
    const normalized = model.trim().toUpperCase();
    return this.getAll().some(p =>
      p.id !== excludeId && (p.model || "").trim().toUpperCase() === normalized
    );
  },

  add(productData) {
    const products = this.getAll();
    const newProduct = {
      id: "prod-" + Date.now(),
      title: productData.title || "Untitled Product",
      category: productData.category || "Chimneys",
      brand: productData.brand || "GLEN APPLIANCES",
      model: productData.model || "MODEL-" + Math.floor(1000 + Math.random() * 9000),
      tag: productData.tag || "New Arrival",
      tagColor: productData.tagColor || "bg-primary text-on-primary",
      image: productData.image || IMAGE_PRESETS[0].url,
      price: productData.price || "Contact showroom for price",
      specs: productData.specs && productData.specs.length ? productData.specs : [
        { label: "Warranty", value: "1 Year Official" },
        { label: "Material", value: "Premium Grade" },
        { label: "Finish", value: "Matte Black & Glass" }
      ],
      status: productData.status || "Published",
      description: productData.description || ""
    };
    products.unshift(newProduct);
    this.save(products);
    return newProduct;
  },

  update(id, updatedFields) {
    const products = this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.save(products);
      return products[index];
    }
    return null;
  },

  delete(id) {
    let products = this.getAll();
    products = products.filter(p => p.id !== id);
    this.save(products);
    return products;
  },

  resetToDefaults() {
    this.save(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  }
};
