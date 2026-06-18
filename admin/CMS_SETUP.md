# Sveltia CMS Configuration Guide

This guide explains how to access, use, and configure **Sveltia CMS** for your Adventure Journal both locally and on your live website.

---

## 1. Local Development (No Configuration Required)

Sveltia CMS uses the modern browser **File System Access API** to edit your local repository offline. You do **not** need GitHub login or a proxy server.

### How to use:
1. Run your local server (e.g. the active server at `http://localhost:3000`).
2. Open **Chrome, Edge, or Opera** and navigate to:
   ```
   http://localhost:3000/admin/
   ```
3. Click the **"Work with Local Repository"** button.
4. Select your project directory: `Portfolio website roshan`.
5. Grant the browser permission to read/write files when prompted.
6. **Start adding photos!** Sveltia CMS will write the text directly to `data/adventures.json` and place your uploaded images in `assets/adventures/`.

---

## 2. Production Setup (Live Website)

When your website is hosted live, Sveltia CMS needs permission to commit changes directly to your GitHub repository (`roshankayastha/Portfolio-web`). 

Depending on where you host the site, choose **Option A** or **Option B**:

### Option A: Hosting on Netlify (Highly Recommended)
Netlify makes CMS setups extremely easy by handling authentication for you.

1. In your Netlify dashboard, go to **Site configuration** > **Identity** > **Enable Identity**.
2. Scroll down to **Services** > **Git Gateway** > **Enable Git Gateway** (this authorizes Netlify to write to your GitHub repo on your behalf).
3. Modify [admin/config.yml](file:///c:/Users/ACER/Downloads/Portfolio%20website%20roshan/admin/config.yml) to use Netlify's `git-gateway` backend:
   ```yaml
   backend:
     name: git-gateway
     branch: master
   ```
4. Stage, commit, and push this change to GitHub.

---

### Option B: Hosting on cPanel, GitHub Pages, or Vercel
If you are hosting on cPanel or a traditional host, you need a simple **GitHub OAuth Gateway** to handle authorization securely.

#### Step 1: Create a GitHub OAuth App
1. Go to your GitHub settings > **Developer Settings** > **OAuth Apps** > **New OAuth App**.
2. Set the details:
   - **Application Name:** `Roshan Portfolio CMS`
   - **Homepage URL:** `https://your-website.com`
   - **Authorization callback URL:** `https://your-oauth-gateway.com/callback` (see below)
3. Click **Register Application**, then generate and copy a new **Client Secret**.

#### Step 2: Use a Free OAuth Gateway
Since a static site cannot store your Client Secret securely, you must deploy or use a simple gateway to do the token exchange.
* **Easy Zero-Config Gateway:** You can deploy a free, one-click template to Cloudflare Workers or Vercel, such as [sveltiacms/github-oauth-gateway](https://github.com/sveltiacms/github-oauth-gateway) or [decap-cms-oauth](https://github.com/vnglst/netlify-cms-oauth-provider-go).
* Set your GitHub `CLIENT_ID` and `CLIENT_SECRET` as environment variables on that gateway.

#### Step 3: Update `admin/config.yml`
Update [admin/config.yml](file:///c:/Users/ACER/Downloads/Portfolio%20website%20roshan/admin/config.yml) to connect to your gateway:
```yaml
backend:
  name: github
  repo: roshankayastha/Portfolio-web
  branch: master
  base_url: https://your-oauth-gateway.com   # Path to your deployed gateway URL
  auth_endpoint: oauth/authorize             # OAuth endpoint
```

---

## Media Note
* Sveltia CMS automatically handles visual image scaling, cropping, and uploads.
* Photos added through Sveltia will be placed in `assets/adventures/`. If you host on cPanel or custom server, make sure the `assets/adventures` directory is writeable!

---

## 3. Automated Git Deployment on cPanel (GitHub Webhooks)

To avoid logging into cPanel and manually pulling/deploying every time you push to GitHub, we have added an auto-deployment script: [admin/deploy.php](file:///c:/Users/ACER/Downloads/Portfolio%20website%20roshan/admin/deploy.php).

### Step 1: Verify your Repository Path on cPanel
1. Log in to cPanel and open **Git™ Version Control**.
2. Click **Manage** on your repository.
3. Locate the **Repository Path** field (usually something like `/home/yogaadve/repositories/Portfolio-web` or `/home/yogaadve/Portfolio-web`).
4. If it differs from the default path in [admin/deploy.php](file:///c:/Users/ACER/Downloads/Portfolio%20website%20roshan/admin/deploy.php#L18), open that file and update `REPOSITORY_PATH` on line 18:
   ```php
   define('REPOSITORY_PATH', 'YOUR_ACTUAL_CPANEL_REPOSITORY_PATH');
   ```

### Step 2: Configure the Webhook on GitHub
1. Go to your GitHub repository page > **Settings** > **Webhooks** > **Add webhook**.
2. Set the details:
   - **Payload URL:** `https://kayastharoshan.com.np/admin/deploy.php?token=27291489d219c01d4b143524246c510e0b4b95dc`
   - **Content type:** `application/json`
   - **Secret:** Leave blank.
   - **Which events:** Select *Just the push event*.
3. Click **Add webhook**.

Now, whenever you run `git push`, GitHub will notify your server, and cPanel will automatically pull your latest commits and deploy them to your live directory using the rules in `.cpanel.yml`!
