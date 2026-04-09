'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react'
import { 
  ChartBarIcon, 
  EyeIcon, 
  CogIcon, 
  PlusIcon,
  ArrowRightOnRectangleIcon,
  GlobeAltIcon,
  LinkIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { LogoMark } from './landing/Logo'

interface DashboardClientProps {
  session: Session
}

interface Project {
  id: string
  name: string
  createdAt: string
}

interface RealtimeStats {
  count: number
  visitors: Array<{
    id: string
    pageUrl: string
    referrer: string
    country: string
    city: string
    userAgent: string
    timestamp: string
  }>
}

interface DailyStats {
  date: string
  visitors: number
}

interface CountryStats {
  country: string
  visitors: number
}

interface ReferrerStats {
  referrer: string
  visitors: number
}

const DashboardClient = ({ session }: DashboardClientProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [realtimeStats, setRealtimeStats] = useState<RealtimeStats>({ count: 0, visitors: [] });
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [countryStats, setCountryStats] = useState<CountryStats[]>([]);
  const [referrerStats, setReferrerStats] = useState<ReferrerStats[]>([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Real-time connection state
  const [isConnecting, setIsConnecting] = useState(false);
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);
  const maxReconnectionAttempts = 5;
  const [reconnectionTimeout, setReconnectionTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationName, setDeleteConfirmationName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const [isCopyingScript, setIsCopyingScript] = useState(false);
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dataFetched, setDataFetched] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/project')
      const data = await response.json()
      setProjects(data)
      if (data.length > 0 && !selectedProject) {
        setSelectedProject(data[0])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setLoading(false)
    }
  }, [selectedProject]);

  const fetchStats = useCallback(async () => {
    if (!selectedProject) return;
    setDataFetched(false);
    try {
      const fetchWithCheck = async (url: string) => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10_000);
        try {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `HTTP ${res.status}`);
          }
          return res.json();
        } finally {
          clearTimeout(timer);
        }
      };

      const [dailyData, countriesData, referrersData] = await Promise.all([
        fetchWithCheck(`/api/stats/project/${selectedProject.id}/7days`),
        fetchWithCheck(`/api/stats/project/${selectedProject.id}/countries`),
        fetchWithCheck(`/api/stats/project/${selectedProject.id}/referrers`)
      ]);

      setDailyStats(dailyData);
      setCountryStats(countriesData);
      setReferrerStats(referrersData);
      setDataFetched(true);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('Stats fetch timed out, will retry on next project selection.');
      } else {
        console.error('Error fetching stats:', error);
      }
      setDataFetched(true); // allow UI to recover
    }
  }, [selectedProject]);

  useEffect(() => {
    if (dataFetched && realtimeConnected) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [dataFetched, realtimeConnected]);

  const setupRealtimeConnection = useCallback(() => {
    if (!selectedProject || eventSourceRef.current?.readyState === EventSource.OPEN) return;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    if (reconnectionTimeout) {
      clearTimeout(reconnectionTimeout);
    }
    
    if (reconnectionAttempts >= maxReconnectionAttempts) {
        console.log('Max reconnection attempts reached.');
        setIsConnecting(false);
        return;
    }

    setIsConnecting(true);
    setRealtimeConnected(false);
    console.log(`Attempting to connect (attempt ${reconnectionAttempts + 1})`);

    const eventSource = new EventSource(`/api/realtime?projectId=${selectedProject.id}`);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log('SSE connection established');
      setIsConnecting(false);
      setRealtimeConnected(true);
      setReconnectionAttempts(0);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'error') {
          console.error('SSE server error:', data.message);
          eventSource.close();
          return;
        }
        if (data.type === 'stats') {
          setRealtimeStats(data);
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = () => {
      console.log('SSE connection error. Scheduling reconnect.');
      eventSource.close();
      setIsConnecting(false);
      setRealtimeConnected(false);

      const nextAttempt = reconnectionAttempts + 1;
      const delay = Math.min(1000 * Math.pow(2, nextAttempt), 30000);
      
      const timeout = setTimeout(() => {
        setReconnectionAttempts(nextAttempt);
      }, delay);
      setReconnectionTimeout(timeout);
    };
  }, [selectedProject, reconnectionAttempts, reconnectionTimeout]);
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (selectedProject) {
        fetchStats();
        // Trigger connection logic whenever project or reconnection state changes
        setupRealtimeConnection();
    }
    
    // Cleanup on unmount or when dependencies change
    return () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }
        if (reconnectionTimeout) {
            clearTimeout(reconnectionTimeout);
        }
    };
  }, [selectedProject, reconnectionAttempts, fetchStats, setupRealtimeConnection, reconnectionTimeout]);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleProjectSwitch = (project: Project) => {
    setSelectedProject(project);
    setDropdownOpen(false);
    setLoading(true);
    setDataFetched(false);
  };

  const createProject = async () => {
    if (!newProjectName.trim()) return

    setIsCreatingProject(true)
    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName })
      })
      
      const newProject = await response.json()
      setProjects([newProject, ...projects])
      setSelectedProject(newProject)
      setShowNewProjectModal(false)
      setNewProjectName('')
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsCreatingProject(false)
    }
  }

  const deleteProject = async () => {
    if (!selectedProject || selectedProject.name !== deleteConfirmationName) {
      // Maybe show an error toast here
      console.error('Confirmation name does not match')
      return
    }

    setIsDeletingProject(true)
    try {
      await fetch(`/api/project/${selectedProject.id}`, { method: 'DELETE' })
      
      // Reset state and fetch new project list
      setDeleteConfirmationName('')
      setShowDeleteModal(false)
      setSelectedProject(null) // This will trigger a re-fetch in useEffect
      await fetchProjects()

    } catch (error) {
      console.error('Error deleting project:', error)
      // Maybe show an error toast here
    } finally {
      setIsDeletingProject(false)
    }
  }

  const getTrackingScript = (projectId: string) => {
    // Use environment variable for production, fallback to current origin
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    return `<script src="${baseUrl}/track.js" data-site="${projectId}"></script>`
  }

  const copyToClipboard = async (text: string) => {
    setIsCopyingScript(true)
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    } finally {
      setIsCopyingScript(false)
    }
  }

  // Function to extract page name from URL
  const getPageName = (url: string) => {
    try {
      const urlObj = new URL(url)
      const path = urlObj.pathname
      
      if (path === '/' || path === '') {
        return 'Home'
      }
      
      // Remove leading slash and get the last part
      const parts = path.split('/').filter(part => part.length > 0)
      if (parts.length === 0) {
        return 'Home'
      }
      
      // Get the last part and capitalize it
      const lastPart = parts[parts.length - 1]
      return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/[-_]/g, ' ')
    } catch {
      return 'Unknown Page'
    }
  }

  // Function to get domain from URL
  const getDomain = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname
    } catch {
      return 'Unknown'
    }
  }

  // Show loading state when no projects exist yet
  if (!loading && projects.length === 0) {
  return (
      <>
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-16 w-16 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white font-mono mb-4">Welcome to spectr!</h2>
            <p className="text-zinc-400 font-mono mb-6">
              Create your first project to start tracking visitors in real-time. It only takes a few seconds to set up.
            </p>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 rounded hover:bg-zinc-200 transition font-mono font-bold mx-auto cursor-pointer"
            >
              <PlusIcon className="h-5 w-5" />
              Create Your First Project
            </button>
          </div>
        </div>

        {/* New Project Modal */}
        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 w-96">
              <h3 className="text-xl font-bold text-zinc-100 mb-4 font-mono">Create New Project</h3>
              <input
                type="text"
                placeholder="Project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white font-mono mb-4"
                onKeyPress={(e) => e.key === 'Enter' && createProject()}
              />
              <div className="flex gap-3">
                <button
                  onClick={createProject}
                  disabled={isCreatingProject}
                  className="flex-1 px-4 py-2 bg-white text-zinc-950 rounded hover:bg-zinc-200 transition font-mono cursor-pointer disabled:bg-white/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCreatingProject ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-950"></div>
                      Creating...
                    </>
                  ) : (
                    'Create'
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowNewProjectModal(false)
                    setNewProjectName('')
                  }}
                  disabled={isCreatingProject}
                  className="flex-1 px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition font-mono cursor-pointer disabled:bg-zinc-700/50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900/80 border-r border-zinc-800 backdrop-blur-xl transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="p-6">
          <div className="flex items-center justify-between gap-2 mb-8">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <LogoMark size={28} />
              <span className="font-bold text-lg text-white font-mono">spectr</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-zinc-400 hover:text-white cursor-pointer"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-mono transition cursor-pointer ${
                activeTab === 'overview' 
                  ? 'bg-white text-zinc-950' 
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <ChartBarIcon className="h-5 w-5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-mono transition cursor-pointer ${
                activeTab === 'live' 
                  ? 'bg-white text-zinc-950' 
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <EyeIcon className="h-5 w-5" />
              Live Feed
            </button>
            <button
              onClick={() => setActiveTab('setup')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-mono transition cursor-pointer ${
                activeTab === 'setup' 
                  ? 'bg-white text-zinc-950' 
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <CogIcon className="h-5 w-5" />
              Setup
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-zinc-800">
          <div className="text-xs text-zinc-500 mb-2 font-mono">
            {session.user?.name || session.user?.email}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-red-400 transition font-mono cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Top Bar */}
        <div className="bg-zinc-950/80 border-b border-zinc-800 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-zinc-400 hover:text-white cursor-pointer"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <div className="relative min-w-[180px] w-56">
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="w-full flex items-center justify-between px-4 py-2 bg-zinc-950 border border-zinc-700 rounded text-white font-mono focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {selectedProject?.name || 'Select Project'}
                  <svg className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && (
                  <div ref={dropdownRef} className="absolute z-50 mt-2 w-full bg-zinc-900 rounded-lg shadow-lg border border-zinc-800 overflow-hidden">
                    <div className="px-4 py-2 text-xs text-zinc-400 font-mono">Personal account</div>
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => handleProjectSwitch(project)}
                        className={`w-full text-left px-4 py-2 font-mono text-sm flex items-center gap-2 transition-colors ${selectedProject?.id === project.id ? 'bg-zinc-800 text-white' : 'text-zinc-200 hover:bg-zinc-700'}`}
                      >
                        {project.name}
                        {selectedProject?.id === project.id && (
                          <svg className="w-4 h-4 ml-auto text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowNewProjectModal(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white text-zinc-950 rounded hover:bg-zinc-200 transition font-mono text-sm cursor-pointer"
              >
                <PlusIcon className="h-4 w-4" />
                <span className="hidden sm:inline">New Project</span>
              </button>
            </div>
            
            {/* Real-time connection indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                realtimeConnected 
                  ? 'bg-zinc-100' 
                  : isConnecting 
                    ? 'bg-blue-400 animate-pulse' 
                    : reconnectionAttempts > 0 
                      ? 'bg-yellow-400 animate-pulse' 
                      : 'bg-red-400 animate-pulse'
              }`}></div>
              <span className="text-xs text-zinc-400 font-mono">
                {realtimeConnected 
                  ? 'Live' 
                  : isConnecting
                    ? 'Connecting...'
                    : reconnectionAttempts > 0 
                      ? `Reconnecting... (${reconnectionAttempts}/${maxReconnectionAttempts})`
                      : 'Disconnected'
                }
              </span>
              {!realtimeConnected && !isConnecting && reconnectionAttempts >= maxReconnectionAttempts && (
                <button
                  onClick={() => {
                    setReconnectionAttempts(0)
                    setupRealtimeConnection()
                  }}
                  className="text-xs text-white hover:text-zinc-200 transition cursor-pointer font-mono"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {loading && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-zinc-900 rounded-xl border border-zinc-800 w-fit mx-auto">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span className="text-white font-mono text-sm">Fetching project data...</span>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3 mb-2">
                    <EyeIcon className={`h-6 w-6 text-zinc-100 ${realtimeStats.count > 0 ? 'animate-pulse' : ''}`} />
                    <h3 className="text-zinc-100 font-semibold font-mono">Live Visitors</h3>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-white">{realtimeStats.count}</p>
                  )}
                </div>
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3 mb-2">
                    <ChartBarIcon className="h-6 w-6 text-cyan-400" />
                    <h3 className="text-cyan-400 font-semibold font-mono">7-Day Total</h3>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-white">
                      {dailyStats.reduce((sum, day) => sum + day.visitors, 0)}
                    </p>
                  )}
                </div>
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3 mb-2">
                    <GlobeAltIcon className="h-6 w-6 text-blue-400" />
                    <h3 className="text-blue-400 font-semibold font-mono">Countries</h3>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-white">{countryStats.length}</p>
                  )}
                </div>
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3 mb-2">
                    <LinkIcon className="h-6 w-6 text-purple-400" />
                    <h3 className="text-purple-400 font-semibold font-mono">Referrers</h3>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-white">{referrerStats.length}</p>
                  )}
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 7-Day Chart */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <h3 className="text-zinc-100 font-semibold mb-4 font-mono">7-Day Traffic</h3>
                  <div className="space-y-2">
                    {loading ? (
                      <div className="flex items-center justify-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      dailyStats.map((day) => {
                        const maxViews = Math.max(...dailyStats.map(d => d.visitors), 1);
                        const percentage = (day.visitors / maxViews) * 100;

                        return (
                          <div key={day.date} className="flex items-center gap-3">
                            <span className="text-xs text-zinc-400 font-mono w-16">
                              {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <div className="flex-1 bg-zinc-800 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-white h-2 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-white font-mono w-8 text-right">
                              {day.visitors}
                            </span>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                {/* Countries Chart */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <h3 className="text-zinc-100 font-semibold mb-4 font-mono">Top Countries</h3>
                  <div className="space-y-2">
                    {loading ? (
                      <div className="flex items-center justify-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      countryStats.slice(0, 5).map((country) => (
                        <div key={country.country} className="flex items-center gap-3">
                          <span className="text-xs text-zinc-400 font-mono flex-1">
                            {country.country}
                          </span>
                          <div className="flex-1 bg-zinc-800 rounded-full h-2">
                            <div 
                              className="bg-blue-400 h-2 rounded-full transition-all"
                              style={{ width: `${(country.visitors / Math.max(...countryStats.map(c => c.visitors))) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-blue-400 font-mono w-8 text-right">
                            {country.visitors}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Referrers Table */}
              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h3 className="text-zinc-100 font-semibold mb-4 font-mono">Top Referrers</h3>
                <div className="space-y-2">
                  {loading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    referrerStats.slice(0, 10).map((referrer) => (
                      <div key={referrer.referrer} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-b-0">
                        <span className="text-sm text-zinc-300 font-mono">{referrer.referrer}</span>
                        <span className="text-sm text-purple-400 font-mono">{referrer.visitors} visitors</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'live' && (
            <div className="space-y-6">
              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <EyeIcon className="h-6 w-6 text-zinc-100" />
                  <h2 className="text-xl font-bold text-zinc-100 font-mono">Live Feed</h2>
                  <span className="text-sm text-zinc-400 font-mono">
                    {realtimeStats.count} active visitors
                  </span>
                </div>
                
                {realtimeStats.visitors.length > 0 ? (
                  <div className="space-y-3">
                    {realtimeStats.visitors.map((visitor) => (
                      <div key={visitor.id} className="bg-zinc-950 p-4 rounded border border-zinc-800">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-zinc-100 rounded-full animate-pulse"></div>
                            <span className="text-sm text-white font-mono font-semibold">
                              {visitor.country}, {visitor.city}
                            </span>
                          </div>
                          <span className="text-xs text-zinc-500 font-mono">
                            {new Date(visitor.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        {/* Page Information */}
                        <div className="bg-zinc-900 p-3 rounded mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-zinc-500 font-mono">🌐</span>
                            <span className="text-xs text-zinc-400 font-mono">{getDomain(visitor.pageUrl)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-500 font-mono">📄</span>
                            <span className="text-sm text-white font-mono font-semibold">
                              {getPageName(visitor.pageUrl)}
                            </span>
                          </div>
                          <div className="mt-1">
                            <span className="text-xs text-zinc-600 font-mono break-all">
                              {visitor.pageUrl}
                            </span>
                          </div>
                        </div>
                        
                        {/* Referrer Information */}
                        {visitor.referrer && visitor.referrer !== '' && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-500 font-mono">🔗</span>
                            <span className="text-xs text-zinc-400 font-mono">
                              From: {visitor.referrer}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <EyeIcon className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-400 font-mono">No active visitors right now</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'setup' && selectedProject && (
            <div className="space-y-6">
              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h2 className="text-xl font-bold text-zinc-100 mb-4 font-mono">Setup Instructions</h2>
                <p className="text-zinc-400 mb-4 font-mono">
                  Add this script to your website&apos;s <code className="bg-zinc-950 p-1 rounded text-white">&lt;head&gt;</code> to start tracking visitors:
                </p>
                
                <div className="bg-zinc-950 p-4 rounded border border-zinc-800 mb-4">
                  <code className="text-white font-mono text-sm select-all">
                    {getTrackingScript(selectedProject.id)}
                  </code>
                </div>
                
                <button
                  onClick={() => copyToClipboard(getTrackingScript(selectedProject.id))}
                  disabled={isCopyingScript}
                  className="px-4 py-2 bg-white text-zinc-950 rounded hover:bg-zinc-200 transition font-mono cursor-pointer disabled:bg-white/50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isCopyingScript ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-950"></div>
                      Copying...
                    </>
                  ) : (
                    'Copy Script'
                  )}
                </button>
              </div>

              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h3 className="text-zinc-100 font-semibold mb-4 font-mono">Project Details</h3>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Project ID:</span>
                    <span className="text-white">{selectedProject.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Created:</span>
                    <span className="text-white">
                      {new Date(selectedProject.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                <h3 className="text-red-400 font-semibold mb-2 font-mono">Danger Zone</h3>
                <p className="text-zinc-400 text-sm mb-4 font-mono">
                  Deleting a project is irreversible. It will permanently remove the project and all associated event data.
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-mono cursor-pointer"
                >
                  Delete Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Project Modal */}
      {showDeleteModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl border border-red-500/50 w-full max-w-md">
            <h3 className="text-xl font-bold text-red-400 mb-2 font-mono">Delete Project</h3>
            <p className="text-zinc-400 mb-4 text-sm font-mono">
              This action cannot be undone. This will permanently delete the <strong className="text-white">{selectedProject.name}</strong> project and all of its associated data.
            </p>
            <p className="text-zinc-400 mb-4 text-sm font-mono">
              Please type the project name to confirm:
            </p>
            <input
              type="text"
              placeholder={selectedProject.name}
              value={deleteConfirmationName}
              onChange={(e) => setDeleteConfirmationName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white font-mono mb-4"
              onKeyPress={(e) => e.key === 'Enter' && deleteProject()}
            />
            <div className="flex gap-3">
              <button
                onClick={deleteProject}
                disabled={deleteConfirmationName !== selectedProject.name || isDeletingProject}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded transition font-mono cursor-pointer disabled:bg-red-500/30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeletingProject ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete this project'
                )}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeleteConfirmationName('')
                }}
                disabled={isDeletingProject}
                className="flex-1 px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition font-mono cursor-pointer disabled:bg-zinc-700/50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 w-96">
            <h3 className="text-xl font-bold text-zinc-100 mb-4 font-mono">Create New Project</h3>
            <input
              type="text"
              placeholder="Project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white font-mono mb-4"
              onKeyPress={(e) => e.key === 'Enter' && createProject()}
            />
            <div className="flex gap-3">
              <button
                onClick={createProject}
                disabled={isCreatingProject}
                className="flex-1 px-4 py-2 bg-white text-zinc-950 rounded hover:bg-zinc-200 transition font-mono cursor-pointer disabled:bg-white/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCreatingProject ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-950"></div>
                    Creating...
                  </>
                ) : (
                  'Create'
                )}
              </button>
              <button
                onClick={() => {
                  setShowNewProjectModal(false)
                  setNewProjectName('')
                }}
                disabled={isCreatingProject}
                className="flex-1 px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition font-mono cursor-pointer disabled:bg-zinc-700/50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Project Modal */}
      {showDeleteModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl border border-red-500/50 w-full max-w-md">
            <h3 className="text-xl font-bold text-red-400 mb-2 font-mono">Delete Project</h3>
            <p className="text-zinc-400 mb-4 text-sm font-mono">
              This action cannot be undone. This will permanently delete the <strong className="text-white">{selectedProject.name}</strong> project and all of its associated data.
            </p>
            <p className="text-zinc-400 mb-4 text-sm font-mono">
              Please type the project name to confirm:
            </p>
            <input
              type="text"
              placeholder={selectedProject.name}
              value={deleteConfirmationName}
              onChange={(e) => setDeleteConfirmationName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white font-mono mb-4"
              onKeyPress={(e) => e.key === 'Enter' && deleteProject()}
            />
            <div className="flex gap-3">
              <button
                onClick={deleteProject}
                disabled={deleteConfirmationName !== selectedProject.name || isDeletingProject}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded transition font-mono cursor-pointer disabled:bg-red-500/30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeletingProject ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete this project'
                )}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeleteConfirmationName('')
                }}
                disabled={isDeletingProject}
                className="flex-1 px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition font-mono cursor-pointer disabled:bg-zinc-700/50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardClient