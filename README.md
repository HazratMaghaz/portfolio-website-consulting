# Consulting Website — V5 Launch Package

# Hazrat Maghaz — Computational Research Consulting Website V2

Standalone cinematic **HTML/CSS/JavaScript** consulting website, independent of the academic PhD website. Intended future subdomain: `consulting.hazratmaghaz.tech` (not yet configured).

## File structure

- `index.html` — portfolio homepage with 6 expertise cards, 5 evidence-grounded computational methods examples, interactions and links.
- `contact.html` — separate project inquiry page in the same design language.
- `site.css` — shared design system for both pages; no React, Next.js, or bundler.
- `contact.js` — validated contact-form behavior, direct-email fallback, optional hosted Formspree submission.
- `assets/expertise/` — optimized authentic figures for four of the six expertise cards; single-cell and microbiome intentionally retain labeled illustrations pending suitable original figures.
- `assets/figures/` — review gallery containing eight genuine study figures plus optional related scientific graphics, preserved as WEBP renditions of the supplied uploads.
- `assets/media/` — two self-hosted dark-background H.264 videos and their thumbnails (posters), optimized for web playback. No external video service or keys are needed.
- `embed_portrait.py` — embeds your locally owned portrait in the consulting HTML, removing dependence on the academic site's hosted image.
- `publish_to_github.sh` — optionally creates **only** a new private consulting repository with a draft development branch. Never targets the academic repo.

## Preview locally

```bash
cd consulting-website-v2
python3 -m http.server 8000
```

Open `http://localhost:8000/index.html` and `http://localhost:8000/contact.html`.

The academic website must remain in `HazratMaghaz/portfolio-website-new`. The independent consulting repository should be `HazratMaghaz/portfolio-website-consulting`, with branch `design/cinematic-consulting-v2`. **Do not copy these files into the academic repository.**

## Contact email

All new consulting links use **hazratmaghaz.research@gmail.com**. The academic website has a separate draft PR proposing the same email change; it is not merged.

## Formspree contact form — configured

The independent `contact.html` form now submits via vanilla JavaScript (`fetch`) to the **public endpoint** `https://formspree.io/f/xvkznyjp`. It uses `POST` with `FormData` and `Accept: application/json`, preserving the site's own black/teal interface, required field validation, success messages, network errors, and rate-limit (HTTP 429) feedback. The submit button is disabled while the request is in flight to prevent accidental duplicates. Standard HTML form submission remains available when JavaScript is disabled.

**No secret is required in the static HTML or JavaScript.** The Formspree form ID is publicly visible by design; bots can find endpoints on any public website. Use provider spam protection, honeypot and/or CAPTCHA, not hiding an endpoint in source control, to reduce abuse.

Before relying on delivery:

1. In your [Formspree dashboard](https://formspree.io/forms), verify the form is active and its recipient/notification email is **hazratmaghaz.research@gmail.com**. A public endpoint alone does not determine where notifications go.
2. Check Formspree **spam protection settings**; `_gotcha` honeypot is included. Consider the provider's built-in CAPTCHA/Turnstile integration if traffic or spam warrants it. A CAPTCHA **secret** must stay only in Formspree/provider settings, never in public files.
3. Host the page, fill in one **safe test inquiry** and confirm it appears in Formspree submissions and the intended email inbox. Do not submit private research/patient data in a test.
4. If the form is blocked by CAPTCHA, domain restrictions or notification settings, use Formspree dashboard settings to resolve it.
5. Formspree usage limits, pricing, and spam controls depend on your chosen plan; check your dashboard before relying on higher-volume submissions.

The form has **no file upload** and should not be used to collect patient identifiers, account credentials, or unpublished confidential datasets. No backend or API token is included in the website.

## Cloudflare Pages preview and later custom subdomain

You already own `hazratmaghaz.tech`, so you normally **do not need to purchase another domain** to use `consulting.hazratmaghaz.tech`. It is simply a subdomain of your existing registered domain.

- Publish to **only** the independent private repository `HazratMaghaz/portfolio-website-consulting` (never `portfolio-website-new`). `publish_to_github.sh` adds the complete assets directory, including videos and figures, on the development branch.
- In Cloudflare Dashboard, choose **Workers & Pages → Create Pages project → Connect GitHub** and choose **only the consulting repository**.
- Pick `main` as the production branch; after merging the consulting PR, the site will be on `main`. Until then, inspect a **development branch preview URL** (Cloudflare Pages generates preview deployments for non-production branches). Do not use the main `*.pages.dev` URL before site files are merged, as this initially has documentation only.
- This is a static HTML site with no build tooling. Choose framework preset **None**, build command `exit 0` (or none where allowed), and build output directory `.` (the directory containing `index.html`). The repository must not deploy the academic site's code.
- Cloudflare assigns a `*.pages.dev` URL automatically; no custom DNS required for preview.
- **Later only:** Add `consulting.hazratmaghaz.tech` to the **consulting Pages project's Custom domains**. At your existing DNS manager, create a `CNAME` record, Name: `consulting`, Target: the hostname Cloudflare Pages shows for **this consulting project**, normally `<your-consulting-project>.pages.dev`. Do not change the apex `hazratmaghaz.tech` or existing `www` records. The custom domain must be added inside Pages first; DNS alone is insufficient.
- The site currently includes `noindex,nofollow` on both HTML pages because this is a preview. Remove it once the content has clearance for public launch and the domain is working.

Avoid publicizing drafts containing confidential project figures before checking permission to share them; a private GitHub repository does **not** automatically mean that preview deployment URLs require login.

## Finalized scientific visuals and video placement

**Expertise cards:**

| Expertise card | Current media | Source and scope note |
| --- | --- | --- |
| Genomics & Transcriptomics | `assets/expertise/genomics-transcriptomics.webp` | Uploaded multi-dataset miRNA FDR significance heatmap; real expression analysis, not presented as single-cell or the Crohn's cohort. |
| Single-Cell Transcriptomics | Embedded clustering schematic | **Not a completed study**. Replace only with actual cell-type annotated UMAP/marker evidence, dataset details and sharing permission. |
| Biomedical AI & Data Analysis | `assets/expertise/biomedical-ai.webp` | Uploaded *NeuroBridge* multimodal research workflow; the work is a research prototype, not a clinically validated system. |
| Computational Drug Discovery | `assets/expertise/computational-drug-discovery.webp` | Uploaded molecular docking pose plus interaction diagram. |
| Microbiome & Metagenomics | Embedded abundance schematic | Add your own true taxonomic-abundance plot, Shannon/PCoA or functional pathway visualization when approved for public release. |
| Research Code & Workflows | `assets/expertise/research-software.webp` | Uploaded PPI network as an example of a *computational analysis output*, not a screenshot of code or a software product. |

**Research figure gallery:** eight study visuals are in the new **Research, in focus** section. The original plots are presented as journal-style light canvases inside dark frames to preserve axes, legends and data colors. Clicking opens a larger original presentation (WEBP conversion without changes to plot labels or scales). The gallery includes *NeuroBridge*, docking interactions, miRNA boxplots, miRNA FDR heatmap, conformational PCA, CD28–CD80 interface, PPI network, and miRNA KEGG enrichment.

**Movies:**

- `assets/media/protein-conformation-dark.mp4` — converted from `movie.mp4`; site defaults to this clip.
- `assets/media/ligand-trajectory-dark.mp4` — converted from `SA34_200ns_movie_v2.mp4`; toggle in same player.
- The source exports had white pixels built into each video; the web copies use FFmpeg white-key compositing onto `#101A20` and H.264 re-encoding. The originals are not changed or included in this review ZIP.
- Both clips can be paused and scrubbed with native HTML5 video controls, are muted and have `preload=none`, and switching the buttons loads only the selected clip.
- The scientific interpretation of gray and near-white protein regions is altered by white-keying; these are **presentation derivatives**, not analytical outputs. Retain the original movies separately for research documentation.

**Do not post sensitive client/unpublished manuscript figures publicly without confirming that you own or have permission to reuse them.** This is especially important for CD28-related, simulation, and client-derived plots. Keeping the review repository private does not replace publication permission.

**Single-cell requirements:** actual accession, organism/platform, sample and cell counts, pipeline (e.g., Scanpy or Seurat), QC parameters, clustering/annotation evidence, source plots (UMAP/markers), findings, and permission to display. No genuine single-cell source figure has been provided yet.

## Portrait independence

```bash
python3 embed_portrait.py /absolute/path/to/your_portrait.png
```

This helper embeds a user-owned PNG into **the consulting `index.html` only**. Before embedding it references a public image on the academic site. No modification to the academic repository is performed.

## Publish only to the separate GitHub repository

```bash
bash publish_to_github.sh
```

Requires locally installed `git`, `gh`, an authenticated GitHub account and a directory that is not inside an existing Git repository. The script creates the private consulting repo (if it doesn't already exist), puts documentation on `main` and opens a draft PR for the website on `design/cinematic-consulting-v2`.

## Before public launch

- Verify all claims and scientific images; clear usage rights and client confidentiality.
- Embed your portrait locally. Four genuine science figures are now installed in expertise cards; identify approved original plots for single-cell and microbiome if you wish to replace their explicitly illustrative SVGs.
- Review desktop/tablet/phone layouts locally, particularly 320-px viewport and large contact email links.
- Test the configured Formspree endpoint from your hosted preview; verify the recipient email in the Formspree dashboard.
- Remove `noindex,nofollow` **only** when ready for a public consulting domain.
- Use an independent hosting deployment allowing commercial content. Subdomain/DNS configuration comes **later**.


## V4 media choices (20 October 2026)

- Genomics & Transcriptomics: uploaded immune-cell-labelled heatmap (full figure linked).
- Single-Cell Transcriptomics: uploaded HES4 UMAP plot (full figure linked). Dataset provenance should be verified before describing it as a completed project.
- Biomedical AI: NeuroBridge multimodal workflow.
- Computational Drug Discovery: original protein–ligand interaction visual.
- Microbiome & Metagenomics: uploaded **MA plot** (log fold change versus normalized mean counts). The graphic is NOT a volcano plot, and its provenance is not established as a metagenomics study. Do not describe it as a metagenomic result without source verification.
- Research Code & Workflows: illustrated code/pipeline graphic retained instead of an unrelated PPI network.

The public-facing paragraph below the evidence gallery has been removed as requested.


## GitHub publishing — existing empty repository (important)

Your repository `HazratMaghaz/portfolio-website-consulting` ALREADY EXISTS and was created PUBLIC.
The previous script that tried to create a new repository would fail. This package replaces it.

From the extracted `portfolio-website-consulting/` directory on a machine with
Git and authenticated GitHub push permission, run:

```bash
bash publish_to_github.sh
```

The script checks that the remote repository is still empty, commits ALL HTML/CSS/JS,
the scientific figures and the two MP4 videos to `master`, and creates a separate
`design/cinematic-consulting-v2` branch for subsequent revisions.
**It never touches `HazratMaghaz/portfolio-website-new`.**

If Git requests authentication, authorize Git Credential Manager or log in with GitHub CLI
(`gh auth login`, if available). Do not put access tokens into scripts or the repository.
If the repository already has commits, the script stops without overwriting history.

## Public hosting — Render Static Site (recommended)

Render can deploy a static HTML/CSS/JS site from your existing public GitHub repository.
You may use `render.yaml` with Render Blueprint setup, or create a Static Site manually:

- Repository: `HazratMaghaz/portfolio-website-consulting`
- Branch: `master`
- Build command: `echo 'Static site ready'`
- Publish directory: `.`
- Root directory: leave empty
- Custom domain: add `consulting.hazratmaghaz.tech` AFTER the initial deployment works.

Render provides an `*.onrender.com` address automatically. Verify `index.html`,
`contact.html`, videos, and Formspree end-to-end before configuring DNS.
Static site deployments may have bandwidth, builds, and custom domain usage allowances.

## Domain and DNS

A subdomain does not need separate purchase. Find the current domain registrar via
https://lookup.icann.org/en/lookup and the authoritative nameserver provider
via a public NS lookup tool. The **DNS provider** (which may differ from the registrar)
is where you add only a `consulting` CNAME record.

First add the custom domain in Render Dashboard and copy the exact record target
Render instructs you to use. **Do not touch existing `@`, `www`, MX,
or nameserver records** of the PhD academic website.

## Publication checklist

- This package retains `noindex,nofollow` while only a preview is available.
  After the final subdomain works, change to `index,follow` if you want public SEO.
- The contact form endpoint `https://formspree.io/f/xvkznyjp` is PUBLIC by design.
  Do not commit secret keys; verify inbox, spam controls, and a test inquiry.
- Confirm that every unpublished or client-derived scientific figure is approved
  for public display. Files in this package become publicly accessible when
  pushed to the user's PUBLIC repository.
- The portrait currently references the academic website until `embed_portrait.py`
  embeds the original local image.
