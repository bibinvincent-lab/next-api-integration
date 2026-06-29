"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const DEFAULT_STATE = {
  name: "",
  course: "",
  grade: "",
  status: "Pending",
  score: "",
  rank: "",
  issue_date: "",
  expiry_date: "",

  student: {
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    interests: [],
  },

  tags: [],
  categories: [],
  skills: [],

  modules: [],
  achievements: [],
  documents: [],

  metadata: [{ key: "", value: "" }],
  custom_fields: [{ key: "", value: "" }],

  settings: {
    show_score: true,
    show_rank: true,
    downloadable: true,
    public_profile: true,
  },
};

export const SAMPLE_CERTIFICATE = {
  name: "React Developer Certification",
  course: "Mastering Next.js 16 & MUI",
  grade: "A+",
  status: "Completed",
  score: "94",
  rank: "3",
  issue_date: "2026-06-01",
  expiry_date: "2029-06-01",
  student: {
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1234567890",
    country: "United States",
    city: "San Francisco",
    interests: ["React", "Next.js", "Material UI"],
  },
  tags: ["Frontend", "React", "NextJS", "MUI"],
  categories: ["Software Engineering", "Web Development"],
  skills: ["React Hooks", "Server Components", "Tailwind CSS", "MUI Custom Themes"],
  modules: [
    {
      id: "1",
      name: "React Server Components Deep Dive",
      score: "98",
      max_score: "100",
      passed: true,
      completed_at: "2026-05-15",
    },
    {
      id: "2",
      name: "MUI v9 Layouts & Grids",
      score: "90",
      max_score: "100",
      passed: true,
      completed_at: "2026-05-20",
    }
  ],
  achievements: [
    {
      id: "1",
      title: "Pixel Perfect",
      description: "Implemented all design systems flawlessly.",
      badge_url: "https://example.com/badges/pixel_perfect.png",
    }
  ],
  documents: [
    {
      id: "1",
      name: "alice_nextjs_cert.pdf",
      type: "pdf",
      size: "482019",
      url: "https://example.com/certs/alice_nextjs_cert.pdf",
    }
  ],
  metadata: [{ key: "language", value: "English" }, { key: "cohort", value: "2026-Q2" }],
  custom_fields: [{ key: "graduation_hat_color", value: "Gold" }, { key: "honors", value: "First Class" }],
  settings: {
    show_score: true,
    show_rank: true,
    downloadable: true,
    public_profile: true,
  },
};

export const steps = [
  "Certificate Information",
  "Student Information",
  "Assessment Information",
  "Recognition & Classification",
  "Documents & Configuration",
  "Review & Submit"
];

export function useCreateCertificate() {
  const router = useRouter();
  const [formState, setFormState] = useState(DEFAULT_STATE);
  const [certificates, setCertificates] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showJsonView, setShowJsonView] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [moduleInput, setModuleInput] = useState({ id: "", name: "", score: "", max_score: "", passed: true, completed_at: "" });
  const [achievementInput, setAchievementInput] = useState({ id: "", title: "", description: "", badge_url: "" });
  const [documentInput, setDocumentInput] = useState({ id: "", name: "", type: "", size: "", url: "" });
  const [createdCertificate, setCreatedCertificate] = useState(null);
  
  // Unified Snackbar State
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const isValidPhone = (phone) => {
    if (!phone) return true;
    const re = /^\+?[1-9]\d{7,14}$/;
    return re.test(phone);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/certificates");
      if (res.ok) {
        const data = await res.json();
        setCertificates(Array.isArray(data) ? data : []);
      } else {
        showSnackbar("Failed to fetch certificates from backend", "error");
      }
    } catch (err) {
      showSnackbar("Error connecting to server proxy", "error");
    } finally {
      setLoadingList(false);
    }
  };

  const addItemToArray = (field, value, setter) => {
    if (!value.trim()) {
      showSnackbar(`${field} cannot be empty`, "warning");
      return;
    }

    setFormState((prev) => {
      if (prev[field].includes(value.trim())) {
        showSnackbar(`${value} already exists`, "warning");
        return prev;
      }

      return {
        ...prev,
        [field]: [...prev[field], value.trim()],
      };
    });

    setter("");
  };

  const removeItemFromArray = (field, index) => {
    setFormState((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleTextChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleNestedCheckboxChange = (parent, field, checked) => {
    setFormState((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: checked,
      },
    }));
  };

  const handleLoadSample = () => {
    setFormState(JSON.parse(JSON.stringify(SAMPLE_CERTIFICATE)));
    showSnackbar("Loaded mock certificate template!");
  };

  const handleClear = () => {
    setFormState(DEFAULT_STATE);
    setActiveStep(0);
    showSnackbar("Form cleared", "info");
  };

  // Dynamic Key-Value Lists
  const handleKeyValueChange = (type, index, field, value) => {
    setFormState((prev) => {
      const newArray = [...prev[type]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [type]: newArray };
    });
  };

  const addKeyValueRow = (type) => {
    setFormState((prev) => ({
      ...prev,
      [type]: [...prev[type], { key: "", value: "" }]
    }));
  };

  const removeKeyValueRow = (type, index) => {
    setFormState((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (!skillInput.trim()) {
      showSnackbar("Skill is required", "warning");
      return;
    }

    if (formState.skills.includes(skillInput.trim())) {
      showSnackbar("Skill already added", "warning");
      return;
    }

    setFormState((prev) => ({
      ...prev,
      skills: [...prev.skills, skillInput.trim()],
    }));

    setSkillInput("");
  };

  const removeSkill = (index) => {
    setFormState((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addModule = () => {
    if (!moduleInput.name) {
      showSnackbar("Module Name is required", "warning");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      modules: [...prev.modules, { ...moduleInput }],
    }));
    setModuleInput({ id: "", name: "", score: "", max_score: "", passed: true, completed_at: "" });
  };

  const removeModule = (index) => {
    setFormState((prev) => ({ ...prev, modules: prev.modules.filter((_, i) => i !== index) }));
  };

  const addAchievement = () => {
    if (!achievementInput.title) {
      showSnackbar("Achievement Title is required", "warning");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { ...achievementInput }],
    }));
    setAchievementInput({ id: "", title: "", description: "", badge_url: "" });
  };

  const removeAchievement = (index) => {
    setFormState((prev) => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
  };

  const addDocument = () => {
    if (!documentInput.name || !documentInput.url) {
      showSnackbar("Document Name and URL are required", "warning");
      return;
    }
    if (!isValidURL(documentInput.url)) {
      showSnackbar("Please enter a valid URL for the Document", "warning");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      documents: [...prev.documents, { ...documentInput }],
    }));
    setDocumentInput({ id: "", name: "", type: "", size: "", url: "" });
  };

  const removeDocument = (index) => {
    setFormState((prev) => ({ ...prev, documents: prev.documents.filter((_, i) => i !== index) }));
  };

  const isValidURL = (string) => {
    if (!string) return true;
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateStep1 = () => {
    if (!formState.name.trim()) {
      showSnackbar("Certificate Name is required.", "warning");
      return false;
    }

    if (!formState.course.trim()) {
      showSnackbar("Course Title is required.", "warning");
      return false;
    }

    if (!formState.issue_date) {
      showSnackbar("Issue Date is required.", "warning");
      return false;
    }

    if (
      formState.expiry_date &&
      new Date(formState.expiry_date) <= new Date(formState.issue_date)
    ) {
      showSnackbar("Expiry Date must be later than Issue Date.", "warning");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!formState.student.name.trim()) {
      showSnackbar("Student Name is required.", "warning");
      return false;
    }
    if (!formState.student.email.trim()) {
      showSnackbar("Student Email is required.", "warning");
      return false;
    }

    if (!isValidEmail(formState.student.email)) {
      showSnackbar("Please enter a valid Student Email.", "warning");
      return false;
    }

    if (formState.student.phone.trim() && !isValidPhone(formState.student.phone)) {
      showSnackbar("Please enter a valid phone number.", "warning");
      return false;
    }

    if (!formState.student.country.trim()) {
      showSnackbar("Country is required.", "warning");
      return false;
    }

    if (!formState.student.city.trim()) {
      showSnackbar("City is required.", "warning");
      return false;
    }

    return true;
  };

  const validateStep3 = () => {
    if (!formState.score) {
      showSnackbar("Score is required.", "warning");
      return false;
    }

    const score = Number(formState.score);

    if (isNaN(score) || score < 0 || score > 100) {
      showSnackbar("Score must be a number between 0 and 100.", "warning");
      return false;
    }

    if (!formState.grade) {
      showSnackbar("Grade is required.", "warning");
      return false;
    }

    if (!formState.rank) {
      showSnackbar("Rank is required.", "warning");
      return false;
    }

    if (formState.modules.length === 0) {
      showSnackbar("At least one module is required.", "warning");
      return false;
    }

    for (const module of formState.modules) {
      if (!module.name || !module.name.trim()) {
        showSnackbar("Module Name is required.", "warning");
        return false;
      }

      if (Number(module.score) > Number(module.max_score)) {
        showSnackbar(`Module "${module.name}" score cannot exceed max score.`, "warning");
        return false;
      }
    }

    return true;
  };

  const validateStep4 = () => {
    if (formState.categories.length === 0) {
      showSnackbar("At least one category is required.", "warning");
      return false;
    }

    if (formState.skills.length === 0) {
      showSnackbar("At least one skill is required.", "warning");
      return false;
    }

    if (formState.tags.length === 0) {
      showSnackbar("At least one tag is required.", "warning");
      return false;
    }

    for (const ach of formState.achievements) {
      if (!ach.title || !ach.title.trim()) {
        showSnackbar("Achievement Title cannot be empty.", "warning");
        return false;
      }

      if (ach.badge_url && !isValidURL(ach.badge_url)) {
        showSnackbar("One or more Achievement Badge URLs are invalid.", "warning");
        return false;
      }
    }

    return true;
  };

  const validateStep5 = () => {
    if (formState.documents.length === 0) {
      showSnackbar("At least one document is required.", "warning");
      return false;
    }

    for (const doc of formState.documents) {
      if (!doc.name || !doc.name.trim()) {
        showSnackbar("Document Name is required.", "warning");
        return false;
      }

      if (!doc.url || !doc.url.trim()) {
        showSnackbar("Document URL is required.", "warning");
        return false;
      }

      if (!isValidURL(doc.url)) {
        showSnackbar(`Invalid URL for document "${doc.name}".`, "warning");
        return false;
      }
    }

    return true;
  };

  const validateAll = () => {
    return (
      validateStep1() &&
      validateStep2() &&
      validateStep3() &&
      validateStep4() &&
      validateStep5()
    );
  };

  const handleNext = () => {
    let isValid = true;

    switch (activeStep) {
      case 0:
        isValid = validateStep1();
        break;
      case 1:
        isValid = validateStep2();
        break;
      case 2:
        isValid = validateStep3();
        break;
      case 3:
        isValid = validateStep4();
        break;
      case 4:
        isValid = validateStep5();
        break;
      default:
        break;
    }

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      router.push("/certificates");
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  const getCompiledJson = () => {
    const currentIsoDate = new Date().toISOString();
    const futureIsoDate = new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString();

    const toRFC3339 = (dateStr, fallback) => {
      if (!dateStr || dateStr === "") return fallback;
      try {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? fallback : d.toISOString();
      } catch (e) {
        return fallback;
      }
    };

    const generatedId = Math.floor(Math.random() * 900000) + 100;

    const metadataObj = {};
    formState.metadata.forEach((item) => {
      if (item.key.trim() !== "") metadataObj[item.key.trim()] = item.value.trim();
    });

    const customFieldsObj = {};
    formState.custom_fields.forEach((item) => {
      if (item.key.trim() !== "") customFieldsObj[item.key.trim()] = item.value.trim();
    });

    const scoreVal = Number(formState.score) || 1;
    const percentageVal = scoreVal;
    const rankVal = Number(formState.rank) || 1;

    let isExpiredVal = false;
    if (formState.expiry_date) {
      const expDate = new Date(formState.expiry_date);
      if (!isNaN(expDate.getTime()) && expDate < new Date()) {
        isExpiredVal = true;
      }
    }

    const studentInterests = Array.isArray(formState.student.interests) && formState.student.interests.length > 0
      ? formState.student.interests
      : ["General"];

    const tags = formState.tags;
    const categories = formState.categories;
    const skills = formState.skills;

    const modules = formState.modules.length > 0
      ? formState.modules.map(m => ({
        id: Number(m.id) || Math.floor(Math.random() * 90000) + 100,
        name: m.name || "Module",
        score: Number(m.score) || 1,
        max_score: Number(m.max_score) || 100,
        passed: Boolean(m.passed),
        completed_at: toRFC3339(m.completed_at, currentIsoDate)
      }))
      : [{
        id: Math.floor(Math.random() * 90000) + 100,
        name: formState.course || "Core Module",
        score: scoreVal,
        max_score: 100,
        passed: true,
        completed_at: currentIsoDate
      }];

    const achievements = formState.achievements.length > 0
      ? formState.achievements.map(a => ({
        id: Number(a.id) || Math.floor(Math.random() * 90000) + 100,
        title: a.title || "Achievement",
        description: a.description || "",
        badge_url: a.badge_url || ""
      }))
      : [{ id: Math.floor(Math.random() * 90000) + 100, title: "Course Completion", description: "Completed the course", badge_url: "" }];

    const documents = formState.documents.length > 0
      ? formState.documents.map(d => ({
        id: Number(d.id) || Math.floor(Math.random() * 90000) + 100,
        name: d.name || "document.pdf",
        type: d.type || "pdf",
        size: Number(d.size) || 1,
        url: d.url || "https://example.com/document.pdf"
      }))
      : [{
        id: Math.floor(Math.random() * 90000) + 100,
        name: "certificate.pdf",
        type: "pdf",
        size: 1,
        url: "https://example.com/certificate.pdf"
      }];

    const issueDateRFC = toRFC3339(formState.issue_date, currentIsoDate);
    const expiryDateRFC = toRFC3339(formState.expiry_date, futureIsoDate);

    return {
      id: generatedId,
      name: formState.name,
      course: formState.course,
      grade: formState.grade || "N/A",
      date: issueDateRFC,
      status: formState.status || "Completed",
      score: scoreVal,
      percentage: percentageVal,
      rank: rankVal,
      is_verified: true,
      is_expired: isExpiredVal,
      issue_date: issueDateRFC,
      expiry_date: expiryDateRFC,
      created_at: currentIsoDate,
      updated_at: currentIsoDate,
      student: {
        id: Math.floor(Math.random() * 900000) + 100,
        name: formState.student.name,
        email: formState.student.email,
        phone: formState.student.phone || "+0-000-0000",
        country: formState.student.country || "N/A",
        city: formState.student.city || "N/A",
        interests: studentInterests,
      },
      issuer: {
        id: Math.floor(Math.random() * 900000) + 100,
        name: "Test Academy",
        email: "info@test.ai",
        website: "https://test.ai",
        logo: "https://picsum.photos/100",
      },
      tags,
      categories,
      skills,
      modules,
      achievements,
      documents,
      metadata: metadataObj,
      custom_fields: customFieldsObj,
      statistics: {
        total_students: 0,
        average_score: 0,
        highest_score: 0,
        completion_rate: 0,
        global_ranking: 0,
        country_ranking: 0,
      },
      settings: formState.settings,
      links: {
        certificate_url: "",
        verify_url: "",
        download_url: "",
      },
      audit_trail: [
        {
          action: "created",
          user: "admin",
          ip_address: "127.0.0.1",
          timestamp: currentIsoDate,
        }
      ]
    };
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!validateAll()) return;

    setSubmitting(true);
    setApiResponse(null);
    const payload = getCompiledJson();

    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setApiResponse({
        status: res.status,
        statusText: res.statusText,
        data,
      });

      if (res.ok) {
        setCreatedCertificate(data);

        showSnackbar(
          `Certificate #${data.id} created successfully for ${data.student?.name || data.name}`,
          "success"
        );

        setFormState(DEFAULT_STATE);
        setActiveStep(0);

        fetchCertificates();
      } else {
        showSnackbar(data.error || "Failed to create certificate", "error");
      }
    } catch (err) {
      showSnackbar("Network error submitting certificate", "error");
      setApiResponse({ status: 500, error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formState,
    setFormState,
    certificates,
    loadingList,
    submitting,
    activeStep,
    setActiveStep,
    showJsonView,
    setShowJsonView,
    apiResponse,
    setApiResponse,
    skillInput,
    setSkillInput,
    moduleInput,
    setModuleInput,
    achievementInput,
    setAchievementInput,
    documentInput,
    setDocumentInput,
    createdCertificate,
    setCreatedCertificate,
    snackbar,
    setSnackbar,
    showSnackbar,
    categoryInput,
    setCategoryInput,
    tagInput,
    setTagInput,
    isValidPhone,
    isValidURL,
    isValidEmail,
    addItemToArray,
    removeItemFromArray,
    handleTextChange,
    handleNestedChange,
    handleNestedCheckboxChange,
    handleLoadSample,
    handleClear,
    handleKeyValueChange,
    addKeyValueRow,
    removeKeyValueRow,
    addSkill,
    removeSkill,
    addModule,
    removeModule,
    addAchievement,
    removeAchievement,
    addDocument,
    removeDocument,
    handleNext,
    handleBack,
    handleSubmit,
    getCompiledJson,
    steps,
  };
}
