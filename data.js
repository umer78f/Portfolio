export const skillCards = [
    // 1. Components
    {
        name: "Components",
        skills: ["Modular", "Architecture", "Typescript", "Reusable"],
        cards: [
            { h3: "Component Isolation", p: "Building self-contained React elements to ensure styling and logic remain modular and bug-free." },
            { h3: "Design System Architecture", p: "Establishing standardized button, input, and card tokens for unified brand presentation." },
            { h3: "Props & Interface Typing", p: "Structuring clear component APIs with strict prop contracts for seamless developer collaboration." },
            { h3: "Reusability & Scalability", p: "Refactoring repetitive code into flexible utility components to reduce technical debt." }
        ]
    },
    // 2. State
    {
        name: "State",
        skills: ["Redux", "Context", "Forms", "Syncing"],
        cards: [
            { h3: "Redux & Centralized Stores", p: "Managing complex global state trees with predictable actions and immutable data updates." },
            { h3: "Context API Integration", p: "Passing lightweight UI state down component branches without suffering prop-drilling overhead." },
            { h3: "Form & Event Handling", p: "Validating user input in real-time while maintaining optimal input response rates." },
            { h3: "Async Data Syncing", p: "Handling loading states, caches, and error fallback UI during live server fetch cycles." }
        ]
    },
    // 3. Layouts
    {
        name: "Layouts",
        skills: ["Responsive", "Grid", "Flexbox", "Tailwind"],
        cards: [
            { h3: "Mobile-First Design", p: "Writing baseline styles for handheld devices before scaling layout complexity upward." },
            { h3: "Modern Grid & Flexbox", p: "Structuring responsive multi-column layouts using CSS Grid alignment and flexible containers." },
            { h3: "Fluid Typography & Spacing", p: "Utilizing clamp() functions to dynamically scale font sizes smoothly across screen widths." },
            { h3: "Tailwind CSS Workflow", p: "Accelerating custom layout construction using utility classes without bloated stylesheet sizes." }
        ]
    },
    // 4. SVG
    {
        name: "SVG",
        skills: ["Vectors", "Morphing", "Illustrations", "Paths"],
        cards: [
            { h3: "Dynamic Vector Paths", p: "Manipulating stroke-dashoffset and SVG paths to draw custom line illustrations live on screen." },
            { h3: "Resolution Independence", p: "Optimizing vector graphics to render razor-sharp details across ultra-high DPI screens." },
            { h3: "Interactive Morphing", p: "Transitioning complex vector shapes into secondary forms based on mouse hover and trigger events." },
            { h3: "Inline SVG Manipulations", p: "Controlling internal element colors and scales using direct DOM manipulation and CSS." }
        ]
    },
    // 5. GSAP
    {
        name: "GSAP",
        skills: ["Animation", "Timelines", "Easing", "Performance"],
        cards: [
            { h3: "Timeline Sequencing", p: "Chaining complex multi-element animation sequences with frame-accurate timing controls." },
            { h3: "Custom Easing Curves", p: "Applying organic cubic-bezier eases to give digital UI elements natural weight and acceleration." },
            { h3: "Stagger & Reveal FX", p: "Animating text blocks and list grids element-by-element for high-end landing page reveals." },
            { h3: "60FPS GPU Optimization", p: "Restricting properties to transform and opacity to prevent layout reflows and browser lag." }
        ]
    },
    // 6. Scroll
    {
        name: "Scroll",
        skills: ["ScrollTrigger", "Parallax", "Pinning", "Triggers"],
        cards: [
            { h3: "ScrollTrigger Pinning", p: "Locking viewports in place during multi-step visual presentations to guide user focus." },
            { h3: "Scrubbed Timeline Motion", p: "Binding animation playback progression directly to mouse scroll velocity and position." },
            { h3: "Parallax Layer Depth", p: "Moving background and foreground elements at staggered speeds to create visual distance." },
            { h3: "View Trigger Callbacks", p: "Firing specific entry and exit animations automatically as sections enter the viewport." }
        ]
    },
    // 7. Lenis
    {
        name: "Lenis",
        skills: ["SmoothScroll", "Inertia", "Normalization", "Physics"],
        cards: [
            { h3: "Normalized Scroll Physics", p: "Standardizing scroll wheel acceleration across Windows, macOS, and Linux platforms." },
            { h3: "GSAP Ticker Sync", p: "Hooking Lenis scroll position directly into GSAP's rendering loop to eliminate visual jitter." },
            { h3: "Inertia Momentum Controls", p: "Fine-tuning damping and duration parameters for smooth, tactile page gliding." },
            { h3: "Native Anchor Jump Fixes", p: "Preserving smooth scroll behavior when targeting inner-page hash link locations." }
        ]
    },
    // 8. Framer
    {
        name: "Framer",
        skills: ["Gestures", "Transitions", "Springs", "Interactions"],
        cards: [
            { h3: "Layout Animations", p: "Automatic spatial re-positioning when component dimensions or grid orders change." },
            { h3: "Gesture Interactions", p: "Building intuitive hover, tap, drag, and release responses with physics-based spring feedback." },
            { h3: "AnimatePresence Unmounting", p: "Executing fluid exit animations prior to removing React components from the DOM tree." },
            { h3: "Shared Element Transitions", p: "Morphing thumbnail cards seamlessly into full modal views across page view transitions." }
        ]
    },
    // 9. Performance
    {
        name: "Performance",
        skills: ["Optimization", "Vitals", "Splitting", "Compression"],
        cards: [
            { h3: "Core Web Vitals Boost", p: "Minimizing LCP, INP, and CLS scores to secure top Lighthouse audit ratings." },
            { h3: "Asset & Code Splitting", p: "Lazy-loading non-critical images and dynamic JavaScript chunks to speed initial load." },
            { h3: "Repaint Reduction", p: "Debugging rendering bottlenecks in Chrome DevTools to stop unneeded DOM repaints." },
            { h3: "Font & Image Compression", p: "Converting heavy media into next-gen WebP/AVIF images and subsetting custom web fonts." }
        ]
    },
    // 10. WebGL
    {
        name: "WebGL",
        skills: ["Shaders", "Particles", "Canvas", "3D"],
        cards: [
            { h3: "Interactive Particle Systems", p: "Rendering thousands of dynamic points reacting smoothly to cursor proximity and physics." },
            { h3: "Custom Fragment Shaders", p: "Writing GLSL shader scripts to produce organic noise, distortion, and glow effects." },
            { h3: "2D Context Manipulations", p: "Drawing generative patterns, custom charts, and interactive canvas elements." },
            { h3: "Frame Loop Management", p: "Maintaining consistent requestAnimationFrame execution loops for fluid interactive visuals." }
        ]
    },
    // 11. Headless
    {
        name: "Headless",
        skills: ["Accessibility", "ARIA", "Focus", "Unstyled"],
        cards: [
            { h3: "Decoupled Logic & Styles", p: "Creating functional dropdowns, tabs, and popovers completely free from default CSS." },
            { h3: "ARIA Accessibility Standards", p: "Implementing complete keyboard navigation and screen-reader accessibility roles." },
            { h3: "Focus State Management", p: "Trapping and restoring keyboard focus cleanly within open modal popups and drawers." },
            { h3: "Custom Theme Capability", p: "Applying styling themes on top of headless behavior without breaking underlying logic." }
        ]
    },
    // 12. Architecture
    {
        name: "Architecture",
        skills: ["REST", "Fetching", "Pipelines", "Integration"],
        cards: [
            { h3: "RESTful API Fetching", p: "Connecting front-end views to backend endpoints with clean async/await patterns." },
            { h3: "Data Transformation Layers", p: "Mapping raw API payloads into structured objects before passing them to UI components." },
            { h3: "Error Handling & Fallbacks", p: "Building clear user notices and retry triggers when network requests fail or timeout." },
            { h3: "Optimistic UI Updates", p: "Updating interface elements instantly while background requests complete in parallel." }
        ]
    }
];