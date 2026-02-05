import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  redirects: [
    routes.redirect("/youtube", "https://youtube.com/@shivamhwp_"),
    routes.redirect("/github", "https://github.com/shivamhwp"),
    routes.redirect("/twitter", "https://x.com/shivamhwp"),
    routes.redirect("/ai", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
  ],
};
