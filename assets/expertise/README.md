# Expertise-image selection and source provenance

Four of the six expertise cards now use optimized, user-supplied research images. The other two intentionally use an illustration instead of mislabeling unrelated datasets.

| Card | Site file | Original user-supplied file | Notes |
| --- | --- | --- | --- |
| Genomics & Transcriptomics | `genomics-transcriptomics.webp` | `Step17v3_t_test_FDR_heatmap_11_common_miRNAs.png` | FDR heatmap from three GEO cohorts; not a Crohn's-only plot |
| Single-Cell Transcriptomics | Original embedded SVG | None supplied | Must remain identified as illustration until actual single-cell evidence is available |
| Biomedical AI | `biomedical-ai.webp` | `Multi-modal_AI.jpeg` | NeuroBridge workflow |
| Computational Drug Discovery | `computational-drug-discovery.webp` | `computational-drug-design.png` | Protein–ligand pose and 2D interactions |
| Microbiome & Metagenomics | Original embedded SVG | None supplied | Requires actual microbiome plot with reuse rights |
| Research Code & Workflows | `research-software.webp` | `WhatsApp Image 2026-10-20 at 4.07.43 PM.jpeg` | Real PPI network research output; not proof of a deployed app |

Other submitted plots are included in `assets/figures/` for the research gallery. The research gallery shows genuine scientific figures inside framed light canvases so white-background plots and their axis markings remain accurate. Do not use unrelated plots as proof of results for an unverified project.

To replace the illustrative single-cell or microbiome visuals later, add a real 1600-pixel WebP to `assets/expertise/` and update `index.html` in the matching card, including a factual caption and alt text.

Before going public, verify project attribution, manuscript status, client confidentiality and image licensing. No passwords or API tokens are needed for these files.
