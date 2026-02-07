# Template Email per Supabase

Puoi modificare i template andando su **Supabase Dashboard** -> **Authentication** -> **Email Templates**.
Copia e incolla il codice HTML qui sotto nel box "Source" (non nel "Message").

---

## 1. Conferma Email (Confirm User)

**Subject:** GIURIMì: Conferma la tua email

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px; }
    .container { background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 40px; text-align: center; }
    .logo { font-family: 'Times New Roman', serif; font-weight: bold; font-size: 24px; color: #0f172a; margin-bottom: 24px; display: inline-block; }
    .btn { display: inline-block; background-color: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: 600; margin: 24px 0; }
    .btn:hover { background-color: #334155; }
    .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; }
    .link { color: #64748b; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">GIURIMì</div>
    
    <h2>Benvenuto!</h2>
    <p>Grazie per esserti registrato. Per iniziare a studiare, conferma che questa sia la tua email.</p>
    
    <a href="{{ .ConfirmationURL }}" class="btn">Conferma Email</a>
    
    <p style="font-size: 14px;">Se non hai richiesto questa iscrizione, puoi ignorare questa email.</p>
    
    <div class="footer">
      <p>&copy; 2024 GIURIMì - Diritto semplice, per tutti.</p>
    </div>
  </div>
</body>
</html>
```

---

## 2. Reset Password

**Subject:** GIURIMì: Reimposta la tua password

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px; }
    .container { background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 40px; text-align: center; }
    .logo { font-family: 'Times New Roman', serif; font-weight: bold; font-size: 24px; color: #0f172a; margin-bottom: 24px; display: inline-block; }
    .btn { display: inline-block; background-color: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: 600; margin: 24px 0; }
    .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">GIURIMì</div>
    
    <h2>Reimposta Password</h2>
    <p>Hai richiesto di reimpostare la tua password. Clicca il pulsante qui sotto per procedere.</p>
    
    <a href="{{ .ConfirmationURL }}" class="btn">Reimposta Password</a>
    
    <div class="footer">
      <p>Se non sei stato tu, ignora questa email.</p>
    </div>
  </div>
</body>
</html>
```
