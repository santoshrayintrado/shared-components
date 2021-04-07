const allowedAdminRoutes = [
  {
    path: "/login/oauth/callback",
    name: "Call Back",
  },
  {
    path: "/createuser",
    name: "Create User",
  },
  {
    path: "/createEvent",
    name: "Create Event",
  },
  {
    path: "/event/[id]",
    name: "retrieve event",
  },
  {
    path: "/user",
    name: "Edit User",
  },
];

export default allowedAdminRoutes;
