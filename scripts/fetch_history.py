"""Fetch daily close prices for every ticker in tracked_tickers.json + watchlist.json.

Writes prices.json:
    { "AAPL": [ { "date": "2025-01-02", "close": 182.45 }, ... ], ... }

On each run, merges new closes into the existing series so we keep history
across runs. First run pulls ~2y back; later runs only need today's value.
"""
import json
from datetime import datetime, timezone
from pathlib import Path

import yfinance as yf

ROOT = Path(__file__).resolve().parent.parent
WATCHLIST = ROOT / "watchlist.json"
TRACKED = ROOT / "tracked_tickers.json"
PRICES = ROOT / "prices.json"


def load_json(path, default):
    if not path.exists():
        return default
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
        f.write("\n")


def collect_symbols():
    syms = set()
    tracked = load_json(TRACKED, {"symbols": []})
    for s in tracked.get("symbols", []):
        if s:
            syms.add(s.strip())
    watch = load_json(WATCHLIST, {"tickers": []})
    for t in watch.get("tickers", []):
        sym = t.get("symbol")
        if sym:
            syms.add(sym.strip())
    return sorted(syms)


def fetch_series(symbol, period):
    t = yf.Ticker(symbol)
    hist = t.history(period=period, auto_adjust=False)
    if hist.empty:
        return []
    out = []
    for idx, row in hist.iterrows():
        close = row.get("Close")
        if close is None or close != close:  # NaN check
            continue
        out.append({"date": idx.strftime("%Y-%m-%d"), "close": round(float(close), 4)})
    return out


def merge(existing, fresh):
    by_date = {p["date"]: p for p in existing}
    for p in fresh:
        by_date[p["date"]] = p
    return sorted(by_date.values(), key=lambda x: x["date"])


def main():
    symbols = collect_symbols()
    if not symbols:
        print("[INFO] no symbols to track — add to tracked_tickers.json or watchlist.json")
        return

    prices = load_json(PRICES, {})

    for sym in symbols:
        existing = prices.get(sym, [])
        # First time we see this symbol: pull 2 years. Otherwise just 5d to catch up.
        period = "5d" if existing else "2y"
        try:
            fresh = fetch_series(sym, period)
        except Exception as e:
            print(f"[WARN] {sym}: fetch failed — {e}")
            continue
        if not fresh:
            print(f"[WARN] {sym}: no data returned")
            continue
        merged = merge(existing, fresh)
        prices[sym] = merged
        print(f"{sym}: +{len(fresh)} new points, total {len(merged)} (latest {merged[-1]['date']} = {merged[-1]['close']})")

    # Drop symbols that are no longer tracked
    for sym in list(prices.keys()):
        if sym not in symbols:
            del prices[sym]
            print(f"[CLEANUP] removed {sym} (no longer tracked)")

    save_json(PRICES, prices)
    print(f"[DONE] {len(symbols)} symbols at {datetime.now(timezone.utc).isoformat(timespec='seconds')}")


if __name__ == "__main__":
    main()
