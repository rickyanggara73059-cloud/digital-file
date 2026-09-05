import type { ReactNode } from "react"`r`nimport { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"
import {
  Archive,
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Search,
  Upload,
  Users,
} from "lucide-react"

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Archive size={22} strokeWidth={2} />
        </div>

        <div>
          <div className="brand-title">LEMARI ARSIP</div>
          <div className="brand-subtitle">DIGITAL LAWYER</div>
        </div>
      </div>

      <nav className="navigation">
        <div className="nav-label">MENU UTAMA</div>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/klien"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Users size={19} />
          <span>Klien</span>
        </NavLink>

        <NavLink
          to="/perkara"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <BriefcaseBusiness size={19} />
          <span>Perkara</span>
        </NavLink>

        <NavLink
          to="/berkas"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <FolderOpen size={19} />
          <span>Berkas</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="profile-avatar">P</div>

        <div>
          <strong>Lawyer</strong>
          <span>Administrator</span>
        </div>
      </div>
    </aside>
  )
}

function Topbar({
  title,
  eyebrow = "DIGITAL CASE FILE",
  action,
}: {
  title: string
  eyebrow?: string
  action?: ReactNode
}) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar-right">
        {action}

        <div className="topbar-profile">
          <div className="profile-avatar">P</div>

          <div>
            <strong>Lawyer</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function PageLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <PageLayout>
      <Topbar title="Dashboard" />

      <section className="welcome-section">
        <div>
          <p className="eyebrow">SELAMAT DATANG</p>

          <h2>
            Semua berkas perkara,
            <br />
            tersusun dalam satu tempat.
          </h2>

          <p className="welcome-text">
            Simpan, temukan, dan akses berkas perkara Anda dengan mudah
            kapan saja dari perangkat apa pun.
          </p>
        </div>

        <div className="welcome-icon">
          <Archive size={58} strokeWidth={1.2} />
        </div>
      </section>

      <section className="search-section">
        <Search size={21} />

        <input
          type="text"
          placeholder="Cari nama klien, perkara, atau berkas..."
        />

        <span className="search-shortcut">Ctrl K</span>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={22} />
          </div>

          <div>
            <span>Total Klien</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BriefcaseBusiness size={22} />
          </div>

          <div>
            <span>Total Perkara</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={22} />
          </div>

          <div>
            <span>Total Berkas</span>
            <strong>0</strong>
          </div>
        </div>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ARSIP</p>
            <h3>Klien Terbaru</h3>
          </div>
        </div>

        <div className="empty-state">
          <div className="empty-icon">
            <FolderOpen size={30} />
          </div>

          <h4>Belum ada klien</h4>

          <p>
            Tambahkan klien pertama untuk mulai membangun
            lemari arsip digital Anda.
          </p>

          <NavLink to="/klien" className="primary-button">
            + Tambah Klien
          </NavLink>
        </div>
      </section>
    </PageLayout>
  )
}

function Clients() {
  return (
    <PageLayout>
      <Topbar
        title="Klien"
        eyebrow="DATA KLIEN"
        action={
          <button className="primary-button">
            + Tambah Klien
          </button>
        }
      />

      <section className="page-intro">
        <p className="eyebrow">LEMARI ARSIP</p>

        <h2>Daftar Klien</h2>

        <p>
          Semua klien tersimpan rapi bersama perkara dan berkas
          yang terkait.
        </p>
      </section>

      <section className="document-toolbar">
        <div className="document-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Cari nama klien..."
          />
        </div>
      </section>

      <section className="document-card">
        <div className="empty-state">
          <div className="empty-icon">
            <Users size={30} />
          </div>

          <h4>Belum ada klien</h4>

          <p>
            Klien yang ditambahkan akan muncul di sini.
          </p>

          <button className="primary-button">
            + Tambah Klien
          </button>
        </div>
      </section>
    </PageLayout>
  )
}

function Cases() {
  return (
    <PageLayout>
      <Topbar
        title="Perkara"
        eyebrow="MANAJEMEN PERKARA"
        action={
          <button className="primary-button">
            + Tambah Perkara
          </button>
        }
      />

      <section className="page-intro">
        <p className="eyebrow">ARSIP PERKARA</p>

        <h2>Daftar Perkara</h2>

        <p>
          Setiap perkara akan memiliki lemari berkasnya sendiri.
        </p>
      </section>

      <section className="document-toolbar">
        <div className="document-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Cari nama klien atau perkara..."
          />
        </div>

        <select defaultValue="all">
          <option value="all">Semua Jenis Perkara</option>
          <option>Perdata</option>
          <option>Pidana</option>
          <option>Perceraian</option>
          <option>Waris</option>
          <option>Pertanahan</option>
          <option>Lainnya</option>
        </select>
      </section>

      <section className="document-card">
        <div className="empty-state">
          <div className="empty-icon">
            <BriefcaseBusiness size={30} />
          </div>

          <h4>Belum ada perkara</h4>

          <p>
            Perkara yang dibuat akan menjadi tempat utama
            penyimpanan seluruh berkas.
          </p>

          <button className="primary-button">
            + Tambah Perkara
          </button>
        </div>
      </section>
    </PageLayout>
  )
}

function Documents() {
  return (
    <PageLayout>
      <Topbar
        title="Berkas"
        eyebrow="DIGITAL CASE FILE"
        action={
          <button className="primary-button">
            <Upload size={16} />
            Upload Berkas
          </button>
        }
      />

      <section className="page-intro">
        <p className="eyebrow">ARSIP DOKUMEN</p>

        <h2>Semua berkas perkara dalam satu tempat.</h2>

        <p>
          Temukan dokumen berdasarkan klien, perkara, kategori,
          atau nama berkas.
        </p>
      </section>

      <section className="document-toolbar">
        <div className="document-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Cari nama berkas, klien, atau perkara..."
          />
        </div>

        <select defaultValue="all">
          <option value="all">Semua Format</option>
          <option value="pdf">PDF</option>
          <option value="doc">DOC</option>
          <option value="docx">DOCX</option>
        </select>

        <select defaultValue="all">
          <option value="all">Semua Kategori</option>
          <option>Identitas</option>
          <option>Surat Kuasa</option>
          <option>Gugatan</option>
          <option>Persidangan</option>
          <option>Bukti</option>
          <option>Putusan</option>
          <option>Lainnya</option>
        </select>
      </section>

      <section className="document-card">
        <div className="document-card-header">
          <div>
            <h3>Daftar Berkas</h3>
            <span>Belum ada berkas tersimpan</span>
          </div>
        </div>

        <div className="empty-state">
          <div className="empty-icon">
            <FolderOpen size={30} />
          </div>

          <h4>Belum ada berkas</h4>

          <p>
            Berkas PDF, DOC, dan DOCX akan muncul di sini
            setelah diupload.
          </p>

          <button className="primary-button">
            <Upload size={15} />
            Upload Berkas
          </button>
        </div>
      </section>
    </PageLayout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/klien" element={<Clients />} />
        <Route path="/perkara" element={<Cases />} />
        <Route path="/berkas" element={<Documents />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

