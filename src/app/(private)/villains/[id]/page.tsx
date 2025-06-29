import { getVillain } from '@/app/(private)/_actions/get-villain';
import { Header } from '@/app/(private)/_components/header';
import { css } from '@/styled-system/css';
import { DeleteConfirmButton } from './_components/delete-confirm-button';
import { EditVillainButton } from './_components/edit-villain-button';
import { ExecuteButton } from './_components/execute-button';

const Page = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: villainId } = await props.params;
  const villain = await getVillain(villainId);

  if (villain.type === 'error') {
    throw new Error(villain.error.message);
  }

  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '[100%]',
        justifyContent: 'space-between',
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
              <EditVillainButton
                id={villain.data.id}
                name={villain.data.title}
                description={villain.data.description}
              />
              <DeleteConfirmButton
                id={villain.data.id}
                name={villain.data.title}
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
            {villain.data.title}
          </h1>
          {villain.data.description && (
            <p
              className={css({
                color: 'foreground',
                textStyle: 'Body.tertiary',
                whiteSpace: 'pre-wrap',
              })}
            >
              {villain.data.description}
            </p>
          )}
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          py: '24px',
          width: '[100%]',
        })}
      >
        <ExecuteButton villainId={villainId} />
      </div>
    </main>
  );
};

export default Page;
