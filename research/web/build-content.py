"""Bundle all research markdown into content.js for offline HTML app."""
import json
import re
from pathlib import Path

RESEARCH = Path(__file__).resolve().parent.parent
OUT = Path(__file__).resolve().parent / "content.js"

MANIFEST = [
    {"id": "home", "title": "Home", "path": "README.md", "cat": "home", "icon": "🏠"},
    {"id": "real-exam", "title": "Real Exam Q&A (Explained)", "path": "REAL-EXAM-MATH-REASONING-EXPLAINED.md", "cat": "exam", "icon": "🎯", "priority": True},
    {"id": "exam-all", "title": "Exam Cram — All Questions", "path": "EXAM-TOMORROW-ALL-QUESTIONS.md", "cat": "exam", "icon": "⚡", "priority": True},
    {"id": "exam-extra", "title": "Extra Math & Reasoning", "path": "EXAM-TOMORROW-MATH-REASONING-EXTRA.md", "cat": "exam", "icon": "📝", "priority": True},
    {"id": "2025", "title": "2025 Paper Analysis", "path": "previous-year-analysis/ntpc-2025-analysis.md", "cat": "years", "icon": "📊"},
    {"id": "2024", "title": "2024 Paper Analysis", "path": "previous-year-analysis/ntpc-2024-analysis.md", "cat": "years", "icon": "📊"},
    {"id": "2023", "title": "2023 Paper Analysis", "path": "previous-year-analysis/ntpc-2023-analysis.md", "cat": "years", "icon": "📊"},
    {"id": "2022", "title": "2022 Paper Analysis", "path": "previous-year-analysis/ntpc-2022-analysis.md", "cat": "years", "icon": "📊"},
    {"id": "2021", "title": "2021 Paper Analysis", "path": "previous-year-analysis/ntpc-2021-analysis.md", "cat": "years", "icon": "📊"},
    {"id": "master-topics", "title": "Master Topic Analysis", "path": "topic-analysis/master-topic-analysis.md", "cat": "analysis", "icon": "📈"},
    {"id": "predictions", "title": "2026 Predictions", "path": "predictions/expected-topics-2026.md", "cat": "analysis", "icon": "🔮"},
    {"id": "plan-30", "title": "30-Day Study Plan", "path": "study-plans/30-day-plan.md", "cat": "plans", "icon": "📅"},
    {"id": "plan-60", "title": "60-Day Study Plan", "path": "study-plans/60-day-plan.md", "cat": "plans", "icon": "📅"},
    {"id": "plan-90", "title": "90-Day Study Plan", "path": "study-plans/90-day-plan.md", "cat": "plans", "icon": "📅"},
    {"id": "ca-jan", "title": "Current Affairs — Jan 2026", "path": "current-affairs/current-affairs-jan-2026.md", "cat": "ca", "icon": "📰"},
    {"id": "ca-feb", "title": "Current Affairs — Feb 2026", "path": "current-affairs/current-affairs-feb-2026.md", "cat": "ca", "icon": "📰"},
    {"id": "ca-mar", "title": "Current Affairs — Mar 2026", "path": "current-affairs/current-affairs-mar-2026.md", "cat": "ca", "icon": "📰"},
    {"id": "ca-apr", "title": "Current Affairs — Apr 2026", "path": "current-affairs/current-affairs-apr-2026.md", "cat": "ca", "icon": "📰"},
    {"id": "ca-may", "title": "Current Affairs — May 2026", "path": "current-affairs/current-affairs-may-2026.md", "cat": "ca", "icon": "📰"},
    {"id": "ca-jun", "title": "Current Affairs — Jun 2026", "path": "current-affairs/current-affairs-jun-2026.md", "cat": "ca", "icon": "📰"},
    {"id": "tut-percentage", "title": "Tutorial: Percentage", "path": "tutorials/tutorial-percentage.md", "cat": "tutorials", "icon": "🔢", "subject": "Math"},
    {"id": "tut-pl", "title": "Tutorial: Profit & Loss", "path": "tutorials/tutorial-profit-loss.md", "cat": "tutorials", "icon": "💰", "subject": "Math"},
    {"id": "tut-simp", "title": "Tutorial: Simplification", "path": "tutorials/tutorial-simplification.md", "cat": "tutorials", "icon": "➗", "subject": "Math"},
    {"id": "tut-ns", "title": "Tutorial: Number System", "path": "tutorials/tutorial-number-system.md", "cat": "tutorials", "icon": "🔢", "subject": "Math"},
    {"id": "tut-tsd", "title": "Tutorial: Time Speed Distance", "path": "tutorials/tutorial-time-speed-distance.md", "cat": "tutorials", "icon": "🚂", "subject": "Math"},
    {"id": "tut-tw", "title": "Tutorial: Time & Work", "path": "tutorials/tutorial-time-work.md", "cat": "tutorials", "icon": "⏱️", "subject": "Math"},
    {"id": "tut-si", "title": "Tutorial: SI & CI", "path": "tutorials/tutorial-simple-compound-interest.md", "cat": "tutorials", "icon": "🏦", "subject": "Math"},
    {"id": "tut-coding", "title": "Tutorial: Coding-Decoding", "path": "tutorials/tutorial-coding-decoding.md", "cat": "tutorials", "icon": "🔐", "subject": "Reasoning"},
    {"id": "tut-puzzle", "title": "Tutorial: Puzzles", "path": "tutorials/tutorial-puzzles-seating.md", "cat": "tutorials", "icon": "🧩", "subject": "Reasoning"},
    {"id": "tut-blood", "title": "Tutorial: Blood Relations", "path": "tutorials/tutorial-blood-relations.md", "cat": "tutorials", "icon": "👨‍👩‍👧", "subject": "Reasoning"},
    {"id": "tut-science", "title": "Tutorial: General Science", "path": "tutorials/tutorial-general-science.md", "cat": "tutorials", "icon": "🔬", "subject": "GA"},
]

def main():
    pages = {}
    manifest_out = []

    for item in MANIFEST:
        fp = RESEARCH / item["path"]
        if not fp.exists():
            print(f"Skip missing: {fp}")
            continue
        text = fp.read_text(encoding="utf-8")
        entry = {k: v for k, v in item.items() if k != "path"}
        entry["markdown"] = text
        pages[item["id"]] = entry
        manifest_out.append({k: v for k, v in item.items() if k != "path"})

    js = "// Auto-generated — run build-content.py to refresh\n"
    js += "window.NTPC_DATA = "
    js += json.dumps({"manifest": manifest_out, "pages": pages}, ensure_ascii=False)
    js += ";\n"
    OUT.write_text(js, encoding="utf-8")
    print(f"Wrote {OUT} ({len(pages)} pages, {OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
