export const guestLinks = [
    { link: "/", name: "Home" },
    // { link: "/sign-up", name: "Sign Up" },
    { link: "/landing-signin", name: "Sign In" },
  ];
export const userLinks = [
    { link: "/", name: "Home" },
    { link: "/rentals", name: "Rental Listing" },
    { link: "/bookings", name: "Bookings" },
    { link: "/bookmarks", name: "Bookmarks" },
    { link: "/about-us", name: "About us" },
  ];
export const adminLinks = [
    { link: "/dashboard", name: "Dashboard" },
    { link: "/listing", name: "Listing" },
    { link: "/admin-bookings", name: "Bookings" },
    { link: "/payment-records", name: "Payments" },
    { link: "/stats", name: "Statistics" },
    { link: "/about-us", name: "About us" },
  ];

  export const getActiveStyles = (isActive, name) => {
    const baseStyles = {
      borderBottom: "2px solid transparent",
      transition: "border-color 0.3s",
      padding: "0.2rem 0.6rem",
    };

    if (isActive) {
      return {
        ...baseStyles,
        backgroundColor: "#105f42",
        color: "white",
        borderRadius: "5px",
      };
    }

    if (name === "Sign Up") {
      return {
        ...baseStyles,
        color: "white",
        backgroundColor: "black",
        borderRadius: "5px",
      };
    }

    return baseStyles;
  };

  