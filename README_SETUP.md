# Authorised Compliance Developer Portal

Ready-to-upload static HTML documentation for GitHub Pages. No Swagger, server, build step, package installation, or paid hosting required.

## What is included

- Home page, Lending overview and 9 supporting Lending guides
- Changelog and support guidance
- Responsive navigation, client-side search and accessible page layout
- No customer data, API credentials, campaign codes or AWS configuration
- `.nojekyll` to serve all files directly

## Verified / unverified content

- `POST https://api.authorisedcompliance.com/post`: confirmed by user Postman test returning HTTP 200.
- The shared relay's current returned polling link is under `/Monevo/results?t=...`; the exact response URL always wins.
- The proposed root `/results` alias is NOT listed as live because its deployment has not been confirmed.
- A 200 HTTP response is distinct from the XML `<result>` business outcome.
- Default results-token TTL shown as 300 seconds, but current production settings and polling limits must be confirmed before external release.
- The relay's security design is stateless regarding raw application/offer bodies; application outcome retention must be arranged with relevant parties.

## 1. Create GitHub repository

1. GitHub -> Your ACL organization -> Repositories -> New.
2. Owner: your ACL organization. Name: `ac-developer-docs` (or any unused name).
3. Set **Public** (GitHub Pages on the Free plan requires it); do not place private material here.
4. Do not add other starter files for a clean repo (optional README is fine).
5. Create repository.

## 2. Upload files

1. Extract the ZIP on your machine.
2. Open the new repository, `Add file` -> `Upload files`.
3. Upload the **contents** of this folder, preserving `assets/`, `lending/`, etc. Do not upload only the ZIP.
4. Commit to `main`.
5. Open repo Settings -> Pages -> Build and deployment -> Deploy from a branch; branch `main`, folder `/ (root)`; Save.
6. Test the project URL displayed under Settings -> Pages. It will resemble `https://YOUR-ORG.github.io/ac-developer-docs/`.

If your organization disables GitHub Pages or public repositories, an organization owner must allow them or choose other hosting.

## 3. Protect and connect the domain

1. Recommended: GitHub organization Settings -> Pages -> verify `authorisedcompliance.com` with the GitHub-supplied TXT challenge in authoritative DNS (optional but strongly advised).
2. In repository Settings -> Pages, add custom domain `docs.authorisedcompliance.com` and Save before changing public DNS.
3. At the *authoritative* DNS provider for `authorisedcompliance.com` (GoDaddy if nameservers use GoDaddy), edit/create the CNAME record:
   - Type: `CNAME`
   - Host/Name: `docs`
   - Target: `YOUR-ACTUAL-ORG-SLUG.github.io` (NOT the repo URL, and no `https://`)
   - TTL: Default
4. If an old `docs` CNAME exists (e.g. Cloudflare Pages), EDIT or replace it; do not keep duplicate CNAMEs.
5. Back in GitHub repository Settings -> Pages, wait for the domain/certificate validation to complete and enable Enforce HTTPS.
6. Visit `https://docs.authorisedcompliance.com` and `/lending/`.

Do not modify `api.authorisedcompliance.com`, mail DNS, or the main company site. DNS changes can take time to propagate.

## 4. Update content later

Every published page is a normal HTML file with its own `index.html`:
- Landing page: `index.html`
- Submit: `lending/submit/index.html`
- Polling: `lending/results/index.html`
- Navigation and styles: `assets/styles.css` and `assets/site.js`
- Search index: `assets/search-index.json`

You can use GitHub's pencil Edit action to update text in the HTML and commit the file. Edits to search titles or navigation may require updating the JSON/other HTML page menus too. For larger changes, regenerate the site from your source authoring workflow.

## Security / publishing check

- Confirm the domain is owned by ACL and the GitHub Pages repo is owned by ACL.
- Public repo means all files are public. Upload no secrets, personal data, signed contracts or internal guides.
- Disable/disallow executing live production applications from documentation UI.
- Validate endpoint statuses and any contract-specific permissions before sending the link to third-party clients.
- Use an approved customer/application-record retention process. AC's current relay does not archive full payloads.

## Important limitation

GitHub Pages hosts static documentation only. It does not run Lambda functions, an authenticated client portal, or the loan-processing API; those remain in AWS. GitHub's Pages limits should be reviewed if used for commercial services beyond documentation.
