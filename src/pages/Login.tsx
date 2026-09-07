import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [cabinetOpen, setCabinetOpen] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!cabinetOpen) return

    const timer = window.setTimeout(() => {
      emailRef.current?.focus()
    }, 1100)

    return () => window.clearTimeout(timer)
  }, [cabinetOpen])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
  }

  function openCabinet() {
    if (!cabinetOpen) {
      setCabinetOpen(true)
    }
  }

  return (
    <main className={`login-page cabinet-login ${cabinetOpen ? "is-open" : ""}`}>
      <div className="login-atmosphere" aria-hidden="true">
        <span className="atmosphere-orb orb-one" />
        <span className="atmosphere-orb orb-two" />
        <span className="atmosphere-orb orb-three" />
      </div>

      <section className="cabinet-scene" aria-label="Lemari Arsip Digital">
        <div className="cabinet-glow" aria-hidden="true" />

        <div className="cabinet-interior">
          <div className="interior-top-light" />

          <div className="interior-shelf shelf-top">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="interior-shelf shelf-middle">
            <span />
            <span />
            <span />
          </div>

          <div className="interior-documents">
            <div className="document-stack">
              <i />
              <i />
              <i />
            </div>

            <div className="interior-justice-mark">
              <img
                src="/logo-themis-justice.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="cabinet-brand">
          <img
            src="/logo-themis-justice.png"
            alt="Themis - Dewi Keadilan"
          />

          <div className="cabinet-brand-title">
            LEMARI ARSIP
          </div>

          <div className="cabinet-brand-subtitle">
            DIGITAL LAWYER
          </div>

          <div className="cabinet-brand-line" />
        </div>

        <div className="cabinet-doors">
          <button
            type="button"
            className="cabinet-door cabinet-door-left"
            onClick={openCabinet}
            aria-label="Buka lemari arsip"
            tabIndex={cabinetOpen ? -1 : 0}
          >
            <span className="door-panel">
              <span className="door-panel-inner">
                SETIAP PERKARA
                <strong>MEMILIKI TEMPATNYA</strong>
              </span>
            </span>

            <span className="door-handle">
              <span />
            </span>
          </button>

          <button
            type="button"
            className="cabinet-door cabinet-door-right"
            onClick={openCabinet}
            aria-label="Buka lemari arsip"
            tabIndex={cabinetOpen ? -1 : 0}
          >
            <span className="door-panel">
              <span className="door-panel-inner">
                AMAN
                <strong>TERATUR & TERPERCAYA</strong>
              </span>
            </span>

            <span className="door-handle">
              <span />
            </span>
          </button>
        </div>

        {!cabinetOpen && (
          <button
            type="button"
            className="cabinet-open-button"
            onClick={openCabinet}
            aria-label="Buka lemari untuk masuk"
          >
            <span className="cabinet-lock">
              <span className="lock-shackle" />
              <Lock size={20} strokeWidth={1.7} />
            </span>

            <span className="cabinet-open-label">
              KLIK UNTUK MEMBUKA
            </span>

            <span className="cabinet-open-hint">
              BUKA LEMARI UNTUK MASUK
            </span>
          </button>
        )}

        <div className="cabinet-motto">
          <span />
          <p>
            “Keteraturan hari ini,
            <br />
            keadilan di masa depan.”
          </p>
        </div>

        <section className="cabinet-login-panel" aria-hidden={!cabinetOpen}>
          <div className="cabinet-login-inner">
            <div className="inside-brand">
              <img
                src="/logo-themis-justice.png"
                alt="Themis"
              />
              <div>
                <strong>THEMIS</strong>
                <span>LEMARI ARSIP DIGITAL</span>
              </div>
            </div>

            <div className="inside-heading">
              <span>AKSES ARSIP PERKARA</span>
              <h1>Selamat Datang</h1>
              <p>
                Masuk untuk mengelola seluruh berkas perkara Anda.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="login-form cabinet-form"
            >
              <label>
                Email
                <div className="login-input">
                  <Mail size={18} />
                  <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Masukkan email"
                    autoComplete="email"
                    required
                    disabled={!cabinetOpen || loading}
                  />
                </div>
              </label>

              <label>
                Password
                <div className="login-input">
                  <Lock size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                    disabled={!cabinetOpen || loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>

              {error && (
                <div className="login-error" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={loading || !cabinetOpen}
              >
                <span>
                  {loading ? "Memproses..." : "Masuk"}
                </span>
                <span className="login-arrow">→</span>
              </button>
            </form>

            <p className="inside-footer">
              Sistem arsip digital untuk kebutuhan
              <br />
              pengelolaan berkas perkara.
            </p>
          </div>
        </section>
      </section>

      <div className="cabinet-bottom-brand">
        <span>THEMIS</span>
        <small>LEBIH DARI SEKADAR ARSIP</small>
      </div>
    </main>
  )
}
