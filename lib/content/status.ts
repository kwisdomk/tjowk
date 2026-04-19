// Current operational status — update this whenever your focus shifts.
// Powers the "Current Op" block on the landing page.
// Takes 30 seconds. Do it.

export type SystemStatus = {
  operation: string;        // primary thing you're building right now
  secondaryOp: string;      // secondary active thread
  machine: string;          // which machine you're on
  uptime: 'ACTIVE' | 'STANDBY' | 'MAINTENANCE';
  lastUpdated: string;      // e.g. "Apr 2026"
};

export const currentStatus: SystemStatus = {
  operation: 'Building The Journey — portfolio v2',
  secondaryOp: 'RHSA I — RH124 Ch9 I/O Redirection',
  machine: 'Athena (HP Victus 15)',
  uptime: 'ACTIVE',
  lastUpdated: 'Apr 2026',
};
