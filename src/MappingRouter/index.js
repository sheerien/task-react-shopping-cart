const routes = (path, componentName, exact = true) => {
  //   path = "/" || `/${componentName.toLowerCase()}`;
  return [
    {
      path: "/" || `/${componentName.toLowerCase()}`,
      component: componentName,
      exact: exact,
    },
  ];
};

export default routes;
