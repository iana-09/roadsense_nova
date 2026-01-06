import React, { useState } from 'react';
import { Home, Map, FileText, Upload, User, UserPlus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

// AlertDialog Components
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={`fixed inset-0 z-[100] bg-black/80 ${className || ''}`}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={`fixed left-[50%] top-[50%] z-[101] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-700 bg-slate-800 p-6 shadow-lg rounded-lg ${className || ''}`}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className, ...props }) => (
  <div
    className={`flex flex-col space-y-2 text-center sm:text-left ${className || ''}`}
    {...props}
  />
);

const AlertDialogFooter = ({ className, ...props }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className || ''}`}
    {...props}
  />
);

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold text-white ${className || ''}`}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={`text-sm text-gray-400 ${className || ''}`}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 h-10 px-4 py-2 ${className || ''}`}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-slate-600 bg-slate-700 text-white hover:bg-slate-600 h-10 px-4 py-2 mt-2 sm:mt-0 ${className || ''}`}
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";

// --- Data for each page ---
const pageContent = {
  Dashboard: {
    title: 'System Overview',
    description: "RoadSense monitoring dashboard - YOLOv8 & DeepSORT road distress detection system.",
    content: (
      <div className="space-y-6">
        {/* Detection Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="content-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-400">Total Detections</h2>
                <p className="text-3xl font-bold mt-2 text-white">847</p>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
              <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="content-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-400">Critical Hazards</h2>
                <p className="text-3xl font-bold mt-2 text-red-400">23</p>
                <p className="text-xs text-gray-500 mt-1">Pending review</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-400">Coverage Area</h2>
                <p className="text-3xl font-bold mt-2 text-purple-400">152 km</p>
                <p className="text-xs text-gray-500 mt-1">Roads monitored</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-400">Detection Accuracy</h2>
                <p className="text-3xl font-bold mt-2 text-emerald-400">94.3%</p>
                <p className="text-xs text-gray-500 mt-1">YOLOv8 model</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Hazard Type Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="content-card">
            <h2 className="text-lg font-semibold text-white mb-4">Hazard Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Potholes</span>
                  <span className="text-sm font-semibold text-white">342 (40%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Cracks</span>
                  <span className="text-sm font-semibold text-white">245 (29%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '29%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Speed Bumps</span>
                  <span className="text-sm font-semibold text-white">186 (22%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Flooding</span>
                  <span className="text-sm font-semibold text-white">74 (9%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '9%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2 className="text-lg font-semibold text-white mb-4">System Performance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">YOLOv8 Inference Time</span>
                <span className="text-sm font-semibold text-teal-400">23ms/frame</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">DeepSORT Tracking</span>
                <span className="text-sm font-semibold text-teal-400">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">GPU Utilization (RTX 3050)</span>
                <span className="text-sm font-semibold text-purple-400">67%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">PostGIS Database</span>
                <span className="text-sm font-semibold text-emerald-400">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Active Contributors</span>
                <span className="text-sm font-semibold text-cyan-400">156 drivers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Detections */}
        <div className="content-card">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Detections</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 text-xs font-bold">P</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Pothole detected</p>
                  <p className="text-xs text-gray-400">Maharlika Highway, Km 45.2</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-orange-400 text-xs font-bold">C</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Road crack identified</p>
                  <p className="text-xs text-gray-400">NLEX North Bound, Km 23.8</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">8 mins ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 text-xs font-bold">F</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Flooding detected</p>
                  <p className="text-xs text-gray-400">Quirino Highway, Station 5</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">15 mins ago</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  MapView: {
    title: 'GIS Hazard Map',
    description: 'PostGIS-powered geographic distribution of detected road hazards.',
    content: (
      <div className="grid grid-cols-1 gap-6">
        <div className="content-card h-[500px] flex items-center justify-center bg-slate-800/50">
          <div className="text-center">
            <Map className="w-20 h-20 text-teal-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Interactive PostGIS Map View</p>
            <p className="text-sm text-gray-500">GPS-tracked hazard locations with clustering analysis</p>
          </div>
        </div>
        
        {/* Map Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="content-card">
            <h3 className="text-xs font-semibold text-gray-400 mb-2">High-Risk Zones</h3>
            <p className="text-2xl font-bold text-red-400">8 areas</p>
            <p className="text-xs text-gray-500 mt-1">Cluster density &gt; 15</p>
          </div>
          <div className="content-card">
            <h3 className="text-xs font-semibold text-gray-400 mb-2">GPS Coverage</h3>
            <p className="text-2xl font-bold text-purple-400">152.4 km</p>
            <p className="text-xs text-gray-500 mt-1">Total road length</p>
          </div>
          <div className="content-card">
            <h3 className="text-xs font-semibold text-gray-400 mb-2">Geo-tagged Videos</h3>
            <p className="text-2xl font-bold text-cyan-400">1,247</p>
            <p className="text-xs text-gray-500 mt-1">With GPS logs</p>
          </div>
          <div className="content-card">
            <h3 className="text-xs font-semibold text-gray-400 mb-2">Map Queries</h3>
            <p className="text-2xl font-bold text-emerald-400">5,432</p>
            <p className="text-xs text-gray-500 mt-1">PostGIS requests</p>
          </div>
        </div>

        {/* Hazard Heatmap Legend */}
        <div className="content-card">
          <h3 className="text-lg font-semibold text-white mb-4">Hazard Density Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-300">Critical (&gt;20 hazards/km)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-300">High (10-20 hazards/km)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-300">Medium (5-10 hazards/km)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-300">Low (&lt;5 hazards/km)</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  Reports: {
    title: 'Analytics & Reports',
    description: 'DPWH-compliant reporting and detection analytics.',
    content: (
      <div className="space-y-6">
        {/* Report Generation */}
        <div className="content-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Generate DPWH Report</h2>
            <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-lg transition-colors">
              Export Report
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Report Period</p>
              <p className="text-lg font-semibold text-white">Jan 1-31, 2026</p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Total Incidents</p>
              <p className="text-lg font-semibold text-teal-400">847 detected</p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Report Status</p>
              <p className="text-lg font-semibold text-emerald-400">Ready</p>
            </div>
          </div>
        </div>

        {/* Detection Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="content-card">
            <h2 className="text-lg font-semibold text-white mb-4">Monthly Detection Trends</h2>
            <div className="h-48 flex items-end justify-between gap-2">
              <div className="flex-1 bg-teal-600 rounded-t" style={{ height: '60%' }}></div>
              <div className="flex-1 bg-teal-600 rounded-t" style={{ height: '75%' }}></div>
              <div className="flex-1 bg-teal-600 rounded-t" style={{ height: '50%' }}></div>
              <div className="flex-1 bg-teal-600 rounded-t" style={{ height: '85%' }}></div>
              <div className="flex-1 bg-teal-600 rounded-t" style={{ height: '70%' }}></div>
              <div className="flex-1 bg-teal-600 rounded-t" style={{ height: '90%' }}></div>
              <div className="flex-1 bg-teal-600 rounded-t" style={{ height: '100%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>

          <div className="content-card">
            <h2 className="text-lg font-semibold text-white mb-4">Priority Maintenance</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">Maharlika Highway</p>
                  <p className="text-xs text-gray-400">42 critical potholes</p>
                </div>
                <span className="px-3 py-1 bg-red-600 text-white text-xs rounded-full">Urgent</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">NLEX Segment 4</p>
                  <p className="text-xs text-gray-400">28 road cracks</p>
                </div>
                <span className="px-3 py-1 bg-orange-600 text-white text-xs rounded-full">High</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">Quirino Highway</p>
                  <p className="text-xs text-gray-400">15 moderate issues</p>
                </div>
                <span className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-full">Medium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Model Performance Metrics */}
        <div className="content-card">
          <h2 className="text-lg font-semibold text-white mb-4">YOLOv8 Model Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Precision</p>
              <p className="text-3xl font-bold text-teal-400">94.3%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Recall</p>
              <p className="text-3xl font-bold text-purple-400">91.7%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">F1 Score</p>
              <p className="text-3xl font-bold text-cyan-400">93.0%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">mAP@50</p>
              <p className="text-3xl font-bold text-emerald-400">92.8%</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  Uploads: {
    title: 'Crowdsourced Data',
    description: 'Video submissions and contributor analytics from mobile crowdsourcing.',
    content: (
      <div className="space-y-6">
        {/* Upload Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="content-card">
            <h3 className="text-sm font-medium text-gray-400">Total Videos</h3>
            <p className="text-3xl font-bold mt-2 text-teal-400">1,247</p>
            <p className="text-xs text-gray-500 mt-1">GPS-synced footage</p>
          </div>
          <div className="content-card">
            <h3 className="text-sm font-medium text-gray-400">Processing Queue</h3>
            <p className="text-3xl font-bold mt-2 text-yellow-400">18</p>
            <p className="text-xs text-gray-500 mt-1">Pending analysis</p>
          </div>
          <div className="content-card">
            <h3 className="text-sm font-medium text-gray-400">Active Contributors</h3>
            <p className="text-3xl font-bold mt-2 text-purple-400">156</p>
            <p className="text-xs text-gray-500 mt-1">Drivers/Motorists</p>
          </div>
          <div className="content-card">
            <h3 className="text-sm font-medium text-gray-400">Data Quality</h3>
            <p className="text-3xl font-bold mt-2 text-emerald-400">96.2%</p>
            <p className="text-xs text-gray-500 mt-1">GPS accuracy</p>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="content-card">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Video Submissions</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Contributor</th>
                <th>Location (GPS)</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jan 6, 10:23 AM</td>
                <td>Driver_A45</td>
                <td>14.6091°N, 121.0223°E</td>
                <td>4:32 min</td>
                <td><span className="text-green-400">✓ Processed</span></td>
              </tr>
              <tr>
                <td>Jan 6, 10:18 AM</td>
                <td>Driver_C22</td>
                <td>14.5995°N, 120.9842°E</td>
                <td>3:45 min</td>
                <td><span className="text-green-400">✓ Processed</span></td>
              </tr>
              <tr>
                <td>Jan 6, 10:15 AM</td>
                <td>Driver_B89</td>
                <td>14.6349°N, 121.0325°E</td>
                <td>5:12 min</td>
                <td><span className="text-yellow-400">⏳ Processing</span></td>
              </tr>
              <tr>
                <td>Jan 6, 10:08 AM</td>
                <td>Driver_D12</td>
                <td>14.5547°N, 121.0244°E</td>
                <td>2:58 min</td>
                <td><span className="text-green-400">✓ Processed</span></td>
              </tr>
              <tr>
                <td>Jan 6, 10:02 AM</td>
                <td>Driver_E67</td>
                <td>14.5764°N, 120.9851°E</td>
                <td>6:20 min</td>
                <td><span className="text-yellow-400">⏳ Processing</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Top Contributors Leaderboard */}
        <div className="content-card">
          <h2 className="text-lg font-semibold text-white mb-4">Top Contributors This Month</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Driver_A45</p>
                  <p className="text-xs text-gray-400">87 video submissions</p>
                </div>
              </div>
              <span className="text-teal-400 font-semibold">324.5 km covered</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Driver_C22</p>
                  <p className="text-xs text-gray-400">64 video submissions</p>
                </div>
              </div>
              <span className="text-gray-400 font-semibold">245.2 km covered</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Driver_B89</p>
                  <p className="text-xs text-gray-400">52 video submissions</p>
                </div>
              </div>
              <span className="text-gray-400 font-semibold">198.7 km covered</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  Profile: {
    title: 'Profile',
    description: 'Manage your account settings and preferences.',
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="content-card">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-white">Personal Information</h2>
              <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Username</label>
                <p className="text-white">Driver123</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <p className="text-white">driver@roadsense.com</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Member Since</label>
                <p className="text-white">January 2026</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Account Type</label>
                <p className="text-white">Contributor</p>
              </div>
            </div>
          </div>
          <div className="content-card">
            <h2 className="text-lg font-semibold text-white mb-4">Contribution Statistics</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Videos Submitted</span>
                <span className="text-teal-400 font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Distance Tracked</span>
                <span className="text-teal-400 font-semibold">1,250 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hazards Detected</span>
                <span className="text-teal-400 font-semibold">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contribution Points</span>
                <span className="text-teal-400 font-semibold">850</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Profile Sections */}
        <div className="content-card">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Uploaded video footage</p>
                  <p className="text-xs text-gray-400">Maharlika Highway - 5.2 km</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Report generated</p>
                  <p className="text-xs text-gray-400">Monthly summary exported</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Achievement unlocked</p>
                  <p className="text-xs text-gray-400">100 km milestone reached</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const navItems = [
  { page: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { page: 'MapView', icon: <Map className="w-5 h-5" /> },
  { page: 'Reports', icon: <FileText className="w-5 h-5" /> },
  { page: 'Uploads', icon: <Upload className="w-5 h-5" /> },
];

const accountItems = [
  { page: 'Profile', icon: <User className="w-5 h-5" /> },
  { page: 'CreateAccount', label: 'Create Account', icon: <UserPlus className="w-5 h-5" /> },
  { page: 'Logout', icon: <LogOut className="w-5 h-5" /> },
];

// Sidebar Component
const Sidebar = ({ activePage, setActivePage, navigate, isCollapsed, setIsCollapsed }) => {
  return (
    <aside className={`glass-effect ${isCollapsed ? 'w-24' : 'w-72'} flex-shrink-0 flex flex-col z-10 transition-all duration-300`}>
      <div className="h-24 flex items-center justify-center border-b border-white/10 relative">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <img 
              src="/roadsense.png" 
              alt="RoadSense Logo" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-2xl font-bold text-white">RoadSense</span>
          </div>
        ) : (
          <img 
            src="/roadsense.png" 
            alt="RoadSense Logo" 
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors shadow-lg"
        >
          <svg 
            className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <nav className="flex-grow p-5 space-y-2">
        {navItems.map(item => (
          <a
            key={item.page}
            href="#"
            className={`nav-link flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} px-4 py-3 rounded-lg text-gray-300 transition-all hover:bg-white/5 hover:translate-x-1 ${activePage === item.page ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActivePage(item.page);
            }}
            title={isCollapsed ? (item.label || item.page) : ''}
          >
            <span className={isCollapsed ? 'text-xl' : 'text-lg'}>{item.icon}</span>
            {!isCollapsed && <span className="text-base font-medium">{item.label || item.page}</span>}
          </a>
        ))}
        
        <div className="pt-8 mt-8 border-t border-white/10">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
              Account Pages
            </p>
          )}
          {accountItems.map(item => {
            if (item.page === 'Logout') {
              return (
                <AlertDialog key={item.page}>
                  <AlertDialogTrigger asChild>
                    <button
                      className={`nav-link flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} px-4 py-3 rounded-lg text-gray-300 transition-all hover:bg-white/5 hover:translate-x-1 cursor-pointer w-full text-left`}
                      title={isCollapsed ? 'Logout' : ''}
                    >
                      <span className={isCollapsed ? 'text-xl' : 'text-lg'}>{item.icon}</span>
                      {!isCollapsed && <span className="text-base font-medium">Logout</span>}
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to logout? You will need to log in again to access your dashboard.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => navigate('/login')}>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              );
            }

            if (item.page === 'CreateAccount') {
              return (
                <AlertDialog key={item.page}>
                  <AlertDialogTrigger asChild>
                    <button
                      className={`nav-link flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} px-4 py-3 rounded-lg text-gray-300 transition-all hover:bg-white/5 hover:translate-x-1 cursor-pointer w-full text-left`}
                      title={isCollapsed ? 'Create Account' : ''}
                    >
                      <span className={isCollapsed ? 'text-xl' : 'text-lg'}>{item.icon}</span>
                      {!isCollapsed && <span className="text-base font-medium">{item.label}</span>}
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Create New Account?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be redirected to the signup page to create a new RoadSense account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => navigate('/signup')}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              );
            }
            
            return (
              <a
                key={item.page}
                href="#"
                className={`nav-link flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} px-4 py-3 rounded-lg text-gray-300 transition-all hover:bg-white/5 hover:translate-x-1 ${activePage === item.page ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(item.page);
                }}
                title={isCollapsed ? (item.label || item.page) : ''}
              >
                <span className={isCollapsed ? 'text-xl' : 'text-lg'}>{item.icon}</span>
                {!isCollapsed && <span className="text-base font-medium">{item.label || item.page}</span>}
              </a>
            );
          })}
        </div>
      </nav>
      <div className="p-5 border-t border-white/10">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-lg">
              D
            </div>
            <div>
              <p className="font-semibold text-white text-base">Driver123</p>
              <p className="text-sm text-gray-400">Active User</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-lg">
              D
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

// Main Content Component
const MainContent = ({ activePage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { title, description, content } = pageContent[activePage];
  
  return (
    <main className="flex-grow flex flex-col overflow-hidden">
      {/* Header with Search Bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-8 overflow-auto">
        <div className="mt-4">{content}</div>
      </div>
    </main>
  );
};

// Main Dashboard Layout Component
export default function DashboardLayout() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  
  return (
    <>
      <style>{`
        .glass-effect {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(12px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link.active {
          background: rgba(45, 212, 191, 0.15);
          color: #5eead4;
        }
        
        .nav-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #2dd4bf;
        }
        
        .content-card {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .content-card:hover {
          border-color: rgba(45, 212, 191, 0.3);
          box-shadow: 0 0 20px rgba(45, 212, 191, 0.1);
          transform: translateY(-2px);
        }
        
        .custom-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .custom-table th {
          text-align: left;
          padding: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .custom-table td {
          padding: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
        }
        
        .shape-1 {
          position: fixed;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          top: -100px;
          right: -100px;
          pointer-events: none;
          animation: float 20s infinite ease-in-out;
        }
        
        .shape-2 {
          position: fixed;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          bottom: -100px;
          left: -100px;
          pointer-events: none;
          animation: float 15s infinite ease-in-out reverse;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.1); }
        }
      `}</style>
      <div className="relative min-h-screen w-full flex bg-slate-900 text-gray-200">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          navigate={navigate}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <MainContent activePage={activePage} />
      </div>
    </>
  );
}