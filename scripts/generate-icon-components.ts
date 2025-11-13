import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const iconsToGenerate = [
  { name: 'CheckGradient', path: './src/assets/customize/check-gradient.svg' },
  { name: 'Network4G', path: './src/assets/pixel-icons/4g.svg' },
  { name: 'Resolution4K', path: './src/assets/pixel-icons/4k.svg' },
  { name: 'Resolution4KBox', path: './src/assets/pixel-icons/4k-box.svg' },
  { name: 'Network5G', path: './src/assets/pixel-icons/5g.svg' },
  { name: 'AbTesting', path: './src/assets/pixel-icons/ab-testing.svg' },
  { name: 'AddBox', path: './src/assets/pixel-icons/add-box.svg' },
  { name: 'Android', path: './src/assets/pixel-icons/android.svg' },
  { name: 'Archive', path: './src/assets/pixel-icons/archive.svg' },
  { name: 'Calendar', path: './src/assets/pixel-icons/calendar.svg' },
  {
    name: 'CalendarCheck',
    path: './src/assets/pixel-icons/calendar-check.svg',
  },
  { name: 'CheckList', path: './src/assets/pixel-icons/checklist.svg' },
  { name: 'ChevlonLeft', path: './src/assets/pixel-icons/chevron-left.svg' },
  { name: 'Close', path: './src/assets/pixel-icons/close.svg' },
  { name: 'Cloud', path: './src/assets/pixel-icons/cloud.svg' },
  { name: 'CloudSun', path: './src/assets/pixel-icons/cloud-sun.svg' },
  { name: 'Edit', path: './src/assets/pixel-icons/edit.svg' },
  { name: 'Human', path: './src/assets/pixel-icons/human.svg' },
  { name: 'Logout', path: './src/assets/pixel-icons/logout.svg' },
  { name: 'Menu', path: './src/assets/pixel-icons/menu.svg' },
  { name: 'Minus', path: './src/assets/pixel-icons/minus.svg' },
  { name: 'MoreVertical', path: './src/assets/pixel-icons/more-vertical.svg' },
  { name: 'Plus', path: './src/assets/pixel-icons/plus.svg' },
  { name: 'RadioOn', path: './src/assets/pixel-icons/radio-on.svg' },
  { name: 'Reload', path: './src/assets/pixel-icons/reload.svg' },
  { name: 'ScriptText', path: './src/assets/pixel-icons/script-text.svg' },
  { name: 'Sort', path: './src/assets/pixel-icons/sort.svg' },
  { name: 'Sun', path: './src/assets/pixel-icons/sun.svg' },
  { name: 'Trash', path: './src/assets/pixel-icons/trash.svg' },
  { name: 'Trophy', path: './src/assets/pixel-icons/trophy.svg' },
  { name: 'Zap', path: './src/assets/pixel-icons/zap.svg' },
];

function parseSvg(svgContent: string): { viewBox: string; paths: string[] } {
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  const pathMatches = svgContent.matchAll(/<path[^>]*d="([^"]+)"[^>]*\/>/g);
  const paths: string[] = [];

  for (const match of pathMatches) {
    const fullPath = match[0];
    paths.push(fullPath.replace(/fill="[^"]*"/, '').trim());
  }

  return { viewBox, paths };
}

function generateComponent(name: string, svgPath: string): string {
  const svgContent = readFileSync(resolve(process.cwd(), svgPath), 'utf-8');
  const { viewBox, paths } = parseSvg(svgContent);

  const pathsJsx = paths
    .map((path) =>
      path
        .replace('<path', '      <path')
        .replace(/\/>$/, 'fill={colorValue} />'),
    )
    .join('\n');

  return `import type { IconProps } from './types';
import { token } from '@/styled-system/tokens';

export const ${name} = ({ size = 24, color }: IconProps) => {
  const colorValue = color ? token(color) : 'currentColor';

  return (
    <svg width={size} height={size} viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
${pathsJsx}
    </svg>
  );
};
`;
}

// Generate components directory
mkdirSync(resolve(process.cwd(), 'src/components/icons'), { recursive: true });

// Generate each icon component
for (const icon of iconsToGenerate) {
  const componentContent = generateComponent(icon.name, icon.path);
  const outputPath = resolve(
    process.cwd(),
    `src/components/icons/${icon.name}.tsx`,
  );
  writeFileSync(outputPath, componentContent);
  console.log(`Generated: ${icon.name}.tsx`);
}

// Generate index file
const indexContent = `${iconsToGenerate
  .map((icon) => `export { ${icon.name} } from './${icon.name}';`)
  .join('\n')}\n`;

writeFileSync(
  resolve(process.cwd(), 'src/components/icons/index.ts'),
  indexContent,
);
console.log('Generated: index.ts');

console.log(`\n✓ Generated ${iconsToGenerate.length} icon components`);
