# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "夢鈴幻想" (Dream Bell Fantasy), a personal author portfolio showcasing novels, tools, AI research, and personal thoughts. The site is built as a pure HTML/CSS/JavaScript static website hosted on GitHub Pages, featuring Traditional Chinese content with fantasy and sci-fi styling.

## Technology Stack

- **Framework**: Static HTML with vanilla JavaScript
- **Styling**: TailwindCSS (loaded via CDN)
- **Language**: Traditional Chinese (zh-Hant)
- **Fonts**: Inter (main), Orbitron (cyber/AI sections)
- **Deployment**: GitHub Pages (based on repository name yumerin404.github.io)

## Architecture

### File Structure
- `index.html` - Homepage with author introduction and featured content (fantasy theme)
- `novels.html` - Novel showcase page with tabbed interface for "第二人生" story details, character gallery, and reading platforms
- `tools.html` - Userscripts and development tools showcase (technical theme) 
- `ai.html` - AI research and ComfyUI content page (sci-fi cyberpunk theme)
- `blog.html` - Personal thoughts and reflections page (currently placeholder for future content)
- `images/` - Static assets including avatars, novel covers, and character illustrations

### Design System
The site features multiple coordinated design themes:

#### Main Theme (Homepage, Novels, Blog)
- **Colors**: Soft dark primary (#0a0e1a), soft dark secondary (#1a1e2e), soft dark tertiary (#2a2e3e)
- **Accents**: Purple (#c8a8e9), pink (#f8b4d9), green (#a8e6cf)
- **Style**: Fantasy/magical aesthetic with gentle animations

#### Tools Theme
- **Colors**: Professional dark (#0d1117), secondary (#161b22), tertiary (#21262d)
- **Accents**: Blue (#58a6ff), purple (#a5a5ff), green (#7ce38a), orange (#ffa657)
- **Style**: Professional/technical aesthetic

#### AI Theme (Cyberpunk)
- **Colors**: Cyber dark (#0a0a0f), secondary (#1a1a2e), tertiary (#16213e)
- **Accents**: Cyan (#00d4ff), purple (#a855f7), pink (#ec4899), green (#10b981)
- **Style**: Sci-fi cyberpunk with matrix effects and holographic elements

### Navigation Structure
- Consistent navigation across all pages: 首頁, 奇幻小說, 魔法工具, AI魔導, 心境筆記
- Mobile-responsive hamburger menu
- Active state highlighting for current page
- External links to reading platforms (Pixiv, Masiro)
- Social media integration (Threads, Pixiv)

## Development Guidelines

### Adding New Pages
- Follow the existing HTML structure and include the standard navigation with correct Traditional Chinese labels
- Choose appropriate theme (fantasy/technical/cyberpunk) based on content type
- Use the established TailwindCSS configuration with theme-specific colors and animations
- Implement mobile-responsive design with existing breakpoints
- Include standard footer and back-to-top functionality

### Content Guidelines
- All content must be in Traditional Chinese (zh-Hant)
- Use fantasy-themed language for novels and general content
- Use technical language for development tools
- Use futuristic/sci-fi language for AI-related content
- Maintain consistent tone and style within each theme

### Theme Selection
- **Fantasy Theme**: Use for story-related content, general pages
- **Technical Theme**: Use for development tools, userscripts
- **Cyberpunk Theme**: Use for AI research, machine learning, ComfyUI content

### Image Management
- Novel covers and character images go in `images/novels/`
- Featured images go in `images/featured/`
- Avatar and profile images in `images/`
- Maintain consistent image aspect ratios for cards and galleries

### Styling Conventions
- Use theme-appropriate color schemes and animations
- Follow established animation patterns for consistency
- Implement hover effects and transitions for interactive elements
- Use appropriate font families (Inter for main content, Orbitron for cyberpunk sections)

### Content Status
- **Homepage**: Complete with Traditional Chinese content and improved button hierarchy
- **Novels**: Complete with full novel information in Traditional Chinese
- **Tools**: Complete with tool descriptions, removed installation guides and stats
- **AI Page**: Complete placeholder with cyberpunk design, awaiting ComfyUI content
- **Blog**: Placeholder only, awaiting future content

### External Integrations
- Reading platforms: Pixiv (primary for discovery), Masiro (main reading platform)
- Social media: Threads (main social), GitHub (development)
- No analytics or tracking implemented

## Development Workflow

### Local Development
- No build process required - open HTML files directly in browser for testing
- Use browser developer tools for debugging CSS/JavaScript
- Test responsive design across different viewport sizes
- Verify Traditional Chinese character rendering

### File Serving
- For local development with external resources, serve files via simple HTTP server:
  - `python -m http.server 8000` or `python3 -m http.server 8000`
  - Navigate to `http://localhost:8000`

## Deployment

This is a GitHub Pages site deployed from the main branch. All changes pushed to main are automatically deployed.
The site title has been changed from "Dream Bell Fantasy" to "夢鈴幻想" across all pages.