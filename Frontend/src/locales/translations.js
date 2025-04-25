// src/locales/translations.js

export const translations = {
    // ==================================
    // English Translations
    // ==================================
    en: {
      appName: "EasyRentX",
      appSubtitle: "Smart Renting Made Simple",
      nav: {
        home: "Home",
        browse: "Browse Items",
        login: "Login",
        register: "Register",
        listYourItem: "List Your Item"
      },
      theme: {
         toggleLight: "Switch to Light Mode",
         toggleDark: "Switch to Dark Mode"
      },
      language: {
         switchToAmharic: "አማርኛ",
         switchToEnglish: "English",
         currentLanguage: "Language"
      },
      // Add to translations.en
    footer: {
      copy: "© {{year}} EasyRentX. All rights reserved.",
      about: "About Us",
      contact: "Contact", // Example
      terms: "Terms of Service" // Example
    },
      home: {
        heroTitle: "Rent Anything, Anytime, Anywhere",
        heroSubtitle: "Connect with owners and rent items hassle-free.",
         searchPlaceholder: "Search for cars, houses, tools...",
         searchButton: "Search",
         howItWorks: "How It Works",
         step1: "Browse & Find",
         step1Desc: "Explore a wide variety of items listed by owners.",
         step2: "Book & Secure",
         step2Desc: "Request to book your desired item securely.",
         step3: "Enjoy Your Rental",
         step3Desc: "Pick up the item and enjoy your rental period.",
         featuredItemsTitle: "Featured Items"
      },
      about: {
        title: "About",
        missionTitle: "Our Mission",
        missionText: "To simplify the rental process by connecting item owners and renters through a secure, reliable, and user-friendly platform. We aim to make renting anything, from cars to cameras, a hassle-free experience facilitated by our trusted broker system.",
        howItWorksTitle: "How It Works",
        howItWorksText: "EasyRentX acts as a peer-to-peer marketplace where Owners list items and Renters can browse and book them. Our platform's Admin (Broker) oversees transactions, ensures security, and helps manage communication, providing peace of mind for both parties.",
    },
      browse: {
          title: "Browse Available Items",
          noItems: "No items found matching your criteria.",
          rentButton: "View Details"
      },
      itemCard: {
          pricePerDay: "{{price}} / day"
      },
      itemDetail: {
          rentNow: "Rent Now",
          owner: "Owner",
          description: "Description",
          price: "Price",
          perDay: "per day",
          location: "Location",
          loading: "Loading item details...",
          notFound: "Item not found.",
      },
      login: {
          demo: "Register/Login",
          title: "Login to Your Account",
          email: "Email",
          password: "Password",
          button: "Login",
          needAccount: "Need an account?",
          registerLink: "Register here"
      },
      register: {
          title: "Create an Account",
          name: "Full Name",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          button: "Register",
          haveAccount: "Already have an account?",
          loginLink: "Login here"
      },
      notFound: {
          title: "404 - Page Not Found",
          message: "Oops! The page you're looking for doesn't seem to exist.",
          goHome: "Go to Homepage"
      },
      // --- Keys added in Step 5 & 6 ---
      "Loading items...": "Loading items...",
      "Error": "Error",
      "Failed to load items. Please try again later.": "Failed to load items. Please try again later.",
      "Failed to load items in the correct format.": "Failed to load items in the correct format.",
      "Image Not Available": "Image Not Available",
      "Rental Item": "Rental Item",
      "Unnamed Item": "Unnamed Item",
      "Price N/A": "Price N/A",
      // --- End of added keys ---
    },
  
    // ==================================
    // Amharic Translations
    // ==================================
    am: {
      appName: "EasyRentX",
      appSubtitle: "ዘመናዊ ኪራይ በቀላሉ",
      nav: {
          home: "መነሻ",
          browse: "ዕቃዎች ያስሱ",
          login: "ይግቡ",
          register: "ይመዝገቡ",
          listYourItem: "ዕቃዎን ያስመዝግቡ"
      },
       theme: {
         toggleLight: "ወደ ብሩህ ገጽታ ቀይር",
         toggleDark: "ወደ ጨለማ ገጽታ ቀይር"
       },
      language: {
         switchToAmharic: "አማርኛ",
         switchToEnglish: "English",
         currentLanguage: "ቋንቋ"
      },
     
    footer: {
      copy: "© {{year}} ኢዚሬንትኤክስ። መብቱ በህግ የተጠበቀ ነው።",
      about: "ስለ እኛ",
      contact: "ያግኙን", // Example
      terms: "የአገልግሎት ውል" // Example
    },
     
      home: {
        heroTitle: "ማንኛውንም ነገር፣ በማንኛውም ጊዜ፣ በማንኛውም ቦታ ይከራዩ",
        heroSubtitle: "ከባለቤቶች ጋር ይገናኙ እና ዕቃዎችን ያለችግር ይከራዩ።",
         searchPlaceholder: "መኪና፣ ቤት፣ መሣሪያ ይፈልጉ...",
         searchButton: "ፈልግ",
         howItWorks: "እንዴት ይሰራል",
         step1: "ያስሱ እና ያግኙ",
         step1Desc: "በባለቤቶች የተዘረዘሩ የተለያዩ ዕቃዎችን ያስሱ።",
         step2: "ይያዙ እና ያስጠብቁ",
         step2Desc: "የሚፈልጉትን ዕቃ ደህንነቱ በተጠበቀ ሁኔታ ለመከራየት ይጠይቁ።",
         step3: "በኪራይዎ ይደሰቱ",
         step3Desc: "ዕቃውን ይውሰዱ እና በኪራይ ጊዜዎ ይደሰቱ።",
         featuredItemsTitle: "ተመራጭ ዕቃዎች"
      },
      about: {
        title: "ስለኛ",
        missionTitle: "ተልዕኳችን",
        missionText: "የኪራይ ሂደቱን ደህንነቱ በተጠበቀ፣ አስተማማኝ እና ለአጠቃቀም ቀላል በሆነ መድረክ አማካኝነት የዕቃ ባለቤቶችን እና ተከራዮችን በማገናኘት ቀላል ማድረግ ነው። ከመኪና እስከ ካሜራ ማንኛውንም ነገር መከራየት በአስተማማኝ የደላላ ስርዓታችን አማካኝነት ከችግር ነጻ የሆነ ተሞክሮ እንዲሆን ዓላማችን ነው።",
        howItWorksTitle: "እንዴት እንደሚሰራ",
        howItWorksText: "ኢዚሬንትኤክስ የዕቃ ባለቤቶች ዕቃዎቻቸውን የሚዘረዝሩበት እና ተከራዮች ማሰስ እና መያዝ የሚችሉበት የአቻ ለአቻ (peer-to-peer) የገበያ ቦታ ሆኖ ያገለግላል። የመድረኩ አስተዳዳሪ (ደላላ) ግብይቶችን ይቆጣጠራል፣ ደህንነትን ያረጋግጣል፣ እና ግንኙነትን ለማስተዳደር ይረዳል፣ ይህም ለሁለቱም ወገኖች የአእምሮ ሰላም ይሰጣል።",
    },
      browse: {
          title: "ያሉትን ዕቃዎች ያስሱ",
          noItems: "ከፍለጋዎ ጋር የሚዛመድ ምንም ዕቃ አልተገኘም።",
          rentButton: "ዝርዝር ይመልከቱ"
      },
      itemCard: {
          pricePerDay: "{{price}} / ቀን"
      },
       itemDetail: {
          rentNow: "አሁን ይከራዩ",
          owner: "ባለቤት",
          description: "መግለጫ",
          price: "ዋጋ",
          perDay: "በቀን",
          location: "ቦታ",
          loading: "የዕቃውን ዝርዝር በመጫን ላይ...",
          notFound: "ዕቃው አልተገኘም።",
      },
       login: {
          title: "ወደ መለያዎ ይግቡ",
          email: "ኢሜይል",
          password: "የይለፍ ቃል",
          button: "ግባ",
          needAccount: "መለያ ይፈልጋሉ?",
          registerLink: "እዚህ ይመዝገቡ"
      },
      register: {
          title: "መለያ ይፍጠሩ",
          name: "ሙሉ ስም",
          email: "ኢሜይል",
          password: "የይለፍ ቃል",
          confirmPassword: "የይለፍ ቃል ያረጋግጡ",
          button: "ይመዝገቡ",
          haveAccount: "አስቀድመው መለያ አለዎት?",
          loginLink: "እዚህ ይግቡ"
      },
      notFound: {
          title: "404 - ገጹ አልተገኘም",
          message: "ይቅርታ! የሚፈልጉት ገጽ ያለ አይመስልም።",
          goHome: "ወደ መነሻ ገጽ ይመለሱ"
      },
      // --- Keys added in Step 5 & 6 ---
      "Loading items...": "ዕቃዎችን በመጫን ላይ...",
      "Error": "ስህተት",
      "Failed to load items. Please try again later.": "ዕቃዎችን መጫን አልተቻለም። እባክዎ ቆይተው እንደገና ይሞክሩ።",
      "Failed to load items in the correct format.": "ዕቃዎችን በትክክለኛው ፎርማት መጫን አልተቻለም።",
      "Image Not Available": "ምስል የለም",
      "Rental Item": "የኪራይ ዕቃ",
      "Unnamed Item": "ስም የሌለው ዕቃ",
      "Price N/A": "ዋጋ የለም",
       // --- End of added keys ---
    }
  };

//   // Example additions to translations.en:
// "No item ID specified.": "No item ID specified.",
// "Failed to load item details.": "Failed to load item details.",
// "Rent request submitted for": "Rent request submitted for",
// "placeholder": "placeholder",
// "Back to Browse": "Back to Browse",
// "No description available.": "No description available.",

// // Example additions to translations.am:
// "No item ID specified.": "የዕቃ መለያ አልተገለጸም።",
// "Failed to load item details.": "የዕቃውን ዝርዝር መጫን አልተቻለም።",
// "Rent request submitted for": "የኪራይ ጥያቄ ገብቷል ለ",
// "placeholder": "ጊዜያዊ",
// "Back to Browse": "ወደ ማሰሻ ተመለስ",
// "No description available.": "ምንም መግለጫ የለም።",