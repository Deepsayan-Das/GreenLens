import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/welcome(.*)", // ✅ Make /welcome public
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = auth();
  const url = new URL(request.url);

  // ✅ If signed out and visiting the root "/", redirect to /welcome
  if (!userId && url.pathname === "/") {
    url.pathname = "/welcome";
    return Response.redirect(url);
  }

  // ✅ Protect all non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
