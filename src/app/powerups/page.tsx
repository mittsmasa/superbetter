import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';
import { EntityLink } from '../_components/entity-link';
import { AddPowerupButton } from './_components/add-powerup-button';

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
      <div>
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
          <AddPowerupButton />
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '8px',
            textStyle: 'Body.secondary',
          })}
        >
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
        </div>
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
      {/* <AddPowerupButton /> */}
    </main>
  );
};

const PowerupLink = () => (
  <EntityLink
    href="/powerups/1"
    title="パワーブレスする"
    description="パワーブレスというのは8カウントで吸って4カウントで吐くやつのことです。すごく長い文章をいれても途中で Truncate されることを想定しています。まぁこれだけかければあまり省略されることはないとおもうけど"
  />
);

export default Page;
