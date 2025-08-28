// Performance monitoring and optimization
// Tracks loading times and user experience metrics

(function() {
    // Performance metrics
    const perfMetrics = {
        startTime: performance.now(),
        loadTime: null,
        firstPaint: null,
        firstContentfulPaint: null,
        domContentLoaded: null
    };

    // Track DOM Content Loaded
    document.addEventListener('DOMContentLoaded', function() {
        perfMetrics.domContentLoaded = performance.now() - perfMetrics.startTime;
        console.log(`DOM loaded in ${perfMetrics.domContentLoaded.toFixed(2)}ms`);
    });

    // Track window load
    window.addEventListener('load', function() {
        perfMetrics.loadTime = performance.now() - perfMetrics.startTime;
        console.log(`Page fully loaded in ${perfMetrics.loadTime.toFixed(2)}ms`);

        // Get paint metrics
        if ('getEntriesByType' in performance) {
            const paintEntries = performance.getEntriesByType('paint');
            paintEntries.forEach(function(entry) {
                if (entry.name === 'first-paint') {
                    perfMetrics.firstPaint = entry.startTime;
                }
                if (entry.name === 'first-contentful-paint') {
                    perfMetrics.firstContentfulPaint = entry.startTime;
                }
            });
        }

        // Report metrics after a brief delay
        setTimeout(function() {
            reportMetrics();
        }, 1000);
    });

    function reportMetrics() {
        const report = {
            loadTime: perfMetrics.loadTime,
            domReady: perfMetrics.domContentLoaded,
            firstPaint: perfMetrics.firstPaint,
            firstContentfulPaint: perfMetrics.firstContentfulPaint,
            userAgent: navigator.userAgent,
            connection: navigator.connection ? navigator.connection.effectiveType : 'unknown',
            timestamp: new Date().toISOString()
        };

        console.log('Performance Report:', report);
        
        // Store in localStorage for debugging
        localStorage.setItem('skillmatch-perf', JSON.stringify(report));
    }

    // Image lazy loading optimization
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            // Observe all lazy images
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // Initialize lazy loading after DOM is ready
    document.addEventListener('DOMContentLoaded', setupLazyLoading);

    // Export for debugging
    window.SkillMatchPerf = {
        getMetrics: function() {
            return perfMetrics;
        },
        getStoredMetrics: function() {
            const stored = localStorage.getItem('skillmatch-perf');
            return stored ? JSON.parse(stored) : null;
        }
    };
})();
