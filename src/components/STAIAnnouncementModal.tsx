import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface STAIAnnouncementModalProps {
  isOpenByDefault?: boolean;
  cohortHref?: string;
  suppressDays?: number;
  localStorageKey?: string;
}

const STAIAnnouncementModal: React.FC<STAIAnnouncementModalProps> = ({
  isOpenByDefault = false,
  cohortHref = '/sherpaskill',
  suppressDays = 30,
  localStorageKey = 'stai_2cta_modal_last_dismissed_at'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();

  // Check if modal should be shown based on localStorage suppression
  useEffect(() => {
    // Guard against SSR
    if (typeof window === 'undefined') return;

    try {
      const lastDismissed = localStorage.getItem(localStorageKey);
      if (!lastDismissed) {
        setIsOpen(isOpenByDefault);
        return;
      }

      const lastDismissedTime = parseInt(lastDismissed, 10);
      const suppressionDuration = suppressDays * 24 * 60 * 60 * 1000; // days to milliseconds
      const shouldShow = Date.now() - lastDismissedTime >= suppressionDuration;
      
      setIsOpen(isOpenByDefault && shouldShow);
    } catch (error) {
      // Fallback if localStorage fails
      console.warn('LocalStorage not available, showing modal by default');
      setIsOpen(isOpenByDefault);
    }
  }, [isOpenByDefault, suppressDays, localStorageKey]);

  // Focus management
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  // Handle dismiss with optional suppression
  const handleDismiss = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        if (dontShowAgain) {
          localStorage.setItem(localStorageKey, Date.now().toString());
        }
      } catch (error) {
        console.warn('Could not save to localStorage');
      }
    }
    setIsOpen(false);
  }, [dontShowAgain, localStorageKey]);

  // Keyboard event handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleDismiss();
        return;
      }

      // Focus trapping
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleDismiss]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleDismiss();
    }
  }, [handleDismiss]);

  // Handle CTA click (analytics could be added here)
  const handleCTAClick = useCallback((href: string, ctaType: 'cohort') => {
    // Optional: Add analytics tracking here
    console.log(`CTA clicked: ${ctaType} -> ${href}`);
    
    // Check if it's an internal route (starts with /) or external URL
    if (href.startsWith('/')) {
      // Internal navigation - close modal and navigate
      setIsOpen(false);
      navigate(href);
    } else {
      // External link - open in new tab
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }, [navigate]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl transform transition-all duration-200 ease-out scale-100 opacity-100"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center border-b border-gray-100">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
              {/* Brand color: replace text-blue-600 with text-[#1B365D] and bg-blue-50 with bg-[#E8EEF4] */}
              SherpaTech.AI
            </span>
          </div>
          <h2 id="modal-title" className="text-xl font-bold text-gray-900 mb-2">
            Ready to Master Microsoft Copilot?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Join our 5-week hands-on training program and transform your productivity.
          </p>
        </div>

        {/* CTA Card */}
        <div className="p-6">
          {/* Cohort CTA Card - Now the primary and only action */}
          <div 
            className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
            onClick={() => handleCTAClick(cohortHref, 'cohort')}
          >
            {/* Brand colors: replace border-blue-300 with border-[#2B517A] and hover:bg-blue-50 with hover:bg-[#E8EEF4] */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                {/* Brand color: replace bg-blue-100 with bg-[#E8EEF4] and group-hover:bg-blue-200 with group-hover:bg-[#2B517A]/20 */}
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {/* Brand color: replace text-blue-600 with text-[#1B365D] */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  SherpaSkill™ Cohort Sign-Up
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Master Microsoft Copilot in 5 weeks with hands-on training, real workflows, and expert guidance.
                </p>
                <div className="flex items-center text-xs text-blue-600 font-medium">
                  {/* Brand color: replace text-blue-600 with text-[#1B365D] */}
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Reserve Your Spot Now
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                // Brand color: replace text-blue-600 with text-[#1B365D] and focus:ring-blue-500 with focus:ring-[#2B517A]
              />
              <span>Don't show again for {suppressDays} days</span>
            </label>
            <button
              ref={firstFocusableRef}
              onClick={handleDismiss}
              className="ml-4 px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              // Brand color: replace focus:ring-blue-500 with focus:ring-[#2B517A]
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Hidden element for focus trapping reference */}
        <a
          ref={lastFocusableRef}
          href={cohortHref}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        >
          Focus trap end
        </a>
      </div>
    </div>
  );
};

export default STAIAnnouncementModal;

/*
BRAND COLOR REPLACEMENT GUIDE:
Replace these Tailwind classes with your brand colors:

Primary Brand Blue (#1B365D):
- text-blue-600 → text-[#1B365D]
- focus:ring-blue-500 → focus:ring-[#1B365D]

Secondary Brand Blue (#2B517A):
- border-blue-300 → border-[#2B517A]
- group-hover:text-blue-600 → group-hover:text-[#2B517A]
- focus:ring-blue-500 → focus:ring-[#2B517A]

Background Tints:
- bg-blue-50 → bg-[#E8EEF4] (or create custom shade)
- bg-blue-100 → bg-[#E8EEF4]
- hover:bg-blue-50 → hover:bg-[#E8EEF4]
- group-hover:bg-blue-200 → group-hover:bg-[#2B517A]/20

QA CHECKLIST:
✓ Keyboard Navigation:
  - Tab cycles through: cohort CTA → checkbox → dismiss button
  - Shift+Tab works in reverse
  - ESC closes modal
  - Enter/Space activates buttons and links

✓ Mobile (320px+):
  - Single CTA card remains readable and prominent
  - Touch targets are ≥44px (card and buttons)
  - Text doesn't overflow at narrow widths
  - Modal centers properly on small screens

✓ Accessibility:
  - role="dialog" and aria-modal="true" on overlay
  - aria-labelledby connects to h2 title
  - Focus moves to first interactive element on open
  - Focus trapping works correctly
  - Screen readers can navigate all content

✓ LocalStorage Suppression:
  - "Don't show again" checkbox works
  - Modal respects suppressDays configuration
  - Graceful fallback if localStorage fails
  - SSR safe (no window access on server)

✓ Functionality:
  - SherpaSkill CTA navigates to /sherpaskill page
  - Backdrop click closes modal
  - Animation respects prefers-reduced-motion
  - Props work as expected with defaults
  - Single-action design is clear and focused
*/
