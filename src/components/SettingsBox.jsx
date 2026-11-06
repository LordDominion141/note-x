'use client';

import { X, Check, RotateCcw } from 'lucide-react';

// The editor reads these defaults, so export them for the dashboard and Editor to share.
export const DEFAULT_EDITOR_SETTINGS = {
    fontFamily: 'inherit',
    fontSize: 17,
    lineHeight: 1.9,
    textColor: '#3a1519',
    bgColor: '#faf9f6',
};

const FONTS = [
    { label: 'Default', value: 'inherit' },
    { label: 'Serif', value: "Georgia, 'Times New Roman', serif" },
    { label: 'Mono', value: "ui-monospace, 'Cascadia Code', Consolas, monospace" },
    { label: 'Clean', value: "system-ui, 'Segoe UI', Verdana, sans-serif" },
];

const SPACING = [
    { label: 'Tight', value: 1.5 },
    { label: 'Normal', value: 1.9 },
    { label: 'Relaxed', value: 2.2 },
];

const TEXT_COLORS = [
    { label: 'Deep wine', value: '#3a1519' },
    { label: 'Charcoal', value: '#292929' },
    { label: 'Crimson', value: '#b51026' },
    { label: 'Navy', value: '#1e3a5f' },
    { label: 'Soft white', value: '#f3e4e6' },
];

const BG_COLORS = [
    { label: 'Paper', value: '#faf9f6' },
    { label: 'White', value: '#ffffff' },
    { label: 'Sepia', value: '#f6ecd9' },
    { label: 'Blush', value: '#f9e8ea' },
    { label: 'Night', value: '#1f1416' },
];

const isLight = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    const r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return (r * 299 + g * 587 + b * 114) / 1000 > 150;
};

const Section = ({ title, children, aside }) => (
    <div>
        <div className="mb-3 flex items-baseline justify-between">
            <h3 className="m-0 text-base font-medium text-[#3a1519]">{title}</h3>
            {aside && <span className="text-sm font-light text-[#9a7a7f]">{aside}</span>}
        </div>
        {children}
    </div>
);

const Swatch = ({ option, selected, onSelect }) => (
    <button
        type="button"
        aria-label={option.label}
        aria-pressed={selected}
        title={option.label}
        onClick={onSelect}
        style={{ backgroundColor: option.value }}
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/15 transition ${selected ? 'ring-2 ring-[#b51026] ring-offset-2' : 'hover:scale-110'}`}
    >
        {selected && <Check className="h-4 w-4" style={{ color: isLight(option.value) ? '#3a1519' : '#ffffff' }} />}
    </button>
);

const SettingsBox = ({ settings, onChange, onReset, onClose }) => {
    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#4e0611]/45 backdrop-blur-sm p-6 max-md:p-0" onClick={onClose}>
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-title"
                className="flex max-h-[min(86dvh,760px)] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-[#eadbdd] bg-[#faf9f6] shadow-[0_40px_90px_-30px_rgba(78,6,17,0.7)] max-md:h-full max-md:max-h-none max-md:max-w-none max-md:rounded-none max-md:border-0"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#eadbdd] bg-linear-to-br from-[#fbe6e9] via-[#f9e8ea] to-white px-6 py-5 max-md:px-5 max-md:py-4">
                    <div className="min-w-0">
                        <p className="mb-2 inline-block rounded-full bg-[#b51026]/10 px-3 py-1 text-xs font-medium text-[#b51026]">Editor</p>
                        <h2 id="settings-title" className="m-0 truncate text-2xl font-medium tracking-tight text-[#3a1519] max-md:text-xl">Settings</h2>
                    </div>
                    <button
                        type="button"
                        aria-label="Close settings"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-0 bg-transparent text-gray-600 hover:bg-[#f9e8ea] hover:text-[#b51026]"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-6 py-6 max-md:px-5">

                    {/* Live preview */}
                    <div
                        className="rounded-2xl border border-[#eadbdd] p-5 shadow-[0_20px_40px_-30px_rgba(181,16,38,0.5)] transition-colors"
                        style={{ backgroundColor: settings.bgColor, color: settings.textColor, fontFamily: settings.fontFamily }}
                    >
                        <p className="m-0 font-medium" style={{ fontSize: settings.fontSize * 1.5 }}>Sample note</p>
                        <p className="m-0 mt-2" style={{ fontSize: settings.fontSize, lineHeight: settings.lineHeight }}>
                            This is how your notes will look while you write. Change a setting below and it updates here.
                        </p>
                    </div>

                    <Section title="Font">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {FONTS.map((f) => {
                                const selected = settings.fontFamily === f.value;
                                return (
                                    <button
                                        key={f.label}
                                        type="button"
                                        aria-pressed={selected}
                                        onClick={() => onChange('fontFamily', f.value)}
                                        className={`flex min-h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border px-3 py-2 transition ${selected ? 'border-[#b51026] bg-[#f9e8ea] text-[#b51026]' : 'border-[#eadbdd] bg-white text-[#3a1519] hover:border-[#b51026]/40'}`}
                                    >
                                        <span className="text-xl" style={{ fontFamily: f.value }}>Aa</span>
                                        <span className="text-xs">{f.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </Section>

                    <Section title="Text size" aside={`${settings.fontSize}px`}>
                        <input
                            type="range"
                            min="14"
                            max="24"
                            step="1"
                            value={settings.fontSize}
                            aria-label="Text size"
                            onChange={(e) => onChange('fontSize', Number(e.target.value))}
                            className="h-2 w-full cursor-pointer accent-[#b51026]"
                        />
                    </Section>

                    <Section title="Line spacing">
                        <div className="grid grid-cols-3 gap-2 rounded-full bg-[#f9e8ea] p-1">
                            {SPACING.map((s) => {
                                const selected = settings.lineHeight === s.value;
                                return (
                                    <button
                                        key={s.label}
                                        type="button"
                                        aria-pressed={selected}
                                        onClick={() => onChange('lineHeight', s.value)}
                                        className={`min-h-10 cursor-pointer rounded-full border-0 text-sm transition ${selected ? 'bg-linear-to-b from-[#d74a5d] to-[#b51026] font-medium text-white shadow-md' : 'bg-transparent text-[#6b4a4f] hover:text-[#b51026]'}`}
                                    >
                                        {s.label}
                                    </button>
                                );
                            })}
                        </div>
                    </Section>

                    <Section title="Text color">
                        <div className="flex flex-wrap gap-3">
                            {TEXT_COLORS.map((c) => (
                                <Swatch key={c.value} option={c} selected={settings.textColor === c.value} onSelect={() => onChange('textColor', c.value)} />
                            ))}
                        </div>
                    </Section>

                    <Section title="Background">
                        <div className="flex flex-wrap gap-3">
                            {BG_COLORS.map((c) => (
                                <Swatch key={c.value} option={c} selected={settings.bgColor === c.value} onSelect={() => onChange('bgColor', c.value)} />
                            ))}
                        </div>
                    </Section>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#eadbdd] bg-white px-6 py-4 max-md:px-5">
                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-[#b51026]/50 bg-transparent px-5 text-sm font-medium text-[#b51026] transition hover:bg-[#b51026] hover:text-white"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex min-h-11 cursor-pointer items-center rounded-full border-0 bg-linear-to-b from-[#d74a5d] to-[#b51026] px-7 text-sm font-medium text-white ring-1 ring-[#840f1e]/40 shadow-[0_10px_20px_-8px_rgba(181,16,38,0.7)] transition hover:-translate-y-0.5"
                    >
                        Done
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SettingsBox;