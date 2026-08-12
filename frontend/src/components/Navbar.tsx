import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext.tsx";
import { Menu, X, LogOut, LayoutDashboard, ShieldCheck, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { user, logout, setAuthModalOpen, theme, toggleTheme } = useAppContext();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Reference for the user dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu and dropdown when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dashboard / bookings button
  const handleDashboardClick = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      setDropdownOpen(false);
      navigate("/dashboard");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-surface-container-lowest/95 backdrop-blur-md h-16 shadow-sm border-b border-outline-variant/20"
          : "bg-transparent h-20 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6 md:px-10">
        {/* Logo */}
        <div className="flex items-center gap-12">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Logo"
              className={`h-8.5 transition-all ${
                theme === "dark"
                  ? scrolled
                    ? "brightness-200"
                    : location.pathname === "/"
                    ? "invert"
                    : "brightness-200"
                  : scrolled || (location.pathname === "/" && "invert")
              }`}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              to="/"
              className={`text-sm transition-colors pb-1 border-b-2 cursor-pointer ${
                location.pathname === "/"
                  ? scrolled
                    ? "text-secondary border-secondary"
                    : "text-white border-white"
                  : scrolled || location.pathname !== "/"
                    ? "text-on-surface/70 hover:text-on-surface border-transparent"
                    : "text-white/80 hover:text-white border-transparent"
              }`}
            >
              Discover
            </Link>

            <Link
              to="/search"
              className={`text-sm transition-colors pb-1 border-b-2 border-transparent cursor-pointer ${
                location.pathname.startsWith("/search")
                  ? "text-secondary border-secondary"
                  : scrolled || location.pathname !== "/"
                    ? "text-on-surface/70 hover:text-on-surface"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Restaurants
            </Link>

            <button
              onClick={handleDashboardClick}
              className={`text-sm transition-colors pb-1 border-b-2 border-transparent cursor-pointer text-left ${
                location.pathname === "/dashboard"
                  ? "text-secondary border-secondary"
                  : scrolled || location.pathname !== "/"
                    ? "text-on-surface/70 hover:text-on-surface"
                    : "text-white/80 hover:text-white"
              }`}
            >
              My Bookings
            </button>
          </div>
        </div>

        {/* Auth Actions & Theme Toggle - Desktop */}
        <div className="hidden md:flex items-center gap-5">
          {/* Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors cursor-pointer border border-outline-variant/30 ${
              scrolled || location.pathname !== "/"
                ? "text-on-surface hover:bg-surface-container-low"
                : "text-white hover:bg-white/10 border-white/20"
            }`}
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {user ? (
            <div ref={dropdownRef} className="relative">
              {/* User Button */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2 text-sm transition-colors cursor-pointer ${
                  scrolled || location.pathname !== "/"
                    ? "text-secondary"
                    : "text-white"
                }`}
              >
                <span className="size-7 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center text-xs uppercase font-medium">
                  {user.name.charAt(0)}
                </span>

                <span className="max-w-[120px] truncate font-medium">
                  {user.name.split(" ")[0]}
                </span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant/30 ambient-shadow rounded-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Information */}
                  <div className="px-4 py-2 border-b border-outline-variant/10">
                    <p className="text-sm text-on-surface font-medium truncate">{user.name}</p>

                    <p className="text-xs text-on-surface/60 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* My Bookings */}
                  <button
                    onClick={handleDashboardClick}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-on-surface/80 hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer text-left"
                  >
                    <LayoutDashboard size={14} />
                    My Bookings
                  </button>

                  {/* Admin Panel */}
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-on-surface/80 hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                    >
                      <ShieldCheck size={14} />
                      Admin Panel
                    </Link>
                  )}

                  {/* Owner Panel */}
                  {user.role === "owner" && (
                    <Link
                      to="/owner/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-on-surface/80 hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                    >
                      <ShieldCheck size={14} />
                      Owner Panel
                    </Link>
                  )}

                  {/* Sign Out */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-error hover:bg-error-container/20 transition-colors border-t border-outline-variant/10 text-left cursor-pointer font-medium"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Sign In */}
              <button
                onClick={() => setAuthModalOpen(true)}
                className={`text-sm transition-colors cursor-pointer ${
                  scrolled || location.pathname !== "/"
                    ? "text-on-surface/80 hover:text-on-surface"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Sign In
              </button>

              {/* Sign Up */}
              <button
                onClick={() => setAuthModalOpen(true)}
                className={`text-xs font-medium tracking-wider uppercase px-5 py-2.5 transition-soft cursor-pointer ${
                  scrolled || location.pathname !== "/"
                    ? "bg-primary text-on-primary hover:bg-secondary hover:text-white"
                    : "bg-white text-black hover:bg-secondary hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu & Theme Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors cursor-pointer border border-outline-variant/30 ${
              scrolled || location.pathname !== "/"
                ? "text-on-surface hover:bg-surface-container-low"
                : "text-white hover:bg-white/10 border-white/20"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`p-2 transition-colors cursor-pointer ${
              scrolled || location.pathname !== "/"
                ? "text-on-surface"
                : "text-white"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-surface-container-lowest border-b border-outline-variant/20 py-6 px-6 z-50 ambient-shadow flex flex-col gap-5 animate-in slide-in-from-top duration-300">
          <Link to="/" className="text-base text-on-surface hover:text-secondary">
            Discover
          </Link>

          <Link
            to="/search"
            className="text-base text-on-surface hover:text-secondary"
          >
            Restaurants
          </Link>

          <button
            onClick={handleDashboardClick}
            className="text-base text-on-surface hover:text-secondary text-left cursor-pointer"
          >
            Reservations
          </button>

          <div className="border-t border-outline-variant/10 my-2"></div>

          {user ? (
            <div className="flex flex-col gap-4">
              {/* Mobile User Info */}
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm uppercase font-medium">
                  {user.name.charAt(0)}
                </span>

                <div>
                  <p className="text-sm text-on-surface font-medium">{user.name}</p>

                  <p className="text-xs text-on-surface/60">{user.email}</p>
                </div>
              </div>

              {/* My Bookings */}
              <Link
                to="/dashboard"
                className="text-sm font-medium text-on-surface/80 hover:text-on-surface"
              >
                My Bookings
              </Link>

              {/* Admin */}
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="text-sm font-medium text-on-surface/80 hover:text-on-surface"
                >
                  Admin Console
                </Link>
              )}

              {/* Owner */}
              {user.role === "owner" && (
                <Link
                  to="/owner/dashboard"
                  className="text-sm font-medium text-on-surface/80 hover:text-on-surface"
                >
                  Owner Console
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-error text-left cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Mobile Sign In */}
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-full border border-outline-variant/50 text-on-surface text-center py-3 text-sm font-medium hover:border-secondary cursor-pointer"
              >
                Sign In
              </button>

              {/* Mobile Sign Up */}
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-full bg-primary text-on-primary text-center py-3 text-xs font-medium tracking-widest uppercase hover:bg-secondary hover:text-white cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

