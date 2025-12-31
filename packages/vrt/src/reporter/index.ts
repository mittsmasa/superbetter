/**
 * Vitest VRT Reporter
 *
 * Custom reporter that generates HTML reports for VRT tests
 * Compatible with Vitest 4.x
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type {
  Reporter,
  SerializedError,
  TestCase,
  TestModule,
  TestRunEndReason,
} from 'vitest/node';
import { generateHTMLReport } from './html-generator';

export interface VRTResult {
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration?: number;
  error?: string;
  actualPath?: string;
  expectedPath?: string;
  diffPath?: string;
}

export interface VRTReporterOptions {
  outputDir?: string;
  jsonOutputPath?: string;
}

interface ReportSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
}

interface ReportData {
  summary: ReportSummary;
  results: VRTResult[];
  generatedAt: string;
}

/**
 * VRT Reporter for Vitest 4.x
 */
class VRTReporter implements Reporter {
  private results: VRTResult[] = [];
  private outputDir: string;
  private jsonOutputPath: string;

  constructor(options: VRTReporterOptions = {}) {
    this.outputDir = options.outputDir || '.vitest-vrt-report';
    this.jsonOutputPath =
      options.jsonOutputPath || path.join(this.outputDir, 'results.json');
  }

  onInit(): void {
    this.results = [];
  }

  /**
   * Called after all tests have finished running (Vitest 4.x API)
   */
  async onTestRunEnd(
    testModules: ReadonlyArray<TestModule>,
    _unhandledErrors: ReadonlyArray<SerializedError>,
    _reason: TestRunEndReason,
  ): Promise<void> {
    // Process all test modules
    for (const testModule of testModules) {
      this.processTestModule(testModule);
    }

    // Generate report after processing
    await this.generateReport();
  }

  private processTestModule(testModule: TestModule): void {
    // Get all tests from the module (including nested suites)
    for (const task of testModule.children.allTests()) {
      this.processTestCase(task);
    }
  }

  private processTestCase(testCase: TestCase): void {
    const testResult = testCase.result();
    const result: VRTResult = {
      testName: testCase.fullName,
      status: this.getStatus(testResult?.state),
      duration: testCase.diagnostic()?.duration,
    };

    // Extract error message if failed
    if (testResult?.state === 'failed' && testResult.errors) {
      result.error = testResult.errors
        .map((e) => e.message || String(e))
        .join('\n');

      // Try to extract screenshot paths from error
      this.extractScreenshotPaths(result, testResult.errors);
    }

    this.results.push(result);
  }

  private getStatus(state?: string): 'passed' | 'failed' | 'skipped' {
    if (state === 'passed') {
      return 'passed';
    }
    if (state === 'failed') {
      return 'failed';
    }
    return 'skipped';
  }

  private extractScreenshotPaths(
    result: VRTResult,
    errors: ReadonlyArray<{ message?: string }>,
  ): void {
    const errorMessage = errors.map((e) => e.message || '').join('\n');

    if (!errorMessage) return;

    // Pattern for vitest browser screenshot paths
    const actualMatch = errorMessage.match(
      /actual[:\s]+["']?([^"'\s\n]+\.png)["']?/i,
    );
    const expectedMatch = errorMessage.match(
      /expected[:\s]+["']?([^"'\s\n]+\.png)["']?/i,
    );
    const diffMatch = errorMessage.match(
      /diff[:\s]+["']?([^"'\s\n]+\.png)["']?/i,
    );

    // Also try to find paths in attachments directory structure
    const attachmentPathMatch = errorMessage.match(
      /\.vitest-attachments[^\s"'\n]+\.png/g,
    );

    if (actualMatch?.[1]) {
      result.actualPath = actualMatch[1];
    }
    if (expectedMatch?.[1]) {
      result.expectedPath = expectedMatch[1];
    }
    if (diffMatch?.[1]) {
      result.diffPath = diffMatch[1];
    }

    // If we found attachment paths but not specific types, try to categorize them
    if (attachmentPathMatch && attachmentPathMatch.length > 0) {
      for (const attachPath of attachmentPathMatch) {
        if (attachPath.includes('-actual-') || attachPath.includes('actual')) {
          result.actualPath = result.actualPath || attachPath;
        } else if (
          attachPath.includes('-diff-') ||
          attachPath.includes('diff')
        ) {
          result.diffPath = result.diffPath || attachPath;
        } else if (
          attachPath.includes('-expected-') ||
          attachPath.includes('expected')
        ) {
          result.expectedPath = result.expectedPath || attachPath;
        }
      }
    }
  }

  private async generateReport(): Promise<void> {
    try {
      // Ensure output directory exists
      await fs.mkdir(this.outputDir, { recursive: true });

      // Generate summary
      const summary: ReportSummary = {
        total: this.results.length,
        passed: this.results.filter((r) => r.status === 'passed').length,
        failed: this.results.filter((r) => r.status === 'failed').length,
        skipped: this.results.filter((r) => r.status === 'skipped').length,
      };

      // Create report data
      const reportData: ReportData = {
        summary,
        results: this.results,
        generatedAt: new Date().toISOString(),
      };

      // Write JSON report
      await fs.writeFile(
        this.jsonOutputPath,
        JSON.stringify(reportData, null, 2),
      );

      // Generate HTML report
      const html = await generateHTMLReport(this.results, this.outputDir);
      await fs.writeFile(path.join(this.outputDir, 'index.html'), html);

      console.log(`\nVRT Report generated: ${this.outputDir}/index.html`);
      console.log(
        `  Total: ${summary.total}, Passed: ${summary.passed}, Failed: ${summary.failed}, Skipped: ${summary.skipped}`,
      );
    } catch (error) {
      console.error('Failed to generate VRT report:', error);
    }
  }
}

export default VRTReporter;
