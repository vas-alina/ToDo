export const routesNames = {
  HOME: "Home",
  TODO_ITEM: "Todo Item",
  NOT_FOUND: "Not Found",
};

export const appRoutes = {
  [routesNames.HOME]: "/",
  [routesNames.TODO_ITEM]: "/todo/:id",
  [routesNames.NOT_FOUND]: "*",
};
