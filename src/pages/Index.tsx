import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  hero: "https://cdn.poehali.dev/projects/72370595-71ac-4c0c-8065-d4da3ef6a8a5/files/f5f18c44-5587-4e4f-b994-d88f41efc8d9.jpg",
  complex1: "https://cdn.poehali.dev/projects/72370595-71ac-4c0c-8065-d4da3ef6a8a5/files/190c1085-fb34-466d-93b8-2cabec0f7eac.jpg",
  interior: "https://cdn.poehali.dev/projects/72370595-71ac-4c0c-8065-d4da3ef6a8a5/files/fc6e1a4e-9101-4216-b5a0-688be25e87da.jpg",
  aerial: "https://cdn.poehali.dev/projects/72370595-71ac-4c0c-8065-d4da3ef6a8a5/files/3a7ba2be-023e-4315-9f1c-8cf5a26bf972.jpg",
};

const quizSteps = [
  {
    id: 1,
    question: "Какова цель покупки?",
    emoji: "🏠",
    options: [
      { id: "self", label: "Для себя / семьи", icon: "Users" },
      { id: "invest", label: "Инвестиции", icon: "TrendingUp" },
      { id: "rent", label: "Под аренду", icon: "Key" },
      { id: "relocate", label: "Переезд / смена города", icon: "MapPin" },
    ],
  },
  {
    id: 2,
    question: "Какой бюджет рассматриваете?",
    emoji: "💰",
    options: [
      { id: "budget1", label: "до 4 млн ₽", icon: "Wallet" },
      { id: "budget2", label: "4–7 млн ₽", icon: "Banknote" },
      { id: "budget3", label: "7–12 млн ₽", icon: "CreditCard" },
      { id: "budget4", label: "от 12 млн ₽", icon: "Gem" },
    ],
  },
  {
    id: 3,
    question: "В каком регионе ищете?",
    emoji: "📍",
    options: [
      { id: "ekb", label: "Екатеринбург", icon: "Building2" },
      { id: "msk", label: "Москва / МО", icon: "Navigation" },
      { id: "sea", label: "Черноморское побережье", icon: "Compass" },
      { id: "abroad", label: "За рубежом", icon: "Globe" },
    ],
  },
  {
    id: 4,
    question: "Желаемая площадь квартиры?",
    emoji: "📐",
    options: [
      { id: "studio", label: "Студия (до 35 м²)", icon: "Square" },
      { id: "one", label: "1-комн. (35–50 м²)", icon: "SquareDashed" },
      { id: "two", label: "2-комн. (50–75 м²)", icon: "LayoutGrid" },
      { id: "three", label: "3+ комн. (75+ м²)", icon: "StretchHorizontal" },
    ],
  },
  {
    id: 5,
    question: "Когда планируете покупку?",
    emoji: "📅",
    options: [
      { id: "now", label: "Готов купить сейчас", icon: "Zap" },
      { id: "3m", label: "В ближайшие 3 месяца", icon: "Clock" },
      { id: "6m", label: "В течение полугода", icon: "Calendar" },
      { id: "year", label: "Пока только изучаю", icon: "Search" },
    ],
  },
];

const properties = [
  {
    id: 1,
    name: "ЖК «Чкалов»",
    district: "Центр",
    price: "от 7.1 млн ₽",
    priceM2: "165 000 ₽/м²",
    area: "43–92 м²",
    deadline: "IV кв. 2026",
    propClass: "Бизнес",
    badge: "ХИТ",
    badgeColor: "#FF8C00",
    img: IMAGES.hero,
    features: ["Паркинг", "Консьерж", "Фитнес"],
    rating: 4.9,
  },
  {
    id: 2,
    name: "ЖК «Квартал на Декабристов»",
    district: "Север / ВИЗ",
    price: "от 4.2 млн ₽",
    priceM2: "112 000 ₽/м²",
    area: "30–68 м²",
    deadline: "II кв. 2026",
    propClass: "Комфорт",
    badge: "НОВЫЙ",
    badgeColor: "#00D4FF",
    img: IMAGES.complex1,
    features: ["Детская площадка", "Охрана", "Магазины"],
    rating: 4.7,
  },
  {
    id: 3,
    name: "ЖК «Академический»",
    district: "Академический",
    price: "от 4.8 млн ₽",
    priceM2: "121 000 ₽/м²",
    area: "37–80 м²",
    deadline: "III кв. 2026",
    propClass: "Комфорт+",
    badge: "ВЫГОДНО",
    badgeColor: "#39FF14",
    img: IMAGES.aerial,
    features: ["Школа во дворе", "Парк", "Велодорожки"],
    rating: 4.8,
  },
  {
    id: 4,
    name: "ЖК «Макаровский»",
    district: "Центр",
    price: "от 13.5 млн ₽",
    priceM2: "220 000 ₽/м²",
    area: "62–185 м²",
    deadline: "Сдан",
    propClass: "Премиум",
    badge: "ПРЕМИУМ",
    badgeColor: "#FF8C00",
    img: IMAGES.interior,
    features: ["СПА", "Консьерж", "Подземный паркинг"],
    rating: 5.0,
  },
];

type Screen = "hero" | "quiz" | "results" | "contact" | "success";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("hero");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [filterClass, setFilterClass] = useState("Все");
  const [filterDistrict, setFilterDistrict] = useState("Все");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formLoading, setFormLoading] = useState(false);
  const [formSendError, setFormSendError] = useState("");

  const currentStep = quizSteps[step];
  const progress = ((step + 1) / quizSteps.length) * 100;

  const handleOptionSelect = (optionId: string) => setSelected(optionId);

  const handleNext = () => {
    if (!selected) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id]: selected }));
    if (step < quizSteps.length - 1) {
      setStep((s) => s + 1);
      setSelected(null);
    } else {
      setScreen("results");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setSelected(answers[quizSteps[step - 1].id] || null);
    } else {
      setScreen("hero");
    }
  };

  const toggleCompare = (id: number) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const classes = ["Все", "Комфорт", "Комфорт+", "Бизнес", "Премиум"];
  const districts = ["Все", "Центр", "Север / ВИЗ", "Академический"];

  const filteredProperties = properties.filter((p) => {
    const classOk = filterClass === "Все" || p.propClass === filterClass;
    const districtOk = filterDistrict === "Все" || p.district === filterDistrict;
    return classOk && districtOk;
  });

  const galleryImages = [
    { src: IMAGES.hero, caption: "ЖК «Чкалов» — фасад" },
    { src: IMAGES.complex1, caption: "ЖК «Квартал на Декабристов»" },
    { src: IMAGES.aerial, caption: "Аэросъёмка района Академический" },
    { src: IMAGES.interior, caption: "Интерьер класса Премиум — ЖК «Макаровский»" },
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Введите имя";
    if (!form.phone.trim() || form.phone.length < 10) errors.phone = "Введите корректный телефон";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormLoading(true);
    setFormSendError("");
    try {
      const res = await fetch("https://functions.poehali.dev/cb68c353-0443-4cfc-be14-03c6368a1b1b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          comment: form.comment,
          selected: Object.values(answers).join(", "),
        }),
      });
      if (!res.ok) throw new Error();
      setScreen("success");
    } catch {
      setFormSendError("Ошибка отправки. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setFormLoading(false);
    }
  };

  // ── HERO ──────────────────────────────────────────────────────────────────
  if (screen === "hero") {
    return (
      <div className="min-h-screen noise-bg hero-pattern relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #F56600, transparent)" }} />
        <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #1565C0, transparent)" }} />

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="flex items-center justify-between px-6 py-5 md:px-12 bg-white/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #F56600, #FF3D00)" }}>
                <Icon name="Building2" size={16} className="text-white" />
              </div>
              <span className="font-oswald font-bold text-xl tracking-wide text-foreground">НОВЫЙ МИР</span>
            </div>
            <a href="tel:+79043870441" className="flex items-center gap-2 btn-secondary px-4 py-2 rounded-xl text-sm font-golos">
              <Icon name="Phone" size={15} className="brand-orange" />
              <span className="hidden sm:inline">+7 (904) 387-04-41</span>
              <span className="sm:hidden">Звонок</span>
            </a>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-sm mb-8">
                <Icon name="Sparkles" size={14} className="brand-orange" />
                <span className="text-orange-700 font-medium">1000+ застройщиков по России и всему миру</span>
              </div>

              <h1 className="font-oswald font-bold leading-none mb-6 text-foreground"
                style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
                НАЙДИ СВОЮ<br />
                <span className="gradient-text">НОВОСТРОЙКУ</span><br />
                ЗА 2 МИНУТЫ
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-golos">
                Пройди бесплатный квиз — и получи персональную подборку новостроек
                от проверенных застройщиков по всей России и за рубежом.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16">
                <button
                  className="btn-primary px-10 py-4 rounded-xl text-lg font-semibold font-golos text-white"
                  onClick={() => { setScreen("quiz"); setStep(0); setAnswers({}); setSelected(null); }}
                >
                  Подобрать квартиру →
                </button>
                <a
                  href="tel:+79043870441"
                  className="btn-secondary px-8 py-4 rounded-xl text-base font-golos flex items-center gap-2"
                >
                  <Icon name="Phone" size={18} className="brand-orange" />
                  Позвонить
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                {[
                  { value: "1000+", label: "Застройщиков" },
                  { value: "10+ лет", label: "На рынке" },
                  { value: "0 ₽", label: "Комиссия" },
                ].map((s) => (
                  <div key={s.label} className="glass-card rounded-xl p-4">
                    <div className="font-oswald font-bold text-2xl gradient-text">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-8 opacity-40">
            <Icon name="ChevronDown" size={24} className="text-muted-foreground animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    return (
      <div className="min-h-screen noise-bg flex flex-col items-center justify-center px-6 py-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #F56600, transparent)" }} />

        <div className="relative z-10 w-full max-w-2xl animate-slide-up">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setScreen("hero")}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #F56600, #FF3D00)" }}>
                <Icon name="Building2" size={13} className="text-white" />
              </div>
              <span className="font-oswald font-bold text-lg tracking-wide text-foreground">НОВЫЙ МИР</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-golos">{step + 1} / {quizSteps.length}</span>
              <a href="tel:+79043870441" className="flex items-center gap-1.5 btn-secondary px-3 py-1.5 rounded-lg text-sm font-golos">
                <Icon name="Phone" size={13} className="brand-orange" />
                <span className="hidden sm:inline">Позвонить</span>
              </a>
            </div>
          </div>

          <div className="h-1.5 bg-muted rounded-full mb-10 overflow-hidden">
            <div className="h-full progress-bar rounded-full" style={{ width: `${progress}%` }} />
          </div>

          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{currentStep.emoji}</div>
            <h2 className="font-oswald font-bold text-3xl md:text-4xl text-foreground">{currentStep.question}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {currentStep.options.map((opt) => (
              <button
                key={opt.id}
                className={`option-card rounded-xl p-5 text-left flex items-center gap-4 ${selected === opt.id ? "selected" : ""}`}
                onClick={() => handleOptionSelect(opt.id)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${selected === opt.id ? "bg-orange-100" : "bg-muted"}`}>
                  <Icon name={opt.icon} size={20} className={selected === opt.id ? "brand-orange" : "text-muted-foreground"} />
                </div>
                <span className={`font-golos font-medium text-base ${selected === opt.id ? "text-foreground" : "text-foreground"}`}>
                  {opt.label}
                </span>
                {selected === opt.id && (
                  <Icon name="Check" size={16} className="ml-auto brand-orange flex-shrink-0" />
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="btn-secondary px-6 py-3 rounded-xl font-golos flex items-center gap-2" onClick={handleBack}>
              <Icon name="ArrowLeft" size={16} />Назад
            </button>
            <button
              className={`flex-1 py-3 rounded-xl font-golos font-semibold text-base transition-all ${selected ? "btn-primary text-white" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
              onClick={handleNext}
              disabled={!selected}
            >
              {step === quizSteps.length - 1 ? "Показать подборку →" : "Далее →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (screen === "results") {
    return (
      <div className="min-h-screen noise-bg">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setScreen("hero")}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #F56600, #FF3D00)" }}>
              <Icon name="Building2" size={13} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-lg tracking-wide text-foreground">НОВЫЙ МИР</span>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-orange-50 border border-orange-200 text-orange-600">
                <Icon name="GitCompare" size={12} />
                Сравниваю {compareList.length}
              </div>
            )}
            <a href="tel:+79043870441" className="flex items-center gap-2 btn-secondary px-4 py-2 rounded-lg text-sm font-golos">
              <Icon name="Phone" size={14} className="brand-orange" />
              <span className="hidden sm:inline">Позвонить</span>
            </a>
            <button className="btn-primary px-5 py-2 rounded-lg text-sm font-semibold font-golos text-white"
              onClick={() => setScreen("contact")}>
              Связаться с агентом
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8 animate-fade-in">
            <h1 className="font-oswald font-bold text-3xl md:text-4xl text-foreground mb-2">
              {Object.keys(answers).length > 0 ? "Ваша подборка готова" : "Все объекты"}
            </h1>
            <p className="text-muted-foreground font-golos">
              {filteredProperties.length === 1 ? "1 объект найден" : `${filteredProperties.length} объекта найдено`}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mr-1">
              <Icon name="SlidersHorizontal" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-golos">Класс:</span>
            </div>
            {classes.map((c) => (
              <button key={c} onClick={() => setFilterClass(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-golos transition-all ${filterClass === c ? "text-white font-semibold" : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-orange-300"}`}
                style={filterClass === c ? { background: "linear-gradient(135deg, #F56600, #FF3D00)" } : {}}>
                {c}
              </button>
            ))}
            <div className="w-px h-6 bg-border mx-1 self-center" />
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-golos">Район:</span>
            </div>
            {districts.map((d) => (
              <button key={d} onClick={() => setFilterDistrict(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-golos transition-all ${filterDistrict === d ? "text-white font-semibold" : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-orange-300"}`}
                style={filterDistrict === d ? { background: "linear-gradient(135deg, #F56600, #FF3D00)" } : {}}>
                {d}
              </button>
            ))}
          </div>

          {/* Properties grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in">
            {filteredProperties.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300 border border-border">
                <div className="relative h-52 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold font-oswald tracking-wider text-white"
                    style={{ background: p.badgeColor }}>{p.badge}</div>
                  <button onClick={() => toggleCompare(p.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${compareList.includes(p.id) ? "bg-orange-500 text-white" : "bg-white/80 text-muted-foreground hover:text-foreground"}`}>
                    <Icon name="GitCompare" size={13} />
                  </button>
                  <div className="absolute bottom-3 left-3 text-xs font-golos text-white/80 bg-black/30 px-2 py-0.5 rounded">{p.propClass}</div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-semibold text-white">
                    <Icon name="Star" size={11} className="brand-orange" />{p.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-oswald font-bold text-xl text-foreground">{p.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Icon name="MapPin" size={12} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-golos">{p.district}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-oswald font-bold text-xl gradient-text">{p.price}</div>
                      <div className="text-xs text-muted-foreground font-golos">{p.priceM2}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm font-golos">
                    <div className="flex items-center gap-2">
                      <Icon name="Maximize2" size={13} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{p.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={13} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{p.deadline}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.features.map((f) => (
                      <span key={f} className="px-2.5 py-1 rounded-md text-xs font-golos bg-muted text-muted-foreground">{f}</span>
                    ))}
                  </div>
                  <button className="w-full btn-primary py-3 rounded-xl font-golos font-semibold text-sm text-white"
                    onClick={() => setScreen("contact")}>
                    Узнать подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div className="mb-12">
            <h2 className="font-oswald font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
              <Icon name="Images" size={20} className="brand-orange" />
              Галерея объектов
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm">
              <div className="relative h-72 md:h-96">
                <img src={galleryImages[galleryIndex].src} alt={galleryImages[galleryIndex].caption}
                  className="w-full h-full object-cover animate-fade-in" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5 font-golos text-white font-medium">
                  {galleryImages[galleryIndex].caption}
                </div>
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                  onClick={() => setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)}>
                  <Icon name="ChevronLeft" size={18} className="text-white" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                  onClick={() => setGalleryIndex((i) => (i + 1) % galleryImages.length)}>
                  <Icon name="ChevronRight" size={18} className="text-white" />
                </button>
              </div>
              <div className="flex gap-2 p-4">
                {galleryImages.map((img, i) => (
                  <button key={i} onClick={() => setGalleryIndex(i)}
                    className={`flex-1 h-16 rounded-lg overflow-hidden transition-all ${i === galleryIndex ? "ring-2 ring-orange-500" : "opacity-50 hover:opacity-80"}`}>
                    <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 border border-border shadow-sm">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #F56600, #FF3D00)" }}>
                <Icon name="Building2" size={36} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-oswald font-bold text-2xl text-foreground mb-2">О компании «Новый Мир»</h3>
              <p className="text-muted-foreground font-golos leading-relaxed mb-4">
                Работаем на рынке недвижимости более 10 лет. Подбираем новостройки
                от проверенных застройщиков по всей России и за рубежом — бесплатно для покупателей.
                Более 2 000 семей уже нашли свой дом с нашей помощью.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {[
                  { icon: "Award", text: "10+ лет на рынке" },
                  { icon: "Shield", text: "Юридическая чистота сделки" },
                  { icon: "Headphones", text: "Поддержка на всех этапах" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground font-golos">
                    <Icon name={item.icon} size={14} className="neon-orange" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-12 py-4 rounded-xl text-lg font-semibold font-golos text-white"
              onClick={() => setScreen("contact")}>
              Получить консультацию
            </button>
            <button className="btn-secondary px-8 py-4 rounded-xl text-base font-golos"
              onClick={() => { setScreen("quiz"); setStep(0); setAnswers({}); setSelected(null); }}>
              Пройти квиз заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── CONTACT ───────────────────────────────────────────────────────────────
  if (screen === "contact") {
    return (
      <div className="min-h-screen noise-bg hero-pattern flex items-center justify-center px-6 py-16">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #F56600, transparent)" }} />

        <div className="relative z-10 w-full max-w-md animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-golos text-sm"
              onClick={() => setScreen("results")}>
              <Icon name="ArrowLeft" size={14} />Назад к объектам
            </button>
            <a href="tel:+79043870441" className="flex items-center gap-2 btn-secondary px-4 py-2 rounded-xl text-sm font-golos">
              <Icon name="Phone" size={14} className="brand-orange" />
              <span className="hidden sm:inline">Позвонить</span>
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #F56600, #FF3D00)" }}>
                <Icon name="MessageCircle" size={26} className="text-white" />
              </div>
              <h2 className="font-oswald font-bold text-3xl text-foreground mb-2">Связаться с агентом</h2>
              <p className="text-muted-foreground font-golos text-sm">
                Оставьте контакты — свяжемся в течение 15 минут
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-golos text-foreground font-medium mb-2">Ваше имя *</label>
                <input type="text" placeholder="Например, Андрей" value={form.name}
                  onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setFormErrors((er) => ({ ...er, name: "" })); }}
                  className={`w-full px-4 py-3 rounded-xl bg-muted border font-golos text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${formErrors.name ? "border-red-400" : "border-border focus:border-orange-400"}`}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1 font-golos">{formErrors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-golos text-foreground font-medium mb-2">Телефон *</label>
                <input type="tel" placeholder="+7 (900) 000-00-00" value={form.phone}
                  onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); setFormErrors((er) => ({ ...er, phone: "" })); }}
                  className={`w-full px-4 py-3 rounded-xl bg-muted border font-golos text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${formErrors.phone ? "border-red-400" : "border-border focus:border-orange-400"}`}
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1 font-golos">{formErrors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-golos text-foreground font-medium mb-2">Комментарий (необязательно)</label>
                <textarea placeholder="Бюджет, сроки, пожелания..." value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))} rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border font-golos text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-400 transition-all resize-none" />
              </div>
              {formSendError && (
                <p className="text-red-500 text-sm font-golos text-center">{formSendError}</p>
              )}
              <button className="w-full btn-primary py-4 rounded-xl font-golos font-semibold text-base text-white mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleSubmit} disabled={formLoading}>
                {formLoading ? "Отправляем..." : "Отправить заявку"}
              </button>
              <p className="text-center text-xs text-muted-foreground font-golos">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <span className="brand-orange cursor-pointer hover:underline">политикой конфиденциальности</span>
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href="tel:+79043870441" className="bg-white rounded-xl p-4 text-center block hover:shadow-md hover:border-orange-300 transition-all border border-border">
              <Icon name="Phone" size={18} className="brand-orange mx-auto mb-2" />
              <div className="text-xs text-muted-foreground font-golos mb-1">Звонок</div>
              <div className="text-xs font-medium text-foreground font-golos">+7 (904) 387-04-41</div>
            </a>
            <a href="https://t.me/Smirnov_uslugi" target="_blank" rel="noreferrer" className="bg-white rounded-xl p-4 text-center block hover:shadow-md hover:border-orange-300 transition-all border border-border">
              <Icon name="MessageSquare" size={18} className="brand-orange mx-auto mb-2" />
              <div className="text-xs text-muted-foreground font-golos mb-1">Telegram</div>
              <div className="text-xs font-medium text-foreground font-golos">@Smirnov_uslugi</div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── SUCCESS ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen noise-bg hero-pattern flex items-center justify-center px-6">
      <div className="text-center animate-scale-in max-w-md">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)", boxShadow: "0 8px 32px rgba(34,197,94,0.3)" }}>
          <Icon name="Check" size={42} className="text-white" />
        </div>
        <h2 className="font-oswald font-bold text-4xl text-foreground mb-3">Заявка отправлена!</h2>
        <p className="text-muted-foreground font-golos mb-2">
          Отлично, {form.name || "друг"}! Наш агент свяжется с вами в ближайшие 15 минут.
        </p>
        <p className="text-muted-foreground font-golos text-sm mb-10">
          Мы уже готовим персональную подборку для вас.
        </p>
        <button className="btn-primary px-10 py-4 rounded-xl font-golos font-semibold text-white"
          onClick={() => { setScreen("results"); setForm({ name: "", phone: "", comment: "" }); }}>
          Вернуться к объектам
        </button>
      </div>
    </div>
  );
};

export default Index;