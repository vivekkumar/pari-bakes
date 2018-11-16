const allLinks = {
  manageuUsers: { title: "Manage Users", url: "/manageusers" },
  dashboard: { title: "Dashboard", url: "/" },
  manageMenus: { title: "Manage Menu", url: "/managemenu" },
  manageOrders: { title: "Manage Orders", url: "/orders" },
  manageCart: { title: "Cart", url: "/cart" }
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
    links: [allLinks.manageCart]
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
