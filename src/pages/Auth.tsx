
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type AuthMode = "sign-in" | "sign-up";

const Auth = ({ mode = "sign-in" }: { mode?: AuthMode }) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            {mode === "sign-in" ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {mode === "sign-in" 
              ? "Sign in to access your projects" 
              : "Create an account to start building"
            }
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg border border-border/60">
          {mode === "sign-in" ? (
            <>
              <SignIn redirectUrl="/" />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => navigate("/sign-up")}
                  >
                    Sign up
                  </Button>
                </p>
              </div>
            </>
          ) : (
            <>
              <SignUp redirectUrl="/" />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => navigate("/sign-in")}
                  >
                    Sign in
                  </Button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
