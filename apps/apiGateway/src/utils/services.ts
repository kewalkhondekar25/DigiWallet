interface Services {
  route: string;
  target: string;
}

export const services: Services[] = [
  {
    route: "/auth",
    target: "http://127.0.0.1:8080"
  }
];