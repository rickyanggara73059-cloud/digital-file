import { useState } from "react"
import type { FormEvent } from "react"
import { Archive, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="login-brand-mark">
            <Archive size={28} strokeWidth={2} />
          </div>

          <div>
            <div className="login-brand-title">LEMARI ARSIP</div>
            <div className="login-brand-subtitle">DIGITAL LAWYER</div>
          </div>
        </div>

        <div className="login-heading">
          <span>SELAMAT DATANG</span>
          <h1>Masuk ke Lemari Arsip</h1>
          <p>
            Akses seluruh arsip perkara Anda dengan aman dari mana saja.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <div className="login-input">
              <Mail size={18} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Masukkan email"
                autoComplete="email"
                required
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
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="login-footer">
          Sistem arsip digital untuk kebutuhan pengelolaan berkas perkara.
        </p>
      </section>
    </main>
  )
}

