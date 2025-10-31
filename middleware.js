import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/welcome(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const url = new URL(req.url);

  // ✅ 1. Redirect signed-out users at "/" to /welcome
  if (!userId && url.pathname === "/") {
    url.pathname = "/welcome";
    return Response.redirect(url);
  }

  // ✅ 2. Protect all routes that aren't public
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  // ✅ 3. Always return nothing (Clerk handles continuation)
  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
