import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { VRTResult } from './index';

/**
 * Generate HTML report from VRT results
 */
export async function generateHTMLReport(
  results: VRTResult[],
  outputDir: string,
): Promise<string> {
  const stats = calculateStats(results);
  const failedResults = results.filter((r) => r.status === 'failed');
  const passedResults = results.filter((r) => r.status === 'passed');
  const skippedResults = results.filter((r) => r.status === 'skipped');

  // Copy screenshot files to report directory
  await copyScreenshots(results, outputDir);

  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VRT Test Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #f5f5f5;
      color: #333;
      line-height: 1.6;
    }

    .header {
      background: #2c3e50;
      color: white;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .stats {
      display: flex;
      gap: 2rem;
      margin-top: 1rem;
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
    }

    .stat-label {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .stat.passed .stat-value { color: #27ae60; }
    .stat.failed .stat-value { color: #e74c3c; }
    .stat.skipped .stat-value { color: #f39c12; }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .filters {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .filter-button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-button.active {
      background: #3498db;
      color: white;
      border-color: #3498db;
    }

    .filter-button:hover {
      border-color: #3498db;
    }

    .results {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .result-card {
      background: white;
      border-radius: 4px;
      padding: 0.75rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .result-card.failed {
      border-left: 4px solid #e74c3c;
    }

    .result-card.passed {
      border-left: 4px solid #27ae60;
    }

    .result-card.skipped {
      border-left: 4px solid #f39c12;
    }

    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .result-title {
      font-size: 0.875rem;
      font-weight: 600;
    }

    .result-status {
      padding: 0.125rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .result-status.passed {
      background: #d5f4e6;
      color: #27ae60;
    }

    .result-status.failed {
      background: #fadbd8;
      color: #e74c3c;
    }

    .result-status.skipped {
      background: #fef5e7;
      color: #f39c12;
    }

    .screenshots {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .screenshot-container {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .screenshot-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: #666;
    }

    .screenshot-wrapper {
      position: relative;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
      background: #f9f9f9;
      max-height: 120px;
    }

    .screenshot-wrapper img {
      width: 100%;
      height: 120px;
      object-fit: contain;
      display: block;
      cursor: zoom-in;
      transition: transform 0.2s;
    }

    .screenshot-wrapper img:hover {
      transform: scale(1.02);
    }

    .error-message {
      background: #fadbd8;
      border: 1px solid #e74c3c;
      border-radius: 4px;
      padding: 0.75rem;
      margin-top: 1rem;
      font-family: monospace;
      font-size: 0.875rem;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #666;
    }

    .empty-state-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    /* Modal for zoomed images */
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      align-items: center;
      justify-content: center;
    }

    .modal.active {
      display: flex;
    }

    .modal img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    }

    .modal-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      color: white;
      font-size: 2rem;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>VRT Test Report</h1>
    <div class="stats">
      <div class="stat">
        <div class="stat-value">${stats.total}</div>
        <div class="stat-label">Total Tests</div>
      </div>
      <div class="stat passed">
        <div class="stat-value">${stats.passed}</div>
        <div class="stat-label">Passed</div>
      </div>
      <div class="stat failed">
        <div class="stat-value">${stats.failed}</div>
        <div class="stat-label">Failed</div>
      </div>
      <div class="stat skipped">
        <div class="stat-value">${stats.skipped}</div>
        <div class="stat-label">Skipped</div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="filters">
      <span style="font-weight: 500;">Filter:</span>
      <button class="filter-button" data-filter="all">All (${stats.total})</button>
      <button class="filter-button active" data-filter="failed">Failed (${stats.failed})</button>
      <button class="filter-button" data-filter="passed">Passed (${stats.passed})</button>
      <button class="filter-button" data-filter="skipped">Skipped (${stats.skipped})</button>
    </div>

    <div class="results">
      ${failedResults.map((result) => generateResultCard(result, outputDir)).join('')}
      ${passedResults.map((result) => generateResultCard(result, outputDir)).join('')}
      ${skippedResults.map((result) => generateResultCard(result, outputDir)).join('')}
    </div>

    ${
      results.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state-icon">No VRT Results</div>
        <p>No visual regression tests were found or executed.</p>
      </div>
    `
        : ''
    }
  </div>

  <!-- Image zoom modal -->
  <div class="modal" id="imageModal">
    <button class="modal-close" onclick="closeModal()">x</button>
    <img id="modalImage" src="" alt="Zoomed screenshot">
  </div>

  <script>
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const resultCards = document.querySelectorAll('.result-card');

    function applyFilter(filter) {
      resultCards.forEach(card => {
        if (filter === 'all' || card.dataset.status === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter results
        applyFilter(filter);
      });
    });

    // Apply default filter (failed) on page load
    applyFilter('failed');

    // Image zoom functionality
    function openModal(imageSrc) {
      const modal = document.getElementById('imageModal');
      const modalImage = document.getElementById('modalImage');
      modalImage.src = imageSrc;
      modal.classList.add('active');
    }

    function closeModal() {
      const modal = document.getElementById('imageModal');
      modal.classList.remove('active');
    }

    // Close modal on click outside image
    document.getElementById('imageModal').addEventListener('click', (e) => {
      if (e.target.id === 'imageModal') {
        closeModal();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Add click handlers to screenshots
    document.querySelectorAll('.screenshot-wrapper img').forEach(img => {
      img.addEventListener('click', () => openModal(img.src));
    });
  </script>
</body>
</html>`;

  return html;
}

/**
 * Generate HTML for a single result card
 */
function generateResultCard(result: VRTResult, outputDir: string): string {
  const hasScreenshots =
    result.actualPath || result.expectedPath || result.diffPath;

  return `
    <div class="result-card ${result.status}" data-status="${result.status}">
      <div class="result-header">
        <div class="result-title">${escapeHtml(result.testName)}</div>
        <div class="result-status ${result.status}">${result.status.toUpperCase()}</div>
      </div>

      ${
        hasScreenshots
          ? `
        <div class="screenshots">
          ${
            result.expectedPath
              ? `
            <div class="screenshot-container">
              <div class="screenshot-label">Expected</div>
              <div class="screenshot-wrapper">
                <img src="${makeRelativePath(result.expectedPath, outputDir)}" alt="Expected">
              </div>
            </div>
          `
              : ''
          }

          ${
            result.actualPath
              ? `
            <div class="screenshot-container">
              <div class="screenshot-label">Actual</div>
              <div class="screenshot-wrapper">
                <img src="${makeRelativePath(result.actualPath, outputDir)}" alt="Actual">
              </div>
            </div>
          `
              : ''
          }

          ${
            result.diffPath
              ? `
            <div class="screenshot-container">
              <div class="screenshot-label">Diff</div>
              <div class="screenshot-wrapper">
                <img src="${makeRelativePath(result.diffPath, outputDir)}" alt="Diff">
              </div>
            </div>
          `
              : ''
          }
        </div>
      `
          : ''
      }

      ${
        result.error
          ? `
        <div class="error-message">${escapeHtml(result.error)}</div>
      `
          : ''
      }
    </div>
  `;
}

/**
 * Calculate stats from results
 */
function calculateStats(results: VRTResult[]): {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
} {
  return {
    total: results.length,
    passed: results.filter((r) => r.status === 'passed').length,
    failed: results.filter((r) => r.status === 'failed').length,
    skipped: results.filter((r) => r.status === 'skipped').length,
  };
}

/**
 * Copy screenshots to report directory
 */
async function copyScreenshots(
  results: VRTResult[],
  outputDir: string,
): Promise<void> {
  const screenshotsDir = path.join(outputDir, 'screenshots');
  await fs.mkdir(screenshotsDir, { recursive: true });

  // Collect all copy operations
  const copyOperations: Promise<void>[] = [];

  for (const result of results) {
    const paths = [result.actualPath, result.expectedPath, result.diffPath];

    for (const filePath of paths) {
      if (!filePath) continue;

      const fileName = path.basename(filePath);
      const destPath = path.join(screenshotsDir, fileName);
      copyOperations.push(
        fs.copyFile(filePath, destPath).catch(() => {
          // Skip if file doesn't exist or can't be copied
        }),
      );
    }
  }

  await Promise.all(copyOperations);
}

/**
 * Make a path relative to the output directory
 */
function makeRelativePath(filePath: string, _outputDir: string): string {
  const fileName = path.basename(filePath);
  return `screenshots/${fileName}`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
