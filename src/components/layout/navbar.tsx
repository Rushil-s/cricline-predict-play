
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Home, TrendingUp, Users, Award, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Matches", href: "/matches", icon: TrendingUp },
    { name: "My Teams", href: "/my-teams", icon: Users },
    { name: "Prediction Zone", href: "/predictions", icon: TrendingUp },
    { name: "Leaderboard", href: "/leaderboard", icon: Award },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-30">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-cricblue-500">TheCricLine</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                isActive(item.href)
                  ? "bg-cricblue-50 text-cricblue-800 font-medium"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-cricblue-500">{user.cricpoints}</span> CricPoints
              </div>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {user.username}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Link to="/login">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="grid gap-6 py-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Menu</span>
                  {user && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-cricblue-500">{user.cricpoints}</span> CricPoints
                    </div>
                  )}
                </div>

                <nav className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center px-3 py-3 text-sm rounded-md transition-colors",
                        isActive(item.href)
                          ? "bg-cricblue-50 text-cricblue-800 font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="border-t pt-4 space-y-3">
                  {user ? (
                    <>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          {user.username}
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}>
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="default" size="sm" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full">
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
