import { Header } from '@/app/(private)/_components/header';
import { css } from '@/styled-system/css';
import { getEpicWin } from '../../_actions/epicwin';
import { DeleteConfirmButton } from './_components/delete-confirm-button';
import { EditEpicWinButton } from './_components/edit-epicwin-button';
import { ExecuteButton } from './_components/execute-button';

const Page = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: epicwinId } = await props.params;
  const epicwin = await getEpicWin({ id: epicwinId });

  if (epicwin.type === 'error') {
    throw new Error(epicwin.error.message);
  }

  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        height: '[100%]',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        <Header
          rightSlot={
            <div className={css({ display: 'flex', gap: '8px' })}>
              <EditEpicWinButton
                id={epicwin.data.id}
                name={epicwin.data.title}
                description={epicwin.data.description}
              />

              <DeleteConfirmButton
                id={epicwin.data.id}
                name={epicwin.data.title}
              />
            </div>
          }
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            px: '12px',
          })}
        >
          <h1 className={css({ textStyle: 'Body.primary' })}>
            {epicwin.data.title}
          </h1>
          {epicwin.data.description && (
            <p
              className={css({
                textStyle: 'Body.tertiary',
                color: 'foreground',
                whiteSpace: 'pre-wrap',
              })}
            >
              {epicwin.data.description}
            </p>
          )}
          {epicwin.data.archived && (
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                px: '8px',
                py: '4px',
                bg: 'cyan.100',
                borderRadius: '4px',
                border: '1px solid {colors.cyan.300}',
              })}
            >
              <span
                className={css({
                  textStyle: 'Body.secondary',
                  color: 'cyan.700',
                  fontWeight: 'medium',
                })}
              >
                ✨ 達成済み
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        className={css({
          width: '[100%]',
          display: 'flex',
          justifyContent: 'center',
          py: '24px',
        })}
      >
        <ExecuteButton epicwinId={epicwinId} archived={epicwin.data.archived} />
      </div>
    </main>
  );
};

export default Page;
