# Biotech Intent Navigator

Biotech Intent Navigator is a lightweight AI-powered Business Development intelligence tool designed to help prioritize biotech and pharmaceutical professionals based on their likelihood to adopt **3D in-vitro models for therapy design**.

The project focuses on **decision intelligence** — combining scientific intent, role relevance, organizational readiness, and geographic signals to rank leads in a way that mirrors how a real BD team would think.


## Problem Context

Business development teams in deep-tech biotech often struggle with *lead overload*. Traditional lead lists lack context around:
- Who is scientifically active right now
- Who has decision-making power
- Which organizations are funded and ready to experiment
- Where outreach is most likely to convert

This project was built to address that gap by prioritizing **intent**, not volume.

---

## Approach & System Design

The system follows a simple, modular pipeline:


### 1. Identification
Profiles are selected based on role relevance (e.g., toxicology, safety, preclinical leadership), research focus, and geographic hubs.

### 2. Enrichment
Each profile is enriched with:
- Role seniority
- Research activity (recent publications)
- Funding stage / organizational readiness
- Person location vs company HQ

### 3. Scoring (Core Logic)
Each lead is assigned an explainable **Propensity-to-Buy Score (0–100)** based on weighted signals:

- Role Fit (30)
- Scientific Intent (40)
- Company & Funding Readiness (20)
- Location Signal (10)

The goal is not just ranking, but explaining *why* a lead ranks high.

### 4. BD Action Recommendation
Each lead includes a suggested next outreach step (e.g., email intro, conference connect, LinkedIn warm-up).

---

## Data & Assumptions

This demo uses **synthetic but realistic data** to focus on reasoning, prioritization, and scoring logic rather than live scraping.

The architecture is designed to be API-ready and can be extended to real data sources such as:
- LinkedIn / Sales Navigator
- PubMed / Google Scholar
- Crunchbase / PitchBook

---

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

The project was built using a rapid prototyping workflow to iterate quickly on logic and UX.


