"use client";
import { useState } from "react";
import { App } from "./page";

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#FFD700" : "#ddd", fontSize: 13 }}>★</span>
      ))}
    </div>
  );
}

function AppCard({ app, rank }: { app: App; rank: number }) {
  return (
    <a href={"/" + app.slug} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        background: "#fff", borderRadius: 14, padding: "14px 16px",
        marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        border: "1px solid #f0f0f0",
      }}>
        <div style={{ color: "#bbb", fontWeight: 700, fontSize: 14, minWidth: 22, textAlign: "center" }}>{rank}</div>

        <div style={{
          width: 58, height: 58, borderRadius: 14, flexShrink: 0, overflow: "hidden",
          background: "linear-gradient(135deg, #00632b22, #01245922)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {app.logoUrl
            ? <img src={app.logoUrl} alt={app.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: 28 }}>🎮</span>
          }
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {app.name}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#2e7d32", fontWeight: 600 }}>🎁 Bonus: ₹{app.bonus}</span>
            <span style={{ fontSize: 12, color: "#1565c0", fontWeight: 600 }}>💸 Min WD: ₹{app.minWithdraw}</span>
            {app.version && <span style={{ fontSize: 12, color: "#666" }}>v{app.version}</span>}
          </div>
          <Stars rating={app.rating} />
        </div>

        <div style={{
          background: "linear-gradient(135deg, #00632b, #007860)",
          color: "#fff", padding: "8px 14px", borderRadius: 10,
          fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0,
        }}>
          ⬇ Download
        </div>
      </div>
    </a>
  );
}

interface Props {
  topRated: App[];
  newGames: App[];
  otherGames: App[];
}

export default function TabSection({ topRated, newGames, otherGames }: Props) {
  const [activeTab, setActiveTab] = useState("top-rated");

  const tabs = [
    { id: "top-rated", label: "⭐ Top Rated", apps: topRated },
    { id: "new-games", label: "🆕 New Games", apps: newGames },
    { id: "other-games", label: "🎮 Other Games", apps: otherGames },
  ];

  const activeApps = tabs.find((t) => t.id === activeTab)?.apps || [];

  return (
    <div>
      {/* Tab Buttons */}
      <div style={{
        display: "flex", background: "#fff", borderRadius: 14,
        padding: 6, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", gap: 4,
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: "10px 8px", borderRadius: 10, border: "none",
              background: activeTab === tab.id ? "linear-gradient(135deg, #00632b, #007860)" : "transparent",
              color: activeTab === tab.id ? "#fff" : "#666",
              fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* App List */}
      <div>
        {activeApps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#aaa" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎮</div>
            <p>No apps in this category yet</p>
          </div>
        ) : (
          activeApps.map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
        )}
      </div>
    </div>
  );
}
