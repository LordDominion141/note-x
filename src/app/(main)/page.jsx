'use client'

import { useState } from "react";
import Link from "next/link";
import { Rubik } from "next/font/google";
import {
    BookOpen,
    Pencil,
    Layers,
    Search,
    ShieldCheck,
    Smartphone,
    FolderOpen,
    Check,
    Menu,
    X,
    Plus,
    ChevronDown,
    Sparkles,
} from "lucide-react";

const rubik = Rubik({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

// ROUTES: change these if your folders are named differently.
const ROUTES = {
    signup: "/pages/signup",
    login: "/pages/login",
    dashboard: "/pages/dashboard",
};

const NAV = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Why Note-X", href: "#why" },
    { label: "FAQ", href: "#faq" },
];

const FEATURES = [
    { icon: Pencil, title: "A calm editor", text: "A clean writing space with a title and a body. Type, and your note is ready to save. Nothing else gets in the way." },
    { icon: Layers, title: "Tabs like a browser", text: "Open several notes at once and flip between them. Unsaved notes stay in their tab until you are ready." },
    { icon: FolderOpen, title: "Collections", text: "Group related notes under one name, like a project, a class or a trip. Add and remove notes any time." },
    { icon: Search, title: "Everything in the sidebar", text: "Your notes and collections live in one menu. Rename, delete or add a note to a collection from its options." },
    { icon: ShieldCheck, title: "Private by default", text: "Sign in with your account and your notes stay yours. Log out in one click when you are done." },
    { icon: Smartphone, title: "Works on your phone", text: "The sidebar slides in on small screens, so you can capture a thought on the bus as easily as at your desk." },
];

const STEPS = [
    { title: "Create your account", text: "Sign up with your details. It takes less than a minute and costs nothing." },
    { title: "Write your first note", text: "Press New, give it a title and start typing. Save it and it appears in your Notes list." },
    { title: "Organise as you go", text: "Create a collection, add notes to it, and open it whenever you need that whole topic at once." },
];

const FAQ = [
    { q: "Is Note-X free to use?", a: "Yes. You can create an account and start writing notes and collections without paying anything." },
    { q: "Can I keep more than one note open?", a: "Yes. Every note you open gets its own tab, so you can move between them without losing your place." },
    { q: "What is a collection?", a: "A collection is a named group of notes. Use it to keep everything for one subject together, then open the collection to see them all." },
    { q: "Will it work on my phone?", a: "It will. On smaller screens the menu becomes a slide-in panel, and the New button is always one tap away." },
    { q: "How do I get started?", a: "Create an account, then open your dashboard and press New. Your first note is a few seconds away." },
];

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-b from-[#d74a5d] to-[#b51026] px-7 py-3 text-[15px] font-medium text-white no-underline ring-1 ring-[#840f1e]/50 shadow-[0_10px_24px_-8px_rgba(181,16,38,0.7)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-8px_rgba(181,16,38,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b51026]";
const btnOutline = "inline-flex items-center justify-center gap-2 rounded-full border border-[#b51026]/60 bg-white/60 px-7 py-3 text-[15px] font-medium text-[#b51026] no-underline backdrop-blur transition duration-200 hover:bg-[#b51026] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b51026]";
const btnWhite = "inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] font-medium text-[#b51026] no-underline shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)] transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const btnGhostLight = "inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-7 py-3 text-[15px] font-medium text-white no-underline transition duration-200 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const Logo = ({ light = false }) => (
    <Link href="/" className={`flex items-center gap-2 no-underline ${light ? 'text-white' : 'text-[#b51026]'}`}>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${light ? 'bg-white/15' : 'bg-linear-to-br from-[#d74a5d] to-[#b51026]'} text-white`}>
            <BookOpen className="h-5 w-5" />
        </span>
        <span className="text-2xl font-medium tracking-tight">Note-X</span>
        <Pencil className="-ml-1 mb-3 h-4 w-4" />
    </Link>
);

const Heading = ({ title, text, className = "" }) => (
    <div className={className}>
        <h2 className="m-0 text-4xl font-light leading-tight text-[#b51026] max-sm:text-3xl">{title}</h2>
        <p className="m-0 mt-2 max-w-md text-base font-light leading-relaxed text-[#6b4a4f]">{text}</p>
    </div>
);

const Faq = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`rounded-2xl border transition-colors duration-200 ${open ? 'border-[#b51026]/40 bg-white shadow-[0_12px_30px_-16px_rgba(181,16,38,0.4)]' : 'border-[#eadbdd] bg-white/70'}`}>
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-5 text-left text-lg font-medium text-[#3a1519]"
            >
                {q}
                <ChevronDown className={`h-5 w-5 shrink-0 text-[#b51026] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <p className="m-0 px-6 pb-5 text-base font-light leading-relaxed text-[#6b4a4f]">{a}</p>}
        </div>
    );
};

// A small hand-drawn style pen, used as a decoration on the mock cards.
const Pen = ({ className = "" }) => (
    <svg viewBox="0 0 40 90" className={className} fill="none" aria-hidden="true">
        <path d="M12 6 L28 10 L30 54 L20 78 L10 54 Z" fill="#fff" stroke="#3a1519" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 6 L28 10 L27 22 L13 19 Z" fill="#b51026" stroke="#3a1519" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 78 L20 88" stroke="#3a1519" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="44" r="3" fill="#3a1519" />
    </svg>
);

const CheckRow = ({ done, children }) => (
    <div className="flex items-center gap-3 text-sm text-[#3a1519]">
        <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${done ? 'border-[#b51026] bg-[#b51026] text-white' : 'border-[#d9b9be] bg-white'}`}>
            {done && <Check className="h-3.5 w-3.5" />}
        </span>
        <span className={done ? 'text-[#9a7a7f] line-through' : ''}>{children}</span>
    </div>
);

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${rubik.className} min-h-screen w-full bg-linear-to-br from-[#d74a5d] via-[#b51026] to-[#4e0611] m-0 p-3 text-[#3a1519] sm:p-6 lg:p-10`}>
            <div className="mx-auto relative -left-3 max-w-7xl overflow-hidden rounded-4xl bg-[#faf9f6] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ">

                {/* NAVBAR */}
                <nav className="sticky top-0 z-40 border-b border-[#3a1519]/30 bg-[#faf9f6]/90 backdrop-blur">
                    <div className="flex items-center justify-between px-6 py-5 lg:px-12">
                        <Logo />
                        <ul className="m-0 hidden list-none items-center gap-10 p-0 md:flex">
                            {NAV.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="text-base text-[#3a1519] no-underline transition-colors hover:text-[#b51026]">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                        <div className="hidden items-center gap-3 md:flex">
                            <Link href={ROUTES.signup} className="rounded-full bg-linear-to-b from-[#d74a5d] to-[#b51026] px-5 py-2 text-sm font-medium text-white no-underline ring-1 ring-[#840f1e]/50 transition hover:-translate-y-0.5">Sign Up</Link>
                            <Link href={ROUTES.login} className="rounded-full border border-[#3a1519]/70 px-5 py-2 text-sm font-medium text-[#3a1519] no-underline transition hover:border-[#b51026] hover:text-[#b51026]">Log in</Link>
                        </div>
                        <button
                            type="button"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border-0 bg-[#f9e8ea] text-[#b51026] md:hidden"
                        >
                            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                    {menuOpen && (
                        <div className="flex flex-col gap-1 border-t border-[#eadbdd] px-6 pb-6 pt-3 md:hidden">
                            {NAV.map((item) => (
                                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-base text-[#3a1519] no-underline hover:bg-[#f9e8ea]">{item.label}</a>
                            ))}
                            <div className="mt-3 flex gap-3">
                                <Link href={ROUTES.signup} className={`${btnPrimary} flex-1`}>Sign Up</Link>
                                <Link href={ROUTES.login} className={`${btnOutline} flex-1`}>Log in</Link>
                            </div>
                        </div>
                    )}
                </nav>

                {/* HERO */}
                <section className="relative overflow-hidden bg-[#f9e8ea] px-6 pb-24 pt-16 lg:px-12 lg:pb-32 lg:pt-24">
                    <div className="pointer-events-none absolute -right-32 -top-32 h-130 w-130 rounded-full bg-[radial-gradient(circle,rgba(215,74,93,0.35),transparent_65%)]" />

                    <div className="relative grid items-center gap-16 lg:grid-cols-2">
                        <div>
                            <h1 className="m-0 text-[88px] font-light leading-[0.95] tracking-tight text-[#3a1519] max-lg:text-[64px] max-sm:text-[46px]">
                                <span className="bg-linear-to-r from-[#d74a5d] via-[#b51026] to-[#840f1e] bg-clip-text text-transparent">Note</span> taking,
                                <br />made simple
                            </h1>
                            <p className="m-0 mt-8 max-w-md text-lg font-light leading-relaxed text-[#6b4a4f]">
                                Write notes, group them into collections and keep every idea open in its own tab.
                                Note-X is the all-in-one note taking app built to stay out of your way.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link href={ROUTES.signup} className={btnPrimary}>Try for Free</Link>
                                <Link href={ROUTES.dashboard} className={btnOutline}>Open dashboard</Link>
                            </div>
                            <p className="m-0 mt-5 text-sm font-light text-[#9a7a7f]">
                                Already have an account?{" "}
                                <Link href={ROUTES.login} className="font-medium text-[#b51026] no-underline hover:underline">Log in</Link>
                            </p>
                        </div>

                        {/* Hero visual */}
                        <div className="relative mx-auto h-115 w-full max-w-lg max-sm:h-100">
                            <div className="absolute inset-x-4 inset-y-6 rounded-[3rem] bg-linear-to-br from-[#d74a5d] to-[#840f1e] opacity-90 shadow-[0_40px_80px_-30px_rgba(132,15,30,0.8)] rotate-3" />
                            <div className="absolute left-0 top-4 w-[78%] -rotate-3 rounded-2xl border border-[#eadbdd] bg-white p-6 shadow-[0_30px_60px_-24px_rgba(58,21,25,0.5)] max-sm:p-4">
                                <Pen className="absolute -right-5 -top-10 h-24 rotate-12" />
                                <h3 className="m-0 text-lg font-medium">Weekend plan</h3>
                                <p className="m-0 mt-1 text-xs font-light text-[#9a7a7f]">Edited just now</p>
                                <div className="mt-5 flex flex-col gap-3">
                                    <CheckRow done>Finish project outline</CheckRow>
                                    <CheckRow done>Read chapter 4</CheckRow>
                                    <CheckRow>Call the study group</CheckRow>
                                    <CheckRow>Plan next week</CheckRow>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-0 w-[62%] rotate-2 rounded-2xl border border-white/40 bg-white/85 p-5 shadow-[0_30px_60px_-24px_rgba(58,21,25,0.6)] backdrop-blur max-sm:p-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b51026] text-white"><FolderOpen className="h-5 w-5" /></span>
                                    <div>
                                        <p className="m-0 text-sm font-medium">Biology 101</p>
                                        <p className="m-0 text-xs font-light text-[#9a7a7f]">6 notes</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {["Cells", "Genetics", "Lab 2"].map((t) => (
                                        <span key={t} className="rounded-full bg-[#f9e8ea] px-3 py-1 text-xs text-[#b51026]">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <span className="absolute -left-2 bottom-24 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#b51026] shadow-lg max-sm:hidden">
                                <Sparkles className="h-4 w-4" /> Saved
                            </span>
                        </div>
                    </div>
                </section>

                {/* FEATURE SHOWCASE */}
                <section id="features" className="relative px-6 py-24 lg:px-12">
                    <div className="mx-auto flex max-w-5xl flex-col gap-28">

                        {/* Write notes */}
                        <div className="grid items-center gap-12 md:grid-cols-2">
                            <div className="relative rounded-2xl border border-[#eadbdd] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(181,16,38,0.35)]">
                                <Pen className="absolute -right-4 -top-12 h-28 rotate-12 max-sm:h-20" />
                                <h3 className="m-0 text-2xl font-medium">Web design</h3>
                                <p className="m-0 mt-2 text-sm font-light leading-relaxed text-[#6b4a4f]">Web design is the process of making a website for the user.</p>
                                <h4 className="m-0 mt-6 text-lg font-medium text-[#b51026]">Goals</h4>
                                <p className="m-0 mt-1 text-sm font-light leading-relaxed text-[#6b4a4f]">Make the website easy to use for the user and drive the necessary growth.</p>
                                <h4 className="m-0 mt-6 text-lg font-medium text-[#b51026]">What to do?</h4>
                                <div className="mt-3 flex flex-col gap-2">
                                    <CheckRow done>Conduct research</CheckRow>
                                    <CheckRow>Develop wireframes</CheckRow>
                                </div>
                            </div>
                            <div className="md:pl-10">
                                <Heading title="Write Notes" text="Write any notes you want. Headings, goals, to-do lists and quick thoughts all fit in one clean editor." />
                                <Link href={ROUTES.signup} className={`${btnPrimary} mt-8`}>Try Now</Link>
                            </div>
                        </div>

                        {/* Collections */}
                        <div className="grid items-center gap-12 md:grid-cols-2">
                            <div className="md:order-2">
                                <div className="rounded-2xl border border-[#eadbdd] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(181,16,38,0.35)]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#b51026] text-white"><FolderOpen className="h-5 w-5" /></span>
                                            <div>
                                                <p className="m-0 text-lg font-medium">Sea Creatures</p>
                                                <p className="m-0 text-xs font-light text-[#9a7a7f]">Collection, 4 notes</p>
                                            </div>
                                        </div>
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b51026] text-white"><Plus className="h-4 w-4" /></span>
                                    </div>
                                    <div className="mt-5 flex flex-col gap-2">
                                        {["Octopus anatomy", "Behaviour and habitat", "Life cycle", "Deep sea facts"].map((n, i) => (
                                            <div key={n} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${i === 0 ? 'bg-[#b51026] text-white' : 'bg-white text-[#3a1519]'}`}>
                                                {n}
                                                <span className={`text-xs ${i === 0 ? 'text-white/70' : 'text-[#9a7a7f]'}`}>Remove</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="md:order-1 md:pr-10">
                                <Heading title="Group with Collections" text="Keep a whole topic together. Add notes to a collection from the menu, and open it to see everything at once." />
                                <Link href={ROUTES.signup} className={`${btnPrimary} mt-8`}>Try Now</Link>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="grid items-center gap-12 md:grid-cols-2">
                            <div className="overflow-hidden rounded-2xl border border-[#eadbdd] bg-white shadow-[0_30px_60px_-30px_rgba(181,16,38,0.35)]">
                                <div className="flex gap-1 bg-[#f9e8ea] px-3 pt-3">
                                    {["Lecture notes", "Ideas", "To do"].map((t, i) => (
                                        <span key={t} className={`rounded-t-lg px-4 py-2 text-xs ${i === 0 ? 'bg-white font-medium text-[#b51026]' : 'text-[#9a7a7f]'}`}>{t}</span>
                                    ))}
                                </div>
                                <div className="p-6">
                                    <h3 className="m-0 text-xl font-medium">Lecture notes</h3>
                                    <div className="mt-4 flex flex-col gap-2">
                                        <div className="h-2.5 w-full rounded-full bg-[#f1e3e5]" />
                                        <div className="h-2.5 w-[92%] rounded-full bg-[#f1e3e5]" />
                                        <div className="h-2.5 w-[75%] rounded-full bg-[#f1e3e5]" />
                                        <div className="h-2.5 w-[84%] rounded-full bg-[#f9e8ea]" />
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <span className="rounded-full bg-[#b51026] px-5 py-2 text-xs font-medium text-white">Save note</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:pl-10">
                                <Heading title="Work in Tabs" text="Open as many notes as you need and switch between them in a click. It feels like the browser you already know." />
                                <Link href={ROUTES.signup} className={`${btnPrimary} mt-8`}>Try Now</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section id="how" className="bg-[#f9e8ea]/50 px-6 py-24 lg:px-12">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="m-0 text-center text-4xl font-light text-[#b51026] max-sm:text-3xl">Start in three steps</h2>
                        <p className="m-0 mx-auto mt-3 max-w-xl text-center text-base font-light text-[#6b4a4f]">No setup and no learning curve. You can be writing before your tea cools.</p>
                        <div className="mt-16 grid gap-6 md:grid-cols-3">
                            {STEPS.map((s, i) => (
                                <div key={s.title} className="relative rounded-3xl border border-[#eadbdd] bg-white p-8 shadow-[0_24px_50px_-30px_rgba(181,16,38,0.45)]">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b51026] text-xl font-medium text-white">{i + 1}</span>
                                    <h3 className="m-0 mt-6 text-xl font-medium">{s.title}</h3>
                                    <p className="m-0 mt-2 text-base font-light leading-relaxed text-[#6b4a4f]">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WHY NOTE-X (dark crimson) */}
                <section id="why" className="relative overflow-hidden bg-linear-to-br from-[#b51026] via-[#8f1021] to-[#4e0611] px-6 py-24 text-white lg:px-12">
                    <div className="pointer-events-none absolute -bottom-32 right-0 h-110 w-110 rounded-full bg-[radial-gradient(circle,rgba(215,74,93,0.5),transparent_65%)]" />
                    <div className="relative mx-auto max-w-5xl">
                        <h2 className="m-0 max-w-xl text-4xl font-light leading-tight max-sm:text-3xl">Everything you need to keep your thoughts in order</h2>
                        <p className="m-0 mt-3 max-w-xl text-base font-light text-white/75">Simple on purpose. Each part of Note-X does one job well.</p>
                        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {FEATURES.map((f) => {
                                const Icon = f.icon;
                                return (
                                    <div
                                        key={f.title}
                                        className={`rounded-3xl border border-white/15 p-7 backdrop-blur bg-white/10`}
                                    >
                                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#b51026]"><Icon className="h-5 w-5" /></span>
                                        <h3 className="m-0 mt-5 text-lg font-medium">{f.title}</h3>
                                        <p className="m-0 mt-2 text-sm font-light leading-relaxed text-white/75">{f.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="px-6 py-24 lg:px-12">
                    <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.4fr]">
                        <Heading title="Questions, answered" text="Quick answers about how Note-X works. Ready to try it? Your dashboard is one click away." />
                        <div className="flex flex-col gap-3">
                            {FAQ.map((item) => <Faq key={item.q} {...item} />)}
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="px-6 pb-24 lg:px-12">
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#d74a5d] via-[#b51026] to-[#6d0a19] px-8 py-16 text-center text-white shadow-[0_40px_80px_-30px_rgba(181,16,38,0.8)] sm:px-16">
                        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
                        <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-black/10" />
                        <div className="relative">
                            <h2 className="m-0 text-5xl font-light leading-tight max-sm:text-3xl">Your next idea deserves a place to land</h2>
                            <p className="m-0 mx-auto mt-4 max-w-lg text-lg font-light text-white/80">Create a free account and start writing in minutes.</p>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                                <Link href={ROUTES.signup} className={btnWhite}>Create free account</Link>
                                <Link href={ROUTES.login} className={btnGhostLight}>Log in</Link>
                                <Link href={ROUTES.dashboard} className={btnGhostLight}>Go to dashboard</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="border-t border-[#eadbdd] bg-[#f9e8ea]/50 px-6 py-12 lg:px-12">
                    <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row md:items-start">
                        <div className="max-md:text-center">
                            <Logo />
                            <p className="m-0 mt-3 max-w-xs text-sm font-light text-[#6b4a4f]">Passionately made by students, for students. The all-in-one note taking app.</p>
                        </div>
                        <div className="flex gap-16 text-sm">
                            <div className="flex flex-col gap-3">
                                <span className="font-medium text-[#3a1519]">Product</span>
                                {NAV.slice(0, 3).map((item) => (
                                    <a key={item.label} href={item.href} className="font-light text-[#6b4a4f] no-underline hover:text-[#b51026]">{item.label}</a>
                                ))}
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="font-medium text-[#3a1519]">Account</span>
                                <Link href={ROUTES.signup} className="font-light text-[#6b4a4f] no-underline hover:text-[#b51026]">Sign Up</Link>
                                <Link href={ROUTES.login} className="font-light text-[#6b4a4f] no-underline hover:text-[#b51026]">Log in</Link>
                                <Link href={ROUTES.dashboard} className="font-light text-[#6b4a4f] no-underline hover:text-[#b51026]">Dashboard</Link>
                            </div>
                        </div>
                    </div>
                    <p className="m-0 mt-10 text-center text-xs font-light text-[#9a7a7f]">© {new Date().getFullYear()} Note-X. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;