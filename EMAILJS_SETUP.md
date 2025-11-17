# EmailJS Setup Guide

This guide will help you configure EmailJS to send DISC test results via email.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note your **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use the following template variables in your email:

```
Subject: Resultados del Test DISC - {{patron_name}}

Hola,

Aquí están tus resultados del Test DISC:

Patrón: {{patron_name}}

Descripción:
{{patron_description}}

Nivel de Onboarding:
{{nivel_onboarding}}

Aprendizajes esperados:
{{aprendizajes_esperados}}

Segmentos DISC: {{segments}}
Código: {{code}}

---

Contenido completo:
{{full_content}}

Saludos,
Equipo Onboarding
```

4. Save the template and note your **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy it

## Step 5: Update patron.html

Open `patron.html` and find these lines (around line 645-647):

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
```

Replace the placeholder values with your actual credentials:
- `YOUR_SERVICE_ID` → Your Service ID from Step 2
- `YOUR_TEMPLATE_ID` → Your Template ID from Step 3
- `YOUR_PUBLIC_KEY` → Your Public Key from Step 4

## Step 6: Test the Integration

1. Open `patron.html` in your browser
2. Complete the DISC test or navigate to the results page
3. Enter an email address in the form
4. Click "Enviar resultados por correo"
5. Check the email inbox for the results

## Troubleshooting

- **Email not sending?** Check the browser console (F12) for error messages
- **Template variables not working?** Make sure the variable names in your EmailJS template match exactly: `{{patron_name}}`, `{{patron_description}}`, etc.
- **Service ID error?** Verify your Service ID is correct and the service is active in EmailJS dashboard

## Template Variables Available

The following variables are sent to your EmailJS template:

- `to_email` - The recipient's email address
- `patron_name` - Name of the DISC pattern
- `patron_description` - Full description of the pattern
- `nivel_onboarding` - Onboarding level
- `aprendizajes_esperados` - Expected learnings
- `full_content` - Complete formatted content of all results
- `segments` - DISC segments (D, I, S, C values)
- `code` - 4-digit code representing the pattern

You can use any of these variables in your email template using the `{{variable_name}}` syntax.

