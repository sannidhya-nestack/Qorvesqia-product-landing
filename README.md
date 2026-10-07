# Cirqentra.AI — Electrical Operations Intelligence

**Industry:** Construction Services  
**Sub-industry:** Electrical Contracting & Systems  
**Product ID (`insubId`):** `insub_CO008`  
**Live Target:** `https://cirqentra.nestack.ai`  

## Executive Overview
Cirqentra.AI is an AI-native operations intelligence platform engineered specifically for commercial and industrial electrical contractors. It unifies the **Construction Lifecycle** (bid takeoff, estimating, BIM planning, switchgear procurement, fieldwork, and commercial change control) with the **Installed-Base Lifecycle** (energization dependencies, commissioning, and NFPA 70B:2026 predictive asset maintenance).

## Core Architecture & 7 Lifecycle Modules
1. **Bids & Takeoff Studio:** Automated electrical takeoff, symbol detection, and assembly mapping using the NECA Manual of Labor Units.
2. **Planning & Coordination:** BIM electrical system trees, work package sequencing, and prefab candidate detection.
3. **Supply & Gear Control:** Backward-scheduled releases for long-lead switchgear, dry-type transformers, and distribution gear against 40+ week manufacturing windows.
4. **Fieldwork & Voice Logging:** Hands-free voice-to-field reporting, daily constraint clearance, and real-time earned vs. actual labor productivity ratios.
5. **Commercial Controls:** Automated drawing delta detection between revisions, RFI evidence matching, and live margin-at-completion forecasting.
6. **Commissioning & Energization:** Upstream-to-downstream topological dependency verification (Utility → Switchgear → Transformer → Panel → Load) with digital megger and torque test records.
7. **Service & NFPA 70B Maintenance:** Telemetry ingestion (thermal scans, partial discharge, insulation resistance deterioration), failure window prediction, and intelligent technician dispatch.

## Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + `tw-animate-css`
- **Typography:** Orbitron (display headings) & Instrument Sans (body text)
- **Shared API Integration:** Nestack Platform API (`https://www.nestack.ai`) for dynamic pricing, demo calendar slots, and lead intake.
