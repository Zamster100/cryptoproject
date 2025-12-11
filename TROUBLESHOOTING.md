# Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Page Shows "Loading..." Forever

**Possible Causes:**
- API request is being blocked by CORS (Cross-Origin Resource Sharing)
- No internet connection
- CoinGecko API is down or rate-limited

**Solution:**
You MUST use a local web server instead of opening the HTML file directly. Opening `index.html` directly with `file://` protocol will cause CORS errors.

**Start a local server:**

```bash
# Option 1: Python 3 (recommended)
python3 -m http.server 8000

# Option 2: Python 2
python -m SimpleHTTPServer 8000

# Option 3: Node.js
npx http-server -p 8000

# Option 4: PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Issue 2: How to Check for Errors

**Open Browser Developer Tools:**

1. **Chrome/Edge:** Press `F12` or `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (Mac)
2. **Firefox:** Press `F12` or `Ctrl+Shift+K` (Windows/Linux) or `Cmd+Option+K` (Mac)
3. **Safari:** Enable Developer menu in Preferences, then press `Cmd+Option+C`

**Check the Console tab for error messages:**
- Red text indicates errors
- Look for messages about CORS, fetch, or network errors

**Check the Network tab:**
- Look for failed requests (red)
- Check if requests to `api.coingecko.com` are successful (status 200)

### Issue 3: CORS Error in Console

**Error message:** `Access to fetch at 'https://api.coingecko.com/...' from origin 'null' has been blocked by CORS policy`

**Cause:** Opening the HTML file directly (file:// protocol)

**Solution:** Use a local web server (see Issue 1 solution above)

### Issue 4: API Rate Limit Error

**Error message:** `429 Too Many Requests`

**Cause:** Exceeded CoinGecko's free tier rate limit

**Solution:** Wait a few minutes and refresh the page

### Issue 5: Network Error / Failed to Fetch

**Possible Causes:**
- No internet connection
- Firewall blocking the request
- CoinGecko API is temporarily down

**Solutions:**
1. Check your internet connection
2. Try accessing https://api.coingecko.com/api/v3/ping in your browser
3. Check if your firewall/antivirus is blocking the request
4. Wait and try again later

### Issue 6: Nothing Displays on the Page

**Check:**
1. Are all three files (index.html, styles.css, app.js) in the same directory?
2. Open Developer Tools Console - are there any errors about missing files?
3. Check the Network tab - are styles.css and app.js loading successfully?

### Issue 7: Blank/White Page

**Possible Causes:**
- JavaScript error preventing execution
- CSS file not loading

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify all files are in the same directory
3. Try hard-refreshing the page: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

## Quick Test

To verify the API is working, open this URL in your browser:
```
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1
```

You should see JSON data with cryptocurrency information.

## File Checklist

Ensure you have all files in the same directory:
```
cryptoproject/
├── index.html      ✓
├── styles.css      ✓
├── app.js          ✓
└── README.md       ✓
```

## Still Not Working?

Please provide:
1. What happens when you open the page? (blank, loading forever, error message, etc.)
2. Any error messages from the browser console
3. Which browser and version you're using
4. How you're opening the file (directly or via local server)
