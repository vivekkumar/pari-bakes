const allLinks = {
  manageuUsers: {
    title: "Manage Users",
    url: "/manageusers",
    id: "manageuser"
  },
  dashboard: { title: "Dashboard", url: "/", id: "dashboard" },
  manageMenus: { title: "Manage Menus", url: "/menus", id: "managemenu" },
  manageOrders: { title: "Manage Orders", url: "/orders", id: "orders" },
  manageCart: { title: "Cart", url: "/cart", id: "cart" },
  tractYourOrders: {
    title: "Your Orders",
    url: "/your-orders",
    id: "your-orders"
  }
};

const singnedLinks = [
  {
    links: [
      allLinks.dashboard,
      allLinks.manageuUsers,
      allLinks.manageMenus,
      allLinks.manageOrders
    ]
  },
  {
    links: [allLinks.dashboard, allLinks.manageMenus, allLinks.manageOrders]
  },
  {
    links: [allLinks.manageCart, allLinks.tractYourOrders]
  }
];

export default {
  getLinks: userProfile => {
    return (
      userProfile.isLoaded &&
      singnedLinks[userProfile.type] &&
      singnedLinks[userProfile.type].links
    );
  }
};
