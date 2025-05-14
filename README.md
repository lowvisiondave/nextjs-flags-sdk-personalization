# Next.js Flags SDK Personalization Demo

A demonstration of using Vercel's Flags SDK to implement URL-based personalization with efficient caching in Next.js applications.

[Live Demo](https://nextjs-flags-sdk-personalization.vercel.app)

## Overview

This project showcases how to use the Flags SDK to create personalized experiences based on URL parameters while maintaining optimal performance through precomputation and caching. The demo implements a simple greeting page that changes based on a name parameter in the URL.

## Features

- URL-based personalization using query parameters
- Efficient flag precomputation in middleware
- Response caching based on flag values
- Server-side rendering with revalidation support

## How It Works

The demo uses three key components:

1. **Feature Flag Definition**: A flag that reads from URL search parameters
2. **Middleware Processing**: Precomputes flag values and rewrites URLs
3. **Page Component**: Renders content based on the precomputed flag values

## Usage

1. Visit the homepage to see the default greeting ("Hello world")
2. Add a name parameter to the URL (e.g., `?name=Alice`) to see a personalized greeting
3. Use the form to change the name parameter
4. Click "Revalidate" to refresh the cache for the current flag values

### URL Examples

- Default: `http://localhost:3000/`
- With name: `http://localhost:3000/?name=Alice`

## Project Structure

The main files in this project are:

- `flags.ts` - Feature flag definitions
- `middleware.ts` - Next.js middleware for flag precomputation
- `next.config.ts` - Next.js configuration with caching enabled
- `app/[code]/page.tsx` - Main page component

## Benefits

1. **Performance Optimization**: Precomputing flag values in middleware avoids recalculating them on each render
2. **Caching**: Generated codes allow Next.js to cache responses based on flag values
3. **URL-Based Personalization**: Users can share URLs with query parameters for consistent experiences
4. **Incremental Static Regeneration**: Works well with ISR for different flag combinations
