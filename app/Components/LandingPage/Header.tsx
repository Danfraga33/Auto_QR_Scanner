import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/remix";
import { Button } from "../ui/button";
import { Link } from "@remix-run/react";
import { Target } from "lucide-react";
const Header = () => {
  const { isLoaded, userId } = useAuth();
  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="#">
          <Target className="h-6 w-6" />
          <span className="sr-only">MarketPro</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#testimonials"
          >
            Testimonials
          </Link>

          {isLoaded ? (
            <>
              <SignedIn>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  to="/Dashboard"
                >
                  Dashboard
                </Link>
                <Button variant="secondary">
                  <SignOutButton />
                </Button>
              </SignedIn>
              <SignedOut>
                <Button variant="outline">
                  <SignInButton forceRedirectUrl="/" />
                </Button>
                <Button>
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </SignedOut>
            </>
          ) : (
            ""
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
