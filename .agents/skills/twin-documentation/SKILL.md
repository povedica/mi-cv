---
name: twin-documentation
description: Write or maintain the English technical documentation for AI Professional Twin when modules, architecture, contracts, analytics, or verification evidence change.
---

# Maintain the technical documentation

1. Start at the README and inspect the real entry points, tests and configuration. Verify any existing claims about services, publication, and measurements.
2. Update architecture diagrams when a boundary, dependency or user flow changes. Mark future connections and optional services. Use Mermaid and describe the result in nearby prose so readers can follow without the diagram.
3. Update the module reference with the entry point, inputs, outputs, implementation, privacy boundary and verification. Record why a stack decision fits this site and the cost it introduces.
4. Use an OpenSpec change for new behavior or a changed contract. Keep the canonical spec and the implementation documentation linked. For an editorial rewrite, update the existing documentation directly.
5. Record measured performance and accessibility evidence with the route, settings, tool and limitations. Use synthetic examples and keep unpublished claims, credentials and private source data out of public docs.
