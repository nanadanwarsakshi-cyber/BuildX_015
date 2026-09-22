# SmartResQ - Disaster Management & Urban Resilience

Hackathon prototype focused on the Nagpur disaster-response scenario.

## Problem coverage
This version maps the complete statement into working prototype modules:

1. Flood / heavy-rain alerts
2. Nagpur city live interactive map
3. Blocked-road reporting and status
4. Evacuation planning
5. Safe shelters and capacity
6. Emergency resource allocation
7. Citizen SOS / emergency reporting
8. Fire, medical, flood, road and building-damage reporting
9. Emergency-team coordination and responder status
10. Responder route guidance that considers blocked roads
11. Damage assessment and prioritisation
12. Missing-person / family alerts
13. Shared communication feed across response agencies
14. Admin control room for verification, assignment and resolution
15. Local browser persistence using localStorage

## Map
The project uses Leaflet with OpenStreetMap tiles. The base map is live and can be panned/zoomed across Nagpur. The SmartResQ disaster markers, shelter data, incidents and road status are prototype/demo data stored in the browser.

OpenStreetMap tiles are subject to the OpenStreetMap tile usage policy. The project includes visible attribution. For a large public deployment, use an appropriate hosted tile provider or your own tile infrastructure.

## Run
No build step is required.

### Option A: easiest
Open `index.html` in a modern browser with internet access.

### Option B: local server (recommended)
From the `smartresq` folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Important prototype note
Weather, emergency incidents, agency status, shelters, resources and damage records are simulated. Do not present the prototype as connected to government emergency systems unless those integrations are actually implemented.

## Suggested hackathon demo flow
Citizen sees heavy-rain alert -> opens Nagpur live map -> reports flood/SOS -> admin verifies -> responder team is assigned -> blocked roads are considered -> shelter capacity is checked -> resources are allocated -> damage assessment is recorded -> agency update is broadcast -> incident is resolved.
