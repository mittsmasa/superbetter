/**
 * Vitest VRT Reporter
 *
 * Custom reporter that generates HTML reports for VRT tests
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
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

// Vitest reporter types - simplified for compatibility
interface VitestFile {
  filepath: string;
  tasks?: VitestTask[];
}

interface VitestTask {
  type?: string;
  name: string;
  mode?: string;
  tasks?: VitestTask[];
  result?: {
    state?: string;
    duration?: number;
    errors?: Array<{ message?: string }>;
  };
}

/**
 * VRT Reporter for Vitest
 */
export default class VRTReporter {
  private results: VRTResult[] = [];
  private outputDir: string;
  private jsonOutputPath: string;
  private rootDir: string = process.cwd();

  constructor(options: VRTReporterOptions = {}) {
    this.outputDir = options.outputDir || '.vitest-vrt-report';
    this.jsonOutputPath =
      options.jsonOutputPath || path.join(this.outputDir, 'results.json');
  }

  onInit(): void {
    this.results = [];
  }

  onCollected(_files?: VitestFile[]): void {
    // Initialize results collection
  }

  onTaskUpdate(_packs: [string, { state?: string }][]): void {
    // Handle task updates if needed
  }

  async onFinished(files?: VitestFile[], _errors?: unknown[]): Promise<void> {
    if (!files) return;

    // Process all test files
    for (const file of files) {
      this.processFile(file);
    }

    // Generate report after processing
    await this.generateReport();
  }

  private processFile(file: VitestFile): void {
    if (!file.tasks) return;

    for (const task of file.tasks) {
      this.processTask(task, file);
    }
  }

  private processTask(task: VitestTask, file: VitestFile): void {
    // Handle nested test suites
    if (task.tasks && task.tasks.length > 0) {
      for (const subtask of task.tasks) {
        this.processTask(subtask, file);
      }
      return;
    }

    // Only process actual test tasks
    if (task.type !== 'test') return;

    const result: VRTResult = {
      testName: task.name,
      status: this.getStatus(task),
      duration: task.result?.duration,
    };

    // Extract error message if failed
    if (task.result?.state === 'fail' && task.result.errors) {
      result.error = task.result.errors
        .map((e: { message?: string }) => e.message || String(e))
        .join('\n');

      // Try to extract screenshot paths from error or attachments
      this.extractScreenshotPaths(result, task, file);
    }

    this.results.push(result);
  }

  private getStatus(task: VitestTask): 'passed' | 'failed' | 'skipped' {
    if (task.mode === 'skip' || task.result?.state === 'skip') {
      return 'skipped';
    }
    if (task.result?.state === 'pass') {
      return 'passed';
    }
    if (task.result?.state === 'fail') {
      return 'failed';
    }
    return 'skipped';
  }

  private extractScreenshotPaths(
    _result: VRTResult,
    _task: VitestTask,
    _file: VitestFile,
  ): void {
    // Try to find attachments directory for this test
    // This is a simplified approach - in practice you might need to
    // parse the error message or check file system for actual paths
  }

  async onWatcherRerun(): Promise<void> {
    this.results = [];
  }

  async onWatcherStart(): Promise<void> {
    // Called when watcher starts
  }

  async onFinishedReportGeneration(): Promise<void> {
    await this.generateReport();
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
