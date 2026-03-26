import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта в Telegram."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    comment = body.get("comment", "").strip()
    selected = body.get("selected", "")

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    chat_id = os.environ["TELEGRAM_CHAT_ID"]

    lines = [
        "🏠 Новая заявка с сайта НОВЫЙ МИР",
        "",
        f"👤 Имя: {name}",
        f"📞 Телефон: {phone}",
    ]
    if selected:
        lines.append(f"🏘 Интерес: {selected}")
    if comment:
        lines.append(f"💬 Комментарий: {comment}")

    text = "\n".join(lines)

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
    }, ensure_ascii=False).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        print(f"[Telegram API error] status={e.code} body={error_body}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": f"Telegram error {e.code}: {error_body}"}, ensure_ascii=False),
        }

    if not result.get("ok"):
        print(f"[Telegram not ok] {result}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": "Ошибка Telegram"}, ensure_ascii=False),
        }

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True}),
    }