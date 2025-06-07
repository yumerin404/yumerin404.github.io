# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "夢鈴幻境" (Dream Bell Fantasy), a personal author portfolio showcasing novels, tools, and news. The site is built as a pure HTML/CSS/JavaScript static website hosted on GitHub Pages.

## Technology Stack

- **Framework**: Static HTML with vanilla JavaScript
- **Styling**: TailwindCSS (loaded via CDN)
- **Language**: Traditional Chinese (zh-Hant)
- **Deployment**: GitHub Pages (based on repository name yumerin404.github.io)

## Architecture

### File Structure
- `index.html` - Homepage with author introduction and featured content
- `novels.html` - Novel showcase page with tabbed interface for story details, character gallery, and external links
- `tools_x.html` - Tools showcase page for creative writing utilities  
- `news_x.html` - News and updates page with blog-style posts
- `images/` - Static assets including avatars, novel covers, and character illustrations

### Design System
All pages share a consistent dark theme design system:
- **Colors**: Dark primary (#121212), dark secondary (#1E1E1E), accent purple (#BB86FC)
- **Common components**: Fixed navigation, mobile menu, animated cards, hover effects
- **Animations**: Float, glow, shimmer, and parallax effects using CSS keyframes

### Navigation Structure
- Consistent navigation across all pages
- Mobile-responsive hamburger menu
- Active state highlighting for current page
- External links to reading platforms (Pixiv, 真白萌, Penana)

## Development Guidelines

### Adding New Pages
- Follow the existing HTML structure and include the standard navigation
- Use the established TailwindCSS configuration with custom colors and animations
- Implement mobile-responsive design with the existing breakpoints
- Include the standard footer and back-to-top functionality

### Image Management
- Novel covers and character images go in `images/novels/`
- Featured images go in `images/featured/`
- Maintain consistent image aspect ratios for cards and galleries

### Styling Conventions
- Use the established CSS custom properties for colors (dark-primary, dark-secondary, dark-accent)
- Follow the existing animation patterns for consistency
- Implement hover effects and transitions for interactive elements
- Use the cyberpunk/glitch aesthetic for special elements (news page)

### Content Updates
- Novel information is embedded directly in HTML (no CMS)
- News posts are static HTML with timestamp and interaction counters
- Tool descriptions are placeholder content for future functionality

## Deployment

This is a GitHub Pages site deployed from the main branch. All changes pushed to main are automatically deployed.