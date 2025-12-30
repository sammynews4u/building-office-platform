
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ANALYTICS = 'ANALYTICS',
  MARKETPLACE = 'MARKETPLACE',
  SERVICES_MARKETPLACE = 'SERVICES_MARKETPLACE',
  FINANCE = 'FINANCE',
  PROJECTS = 'PROJECTS',
  HR = 'HR',
  JOBS = 'JOBS',
  BOQ = 'BOQ',
  COMPANY_PROFILE = 'COMPANY_PROFILE',
  CLIENT_PORTAL = 'CLIENT_PORTAL',
  DOCUMENTS = 'DOCUMENTS',
  COLLABORATION = 'COLLABORATION',
  SUBSCRIPTION = 'SUBSCRIPTION',
  SECURITY = 'SECURITY',
  INVOICE_GENERATOR = 'INVOICE_GENERATOR',
  ABOUT = 'ABOUT',
  PARTNERS = 'PARTNERS',
  CONTACT = 'CONTACT',
  LEGAL = 'LEGAL'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  WORKER = 'WORKER',
  CLIENT = 'CLIENT'
}

export interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies: string[]; // IDs of tasks this task depends on
  status: 'Pending' | 'In Progress' | 'Completed' | 'Blocked';
  assignee?: string;
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'Upcoming' | 'Reached' | 'Overdue';
  description: string;
  notifiedUpcoming?: boolean; // Track if upcoming alert was dispatched
  notifiedOverdue?: boolean;  // Track if overdue alert was dispatched
}

export interface SiteReport {
  id: string;
  date: string;
  supervisor: string;
  weather: string;
  workforceCount: number;
  summary: string;
  incidents: string;
}

export interface SiteIssue {
  id: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Resolved';
  reportedAt: string;
}

export interface SiteIncident {
  id: string;
  title: string;
  type: 'Safety' | 'Environmental' | 'Security' | 'Medical';
  date: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Reported' | 'Investigating' | 'Resolved';
  description: string;
  reportedBy: string;
}

export interface InspectionCheck {
  id: string;
  label: string;
  isPassed: boolean;
}

export interface Inspection {
  id: string;
  title: string;
  date: string;
  inspector: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  checks: InspectionCheck[];
}

export interface Defect {
  id: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Fixed' | 'Verified';
  location: string;
  reportedAt: string;
}

export interface DocumentVersion {
  version: string;
  date: string;
  author: string;
  url: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  category: 'Contract' | 'Drawing' | 'Permit' | 'Insurance' | 'Report';
  type: string; // e.g. "PDF", "DWG"
  size: string;
  updatedAt: string;
  versions: DocumentVersion[];
  projectId?: string;
  isSharedWithClient?: boolean;
}

export interface ComplianceRequirement {
  id: string;
  title: string;
  category: 'Safety' | 'Regulatory' | 'Insurance' | 'Legal';
  status: 'Compliant' | 'Pending' | 'Action Required' | 'Expired';
  expiryDate?: string;
  reminderSent: boolean;
}

export interface ClientFeedback {
  id: string;
  date: string;
  rating: number;
  comment: string;
  category: 'Progress' | 'Quality' | 'Communication' | 'Other';
}

export interface Stakeholder {
  id: string;
  name: string;
  role: 'Architect' | 'Engineer' | 'Consultant' | 'Sub-contractor' | 'Vendor';
  company: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Hold' | 'Completed';
  lastActive: string;
  avatar?: string;
  assignedTasks?: string[]; // IDs of tasks this stakeholder is responsible for
}

export interface Project {
  id: string;
  name: string;
  location: string;
  status: 'In Progress' | 'Completed' | 'Delayed' | 'Planned';
  budget: number;
  spent: number;
  progress: number;
  startDate?: string;
  endDate?: string;
  projectManager?: string;
  clientContact?: {
    name: string;
    email: string;
    phone: string;
  };
  tasks?: Task[];
  milestones?: Milestone[];
  siteReports?: SiteReport[];
  siteIssues?: SiteIssue[];
  sitePhotos?: string[];
  inspections?: Inspection[];
  defects?: Defect[];
  documents?: ProjectDocument[];
  compliance?: ComplianceRequirement[];
  incidents?: SiteIncident[];
  feedback?: ClientFeedback[];
  stakeholders?: Stakeholder[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  total: number;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Partial' | 'Paid' | 'Overdue';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  vatRate: number; // percentage
  vatAmount: number;
  withholdingRate: number; // percentage
  withholdingAmount: number;
  grandTotal: number;
  amountPaid: number;
  status: InvoiceStatus;
  project?: string;
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  invoiceId: string;
  clientName: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'Material' | 'Equipment' | 'Service';
  price: number;
  unit: string;
  rating: number;
  image: string;
  provider: string;
  isFeatured?: boolean;
  isSponsored?: boolean;
}

export interface AttendanceRecord {
  id: string;
  workerId: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  location: string;
  isGpsVerified: boolean;
  status: 'Present' | 'Late' | 'Absent' | 'On Leave';
  overtimeHours: number;
}

export interface PayrollRecord {
  id: string;
  workerId: string;
  period: string; // e.g. "Oct 2024"
  basePay: number;
  overtimePay: number;
  deductions: number;
  totalNet: number;
  status: 'Pending' | 'Approved' | 'Paid';
  paymentDate?: string;
}

export interface Shift {
  id: string;
  workerId: string;
  projectId: string;
  date: string;
  type: 'Morning' | 'Evening' | 'Night';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface LeaveRequest {
  id: string;
  workerId: string;
  startDate: string;
  endDate: string;
  type: 'Sick' | 'Vacation' | 'Personal';
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  replacementWorkerId?: string;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  status: 'On Site' | 'Off Duty' | 'Leave';
  rating: number;
  avatar: string;
  skills: string[];
  certifications: string[];
  contractType: 'Daily' | 'Weekly' | 'Monthly' | 'Permanent';
  currentProject: string;
  phone: string;
  email: string;
  joinDate: string;
  attendance?: number; // percentage
  hourlyRate: number;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: 'Income' | 'Expense';
  description: string;
  project?: string;
}

export type OpportunitySource = 'Government' | 'Private' | 'NGO' | 'Corporate' | 'Internal';

export interface JobOpportunity {
  id: string;
  title: string;
  source: string;
  sourceType: OpportunitySource;
  budget: number;
  location: string;
  deadline: string;
  projectType: string;
  description: string;
  matchScore: number;
  isSaved?: boolean;
  status?: 'New' | 'Applied' | 'Under Review' | 'Shortlisted' | 'Won' | 'Closed' | 'Hiring';
  applicants?: number;
}
