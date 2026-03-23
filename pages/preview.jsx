"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

// ── small components ─────────────────────────────────────────────────────────

function StatCard({ label, value, accent, delay }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className={`relative overflow-hidden rounded-2xl p-5 border transition-colors ${
        accent
          ? "bg-[#00DC8210] border-[#00DC8230]"
          : "bg-[#0d1014] border-[#1f2328]"
      }`}
    >
      {accent && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#00DC820a] to-transparent pointer-events-none" />
      )}
      <p className="text-[11px] font-mono text-zinc-600 mb-1.5 uppercase tracking-widest">{label}</p>
      <p className={`text-3xl font-bold font-mono tracking-tight ${accent ? "text-[#00DC82]" : "text-zinc-100"}`}>
        {value}
      </p>
    </motion.div>
  )
}

function StarRating({ rating }) {
  if (!rating) return <span className="text-zinc-700 text-xs font-mono">—</span>
  const full = Math.round(rating)
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-amber-400 text-xs">{"★".repeat(full)}{"☆".repeat(5 - full)}</span>
      <span className="text-zinc-500 text-xs font-mono">{rating.toFixed(1)}</span>
    </span>
  )
}

function Badge({ children, variant = "default" }) {
  const cls = {
    default: "bg-zinc-800/60 text-zinc-400 border-zinc-700/40",
    success: "bg-emerald-950/60 text-emerald-400 border-emerald-800/40",
    warn: "bg-amber-950/60 text-amber-400 border-amber-800/40",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${cls[variant]}`}>
      {children}
    </span>
  )
}

function InputField({ label, value, onChange, placeholder, type = "text" }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{label}</label>
      <div
        className={`rounded-xl border transition-all duration-200 bg-[#0a0d10] ${
          focused ? "border-[#00DC8250] shadow-[0_0_0_3px_#00DC820f]" : "border-[#1f2328] hover:border-[#2a2f36]"
        }`}
      >
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-2.5 text-sm font-mono text-zinc-200 placeholder-zinc-800 focus:outline-none rounded-xl"
        />
      </div>
    </div>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{label}</label>
      <div className="relative rounded-xl border border-[#1f2328] bg-[#0a0d10] hover:border-[#2a2f36] transition-colors">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-transparent px-4 py-2.5 text-sm font-mono text-zinc-200 focus:outline-none appearance-none cursor-pointer rounded-xl"
        >
          {options.map(o => (
            <option key={o.value} value={o.value} className="bg-[#0d1014]">{o.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function Toggle({ value, onChange, label = "Filter" }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Filter</label>
      <button
        onClick={() => onChange(!value)}
        className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl border text-sm font-mono transition-all duration-200 ${
          value
            ? "bg-[#00DC820f] border-[#00DC8235] text-[#00DC82]"
            : "bg-[#0a0d10] border-[#1f2328] text-zinc-600 hover:border-[#2a2f36]"
        }`}
      >
        <div
          className={`relative rounded-full transition-colors duration-200 flex-shrink-0 ${value ? "bg-[#00DC82]" : "bg-[#2a2f36]"}`}
          style={{ width: 28, height: 16 }}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 700, damping: 38 }}
            className="absolute top-[2px] w-3 h-3 bg-white rounded-full shadow"
            style={{ left: value ? 14 : 2 }}
          />
        </div>
        {label}
      </button>
    </div>
  )
}

function Spinner() {
  return (
    <motion.div className="flex flex-col items-center justify-center py-24 gap-7">
      <div className="relative w-14 h-14">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00DC82] border-r-[#00DC8230]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2.5 rounded-full border border-transparent border-t-[#00DC8240]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#00DC82" strokeWidth="2.5"/>
            <path d="m21 21-3.5-3.5" stroke="#00DC82" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <div className="text-center space-y-1.5">
        <p className="text-sm font-mono text-zinc-400">Scraping Google Maps…</p>
        <p className="text-xs font-mono text-zinc-700">Takes 30–90 seconds · powered by Apify</p>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            animate={{ scaleY: [1, 2.5, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.13 }}
            className="w-0.5 h-3 bg-[#00DC82] rounded-full opacity-50 origin-bottom"
          />
        ))}
      </div>
    </motion.div>
  )
}

// ── main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [query, setQuery] = useState("nail salons")
  const [location, setLocation] = useState("Austin, Texas")
  const [maxResults, setMaxResults] = useState(50)
  const [minPhotos, setMinPhotos] = useState(3)
  const [noWebsiteOnly, setNoWebsiteOnly] = useState(true)
  const [apifyToken, setApifyToken] = useState("")

  const [view, setView] = useState("table")
  const [sortKey, setSortKey] = useState("rating")
  const [sortDir, setSortDir] = useState("desc")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const resultsRef = useRef(null)

  const sorted = result
    ? [...result.results].sort((a, b) => {
        const av = (a[sortKey]) ?? 0
        const bv = (b[sortKey]) ?? 0
        return sortDir === "desc" ? bv - av : av - bv
      })
    : []

  function toggleSort(k) {
    if (sortKey === k) setSortDir(d => (d === "desc" ? "asc" : "desc"))
    else { setSortKey(k); setSortDir("desc") }
  }

  async function handleScrape() {
    if (!apifyToken.trim()) { setError("Apify API token is required."); return }
    if (!query.trim() || !location.trim()) { setError("Query and location are required."); return }
    setError(""); setResult(null); setLoading(true)
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, location, apifyToken, maxResults, minPhotos, noWebsiteOnly }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error ?? "Unknown error")
      setResult(data)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function exportCSV() {
    if (!result) return
    const headers = ["Name","Category","Address","Phone","Rating","Reviews","Photos","Website","Maps URL"]
    const rows = result.results.map(b =>
      [b.title,b.category,b.address,b.phone,b.rating??"",b.reviewsCount,b.photosCount,b.website??"",b.googleMapsUrl]
        .map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")
    )
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([[headers.join(","),...rows].join("\n")],{type:"text/csv"}))
    a.download = `${query.replace(/\s+/g,"_")}_${location.replace(/[\s,]+/g,"_")}.csv`
    a.click()
  }

  const Th = ({ label, sk }) => (
    <th
      onClick={() => sk && toggleSort(sk)}
      className={`px-4 py-3 text-left text-[10px] font-mono text-zinc-600 uppercase tracking-widest whitespace-nowrap ${sk ? "cursor-pointer hover:text-zinc-400 select-none" : ""}`}
    >
      <span className="flex items-center gap-1">
        {label}
        {sk && sortKey === sk && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#00DC82]">
            {sortDir === "desc" ? "↓" : "↑"}
          </motion.span>
        )}
      </span>
    </th>
  )

  return (
    <div className="min-h-screen bg-[#080a0d] text-zinc-200 overflow-x-hidden">

      {/* background glow */}
      <div className="fixed top-0 left-0 w-[700px] h-[500px] rounded-full bg-[#00DC82] opacity-[0.025] blur-[140px] pointer-events-none" />
      <div className="fixed top-[30vh] right-0 w-[500px] h-[400px] rounded-full bg-blue-600 opacity-[0.025] blur-[140px] pointer-events-none" />

      {/* ── navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-[#1f2328]/80 bg-[#080a0d]/80 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00DC82] flex items-center justify-center shadow-[0_0_20px_#00DC8240]">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <circle cx="7" cy="5.5" r="2.8" fill="#080a0d"/>
                <path d="M7 8.5C4 12 2 13.5 7 16C12 13.5 10 12 7 8.5Z" fill="#080a0d"/>
              </svg>
            </div>
            <span className="font-mono font-bold text-sm text-zinc-100 tracking-tight">mapsscraper</span>
            <span className="text-[9px] font-mono bg-[#00DC82] text-[#080a0d] px-1.5 py-0.5 rounded font-bold">v0.1</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
            <a href="https://github.com" target="_blank"
              className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
            <span className="hidden sm:block border border-[#1f2328] px-2.5 py-1 rounded-lg text-[10px]">MIT · Open source</span>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

        {/* ── hero ── */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-4 pb-2">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00DC8230] bg-[#00DC820a] text-[#00DC82] text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DC82] animate-pulse" />
            Google Maps · No-website leads · CSV export
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Find local business<br/>
            <span className="text-[#00DC82]">leads</span> in seconds.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-sm text-zinc-500 font-mono max-w-lg leading-relaxed">
            Scrape Google Maps for businesses with photos but no website.<br/>
            Export to CSV. Pitch them a free landing page.
          </motion.p>
        </motion.div>

        {/* ── search card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16,1,0.3,1] }}
          className="relative rounded-2xl border border-[#1f2328] bg-[#0d1014] overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00DC8230] to-transparent" />
          <div className="p-6 space-y-5">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest flex items-center gap-2">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00DC82" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4-4"/>
              </svg>
              Search parameters
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Business type" value={query} onChange={setQuery} placeholder="nail salons, plumbers, restaurants…" />
              <InputField label="Location" value={location} onChange={setLocation} placeholder="Austin, Texas" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <SelectField
                label="Max results"
                value={maxResults}
                onChange={v => setMaxResults(Number(v))}
                options={[20,50,100,200].map(n => ({ value: n, label: `${n} results` }))}
              />
              <SelectField
                label="Min photos"
                value={minPhotos}
                onChange={v => setMinPhotos(Number(v))}
                options={[0,1,3,5,10].map(n => ({ value: n, label: n === 0 ? "Any" : `${n}+ photos` }))}
              />
              <Toggle value={noWebsiteOnly} onChange={setNoWebsiteOnly} label="No website only" />
              <InputField label="Apify token" value={apifyToken} onChange={setApifyToken} placeholder="apify_api_xxx…" type="password" />
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleScrape}
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#00DC82] text-[#080a0d] text-sm font-bold font-mono disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_28px_#00DC8228] hover:bg-[#00c97a] transition-colors"
              >
                {loading ? (
                  <>
                    <motion.svg animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="55" strokeDashoffset="18"/>
                    </motion.svg>
                    Scraping…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    Run Scraper
                  </>
                )}
              </motion.button>
              <span className="text-[11px] font-mono text-zinc-700 hidden sm:block">
                ~$0.07 / 50 results · Apify free tier
              </span>
            </div>
          </div>
        </motion.div>

        {/* error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-900/40 bg-red-950/25 text-red-400 text-sm font-mono"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* loading */}
        <AnimatePresence>{loading && <Spinner />}</AnimatePresence>

        {/* ── results ── */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div ref={resultsRef} initial="hidden" animate="show" variants={stagger} className="space-y-5">

              {/* stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard label="Scraped" value={result.total} delay={0} />
                <StatCard label="Qualified leads" value={result.filtered} accent delay={1} />
                <StatCard
                  label="Avg rating"
                  value={result.results.length
                    ? (result.results.reduce((a,b)=>a+(b.rating??0),0)/result.results.length).toFixed(1)
                    : "—"}
                  delay={2}
                />
                <StatCard label="Duration" value={`${(result.durationMs/1000).toFixed(0)}s`} delay={3} />
              </div>

              {/* view switcher + actions */}
              <motion.div variants={fadeUp} className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1 bg-[#0d1014] border border-[#1f2328] rounded-xl p-1">
                  {(["table","json"]).map(v => (
                    <button key={v} onClick={() => setView(v)}
                      className={`relative px-4 py-1.5 text-xs font-mono rounded-lg transition-colors ${view === v ? "text-zinc-100" : "text-zinc-600 hover:text-zinc-400"}`}
                    >
                      {view === v && (
                        <motion.div layoutId="vpill" className="absolute inset-0 bg-[#1f2328] rounded-lg"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }} />
                      )}
                      <span className="relative">{v}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <motion.button onClick={exportCSV} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1f2328] bg-[#0d1014] text-xs font-mono text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export CSV
                  </motion.button>
                  {view === "json" && (
                    <motion.button
                      onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1f2328] bg-[#0d1014] text-xs font-mono text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                      </svg>
                      Copy JSON
                    </motion.button>
                  )}
                  <span className="text-[11px] font-mono text-zinc-700 hidden sm:block">
                    run {result.runId.slice(0, 8)}… · {result.filtered} leads
                  </span>
                </div>
              </motion.div>

              {/* table */}
              {view === "table" && (
                <motion.div variants={fadeUp} className="rounded-2xl border border-[#1f2328] bg-[#0d1014] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px]">
                      <thead>
                        <tr className="border-b border-[#1f2328] bg-[#0a0d10]">
                          <Th label="Business" />
                          <Th label="Category" />
                          <Th label="Location" />
                          <Th label="Phone" />
                          <Th label="Rating" sk="rating" />
                          <Th label="Reviews" sk="reviewsCount" />
                          <Th label="Photos" sk="photosCount" />
                          <Th label="Website" />
                        </tr>
                      </thead>
                      <tbody>
                        {sorted.map((b, i) => (
                          <motion.tr
                            key={b.title + i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.025, duration: 0.3, ease: "easeOut" }}
                            className="border-b border-[#161a1e] hover:bg-[#111519] transition-colors"
                          >
                            <td className="px-4 py-3.5 pl-5">
                              <div className="font-medium text-sm text-zinc-200 leading-tight max-w-[160px] truncate">{b.title}</div>
                              {b.googleMapsUrl && (
                                <a href={b.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                                  className="text-[10px] font-mono text-zinc-700 hover:text-[#00DC82] transition-colors mt-0.5 block">
                                  view on maps ↗
                                </a>
                              )}
                            </td>
                            <td className="px-4 py-3.5 text-xs font-mono text-zinc-600 max-w-[110px] truncate">{b.category||"—"}</td>
                            <td className="px-4 py-3.5">
                              <span className="text-xs text-zinc-500 max-w-[150px] line-clamp-2 leading-tight block">{b.address||"—"}</span>
                            </td>
                            <td className="px-4 py-3.5 text-xs font-mono text-zinc-500 whitespace-nowrap">{b.phone||"—"}</td>
                            <td className="px-4 py-3.5"><StarRating rating={b.rating} /></td>
                            <td className="px-4 py-3.5 text-xs font-mono text-zinc-500 text-right">{b.reviewsCount.toLocaleString()}</td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2">
                                <div className="h-1 rounded-full bg-[#1f2328] w-10 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((b.photosCount / 15) * 100, 100)}%` }}
                                    transition={{ delay: i * 0.03 + 0.3, duration: 0.6, ease: "easeOut" }}
                                    className="h-full rounded-full bg-[#00DC82]"
                                  />
                                </div>
                                <span className="text-xs font-mono text-zinc-600">{b.photosCount}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              {b.website ? <Badge variant="warn">has website</Badge> : <Badge variant="success">no website</Badge>}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {sorted.length === 0 && (
                    <div className="text-center py-16 text-zinc-700 font-mono text-sm">No results match the filters.</div>
                  )}
                </motion.div>
              )}

              {/* json */}
              {view === "json" && (
                <motion.div variants={fadeUp} className="rounded-2xl border border-[#1f2328] bg-[#0d1014] overflow-hidden">
                  <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#1f2328] bg-[#0a0d10]">
                    <div className="flex gap-1.5">
                      {["bg-[#ff5f57]","bg-[#febc2e]","bg-[#28c840]"].map((c,i)=>(
                        <div key={i} className={`w-2.5 h-2.5 rounded-full ${c} opacity-70`}/>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-700 ml-1">response.json</span>
                    <span className="ml-auto text-[10px] font-mono text-zinc-700">
                      {JSON.stringify(result).length.toLocaleString()} chars
                    </span>
                  </div>
                  <pre className="p-5 text-xs font-mono text-zinc-400 overflow-auto max-h-[560px] leading-relaxed">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </motion.div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

        {/* ── API docs (idle state) ── */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="rounded-2xl border border-[#1f2328] bg-[#0d1014] overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-[#1f2328] bg-[#0a0d10]">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">API reference</span>
            </div>
            <div className="p-6 space-y-4">
              {[
                {
                  method: "GET", cls: "bg-blue-950/50 text-blue-400 border-blue-900/40",
                  path: "/api/scrape", desc: "Query string params",
                  code: `/api/scrape?query=nail+salons&location=Austin,Texas\n  &maxResults=50&minPhotos=3&noWebsiteOnly=true&apifyToken=xxx`,
                },
                {
                  method: "POST", cls: "bg-emerald-950/50 text-emerald-400 border-emerald-900/40",
                  path: "/api/scrape", desc: "JSON body",
                  code: `{ "query": "plumbers", "location": "Dallas, Texas",\n  "maxResults": 50, "noWebsiteOnly": true, "apifyToken": "xxx" }`,
                },
                {
                  method: "GET", cls: "bg-blue-950/50 text-blue-400 border-blue-900/40",
                  path: "/api/scrape/health", desc: "Health check",
                  code: `→ { "ok": true, "service": "mapsscraper", "version": "0.1.0" }`,
                },
              ].map((ep, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.1 }}
                  className="rounded-xl bg-[#080a0d] border border-[#1a1e22] p-4 space-y-2.5"
                >
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border ${ep.cls}`}>{ep.method}</span>
                    <code className="text-sm font-mono text-zinc-300">{ep.path}</code>
                    <span className="text-xs text-zinc-600">{ep.desc}</span>
                  </div>
                  <pre className="text-[11px] font-mono text-zinc-600 leading-relaxed break-all whitespace-pre-wrap bg-[#0a0d10] rounded-lg px-3 py-2.5 border border-[#161a1e]">
                    {ep.code}
                  </pre>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <footer className="border-t border-[#1f2328] mt-12">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between text-[11px] font-mono text-zinc-700">
          <span>mapsscraper · MIT License · open source</span>
          <span>Next.js 14 · Hono.js · Apify</span>
        </div>
      </footer>
    </div>
  )
}