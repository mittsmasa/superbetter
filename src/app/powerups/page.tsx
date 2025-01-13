import { AddBox } from '@/assets/icons';
import { IconButton } from '@/components/icon-button';
import { MotionLink } from '@/components/motion-link';
import { FooterNavigation } from '@/components/navigation';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

const Page = () => {
  return (
    <main
      className={css({
        height: '[100%]',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      })}
    >
      <div
        className={css({
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px',
          position: 'sticky',
          top: 0,
        })}
      >
        <h1 className={css({ textStyle: 'Heading.primary' })}>
          パワーアップアイテム
        </h1>
        <IconButton>
          <AddBox className={css({ width: '[24px]', height: '[24px]' })} />
        </IconButton>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '8px',
          textStyle: 'Body.secondary',
        })}
      >
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
      </div>
      <div
        className={css({
          backgroundColor: 'black',
          position: 'sticky',
          bottom: 0,
          padding: '8px',
        })}
      >
        <FooterNavigation />
      </div>
    </main>
  );
};

const Quest = () => (
  <MotionLink
    href="/powerups/1"
    className={cx(
      pixelBorder({ borderWidth: 1 }),
      css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '4px',
      }),
    )}
  >
    <p>パワーブレスする</p>
    <p
      className={css({
        color: 'gray.200',
        textStyle: 'Body.tertiary',
        lineClamp: 3,
      })}
    >
      パワーブレスというのは8カウントで吸って4カウントで吐くやつのことです。すごく長い文章をいれても途中で
      Truncate
      されることを想定しています。まぁこれだけかければあまり省略されることはないとおもうけど
    </p>
  </MotionLink>
);

export default Page;
