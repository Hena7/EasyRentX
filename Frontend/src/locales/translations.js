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
      listYourItem: "List Your Item",
    },
    theme: {
      toggleLight: "Switch to Light Mode",
      toggleDark: "Switch to Dark Mode",
    },
    language: {
      switchToAmharic: "አማርኛ",
      switchToEnglish: "English",
      currentLanguage: "Language",
    },
    // Add to translations.en
    footer: {
      copy: "© {{year}} EasyRentX. All rights reserved.",
      about: "About Us",
      contact: "Contact", // Example
      terms: "Terms of Service", // Example
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
      featuredItemsTitle: "Featured Items",
    },
    about: {
      title: "About",
      missionTitle: "Our Mission",
      missionText:
        "To simplify the rental process by connecting item owners and renters through a secure, reliable, and user-friendly platform. We aim to make renting anything, from cars to cameras, a hassle-free experience facilitated by our trusted broker system.",
      howItWorksTitle: "How It Works",
      howItWorksText:
        "EasyRentX acts as a peer-to-peer marketplace where Owners list items and Renters can browse and book them. Our platform's Admin (Broker) oversees transactions, ensures security, and helps manage communication, providing peace of mind for both parties.",
    },
    browse: {
      title: "Browse Available Items",
      noItems: "No items found matching your criteria.",
      rentButton: "View Details",
    },
    itemCard: {
      pricePerDay: "{{price}} / day",
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
      registerLink: "Register here",
    },
    register: {
      title: "Create an Account",
      name: "Full Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      button: "Register",
      haveAccount: "Already have an account?",
      loginLink: "Login here",
    },
    notFound: {
      title: "404 - Page Not Found",
      message: "Oops! The page you're looking for doesn't seem to exist.",
      goHome: "Go to Homepage",
    },
    // --- Keys added in Step 5 & 6 ---
    "Loading items...": "Loading items...",
    Error: "Error",
    "Failed to load items. Please try again later.":
      "Failed to load items. Please try again later.",
    "Failed to load items in the correct format.":
      "Failed to load items in the correct format.",
    "Image Not Available": "Image Not Available",
    "Rental Item": "Rental Item",
    "Unnamed Item": "Unnamed Item",
    "Price N/A": "Price N/A",
    dashboard: {
      welcome: "Welcome, {{name}}!",
      profileSettingsTitle: "Profile Settings",
      editProfile: "Edit Profile",
      manageAccount: "Manage your account details and preferences.",
      viewMessages: "View Messages",
      renter: {
        title: "Renter Dashboard",
        intro: "Manage your rentals and account details here.",
        myRentalsTitle: "My Active Rentals",
        rentalHistoryTitle: "Rental History",
        messagesTitle: "Messages",
        noActiveRentals: "You have no active rentals.",
        viewRentalHistory: "View all rental history",
        unreadMessages: "You have {{count}} unread messages.",
        noHistory: "No past rentals yet.",
      },
      owner: {
        title: "Owner Dashboard",
        intro: "Manage your listed items, bookings, and earnings.",
        myListingsTitle: "My Listings",
        bookingRequestsTitle: "Booking Requests",
        earningsTitle: "Earnings",
        noListings: "You haven't listed any items yet.",
        addNewListing: "Add New Listing",
        pendingRequests: "You have {{count}} pending booking requests.",
        currentBalance: "Current Balance: {{amount}}",
        viewRequests: "View Requests",
        viewPayouts: "View Payout History",
      },
      admin: {
        title: "Admin Dashboard",
        intro:
          "Oversee platform activity and manage users, items, and transactions.",
        overviewTitle: "Platform Overview",
        userManagementTitle: "User Management",
        itemManagementTitle: "Item Management",
        transactionManagementTitle: "Transaction Management",
        totalUsers: "Total Users: {{count}}",
        activeListings: "Active Listings: {{count}}",
        completedTransactions: "Completed Transactions: {{count}}",
        pendingApprovals: "Pending Item Approvals: {{count}}",
        manageUserAccounts: "View, verify, or suspend user accounts.",
        viewUsers: "View All Users",
        overseeTransactions: "Monitor ongoing rentals and facilitate payouts.",
        viewItems: "Manage Listings",
        viewTransactions: "View All Transactions",
      },
  },
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
      listYourItem: "ዕቃዎን ያስመዝግቡ",
    },
    theme: {
      toggleLight: "ወደ ብሩህ ገጽታ ቀይር",
      toggleDark: "ወደ ጨለማ ገጽታ ቀይር",
    },
    language: {
      switchToAmharic: "አማርኛ",
      switchToEnglish: "English",
      currentLanguage: "ቋንቋ",
    },

    footer: {
      copy: "© {{year}} ኢዚሬንትኤክስ። መብቱ በህግ የተጠበቀ ነው።",
      about: "ስለ እኛ",
      contact: "ያግኙን", // Example
      terms: "የአገልግሎት ውል", // Example
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
      featuredItemsTitle: "ተመራጭ ዕቃዎች",
    },
    about: {
      title: "ስለኛ",
      missionTitle: "ተልዕኳችን",
      missionText:
        "የኪራይ ሂደቱን ደህንነቱ በተጠበቀ፣ አስተማማኝ እና ለአጠቃቀም ቀላል በሆነ መድረክ አማካኝነት የዕቃ ባለቤቶችን እና ተከራዮችን በማገናኘት ቀላል ማድረግ ነው። ከመኪና እስከ ካሜራ ማንኛውንም ነገር መከራየት በአስተማማኝ የደላላ ስርዓታችን አማካኝነት ከችግር ነጻ የሆነ ተሞክሮ እንዲሆን ዓላማችን ነው።",
      howItWorksTitle: "እንዴት እንደሚሰራ",
      howItWorksText:
        "ኢዚሬንትኤክስ የዕቃ ባለቤቶች ዕቃዎቻቸውን የሚዘረዝሩበት እና ተከራዮች ማሰስ እና መያዝ የሚችሉበት የአቻ ለአቻ (peer-to-peer) የገበያ ቦታ ሆኖ ያገለግላል። የመድረኩ አስተዳዳሪ (ደላላ) ግብይቶችን ይቆጣጠራል፣ ደህንነትን ያረጋግጣል፣ እና ግንኙነትን ለማስተዳደር ይረዳል፣ ይህም ለሁለቱም ወገኖች የአእምሮ ሰላም ይሰጣል።",
    },
    browse: {
      title: "ያሉትን ዕቃዎች ያስሱ",
      noItems: "ከፍለጋዎ ጋር የሚዛመድ ምንም ዕቃ አልተገኘም።",
      rentButton: "ዝርዝር ይመልከቱ",
    },
    itemCard: {
      pricePerDay: "{{price}} / ቀን",
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
      registerLink: "እዚህ ይመዝገቡ",
    },
    register: {
      title: "መለያ ይፍጠሩ",
      name: "ሙሉ ስም",
      email: "ኢሜይል",
      password: "የይለፍ ቃል",
      confirmPassword: "የይለፍ ቃል ያረጋግጡ",
      button: "ይመዝገቡ",
      haveAccount: "አስቀድመው መለያ አለዎት?",
      loginLink: "እዚህ ይግቡ",
    },
    notFound: {
      title: "404 - ገጹ አልተገኘም",
      message: "ይቅርታ! የሚፈልጉት ገጽ ያለ አይመስልም።",
      goHome: "ወደ መነሻ ገጽ ይመለሱ",
    },
    // --- Keys added in Step 5 & 6 ---
    "Loading items...": "ዕቃዎችን በመጫን ላይ...",
    Error: "ስህተት",
    "Failed to load items. Please try again later.":
      "ዕቃዎችን መጫን አልተቻለም። እባክዎ ቆይተው እንደገና ይሞክሩ።",
    "Failed to load items in the correct format.":
      "ዕቃዎችን በትክክለኛው ፎርማት መጫን አልተቻለም።",
    "Image Not Available": "ምስል የለም",
    "Rental Item": "የኪራይ ዕቃ",
    "Unnamed Item": "ስም የሌለው ዕቃ",
    "Price N/A": "ዋጋ የለም",
    dashboard: {
      welcome: "እንኳን ደህና መጡ፣ {{name}}!",
      profileSettingsTitle: "የመለያ ቅንብሮች",
      editProfile: "መለያ አርትዕ",
      manageAccount: "የመለያዎን ዝርዝሮች እና ምርጫዎች ያስተዳድሩ።",
      viewMessages: "መልዕክቶችን ይመልከቱ",
      renter: {
        title: "የተከራይ ዳሽቦርድ",
        intro: "የኪራዮችዎን እና የመለያ ዝርዝሮችዎን እዚህ ያስተዳድሩ።",
        myRentalsTitle: "የአሁን ኪራዮቼ",
        rentalHistoryTitle: "የኪራይ ታሪክ",
        messagesTitle: "መልዕክቶች",
        noActiveRentals: "ምንም የአሁን ኪራይ የለዎትም።",
        viewRentalHistory: "ሁሉንም የኪራይ ታሪክ ይመልከቱ",
        unreadMessages: "{{count}} ያላነበቧቸው መልዕክቶች አሉዎት።",
        noHistory: "ምንም ያለፈ ኪራይ የለም።",
      },
      owner: {
        title: "የባለቤት ዳሽቦርድ",
        intro: "የተዘረዘሩ ዕቃዎችዎን፣ የተያዙ ቦታዎችን እና ገቢዎችዎን ያስተዳድሩ።",
        myListingsTitle: "የእኔ ዝርዝሮች",
        bookingRequestsTitle: "የቦታ ማስያዣ ጥያቄዎች",
        earningsTitle: "ገቢዎች",
        noListings: "ምንም ዕቃ እስካሁን አልዘረዘሩም።",
        addNewListing: "አዲስ ዝርዝር አክል",
        pendingRequests: "{{count}} በመጠባበቅ ላይ ያሉ የቦታ ማስያዣ ጥያቄዎች አሉዎት።",
        currentBalance: "የአሁኑ ቀሪ ሂሳብ: {{amount}}",
        viewRequests: "ጥያቄዎችን ይመልከቱ",
        viewPayouts: "የክፍያ ታሪክን ይመልከቱ",
      },
      admin: {
        title: "የአስተዳዳሪ ዳሽቦርድ",
        intro: "የመድረክ እንቅስቃሴን ይቆጣጠሩ እና ተጠቃሚዎችን፣ ዕቃዎችን እና ግብይቶችን ያስተዳድሩ።",
        overviewTitle: "የመድረክ አጠቃላይ እይታ",
        userManagementTitle: "የተጠቃሚ አስተዳደር",
        itemManagementTitle: "የዕቃ አስተዳደር",
        transactionManagementTitle: "የግብይት አስተዳደር",
        totalUsers: "ጠቅላላ ተጠቃሚዎች: {{count}}",
        activeListings: "በስራ ላይ ያሉ ዝርዝሮች: {{count}}",
        completedTransactions: "የተጠናቀቁ ግብይቶች: {{count}}",
        pendingApprovals: "ማጽደቅ የሚጠብቁ ዕቃዎች: {{count}}",
        manageUserAccounts: "የተጠቃሚ መለያዎችን ይመልከቱ፣ ያረጋግጡ ወይም ያግዱ።",
        viewUsers: "ሁሉንም ተጠቃሚዎች ይመልከቱ",
        overseeTransactions: "በሂደት ላይ ያሉ ኪራዮችን ይቆጣጠሩ እና ክፍያዎችን ያመቻቹ።",
        viewItems: "ዝርዝሮችን ያስተዳድሩ",
        viewTransactions: "ሁሉንም ግብይቶች ይመልከቱ",
      },
  },
  },
};
