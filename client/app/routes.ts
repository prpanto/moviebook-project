import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("./routes/landing/home.tsx"),
  route("/movie/:id", "./routes/landing/movies/detail.tsx"),
] satisfies RouteConfig
