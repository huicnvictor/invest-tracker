import json
import os
import smtplib
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

import yfinance as yf

ROOT = Path(__file__).resolve().parent.parent
WATCHLIST = ROOT / "watchlist.json"
STATE = ROOT / "state.json"

GMAIL_USER = os.environ.get("GMAIL_USER")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD")

CURRENCY_SYMBOLS = {"EUR": "€", "USD": "$", "GBP": "£", "HKD": "HK$", "CAD": "C$"}


def load_json(path, default):
    if not path.exists():
        return default
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
        f.write("\n")


def fetch_price(symbol):
    t = yf.Ticker(symbol)
    try:
        price = t.fast_info.get("last_price")
        if price:
            return float(price)
    except Exception:
        pass
    hist = t.history(period="5d")
    if not hist.empty:
        return float(hist["Close"].iloc[-1])
    return None


def fmt_price(price, currency):
    sym = CURRENCY_SYMBOLS.get(currency, "")
    return f"{sym}{price:,.2f}"


def build_email(kind, ticker, price, threshold):
    name = ticker.get("name", ticker["symbol"])
    sym = ticker["symbol"]
    cur = ticker.get("currency", "")
    price_s = fmt_price(price, cur)
    threshold_s = fmt_price(threshold, cur)
    if kind == "low":
        subject = f"[BUY] {sym} at {price_s} (hit your low {threshold_s})"
        action = "Time to buy."
        color = "#2D8C5A"
        label = "BELOW LOW"
    else:
        subject = f"[STOP] {sym} at {price_s} (hit your high {threshold_s})"
        action = "Stop buying."
        color = "#E63946"
        label = "ABOVE HIGH"
    body = f"""
    <div style="font-family:Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#F5F0E8;color:#1A1A1A;">
      <div style="background:{color};color:#fff;padding:6px 12px;display:inline-block;font-weight:700;letter-spacing:0.06em;font-size:12px;">{label}</div>
      <h2 style="margin:14px 0 8px;font-size:22px;">{name}</h2>
      <div style="font-size:32px;font-weight:900;margin:8px 0;">{price_s}</div>
      <p style="margin:8px 0;color:#555;">Your threshold: {threshold_s}</p>
      <p style="margin:20px 0 0;font-size:16px;font-weight:600;">{action}</p>
      <hr style="margin:24px 0;border:0;border-top:2px solid #1A1A1A;">
      <p style="font-size:12px;color:#777;">Invest Tracker · {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}</p>
    </div>
    """
    return subject, body


def send_email(subject, body_html):
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        print(f"[WARN] Gmail creds missing, would have sent: {subject}")
        return
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = GMAIL_USER
    msg["To"] = GMAIL_USER
    msg.attach(MIMEText(body_html, "html"))
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(GMAIL_USER, GMAIL_APP_PASSWORD.replace(" ", ""))
        smtp.send_message(msg)
    print(f"[SENT] {subject}")


def main():
    watchlist = load_json(WATCHLIST, {"tickers": []})
    state = load_json(STATE, {"tickers": {}})

    for ticker in watchlist["tickers"]:
        sym = ticker["symbol"]
        low = ticker.get("low")
        high = ticker.get("high")

        price = fetch_price(sym)
        if price is None:
            print(f"[WARN] could not fetch price for {sym}")
            continue

        prev = state["tickers"].get(sym, {})
        below_alerted = prev.get("below_low_alerted", False)
        above_alerted = prev.get("above_high_alerted", False)

        if low is not None:
            if price <= low and not below_alerted:
                subject, body = build_email("low", ticker, price, low)
                send_email(subject, body)
                below_alerted = True
            elif price > low:
                below_alerted = False

        if high is not None:
            if price >= high and not above_alerted:
                subject, body = build_email("high", ticker, price, high)
                send_email(subject, body)
                above_alerted = True
            elif price < high:
                above_alerted = False

        state["tickers"][sym] = {
            "last_price": price,
            "last_checked": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "below_low_alerted": below_alerted,
            "above_high_alerted": above_alerted,
        }
        print(f"{sym}: {price} low={low} high={high} below_alerted={below_alerted} above_alerted={above_alerted}")

    save_json(STATE, state)


if __name__ == "__main__":
    main()
