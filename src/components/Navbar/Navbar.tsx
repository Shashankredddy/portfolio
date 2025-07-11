import React, { useState, useEffect } from "react";
import type { NavItem } from "../../types";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

  const setAboutTab = (tab: "about" | "experience" | "skills") => {
    // First dispatch the event to change the tab
    const event = new CustomEvent("setAboutTab", { detail: tab });
    window.dispatchEvent(event);

    // Then scroll to about section
    setTimeout(() => {
      const aboutElement = document.getElementById("about");
      if (aboutElement) {
        const offsetTop =
          aboutElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }, 100);
  };

  const navItems: NavItem[] = [
    { label: "Home", href: "#home" },
    {
      label: "About",
      href: "#about",
      dropdown: [
        {
          label: "About Me",
          href: "#about-me",
          action: () => setAboutTab("about"),
        },
        {
          label: "Experience",
          href: "#experience",
          action: () => setAboutTab("experience"),
        },
        {
          label: "Technical Skills",
          href: "#technical-skills",
          action: () => setAboutTab("skills"),
        },
      ],
    },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.slice(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Shashank Reddy Pasham</h2>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        <ul className={`navbar-nav ${isMobileMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <li
              key={item.label}
              className={`nav-item ${item.dropdown ? "has-dropdown" : ""}`}
              onMouseEnter={() =>
                item.dropdown &&
                !isMobileMenuOpen &&
                setHoveredDropdown(item.label)
              }
              onMouseLeave={() => !isMobileMenuOpen && setHoveredDropdown(null)}
            >
              <a
                href={item.href}
                className={`nav-link ${
                  activeSection === item.href.slice(1) ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (!item.dropdown) {
                    scrollToSection(item.href);
                  } else {
                    if (isMobileMenuOpen) {
                      // On mobile, toggle dropdown instead of scrolling
                      setHoveredDropdown(
                        hoveredDropdown === item.label ? null : item.label
                      );
                    } else {
                      scrollToSection(item.href);
                    }
                  }
                }}
              >
                {item.label}
                {item.dropdown && <span className="dropdown-arrow">▼</span>}
              </a>

              {item.dropdown &&
                (hoveredDropdown === item.label ||
                  (isMobileMenuOpen && hoveredDropdown === item.label)) && (
                  <ul className="dropdown-menu">
                    {item.dropdown.map((dropdownItem) => (
                      <li key={dropdownItem.label} className="dropdown-item">
                        <a
                          href={dropdownItem.href}
                          className="dropdown-link"
                          onClick={(e) => {
                            e.preventDefault();
                            if (dropdownItem.action) {
                              dropdownItem.action();
                            } else {
                              scrollToSection(dropdownItem.href);
                            }
                            setHoveredDropdown(null);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {dropdownItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
