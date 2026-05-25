---
title: 'Deploying IBM MAS 9.1 solo on OpenShift ROKS — from zero to EAAAIW 2026 in 3 weeks'
date: '2026-05-25'
tag: 'Infrastructure'
summary: 'How I got a 6-node enterprise cluster running as a CS student with no budget and no team.'
---

When I decided to build the **OT Digital Twin (OTDT)** for EAAAIW 2026, I didn't fully grasp what I was signing up for. Deploying IBM Maximo Application Suite (MAS) 9.1 isn't like spinning up a Vercel app. It requires a Red Hat OpenShift cluster, massive compute resources, and a deep understanding of enterprise architecture.

I had zero budget, no team, and exactly 3 weeks.

## The Architecture

The goal was to run a robust MAS 9.1 deployment. This meant I needed:
- A stable OpenShift (ROKS) cluster.
- Sufficient worker nodes to handle the heavy MAS pods.
- Persistent storage for databases and message queues.

```
IBM Cloud
  └── ROKS Cluster (Frankfurt)
        ├── Worker Node 1 → MAS Core
        ├── Worker Node 2 → Manage Component
        └── Worker Node 3 → IoT / Monitor
```

## The Struggle

The hardest part wasn't the Kubernetes YAMLs or the terminal commands. It was managing the resources. As a student, enterprise-grade cloud credits are hard to come by. I had to:
1. Optimize every single pod's requests/limits.
2. Tear down environments daily to save credits.
3. Automate the deployment process so I could rebuild the cluster in under an hour.

### Scripting the Deployment

I ended up writing a series of Bash scripts to automate the OpenShift CLI (`oc`) commands. This saved me hours of manual configuration.

```bash
#!/bin/bash
# A snippet from my deployment automation
echo "Applying MAS namespace..."
oc apply -f mas-namespace.yaml

echo "Setting up operator subscriptions..."
oc apply -f mas-operator.yaml
```

## The Result

By the time EAAAIW 2026 arrived, OTDT was fully functional. A 6-node enterprise cluster humming along, demonstrating real-time OT monitoring. It taught me more about systems architecture than any class ever could.

The takeaway? Constraints breed creativity. If you don't have a team, build the automation to be your team.
