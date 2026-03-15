# 📧 Supabase Email Template Setup for MainframeStudyHub

## How to customize (2 minutes):
1. Go to **Supabase Dashboard** → **Authentication** → **Email Templates**
2. Replace each template with the HTML below
3. Click **Save** for each

---

## 1️⃣ CONFIRM SIGNUP (Confirm Email)

**Subject:** Welcome to MainframeStudyHub — Confirm Your Email

```html
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
  <div style="background:linear-gradient(135deg,#0071e3,#7c3aed);padding:32px 24px;text-align:center">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:10px;border-radius:14px;margin-bottom:12px">
      <span style="font-size:28px">🖥️</span>
    </div>
    <h1 style="color:#fff;font-size:22px;font-weight:800;margin:0;letter-spacing:-0.3px">MainframeStudyHub</h1>
    <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:4px 0 0">The Complete IBM Z Knowledge Platform</p>
  </div>
  <div style="padding:32px 28px">
    <h2 style="color:#1d1d1f;font-size:20px;font-weight:700;margin:0 0 8px">Welcome aboard! 🎉</h2>
    <p style="color:#6e6e73;font-size:14px;line-height:1.7;margin:0 0 24px">Thank you for joining <strong style="color:#1d1d1f">MainframeStudyHub</strong>. We're thrilled to have you! Please confirm your email to get started with your mainframe learning journey.</p>
    <div style="text-align:center;margin:28px 0">
      <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:linear-gradient(135deg,#0071e3,#7c3aed);color:#fff;text-decoration:none;padding:14px 40px;border-radius:12px;font-size:15px;font-weight:700;box-shadow:0 4px 16px rgba(0,113,227,0.3)">Confirm My Email →</a>
    </div>
    <div style="background:#f8f9fc;border-radius:12px;padding:20px;margin:24px 0">
      <p style="color:#6e6e73;font-size:13px;margin:0 0 12px;font-weight:600">What's waiting for you:</p>
      <table style="width:100%">
        <tr><td style="padding:4px 0;font-size:13px;color:#3a3a3c">📚 15 mainframe topics with 192+ sections</td></tr>
        <tr><td style="padding:4px 0;font-size:13px;color:#3a3a3c">🧠 200 quiz questions to test your skills</td></tr>
        <tr><td style="padding:4px 0;font-size:13px;color:#3a3a3c">💬 Community Q&A with expert answers</td></tr>
        <tr><td style="padding:4px 0;font-size:13px;color:#3a3a3c">🤖 AI-powered mainframe assistant</td></tr>
      </table>
    </div>
    <p style="color:#aeaeb2;font-size:12px;line-height:1.6;margin:20px 0 0;border-top:1px solid #f0f0f2;padding-top:16px">If you didn't create an account on MainframeStudyHub, you can safely ignore this email.<br><br>— The MainframeStudyHub Team</p>
  </div>
</div>
```

---

## 2️⃣ RESET PASSWORD (Magic Link)

**Subject:** Reset Your MainframeStudyHub Password

```html
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
  <div style="background:linear-gradient(135deg,#0071e3,#7c3aed);padding:32px 24px;text-align:center">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:10px;border-radius:14px;margin-bottom:12px">
      <span style="font-size:28px">🔒</span>
    </div>
    <h1 style="color:#fff;font-size:22px;font-weight:800;margin:0">MainframeStudyHub</h1>
    <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:4px 0 0">Password Reset Request</p>
  </div>
  <div style="padding:32px 28px">
    <h2 style="color:#1d1d1f;font-size:20px;font-weight:700;margin:0 0 8px">Reset Your Password</h2>
    <p style="color:#6e6e73;font-size:14px;line-height:1.7;margin:0 0 24px">We received a request to reset your password. Click the button below to set a new one. This link expires in 24 hours.</p>
    <div style="text-align:center;margin:28px 0">
      <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:linear-gradient(135deg,#0071e3,#7c3aed);color:#fff;text-decoration:none;padding:14px 40px;border-radius:12px;font-size:15px;font-weight:700;box-shadow:0 4px 16px rgba(0,113,227,0.3)">Reset Password →</a>
    </div>
    <div style="background:#fff8f0;border:1px solid #fed7aa;border-radius:10px;padding:14px;margin:20px 0">
      <p style="color:#9a3412;font-size:13px;margin:0">⚠️ If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
    </div>
    <p style="color:#aeaeb2;font-size:12px;line-height:1.6;margin:20px 0 0;border-top:1px solid #f0f0f2;padding-top:16px">This is an automated message from MainframeStudyHub.<br>Please do not reply to this email.<br><br>— The MainframeStudyHub Team</p>
  </div>
</div>
```

---

## 3️⃣ MAGIC LINK (if you enable passwordless login later)

**Subject:** Sign in to MainframeStudyHub

```html
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
  <div style="background:linear-gradient(135deg,#0071e3,#7c3aed);padding:32px 24px;text-align:center">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:10px;border-radius:14px;margin-bottom:12px">
      <span style="font-size:28px">🖥️</span>
    </div>
    <h1 style="color:#fff;font-size:22px;font-weight:800;margin:0">MainframeStudyHub</h1>
  </div>
  <div style="padding:32px 28px;text-align:center">
    <h2 style="color:#1d1d1f;font-size:20px;font-weight:700;margin:0 0 8px">Your Sign In Link</h2>
    <p style="color:#6e6e73;font-size:14px;line-height:1.7;margin:0 0 24px">Click below to sign in to MainframeStudyHub. This link expires in 1 hour.</p>
    <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:linear-gradient(135deg,#0071e3,#7c3aed);color:#fff;text-decoration:none;padding:14px 40px;border-radius:12px;font-size:15px;font-weight:700;box-shadow:0 4px 16px rgba(0,113,227,0.3)">Sign In →</a>
    <p style="color:#aeaeb2;font-size:12px;margin-top:24px">— The MainframeStudyHub Team</p>
  </div>
</div>
```

---

## ⚙️ Additional Settings

### In **Authentication → URL Configuration**:
- **Site URL**: `https://your-domain.netlify.app` (or your custom domain)
- **Redirect URLs**: Add:
  - `https://your-domain.netlify.app/confirm.html`
  - `https://your-domain.netlify.app/reset-password.html`

### In **Authentication → Email Templates → Settings**:
- **Sender name**: `MainframeStudyHub`
- **Sender email**: (use default or custom domain email)
