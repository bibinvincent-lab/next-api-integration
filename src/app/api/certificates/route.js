import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;
const API_KEY = process.env.API_KEY;

function ensureRFC3339(dateStr) {
  if (!dateStr || dateStr === "string" || dateStr === "") {
    return new Date().toISOString();
  }
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return new Date().toISOString();
    }
    return d.toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
}

function normalizeCertificate(cert) {
  // Ensure numeric types are actually numbers (or fallback to 0)
  const id = Number(cert.id) || 0;
  const rank = Number(cert.rank) || 0;
  const score = Number(cert.score) || 0;
  const percentage = Number(cert.percentage) || 0;

  // Format main certificate dates
  const date = ensureRFC3339(cert.date);
  const issue_date = ensureRFC3339(cert.issue_date);
  const expiry_date = ensureRFC3339(cert.expiry_date);
  const created_at = ensureRFC3339(cert.created_at);
  const updated_at = ensureRFC3339(cert.updated_at);

  // Normalize student
  const student = cert.student ? {
    ...cert.student,
    id: Number(cert.student.id) || 0,
    interests: Array.isArray(cert.student.interests) ? cert.student.interests : [],
  } : {
    id: 0,
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    interests: [],
  };

  // Normalize issuer
  const issuer = cert.issuer ? {
    ...cert.issuer,
    id: Number(cert.issuer.id) || 0,
  } : {
    id: 0,
    name: "",
    website: "",
    logo: "",
    email: "",
  };

  // Normalize arrays (ensure they are arrays and items have proper types)
  const tags = Array.isArray(cert.tags) ? cert.tags : [];
  const categories = Array.isArray(cert.categories) ? cert.categories : [];
  const skills = Array.isArray(cert.skills) ? cert.skills : [];

  const modules = (Array.isArray(cert.modules) ? cert.modules : []).map(m => ({
    id: Number(m.id) || 0,
    name: String(m.name || ""),
    score: Number(m.score) || 0,
    max_score: Number(m.max_score) || 0,
    passed: Boolean(m.passed),
    completed_at: ensureRFC3339(m.completed_at),
  }));

  const achievements = (Array.isArray(cert.achievements) ? cert.achievements : []).map(a => ({
    id: Number(a.id) || 0,
    title: String(a.title || ""),
    description: String(a.description || ""),
    badge_url: String(a.badge_url || ""),
  }));

  const documents = (Array.isArray(cert.documents) ? cert.documents : []).map(d => ({
    id: Number(d.id) || 0,
    name: String(d.name || ""),
    type: String(d.type || ""),
    size: Number(d.size) || 0,
    url: String(d.url || ""),
  }));

  // Normalize settings
  const settings = cert.settings ? {
    show_score: Boolean(cert.settings.show_score),
    show_rank: Boolean(cert.settings.show_rank),
    downloadable: Boolean(cert.settings.downloadable),
    public_profile: Boolean(cert.settings.public_profile),
  } : {
    show_score: false,
    show_rank: false,
    downloadable: false,
    public_profile: false,
  };

  // Normalize statistics
  const statistics = cert.statistics ? {
    total_students: Number(cert.statistics.total_students) || 0,
    average_score: Number(cert.statistics.average_score) || 0,
    highest_score: Number(cert.statistics.highest_score) || 0,
    completion_rate: Number(cert.statistics.completion_rate) || 0,
    global_ranking: Number(cert.statistics.global_ranking) || 0,
    country_ranking: Number(cert.statistics.country_ranking) || 0,
  } : {
    total_students: 0,
    average_score: 0,
    highest_score: 0,
    completion_rate: 0,
    global_ranking: 0,
    country_ranking: 0,
  };

  // Normalize links
  const links = cert.links ? {
    certificate_url: String(cert.links.certificate_url || ""),
    verify_url: String(cert.links.verify_url || ""),
    download_url: String(cert.links.download_url || ""),
  } : {
    certificate_url: "",
    verify_url: "",
    download_url: "",
  };

  // Normalize metadata & custom fields
  const metadata = cert.metadata && typeof cert.metadata === "object" ? cert.metadata : {};
  const custom_fields = cert.custom_fields && typeof cert.custom_fields === "object" ? cert.custom_fields : {};

  // Normalize audit trail
  const audit_trail = (Array.isArray(cert.audit_trail) ? cert.audit_trail : []).map(at => ({
    action: String(at.action || ""),
    user: String(at.user || ""),
    ip_address: String(at.ip_address || ""),
    timestamp: ensureRFC3339(at.timestamp),
  }));

  return {
    id,
    name: String(cert.name || ""),
    course: String(cert.course || ""),
    grade: String(cert.grade || ""),
    date,
    status: String(cert.status || ""),
    score,
    percentage,
    rank,
    is_verified: Boolean(cert.is_verified),
    is_expired: Boolean(cert.is_expired),
    issue_date,
    expiry_date,
    created_at,
    updated_at,
    student,
    issuer,
    tags,
    categories,
    skills,
    modules,
    achievements,
    documents,
    metadata,
    statistics,
    settings,
    links,
    custom_fields,
    audit_trail,
  };
}

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/read`, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `Backend returned error ${res.status}: ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch certificates: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const normalized = normalizeCertificate(body);

    const res = await fetch(`${BACKEND_URL}/create`, {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(normalized),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Bad Request" },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create certificate: ${error.message}` },
      { status: 500 }
    );
  }
}
