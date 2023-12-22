// middleware.js
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Define the supported locales and the default locale
let locales = ['en', 'bg'];
let defaultLocale = 'en';

// Function to get the preferred locale from the request
//@ts-ignore
function getLocale(request) {
  try {
    let headers = request.headers;
    let negotiator = new Negotiator({ headers });
    let languages = negotiator.languages();

    // Ensure that languages is an array and not null
    if (!languages || !languages.length) {
      return defaultLocale;
    }

    // Use the match function to find the best match between supported and requested languages
    return match(languages, locales, defaultLocale);
  } catch (error) {
    console.error('Error determining the locale:', error);
    return defaultLocale; // Fallback to the default locale in case of an error
  }
}


// Middleware to handle locale redirection
//@ts-ignore
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If the pathname already has a supported locale, no action is needed
  if (pathnameHasLocale) return;

  // If there is no locale in the pathname, determine the preferred locale and redirect
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // For example, an incoming request to /products will be redirected to /en/products or /bg/products
  return Response.redirect(request.nextUrl);
}

// Configuration for the middleware, specifying which paths it should apply to
export const config = {
  matcher: [
    // Apply the middleware to all paths except those starting with _next
    '/:path((?!_next|.*\\.(?:png|ico|jpg|jpeg|svg|gif)).*)',
    // Optional: uncomment to only run on the root URL
    // '/'
  ],
};
