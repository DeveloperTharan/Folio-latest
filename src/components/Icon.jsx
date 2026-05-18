import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Network,
  Code2,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  ArrowRight,
  Activity,
  Layers,
  Zap,
  Database,
  Server,
  Shield,
  Workflow,
  CircuitBoard,
  Wrench,
  Sparkles,
  Award,
  TrendingUp,
  GitBranch,
  Cpu,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  Circle,
  Clock,
  Globe,
} from "lucide-react";

const map = {
  Home, User, Briefcase, FolderGit2, Network, Code2, GraduationCap, Mail,
  Phone, MapPin, Github, Linkedin, Twitter, ArrowUpRight, ArrowRight, Activity,
  Layers, Zap, Database, Server, Shield, Workflow, CircuitBoard, Wrench,
  Sparkles, Award, TrendingUp, GitBranch, Cpu, Menu, X, ExternalLink,
  CheckCircle2, Circle, Clock, Globe,
};

export default function Icon({ name, className = "", size }) {
  const Component = map[name] || Circle;
  return <Component className={className} size={size} />;
}
