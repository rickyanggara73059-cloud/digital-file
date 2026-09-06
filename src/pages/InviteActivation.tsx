import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { Archive, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useAuth } from "../auth/AuthProvider"

export default function InviteActivation() {
  const { user, loading: authLoading, signOut } = useAuth()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [waited, setWaited] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setWaited(true)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    if (!user) {
      setError(
        "Sesi invitation tidak ditemukan. Silakan buka kembali email invitation dari admin."
      )
      return
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.")
      return
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.")
      return
    }

    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess(true)

    await new Promise((resolve) => window.setTimeout(resolve, 1200))

    try {
      await signOut()
    } catch {
      // Tetap arahkan ke login jika logout gagal.
    }

    navigate("/login", { replace: true })
  }

  if (authLoading) {
    return <div className="auth-loading">Memuat invitation...</div>
  }

  if (!user) {
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
            <span>INVITATION</span>
            <h1>Menyiapkan Akun</h1>
            <p>
              {waited
                ? "Invitation tidak dapat ditemukan atau sudah tidak berlaku. Silakan minta admin mengirim invitation baru."
                : "Sedang memproses invitation Anda..."}
            </p>
          </div>

          {waited && (
            <button
              type="button"
              className="login-submit"
              onClick={() => navigate("/login", { replace: true })}
            >
              Kembali ke Login
            </button>
          )}

          <p className="login-footer">
            Akses hanya diberikan melalui invitation administrator.
          </p>
        </section>
      </main>
    )
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
          <span>AKTIVASI AKUN</span>
          <h1>Buat Password Anda</h1>
          <p>
            Anda telah menerima invitation dari administrator. Buat password
            untuk menyelesaikan aktivasi akun.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <div className="login-input">
              <Mail size={18} />
              <input
                type="email"
                value={user.email ?? ""}
                readOnly
                autoComplete="email"
              />
            </div>
          </label>

          <label>
            Password Baru
            <div className="login-input">
              <Lock size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimal 8 karakter"
                autoComplete="new-password"
                minLength={8}
                required
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
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <label>
            Konfirmasi Password
            <div className="login-input">
              <Lock size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Ulangi password baru"
                autoComplete="new-password"
                minLength={8}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword((value) => !value)
                }
                aria-label={
                  showConfirmPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                {showConfirmPassword ? (
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

          {success && (
            <div className="login-success" role="status">
              Akun berhasil diaktifkan. Mengarahkan ke login...
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading || success}
          >
            {loading
              ? "Mengaktifkan..."
              : success
                ? "Akun Berhasil Diaktifkan"
                : "Aktifkan Akun"}
          </button>
        </form>

        <p className="login-footer">
          Akun ini dibuat melalui invitation administrator.
        </p>
      </section>
    </main>
  )
}
