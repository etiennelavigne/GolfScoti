# GolfScoti – Product & UX Specification for AI Development

## Role & Context
You are an AI system or developer rebuilding the GolfScoti platform.
GolfScoti is NOT a simple golf directory.
It is a decision-making and projection platform for golfers planning a golf trip to Scotland.

Primary POC: St Andrews & surrounding area.

Your goal is to rebuild the platform with:
- a clean, modern UX
- advanced filtering logic
- a strong freemium model
- high user retention through personal space and projection features

---

## 1. Product Vision (Understand before coding)

### What GolfScoti is
GolfScoti is a **decision-support platform** that helps golfers:
- discover relevant golf courses
- compare them easily
- save their selections
- project and prepare a golf trip

### Core user problem
- Too many golf courses in a small geographic area
- Data scattered across blogs, guides, and outdated websites
- Poor comparability between courses
- No personalization based on golfer profile
- Heavy, content-based navigation (blogs, long pages)

### Product objective
Enable a golfer to **quickly identify the courses that truly match their preferences**, compare them, save them, and plan their trip efficiently.

---

## 2. Functional Architecture (4 Pillars)

The platform is built on four core pillars:

1. Advanced search & filtering engine (CORE FEATURE)
2. UX focused on decision & projection (not content consumption)
3. Personal user space (retention driver)
4. Smart freemium model with progressive value

---

## 3. Core Feature – Advanced Search & Filtering Engine

### 3.1 Golf Data Model (Critical)

Each golf course must be treated as a **rich structured object**, not a static page.

Required fields (all must be filterable):

- Name
- GPS location (latitude / longitude)
- Distance from a reference point (e.g. St Andrews)
- Course type:
  - Links
  - Parkland
  - Historic
  - Modern
- Environment:
  - Sea view / Seaside
  - Inland
- Tour course (Yes / No)
- Difficulty level
- Green fee (min / max)
- Prestige / notoriety
- Accessibility (Public / Private)
- Ideal season
- Average playing time
- Services:
  - Clubhouse
  - Practice
  - Rental
  - Caddie
- Booking link (affiliate)

---

### 3.2 Filtering System (Main Differentiation)

Filters are NOT cosmetic.  
They are the heart of the product.

#### Geographic filters
- Interactive map
- Radius selector (km)
- Dynamic map ↔ list synchronization

#### Course type & environment filters
- Links
- Sea view (coastal / seaside)
- Inland
- Tour courses

#### Golfer profile filters
- Skill level
- Playing frequency

#### Preference filters
- Budget
- Prestige vs authenticity
- Course style

#### Constraints
- Available time
- Accessibility / ease of access

#### Goal-based filters
- Discovery
- Iconic courses
- Optimized trip (itinerary logic)

### UX requirements
- Filters must be visible and easy to understand
- Results update in real time
- Multiple filters can be combined without friction

---

## 4. UX Principles

### 4.1 Decision-Oriented UX (Not Content-Oriented)

Avoid:
- Long text pages
- Blog-style layouts
- Heavy editorial content

Favor:
- Cards
- Tags
- Visual indicators
- Scores
- Side-by-side comparisons

The user must understand **within seconds** if a course fits their needs.

---

### 4.2 Interactive Map (Key Feature)

- Map can be central or complementary to the list
- Courses must be clickable
- Filters dynamically affect map display
- Strong link between map and results list

---

## 5. Personal User Space (Retention Driver)

### 5.1 User Account
- Account creation
- Login
- User profile (simple but scalable)

---

### 5.2 Favorites System (Core Retention Feature)

Favorites are essential, not optional.

Features:
- Add a course to favorites
- View favorites in personal space
- Wishlist / collection logic

Future-ready:
- Multiple lists (e.g. "Trip 2024", "Bucket list")
- Reuse across multiple years

---

### 5.3 Projection & Memory Logic

The personal space allows users to:
- Keep track of decisions
- Return months later
- Re-project themselves into a future trip

This is what differentiates GolfScoti from a one-time-use blog.

---

## 6. Freemium Model (Product-Critical)

### 6.1 Free Version

Accessible without friction:
- Access to golf database
- Basic search
- Basic filters
- Golf course pages
- Affiliate clicks
- **Maximum of 3 favorites**

Purpose:
- Generate traffic
- Demonstrate value
- Feed the affiliate model

UX requirement:
When the 3rd favorite is reached, show a soft limit message:
"You’ve reached the maximum number of favorites in the free version."

---

### 6.2 Premium Subscription

The subscription should **unlock power**, not block usage.

Premium features:
- Advanced filter combinations
- Full access to all criteria
- Unlimited favorites and lists
- Personalized recommendations
- Advanced course comparison
- History and trip projections

The premium must clearly answer:
"What do I gain by subscribing?"

---

## 7. Business Logic Integration

- Affiliate links integrated naturally
- Non-intrusive
- Aligned with user intent (explore / book)

The platform:
- Does not force sales
- Helps decision-making
- Fits naturally into trip preparation

---

## 8. Development Priorities

Suggested implementation order:

1. Clean and scalable golf data structure
2. Powerful filtering engine
3. Fast and clear UX
4. Interactive map
5. User accounts & favorites
6. Freemium & subscription logic
7. Retention optimization

---

## 9. Ultra-Short Summary (For AI Context)

GolfScoti is a Scotland-focused golf discovery and decision platform built around advanced filtering, a decision-oriented UX, a personal space with favorites, and a freemium model where advanced features are reserved for subscribers.
